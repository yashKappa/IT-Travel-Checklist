// Function to save checklist data to local storage
function saveChecklist() {
    const form = document.getElementById('checklistForm');
    const formData = new FormData(form);
    const checklistData = {};
    for (const [name, value] of formData) {
        checklistData[name] = value;
    }
    localStorage.setItem('travelChecklist', JSON.stringify(checklistData));
}

// Function to load checklist data from local storage
function loadChecklist() {
    const savedData = localStorage.getItem('travelChecklist');
    if (savedData) {
        const checklistData = JSON.parse(savedData);
        for (const key in checklistData) {
            const checkbox = document.querySelector(`[name="${key}"]`);
            if (checkbox) {
                checkbox.checked = checklistData[key];
            }
        }
    }
}

// Load checklist data when the page loads
window.onload = loadChecklist;



// Function to send notifications until all checkboxes are checked
function sendNotifications() {
    const form = document.getElementById('checklistForm');
    const checkboxes = form.querySelectorAll('input[type="checkbox"]');
    let uncheckedCount = 0;

    checkboxes.forEach(checkbox => {
        if (!checkbox.checked) {
            uncheckedCount++;
        }
    });

    if (uncheckedCount > 0) {
        const notification = new Notification('Travel Checklist Reminder', {
            body: `You still have ${uncheckedCount} item(s) unchecked on your travel checklist. Don't forget to pack them!`
        });

        notification.onclick = function () {
            window.focus();
        };

        setTimeout(sendNotifications, 60000); // Send notification every minute
    } else {
        const notification = new Notification('Travel Checklist Complete', {
            body: 'Congratulations! You have checked all items on your travel checklist. You are ready to go!'
        });

        notification.onclick = function () {
            window.focus();
        };
    }
}

// Request permission for notifications
function requestNotificationPermission() {
    if (Notification.permission !== 'granted') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                sendNotifications();
            }
        });
    } else {
        sendNotifications();
    }
}

// Start sending notifications when the page loads
window.onload = requestNotificationPermission;
