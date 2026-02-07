// ثِقَال - Main JavaScript File

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('ثِقَال - Premium Men\'s Wellness Website Loaded');
    
    // Initialize all modules
    initLoadingScreen();
    initNavigation();
    initScrollEffects();
    initBackToTop();
    initSmoothScrolling();
    initLazyLoading();
    initFormValidation();
    initPerformanceMonitoring();
});

// Loading Screen Management
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Hide loading screen after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.visibility = 'hidden';
            
            // Remove from DOM after animation
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 800);
        }, 1200);
    });
    
    // Fallback: Hide loading screen after 5 seconds max
    setTimeout(() => {
        if (loadingScreen.style.opacity !== '0') {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.visibility = 'hidden';
            loadingScreen.style.display = 'none';
        }
    }, 5000);
}

// Navigation Management
function initNavigation() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');
    const header = document.getElementById('main-header');
    
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.setAttribute('aria-expanded', 
                this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
            );
            
            // Change icon
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                navLinks.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    });
    
    // Header scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 100) {
            header.classList.add('scrolled');
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
            header.style.padding = '0.75rem 5%';
        } else {
            header.classList.remove('scrolled');
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
            header.style.padding = '1rem 5%';
        }
        
        // Hide/show header on scroll
        if (currentScroll > lastScroll && currentScroll > 200) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.main-nav') && 
            !event.target.closest('.mobile-menu-btn') &&
            navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            // Calculate offset based on header height
            const headerHeight = document.querySelector('#main-header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            // Smooth scroll
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update URL without page reload
            history.pushState(null, null, targetId);
        });
    });
}

// Scroll Effects
function initScrollEffects() {
    // Fade in elements on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInOnScroll = () => {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    };
    
    // Check on load and scroll
    window.addEventListener('load', fadeInOnScroll);
    window.addEventListener('scroll', fadeInOnScroll);
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
    }
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Lazy Loading for Images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for older browsers
        const lazyImages = document.querySelectorAll('img[data-src]');
        let lazyImageCount = lazyImages.length;
        
        if (lazyImageCount > 0) {
            const lazyLoad = function() {
                lazyImages.forEach(img => {
                    if (img.getBoundingClientRect().top < window.innerHeight + 100 &&
                        img.getBoundingClientRect().bottom > -100) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                    }
                });
                
                // Clean up event listeners
                if (--lazyImageCount === 0) {
                    document.removeEventListener('scroll', lazyLoad);
                    window.removeEventListener('resize', lazyLoad);
                    window.removeEventListener('orientationchange', lazyLoad);
                }
            };
            
            // Initial check
            lazyLoad();
            
            // Listen for events
            document.addEventListener('scroll', lazyLoad);
            window.addEventListener('resize', lazyLoad);
            window.addEventListener('orientationchange', lazyLoad);
        }
    }
}

// Form Validation (for future forms)
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!this.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
                
                // Add validation styles
                this.classList.add('was-validated');
            }
        }, false);
    });
}

// Performance Monitoring
function initPerformanceMonitoring() {
    // Log performance metrics
    window.addEventListener('load', function() {
        if ('performance' in window) {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            const domReadyTime = perfData.domComplete - perfData.domLoading;
            
            console.log(`Page load time: ${pageLoadTime}ms`);
            console.log(`DOM ready time: ${domReadyTime}ms`);
            
            // Send to analytics (if configured)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'timing_complete', {
                    'name': 'page_load',
                    'value': pageLoadTime,
                    'event_category': 'Performance'
                });
            }
        }
    });
    
    // Monitor largest contentful paint
    if ('PerformanceObserver' in window) {
        try {
            const po = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    console.log('LCP:', entry.startTime);
                    // Send to analytics
                }
            });
            
            po.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
            // Do nothing if observer fails
        }
    }
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    
    // Send error to analytics (if configured)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
            'description': e.error.toString(),
            'fatal': false
        });
    }
}, true);

// Offline Detection
window.addEventListener('online', function() {
    document.body.classList.remove('offline');
    console.log('You are now online.');
});

window.addEventListener('offline', function() {
    document.body.classList.add('offline');
    console.log('You are now offline.');
    
    // Show offline notification
    showNotification('أنت غير متصل بالإنترنت', 'warning');
});

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show with animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Auto remove after 5 seconds
    const autoRemove = setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', function() {
        clearTimeout(autoRemove);
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

// Export functions for use in other modules
window.ThiqalApp = {
    showNotification,
    initNavigation,
    initSmoothScrolling
};