// ثِقَال - Animations JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initButtonAnimations();
    initCardAnimations();
    initScrollAnimations();
    initHoverEffects();
    initPageTransitions();
    initParallax();
    initTypingAnimation();
    initPriceCardsAnimation();
});

// Button Animations
function initButtonAnimations() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        // Ripple effect
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.7);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
                z-index: 1;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Hover scale effect
        button.addEventListener('mouseenter', function() {
            if (!this.classList.contains('btn-disabled')) {
                this.style.transform = 'scale(1.05)';
                this.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('btn-disabled')) {
                this.style.transform = 'scale(1)';
            }
        });
        
        // Active state
        button.addEventListener('mousedown', function() {
            if (!this.classList.contains('btn-disabled')) {
                this.style.transform = 'scale(0.95)';
            }
        });
        
        button.addEventListener('mouseup', function() {
            if (!this.classList.contains('btn-disabled')) {
                this.style.transform = 'scale(1.05)';
            }
        });
        
        // Touch events for mobile
        let touchStartTime;
        
        button.addEventListener('touchstart', function(e) {
            if (!this.classList.contains('btn-disabled')) {
                this.style.transform = 'scale(0.95)';
                touchStartTime = Date.now();
                e.preventDefault(); // Prevent default touch behavior
            }
        });
        
        button.addEventListener('touchend', function(e) {
            if (!this.classList.contains('btn-disabled')) {
                this.style.transform = 'scale(1)';
                const touchDuration = Date.now() - touchStartTime;
                
                // Only trigger click if touch was short (not a scroll)
                if (touchDuration < 300) {
                    e.preventDefault();
                    this.click();
                }
            }
        });
    });
    
    // Add ripple animation to styles
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .btn {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(rippleStyle);
}

// Card Animations
function initCardAnimations() {
    const cards = document.querySelectorAll('.story-card, .result-card, .pricing-card, .info-card, .method-card, .country-card');
    
    cards.forEach(card => {
        // Entrance animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
        
        // Set initial state
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        
        observer.observe(card);
        
        // Hover animation
        card.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) { // Only on desktop
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)';
                this.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '';
            }
        });
        
        // Touch animation for mobile
        card.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3)';
            this.style.transition = 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    // Counter animation for numbers
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = +counter.getAttribute('data-target') || 0;
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16);
                    let current = 0;
                    
                    const updateCounter = () => {
                        if (current < target) {
                            current += increment;
                            counter.innerText = Math.ceil(current).toLocaleString('ar-EG');
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = target.toLocaleString('ar-EG');
                        }
                    };
                    
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { 
            threshold: 0.5,
            rootMargin: '50px' 
        });
        
        counters.forEach(counter => observer.observe(counter));
    }
    
    // Staggered animation for grid items
    const gridItems = document.querySelectorAll('.story-grid > *, .results-grid > *, .pricing-grid > *, .methods-grid > *, .whatsapp-countries > *');
    
    gridItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    // Observer for grid items
    const gridObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                gridObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    gridItems.forEach(item => gridObserver.observe(item));
    
    // Text reveal animation
    const textRevealElements = document.querySelectorAll('.reveal-text, .section-title, .section-subtitle');
    
    textRevealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                textObserver.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.3,
        rootMargin: '50px' 
    });
    
    textRevealElements.forEach(element => textObserver.observe(element));
}

// Hover Effects
function initHoverEffects() {
    // Link underline animation
    const navLinks = document.querySelectorAll('.nav-link, .footer-nav a');
    
    navLinks.forEach(link => {
        const span = document.createElement('span');
        span.style.display = 'inline-block';
        span.style.position = 'relative';
        span.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Save original content
        const originalContent = link.innerHTML;
        link.innerHTML = '';
        link.appendChild(span);
        span.innerHTML = originalContent;
        
        link.addEventListener('mouseenter', function() {
            span.style.transform = 'translateX(-5px)';
        });
        
        link.addEventListener('mouseleave', function() {
            span.style.transform = 'translateX(0)';
        });
        
        // Touch effect for mobile
        link.addEventListener('touchstart', function() {
            span.style.transform = 'translateX(-3px)';
        });
        
        link.addEventListener('touchend', function() {
            setTimeout(() => {
                span.style.transform = 'translateX(0)';
            }, 200);
        });
    });
    
    // Icon hover effects
    const icons = document.querySelectorAll('.story-icon, .result-icon, .method-icon');
    
    icons.forEach(icon => {
        icon.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), color 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(10deg) scale(1.1)';
            this.style.color = 'var(--color-gold-light)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(0) scale(1)';
            this.style.color = '';
        });
        
        // Touch effect for mobile
        icon.addEventListener('touchstart', function() {
            this.style.transform = 'rotate(5deg) scale(1.05)';
            this.style.color = 'var(--color-gold-light)';
        });
        
        icon.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = 'rotate(0) scale(1)';
                this.style.color = '';
            }, 200);
        });
    });
}

// Page Transitions
function initPageTransitions() {
    // Smooth page transitions for internal links
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href^="#"]');
        
        if (link) {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Smooth scroll with offset for header
                    const headerHeight = document.getElementById('main-header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav link
                    document.querySelectorAll('.nav-link.active').forEach(link => {
                        link.classList.remove('active');
                    });
                    link.classList.add('active');
                }
            }
        }
    });
    
    // Fade in on page load
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
}

// Parallax Effects
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    if (parallaxElements.length > 0) {
        const handleScroll = function() {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const rate = element.dataset.rate || 0.3;
                const offset = element.offsetTop;
                const yPos = -(scrolled * rate) + (offset * rate);
                
                element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });
        };
        
        // Throttle scroll events for performance
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        // Initial call
        handleScroll();
    }
}

