document.addEventListener('DOMContentLoaded', () => {
    // Uudiskirja vormi submit
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]').value;
            alert(`Aitäh liitumast, ${emailInput}! AgentAINO uudiskiri jõuab peagi sinuni.`);
            newsletterForm.reset();
        });
    }

    // Kontakivormi submit
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Aitäh! Sinu sõnum on edukalt edastatud AgentAINO-le.');
            contactForm.reset();
        });
    }
});
