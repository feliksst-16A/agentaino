document.addEventListener('DOMContentLoaded', () => {
    // 1. MOBIILIMENÜÜ (Burger Menu) funktsionaalsus
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            menuToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
        });

        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
            });
        });
    }

    // 2. KÜPSISTE BÄNNERI HALDUS (GDPR / AKI vastavus)
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    const declineCookiesBtn = document.getElementById('decline-cookies');
    const isLocalAdmin = localStorage.getItem('peida_minu_liiklus') === 'true';

    // Kuvame bänneri ainult siis, kui valik on tegemata JA kasutaja pole admin
    if (cookieBanner && !isLocalAdmin && !localStorage.getItem('cookie_consent')) {
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 800); // kerge viivitus parema UX jaoks
    }

    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener('click', () => {
            localStorage.setItem('cookie_consent', 'accepted');
            cookieBanner.classList.remove('show');
            // Käivitame Google Analyticsi reaalajas
            if (typeof loadGoogleAnalytics === 'function') {
                loadGoogleAnalytics();
            }
        });
    }

    if (declineCookiesBtn) {
        declineCookiesBtn.addEventListener('click', () => {
            localStorage.setItem('cookie_consent', 'declined');
            cookieBanner.classList.remove('show');
            console.log('Küpsistest keeldutud. Google Analyticsit ei laeta.');
        });
    }

    // 3. UUDISKIRJA VORMI SUBMIT
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]').value;
            
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

    // 4. KONTAKTIVORMI SUBMIT
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
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
