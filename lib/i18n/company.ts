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
    studyLabel: string;
    items: { key: string; label: string; title: string; body: string; question: string; annotation: string; terms: [string, string]; captions: [string, string]; aside?: string }[];
  };
  founder: { label: string; name: string; role: string; title: string; body: string; direction: string };
  closing: { label: string; title: string; body: string; action: string };
}

export const companyEn: CompanyEditorial = {
  eyebrow: 'Who We Are / DAMASAVERO',
  title: ['Intelligence.', 'With intention.'],
  introduction: 'DAMASAVERO designs and builds intelligent business systems. We bring the logic of a business and the craft of engineering into the same conversation — with a clear purpose for every technical choice.',
  readOn: 'Our point of view',
  lens: {
    label: 'The human frame',
    centre: ['Human', 'intent.'],
    caption: 'Technology is the frame. Human intent stays at the centre.',
  },
  premise: {
    label: 'The reason behind the company',
    title: 'A business has a logic of its own.',
    paragraphs: [
      'Its priorities, promises and exceptions are rarely captured in a neat specification. They live in how people make decisions. Designing a system means taking that context seriously, including the parts that are difficult to put into words.',
      'DAMASAVERO exists at the meeting point of operational thinking and technical craft. We believe the quality of a system begins with how faithfully its design expresses the business it belongs to. Intelligence is one material in that design, not a substitute for it.',
    ],
    marginal: 'Business logic gives technology its meaning.',
  },
  convictions: {
    label: 'Our convictions',
    title: 'The choices behind\nthe system.',
    instruction: 'Explore the principles that shape our design decisions.',
    studyLabel: 'Design notes',
    items: [
      {
        key: 'precision', label: 'Precision', title: 'The exception belongs in the design.',
        body: 'A rule that works only when everything goes to plan is an unfinished idea. We think in conditions: what must be true, what could contradict it and what should happen when information is missing. Precision means making those assumptions explicit.',
        question: 'Under what conditions is this the right action?', annotation: 'A rule and its exception are designed together.', terms: ['IF', 'UNLESS'], captions: ['The condition', 'The exception'],
      },
      {
        key: 'responsibility', label: 'Responsibility', title: 'Capability is not permission.',
        body: 'What a system may do should be a deliberate business decision. We believe authority needs a clear boundary, proportionate to the consequences. People should be able to understand that boundary and retain the judgement that belongs to them.',
        question: 'Where does the system’s authority end?', annotation: 'Permission includes an explicit limit.', terms: ['MAY', 'MUST NOT'], captions: ['Delegated authority', 'A reserved decision'], aside: 'Not everything that can be automated should be.',
      },
      {
        key: 'adaptability', label: 'Adaptability', title: 'Keep the intent. Reconsider the implementation.',
        body: 'A business rule should not become inseparable from a particular platform or AI model. We favour clear boundaries between purpose and implementation, so a technical choice can be revisited without redefining what the business means.',
        question: 'What should endure when the technology changes?', annotation: 'The purpose anchors the choice. The choice can change.', terms: ['INTENT', 'METHOD'], captions: ['What the business means', 'How technology serves it'],
      },
    ],
  },
  founder: {
    label: 'The thinking behind DAMASAVERO', name: 'Osama Tello', role: 'Founder — DAMASAVERO',
    title: 'Thinking and making.\nOne responsibility.',
    body: 'The direction set by founder Osama Tello is clear: bring systems thinking and hands-on implementation together. A design should be judged by what happens when people use it, not only by how convincing it sounds in a presentation.',
    direction: 'The ambition for DAMASAVERO is to build a company where the quality of the thinking and the care of the implementation are inseparable. The technology will evolve. That standard should endure.',
  },
  closing: {
    label: 'An open conversation', title: 'Start with what matters.',
    body: 'Tell us what you believe your business should become. That is a useful place to begin.', action: 'Book a Free Consultation',
  },
};

