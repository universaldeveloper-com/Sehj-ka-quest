// ==========================================
// ⚡️ CONFIGURATION: EDIT THIS SECTION ⚡️
// ==========================================

const cardsData = [
    {
        id: 1,
        chapterName: "CHAPTER 1",
        // The message she sees AFTER unlocking
        secretMessage: "I saw this dress", 
        // The password you give her
        password: "maths", 
        locked: true
    },
    {
        id: 2,
        chapterName: "CHAPTER 2",
        secretMessage: "and thought you",
        password: "physics", 
        locked: true
    },
    {
        id: 3,
        chapterName: "CHAPTER 3",
        secretMessage: "would look amazing",
        password: "chemistry", 
        locked: true
    },
    {
        id: 4,
        chapterName: "CHAPTER 4",
        secretMessage: "wearing it tonight! ❤️",
        password: "done", 
        locked: true
    }
];

// ==========================================
// ⛔️ DO NOT EDIT BELOW THIS LINE ⛔️
// ==========================================

const wrapper = document.getElementById('cards-wrapper');
const modalOverlay = document.getElementById('modal-overlay');
const passwordInput = document.getElementById('password-input');
const finalReward = document.getElementById('final-reward');
let currentCardId = null;

// Load state from local storage (so it remembers if she refreshed the page)
let savedState = JSON.parse(localStorage.getItem('studyQuestState'));

if (savedState) {
    // Merge saved locked status with current text config
    cardsData.forEach((card, index) => {
        if(savedState[index]) {
            card.locked = savedState[index].locked;
        }
    });
}

function renderCards() {
    wrapper.innerHTML = '';
    let allUnlocked = true;

    cardsData.forEach(card => {
        const cardEl = document.createElement('div');
        cardEl.className = `card ${card.locked ? '' : 'unlocked'}`;
        cardEl.onclick = () => handleCardClick(card.id);

        const icon = card.locked ? '🔒' : '🔓';
        const textClass = card.locked ? 'locked-blur' : '';
        const textDisplay = card.locked ? 'This message is locked.' : card.secretMessage;

        cardEl.innerHTML = `
            <div class="card-header">
                <span class="chapter-tag">${card.chapterName}</span>
                <span class="status-icon">${icon}</span>
            </div>
            <div class="card-content ${textClass}">
                ${textDisplay}
            </div>
        `;
        wrapper.appendChild(cardEl);

        if(card.locked) allUnlocked = false;
    });

    if(allUnlocked) {
        finalReward.classList.add('visible');
    }
}

function handleCardClick(id) {
    const card = cardsData.find(c => c.id === id);
    if (!card.locked) return; // Already unlocked

    currentCardId = id;
    passwordInput.value = '';
    modalOverlay.classList.add('active');
    passwordInput.focus();
}

function closeModal() {
    modalOverlay.classList.remove('active');
    currentCardId = null;
}

function checkPassword() {
    const card = cardsData.find(c => c.id === currentCardId);
    const input = passwordInput.value;

    // Compare input with password (case insensitive)
    if (input.toLowerCase().trim() === card.password.toLowerCase().trim()) {
        // Correct Password
        card.locked = false;
        saveState();
        renderCards();
        closeModal();
    } else {
        // Wrong Password - Animation
        const modalBox = document.getElementById('modal-box');
        modalBox.classList.add('shake');
        passwordInput.style.borderColor = '#FF3B30'; // iOS Red
        
        setTimeout(() => {
            modalBox.classList.remove('shake');
            passwordInput.style.borderColor = '#ccc';
        }, 500);
    }
}

function saveState() {
    localStorage.setItem('studyQuestState', JSON.stringify(cardsData));
}

// Allow pressing Enter key in input box
passwordInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        checkPassword();
    }
});

// Initial Render
renderCards();
