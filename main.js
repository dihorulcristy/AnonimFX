// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

    // =============================================
    // 1. Particles.js - Animated Hero Background
    // =============================================
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: ["#00d26a", "#3b82f6", "#ffffff"] },
                shape: { type: "circle" },
                opacity: { value: 0.3, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
                size: { value: 3, random: true, anim: { enable: true, speed: 2, size_min: 0.5, sync: false } },
                line_linked: { enable: true, distance: 150, color: "#00d26a", opacity: 0.1, width: 1 },
                move: { enable: true, speed: 1.5, direction: "none", random: true, straight: false, out_mode: "out", bounce: false }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                },
                modes: {
                    grab: { distance: 150, line_linked: { opacity: 0.4 } },
                    push: { particles_nb: 3 }
                }
            },
            retina_detect: true
        });
    }

    // =============================================
    // 2. Typed.js - DISABLED (static headline used)
    // =============================================

    // =============================================
    // 3. Smooth Scrolling for Anchor Links
    // =============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            // Close mobile menu on link click
            const hamburger = document.getElementById('hamburger-btn');
            const menu = document.querySelector('.horizontal-menu');
            if (hamburger && menu) {
                hamburger.classList.remove('active');
                menu.classList.remove('open');
            }
        });
    });

    // =============================================
    // 3b. Hamburger Menu Toggle
    // =============================================
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.querySelector('.horizontal-menu');

    if (hamburgerBtn && mobileMenu) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            mobileMenu.classList.toggle('open');
        });
    }

    // =============================================
    // 4. GSAP - Advanced Parallax & Scroll Animations
    // =============================================

    // Hero Section Parallax
    gsap.to('.hero-overlay', {
        yPercent: 50,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    gsap.to('.hero-content', {
        yPercent: 30,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // Floating orbs parallax
    gsap.to('.orb-1', {
        yPercent: -40, xPercent: 20,
        scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: true }
    });
    gsap.to('.orb-2', {
        yPercent: 30, xPercent: -15,
        scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: true }
    });

    // Reveal Elements on Scroll
    const fadeElements = gsap.utils.toArray('.glass-panel, .section-title, .huge-green-cta, .gallery-item, .feature-box, .badge-label, .social-proof');

    fadeElements.forEach(el => {
        gsap.fromTo(el,
            { y: 60, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 88%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // Staggered animation for Features Grid
    ScrollTrigger.create({
        trigger: ".features-grid",
        start: "top 80%",
        onEnter: () => {
            gsap.to(".feature-box", {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "back.out(1.7)"
            });
        }
    });

    // Podcast cards stagger
    ScrollTrigger.create({
        trigger: ".podcasts-grid",
        start: "top 80%",
        onEnter: () => {
            gsap.to(".podcast-card", {
                y: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.2,
                ease: "power2.out"
            });
        }
    });

    // Section parallax backgrounds
    gsap.utils.toArray('section').forEach(section => {
        gsap.fromTo(section,
            { backgroundPositionY: '0%' },
            {
                backgroundPositionY: '30%',
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            }
        );
    });

    // =============================================
    // 5. VanillaTilt - Auto-init on marked elements
    // =============================================
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
            max: 8,
            speed: 400,
            glare: true,
            "max-glare": 0.15,
        });
    }

    // =============================================
    // 6. Floating Nav Hide/Show on Scroll
    // =============================================
    const floatingNav = document.querySelector('.floating-nav');
    let lastScrollY = 0;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > 300 && currentScrollY > lastScrollY) {
            floatingNav.style.transform = 'translateX(-50%) translateY(-150%)';
        } else {
            floatingNav.style.transform = 'translateX(-50%) translateY(0)';
        }
        lastScrollY = currentScrollY;
    });

    // =============================================
    // 7. Dynamic Links Setup
    // =============================================
    const TELEGRAM_LINK = "https://t.me/anonimfxro";
    const ctaButtons = document.querySelectorAll('a[href="https://t.me/anonimfxro"]');
    ctaButtons.forEach(btn => {
        btn.href = TELEGRAM_LINK;
    });

    // =============================================
    // 8. Payouts Lightbox Modal
    // =============================================
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const closeBtn = document.getElementById("closeModal");

    const imagesToEnlarge = document.querySelectorAll('.payout-image, .feedback-image');
    
    imagesToEnlarge.forEach(img => {
        img.style.cursor = 'pointer';

        // Support clicking on the parent card if it's a grid item wrapper
        const parentCard = img.closest('.payout-card, .feedback-gallery-card');
        if (parentCard) {
            parentCard.style.cursor = 'pointer';
            parentCard.addEventListener('click', function(e) {
                // Prevent duplicate trigger if clicking directly on image
                if (e.target !== img && modal && modalImg) {
                    modal.style.display = "flex";
                    setTimeout(() => {
                        modal.classList.add('show');
                    }, 10);
                    modalImg.src = img.src;
                    document.body.style.overflow = 'hidden';
                }
            });
        }

        img.addEventListener('click', function() {
            if (modal && modalImg) {
                modal.style.display = "flex";
                setTimeout(() => {
                    modal.classList.add('show');
                }, 10);
                modalImg.src = this.src;
                document.body.style.overflow = 'hidden';
            }
        });
    });

    const closeModalFunc = () => {
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = "none";
                document.body.style.overflow = '';
            }, 300); // match CSS transition duration
        }
    };

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModalFunc);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            // Close if clicking outside the image
            if (e.target === modal) {
                closeModalFunc();
            }
        });
        
        // Setup ESC key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                closeModalFunc();
            }
        });
    }

    // =============================================
    // 9. Scroll Reveal Animations
    // =============================================
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Stop observing once it has animated in
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // =============================================
    // 10. Swiper Initialization (Mentorat Gallery)
    // =============================================
    if (document.querySelector('.feedback-swiper')) {
        const feedbackSwiper = new Swiper('.feedback-swiper', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            loop: true,
            speed: 800,
            coverflowEffect: {
                rotate: 30,
                stretch: 0,
                depth: 200,
                modifier: 1,
                slideShadows: true,
            },
            autoplay: {
                delay: 3500,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    coverflowEffect: {
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                    }
                },
                768: {
                    slidesPerView: 'auto',
                }
            }
        });
    }

    // =============================================
    // 11. Swiper Initialization (Comunitate Gallery)
    // =============================================
    if (document.querySelector('.community-swiper')) {
        const communitySwiper = new Swiper('.community-swiper', {
            effect: 'slide',
            grabCursor: true,
            slidesPerView: 1,
            loop: true,
            speed: 600,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.community-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.community-button-next',
                prevEl: '.community-button-prev',
            }
        });
    }

    // =============================================
    // 12. Cookie Consent Logic
    // =============================================
    const cookieBanner = document.getElementById('cookie-consent-banner');
    const acceptBtn = document.getElementById('accept-cookies');

    if (cookieBanner && acceptBtn) {
        // Check if user already accepted
        if (!localStorage.getItem('cookieConsent')) {
            // Show perfectly after a short delay
            setTimeout(() => {
                cookieBanner.classList.add('show');
            }, 1500);
        }

        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'true');
            cookieBanner.classList.remove('show');
        });
    }
});