export const companyAr: CompanyEditorial = {
  eyebrow: 'من نحن / DAMASAVERO',
  title: ['ذكاء.', 'تحكمه غاية.'],
  introduction: 'تصمّم DAMASAVERO أنظمة أعمال ذكية وتبنيها. نجمع بين منطق العمل ودقّة الهندسة في حوار واحد، لتكون وراء كل اختيار تقني غاية واضحة.',
  readOn: 'وجهة نظرنا',
  lens: { label: 'الإطار الإنساني', centre: ['الغاية', 'الإنسانية.'], caption: 'التقنية هي الإطار. وتبقى الغاية الإنسانية في المركز.' },
  premise: {
    label: 'الفكرة وراء الشركة', title: 'لكل شركة منطقها الخاص.',
    paragraphs: [
      'أولويات الشركة ووعودها واستثناءاتها نادرًا ما تكون موثّقة بالكامل. تظهر في طريقة اتخاذ الناس للقرارات. تصميم النظام يعني فهم هذا السياق بجدّية، بما فيه التفاصيل التي يصعب التعبير عنها.',
      'تعمل DAMASAVERO عند نقطة التقاء التفكير في العمليات ودقّة التنفيذ التقني. نؤمن بأن جودة النظام تبدأ من مدى تعبير تصميمه عن الشركة التي ينتمي إليها. الذكاء الاصطناعي عنصر في هذا التصميم، وليس بديلًا عنه.',
    ],
    marginal: 'منطق العمل هو ما يمنح التقنية معناها.',
  },
  convictions: {
    label: 'قناعاتنا', title: 'الاختيارات التي\nتشكّل النظام.', instruction: 'تعرّف على المبادئ التي توجّه قراراتنا في التصميم.', studyLabel: 'ملاحظات تصميمية',
    items: [
      {
        key: 'precision', label: 'الدقّة', title: 'الاستثناء جزء من التصميم.',
        body: 'القاعدة التي تعمل فقط عندما يسير كل شيء كما خُطّط له، فكرة غير مكتملة. نفكّر بالشروط: ما الذي يجب أن يتحقّق؟ وما الذي قد يناقضه؟ وماذا يحدث حين تنقص المعلومات؟ الدقّة تعني جعل هذه الافتراضات صريحة.',
        question: 'متى يكون هذا هو التصرّف الصحيح؟', annotation: 'نصمّم القاعدة واستثناءها معًا.', terms: ['إذا', 'إلا إذا'], captions: ['الشرط', 'الاستثناء'],
      },
      {
        key: 'responsibility', label: 'المسؤولية', title: 'القدرة لا تعني الصلاحية.',
        body: 'ما يُسمح للنظام بفعله يجب أن يكون قرارًا واعيًا من الشركة. نرى أن الصلاحيات تحتاج حدودًا واضحة تتناسب مع تبعات القرار. ويجب أن يستطيع الناس فهم تلك الحدود والاحتفاظ بالتقدير الذي يخصّهم.',
        question: 'أين تنتهي صلاحية النظام؟', annotation: 'الصلاحية تتضمّن حدًّا صريحًا.', terms: ['مسموح', 'غير مسموح'], captions: ['صلاحية مفوّضة', 'قرار محفوظ للإنسان'], aside: 'ليس كل ما يمكن أتمتته ينبغي أتمتته.',
      },
      {
        key: 'adaptability', label: 'قابلية التكيّف', title: 'نحافظ على الغاية. ونراجع طريقة التنفيذ.',
        body: 'لا ينبغي أن تصبح قاعدة العمل مرتبطة بمنصّة أو نموذج ذكاء اصطناعي لا يمكن الاستغناء عنه. نفضّل حدودًا واضحة بين الغاية والتنفيذ، ليبقى الاختيار التقني قابلًا للمراجعة دون إعادة تعريف منطق الشركة.',
        question: 'ما الذي يجب أن يستمرّ حين تتغيّر التقنية؟', annotation: 'الغاية توجّه الاختيار. والاختيار قابل للتغيير.', terms: ['الغاية', 'الوسيلة'], captions: ['ما يقصده العمل', 'كيف تخدمه التقنية'],
      },
    ],
  },
  founder: {
    label: 'الفكر وراء DAMASAVERO', name: 'Osama Tello', role: 'المؤسس — DAMASAVERO',
    title: 'التفكير والتنفيذ.\nمسؤولية واحدة.',
    body: 'الاتجاه الذي يحدّده المؤسس Osama Tello واضح: الجمع بين التفكير في الأنظمة والتنفيذ العملي. قيمة التصميم تُقاس بما يحدث حين يستخدمه الناس، لا بمدى إقناعه في عرض تقديمي فقط.',
    direction: 'طموح DAMASAVERO هو بناء شركة لا تنفصل فيها جودة التفكير عن العناية بالتنفيذ. ستتطوّر التقنية، لكن هذا المعيار يجب أن يبقى.',
  },
  closing: { label: 'حوار مفتوح', title: 'لنبدأ بما يهمّك.', body: 'أخبرنا كيف تتصوّر مستقبل شركتك. من هنا يبدأ حوار يستحقّ الوقت.', action: 'احجز استشارة مجانية' },
};
