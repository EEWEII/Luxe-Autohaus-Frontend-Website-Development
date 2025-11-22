document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    // Form validation function
    function validateForm(e) {
        e.preventDefault();
        
        // Get form fields
        const username = document.getElementById('username');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        
        // Reset any existing error messages
        clearErrors();
        
        let isValid = true;
        
        // Validate username
        if (!username.value.trim()) {
            showError(username, 'Username is required');
            isValid = false;
        }
        
        // Validate email
        if (!email.value.trim()) {
            showError(email, 'Email is required');
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate password
        if (!password.value) {
            showError(password, 'Password is required');
            isValid = false;
        }
        
        // If validation passes, show welcome message
        if (isValid) {
            showWelcomeMessage(username.value);
            loginForm.reset();
        }
    }
    
    // Show error message under input
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        formGroup.classList.add('error');
        
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorDiv);
        }
    }
    
    // Clear all error messages
    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        const errorInputs = document.querySelectorAll('.form-group.error');
        
        errorMessages.forEach(error => error.remove());
        errorInputs.forEach(input => input.classList.remove('error'));
    }
    
    // Show welcome message
    function showWelcomeMessage(username) {
        const welcomeDiv = document.createElement('div');
        welcomeDiv.className = 'welcome-message';
        welcomeDiv.textContent = `WELCOME ${username.toUpperCase()}`;
        
        // Insert welcome message at the top of the form
        loginForm.insertBefore(welcomeDiv, loginForm.firstChild);
        
        // Remove welcome message after 3 seconds
        setTimeout(() => {
            welcomeDiv.remove();
        }, 3000);
    }
    
    // Bind form submit event
    loginForm.addEventListener('submit', validateForm);
}); 