export interface CompanyEditorial {
  eyebrow: string;
  title: [string, string];
  introduction: string;
  readOn: string;
  lens: { label: string; centre: [string, string]; caption: string };
  premise: { label: string; title: string; paragraphs: [string, string]; marginal: string };
  convictions: {
    label: string;
    title: string;
    instruction: string;
    items: { key: string; label: string; title: string; body: string; question: string; annotation: string; centre: [string, string] }[];
  };
  restraint: { label: string; before: string; emphasis: string; after: string; body: string; note: string };
  founder: { label: string; name: string; role: string; title: string; body: string; direction: string };
  closing: { label: string; title: string; body: string; action: string };
}

export const companyEn: CompanyEditorial = {
  eyebrow: 'Who We Are / DAMASAVERO',
  title: ['Intelligence.', 'With intention.'],
  introduction: 'We are an AI Automation & Business Systems company. Our starting point is a conviction: the people who depend on a system should be able to understand it, question it and shape what comes next.',
  readOn: 'Our point of view',
  lens: {
    label: 'The human frame',
    centre: ['Human', 'intent.'],
    caption: 'Technology is the frame. Human intent stays at the centre.',
  },
  premise: {
    label: 'The reason behind the company',
    title: 'Greater possibility demands better judgement.',
    paragraphs: [
      'AI makes it possible to delegate more. That does not make every act of delegation a good decision. Someone still has to ask what matters, what is acceptable and who remains responsible.',
      'DAMASAVERO exists to bring that thinking into the design of business systems. We see technology as a design material, not a direction in itself. The purpose comes from the business. The responsibility stays with people.',
    ],
    marginal: 'A point of view, before a point of solution.',
  },
  convictions: {
    label: 'Our convictions',
    title: 'Different lenses.\nThe same standard.',
    instruction: 'Choose a lens to explore our thinking.',
    items: [
      {
        key: 'responsibility', label: 'Responsibility', title: 'Capability is not permission.',
        body: 'A system being able to make a decision is not the same as that decision being its to make. Our position is that authority should be deliberate: defined by people, proportionate to the consequences and open to challenge.',
        question: 'Who should have the final say?', annotation: 'A defined boundary for machine authority.', centre: ['Human', 'judgement.'],
      },
      {
        key: 'legibility', label: 'Legibility', title: 'Understanding is part of ownership.',
        body: 'We believe a business should not need to take its own systems on faith. The logic, assumptions and limits should be understandable to the people relying on them. Complexity is sometimes necessary. Opacity is not a virtue.',
        question: 'Can the thinking be explained?', annotation: 'The reasoning should remain visible.', centre: ['Visible', 'reasoning.'],
      },
      {
        key: 'independence', label: 'Independence', title: 'Build conviction. Leave room for change.',
        body: 'No model, platform or design decision deserves permanent loyalty. We believe systems should leave a business free to change direction. The enduring commitment is to the purpose, not to the technology chosen to serve it.',
        question: 'What if the right choice changes?', annotation: 'An open edge for the next decision.', centre: ['Room', 'to change.'],
      },
    ],
  },
  restraint: {
    label: 'The value of restraint',
    before: 'Not everything', emphasis: 'that can be automated', after: 'should be.',
    body: 'Knowing where technology belongs also means knowing where it does not. Relationships, sensitive decisions and questions of purpose deserve more than a default setting.',
    note: 'Knowing what to leave human is a design decision.',
  },
  founder: {
    label: 'The thinking behind DAMASAVERO', name: 'Osama Tello', role: 'Founder — DAMASAVERO',
    title: 'A clear direction.\nAn open mind.',
    body: 'Founded by Osama Tello, DAMASAVERO is shaped by a practical interest in the relationship between business, technology and human judgement. That perspective gives the company its direction; the work must stand on its own reasoning.',
    direction: 'Our ambition is to help shape a future in which businesses can adopt intelligence without surrendering understanding or control.',
  },
  closing: {
    label: 'An open conversation', title: 'Start with what matters.',
    body: 'Tell us what you believe your business should become. That is a useful place to begin.', action: 'Book a Free Consultation',
  },
};

