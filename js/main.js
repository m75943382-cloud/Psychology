// Translations will be loaded from external JSON file
let translations = {};

// Load translations from JSON file
async function loadTranslations() {
    try {
        const response = await fetch('js/translations.json');
        translations = await response.json();
        return true;
    } catch (error) {
        console.error('Failed to load translations:', error);
        return false;
    }
}


const langToggleBtn = document.getElementById('lang-toggle');
const htmlEl = document.documentElement;

langToggleBtn.addEventListener('click', () => {
    const currentLang = htmlEl.getAttribute('lang');
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    const newDir = newLang === 'ar' ? 'rtl' : 'ltr';

    htmlEl.setAttribute('lang', newLang);
    htmlEl.setAttribute('dir', newDir);
    langToggleBtn.textContent = newLang === 'ar' ? 'English' : 'العربية';

    // Save preference
    localStorage.setItem('preferred_lang', newLang);

    updateContent(newLang);
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('mobile-menu');
const navMenuWrapper = document.querySelector('.nav-menu-wrapper');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenuWrapper.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenuWrapper.classList.remove('active');
    });
});

function updateContent(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
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

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            entry.target.style.opacity = 1;

            // Trigger shine effect for phone frames
            if (entry.target.classList.contains('phone-frame')) {
                entry.target.classList.add('shine-active');
            }

            scrollObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Floating CTA Visibility Logic
const floatingCta = document.getElementById('floating-cta');
const heroSection = document.getElementById('home');

const floatingObserverOptions = {
    root: null,
    threshold: 0.5
};

const floatingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (floatingCta) floatingCta.classList.remove('visible');
        } else {
            if (floatingCta) floatingCta.classList.add('visible');
        }
    });
}, floatingObserverOptions);

// Analytics Tracking Config
const TRACKING_CONFIG = {
    huawei: { selector: '.btn-huawei', name: 'Huawei AppGallery' },
    xiaomi: { selector: '.btn-xiaomi', name: 'Xiaomi Store' },
    testflight_dl: { id: 'btn-testflight-download', name: 'Download TestFlight', event: 'ViewContent' },
    app_install: { id: 'btn-app-install', name: 'Install Bardi App', event: 'CompleteRegistration' }
};

// Global Stats Counter Animation Function
const startCount = (el) => {
    const target = +el.getAttribute('data-target');
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const increment = target / (duration / 16);

    let current = 0;
    const updateCount = () => {
        current += increment;
        if (current < target) {
            el.textContent = Math.ceil(current).toLocaleString() + suffix;
            requestAnimationFrame(updateCount);
        } else {
            el.textContent = target.toLocaleString() + suffix;
        }
    };
    updateCount();
};

