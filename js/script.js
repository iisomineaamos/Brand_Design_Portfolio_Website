// js/script.js

document.addEventListener('DOMContentLoaded', function() {

    // --- 1. Header Behavior on Scroll ---
    const header = document.querySelector('.site-header');
    let lastScrollY = window.scrollY;

    function handleHeaderScroll() {
        if (window.scrollY > lastScrollY && window.scrollY > 50) {
            // Scrolling down past the top
            header.classList.add('header-hidden');
            header.classList.remove('scrolled'); // Optional: remove 'scrolled' class when hidden
        } else {
            // Scrolling up
            header.classList.remove('header-hidden');
        }
        
        // Add the 'scrolled' class for a background on any scroll
        if (window.scrollY > 50) {
        header.classList.add('scrolled');
        } else {
        header.classList.remove('scrolled');
        }

        lastScrollY = window.scrollY;
    }

    window.addEventListener('scroll', handleHeaderScroll);
    // --- 2. Scroll-Reveal Animations ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: stop observing once it's visible
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // --- 3. Smooth Scrolling for Anchor Links ---
    // Note: The `html { scroll-behavior: smooth; }` in CSS handles most of this automatically.
    // This script is a fallback or for more complex scenarios.
    // The CSS approach is often sufficient and more performant.
    
});

// --- New: Auto-scrolling Projects Carousel ---
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.projects-carousel');
    if (!carousel) return; // Exit if the carousel isn't on the page

    const scrollSpeed = 0.5; // Adjust this value to change the speed
    let scrollPosition = 0;

    function autoScroll() {
        if (scrollPosition >= carousel.scrollWidth - carousel.clientWidth) {
            scrollPosition = 0; // Reset to the start when it hits the end
        } else {
            scrollPosition += scrollSpeed;
        }

        carousel.scrollLeft = scrollPosition;
        requestAnimationFrame(autoScroll);
    }
    
    // Stop auto-scrolling on user interaction
    let isUserScrolling = false;
    carousel.addEventListener('mousedown', () => isUserScrolling = true);
    carousel.addEventListener('mouseup', () => isUserScrolling = false);
    carousel.addEventListener('mouseleave', () => isUserScrolling = false);

    if (!isUserScrolling) {
        requestAnimationFrame(autoScroll);
    }
});