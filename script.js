// ==========================================
// ⚡️ CONFIGURATION: EDIT THIS SECTION ⚡️
// ==========================================

const cardsData = [
    {
        id: 1,
        chapterName: "CHAPTER 1",
        // The message she sees AFTER unlocking
        secretMessage: "sehj,ik u will be eager to know what i wanted to say between congratulations on completing 1st chapter 😃 and i will say not immediately but definitely between i still kyu ye chudail kahiki mujhe hi hb banaya imean there obviously many out more handsome than me also cause i never had any girl bestie i can say that u r the only first girl-friend i have ( galat mat samajma pagal bhuddi 🧓🏻) and also u look", 
        // The password you give her
        password: "sam is best", 
        locked: true
    },
    {
        id: 2,
        chapterName: "CHAPTER 2",
        secretMessage: "beautiful in that green dress meri nazar lagjayegi thume and congratulations for completing 2nd chapter bhuddi wasnt expecting this dedication ab tho pass karva kehi rahunga aur ek bat seedha nai bol sakta awkward hoga par pata nai u feel like home nai pagalkan 😂 acha sorry such me feel like nearest dearest chudail tum pagal ho par cute ho ab mat samajna ki line mar rahahu 😑 bhudiyo 🧓🏻 ko line nai marta and i forgot to say so",
        password: "sehjkutti", 
        locked: true
    },
    {
        id: 3,
        chapterName: "CHAPTER 3",
        secretMessage: "jab tum koi tea spill karte ho tho me sojaya hu tere voice sunke hehe datna mat 😛 aur tujhe me ab se chirkut chudail bokunga samja 👺👹 aside of all these i really respect you yar akar tum abhi ke abhi bolo ki nikal jao life se nikal jaunga ye kya bakwas likrahahu me acha chod congratulations on completing 3rd chapter chidail wow so much dedication aisa hi sab chapters complete karvadunga dekhlena tu nai hoga fail bola na jab tak me hu tu nai hoga fail ab tu sachi se padna ha i care for you ya all the best and in next chapter im going to tell the secret ✨",
        password: "samisgod", 
        locked: true
    },
    {
        id: 4,
        chapterName: "CHAPTER 4",
        secretMessage: "wow finally 4th chapter huh hmmm u really that curious to know what i wanted to say i see i like this dedication tho vo bat aisa he ki vo note mene dala na vo wala scene hogaya 😬 par ek bhuddi se aur bhut kuch bolna chahta hu par rehne de for now this is good ig lets see if i say in future or not aur elon musk jo bhi banna he , fancy sports cars tho kharidna he acha sun u already got what u want now u also completed 4 chapters wow sehj now ig u will pass now but wait its isnt over there season 2 waiting 💀 ( from half blood prince )",
        password: "i love sam ", 
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
