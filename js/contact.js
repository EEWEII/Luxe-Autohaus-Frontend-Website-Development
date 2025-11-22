document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    // Form validation function
    function validateForm(e) {
        e.preventDefault();
        
        // Get form fields
        const firstName = document.getElementById('first-name');
        const lastName = document.getElementById('last-name');
        const phone = document.getElementById('phone');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        
        // Reset all error states
        clearErrors();
        
        let isValid = true;
        
        // Validate first name
        if (!firstName.value.trim()) {
            showError(firstName, 'First name is required');
            isValid = false;
        } else if (!/^[a-zA-Z\s]{2,30}$/.test(firstName.value.trim())) {
            showError(firstName, 'Please enter a valid first name');
            isValid = false;
        }
        
        // Validate last name
        if (!lastName.value.trim()) {
            showError(lastName, 'Last name is required');
            isValid = false;
        } else if (!/^[a-zA-Z\s]{2,30}$/.test(lastName.value.trim())) {
            showError(lastName, 'Please enter a valid last name');
            isValid = false;
        }
        
        // Validate phone number (if provided)
        if (phone.value.trim() && !/^[\d\s\-+()]{10,20}$/.test(phone.value.trim())) {
            showError(phone, 'Please enter a valid phone number');
            isValid = false;
        }
        
        // Validate email
        if (!email.value.trim()) {
            showError(email, 'Email address is required');
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate message content
        if (!message.value.trim()) {
            showError(message, 'Message is required');
            isValid = false;
        } else if (message.value.trim().length < 10) {
            showError(message, 'Message must be at least 10 characters long');
            isValid = false;
        }
        
        // If validation passes, submit the form
        if (isValid) {
            // Show success message
            showSuccessMessage();
            // Reset form
            contactForm.reset();
        }
    }
    
    // Display error message
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        // Add error styles
        formGroup.classList.add('error');
        input.classList.add('error');
        
        // Add error message if not already present
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorDiv);
        }
    }
    
    // Clear all error messages
    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        const errorInputs = document.querySelectorAll('.error');
        
        errorMessages.forEach(error => error.remove());
        errorInputs.forEach(input => input.classList.remove('error'));
    }
    
    // Display success message
    function showSuccessMessage() {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Thank you for your message. We will contact you soon!';
        
        // Insert success message
        contactForm.insertBefore(successMessage, contactForm.firstChild);
        
        // Remove success message after 3 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 3000);
    }
    
    // Bind form submit event
    contactForm.addEventListener('submit', validateForm);
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            clearErrors();
            if (this.value.trim() === '' && this.required) {
                showError(this, `${this.previousElementSibling.textContent.replace(' *', '')} is required`);
            }
        });
    });
}); 