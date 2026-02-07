<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
    <title>ثِقَال - WhatsApp Integration</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #333;
            line-height: 1.6;
            padding: 20px;
            min-height: 100vh;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            text-align: center;
            margin-bottom: 40px;
            padding: 20px;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .header h1 {
            color: #25D366;
            font-size: clamp(1.8rem, 4vw, 2.5rem);
            margin-bottom: 10px;
        }

        .header p {
            color: #666;
            font-size: clamp(1rem, 2vw, 1.2rem);
        }

        .content {
            display: flex;
            flex-direction: column;
            gap: 30px;
        }

        .section {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            padding: clamp(20px, 4vw, 30px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .section h2 {
            color: #075E54;
            font-size: clamp(1.4rem, 3vw, 1.8rem);
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 3px solid #25D366;
        }

        /* Responsive WhatsApp Button Styles */
        .whatsapp-buttons-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
            gap: 20px;
            margin-top: 20px;
        }

        .whatsapp-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: clamp(12px, 3vw, 20px);
            background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
            color: white;
            text-decoration: none;
            padding: clamp(16px, 4vw, 24px);
            border-radius: 16px;
            font-weight: 600;
            font-size: clamp(1rem, 3vw, 1.2rem);
            border: none;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            width: 100%;
            box-shadow: 0 6px 20px rgba(37, 211, 102, 0.3);
            position: relative;
            overflow: hidden;
            min-height: 70px;
        }

        .whatsapp-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.6s;
        }

        .whatsapp-btn:hover::before,
        .whatsapp-btn:active::before {
            left: 100%;
        }

        .whatsapp-btn i {
            font-size: clamp(1.5rem, 4vw, 2rem);
            transition: transform 0.3s ease;
        }

        .whatsapp-btn:hover i,
        .whatsapp-btn:active i {
            transform: scale(1.1);
        }

        .whatsapp-btn .btn-text {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
        }

        .whatsapp-btn .country {
            font-size: clamp(1.1rem, 3vw, 1.3rem);
            font-weight: 700;
            margin-bottom: 5px;
        }

        .whatsapp-btn .number {
            font-size: clamp(0.9rem, 2vw, 1rem);
            opacity: 0.9;
            direction: ltr;
        }

        /* Floating WhatsApp Button for Mobile */
        .whatsapp-float {
            position: fixed;
            bottom: clamp(20px, 5vh, 40px);
            left: clamp(20px, 5vw, 40px);
            z-index: 1000;
            width: clamp(60px, 15vw, 70px);
            height: clamp(60px, 15vw, 70px);
            display: none;
        }

        .whatsapp-float-btn {
            width: 100%;
            height: 100%;
            background: #25D366;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: clamp(1.8rem, 4vw, 2.2rem);
            box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4);
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            text-decoration: none;
        }

        .whatsapp-float-btn:hover,
        .whatsapp-float-btn:active {
            transform: scale(1.1);
            background: #128C7E;
        }

        /* Form Styles */
        .contact-form {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .form-group {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .form-group label {
            font-weight: 600;
            color: #075E54;
            font-size: clamp(1rem, 2vw, 1.1rem);
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
            padding: clamp(12px, 3vw, 16px);
            border: 2px solid #ddd;
            border-radius: 12px;
            font-size: clamp(1rem, 2vw, 1.1rem);
            transition: border-color 0.3s ease;
            background: #f8f9fa;
        }

        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
            outline: none;
            border-color: #25D366;
            background: white;
        }

        .form-group.error input,
        .form-group.error textarea,
        .form-group.error select {
            border-color: #ff6b6b;
        }

        .submit-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: clamp(16px, 4vw, 20px);
            border: none;
            border-radius: 12px;
            font-size: clamp(1.1rem, 2.5vw, 1.3rem);
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 10px;
        }

        .submit-btn:hover,
        .submit-btn:active {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }

        .submit-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .container {
                padding: 10px;
            }

            .section {
                padding: 20px;
                border-radius: 16px;
            }

            .whatsapp-buttons-container {
                grid-template-columns: 1fr;
                gap: 15px;
            }

            .whatsapp-btn {
                padding: 20px;
                border-radius: 14px;
            }

            .whatsapp-float {
                display: block;
            }

            /* Hide regular buttons when floating button is visible */
            .whatsapp-regular {
                display: none;
            }

            .contact-form {
                gap: 15px;
            }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
            .whatsapp-buttons-container {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media (min-width: 1025px) {
            .whatsapp-buttons-container {
                grid-template-columns: repeat(3, 1fr);
            }
        }

        /* Touch Device Optimizations */
        @media (hover: none) and (pointer: coarse) {
            .whatsapp-btn,
            .submit-btn {
                min-height: 60px;
            }

            .whatsapp-btn:active {
                transform: scale(0.95);
            }

            .form-group input,
            .form-group textarea,
            .form-group select {
                font-size: 16px; /* Prevents iOS zoom on focus */
            }
        }

        /* Landscape Mode */
        @media (max-height: 500px) and (orientation: landscape) {
            .header {
                padding: 10px;
                margin-bottom: 20px;
            }

            .section {
                padding: 15px;
            }

            .whatsapp-btn {
                padding: 12px;
                min-height: 50px;
            }
        }

        /* High-DPI Screens */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
            .whatsapp-btn,
            .submit-btn {
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
        }

        /* Print Styles */
        @media print {
            .whatsapp-btn,
            .whatsapp-float,
            .submit-btn {
                display: none !important;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>ثِقَال - WhatsApp Integration</h1>
            <p>اتصل بنا عبر واتساب للحصول على زيت العلاقة ومعلومات مفصلة</p>
        </div>

        <div class="content">
            <section class="section">
                <h2>تواصل عبر واتساب</h2>
                <p style="margin-bottom: 20px; color: #666; font-size: clamp(1rem, 2vw, 1.1rem);">
                    اختر البلد الأقرب إليك للتواصل مع فريق الدعم عبر واتساب
                </p>
                
                <div class="whatsapp-buttons-container">
                    <!-- السعودية WhatsApp Button -->
                    <div class="whatsapp-regular">
                        <button class="whatsapp-btn" data-country="السعودية" data-number="+966501234567">
                            <i class="fab fa-whatsapp"></i>
                            <div class="btn-text">
                                <span class="country">السعودية</span>
                                <span class="number">+966 50 123 4567</span>
                            </div>
                        </button>
                    </div>

                    <!-- مصر WhatsApp Button -->
                    <div class="whatsapp-regular">
                        <button class="whatsapp-btn" data-country="مصر" data-number="+201012345678">
                            <i class="fab fa-whatsapp"></i>
                            <div class="btn-text">
                                <span class="country">مصر</span>
                                <span class="number">+20 10 1234 5678</span>
                            </div>
                        </button>
                    </div>

                    <!-- السودان WhatsApp Button -->
                    <div class="whatsapp-regular">
                        <button class="whatsapp-btn" data-country="السودان" data-number="+249991234567">
                            <i class="fab fa-whatsapp"></i>
                            <div class="btn-text">
                                <span class="country">السودان</span>
                                <span class="number">+249 99 123 4567</span>
                            </div>
                        </button>
                    </div>
                </div>
            </section>

            <!-- Floating WhatsApp Button (Mobile Only) -->
            <div class="whatsapp-float">
                <a href="#" class="whatsapp-float-btn" id="whatsappFloat">
                    <i class="fab fa-whatsapp"></i>
                </a>
            </div>

            <section class="section">
                <h2>اتصل بنا</h2>
                <form id="contactForm" class="contact-form">
                    <div class="form-group">
                        <label for="name">الاسم الكامل *</label>
                        <input type="text" id="name" name="name" required placeholder="أدخل اسمك الكامل">
                    </div>

                    <div class="form-group">
                        <label for="phone">رقم الهاتف *</label>
                        <input type="tel" id="phone" name="phone" required placeholder="مثال: 0501234567">
                    </div>

                    <div class="form-group">
                        <label for="email">البريد الإلكتروني (اختياري)</label>
                        <input type="email" id="email" name="email" placeholder="example@domain.com">
                    </div>

                    <div class="form-group">
                        <label for="country">البلد</label>
                        <select id="country" name="country">
                            <option value="السعودية">السعودية</option>
                            <option value="مصر">مصر</option>
                            <option value="السودان">السودان</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="message">رسالتك *</label>
                        <textarea id="message" name="message" rows="5" required 
                                  placeholder="أخبرنا بما تحتاجه..."></textarea>
                    </div>

                    <button type="submit" class="submit-btn">
                        <i class="fas fa-paper-plane"></i> إرسال الرسالة
                    </button>
                </form>
            </section>
        </div>
    </div>

    <script>
        // ثِقَال - WhatsApp Integration

        document.addEventListener('DOMContentLoaded', function() {
            initWhatsAppButtons();
            initContactForm();
            initAnalyticsTracking();
            initFloatingButton();
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
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    handleWhatsAppClick(this);
                });
                
                // Touch optimization for mobile
                button.addEventListener('touchstart', function(e) {
                    e.preventDefault();
                    this.style.opacity = '0.8';
                });
                
                button.addEventListener('touchend', function(e) {
                    e.preventDefault();
                    this.style.opacity = '1';
                });
            });
            
            function handleWhatsAppClick(button) {
                const country = button.getAttribute('data-country');
                const number = button.getAttribute('data-number');

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

                // Open WhatsApp in new tab on desktop, same tab on mobile
                if (window.innerWidth <= 768) {
                    window.location.href = whatsappUrl;
                } else {
                    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
                }

                // Show confirmation message
                showWhatsAppConfirmation(country, number);
                
                // Add haptic feedback on mobile
                if ('vibrate' in navigator) {
                    navigator.vibrate(50);
                }
            }
        }

        // Floating Button for Mobile
        function initFloatingButton() {
            const floatBtn = document.getElementById('whatsappFloat');
            if (floatBtn && window.innerWidth <= 768) {
                floatBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Show country selection for floating button
                    showCountrySelection();
                });
            }
        }
        
        function showCountrySelection() {
            const selectionHTML = `
                <div class="country-selection" style="
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.8);
                    z-index: 2000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                ">
                    <div style="
                        background: white;
                        border-radius: 20px;
                        padding: 30px;
                        max-width: 400px;
                        width: 100%;
                        animation: fadeIn 0.3s ease;
                    ">
                        <h3 style="color: #075E54; margin-bottom: 20px; text-align: center;">
                            اختر البلد
                        </h3>
                        <div style="display: flex; flex-direction: column; gap: 10px;">
                            <button class="whatsapp-btn" data-country="السعودية" data-number="+966501234567" style="margin-bottom: 10px;">
                                <i class="fab fa-whatsapp"></i>
                                <div class="btn-text">
                                    <span class="country">السعودية</span>
                                    <span class="number">+966 50 123 4567</span>
                                </div>
                            </button>
                            <button class="whatsapp-btn" data-country="مصر" data-number="+201012345678" style="margin-bottom: 10px;">
                                <i class="fab fa-whatsapp"></i>
                                <div class="btn-text">
                                    <span class="country">مصر</span>
                                    <span class="number">+20 10 1234 5678</span>
                                </div>
                            </button>
                            <button class="whatsapp-btn" data-country="السودان" data-number="+249991234567">
                                <i class="fab fa-whatsapp"></i>
                                <div class="btn-text">
                                    <span class="country">السودان</span>
                                    <span class="number">+249 99 123 4567</span>
                                </div>
                            </button>
                        </div>
                        <button onclick="this.closest('.country-selection').remove()" style="
                            margin-top: 20px;
                            width: 100%;
                            padding: 12px;
                            background: #ff6b6b;
                            color: white;
                            border: none;
                            border-radius: 10px;
                            font-size: 1rem;
                            cursor: pointer;
                        ">
                            إلغاء
                        </button>
                    </div>
                </div>
            `;
            
            const selectionDiv = document.createElement('div');
            selectionDiv.innerHTML = selectionHTML;
            document.body.appendChild(selectionDiv);
            
            // Add fadeIn animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `;
            document.head.appendChild(style);
            
            // Re-initialize buttons in selection
            setTimeout(() => {
                const selectionButtons = selectionDiv.querySelectorAll('.whatsapp-btn');
                selectionButtons.forEach(button => {
                    button.addEventListener('click', function(e) {
                        e.stopPropagation();
                        const country = this.getAttribute('data-country');
                        const number = this.getAttribute('data-number');
                        const cleanNumber = number.replace(/[\s+\-()]/g, '');
                        const defaultMessage = encodeURIComponent(`مرحباً، أرغب في طلب زيت العلاقة ومزيد من التفاصيل حول:
        - تركيبة المنتج ومكوناته
        - طريقة الاستخدام الصحيحة
        - تكاليف الشحن والتوصيل
        - الضمانات المتاحة`);
                        const whatsappUrl = `https://wa.me/${cleanNumber}?text=${defaultMessage}`;
                        
                        window.location.href = whatsappUrl;
                        selectionDiv.remove();
                    });
                });
            }, 100);
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
                right: 20px;
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
                            transform: translateX(100%);
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
                            transform: translateX(100%);
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
                right: 20px;
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
    </script>
</body>
</html>