// Initialize Everything on DOMContentLoaded
document.addEventListener('DOMContentLoaded', async () => {
    // Load translations first
    const translationsLoaded = await loadTranslations();
    if (!translationsLoaded) {
        console.error('Failed to load translations. Page may not display correctly.');
    }

    // 1. Language Persistence & Initial Content Load
    const savedLang = localStorage.getItem('preferred_lang') || 'ar';

    // Set attributes for consistency
    htmlEl.setAttribute('lang', savedLang);
    htmlEl.setAttribute('dir', savedLang === 'ar' ? 'rtl' : 'ltr');
    langToggleBtn.textContent = savedLang === 'ar' ? 'English' : 'العربية';

    // ALWAYS update content on load to fill empty data-i18n elements
    updateContent(savedLang);

    // 2. Scroll Animations
    document.querySelectorAll('.card, .feature-card, .shift-item, .phone-frame, .wyg-item, .hero-content').forEach(el => {
        el.classList.add('fade-in-up');
        el.style.opacity = 0;
        scrollObserver.observe(el);
    });

    // 3. Floating CTA
    if (heroSection && floatingCta) {
        floatingObserver.observe(heroSection);
    }

    // 4. TestFlight Popup
    const popup = document.getElementById('ios-popup');
    const iosBtns = document.querySelectorAll('.btn-ios');
    const closeBtn = document.querySelector('.popup-close');

    if (popup && iosBtns.length > 0) {
        iosBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                popup.classList.add('active');
            });
        });
        if (closeBtn) {
            closeBtn.addEventListener('click', () => popup.classList.remove('active'));
        }
        popup.addEventListener('click', (e) => { if (e.target === popup) popup.classList.remove('active'); });
    }

    // 5. Analytics
    const trackEvent = (platform, eventName, contentName) => {
        if (typeof fbq === 'function') fbq('track', eventName, { content_name: contentName });
        if (typeof gtag === 'function') gtag('event', 'conversion', { 'send_to': 'G-M8GBYMDTLG', 'event_category': 'App Download', 'event_label': contentName });
        console.log(`[Analytics] Tracked ${platform}: ${eventName} - ${contentName}`);
    };

    document.querySelectorAll(TRACKING_CONFIG.huawei.selector).forEach(btn => btn.addEventListener('click', () => trackEvent('huawei', 'CompleteRegistration', TRACKING_CONFIG.huawei.name)));
    document.querySelectorAll(TRACKING_CONFIG.xiaomi.selector).forEach(btn => btn.addEventListener('click', () => trackEvent('xiaomi', 'CompleteRegistration', TRACKING_CONFIG.xiaomi.name)));
    const tfBtn = document.getElementById(TRACKING_CONFIG.testflight_dl.id);
    if (tfBtn) tfBtn.addEventListener('click', () => trackEvent('ios_step1', TRACKING_CONFIG.testflight_dl.event, TRACKING_CONFIG.testflight_dl.name));
    const instBtn = document.getElementById(TRACKING_CONFIG.app_install.id);
    if (instBtn) instBtn.addEventListener('click', () => trackEvent('ios_step2', TRACKING_CONFIG.app_install.event, TRACKING_CONFIG.app_install.name));

    // 6. Stats Animation
    const statsSection = document.querySelector('.platform-stats');
    const numbers = document.querySelectorAll('.stat-number');
    let statsStarted = false;

    if (statsSection && numbers.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsStarted) {
                    statsStarted = true;
                    numbers.forEach(num => startCount(num));
                }
            });
        }, { threshold: 0.5 });
        statsObserver.observe(statsSection);
    }

    // 7. Direct APK Download Message
    document.querySelectorAll('.btn-apk').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent immediate navigation
            const currentLang = document.documentElement.getAttribute('lang') || 'ar';
            const msg = translations[currentLang].apk_download_msg;
            alert(msg);
            // Start download after user clicks OK
            const downloadUrl = btn.getAttribute('href');
            if (downloadUrl) {
                window.location.href = downloadUrl;
            }
            // Optional: Track Event
            if (typeof trackEvent === 'function') trackEvent('apk', 'Download', 'Direct APK');
        });
    });

    // 8. Copy TestFlight Link
    const copyBtn = document.getElementById('btn-copy-link');
    const copySuccess = document.getElementById('copy-success');
    const testFlightLink = 'https://testflight.apple.com/join/Std3CMs1';

    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(testFlightLink).then(() => {
                // Show success message
                copySuccess.classList.add('show');

                // Change button text temporarily
                const btnText = copyBtn.querySelector('span');
                const currentLang = document.documentElement.getAttribute('lang') || 'ar';
                const originalText = btnText.textContent;
                btnText.textContent = translations[currentLang].popup_copied;

                // Reset after 2 seconds
                setTimeout(() => {
                    copySuccess.classList.remove('show');
                    btnText.textContent = originalText;
                }, 2000);

                // Track event
                if (typeof trackEvent === 'function') trackEvent('ios', 'CopyLink', 'TestFlight');
            }).catch(err => {
                console.error('Failed to copy: ', err);
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = testFlightLink;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                copySuccess.classList.add('show');
                setTimeout(() => copySuccess.classList.remove('show'), 2000);
            });
        });
    }

    // Accordion functionality for Content Index
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            // Toggle active class
            item.classList.toggle('active');
        });
    });
});