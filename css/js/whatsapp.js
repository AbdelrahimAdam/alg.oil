// ثِقَال - WhatsApp Integration

document.addEventListener('DOMContentLoaded', function() {
    initWhatsAppButtons();
    initContactForm();
    initAnalyticsTracking();
});

// WhatsApp Button Functionality
function initWhatsAppButtons() {
    const whatsappButtons = document.querySelectorAll('.whatsapp-btn');
    const defaultMessage = encodeURIComponent(`مرحباً، أرغب في طلب زيت العلاقة ومزيد من التفاصيل حول:
- تركيبة المنتج ومكوناته
- طريقة الاستخدام الصحيحة
- تكاليف الشحن والتوصيل
- الضمانات المتاحة`);

    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            const country = this.getAttribute('data-country');
            const number = this.getAttribute('data-number');
            
            if (!number) {
                console.error('رقم WhatsApp غير محدد');
                return;
            }

            // Clean phone number (remove spaces and special characters)
            const cleanNumber = number.replace(/[\s+\-()]/g, '');
            
            // Create WhatsApp URL
            const whatsappUrl = `https://wa.me/${cleanNumber}?text=${defaultMessage}`;
            
            // Track click in analytics
            trackWhatsAppClick(country, number);
            
            // Open WhatsApp in new tab
            window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
            
            // Show confirmation message
            showWhatsAppConfirmation(country, number);
        });
    });
    
    // Add click effect to buttons
    whatsappButtons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
        
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (validateContactForm(data)) {
                // Show loading state
                const submitBtn = this.querySelector('[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
                submitBtn.disabled = true;
                
                // Simulate API call (replace with actual API endpoint)
                setTimeout(() => {
                    // Success message
                    showSuccessMessage('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
                    
                    // Reset form
                    this.reset();
                    
                    // Restore button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // Track form submission
                    trackFormSubmission(data);
                }, 1500);
            }
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
}

// Form Validation
function validateContactForm(data) {
    let isValid = true;
    
    // Name validation
    if (!data.name || data.name.trim().length < 2) {
        showFieldError('name', 'الرجاء إدخال اسم صحيح (أكثر من حرفين)');
        isValid = false;
    }
    
    // Phone validation (Arabic countries format)
    if (!data.phone || !isValidPhone(data.phone)) {
        showFieldError('phone', 'الرجاء إدخال رقم هاتف صحيح');
        isValid = false;
    }
    
    // Email validation (optional)
    if (data.email && !isValidEmail(data.email)) {
        showFieldError('email', 'الرجاء إدخال بريد إلكتروني صحيح');
        isValid = false;
    }
    
    // Message validation
    if (!data.message || data.message.trim().length < 10) {
        showFieldError('message', 'الرجاء كتابة رسالة مفصلة (10 أحرف على الأقل)');
        isValid = false;
    }
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    switch (fieldName) {
        case 'name':
            if (value.length < 2) {
                showFieldError(field, 'الرجاء إدخال اسم صحيح (أكثر من حرفين)');
                return false;
            }
            break;
            
        case 'phone':
            if (!isValidPhone(value)) {
                showFieldError(field, 'الرجاء إدخال رقم هاتف صحيح');
                return false;
            }
            break;
            
        case 'email':
            if (value && !isValidEmail(value)) {
                showFieldError(field, 'الرجاء إدخال بريد إلكتروني صحيح');
                return false;
            }
            break;
            
        case 'message':
            if (value.length < 10) {
                showFieldError(field, 'الرجاء كتابة رسالة مفصلة (10 أحرف على الأقل)');
                return false;
            }
            break;
    }
    
    clearFieldError(field);
    return true;
}

function showFieldError(fieldOrName, message) {
    const field = typeof fieldOrName === 'string' 
        ? document.querySelector(`[name="${fieldOrName}"]`)
        : fieldOrName;
    
    if (!field) return;
    
    // Remove existing error
    clearFieldError(field);
    
    // Add error class
    field.classList.add('error');
    
    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #ff6b6b;
        font-size: 0.875rem;
        margin-top: 0.5rem;
        text-align: right;
    `;
    
    // Insert after field
    field.parentNode.appendChild(errorElement);
}

function clearFieldError(field) {
    field.classList.remove('error');
    
    // Remove error message
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

// Utility Functions
function isValidPhone(phone) {
    // Accepts various Arabic country formats
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Confirmation Messages
function showWhatsAppConfirmation(country, number) {
    const confirmation = document.createElement('div');
    confirmation.className = 'whatsapp-confirmation';
    confirmation.innerHTML = `
        <div class="confirmation-content">
            <i class="fab fa-whatsapp"></i>
            <div>
                <h4>جاري فتح WhatsApp</h4>
                <p>سيتم فتح محادثة مع ${country} على الرقم ${number}</p>
            </div>
        </div>
    `;
    
    confirmation.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        background: #25D366;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideIn 0.3s ease;
        max-width: 350px;
    `;
    
    document.body.appendChild(confirmation);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        confirmation.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (confirmation.parentNode) {
                confirmation.parentNode.removeChild(confirmation);
            }
        }, 300);
    }, 5000);
    
    // Add animations to styles
    if (!document.querySelector('#confirmation-animations')) {
        const style = document.createElement('style');
        style.id = 'confirmation-animations';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(-100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(-100%);
                    opacity: 0;
                }
            }
            
            .confirmation-content {
                display: flex;
                align-items: center;
                gap: 1rem;
            }
            
            .confirmation-content i {
                font-size: 2rem;
            }
            
            .confirmation-content h4 {
                margin: 0 0 0.25rem 0;
                font-size: 1.1rem;
            }
            
            .confirmation-content p {
                margin: 0;
                font-size: 0.9rem;
                opacity: 0.9;
            }
        `;
        document.head.appendChild(style);
    }
}

function showSuccessMessage(message) {
    const success = document.createElement('div');
    success.className = 'success-message';
    success.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    success.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        background: #4CAF50;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideIn 0.3s ease;
        max-width: 350px;
    `;
    
    document.body.appendChild(success);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        success.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (success.parentNode) {
                success.parentNode.removeChild(success);
            }
        }, 300);
    }, 5000);
}

