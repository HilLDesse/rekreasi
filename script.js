// ==============================
// KONFIGURASI
// ==============================
const emailPenerima = "hilmikaut@gmail.com"; // ganti dengan email kamu
const textToType = "Aku bikin pesan ini khusus buat kamu. Semoga setelah baca semuanya, hati kamu bisa sedikit lebih lembut buat aku. 💗";

const scenes = [
    document.getElementById("scene-1"),
    document.getElementById("scene-2"),
    document.getElementById("scene-3"),
    document.getElementById("scene-4"),
    document.getElementById("scene-5")
];

const progressFill = document.getElementById("progress-fill");
const progressDots = document.querySelectorAll(".progress-dot");
const actionArea = document.getElementById("action-area-1");
const typingText = document.getElementById("typing-text");
const complimentText = document.getElementById("rotating-compliment");
const textarea = document.getElementById("curhatan");
const charCount = document.getElementById("char-count");
const typingStatus = document.getElementById("typing-status");
const previewCurhat = document.getElementById("preview-curhat");
const btnNo = document.getElementById("btn-no");
const btnYes = document.getElementById("btn-yes");
const pleadingText = document.getElementById("pleading-text");
const buttonGroup = document.getElementById("button-group");

const starsLayer = document.getElementById("stars-layer");
const floatingHeartsLayer = document.getElementById("floating-hearts-layer");
const petalsLayer = document.getElementById("petals-layer");
const burstLayer = document.getElementById("burst-layer");

let currentScene = 0;
let charIndex = 0;
let noClickCount = 0;
let historyTombol = [];
let keluhKesahText = "";

const compliments = [
    "senyummu bikin hati aku tenang.",
    "cara kamu peduli itu selalu bikin aku merasa beruntung.",
    "kamu punya hati yang hangat dan itu berharga banget.",
    "kehadiran kamu selalu bikin hari aku lebih baik.",
    "kamu itu rumah yang paling nyaman buat hati aku."
];

const noTexts = [
    "Yakin nih? 🥺",
    "Jangan gitu dong 😭",
    "Kasih aku kesempatan yaa 💗",
    "Aku bakal lebih baik ✨",
    "Pliss maafin aku 💞"
];

const pleadings = [
    "Aku bakal berusaha lebih baik, janji.",
    "Aku serius mau memperbaiki semuanya.",
    "Kasih aku satu kesempatan lagi ya sayang.",
    "Aku tidak mau bikin kamu kecewa lagi.",
    "Aku benar-benar sayang sama kamu."
];

// ==============================
// BACKGROUND DECORATIONS
// ==============================
function createStars() {
    for (let i = 0; i < 70; i++) {
        const star = document.createElement("div");
        star.className = "star";
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDuration = `${1.8 + Math.random() * 2.2}s`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        starsLayer.appendChild(star);
    }
}

function createFloatingHearts() {
    const hearts = ["💗", "🤍", "💖", "💕"];
    for (let i = 0; i < 16; i++) {
        const el = document.createElement("div");
        el.className = "float-heart";
        el.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        el.style.left = `${Math.random() * 100}%`;
        el.style.animationDuration = `${10 + Math.random() * 10}s`;
        el.style.animationDelay = `${Math.random() * 8}s`;
        el.style.fontSize = `${12 + Math.random() * 14}px`;
        floatingHeartsLayer.appendChild(el);
    }
}

function createPetals() {
    const petals = ["🌸", "💮", "🌷"];
    for (let i = 0; i < 10; i++) {
        const petal = document.createElement("div");
        petal.className = "falling-petal";
        petal.textContent = petals[Math.floor(Math.random() * petals.length)];
        petal.style.left = `${Math.random() * 100}%`;
        petal.style.animationDuration = `${12 + Math.random() * 12}s`;
        petal.style.animationDelay = `${Math.random() * 8}s`;
        petal.style.fontSize = `${14 + Math.random() * 10}px`;
        petalsLayer.appendChild(petal);
    }
}

// ==============================
// TYPING EFFECT
// ==============================
function typeIntro() {
    if (charIndex < textToType.length) {
        typingText.textContent += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(typeIntro, 38);
    } else {
        setTimeout(() => {
            actionArea.classList.remove("hidden-fade");
            actionArea.classList.add("show-fade");
        }, 400);
    }
}

// ==============================
// SCENE CONTROL
// ==============================
function updateProgress(index) {
    const percent = ((index + 1) / scenes.length) * 100;
    progressFill.style.width = `${percent}%`;

    progressDots.forEach((dot, i) => {
        dot.classList.toggle("active", i <= index);
    });
}

function showScene(nextIndex) {
    scenes[currentScene].classList.remove("visible");
    scenes[currentScene].classList.add("hidden");

    setTimeout(() => {
        scenes[currentScene].style.display = "none";
        scenes[nextIndex].style.display = "block";

        requestAnimationFrame(() => {
            scenes[nextIndex].classList.remove("hidden");
            scenes[nextIndex].classList.add("visible");
            currentScene = nextIndex;
            updateProgress(currentScene);
        });
    }, 420);
}

// ==============================
// COMPLIMENT ROTATOR
// ==============================
let complimentIndex = 0;
setInterval(() => {
    if (!complimentText) return;
    complimentIndex = (complimentIndex + 1) % compliments.length;
    complimentText.style.opacity = "0";
    complimentText.style.transform = "translateY(6px)";
    setTimeout(() => {
        complimentText.textContent = compliments[complimentIndex];
        complimentText.style.opacity = "1";
        complimentText.style.transform = "translateY(0)";
    }, 180);
}, 2600);

