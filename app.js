const menu = document.querySelector('#mobile-menu');
const mediaLinks = document.querySelector('.navbar__menu');

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    mediaLinks.classList.toggle('active');
});

// Newsletter
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('newsletter-form');
    const emailInput = document.getElementById('newsletter-email');
    const confirmationMessage = document.getElementById('newsletter-confirmation');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const email = emailInput.value.trim();

        // Validate email
        if (!email) {
            confirmationMessage.style.display = 'block';
            confirmationMessage.style.color = 'red';
            confirmationMessage.innerText = 'Please enter a valid email address.';
            return;
        }

        // Simulate form submission (replace with actual AJAX/fetch call)
        fetch('subscribe.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `email=${encodeURIComponent(email)}`
        })
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
        })
        .then(data => {
            // Display success message
            confirmationMessage.style.display = 'block';
            confirmationMessage.style.color = 'green';
            confirmationMessage.innerText = 'Thank you for subscribing!';
            
            // Reset the form
            emailInput.value = '';
        })
        .catch(error => {
            // Display error message
            confirmationMessage.style.display = 'block';
            confirmationMessage.style.color = 'green';
            confirmationMessage.innerText = 'Thank you for subscribing!';
            console.error('Error:', error);
        });
    });
});


// Reseme JS
document.getElementById('resumeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Capture user input
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const experience = document.getElementById('experience').value;
    const education = document.getElementById('education').value;

    // Create PDF content
    doc.text(`Name: ${name}`, 10, 10);
    doc.text(`Email: ${email}`, 10, 20);
    doc.text(`Phone: ${phone}`, 10, 30);
    doc.text(`Experience: ${experience}`, 10, 40);
    doc.text(`Education: ${education}`, 10, 50);

    // Save PDF
    doc.save('resume.pdf');
});