export const companyAr: CompanyEditorial = {
  eyebrow: 'من نحن / DAMASAVERO',
  title: ['ذكاء.', 'تحكمه غاية.'],
  introduction: 'نحن شركة لأتمتة الذكاء الاصطناعي وأنظمة الأعمال. ننطلق من قناعة: من يعتمد على نظام، يجب أن يكون قادرًا على فهمه، ومساءلته، وتحديد اتجاهه.',
  readOn: 'وجهة نظرنا',
  lens: { label: 'الإطار الإنساني', centre: ['الغاية', 'الإنسانية.'], caption: 'التقنية هي الإطار. وتبقى الغاية الإنسانية في المركز.' },
  premise: {
    label: 'الفكرة وراء الشركة', title: 'كلما اتسعت الإمكانات، ازدادت أهمية حسن التقدير.',
    paragraphs: [
      'يتيح الذكاء الاصطناعي تفويض المزيد من المهام والقرارات. لكن القدرة على التفويض لا تجعله دائمًا الخيار الصحيح. يبقى علينا أن نسأل: ما المهم؟ ما المقبول؟ ومن يتحمّل المسؤولية؟',
      'وُجدت DAMASAVERO لتجعل هذا التفكير جزءًا من تصميم أنظمة الأعمال. نرى التقنية وسيلة قابلة للتشكيل، لا اتجاهًا مفروضًا. الغاية تحدّدها الشركة، والمسؤولية تبقى لدى الإنسان.',
    ],
    marginal: 'نحدّد موقفنا قبل أن نقترح الحل.',
  },
  convictions: {
    label: 'قناعاتنا', title: 'زوايا نظر مختلفة.\nومعيار واحد.', instruction: 'اختر زاوية لتتعرّف على طريقة تفكيرنا.',
    items: [
      {
        key: 'responsibility', label: 'المسؤولية', title: 'القدرة لا تعني الصلاحية.',
        body: 'قدرة النظام على اتخاذ قرار لا تعني أن من حقّه اتخاذه. نرى أن الصلاحيات يجب أن تكون مقصودة: يحدّدها الإنسان، وتتناسب مع تبعات القرار، وتبقى قابلة للمساءلة.',
        question: 'لمن يجب أن تكون الكلمة الأخيرة؟', annotation: 'حدود واضحة لصلاحيات الآلة.', centre: ['التقدير', 'البشري.'],
      },
      {
        key: 'legibility', label: 'الوضوح', title: 'الفهم جزء من امتلاك النظام.',
        body: 'لا ينبغي أن تضطر الشركة إلى الوثوق بأنظمتها دون أن تفهمها. يجب أن يكون منطقها وافتراضاتها وحدودها مفهومة لمن يعتمد عليها. قد يكون التعقيد ضروريًا أحيانًا، لكن الغموض ليس ميزة.',
        question: 'هل يمكن تفسير المنطق وراء القرار؟', annotation: 'منطق يمكن فهمه ومراجعته.', centre: ['منطق', 'واضح.'],
      },
      {
        key: 'independence', label: 'الاستقلالية', title: 'قناعات ثابتة. ومساحة للتغيير.',
        body: 'لا نموذج ولا منصّة ولا قرار تصميم يستحق ولاءً دائمًا. نؤمن بأن الأنظمة يجب أن تترك للشركة حرية تغيير اتجاهها. التزامنا المستمر بالغاية، لا بالتقنية التي اخترناها لتحقيقها.',
        question: 'ماذا لو تغيّر الخيار الأنسب؟', annotation: 'مساحة مفتوحة للقرار القادم.', centre: ['مساحة', 'للتغيير.'],
      },
    ],
  },
  restraint: {
    label: 'قيمة الاختيار الواعي', before: 'ليس كل ما', emphasis: 'يمكن أتمتته', after: 'ينبغي أتمتته.',
    body: 'معرفة مكان التقنية تعني أيضًا معرفة أين لا تنتمي. العلاقات والقرارات الحساسة والأسئلة المتعلّقة بالغاية، تستحق أكثر من إعداد افتراضي.',
    note: 'تحديد ما يبقى بيد الإنسان قرار تصميمي.',
  },
  founder: {
    label: 'الفكر وراء DAMASAVERO', name: 'Osama Tello', role: 'المؤسس — DAMASAVERO',
    title: 'اتجاه واضح.\nوفكر منفتح.',
    body: 'أسّس Osama Tello شركة DAMASAVERO باهتمام عملي بالعلاقة بين الأعمال والتقنية والتقدير البشري. هذا المنظور يمنح الشركة اتجاهها، لكن قيمة العمل يجب أن تثبتها وجاهة قراراته.',
    direction: 'طموحنا أن نساهم في مستقبل تتبنّى فيه الشركات الذكاء الاصطناعي دون أن تتنازل عن الفهم أو التحكّم.',
  },
  closing: { label: 'حوار مفتوح', title: 'لنبدأ بما يهمّك.', body: 'أخبرنا كيف تتصوّر مستقبل شركتك. من هنا يبدأ حوار يستحقّ الوقت.', action: 'احجز استشارة مجانية' },
};
