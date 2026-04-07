// --- KONFIGURASI EMAIL FORM SUBMIT ---
const emailPenerima = "hilmikaut@gmail.com"; 

const scene1 = document.getElementById('scene-1');
const scene2 = document.getElementById('scene-2');
const scene3 = document.getElementById('scene-3');
const scene4 = document.getElementById('scene-4');
const scene5 = document.getElementById('scene-5');

const btnNext1 = document.getElementById('btn-next-1');
const btnNext2 = document.getElementById('btn-next-2');
const btnNext3 = document.getElementById('btn-next-3');
const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');
const inputCurhatan = document.getElementById('curhatan');

let keluhKesahText = "";
let historyTombol = []; 

// Fungsi Pindah Halaman
function changeScene(currentScene, nextScene) {
    currentScene.classList.remove('visible');
    currentScene.classList.add('hidden');
    nextScene.style.display = 'block';
    
    setTimeout(() => {
        currentScene.style.display = 'none';
        setTimeout(() => {
            nextScene.classList.remove('hidden');
            nextScene.classList.add('visible');
        }, 30);
    }, 600);
}

btnNext1.addEventListener('click', () => changeScene(scene1, scene2));
btnNext2.addEventListener('click', () => changeScene(scene2, scene3));

btnNext3.addEventListener('click', () => {
    keluhKesahText = inputCurhatan.value;
    if (keluhKesahText.trim() === "") {
        keluhKesahText = "(Dia tidak menulis curhatan apapun)";
    }
    changeScene(scene3, scene4);
});

// Logika Tombol "Gak"
const teksMohon = [
    "Pliss maafin aku 🥺", 
    "Beneran gak mau? 😭", 
    "Ayolah sayang... 🥹", 
    "Jangan ngambek lagi dong 🥲",
    "Aku mohon banget... 🎀"
];
let noClickCount = 0;

btnNo.addEventListener('click', () => {
    historyTombol.push("Klik Gak");
    btnNo.innerText = teksMohon[noClickCount % teksMohon.length];
    noClickCount++;
    
    btnNo.style.transform = "translateX(10px)";
    setTimeout(() => btnNo.style.transform = "translateX(-10px)", 50);
    setTimeout(() => btnNo.style.transform = "translateX(0)", 100);
});

// Logika Tombol "Iya" & Kirim Email Rahasia
btnYes.addEventListener('click', () => {
    historyTombol.push("Akhirnya Klik Iya ❤️");
    btnYes.innerText = "Tunggu sebentar... ⏳";
    btnYes.disabled = true;
    btnNo.style.display = 'none'; 
    
    let dataKirim = {
        Pesan_Curhatan: keluhKesahText,
        Riwayat_Tombol_Ditekan: historyTombol.join(" -> ")
    };

    fetch(`https://formsubmit.co/ajax/${emailPenerima}`, {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(dataKirim)
    })
    .then(response => response.json())
    .then(data => changeScene(scene4, scene5))
    .catch(error => changeScene(scene4, scene5));
});

// ==========================================
// DEKORASI & BACKGROUND INTERAKTIF
// ==========================================
const decorationsContainer = document.getElementById('decorations');
const rootElement = document.documentElement;

// 1. Menggerakkan Gradient Background Mengikuti Kursor/Sentuhan
function updateBackgroundPosition(x, y) {
    const xPercent = (x / window.innerWidth) * 100;
    const yPercent = (y / window.innerHeight) * 100;
    rootElement.style.setProperty('--mouse-x', `${xPercent}%`);
    rootElement.style.setProperty('--mouse-y', `${yPercent}%`);
}

document.addEventListener('mousemove', (e) => {
    updateBackgroundPosition(e.clientX, e.clientY);
});

document.addEventListener('touchmove', (e) => {
    if(e.touches.length > 0) {
        updateBackgroundPosition(e.touches[0].clientX, e.touches[0].clientY);
    }
});

// 2. Membuat Gelembung & Hati Melayang (Background)
function createDecorations() {
    const emojis = ['🤍', '🌸', '🩷', '✨', '🎀', '💖'];
    const count = 25; 

    for (let i = 0; i < count; i++) {
        const decor = document.createElement('div');
        decor.classList.add('floating-item');
        decor.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        decor.style.left = Math.random() * 100 + 'vw';
        decor.style.fontSize = (Math.random() * 1.5 + 0.8) + 'rem';
        decor.style.animationDuration = (Math.random() * 6 + 8) + 's';
        decor.style.animationDelay = (Math.random() * 5) + 's';
        decor.style.setProperty('--op', Math.random() * 0.5 + 0.3); // Opacity acak
        decorationsContainer.appendChild(decor);
    }
}

// 3. Efek Ledakan Saat Di-klik/Disentuh
function createClickBurst(x, y) {
    const emojis = ['🩷', '✨', '💖'];
    for (let i = 0; i < 6; i++) {
        const heart = document.createElement('div');
        heart.classList.add('click-heart');
        heart.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';

        const tx = (Math.random() - 0.5) * 120 + 'px';
        const ty = (Math.random() - 0.5) * 120 - 50 + 'px'; 
        heart.style.setProperty('--tx', tx);
        heart.style.setProperty('--ty', ty);
        heart.style.setProperty('--rot', Math.random() * 360 + 'deg');

        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 800);
    }
}

document.addEventListener('touchstart', (e) => {
    createClickBurst(e.touches[0].clientX, e.touches[0].clientY);
});

document.addEventListener('click', (e) => {
    if(e.target.tagName.toLowerCase() !== 'textarea' && e.target.tagName.toLowerCase() !== 'button') {
        createClickBurst(e.clientX, e.clientY);
    }
});

window.onload = createDecorations;