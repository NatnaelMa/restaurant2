document.addEventListener('DOMContentLoaded', () => {

    /* ================= PRELOADER ================= */
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => preloader.style.display = 'none', 1000);
    }

    initSlider();
    initScrollAnimations();
    initBackToTop();
    initHoverEffects();
    initTooltips();
});

/* ================= SLIDER ================= */
function initSlider() {
    const slides = document.querySelector('.slides');
    const images = document.querySelectorAll('.slides img');
    const dotsContainer = document.querySelector('.slider-dots');
    const slider = document.querySelector('.slider');

    if (!slides || images.length === 0) return;

    let currentSlide = 0;
    const totalSlides = images.length;
    let slideInterval;

    if (dotsContainer) {
        images.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = 'dot';
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }

    function updateSlider() {
        slides.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }

    function goToSlide(n) {
        currentSlide = n;
        updateSlider();
    }

    function startAutoplay() {
        slideInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoplay() {
        clearInterval(slideInterval);
    }

    if (slider) {
        slider.addEventListener('mouseenter', stopAutoplay);
        slider.addEventListener('mouseleave', startAutoplay);
    }

    updateSlider();
    startAutoplay();
}

/* ================= SCROLL ANIMATIONS ================= */
function initScrollAnimations() {
    const elements = document.querySelectorAll('.property, .title');

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = '0.6s ease';
    });

    function reveal() {
        elements.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 100) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    }

    window.addEventListener('scroll', reveal);
    reveal();
}

/* ================= BACK TO TOP ================= */
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('show', window.scrollY > 300);
    });
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ================= HOVER EFFECTS ================= */
function initHoverEffects() {
    const images = document.querySelectorAll('img');

    images.forEach(img => {
        img.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.05)';
            img.style.transition = '0.4s ease';
        });

        img.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
        });
    });
}

/* ================= TOOLTIPS ================= */
function initTooltips() {
    const links = document.querySelectorAll('.icon-link');

    links.forEach(link => {
        const tooltip = document.createElement('span');
        tooltip.textContent = link.href.replace('https://', '');
        tooltip.className = 'tooltip';
        link.style.position = 'relative';
        link.appendChild(tooltip);

        link.addEventListener('mouseenter', () => tooltip.style.opacity = '1');
        link.addEventListener('mouseleave', () => tooltip.style.opacity = '0');
    });

    const style = document.createElement('style');
    style.textContent = `
        .tooltip {
            position: absolute;
            bottom: -30px;
            left: 50%;
            transform: translateX(-50%);
            background: #ffd77a;
            color: #000;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s;
            z-index: 999;
        }
    `;
    document.head.appendChild(style);
}
