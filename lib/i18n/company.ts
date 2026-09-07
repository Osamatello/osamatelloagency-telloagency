export interface CompanyEditorial {
  eyebrow: string;
  title: [string, string];
  introduction: string;
  readOn: string;
  lens: {
    label: string; centre: [string, string]; caption: string; touchHint: string;
    idleTitle: string; idleBody: string; close: string; pause: string; resume: string;
    insights: { title: string; body: string }[];
  };
  premise: { label: string; title: string; paragraphs: [string, string]; marginal: string };
  working: { label: string; title: string; introduction: string; items: { title: string; body: string }[] };
  founder: { label: string; name: string; role: string; title: string; body: string; direction: string };
  closing: { label: string; title: string; body: string; action: string };
}

export const companyEn: CompanyEditorial = {
  eyebrow: 'Who We Are / DAMASAVERO',
  title: ['Intelligence.', 'With intention.'],
  introduction: 'DAMASAVERO designs and builds intelligent business systems. We bring an understanding of how a business works to the technical decisions that shape its systems.',
  readOn: 'Our point of view',
  lens: {
    label: 'Inside our thinking', centre: ['Your business.', 'At the centre.'],
    caption: 'Select a shaded page to discover how we think.',
    touchHint: 'Brush across the pages. Tap a shaded page to read.',
    idleTitle: 'Four ideas behind our work.',
    idleBody: 'A closer look at the decisions that guide what we build.',
    close: 'Close insight', pause: 'Pause motion', resume: 'Resume motion',
    insights: [
      { title: 'Choose what fits.', body: 'We choose technology for the job it needs to do. The newest AI model is useful only if it makes sense for your business.' },
      { title: 'Plan for the unexpected.', body: 'Missing information and unusual requests are part of real work. A system needs a clear next step when things do not go to plan.' },
      { title: 'Keep people in control.', body: 'Not everything that can be automated should be. We define where the system can act and where a person needs to decide.' },
      { title: 'Leave room for change.', body: 'Businesses change. We design with future adjustments in mind, so changing a tool or a business rule does not have to mean starting over.' },
    ],
  },
  premise: {
    label: 'Why DAMASAVERO exists', title: 'The details of a business deserve better systems.',
    paragraphs: [
      'Every company develops its own way of working. Some of it is written down. Much of it lives in everyday decisions: who knows the answer, when a request needs extra care, and why one job is handled differently from another.',
      'DAMASAVERO exists to bring that understanding into the systems a business uses. Our interest is in the whole design: how information, decisions and people fit together, and where intelligent automation belongs within it.',
    ],
    marginal: 'A company is more than a list of tasks.',
  },
  working: {
    label: 'Working with us', title: 'Your knowledge belongs\nat the drawing table.',
    introduction: 'You know the business. We bring the design and engineering. Good work needs both.',
    items: [
      { title: 'There is room for questions.', body: 'You should be able to ask why we recommend something and get an answer in plain language. Costs, limitations and alternatives belong in that conversation.' },
      { title: 'The people doing the work matter.', body: 'We want to hear from the people who will use the system. Their experience helps us challenge assumptions before those assumptions become part of the design.' },
      { title: 'Disagreement can improve the work.', body: 'We believe in being direct when an idea needs rethinking, and listening when you challenge ours. A useful recommendation needs an honest conversation.' },
    ],
  },
  founder: {
    label: 'The direction behind DAMASAVERO', name: 'Osama Tello', role: 'Founder — DAMASAVERO',
    title: 'Thinking and making.\nOne responsibility.',
    body: 'Founder Osama Tello sets a clear direction for DAMASAVERO: take the idea all the way through to the working system. The details of implementation deserve the same care as the original design.',
    direction: 'The ambition is to build a company known for thoughtful engineering and work that holds up in everyday use. That is the standard we want every project to meet.',
  },
  closing: {
    label: 'An open conversation', title: 'Start with what matters.',
    body: 'Tell us about your business and what you want to change. You do not need a technical brief to start the conversation.', action: 'Book a Free Consultation',
  },
};

