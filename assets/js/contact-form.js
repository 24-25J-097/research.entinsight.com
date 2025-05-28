// Traditional Vanilla JS Contact Form Handler (No ES6 Classes)

(function () {
    'use strict';

    // Variables
    let form = null;
    let nameField = null;
    let emailField = null;
    let messageField = null;
    let submitBtn = null;

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function () {
        initializeForm();
    });

    function initializeForm() {
        // Get form elements
        form = document.querySelector('#contact-form') || document.querySelector('form');

        if (!form) {
            console.error('Contact form not found');
            return;
        }

        nameField = form.querySelector('#name');
        emailField = form.querySelector('#email');
        messageField = form.querySelector('#message');
        submitBtn = form.querySelector('button[type="submit"]');

        // Add event listeners
        form.addEventListener('submit', handleFormSubmit);

        if (nameField) {
            nameField.addEventListener('blur', function () {
                validateField(nameField, 'name');
            });
            nameField.addEventListener('input', function () {
                clearFieldError(nameField);
            });
        }

        if (emailField) {
            emailField.addEventListener('blur', function () {
                validateField(emailField, 'email');
            });
            emailField.addEventListener('input', function () {
                clearFieldError(emailField);
            });
        }

        if (messageField) {
            messageField.addEventListener('blur', function () {
                validateField(messageField, 'message');
            });
            messageField.addEventListener('input', function () {
                clearFieldError(messageField);
            });
        }
    }

    function handleFormSubmit(event) {
        event.preventDefault();

        if (validateAllFields()) {
            submitForm().then();
        }
    }

    function validateAllFields() {
        const isNameValid = validateField(nameField, 'name');
        const isEmailValid = validateField(emailField, 'email');
        const isMessageValid = validateField(messageField, 'message');

        return isNameValid && isEmailValid && isMessageValid;
    }

    function validateField(field, type) {
        if (!field) return false;

        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        switch (type) {
            case 'name':
                if (!value) {
                    errorMessage = 'Name is required';
                    isValid = false;
                } else if (value.length < 2) {
                    errorMessage = 'Name must be at least 3 characters';
                    isValid = false;
                }
                break;

            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) {
                    errorMessage = 'Email is required';
                    isValid = false;
                } else if (!emailRegex.test(value)) {
                    errorMessage = 'Please enter a valid email address';
                    isValid = false;
                }
                break;

            case 'message':
                if (!value) {
                    errorMessage = 'Message is required';
                    isValid = false;
                } else if (value.length < 10) {
                    errorMessage = 'Message must be at least 10 characters';
                    isValid = false;
                }
                break;
        }

        if (isValid) {
            showFieldSuccess(field);
        } else {
            showFieldError(field, errorMessage);
        }

        return isValid;
    }

    function showFieldError(field, message) {
        // Remove success styling
        field.classList.remove('border-green-500');
        field.classList.add('border-red-500');

        // Remove existing error message
        removeErrorMessage(field);

        // Create an error message element
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message text-red-500 text-sm mt-1';
        errorDiv.textContent = message;

        // Add an error message after the field
        field.parentNode.appendChild(errorDiv);
    }

    function showFieldSuccess(field) {
        field.classList.remove('border-red-500');
        field.classList.add('border-green-500');
        removeErrorMessage(field);
    }

    function clearFieldError(field) {
        field.classList.remove('border-red-500', 'border-green-500');
        field.classList.add('border-blue-200/50');
        removeErrorMessage(field);
    }

    function removeErrorMessage(field) {
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.parentNode.removeChild(existingError);
        }
    }

    async function submitForm() {
        setLoadingState(true);

        const formData = {
            name: nameField.value.trim(),
            email: emailField.value.trim(),
            message: messageField.value.trim(),
            submissionTime: new Date().toISOString(),
            ipAddress: await getUserIP(),
            domain: window.location.hostname || "localhost",
        };

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:5000/api/public/notification/contact-us', true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                setLoadingState(false);
                if (xhr.status === 200) {
                    showSuccessNotification();
                    resetForm();
                } else {
                    try {
                        const response = JSON.parse(xhr.responseText);
                        const errorMessage = response?.error || 'Failed to send a message. Please try again.';
                        showErrorNotification(errorMessage);
                    } catch (parseErr) {
                        showErrorNotification('Unexpected error occurred.');
                    }
                }
            }
        };

        xhr.onerror = function () {
            setLoadingState(false);
            showErrorNotification('Network error occurred. Please check your connection.');
        };

        xhr.send(JSON.stringify(formData));
    }


    function setLoadingState(loading) {
        if (!submitBtn) return;

        if (loading) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Sending...</span>';
        } else {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-arrow-right ml-2"></i>';
        }
    }

    function showSuccessNotification() {
        showNotification('Message sent successfully!', 'success');
    }

    function showErrorNotification(message) {
        showNotification(message, 'error');
    }

    function showNotification(message, type) {
        const notification = document.createElement('div');
        const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
        const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';

        notification.className = 'fixed top-4 right-4 ' + bgColor + ' text-white px-6 py-4 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
        notification.innerHTML = '<div class="flex items-center"><i class="fas ' + icon + ' mr-3"></i><span>' + message + '</span></div>';

        document.body.appendChild(notification);

        // Animate in
        setTimeout(function () {
            notification.classList.remove('translate-x-full');
        }, 100);

        // Remove after 5 seconds
        setTimeout(function () {
            notification.classList.add('translate-x-full');
            setTimeout(function () {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    function resetForm() {
        if (form) {
            form.reset();

            // Clear validation styling
            const fields = [nameField, emailField, messageField];
            for (let i = 0; i < fields.length; i++) {
                if (fields[i]) {
                    clearFieldError(fields[i]);
                }
            }
        }
    }

    async function getUserIP() {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip; // user's public IP
        } catch (error) {
            return 'unknown'; // fallback if API fails
        }
    }

})();
