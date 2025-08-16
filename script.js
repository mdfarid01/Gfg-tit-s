const peopleButton = document.getElementById('people-button');
const peopleDropdown = document.getElementById('people-dropdown');

// Toggle dropdown on button click
if (peopleButton) {
    peopleButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevents the window click event from firing immediately
        peopleDropdown.classList.toggle('hidden');
    });
}

// Close dropdown if clicked outside
window.addEventListener('click', (event) => {
    // Check if the dropdown exists and is not hidden
    if (peopleDropdown && !peopleDropdown.classList.contains('hidden') && !peopleButton.contains(event.target)) {
        peopleDropdown.classList.add('hidden');
    }
});