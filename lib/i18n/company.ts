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
    caption: 'Brush across the pages. Click any page to read the idea behind it.',
    touchHint: 'Brush across the pages. Tap any page to read it.',
    idleTitle: 'The thinking behind our work.',
    idleBody: 'Every page here is an idea. Brush across them, then open one to read it.',
    close: 'Close insight', pause: 'Pause motion', resume: 'Resume motion',
    insights: [
      { title: 'Choose what fits.', body: 'We choose technology for the job it needs to do. The newest AI model is useful only if it makes sense for your business.' },
      { title: 'Plan for the unexpected.', body: 'Missing information and unusual requests are part of real work. A system needs a clear next step when things do not go to plan.' },
      { title: 'Keep people in control.', body: 'Not everything that can be automated should be. We define where the system can act and where a person needs to decide.' },
      { title: 'Leave room for change.', body: 'Businesses change. We design with future adjustments in mind, so changing a tool or a business rule does not have to mean starting over.' },
      { title: 'Understand the work first.', body: 'Before we design anything, we learn how the work is actually done today — including the parts that never made it into a document.' },
      { title: 'Automate the pattern, not the exception.', body: 'The routine, repeatable path is where automation earns its place. Rare cases are routed to a person, not forced through a rule.' },
      { title: 'Connect before you replace.', body: 'Most businesses already run on tools that work. We connect and orchestrate them before proposing anything new.' },
      { title: 'One source of truth.', body: 'When the same fact lives in three systems, one of them is wrong. We decide where each piece of information belongs and keep the rest in sync.' },
      { title: 'Make the system explain itself.', body: 'A good system shows its work: what it did, why, and what happens next. Silent automation is hard to trust and harder to fix.' },
      { title: 'Design for the person who maintains it.', body: 'Someone will change this system after we leave. We build so that a small change stays a small change.' },
      { title: 'Start where the friction is.', body: 'We look for the step that quietly costs the most time or loses the most work, and we begin there.' },
      { title: 'Measure what changed.', body: 'A system is worth keeping only if you can see the difference it made. We agree on what to watch before we build.' },
      { title: 'Fewer moving parts.', body: 'Every integration, rule and exception is something to maintain. We keep the design as small as the problem allows.' },
      { title: 'Clear handoffs.', body: 'When work passes between a system and a person, the boundary should be obvious to both. Ambiguity at the seam is where things get dropped.' },
      { title: 'Fail loudly, not silently.', body: 'When something breaks, the system should say so — to the right person, with enough context to act. Errors that hide become outages.' },
      { title: 'Respect existing habits.', body: 'People have working routines. A system that ignores them gets worked around; one that fits them gets used.' },
      { title: 'Automate to free attention.', body: 'The point is not to remove people. It is to move their attention from repetitive handling to the work that needs judgment.' },
      { title: 'Keep the data honest.', body: 'Automation moves information faster, including mistakes. We validate at the point of entry, not after it spreads.' },
      { title: 'Write down the rules.', body: 'Business logic buried in code is invisible. We keep the rules a system follows where they can be read, questioned and changed.' },
      { title: 'Small releases.', body: 'We prefer to ship a working piece early and adjust, rather than disappear for months and hope the assumptions held.' },
      { title: 'Own the whole path.', body: 'From the first conversation to the running system, it is one responsibility. Design decisions and implementation decisions answer to each other.' },
      { title: 'Name the trade-offs.', body: 'Every choice costs something — time, flexibility, or money later. We say what a decision gives up, not only what it gains.' },
      { title: 'Build for a normal day.', body: 'Systems are easy to design for the demo. We design for a busy Tuesday, with incomplete information and competing priorities.' },
      { title: 'Keep a way back.', body: 'New automation runs alongside the current way of working until it has earned trust. Switching over is a decision, not a surprise.' },
      { title: 'Documentation is part of the work.', body: 'A system nobody can explain is a liability. We hand over notes a new person can follow.' },
      { title: 'Let the business set the pace.', body: 'Change lands better in steps the organisation can absorb. We sequence the work around that, not against it.' },
      { title: 'Guard the edges.', body: 'Inputs from outside — forms, emails, uploads — are where systems get surprised. We assume they will be messy and handle it.' },
      { title: 'Automate decisions, keep the record.', body: 'When a system decides something, it should leave a trail: what it saw, what it chose, and when. That record is what makes it reviewable.' },
      { title: 'Prefer boring technology.', body: 'Well-understood tools have fewer surprises. We reserve novelty for the places where it genuinely changes the outcome.' },
      { title: 'The interface is the contract.', body: 'Where two systems meet, the agreement between them should be explicit and stable, so either side can change without breaking the other.' },
      { title: 'Reduce the number of places to look.', body: 'Every extra dashboard is another tab nobody opens. We bring the signal to where the work already happens.' },
      { title: 'Test with real cases.', body: 'Sample data behaves. Real records have missing fields, odd formats and history. We test against those before we trust a system.' },
      { title: 'Keep humans in the loop where it counts.', body: 'For decisions that carry risk or cost, the system prepares the work and a person approves it. Speed should not remove accountability.' },
      { title: 'Design the exit.', body: 'Someday this system will be replaced or retired. We keep data portable and dependencies loose so that day is manageable.' },
      { title: 'Consistency over cleverness.', body: 'A predictable system that behaves the same way every time is worth more than a clever one that occasionally surprises you.' },
      { title: 'Follow the information.', body: 'We map how a piece of information moves through the business — who creates it, who needs it, where it stalls — and design around that path.' },
      { title: 'Automate the follow-through.', body: 'Starting a process is easy. The value is in making sure it finishes: the reminder, the confirmation, the closed loop.' },
      { title: 'Keep the model replaceable.', body: 'AI models change quickly. We build so that swapping one for a better one is a configuration change, not a rebuild.' },
      { title: 'Say no to scope that does not serve the goal.', body: 'A feature that does not move the outcome is cost without return. We keep the work pointed at what you came to change.' },
      { title: 'Leave it better documented than we found it.', body: 'By the end, the business should understand its own systems more clearly than before we started — not less.' },
    ],
  },
  premise: {
    label: 'Why DAMASAVERO exists', title: 'The details of a business deserve better systems.',
    paragraphs: [
      'Every company develops its own way of working. Some of it is written down. Much of it lives in everyday decisions — who knows the answer, and why one job is handled differently from another.',
      'DAMASAVERO exists to bring that understanding into the systems a business uses — how information, decisions and people fit together, and where automation belongs within it.',
    ],
    marginal: 'A company is more than a list of tasks.',
  },
  working: {
    label: 'Working with us', title: 'Your knowledge belongs\nat the drawing table.',
    introduction: 'You know the business. We bring the design and engineering. Good work needs both.',
    items: [
      { title: 'There is room for questions.', body: 'Ask why we recommend something and get an answer in plain language. Costs, limits and alternatives belong in that conversation.' },
      { title: 'The people doing the work matter.', body: 'We want to hear from the people who will use the system — their experience challenges assumptions before those assumptions reach the design.' },
      { title: 'Disagreement can improve the work.', body: 'We are direct when an idea needs rethinking, and we listen when you challenge ours. A useful recommendation needs an honest conversation.' },
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
    caption: 'مرّر على الصفحات. اضغط أي صفحة لقراءة الفكرة وراءها.', touchHint: 'مرّر إصبعك على الصفحات. اضغط أي صفحة لقراءتها.',
    idleTitle: 'التفكير وراء عملنا.', idleBody: 'كل صفحة هنا فكرة. مرّر عليها ثم افتح واحدة لقراءتها.',
    close: 'إغلاق الفكرة', pause: 'إيقاف الحركة', resume: 'تشغيل الحركة',
    insights: [
      { title: 'نختار ما يناسب العمل.', body: 'نختار التقنية بحسب المهمة المطلوبة منها. أحدث نموذج ذكاء اصطناعي يكون مفيدًا عندما يناسب احتياجات شركتك فعلًا.' },
      { title: 'نستعدّ لما هو غير متوقّع.', body: 'المعلومات الناقصة والطلبات غير المعتادة جزء من العمل الحقيقي. يحتاج النظام إلى خطوة تالية واضحة عندما لا تسير الأمور كما خُطّط لها.' },
      { title: 'نبقي القرار بيد الناس.', body: 'ليس كل ما يمكن أتمتته ينبغي أتمتته. نحدّد أين يستطيع النظام التصرّف، ومتى يجب أن يعود القرار إلى شخص.' },
      { title: 'نترك مجالًا للتغيير.', body: 'تتغيّر الشركات. نراعي التعديلات المستقبلية في التصميم، حتى لا يعني تغيير أداة أو قاعدة عمل بالضرورة البدء من جديد.' },
      { title: 'افهم العمل أولًا.', body: 'قبل أن نصمّم أي شيء، نتعرّف على كيفية إنجاز العمل فعليًا اليوم، بما في ذلك ما لم يُوثَّق قط.' },
      { title: 'أتمت النمط لا الاستثناء.', body: 'المسار المتكرر المنتظم هو ما تستحقّ الأتمتة أن تتولّاه. الحالات النادرة تُحوَّل إلى شخص، لا تُقحَم في قاعدة.' },
      { title: 'اربط قبل أن تستبدل.', body: 'معظم الشركات تعمل بأدوات ناجحة بالفعل. نربطها وننسّق بينها قبل أن نقترح شيئًا جديدًا.' },
      { title: 'مصدر واحد للحقيقة.', body: 'حين تعيش المعلومة نفسها في ثلاثة أنظمة، يكون أحدها خاطئًا. نحدّد أين تنتمي كل معلومة ونُبقي البقية متزامنة.' },
      { title: 'اجعل النظام يشرح نفسه.', body: 'النظام الجيد يُظهر عمله: ماذا فعل، ولماذا، وما الخطوة التالية. الأتمتة الصامتة يصعب الوثوق بها وإصلاحها.' },
      { title: 'صمّم لمن سيصونه.', body: 'سيغيّر أحدهم هذا النظام بعد رحيلنا. نبني بحيث يبقى التغيير الصغير صغيرًا.' },
      { title: 'ابدأ من موضع الاحتكاك.', body: 'نبحث عن الخطوة التي تكلّف الوقت بهدوء أو تُضيّع أكبر قدر من العمل، ونبدأ منها.' },
      { title: 'قِس ما الذي تغيّر.', body: 'يستحقّ النظام البقاء فقط إذا رأيت الفرق الذي أحدثه. نتّفق على ما نراقبه قبل أن نبني.' },
      { title: 'أجزاء متحرّكة أقل.', body: 'كل تكامل وقاعدة واستثناء شيء يجب صيانته. نُبقي التصميم بحجم المشكلة لا أكبر.' },
      { title: 'تسليمات واضحة.', body: 'حين ينتقل العمل بين نظام وشخص، ينبغي أن يكون الحدّ واضحًا لكليهما. الغموض عند الفاصل هو حيث تسقط الأمور.' },
      { title: 'أعلِن الخطأ ولا تُخفِه.', body: 'عند حدوث عطل، على النظام أن يُبلغ الشخص المناسب بسياق كافٍ للتصرّف. الأخطاء المخفيّة تتحوّل إلى انقطاعات.' },
      { title: 'احترم العادات القائمة.', body: 'للناس روتين يعمل. النظام الذي يتجاهله يُلتَفّ حوله، والذي يناسبه يُستخدَم.' },
      { title: 'أتمت لتحرّر الانتباه.', body: 'الهدف ليس إزالة الناس، بل نقل انتباههم من المعالجة المتكرّرة إلى العمل الذي يحتاج حكمًا.' },
      { title: 'أبقِ البيانات صادقة.', body: 'الأتمتة تنقل المعلومة أسرع، بما فيها الأخطاء. نتحقّق عند نقطة الإدخال لا بعد انتشارها.' },
      { title: 'دوّن القواعد.', body: 'منطق العمل المدفون في الشيفرة غير مرئي. نُبقي القواعد التي يتبعها النظام حيث يمكن قراءتها ومناقشتها وتغييرها.' },
      { title: 'إصدارات صغيرة.', body: 'نفضّل تسليم جزء يعمل مبكرًا ثم التعديل، بدل الغياب أشهرًا على أمل أن تصمد الافتراضات.' },
      { title: 'تولَّ المسار كاملًا.', body: 'من أول حوار إلى النظام العامل، إنها مسؤولية واحدة. قرارات التصميم وقرارات التنفيذ يجيب بعضها عن بعض.' },
      { title: 'سمِّ المقايضات.', body: 'كل خيار يكلّف شيئًا: وقتًا أو مرونة أو مالًا لاحقًا. نقول ما الذي يتنازل عنه القرار لا ما يكسبه فقط.' },
      { title: 'ابنِ ليوم عادي.', body: 'من السهل التصميم للعرض التوضيحي. نصمّم ليوم مزدحم بمعلومات ناقصة وأولويات متضاربة.' },
      { title: 'أبقِ طريقًا للعودة.', body: 'تعمل الأتمتة الجديدة إلى جانب الطريقة الحالية حتى تكسب الثقة. الانتقال قرار لا مفاجأة.' },
      { title: 'التوثيق جزء من العمل.', body: 'النظام الذي لا يستطيع أحد شرحه عبء. نسلّم ملاحظات يستطيع شخص جديد اتّباعها.' },
      { title: 'دع العمل يحدّد الإيقاع.', body: 'يترسّخ التغيير أفضل بخطوات تستوعبها المؤسسة. نرتّب العمل وفق ذلك لا ضدّه.' },
      { title: 'احرس الأطراف.', body: 'المدخلات من الخارج — نماذج ورسائل وملفات — حيث تُفاجأ الأنظمة. نفترض أنها ستكون فوضوية ونتعامل معها.' },
      { title: 'أتمت القرار واحتفظ بالسجل.', body: 'حين يقرّر النظام شيئًا، عليه أن يترك أثرًا: ماذا رأى، وماذا اختار، ومتى. هذا السجل ما يجعله قابلًا للمراجعة.' },
      { title: 'فضّل التقنية المألوفة.', body: 'الأدوات المفهومة جيدًا مفاجآتها أقل. نحتفظ بالجديد للمواضع التي يغيّر فيها النتيجة فعلًا.' },
      { title: 'الواجهة هي العقد.', body: 'حيث يلتقي نظامان، ينبغي أن يكون الاتفاق بينهما صريحًا وثابتًا، ليتغيّر أيّ طرف دون كسر الآخر.' },
      { title: 'قلّل أماكن البحث.', body: 'كل لوحة إضافية تبويب لا يفتحه أحد. نُحضر الإشارة إلى حيث يجري العمل أصلًا.' },
      { title: 'اختبر بحالات حقيقية.', body: 'البيانات النموذجية تتصرّف بأدب. السجلات الحقيقية بها حقول ناقصة وصيغ غريبة وتاريخ. نختبر عليها قبل الوثوق.' },
      { title: 'أبقِ الإنسان في الحلقة حيث يهمّ.', body: 'للقرارات ذات المخاطر أو الكلفة، يجهّز النظام العمل ويعتمده شخص. السرعة لا تُلغي المساءلة.' },
      { title: 'صمّم المخرج.', body: 'سيُستبدَل هذا النظام أو يُتقاعَد يومًا. نُبقي البيانات قابلة للنقل والاعتماديات مرنة ليكون ذلك اليوم قابلًا للإدارة.' },
      { title: 'الاتّساق قبل البراعة.', body: 'نظام متوقّع يتصرّف بالطريقة نفسها كل مرة أثمن من نظام بارع يفاجئك أحيانًا.' },
      { title: 'اتبع المعلومة.', body: 'نرسم كيف تتحرّك المعلومة عبر الشركة: من ينشئها، من يحتاجها، أين تتعطّل، ونصمّم حول هذا المسار.' },
      { title: 'أتمت الإتمام.', body: 'بدء العملية سهل. القيمة في ضمان انتهائها: التذكير، التأكيد، إغلاق الحلقة.' },
      { title: 'أبقِ النموذج قابلًا للاستبدال.', body: 'نماذج الذكاء الاصطناعي تتغيّر بسرعة. نبني بحيث يكون استبدال نموذج بأفضل منه تغييرًا في الإعداد لا إعادة بناء.' },
      { title: 'ارفض النطاق الذي لا يخدم الهدف.', body: 'الميزة التي لا تحرّك النتيجة كلفة بلا عائد. نُبقي العمل موجَّهًا نحو ما جئت لتغييره.' },
      { title: 'اتركه موثّقًا أفضل ممّا وجدته.', body: 'في النهاية، ينبغي أن تفهم الشركة أنظمتها أوضح من قبل أن نبدأ، لا أقلّ.' },
    ],
  },
  premise: {
    label: 'الفكرة وراء DAMASAVERO', title: 'تفاصيل العمل تستحقّ أنظمة تفهمها.',
    paragraphs: [
      'لكل شركة طريقتها في العمل. جزء منها موثّق، وجزء كبير يظهر في القرارات اليومية — من يعرف الإجابة، ولماذا تُعالج مهمّة بطريقة مختلفة عن غيرها.',
      'تتمثّل غاية DAMASAVERO في ترجمة هذا الفهم إلى أنظمة الشركة — كيف تتكامل المعلومات والقرارات وأدوار الناس، وأين تكون الأتمتة ضمنه.',
    ],
    marginal: 'الشركة أكثر من قائمة مهام.',
  },
  working: {
    label: 'العمل معنا', title: 'معرفتك بشركتك\nجزء من التصميم.',
    introduction: 'أنت تعرف العمل. ونحن نأتي بالتصميم والهندسة. والنتيجة الجيدة تحتاج الاثنين.',
    items: [
      { title: 'لك مساحة للسؤال.', body: 'اسأل لماذا نوصي بحلّ معيّن، واحصل على إجابة بلغة واضحة. التكاليف والحدود والبدائل جزء من الحوار.' },
      { title: 'رأي من يستخدم النظام مهمّ.', body: 'نريد أن نسمع ممّن سيستخدمون النظام — خبرتهم تراجع افتراضاتنا قبل أن تصل إلى التصميم.' },
      { title: 'الاختلاف قد يحسّن العمل.', body: 'نصارحك عندما تحتاج فكرة إلى مراجعة، وننصت عندما تناقش أفكارنا. التوصية المفيدة تحتاج حوارًا صادقًا.' },
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
