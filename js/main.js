const translations = {
    ar: {
        nav_cta: "ابدأ أسبوعك المجاني",
        hero_title: `استعد لزمالة الطب النفسي<br>وأنت على رأس العمل..<br><span class="highlight">بدون أن تحترق.</span>`,
        hero_subtitle: `خلّينا نكون واقعيين.. مفيش وقت.. مفيش طاقة..<br>والـ textbooks أكبر من اليوم نفسه.<br><strong>ومع ذلك… الامتحان جاي.</strong>`,
        hero_button: "ابدأ أسبوعك المجاني الآن",
        hero_note: "بدون بطاقة ائتمان",
        pain_title: "غالبًا بتعيش السيناريو ده يوميًا",
        pain_1: "تصحى على شيفت",
        pain_2: "ترجع مرهق",
        pain_3: "تفتح PDF وتقفله بعد 10 دقايق",
        pain_4: "وتحس بالذنب إنك “مقصّر”",
        guilt_title: "المشكلة مش فيك",
        guilt_text: "معظم طرق التحضير معمولة لناس متفرغة.. لكن إنت طبيب شغال، مسؤول، ووقتك مسروق.<br>طبيعي تحس إنك تايه لو بتذاكر بنفس الأدوات الغلط.",
        shift_title: "طب لو المذاكرة اتبنت على حياتك… مش العكس؟",
        shift_bad: "مش محتاج 4 ساعات متواصلة",
        shift_good: "شرح يغطي 3-5 صفحات أكاديمية في <strong>10 دقائق</strong>",
        solution_title: "كورس بردي – زمالة الطب النفسي",
        solution_desc: "تطبيق واحد يجمع كل ما تحتاجه.",
        sol_feat_1: "<strong>واجهة منظمة:</strong> كل الكورسات في مكان واحد.",
        sol_feat_2: "<strong>وصول فوري:</strong> حمل وابدأ المذاكرة فوراً.",
        sol_feat_3: "<strong>مصمم للأطباء:</strong> ممارسين، نواب، ووافدين.",
        features_title: "أدوات صُممت خصيصًا للطبيب المشغول",
        feat_1_title: "بنك أسئلة متخصص (QBank)",
        feat_1_desc: "مش مجرد أسئلة عشوائية. تدرب على Egyptian Medical License Exam بنفس نظام الامتحان الحقيقي.",
        feat_2_title: "تتبع تقدمك (History)",
        feat_2_desc: "لن تضيع في المنتصف. خاصية History تحفظ لك آخر جلسة لتعود بضغطة واحدة.",
        feat_3_title: "محتوى مكثف ومرتب",
        feat_3_desc: "دروس مقسمة لوحدات صغيرة (Modules) تغطي المنهج بدون حشو.",
        authority_text: "بناءً على المراجع المعتمدة:",
        final_title: "لو كملت للآخر… غالبًا ده ليك",
        for_you: "الكورس ده ليك لو:",
        chk_1: "عايز مصدر واحد موثوق",
        chk_2: "عايز خطة تمشي عليها",
        chk_3: "عايز تدخل الامتحان وإنت فاهم",
        final_btn: "ابدأ أسبوعك المجاني الآن",
        final_note: "بدون فيزا - بدون مخاطرة"
    },
    en: {
        nav_cta: "Start Free Week",
        hero_title: `Prepare for Psychiatry Fellowship<br>While Working Full-time..<br><span class="highlight">Without Burning Out.</span>`,
        hero_subtitle: `Let's be realistic.. No time.. No energy..<br>Textbooks are bigger than the day itself.<br><strong>Yet… The exam is coming.</strong>`,
        hero_button: "Start Your Free Week Now",
        hero_note: "No Credit Card Required",
        pain_title: "You probably live this scenario daily",
        pain_1: "Wake up for a shift",
        pain_2: "Come back exhausted",
        pain_3: "Open PDF, close it after 10 mins",
        pain_4: "Feel guilty that you are 'falling behind'",
        guilt_title: "It's Not Your Fault",
        guilt_text: "Most prep methods are for people who are free, full-time students... But you are a working doctor, responsible, and your time is stolen.<br>It's normal to feel lost using the wrong tools.",
        shift_title: "What if studying was built around your life... not the opposite?",
        shift_bad: "You don't need 4 continuous hours",
        shift_good: "Explanation covering 3-5 academic pages in <strong>10 minutes</strong>",
        solution_title: "Bardi Course – Psychiatry Fellowship",
        solution_desc: "One app gathering everything you need.",
        sol_feat_1: "<strong>Organized Interface:</strong> All courses in one place.",
        sol_feat_2: "<strong>Instant Access:</strong> Download and start studying immediately.",
        sol_feat_3: "<strong>Designed for Doctors:</strong> Practitioners, Residents, and Expats.",
        features_title: "Tools Designed Specifically for the Busy Doctor",
        feat_1_title: "Specialized QBank",
        feat_1_desc: "Not just random questions. Practice for the Egyptian Medical License Exam with the real exam system.",
        feat_2_title: "Track Your Progress (History)",
        feat_2_desc: "Don't get lost. History feature saves your last session to resume with one click.",
        feat_3_title: "Condensed & Organized Content",
        feat_3_desc: "Lessons divided into small modules covering the curriculum without fluff.",
        authority_text: "Based on Authoritative References:",
        final_title: "If you read this far... This is likely for you",
        for_you: "This course is for you if:",
        chk_1: "You want one trusted source",
        chk_2: "You want a plan to follow",
        chk_3: "You want to enter the exam understanding",
        final_btn: "Start Your Free Week Now",
        final_note: "No Visa - No Risk"
    }
};

const langToggleBtn = document.getElementById('lang-toggle');
const htmlEl = document.documentElement;

langToggleBtn.addEventListener('click', () => {
    const currentLang = htmlEl.getAttribute('lang');
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    const newDir = newLang === 'ar' ? 'rtl' : 'ltr';

    htmlEl.setAttribute('lang', newLang);
    htmlEl.setAttribute('dir', newDir);
    langToggleBtn.textContent = newLang === 'ar' ? 'English' : 'العربية';

    updateContent(newLang);
});

function updateContent(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(17, 17, 24, 0.98)';
        navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
    } else {
        navbar.style.background = 'rgba(17, 17, 24, 0.9)';
        navbar.style.boxShadow = 'none';
    }
});

// Animations on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            entry.target.style.opacity = 1; // Ensure visibility
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .feature-card, .shift-item, .phone-mockup, .hero-content').forEach(el => {
    el.classList.add('fade-in-up'); // Determine initial state via CSS
    el.style.opacity = 0; // Force hidden initially via JS to avoid FOUC
    observer.observe(el);
});

// Inject screen overlay for sheen effect if missing
document.querySelectorAll('.phone-mockup, .f-image').forEach(mockup => {
    // Only add overlay if it doesn't already exist
    if (!mockup.querySelector('.screen-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'screen-overlay';
        mockup.appendChild(overlay);
    }
});
