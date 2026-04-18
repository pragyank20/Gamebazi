document.addEventListener('DOMContentLoaded', () => {
    // 1. Update all WhatsApp links dynamically from config.js
    const waLinks = document.querySelectorAll('.wa-link');
    const waWithdrawLinks = document.querySelectorAll('.wa-withdraw-link');

    const defaultMsg = encodeURIComponent(CONFIG.whatsappMessage);
    const withdrawMsg = encodeURIComponent(CONFIG.withdrawalMessage);

    waLinks.forEach(link => {
        link.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${defaultMsg}`;
        // Open in new tab securely
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });

    waWithdrawLinks.forEach(link => {
        link.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${withdrawMsg}`;
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });

    // 2. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    if(mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('open');
        });
    }

    // 3. Scroll Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(el => {
        appearOnScroll.observe(el);
    });

    // 4. FAQ Accordion Toggle
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            // Close all other FAQs
            faqItems.forEach(i => {
                i.classList.remove('active');
                const icon = i.querySelector('i');
                if(icon) icon.className = 'fas fa-chevron-down';
            });
            
            // Open clicked FAQ
            if (!isActive) {
                item.classList.add('active');
                const icon = item.querySelector('i');
                if(icon) icon.className = 'fas fa-chevron-up';
            }
        });
    });

    // 5. Header Background on Scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});
