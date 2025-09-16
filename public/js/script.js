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

// --- 3. Hamburger Menu Toggle ---
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('is-active');
    navMenu.classList.toggle('is-open');
});



// --- Custom Cursor Movement ---
// document.addEventListener('DOMContentLoaded', () => {
//     const customCursor = document.querySelector('.custom-cursor');
//     if (!customCursor) return;

//     let mouseX = 0;
//     let mouseY = 0;
//     let cursorX = 0;
//     let cursorY = 0;

//     window.addEventListener('mousemove', (e) => {
//         mouseX = e.clientX;
//         mouseY = e.clientY;
//     });

//     function animateCursor() {
//         cursorX += (mouseX - cursorX) * 0.1;
//         cursorY += (mouseY - cursorY) * 0.1;
//         customCursor.style.transform = `translate(${cursorX - customCursor.offsetWidth / 2}px, ${cursorY - customCursor.offsetHeight / 2}px)`;
//         requestAnimationFrame(animateCursor);
//     }

//     animateCursor();
// });


// firebase setup

// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-analytics.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBVWMgPXSlT2JV1WDuCJ7OeUMRE7Xogr8A",
    authDomain: "brand-design-portfolio-site.firebaseapp.com",
    projectId: "brand-design-portfolio-site",
    storageBucket: "brand-design-portfolio-site.firebasestorage.app",
    messagingSenderId: "743639388904",
    appId: "1:743639388904:web:ac7711775b8fd1ef9c2f5d",
    measurementId: "G-5Y1CM79K5D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Handle form submission
// document.getElementById("enquiryForm").addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const name = document.getElementById("name").value;
//     const email = document.getElementById("email").value;
//     const services = Array.from(document.querySelectorAll("input[name='services']:checked")).map(cb => cb.value);
//     const projectDetails = document.getElementById("projectDetails").value;
//     const budget = document.getElementById("budget").value;
//     const socialHandle = document.getElementById("socialHandle").value;

//     try {
//         await addDoc(collection(db, "enquiries"), {
//             name,
//             email,
//             services,
//             projectDetails,
//             budget,
//             socialHandle,
//             submittedAt: new Date()
//         });

//         alert("Thanks for your enquiry! I'll be in touch soon.");
//         e.target.reset();
//     } catch (error) {
//         console.error("Error saving enquiry:", error);
//         alert("Oops! Something went wrong. Please try again.");
//     }
// });


// Added the new firebase store for form collection and trying to remove formspree thank you page

  const form = document.getElementById("enquiryForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const services = Array.from(document.querySelectorAll("input[name='services']:checked")).map(cb => cb.value);
    const projectDetails = document.getElementById("projectDetails").value;
    const budget = document.getElementById("budget").value;
    const socialHandle = document.getElementById("socialHandle").value;

    // 1️⃣ Save to Firebase
    try {
      await addDoc(collection(db, "enquiries"), {
        name,
        email,
        services,
        projectDetails,
        budget,
        socialHandle,
        submittedAt: new Date()
      });
    } catch (err) {
      console.error("Error saving to Firebase:", err);
    }

    // 2️⃣ Send to Formspree
    try {
      const formData = new FormData(form);
      formData.append("_format", "json"); // ensures JSON response

      const response = await fetch("https://formspree.io/f/xblabqrk", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        alert("Thanks for your enquiry! I'll be in touch soon.");
        form.reset();
      } else {
        const errorData = await response.json();
        console.error("Formspree error:", errorData);
        alert("Oops! Something went wrong sending the email.");
      }
    } catch (err) {
      console.error("Formspree submission failed:", err);
      alert("Oops! Something went wrong sending the email.");
    }
  });

