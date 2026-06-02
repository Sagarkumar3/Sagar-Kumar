/* ── Sagar Kumar Portfolio — JS Engine ── */

document.addEventListener('DOMContentLoaded', () => {

    /* AOS init */
    AOS.init({
        duration: 700,
        once: true,
        mirror: false,
        offset: 60,
        easing: 'ease-out-cubic'
    });

    /* ── Active nav link on scroll ── */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.toggle(
                        'active',
                        link.getAttribute('href') === '#' + entry.target.id
                    );
                });
            }
        });
    }, { threshold: 0.35 });
    sections.forEach(s => observer.observe(s));

    /* ── Hamburger / mobile menu ── */
    const hamBtn    = document.getElementById('ham-btn');
    const closeBtn  = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamBtn && mobileMenu) {
        hamBtn.addEventListener('click',  () => mobileMenu.classList.add('open'));
        closeBtn.addEventListener('click', () => mobileMenu.classList.remove('open'));
    }

    /* ── Resume pill alert until PDF is linked ── */
    const resumeBtn = document.getElementById('resume-btn');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') {
                e.preventDefault();
                alert('Resume PDF coming soon! Reach me at SagarKumar54034@gmail.com for a copy.');
            }
        });
    }

    /* ── Contact form — Formspree AJAX ── */
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', async function (e) {
            const action = form.getAttribute('action');
            if (action && action.includes('your_form_id_here')) return; /* native submit until configured */
            e.preventDefault();

            const btn     = form.querySelector('.btn-submit');
            const success = document.getElementById('form-success');
            btn.textContent = 'Sending…';
            btn.disabled = true;

            try {
                const res = await fetch(action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { 'Accept': 'application/json' }
                });
                if (res.ok) {
                    form.reset();
                    if (success) success.style.display = 'block';
                    btn.textContent = 'Sent ✓';
                } else {
                    throw new Error('Server error');
                }
            } catch {
                btn.textContent = 'Error — email me directly';
                btn.disabled = false;
            }
        });
    }

});


const images = document.querySelectorAll(
    '.ach-img img, .result-img img, .photo-frame img'
);

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.getElementById('close-lightbox');

images.forEach(img => {
    img.addEventListener('click', () => {
        lightbox.classList.add('open');
        lightboxImg.src = img.src;
    });
});

closeLightbox.addEventListener('click', () => {
    lightbox.classList.remove('open');
});

lightbox.addEventListener('click', e => {
    if (e.target === lightbox) {
        lightbox.classList.remove('open');
    }
});
