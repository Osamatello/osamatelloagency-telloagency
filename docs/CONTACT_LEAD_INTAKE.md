# Contact form → n8n → Outreach CRM

```
ContactForm (browser)
  → POST /api/contact            (this repo, server-side)
    → POST n8n webhook           (N8N_CONTACT_WEBHOOK_URL)
      → POST /api/integrations/n8n/leads   (outreach-crm, Bearer auth)
        → public.ingest_n8n_lead(jsonb)    (Supabase, service_role only)
```

No Supabase or CRM credential ever reaches the browser. The form only ever
talks to its own origin.

## Why nothing changed in the CRM

`outreach-crm` already ships the exact ingestion path this needs, so no schema
migration and no CRM code change was required:

- `POST /api/integrations/n8n/leads` — Bearer auth, 64 KB cap, payload
  validation, optional `Idempotency-Key`, and typed error codes
  (`400 INVALID_PAYLOAD`, `401 UNAUTHORIZED`, `409 IDENTITY_CONFLICT`,
  `500 INTERNAL_ERROR`). Returns `201` on create, `200` on enrich/existing.
- `public.ingest_n8n_lead(payload jsonb)` — atomic, `service_role`-only.
  Deduplicates by email → phone → linkedin_url → external_id → name+company,
  taking advisory locks so concurrent retries cannot both insert. On a match it
  only fills columns that are still `NULL` (`coalesce(existing, incoming)`), so
  Google Places / Apollo / Prospeo enrichment is never overwritten. It appends
  the message to `public.lead_notes` (skipping an exact duplicate note) and
  always writes a `public.activities` row with `activity_type = 'import'`.

## What `/api/contact` sends

Validated and normalised server-side; `source`, `source_detail`, `language`
and `submitted_at` are generated on the server and never taken from the client.

```json
{
  "full_name": "Jane Doe",
  "email": "jane@acme.com",
  "phone": "+971500000000",
  "company_name": "Acme Ltd",
  "source": "DAMASAVERO Website",
  "source_detail": "Contact form · /contact · EN",
  "notes": "Website contact form — DAMASAVERO\nSubmitted: …\nLanguage: EN\nRequirement area: …\nBudget: …\nCompany: …\nConsent: yes\n\nMessage:\n…",
  "requirement_area": "Operations & Workflow Systems",
  "budget": "$700–$1,500",
  "message": "…",
  "language": "EN",
  "source_page": "/contact",
  "submitted_at": "2026-09-08T10:26:00.000Z"
}
```

Headers: `x-damasavero-signature: <N8N_CONTACT_WEBHOOK_SECRET>` and
`idempotency-key: damasavero-contact:<email>:<submitted_at>`.

## The n8n workflow — **still to be created**

I have no access to the n8n instance, so this workflow does not exist yet.
Import `n8n/damasavero-contact-lead-intake.json` (in this folder) or build it
from the spec below.

**Name:** `DAMASAVERO – Website Contact Lead Intake`

| # | Node | Configuration |
|---|------|---------------|
| 1 | **Webhook** | `POST`, path `damasavero-contact`, response mode *Using Respond to Webhook node*. Its production URL is `N8N_CONTACT_WEBHOOK_URL`. |
| 2 | **IF — Verify signature** | `{{ $json.headers['x-damasavero-signature'] }}` equals the secret (store as an n8n credential/variable, not inline). False branch → *Respond 401*. |
| 3 | **Set — Build CRM payload** | Pass through `full_name, email, phone, company_name, source, source_detail, notes`. Drop `requirement_area, budget, message, language, source_page, submitted_at` — they are already inside `notes`, and the CRM API rejects unknown fields. |
| 4 | **HTTP Request — CRM ingest** | `POST {{CRM_BASE_URL}}/api/integrations/n8n/leads`, header `Authorization: Bearer {{N8N_CRM_API_KEY}}` (n8n credential), header `Idempotency-Key` from the incoming request, JSON body from node 3. **Turn off “Continue on Fail”** and enable *Never Error → false* so a CRM failure surfaces. Retry: 2 attempts, 2 s apart. |
| 5 | **Respond to Webhook — success** | `200`, body `{ "ok": true, "action": "={{ $json.action }}", "lead_id": "={{ $json.lead_id }}" }`. |
| 6 | **Respond to Webhook — error** | On the error branch of node 4: status `502`, body `{ "ok": false, "error": "CRM_INGEST_FAILED" }`. Never respond `200` when the CRM call failed — `/api/contact` treats any non-2xx as a failure and the form shows its error state. |

**n8n credentials/variables required**

- `N8N_CRM_API_KEY` — must equal `N8N_CRM_API_KEY` in the CRM deployment.
- `CRM_BASE_URL` — e.g. `https://outreach-crm.<host>`.
- The webhook shared secret — must equal `N8N_CONTACT_WEBHOOK_SECRET` here.

## Validation still outstanding

Everything up to the n8n boundary is tested (see the commit message). The three
checks that need the live workflow are:

1. A real submission creates a lead with `source = 'DAMASAVERO Website'`, a
   `lead_notes` row carrying requirement area, budget and message, and an
   `activities` row of type `import`.
2. Submitting twice with the same email enriches instead of duplicating
   (`action: "enriched"` or `"existing"`, same `lead_id`).
3. With the CRM stopped, the form shows its error state and no success.

Use an obviously disposable address for the test lead (e.g.
`test+damasavero@…`) and delete the row afterwards so production outreach data
stays clean.
