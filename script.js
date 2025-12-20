/**
 * Bardy Course Landing Page Script
 * Premium Interactions & Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    initSlider();
    initFAQ();
    initDeviceDetection();
    initScrollAnimations();
    cloneButtons();
});

/* =========================================
   Comparison Slider Logic
   ========================================= */
function initSlider() {
    const slider = document.getElementById('slider');
    const handle = slider.querySelector('.handle');
    const afterImage = slider.querySelector('.image-after');

    let isDragging = false;

    function moveSlider(x) {
        const rect = slider.getBoundingClientRect();
        let position = ((x - rect.left) / rect.width) * 100;

        // Clamp between 0 and 100
        position = Math.max(0, Math.min(100, position));

        // Update widths and positions
        handle.style.left = `${position}%`;
        afterImage.style.clipPath = `polygon(${position}% 0, 100% 0, 100% 100%, ${position}% 100%)`;
    }

    // Mouse Events
    handle.addEventListener('mousedown', () => isDragging = true);
    window.addEventListener('mouseup', () => isDragging = false);
    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        moveSlider(e.clientX);
    });

    // Touch Events (for Mobile)
    handle.addEventListener('touchstart', () => isDragging = true);
    window.addEventListener('touchend', () => isDragging = false);
    window.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        moveSlider(e.touches[0].clientX);
    });

    // Click on track to jump
    slider.addEventListener('click', (e) => {
        moveSlider(e.clientX);
    });
}

/* =========================================
   FAQ Accordion
   ========================================= */
function initFAQ() {
    const questions = document.querySelectorAll('.faq-question');

    questions.forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const isActive = item.classList.contains('active');

            // Close all others
            document.querySelectorAll('.faq-item').forEach(i => {
                i.classList.remove('active');
            });

            // Toggle current
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

/* =========================================
   Device & Link Logic
   ========================================= */
function initDeviceDetection() {
    const ua = navigator.userAgent.toLowerCase();
    const btns = document.querySelectorAll('.store-btn');

    // Default Links (Placeholders)
    const links = {
        huawei: '#huawei-store',
        xiaomi: '#xiaomi-store',
        ios: '#testflight-beta'
    };

    // Update Hrefs
    btns.forEach(btn => {
        const platform = btn.dataset.platform;
        if (links[platform]) {
            btn.href = links[platform];
        }
    });

    // Highlight relevant button based on User Agent
    if (/iphone|ipad|ipod/.test(ua)) {
        highlightPlatform('ios');
    } else if (/huawei|honor/.test(ua)) {
        highlightPlatform('huawei');
    } else if (/xiaomi|redmi|poco/.test(ua)) {
        highlightPlatform('xiaomi');
    }
}

function highlightPlatform(platform) {
    const targetBtns = document.querySelectorAll(`[data-platform="${platform}"]`);
    targetBtns.forEach(btn => {
        btn.style.borderColor = 'var(--primary)';
        btn.style.boxShadow = '0 0 20px rgba(247, 169, 19, 0.3)';
    });
}

/* =========================================
   Clone Buttons to Footer
   ========================================= */
function cloneButtons() {
    const source = document.querySelector('#download-buttons');
    const target = document.querySelector('.cloned-buttons');

    if (source && target) {
        target.innerHTML = source.innerHTML;
    }
}

/* =========================================
   Scroll Animations (Intersection Observer)
   ========================================= */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const animatedElements = document.querySelectorAll('.animate-on-scroll, .pain-card, .feature-row');

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1) ${index * 0.1}s`;
        observer.observe(el);
    });

    // Add class for CSS to trigger
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .in-view {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        </style>
    `);
}
