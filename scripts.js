document.addEventListener('DOMContentLoaded', function() {
    const infoIcon = document.getElementById('infoIcon');

    infoIcon.addEventListener('mouseenter', function(event) {
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

    infoIcon.addEventListener('mouseleave', function() {
        const tooltip = document.getElementById('tooltip');
        if (tooltip) {
            tooltip.style.visibility = 'hidden';
            tooltip.style.opacity = '0';
        }
    });

    // Ensure tooltip stays fixed on desktop and appears only when clicked on mobile
    infoIcon.addEventListener('click', function(event) {
        const tooltip = document.getElementById('tooltip');
        if (window.innerWidth <= 768) { // Mobile behavior
            if (tooltip.style.visibility === 'visible') {
                tooltip.style.visibility = 'hidden';
                tooltip.style.opacity = '0';
            } else {
                tooltip.style.left = `${event.pageX + 10}px`;
                tooltip.style.top = `${event.pageY + 10}px`;
                tooltip.style.visibility = 'visible';
                tooltip.style.opacity = '1';
            }
        }
    });
});
