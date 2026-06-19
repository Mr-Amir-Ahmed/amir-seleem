// --- Scroll Animations (Intersection Observer) ---
document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        threshold: 0.15 // Trigger when 15% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the 'visible' class which is styled in CSS
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Select all sections except the hero (hero is already visible by default in HTML)
    const sections = document.querySelectorAll('section:not(.hero)');
    
    sections.forEach(section => {
        observer.observe(section);
    });
});