export const companyAr: CompanyEditorial = {
  eyebrow: 'من نحن / DAMASAVERO', title: ['ذكاء.', 'تحكمه غاية.'],
  introduction: 'تصمّم DAMASAVERO أنظمة أعمال ذكية وتبنيها. نفهم طريقة عمل الشركة، وننطلق من هذا الفهم لاتخاذ القرارات التقنية التي تشكّل أنظمتها.',
  readOn: 'وجهة نظرنا',
  lens: {
    label: 'كيف نفكّر', centre: ['شركتك.', 'في المركز.'],
    caption: 'اختر صفحة مظلّلة لتكتشف فكرة توجّه عملنا.', touchHint: 'مرّر إصبعك على الصفحات. اضغط على صفحة مظلّلة للقراءة.',
    idleTitle: 'أربع أفكار توجّه عملنا.', idleBody: 'نظرة أقرب إلى القرارات التي تقف وراء الأنظمة التي نبنيها.',
    close: 'إغلاق الفكرة', pause: 'إيقاف الحركة', resume: 'تشغيل الحركة',
    insights: [
      { title: 'نختار ما يناسب العمل.', body: 'نختار التقنية بحسب المهمة المطلوبة منها. أحدث نموذج ذكاء اصطناعي يكون مفيدًا عندما يناسب احتياجات شركتك فعلًا.' },
      { title: 'نستعدّ لما هو غير متوقّع.', body: 'المعلومات الناقصة والطلبات غير المعتادة جزء من العمل الحقيقي. يحتاج النظام إلى خطوة تالية واضحة عندما لا تسير الأمور كما خُطّط لها.' },
      { title: 'نبقي القرار بيد الناس.', body: 'ليس كل ما يمكن أتمتته ينبغي أتمتته. نحدّد أين يستطيع النظام التصرّف، ومتى يجب أن يعود القرار إلى شخص.' },
      { title: 'نترك مجالًا للتغيير.', body: 'تتغيّر الشركات. نراعي التعديلات المستقبلية في التصميم، حتى لا يعني تغيير أداة أو قاعدة عمل بالضرورة البدء من جديد.' },
    ],
  },
  premise: {
    label: 'الفكرة وراء DAMASAVERO', title: 'تفاصيل العمل تستحقّ أنظمة تفهمها.',
    paragraphs: [
      'لكل شركة طريقتها في العمل. جزء منها موثّق، وجزء كبير يظهر في القرارات اليومية: من يعرف الإجابة؟ متى يحتاج الطلب إلى اهتمام إضافي؟ ولماذا تُعالج مهمّة بطريقة مختلفة عن غيرها؟',
      'تتمثّل غاية DAMASAVERO في ترجمة هذا الفهم إلى الأنظمة التي تستخدمها الشركة. نهتمّ بالتصميم الكامل: كيف تتكامل المعلومات والقرارات وأدوار الناس، وأين تكون الأتمتة الذكية مفيدة ضمنه.',
    ],
    marginal: 'الشركة أكثر من قائمة مهام.',
  },
  working: {
    label: 'العمل معنا', title: 'معرفتك بشركتك\nجزء من التصميم.',
    introduction: 'أنت تعرف العمل. ونحن نأتي بالتصميم والهندسة. والنتيجة الجيدة تحتاج الاثنين.',
    items: [
      { title: 'لك مساحة للسؤال.', body: 'من حقّك أن تسأل لماذا نوصي بحلّ معيّن، وأن تحصل على إجابة بلغة واضحة. التكاليف والحدود والبدائل جزء من هذا الحوار.' },
      { title: 'رأي من يستخدم النظام مهمّ.', body: 'نريد أن نسمع من الأشخاص الذين سيستخدمون النظام. خبرتهم تساعدنا على مراجعة افتراضاتنا قبل أن تصبح جزءًا من التصميم.' },
      { title: 'الاختلاف قد يحسّن العمل.', body: 'نؤمن بالصراحة عندما تحتاج فكرة إلى مراجعة، وبالإنصات عندما تناقش أفكارنا. التوصية المفيدة تحتاج إلى حوار صادق.' },
    ],
  },
  founder: {
    label: 'الاتجاه وراء DAMASAVERO', name: 'Osama Tello', role: 'المؤسس — DAMASAVERO',
    title: 'التفكير والتنفيذ.\nمسؤولية واحدة.',
    body: 'يحدّد المؤسس Osama Tello اتجاهًا واضحًا للشركة: مرافقة الفكرة حتى تصبح نظامًا يعمل. تفاصيل التنفيذ تستحقّ العناية نفسها التي يحظى بها التصميم الأولي.',
    direction: 'الطموح هو بناء شركة تُعرف بهندسة مدروسة وعمل يثبت جودته في الاستخدام اليومي. هذا هو المعيار الذي نريد لكل مشروع أن يحقّقه.',
  },
  closing: { label: 'حوار مفتوح', title: 'لنبدأ بما يهمّك.', body: 'أخبرنا عن شركتك وما تريد تغييره. لست بحاجة إلى وصف تقني للمشروع كي نبدأ الحوار.', action: 'احجز استشارة مجانية' },
};
