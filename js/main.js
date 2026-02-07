// ثِقَال - Main JavaScript File
document.addEventListener('DOMContentLoaded', function() {
    console.log('ثِقَال - Premium Men\'s Wellness Website Loaded');
    
    // Remove loading screen
    setTimeout(function() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.visibility = 'hidden';
        }
    }, 1500);
    
    // Performance measurement
    window.addEventListener('load', function() {
        const pageLoadTime = Date.now() - performance.timing.navigationStart;
        console.log('Page load time: ' + pageLoadTime + 'ms');
        console.log('DOM ready time: ' + (performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart) + 'ms');
    });
    
    // First Input Delay measurement
    let firstInputDelay;
    let firstInputTimeStamp;
    
    window.addEventListener('first-input', function(event) {
        firstInputDelay = event.processingStart - event.startTime;
        firstInputTimeStamp = event.timeStamp;
        console.log('FID: ' + firstInputDelay);
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animations
    document.querySelectorAll('.story-card, .process-step, .result-card, .pricing-card, .info-card').forEach(el => {
        observer.observe(el);
    });
    
    // Navigation scrolling
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});