// Analytics Tracking
function initAnalyticsTracking() {
    // Track WhatsApp clicks
    window.trackWhatsAppClick = function(country, number) {
        // Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'whatsapp_click', {
                'event_category': 'Contact',
                'event_label': country,
                'value': 1
            });
        }
        
        // Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Contact', {
                method: 'WhatsApp',
                country: country
            });
        }
        
        // Log to console (for debugging)
        console.log(`WhatsApp click tracked: ${country} - ${number}`);
        
        // Store in localStorage for offline tracking
        try {
            const clicks = JSON.parse(localStorage.getItem('thiqal_whatsapp_clicks') || '[]');
            clicks.push({
                country,
                number,
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent
            });
            localStorage.setItem('thiqal_whatsapp_clicks', JSON.stringify(clicks));
        } catch (e) {
            console.error('Failed to store click data:', e);
        }
    };
    
    // Track form submissions
    window.trackFormSubmission = function(formData) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                'event_category': 'Contact',
                'event_label': 'Contact Form',
                'value': 1
            });
        }
        
        // Store form data (anonymized)
        try {
            const submissions = JSON.parse(localStorage.getItem('thiqal_form_submissions') || '[]');
            submissions.push({
                timestamp: new Date().toISOString(),
                country: formData.country || 'Unknown',
                hasEmail: !!formData.email,
                messageLength: formData.message ? formData.message.length : 0
            });
            localStorage.setItem('thiqal_form_submissions', JSON.stringify(submissions));
        } catch (e) {
            console.error('Failed to store form data:', e);
        }
    };
    
    // Track page views
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            'page_title': document.title,
            'page_location': window.location.href,
            'page_path': window.location.pathname
        });
    }
}

// Export WhatsApp functionality
window.ThiqalWhatsApp = {
    initWhatsAppButtons,
    initContactForm,
    showWhatsAppConfirmation,
    showSuccessMessage
};