// ==============================
// TEXTAREA HANDLER
// ==============================
function updateTextareaInfo() {
    const value = textarea.value;
    const length = value.length;
    charCount.textContent = `${length}/500`;

    if (length === 0) {
        typingStatus.textContent = "Aku siap baca semuanya 💗";
    } else if (length < 40) {
        typingStatus.textContent = "Tulis lagi, aku masih dengerin 🤍";
    } else if (length < 120) {
        typingStatus.textContent = "Makasih udah jujur sama perasaanmu 💞";
    } else {
        typingStatus.textContent = "Aku akan baca ini dengan sungguh-sungguh 💌";
    }

    if (length > 500) {
        textarea.value = value.slice(0, 500);
    }
}

textarea.addEventListener("input", updateTextareaInfo);

// ==============================
// MAGIC BURST
// ==============================
function createBurst(x, y, amount = 12) {
    const items = ["💖", "✨", "🌸", "💗", "🤍"];
    for (let i = 0; i < amount; i++) {
        const piece = document.createElement("div");
        piece.className = "burst-item";
        piece.textContent = items[Math.floor(Math.random() * items.length)];
        piece.style.left = `${x}px`;
        piece.style.top = `${y}px`;

        const dx = (Math.random() - 0.5) * 180;
        const dy = (Math.random() - 0.5) * 180 - 60;
        piece.style.setProperty("--tx", `${dx}px`);
        piece.style.setProperty("--ty", `${dy}px`);
        piece.style.setProperty("--rot", `${Math.random() * 240 - 120}deg`);

        burstLayer.appendChild(piece);
        setTimeout(() => piece.remove(), 1200);
    }
}

document.addEventListener("mousedown", (e) => {
    const tag = e.target.tagName.toLowerCase();
    if (tag !== "textarea" && tag !== "button") {
        createBurst(e.clientX, e.clientY, 8);
    }
});

document.addEventListener("touchstart", (e) => {
    const tag = e.target.tagName.toLowerCase();
    if (tag !== "textarea" && tag !== "button") {
        const touch = e.touches[0];
        createBurst(touch.clientX, touch.clientY, 8);
    }
}, { passive: true });

// ==============================
// BUTTON EVENTS
// ==============================
document.getElementById("btn-next-1").addEventListener("click", () => {
    historyTombol.push("Buka Pesan");
    showScene(1);
});

document.getElementById("btn-next-2").addEventListener("click", () => {
    historyTombol.push("Lanjut ke Curhat");
    showScene(2);
});

document.getElementById("btn-next-3").addEventListener("click", () => {
    keluhKesahText = textarea.value.trim();

    if (!keluhKesahText) {
        keluhKesahText = "Dia tidak menulis curhatan, tapi tetap lanjut membaca.";
    }

    previewCurhat.textContent = keluhKesahText;
    historyTombol.push("Kirim Curhat");
    showScene(3);
});

btnNo.addEventListener("click", () => {
    noClickCount++;
    historyTombol.push(`Klik Gak ${noClickCount}x`);

    btnNo.textContent = noTexts[(noClickCount - 1) % noTexts.length];
    pleadingText.textContent = pleadings[(noClickCount - 1) % pleadings.length];

    btnNo.classList.remove("shake");
    void btnNo.offsetWidth;
    btnNo.classList.add("shake");

    const moveX = Math.floor(Math.random() * 70) - 35;
    const moveY = Math.floor(Math.random() * 24) - 12;
    btnNo.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${Math.floor(Math.random() * 10) - 5}deg)`;

    btnYes.classList.add("glow-yes");
    setTimeout(() => btnYes.classList.remove("glow-yes"), 700);

    const rect = btnNo.getBoundingClientRect();
    createBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 10);

    if (noClickCount >= 5) {
        btnNo.textContent = "Yaudah deh, pikirin lagi 🥹";
    }
});

btnYes.addEventListener("click", async () => {
    historyTombol.push("Akhirnya Klik Iya ❤️");

    btnYes.disabled = true;
    btnNo.disabled = true;
    btnYes.innerHTML = `<span>Memproses cinta... 💗</span><div class="btn-shine"></div>`;
    pleadingText.textContent = "Makasih udah kasih aku kesempatan.";

    const rect = btnYes.getBoundingClientRect();
    createBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 22);

    const dataKirim = {
        Pesan_Curhatan: keluhKesahText,
        Riwayat_Tombol_Ditekan: historyTombol.join(" -> "),
        Waktu: new Date().toLocaleString("id-ID")
    };

    try {
        await fetch(`https://formsubmit.co/ajax/${emailPenerima}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(dataKirim)
        });
    } catch (error) {
        console.log("Submit gagal, tapi scene tetap lanjut.", error);
    }

    setTimeout(() => {
        showScene(4);
        launchFinalCelebration();
    }, 750);
});

document.getElementById("btn-replay").addEventListener("click", () => {
    window.location.reload();
});

// ==============================
// FINAL CELEBRATION
// ==============================
function launchFinalCelebration() {
    let count = 0;
    const interval = setInterval(() => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * (window.innerHeight * 0.6);
        createBurst(x, y, 12);
        count++;

        if (count >= 10) {
            clearInterval(interval);
        }
    }, 220);
}

// ==============================
// INIT
// ==============================
function init() {
    scenes.forEach((scene, index) => {
        if (index !== 0) {
            scene.style.display = "none";
        }
    });

    createStars();
    createFloatingHearts();
    createPetals();
    updateProgress(0);
    updateTextareaInfo();

    setTimeout(typeIntro, 600);
}

init();