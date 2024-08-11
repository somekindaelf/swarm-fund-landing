// scripts.js

// Add an event listener for form submission
document.getElementById('ideaForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = {
        category: document.getElementById('ideaCategory').value,
        link: document.getElementById('ideaLink').value,
        email: document.getElementById('email').value,
        referrer: document.getElementById('referrer').value,
        shoutout: document.getElementById('shoutout').value,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
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

    // Save form data to Firestore
    db.collection("submissions").add(formData)
    .then(() => {
        alert('Thank you for your submission! We will review it and get back to you.');
        document.getElementById('ideaForm').reset();
    })
    .catch((error) => {
        console.error('Error writing document: ', error);
        alert('There was an error with your submission. Please try again.');
    });
});

// Tooltip functionality
document.getElementById('infoIcon').addEventListener('mouseenter', function(event) {
    let tooltip = document.getElementById('tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'tooltip';
        tooltip.className = 'tooltip';
        tooltip.textContent = "Trusted Sites: GoFundMe, Kickstarter, Indiegogo, Patreon, Crowdfunder, JustGiving, Fundly, Crowdrise, FundRazr, Chuffed.";
        document.body.appendChild(tooltip);
    }

    tooltip.style.left = `${event.pageX + 10}px`;
    tooltip.style.top = `${event.pageY + 10}px`;
    tooltip.style.visibility = 'visible';
    tooltip.style.opacity = '1';
});

document.getElementById('infoIcon').addEventListener('mouseleave', function() {
    const tooltip = document.getElementById('tooltip');
    if (tooltip) {
        tooltip.style.visibility = 'hidden';
        tooltip.style.opacity = '0';
    }
});
