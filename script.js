// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function () {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            hamburger.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navMenu.style.display = 'none';
                hamburger.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for navigation links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(element);
    });

    // Animate stats on scroll
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const stats = entry.target.querySelectorAll('.stat h3');
                    stats.forEach((stat, index) => {
                        setTimeout(() => {
                            animateValue(stat, 0, parseInt(stat.textContent), 1000);
                        }, index * 200);
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        statsObserver.observe(statsSection);
    }

    // Animate progress bars on scroll
    const progressBars = document.querySelectorAll('.progress');
    const progressObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'progressFill 1.5s ease-out forwards';
                progressObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });

    // Hover effect for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });

    // Read More / Details toggle for project descriptions
    const readButtons = document.querySelectorAll('.read-more');
    readButtons.forEach(btn => {
        btn.setAttribute('aria-expanded', 'false');
        btn.addEventListener('click', function (e) {
            const card = this.closest('.project-card');
            if (!card) return;
            const desc = card.querySelector('.project-desc');
            if (!desc) return;

            const expanded = desc.classList.contains('expanded');
            if (expanded) {
                desc.classList.remove('expanded');
                desc.classList.add('collapsed');
                this.textContent = 'Details';
                this.setAttribute('aria-expanded', 'false');
            } else {
                desc.classList.remove('collapsed');
                desc.classList.add('expanded');
                this.textContent = 'Close';
                this.setAttribute('aria-expanded', 'true');
                // ensure the expanded content is visible
                setTimeout(() => {
                    const top = card.getBoundingClientRect().top + window.pageYOffset - 90;
                    window.scrollTo({ top, behavior: 'smooth' });
                }, 80);
            }
        });
    });

    // Skill tag stagger animation
    const skillTags = document.querySelectorAll('.skill-tag');
    const skillsSection = document.querySelector('#skills');

    if (skillsSection) {
        const skillsObserver = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillTags.forEach((tag, index) => {
                        tag.style.opacity = '1';
                        tag.style.animation = `slideInUp 0.5s ease-out ${index * 0.1}s both`;
                    });
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        skillsObserver.observe(skillsSection);
    }

    // Add scroll animation to navbar
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 10px 30px rgba(56, 189, 248, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });
});

// Animate number counting function
function animateValue(element, start, end, duration) {
    const originalText = element.textContent;
    const startNum = parseInt(originalText);

    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + '+';

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };

    window.requestAnimationFrame(step);
}

// Cursor effect (optional enhancement)
document.addEventListener('mousemove', function (e) {
    const x = e.clientX;
    const y = e.clientY;

    // Optional: Add subtle cursor tracking effects here
});

// Prevent layout shift on hover
document.addEventListener('DOMContentLoaded', function () {
    const interactiveElements = document.querySelectorAll('a, .btn, .card, .skill-tag, .project-card, .lab-card, .contact-link');

    interactiveElements.forEach(el => {
        el.addEventListener('focus', function () {
            this.style.outline = 'none';
        });
    });
});
