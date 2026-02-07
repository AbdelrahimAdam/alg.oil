// ثِقَال - Animations JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initButtonAnimations();
    initCardAnimations();
    initScrollAnimations();
    initHoverEffects();
    initPageTransitions();
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
            `;
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Hover scale effect
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        // Active state
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = 'scale(1.05)';
        });
    });
    
    // Add ripple animation to styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Card Animations
function initCardAnimations() {
    const cards = document.querySelectorAll('.story-card, .result-card, .pricing-card, .info-card');
    
    cards.forEach(card => {
        // Entrance animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
        
        observer.observe(card);
        
        // Hover animation
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
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
                    const target = +counter.getAttribute('data-target');
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16);
                    let current = 0;
                    
                    const updateCounter = () => {
                        if (current < target) {
                            current += increment;
                            counter.innerText = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    }
    
    // Staggered animation for grid items
    const gridItems = document.querySelectorAll('.story-grid > *, .results-grid > *, .pricing-grid > *');
    
    gridItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Text reveal animation
    const textRevealElements = document.querySelectorAll('.reveal-text');
    
    textRevealElements.forEach(element => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(element);
    });
}

// Hover Effects
function initHoverEffects() {
    // Link underline animation
    const links = document.querySelectorAll('a:not(.btn)');
    
    links.forEach(link => {
        if (link.querySelector('span')) {
            const span = link.querySelector('span');
            span.style.display = 'inline-block';
            span.style.position = 'relative';
            
            link.addEventListener('mouseenter', function() {
                span.style.transform = 'translateY(-2px)';
            });
            
            link.addEventListener('mouseleave', function() {
                span.style.transform = 'translateY(0)';
            });
        }
    });
    
    // Icon hover effects
    const icons = document.querySelectorAll('.icon-hover');
    
    icons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(10deg) scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(0) scale(1)';
        });
    });
}

// Page Transitions
function initPageTransitions() {
    // Smooth page transitions for internal links
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        
        if (link && link.href && link.href.includes(window.location.origin) && 
            !link.href.includes('#') && link.target !== '_blank') {
            e.preventDefault();
            
            // Add fade out animation
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.3s ease';
            
            // Navigate after animation
            setTimeout(() => {
                window.location.href = link.href;
            }, 300);
        }
    });
    
    // Fade in on page load
    window.addEventListener('pageshow', function() {
        document.body.style.opacity = '1';
    });
}

// Parallax Effects
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const rate = element.dataset.rate || 0.5;
                const offset = element.offsetTop;
                const yPos = -(scrolled * rate) + (offset * rate);
                
                element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });
        });
    }
}

// Typing Animation
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-animation');
    
    if (typingElement) {
        const text = typingElement.textContent;
        typingElement.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing when element is in view
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                typeWriter();
                observer.unobserve(typingElement);
            }
        });
        
        observer.observe(typingElement);
    }
}

// Export animations for use
window.ThiqalAnimations = {
    initButtonAnimations,
    initCardAnimations,
    initScrollAnimations
};