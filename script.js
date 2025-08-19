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

// --- Event Countdown Timer ---
const countdownElement = document.getElementById('countdown');

if (countdownElement) {
    // SET YOUR NEXT EVENT DATE HERE: format is 'YYYY-MM-DDTHH:MM:SS'
    const eventDate = new Date('2025-09-15T09:00:00').getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance < 0) {
            countdownElement.innerHTML = '<div class="text-2xl">The event has started!</div>';
            clearInterval(countdownInterval);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `
            <div>${days}<span class="block text-sm font-normal text-gray-500">Days</span></div>
            <div>:</div>
            <div>${hours}<span class="block text-sm font-normal text-gray-500">Hours</span></div>
            <div>:</div>
            <div>${minutes}<span class="block text-sm font-normal text-gray-500">Minutes</span></div>
            <div>:</div>
            <div>${seconds}<span class="block text-sm font-normal text-gray-500">Seconds</span></div>
        `;
    };
    
    const countdownInterval = setInterval(updateCountdown, 1000);
}


// --- Animated Stats on Scroll ---
const statsSection = document.getElementById('stats-section');

if (statsSection) {
    const statNumbers = statsSection.querySelectorAll('.stat-number');
    const animationDuration = 2000; // 2 seconds

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach(num => {
                    const goal = +num.getAttribute('data-goal');
                    const start = +num.innerText;
                    if (start === goal) return; // Don't re-animate

                    let startTime = null;
                    const step = (timestamp) => {
                        if (!startTime) startTime = timestamp;
                        const progress = Math.min((timestamp - startTime) / animationDuration, 1);
                        num.innerText = Math.floor(progress * (goal - start) + start);
                        if (progress < 1) {
                            window.requestAnimationFrame(step);
                        }
                    };
                    window.requestAnimationFrame(step);
                });
                observer.unobserve(statsSection); // Animate only once
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the section is visible

    observer.observe(statsSection);
}


// --- Glowing Card Mouse Follow ---
const glowingCards = document.querySelectorAll('.glowing-card');

glowingCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// --- Team Member Modal Logic ---
const modal = document.getElementById('member-modal');
const modalContent = document.getElementById('modal-content');
const closeModalBtn = document.getElementById('modal-close-btn');
const openModalBtns = document.querySelectorAll('.open-modal-btn');

if (modal) {
    openModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Get data from the clicked card
            const name = btn.dataset.name;
            const role = btn.dataset.role;
            const img = btn.dataset.img;
            const desc = btn.dataset.desc;
            const linkedin = btn.dataset.linkedin;
            const twitter = btn.dataset.twitter;

            // Populate the modal with the data
            modal.querySelector('#modal-name').textContent = name;
            modal.querySelector('#modal-role').textContent = role;
            modal.querySelector('#modal-img').src = img;
            modal.querySelector('#modal-description').textContent = desc;

            const socialsContainer = modal.querySelector('#modal-socials');
            socialsContainer.innerHTML = ''; // Clear previous links

            if (linkedin) {
                socialsContainer.innerHTML += `
                    <a href="${linkedin}" target="_blank" class="text-gray-500 hover:text-blue-600">
                        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>`;
            }
            if (twitter) {
                socialsContainer.innerHTML += `
                    <a href="${twitter}" target="_blank" class="text-gray-500 hover:text-black">
                        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </a>`;
            }

            modal.classList.remove('hidden');
            modal.classList.add('flex');
        });
    });

    // Function to close the modal
    const closeModal = () => {
        modalContent.classList.remove('animate-fade-in-up');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    };

    closeModalBtn.addEventListener('click', closeModal);

    // Close modal if clicking outside the content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}


// --- Problem of the Week Hint Button ---
const hintBtn = document.getElementById('hint-btn');
const hintText = document.getElementById('hint-text');

if (hintBtn && hintText) {
    hintBtn.addEventListener('click', () => {
        hintText.classList.toggle('hidden');
        if (!hintText.classList.contains('hidden')) {
            hintBtn.textContent = 'Hide Hint';
        } else {
            hintBtn.textContent = 'Show Hint';
        }
    });
}

// --- Event Registration Modal Logic ---
const eventModal = document.getElementById('event-modal');
const eventModalCloseBtn = document.getElementById('event-modal-close-btn');
const openEventModalBtns = document.querySelectorAll('.open-event-modal-btn');

if (eventModal) {
    openEventModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const eventTitle = btn.dataset.eventTitle;
            
            // Set the modal title and the hidden input value
            eventModal.querySelector('#event-modal-title').textContent = `Register for ${eventTitle}`;
            eventModal.querySelector('#hidden-event-name').value = eventTitle;

            eventModal.classList.remove('hidden');
            eventModal.classList.add('flex');
        });
    });

    // Function to close the modal
    const closeEventModal = () => {
        eventModal.classList.add('hidden');
        eventModal.classList.remove('flex');
    };

    eventModalCloseBtn.addEventListener('click', closeEventModal);

    // Close modal if clicking outside the content
    eventModal.addEventListener('click', (e) => {
        if (e.target === eventModal) {
            closeEventModal();
        }
    });
}