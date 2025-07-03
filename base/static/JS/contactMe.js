/**
 * Contact Form Email Functionality
 * This script handles the submission of the contact form and sends emails using EmailJS
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your User ID
    // Replace 'YOUR_USER_ID' with your actual EmailJS User ID
    emailjs.init('ZwahDFsJ04zUok_25');
    
    // Get references to DOM elements
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    // Add submit event listener to the form
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    /**
     * Handles the form submission
     * @param {Event} e - The form submission event
     */
    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Show sending status
        updateFormStatus("Sending message...", "#465fe9");
        
        // Create data object to send
        const formData = {
            name: name,
            email: email,
            message: message,
            recipient: "mohamed.rashedwork2005@gmail.com" // Replace with your actual email
        };
        
        // Send email using EmailJS
        sendEmail(formData);
    }
    
    /**
     * Sends the email using EmailJS
     * @param {Object} formData - The data from the form
     */
    function sendEmail(formData) {
        emailjs.send(
            'service_96pvlr7',    // Replace with your actual Service ID
            'template_oa0qi7j',   // Replace with your actual Template ID
            formData
        )
        .then(function() {
            // Success handler
            updateFormStatus("Message sent successfully!", "#198754");
            contactForm.reset();
            
            // Hide the success message after 5 seconds
            setTimeout(() => {
                if (formStatus) formStatus.style.display = "none";
            }, 5000);
        })
        .catch(function(error) {
            // Error handler
            updateFormStatus("Failed to send message. Please try again.", "#dc3645");
            console.error('EmailJS error:', error);
        });
    }
    
    /**
     * Updates the form status message
     * @param {string} message - The status message to display
     * @param {string} color - The color of the status message
     */
    function updateFormStatus(message, color) {
        if (formStatus) {
            formStatus.textContent = message;
            formStatus.style.color = color;
            formStatus.style.display = "block";
        }
    }
});

document.querySelectorAll('.project-carousel').forEach(carousel => {
    const images = carousel.querySelectorAll('.project-img');
    let current = 0;

    const update = () => {
        images.forEach((img, index) => {
            img.classList.toggle('active', index === current);
        });
    };

    carousel.querySelector('.carousel-arrow.left')?.addEventListener('click', () => {
        current = (current - 1 + images.length) % images.length;
        update();
    });

    carousel.querySelector('.carousel-arrow.right')?.addEventListener('click', () => {
        current = (current + 1) % images.length;
        update();
    });

    // Optional: auto-advance
    // setInterval(() => {
    //     current = (current + 1) % images.length;
    //     update();
    // }, 5000);

    update();
});


// -------------Contact Me-------------
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Here you would normally send the data to a server
            // For demonstration, we'll just show a success message
            
            // Display success message
            formStatus.style.display = 'block';
            formStatus.style.backgroundColor = 'rgba(37, 211, 102, 0.1)';
            formStatus.style.color = '#25D366';
            formStatus.textContent = 'Thank you! Your message has been sent successfully.';
            
            // Reset form
            contactForm.reset();
            
            // Hide message after 5 seconds
            setTimeout(function() {
                formStatus.style.display = 'none';
            }, 5000);
        });
    }
    
    // Add hover effect for contact cards
    const contactCards = document.querySelectorAll('.contact-card');
    
    contactCards.forEach(card => {
        card.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-5px)';
            
            // Apply specific shadow based on card type
            if (this.classList.contains('whatsapp-card')) {
                this.style.boxShadow = '0 8px 20px rgba(37, 211, 102, 0.1)';
            } else if (this.classList.contains('linkedin-card')) {
                this.style.boxShadow = '0 8px 20px rgba(10, 102, 194, 0.1)';
            } else if (this.classList.contains('github-card')) {
                this.style.boxShadow = '0 8px 20px rgba(10, 102, 194, 0.1)';
            } else {
                this.style.boxShadow = '0 8px 20px rgba(70, 95, 233, 0.1)';
            }
        });
        
        card.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Add hover effects for form button
    const submitButton = document.querySelector('.blue-button');
    
    if (submitButton) {
        submitButton.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 5px 15px rgba(70, 95, 233, 0.4)';
        });
        
        submitButton.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    }
    
    // Add focus and blur events for form inputs
    const formInputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = '#465fe9';
            this.style.outline = 'none';
        });
        
        input.addEventListener('blur', function() {
            this.style.borderColor = '#ddd';
        });
    });
});