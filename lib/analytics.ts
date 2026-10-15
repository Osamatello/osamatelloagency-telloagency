import { track } from '@vercel/analytics';

/**
 * Conversion events.
 *
 * The site measured pageviews but had no way to tell which of them turned into
 * an actual enquiry, so traffic from search, the Business Profile or a campaign
 * all looked the same. These cover the four moments where someone genuinely
 * reaches out: the form, and the phone and email links in the footer and on the
 * contact page.
 *
 * Vercel Analytics is cookieless and no-ops outside production, so this adds
 * nothing to consent obligations and nothing to local development.
 */

export type ContactChannel = 'phone' | 'email' | 'linkedin' | 'instagram';

/** Where a contact link was clicked, so the footer and the pages can be told apart. */
export type ContactSurface = 'footer' | 'contact-page' | 'about-page';

/**
 * The enquiry form was sent and the CRM accepted it. Service and budget come
 * along so the dashboard can answer which kind of work a channel brings in,
 * not just how much of it.
 */
export function trackEnquiry(fields: { service: string; budget: string }) {
  track('enquiry_submitted', {
    service: fields.service || 'unspecified',
    budget: fields.budget || 'unspecified',
  });
}

/**
 * The form was submitted but never reached the CRM. Worth counting separately:
 * these are leads that were lost to a fault rather than never offered.
 */
export function trackEnquiryFailed(reason: 'rejected' | 'network') {
  track('enquiry_failed', { reason });
}

/** A tel:, mailto:, LinkedIn or Instagram link was used. */
export function trackContactClick(channel: ContactChannel, surface: ContactSurface) {
  track('contact_click', { channel, surface });
}
