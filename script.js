// --- People Dropdown Logic ---
const peopleButton = document.getElementById('people-button');
const peopleDropdown = document.getElementById('people-dropdown');

if (peopleButton) {
    peopleButton.addEventListener('click', (event) => {
        event.stopPropagation();
        peopleDropdown.classList.toggle('hidden');
    });
}

window.addEventListener('click', (event) => {
    if (peopleDropdown && !peopleDropdown.classList.contains('hidden') && !peopleButton.contains(event.target)) {
        peopleDropdown.classList.add('hidden');
    }
});

// --- Konami Code Easter Egg Logic ---
const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a'
];
let keySequence = [];
window.addEventListener('keydown', (e) => {
    keySequence.push(e.key);
    keySequence.splice(-konamiCode.length - 1, keySequence.length - konamiCode.length);
    if (keySequence.join('') === konamiCode.join('')) {
        document.body.classList.toggle('matrix-theme');
    }
});

// --- Live search for resources page ---
const resourceSearch = document.getElementById('resource-search');
const resourceGrid = document.getElementById('resource-grid');

if (resourceSearch && resourceGrid) {
    const resourceCards = resourceGrid.getElementsByClassName('resource-card');
    resourceSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        for (let card of resourceCards) {
            const cardText = card.innerText.toLowerCase();
            if (cardText.includes(searchTerm)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        }
    });
}

// --- Mobile Menu Toggle ---
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}