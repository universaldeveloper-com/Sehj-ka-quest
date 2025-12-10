// ==========================================
// ⚡️ CONFIGURATION: EDIT THIS SECTION ⚡️
// ==========================================

const cardsData = [
    {
        id: 1,
        chapterName: "CHAPTER 1",
        image: "pic1.jpg", 
        secretMessage: "hmm tho chaoter 1 complete krdiya huh thik he achi ladki he th par bauni he acha tho me ye bolne wala hu ki u look gorgeous in thst green dress boyfriend tho he nai kehne keliye tho yaha bol rahahu i mean im now half blood prince par fir bhi tu bhuudi he 😏 acha chal chal kabi nai kiya hu par ab kar rahahu aur nai karynga agar mere vaja se kabi uncomfortable, awkward, strange , irritating, eww type feel hua tho  maf kardo 🙏🏻 aur boldena kabi nai karunga vo kya hena ki muje thoda attachment issues he koi care karta he tho unko aur bhi arene lagta hu chal chal bhuddi ab zyada mat soch tereko kuch aur kehna he tho mene soch liya ki tuje disney land le chalu kabhi ab zyada mat soch lechelunga mat ro pur tu manna padega ki tu bhuddi aur ganji he 😏 tab hi future ka ticket confirm hoga  aree bhul hi gaya  most imp thing is  ", 
        password: "sehjisqueen", 
        locked: true,
        // NEW SETTINGS FOR THE PRANK
        requiresAgreement: true,
        agreementText: "I agree sam is always best",
        agreed: false // Don't change this
    },
    {
        id: 2,
        chapterName: "GOLDEN BROWNS",
        image: "", 
        secretMessage: "CONGRATULATIONS tune chapter 2 bhi complete kiya he hmm bahut kuch batana he bahut kuch khul ke batana he par kuch bate keh nai sakta shej,hum pata nai kis reason ki waja se mile he par u r the lucky charam and good happened this year ngl bauni he par badi achi he yar ek bat batau muje pata nai ye friendship kab tak rahega par jab tak hoga tab tak i care about u, i adore you, i help you, i motivate you . kabhi socha nai ki ek 5 feet ki kubsurat bauni se itna jaldi attach hojaunga. bus kehta nai hu par i miss you a lot  ahmmm ahmmm kuch emotional hgya hu chal chal bandr kahiki sigma se soft bana rahihe . kabhi zindagi me muskil aya aur tuje help chahiye tho muje yad rakna socha ta ki breakup ke bad koi aur ldki se bat tak nsi karunga par kher kon bola tu ladki he . tu health ka dyan rako aur tention mat kr carrier ka kuch ameer ladko se shadi krlo aur paise dedo muje chill krunga mst hahaha. tq 4 everything seno. even tho we know each other less than 3 months but feel like i know u from 3 years. abe sun alooo khayega? hehe. i wish i know u before this is not just a sentence. ab jobi ho tera problems is mera problems so phadle chudail tu sachi me chapters complete kr rahihona 🤨 bhut barunga nai nai marsakta par bech dunga . sehj , i really respect you ( tatti ka respect). i dont make promises because ik i break them but i promise you one day we will explore this world . are kich kehna he bul gaya han asli chez tho bolna hi bhul gaya this one may stunn u nd u may have many questions u even cry so i ",
        password: "samisbatman", 
        locked: true,
        requiresAgreement: false, // No prank for this one
        agreed: true
    },
    {
        id: 3,
        chapterName: "CHAPTER 3",
        image: "",
        secretMessage: "amazing wearing it...",
        password: "chemistry", 
        locked: true,
        requiresAgreement: false,
        agreed: true
    },
    {
        id: 4,
        chapterName: "CHAPTER 4",
        image: "",
        secretMessage: "for our dinner tonight! ❤️",
        password: "done", 
        locked: true,
        requiresAgreement: false,
        agreed: true
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

// Load state from local storage
let savedState = JSON.parse(localStorage.getItem('studyQuestState'));

if (savedState) {
    cardsData.forEach((card, index) => {
        if(savedState[index]) {
            card.locked = savedState[index].locked;
            // Restore agreement status if it exists
            if (savedState[index].agreed !== undefined) {
                card.agreed = savedState[index].agreed;
            }
        }
    });
}

function renderCards() {
    wrapper.innerHTML = '';
    let allUnlocked = true;

    cardsData.forEach(card => {
        const cardEl = document.createElement('div');
        cardEl.className = `card ${card.locked ? '' : 'unlocked'}`;
        
        // Only allow clicking to unlock if it is currently locked
        if (card.locked) {
            cardEl.onclick = () => handleCardClick(card.id);
        }

        const icon = card.locked ? '🔒' : '🔓';
        const blurClass = card.locked ? 'locked-blur' : '';
        const textDisplay = card.locked ? 'This message is locked.' : card.secretMessage;

        // LOGIC: If unlocked BUT agreement not met yet, show the button
        let contentHTML = '';

        if (!card.locked && card.requiresAgreement && !card.agreed) {
            // SHOW THE TRICK BUTTON
            contentHTML = `
                <div class="agreement-wrapper">
                    <p class="agreement-label">Unlock content:</p>
                    <button class="ios-btn" onclick="triggerAgreement(${card.id})">
                        ${card.agreementText}
                    </button>
                </div>
            `;
        } else {
            // NORMAL CONTENT (Image + Text)
            // If locked, image is blurred. If unlocked, image is clear.
            const imageHTML = card.image ? `<img src="${card.image}" class="card-image ${blurClass}">` : '';
            
            contentHTML = `
                ${imageHTML}
                <div class="card-content ${blurClass}">
                    ${textDisplay}
                </div>
            `;
        }

        cardEl.innerHTML = `
            <div class="card-header">
                <span class="chapter-tag">${card.chapterName}</span>
                <span class="status-icon">${icon}</span>
            </div>
            ${contentHTML}
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
    if (!card.locked) return; 

    currentCardId = id;
    passwordInput.value = '';
    modalOverlay.classList.add('active');
    passwordInput.focus();
}

function triggerAgreement(id) {
    const card = cardsData.find(c => c.id === id);
    card.agreed = true;
    saveState();
    renderCards();
}

function closeModal() {
    modalOverlay.classList.remove('active');
    currentCardId = null;
}

function checkPassword() {
    const card = cardsData.find(c => c.id === currentCardId);
    const input = passwordInput.value;

    if (input.toLowerCase().trim() === card.password.toLowerCase().trim()) {
        card.locked = false;
        saveState();
        renderCards();
        closeModal();
    } else {
        const modalBox = document.getElementById('modal-box');
        modalBox.classList.add('shake');
        passwordInput.style.borderColor = '#FF3B30';
        setTimeout(() => {
            modalBox.classList.remove('shake');
            passwordInput.style.borderColor = '#ccc';
        }, 500);
    }
}

function saveState() {
    localStorage.setItem('studyQuestState', JSON.stringify(cardsData));
}

passwordInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') checkPassword();
});

renderCards();
