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
