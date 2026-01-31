// ===========================================
// LANDING PAGE - GESTÃOCLICK
// JavaScript para animações e interatividade
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth Scroll para links internos
    initSmoothScroll();
    
    // Animações de scroll
    initScrollAnimations();
    
    // Efeito de brilho nos cards
    initCardGlow();
    
});

// ===========================================
// SMOOTH SCROLL
// ===========================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===========================================
// SCROLL ANIMATIONS
// ===========================================

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.problem-card, .feature-card, .process-step, .section-title'
    );
    
    // Adiciona classe inicial
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
    });
    
    // Observer para detectar quando elementos entram na viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => observer.observe(el));
}

// ===========================================
// CARD GLOW EFFECT (Mouse Follow)
// ===========================================

function initCardGlow() {
    const cards = document.querySelectorAll('.feature-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// ===========================================
// CHART ANIMATION
// ===========================================

function animateChart() {
    const bars = document.querySelectorAll('.chart-bar');
    bars.forEach((bar, index) => {
        const originalHeight = bar.style.height;
        bar.style.height = '0%';
        
        setTimeout(() => {
            bar.style.height = originalHeight;
        }, 100 * index);
    });
}

// Trigger chart animation when dashboard is visible
const dashboardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateChart();
            dashboardObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const dashboard = document.querySelector('.mockup-dashboard');
if (dashboard) {
    dashboardObserver.observe(dashboard);
}

// ===========================================
// CTA BUTTON PULSE EFFECT
// ===========================================

const ctaButton = document.getElementById('cta-button');
if (ctaButton) {
    setInterval(() => {
        ctaButton.classList.add('pulse');
        setTimeout(() => {
            ctaButton.classList.remove('pulse');
        }, 1000);
    }, 5000);
}

// Adicionar estilo de pulse dinamicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4); }
        50% { box-shadow: 0 4px 40px rgba(99, 102, 241, 0.8); }
        100% { box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4); }
    }
    .btn.pulse {
        animation: pulse 1s ease;
    }
`;
document.head.appendChild(style);
