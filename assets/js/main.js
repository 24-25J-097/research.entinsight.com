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

// Image Zoom Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const systemDiagram = document.getElementById('systemDiagram');
    const systemDiagramContainer = document.getElementById('systemDiagramContainer');
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.getElementById('closeModal');
    const zoomIn = document.getElementById('zoomIn');
    const zoomOut = document.getElementById('zoomOut');
    const modalImageContainer = document.getElementById('modalImageContainer');

    let currentZoom = 1;
    const zoomStep = 0.2;
    const maxZoom = 3;
    const minZoom = 0.5;

    // Open modal when system diagram is clicked
    if (systemDiagramContainer) {
        systemDiagramContainer.addEventListener('click', function() {
            if (systemDiagram) {
                modalImage.src = systemDiagram.src;
                imageModal.classList.add('active');
                currentZoom = 1;
                updateZoom();
                document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
            }
        });
    }

    // Close modal when close button is clicked
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            imageModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        });
    }

    // Close modal when clicking outside the image
    if (imageModal) {
        imageModal.addEventListener('click', function(e) {
            if (e.target === imageModal) {
                imageModal.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling
            }
        });
    }

    // Zoom in button
    if (zoomIn) {
        zoomIn.addEventListener('click', function() {
            if (currentZoom < maxZoom) {
                currentZoom += zoomStep;
                updateZoom();
            }
        });
    }

    // Zoom out button
    if (zoomOut) {
        zoomOut.addEventListener('click', function() {
            if (currentZoom > minZoom) {
                currentZoom -= zoomStep;
                updateZoom();
            }
        });
    }

    // Update zoom level
    function updateZoom() {
        if (modalImage) {
            modalImage.style.transform = `scale(${currentZoom})`;
        }
    }

    // Handle keyboard events
    document.addEventListener('keydown', function(e) {
        if (imageModal.classList.contains('active')) {
            if (e.key === 'Escape') {
                imageModal.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling
            } else if (e.key === '+' || e.key === '=') {
                if (currentZoom < maxZoom) {
                    currentZoom += zoomStep;
                    updateZoom();
                }
            } else if (e.key === '-' || e.key === '_') {
                if (currentZoom > minZoom) {
                    currentZoom -= zoomStep;
                    updateZoom();
                }
            }
        }
    });

    // Handle mouse wheel for zooming
    if (modalImageContainer) {
        modalImageContainer.addEventListener('wheel', function(e) {
            if (imageModal.classList.contains('active')) {
                e.preventDefault();
                if (e.deltaY < 0 && currentZoom < maxZoom) {
                    // Zoom in
                    currentZoom += zoomStep;
                    updateZoom();
                } else if (e.deltaY > 0 && currentZoom > minZoom) {
                    // Zoom out
                    currentZoom -= zoomStep;
                    updateZoom();
                }
            }
        });
    }
});
