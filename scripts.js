// scripts.js
document.getElementById('ideaForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = {
        category: document.getElementById('ideaCategory').value,
        link: document.getElementById('ideaLink').value,
        email: document.getElementById('email').value,
        referrer: document.getElementById('referrer').value,
        shoutout: document.getElementById('shoutout').value
    };

    // List of trusted crowdfunding site patterns
    const trustedSites = [
        'https://www.gofundme.com/',
        'https://www.kickstarter.com/',
        'https://www.indiegogo.com/',
        'https://www.patreon.com/',
        'https://www.crowdfunder.com/',
        'https://www.justgiving.com/',
        'https://www.fundly.com/',
        'https://www.crowdrise.com/',
        'https://fundrazr.com/',
        'https://chuffed.org/'
    ];

    const isTrusted = trustedSites.some(site => formData.link.startsWith(site));

    // Custom validation message for unrecognized links
    if (!isTrusted) {
        const feedback = document.getElementById('invalidFeedback');
        feedback.style.display = 'block';
        document.getElementById('ideaLink').focus();
        return;
    } else {
        document.getElementById('invalidFeedback').style.display = 'none';
    }

    // Check if terms and conditions are accepted
    const termsAccepted = document.getElementById('terms').checked;
    if (!termsAccepted) {
        alert('Please accept the Terms and Conditions before submitting.');
        return;
    }

    // Google Apps Script Web App URL
    const scriptURL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

    fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        alert('Thank you for your submission! We will review it and get back to you.');
        document.getElementById('ideaForm').reset();
    })
    .catch(error => {
        console.error('Error!', error.message);
        alert('There was an error with your submission. Please try again.');
    });
});

// Tooltip functionality
document.getElementById('infoIcon').addEventListener('mouseenter', function() {
    document.getElementById('tooltip').style.visibility = 'visible';
    document.getElementById('tooltip').style.opacity = '1';
});

document.getElementById('infoIcon').addEventListener('mouseleave', function() {
    document.getElementById('tooltip').style.visibility = 'hidden';
    document.getElementById('tooltip').style.opacity = '0';
});
