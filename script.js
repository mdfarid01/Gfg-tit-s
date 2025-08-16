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



// Konami Code Easter Egg Logic
const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a'
];
let keySequence = [];
const secretAction = () => {
    document.body.classList.toggle('matrix-theme');
};
window.addEventListener('keydown', (e) => {
    keySequence.push(e.key);
    // Keep the array at the same length as the konami code
    keySequence.splice(-konamiCode.length - 1, keySequence.length - konamiCode.length);
    if (keySequence.join('') === konamiCode.join('')) {
        secretAction();
    }
});