document.addEventListener('DOMContentLoaded', () => {
    // Mobiilimenüü (Burger menu) funktsionaalsus
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            menuToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
        });

        // Sulge menüü, kui klikitakse mõnel lingil (mugavam navigeerimine ühelehe veebis)
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
            });
        });
    }

    // Uudiskirja vormi submit
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]').value;
            
            // Saada andmed taustal e-mailile info@agentaino.ee
            fetch("https://formsubmit.co/ajax/info@agentaino.ee", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    _subject: "UUS UUDISKIRJAGA LIITUJA (agentaino.ee)",
                    Märge: "Kasutaja on liitunud veebilehel uudiskirja listiga.",
                    Epost: emailInput
                })
            })
            .then(response => response.json())
            .then(data => {
                alert(`Aitäh liitumast, ${emailInput}! AgentAINO uudiskiri jõuab peagi sinuni.`);
                newsletterForm.reset();
            })
            .catch(error => {
                alert('Viga andmete saatmisel. Palun proovi uuesti või kirjuta meile otse.');
                console.error(error);
            });
        });
    }

    // Kontaktivormi submit
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Saada andmed taustal e-mailile info@agentaino.ee
            fetch("https://formsubmit.co/ajax/info@agentaino.ee", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    _subject: "Sõnum AgentAINO veebilehelt",
                    Nimi: name,
                    Epost: email,
                    Sõnum: message
                })
            })
            .then(response => response.json())
            .then(data => {
                alert('Aitäh! Sinu sõnum on edukalt edastatud AgentAINO-le.');
                contactForm.reset();
            })
            .catch(error => {
                alert('Viga sõnumi saatmisel. Palun proovi uuesti.');
                console.error(error);
            });
        });
    }
});
