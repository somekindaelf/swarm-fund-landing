// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    const ideaForm = document.getElementById('ideaForm');

    // Event listener for form submission
    ideaForm.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log("Form submission triggered");

        // Collecting form data
        const formData = {
            category: document.getElementById('ideaCategory').value,
            link: document.getElementById('ideaLink').value,
            email: document.getElementById('email').value,
            referrer: document.getElementById('referrer').value,
            shoutout: document.getElementById('shoutout').value
        };
        console.log("Form data collected:", formData);

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

        // Validate the link
        const isTrusted = trustedSites.some(site => formData.link.startsWith(site));
        console.log("Is the link trusted?", isTrusted);

        if (!isTrusted) {
            document.getElementById('invalidFeedback').style.display = 'block';
            document.getElementById('ideaLink').focus();
            return;
        } else {
            document.getElementById('invalidFeedback').style.display = 'none';
        }

        // Check if terms and conditions are accepted
        const termsAccepted = document.getElementById('terms').checked;
        console.log("Terms accepted:", termsAccepted);

        if (!termsAccepted) {
            alert('Please accept the Terms and Conditions before submitting.');
            return;
        }

        // Simulate successful form submission
        console.log("Form submission successful!");
        alert('Form submitted successfully! (Simulation)');
        ideaForm.reset();
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
});
