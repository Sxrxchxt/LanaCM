// Main JavaScript File
document.addEventListener('DOMContentLoaded', function () {
    // =========================================
    // Mobile Menu Toggle
    // =========================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.innerHTML = navLinks.classList.contains('active')
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });

        // Close mobile menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }

    // =========================================
    // Search Toggle
    // =========================================
    const searchToggle = document.getElementById('searchToggle');
    const searchClose = document.getElementById('searchClose');
    const searchBar = document.getElementById('searchBar');

    if (searchToggle && searchBar) {
        searchToggle.addEventListener('click', () => {
            searchBar.classList.add('active');
            setTimeout(() => {
                searchBar.querySelector('.search-input').focus();
            }, 100);
        });

        if (searchClose) {
            searchClose.addEventListener('click', () => {
                searchBar.classList.remove('active');
            });
        }

        // Close search when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchToggle.contains(e.target) &&
                !searchBar.contains(e.target) &&
                searchBar.classList.contains('active')) {
                searchBar.classList.remove('active');
            }
        });
    }

    // =========================================
    // Dark/Light Mode Toggle
    // =========================================
    const themeToggle = document.getElementById('themeToggle');

    // Check for saved theme or prefer-color-scheme
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');

    // Function to set theme
    function setTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            if (themeToggle) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                themeToggle.setAttribute('aria-label', 'เปลี่ยนเป็นธีมสว่าง');
            }
        } else {
            document.body.classList.remove('dark-mode');
            if (themeToggle) {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                themeToggle.setAttribute('aria-label', 'เปลี่ยนเป็นธีมมืด');
            }
        }
        localStorage.setItem('theme', theme);
    }

    // Initialize theme
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        setTheme('dark');
    } else {
        setTheme('light');
    }

    // Theme toggle click handler
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDarkMode = document.body.classList.contains('dark-mode');
            setTheme(isDarkMode ? 'light' : 'dark');
        });
    }

    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // =========================================
    // Sticky Header
    // =========================================
    const header = document.querySelector('header');

    function updateHeader() {
        if (window.scrollY > 100) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    }

    window.addEventListener('scroll', updateHeader);
    updateHeader(); // Initialize on page load

    // =========================================
    // Back to Top Button
    // =========================================
    const backToTop = document.getElementById('backToTop');

    function updateBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    if (backToTop) {
        window.addEventListener('scroll', updateBackToTop);
        updateBackToTop(); // Initialize on page load

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // =========================================
    // Smooth Scrolling for Anchor Links
    // =========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#' || href === '#!') return;

            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();

                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update URL without jumping
                history.pushState(null, null, href);
            }
        });
    });

    // =========================================
    // Image Hover Effects
    // =========================================
    const highlightCards = document.querySelectorAll('.highlight-card');

    highlightCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.zIndex = '10';
        });

        card.addEventListener('mouseleave', () => {
            card.style.zIndex = '';
        });
    });

    // =========================================
    // Newsletter Form Submission
    // =========================================
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            if (email && validateEmail(email)) {
                // In a real application, you would send this to a server
                console.log('Newsletter subscription:', email);
                alert('ขอบคุณสำหรับการสมัครรับข่าวสารวัฒนธรรมล้านนา!');
                emailInput.value = '';
            } else {
                alert('กรุณากรอกอีเมลที่ถูกต้อง');
                emailInput.focus();
            }
        });
    }

    // Email validation helper
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // =========================================
    // Current Year in Footer
    // =========================================
    const yearElement = document.querySelector('.copyright');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2023', currentYear);
    }

    // =========================================
    // Parallax Effect for Hero Section
    // =========================================
    const hero = document.querySelector('.hero');

    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
    }

    // =========================================
    // Animation on Scroll
    // =========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.highlight-card, .link-card, .intro-content').forEach(el => {
        observer.observe(el);
    });

    // =========================================
    // Initialize Lazy Loading
    // =========================================
    if (typeof initLazyLoad === 'function') {
        initLazyLoad();
    }
});