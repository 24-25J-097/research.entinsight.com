// Mobile menu toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
}

// Fade in and scroll reveal animations on scroll
function handleScrollAnimations() {
    // Handle fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });

    // Handle scroll-reveal elements
    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 100;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        // Close mobile menu if open
        document.getElementById('mobileMenu').classList.add('hidden');
    });
});

// Initialize animations
window.addEventListener('scroll', handleScrollAnimations);
window.addEventListener('load', handleScrollAnimations);

// Navbar background on scroll
window.addEventListener('scroll', function () {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('bg-white/98');
        nav.classList.remove('bg-white/95');
    } else {
        nav.classList.add('bg-white/95');
        nav.classList.remove('bg-white/98');
    }
});

// Scroll to top button functionality
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

// Show/hide button based on scroll position
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.remove('opacity-0', 'invisible');
        scrollToTopBtn.classList.add('opacity-100');
    } else {
        scrollToTopBtn.classList.add('opacity-0', 'invisible');
        scrollToTopBtn.classList.remove('opacity-100');
    }
});

// Scroll to top when button is clicked
scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