// Typing Animation
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-animation');
    
    if (typingElement) {
        const text = typingElement.textContent.trim();
        typingElement.textContent = '';
        typingElement.style.borderRight = '2px solid var(--color-gold)';
        typingElement.style.paddingRight = '5px';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
                
                // Blinking cursor effect
                typingElement.style.borderRight = (i % 2 === 0) ? '2px solid var(--color-gold)' : '2px solid transparent';
                
                setTimeout(typeWriter, 80 + Math.random() * 40); // Random delay for natural typing
            } else {
                // Remove cursor when finished
                typingElement.style.borderRight = 'none';
                typingElement.style.paddingRight = '0';
            }
        };
        
        // Start typing when element is in view
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setTimeout(typeWriter, 500); // Short delay before starting
                observer.unobserve(typingElement);
            }
        }, { 
            threshold: 0.5,
            rootMargin: '100px' 
        });
        
        observer.observe(typingElement);
    }
}

// Price Cards Animation
function initPriceCardsAnimation() {
    const pricesSliderContainer = document.querySelector('.prices-slider-container');
    const pricesSliderTrack = document.querySelector('.prices-slider-track');
    
    if (pricesSliderContainer && pricesSliderTrack) {
        // Initialize animation
        const updateAnimation = () => {
            const priceCards = document.querySelectorAll('.price-card');
            const cardCount = priceCards.length;
            
            if (cardCount > 0) {
                // Calculate animation duration based on card count and desired speed
                const baseDuration = 30; // seconds for one full cycle
                const animationDuration = baseDuration * (cardCount / 9); // Adjust based on actual card count
                
                // Create smooth animation
                const keyframes = `
                    @keyframes slideSmoothly {
                        0% {
                            transform: translateX(0);
                        }
                        100% {
                            transform: translateX(-33.333%);
                        }
                    }
                    
                    .prices-slider-track {
                        animation: slideSmoothly ${animationDuration}s linear infinite;
                    }
                    
                    .prices-slider-track:hover {
                        animation-play-state: paused;
                    }
                    
                    .price-card {
                        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
                                  box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                                  border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    }
                    
                    .price-card:hover {
                        transform: translateY(-5px) scale(1.02);
                        box-shadow: 0 10px 25px rgba(212, 175, 55, 0.3);
                        border-color: var(--color-gold);
                        z-index: 10;
                    }
                `;
                
                // Add or update styles
                let styleElement = document.getElementById('price-cards-animation');
                if (!styleElement) {
                    styleElement = document.createElement('style');
                    styleElement.id = 'price-cards-animation';
                    document.head.appendChild(styleElement);
                }
                styleElement.textContent = keyframes;
                
                // Set will-change for performance
                pricesSliderTrack.style.willChange = 'transform';
                priceCards.forEach(card => {
                    card.style.willChange = 'transform, box-shadow, border-color';
                });
            }
        };
        
        // Update animation on load and resize
        updateAnimation();
        window.addEventListener('resize', updateAnimation);
        
        // Pause on hover
        pricesSliderContainer.addEventListener('mouseenter', () => {
            pricesSliderTrack.style.animationPlayState = 'paused';
        });
        
        pricesSliderContainer.addEventListener('mouseleave', () => {
            pricesSliderTrack.style.animationPlayState = 'running';
        });
        
        // Touch events for mobile
        let touchStartX = 0;
        let touchStartTime = 0;
        
        pricesSliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartTime = Date.now();
            pricesSliderTrack.style.animationPlayState = 'paused';
        });
        
        pricesSliderContainer.addEventListener('touchmove', (e) => {
            e.preventDefault(); // Prevent scrolling while interacting with slider
        });
        
        pricesSliderContainer.addEventListener('touchend', (e) => {
            const touchEndTime = Date.now();
            const touchDuration = touchEndTime - touchStartTime;
            
            // Only resume animation if it was a quick tap (not a swipe)
            if (touchDuration < 300) {
                setTimeout(() => {
                    pricesSliderTrack.style.animationPlayState = 'running';
                }, 500);
            } else {
                pricesSliderTrack.style.animationPlayState = 'running';
            }
        });
    }
}

// Add CSS animations
const animationsStyle = document.createElement('style');
animationsStyle.textContent = `
    /* Entrance animations */
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    /* Apply animations */
    .animated {
        animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    .fade-in {
        animation: fadeIn 0.8s ease forwards;
    }
    
    .slide-in-right {
        animation: slideInRight 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    .slide-in-left {
        animation: slideInLeft 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    /* Staggered animations */
    .stagger-item {
        opacity: 0;
        animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    /* Pulse animation for attention */
    @keyframes pulse {
        0% {
            box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4);
        }
        70% {
            box-shadow: 0 0 0 10px rgba(212, 175, 55, 0);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(212, 175, 55, 0);
        }
    }
    
    .pulse {
        animation: pulse 2s infinite;
    }
    
    /* Shake animation for errors */
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    .shake {
        animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
    }
    
    /* Loading spinner */
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .spinner {
        animation: spin 1s linear infinite;
    }
    
    /* Bounce animation */
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-10px); }
        60% { transform: translateY(-5px); }
    }
    
    .bounce {
        animation: bounce 2s infinite;
    }
    
    /* Reduced motion preferences */
    @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
        
        .prices-slider-track {
            animation: none !important;
            transform: none !important;
            justify-content: center;
        }
    }
`;
document.head.appendChild(animationsStyle);

// Export animations for use
window.ThiqalAnimations = {
    initButtonAnimations,
    initCardAnimations,
    initScrollAnimations,
    initPriceCardsAnimation,
    initTypingAnimation,
    initParallax
};
