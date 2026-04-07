// --- KONFIGURASI EMAIL FORM SUBMIT ---
const emailPenerima = "hilmikaut@gmail.com"; 

const scenes = [
    document.getElementById('scene-1'),
    document.getElementById('scene-2'),
    document.getElementById('scene-3'),
    document.getElementById('scene-4'),
    document.getElementById('scene-5')
];

const inputCurhatan = document.getElementById('curhatan');
let keluhKesahText = "";
let historyTombol = []; 

// 1. GENERATE BACKGROUND: BOKEH PINK
const bokehContainer = document.getElementById('bokeh-container');
for (let i = 0; i < 20; i++) {
    let orb = document.createElement('div');
    orb.className = 'bokeh-orb';
    let size = Math.random() * 150 + 50; // Ukuran 50px - 200px
    orb.style.width = size + 'px';
    orb.style.height = size + 'px';
    orb.style.left = Math.random() * 100 + 'vw';
    orb.style.top = Math.random() * 100 + 'vh';
    orb.style.animationDuration = Math.random() * 8 + 6 + 's';
    orb.style.animationDelay = Math.random() * 5 + 's';
    bokehContainer.appendChild(orb);
}

// 2. EFEK MENGETIK OTOMATIS (Scene 1)
const textToType = '"With this message, I hope you can forgive me, Darling."';
const typingElement = document.getElementById('typing-text');
const actionArea = document.getElementById('action-area-1');
let charIndex = 0;

function typeText() {
    if (charIndex < textToType.length) {
        typingElement.innerHTML += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 60); 
    } else {
        setTimeout(() => {
            actionArea.classList.remove('hidden-fade');
            actionArea.classList.add('show-fade');
        }, 500);
    }
}
setTimeout(typeText, 800);

// 3. FUNGSI GANTI HALAMAN (Bouncy Halus)
function changeScene(currentIndex, nextIndex) {
    scenes[currentIndex].classList.remove('visible');
    scenes[currentIndex].classList.add('hidden');
    
    setTimeout(() => {
        scenes[currentIndex].style.display = 'none';
        scenes[nextIndex].style.display = 'block';
        void scenes[nextIndex].offsetWidth; 
        scenes[nextIndex].classList.remove('hidden');
        scenes[nextIndex].classList.add('visible');
    }, 500); 
}

scenes.forEach((scene, index) => { if(index !== 0) scene.style.display = 'none'; });

// 4. EVENT LISTENER TOMBOL LANJUT
document.getElementById('btn-next-1').addEventListener('click', () => changeScene(0, 1));
document.getElementById('btn-next-2').addEventListener('click', () => changeScene(1, 2));
document.getElementById('btn-next-3').addEventListener('click', () => {
    keluhKesahText = inputCurhatan.value;
    if (keluhKesahText.trim() === "") keluhKesahText = "(Kosong, dia tidak menulis curhatan)";
    changeScene(2, 3);
});

// 5. LOGIKA TOMBOL "GAK" (Menghindar Manis)
const btnNo = document.getElementById('btn-no');
const teksMohon = ["Pliss dimaafin 🥺", "Beneran gak mau? 😭", "Ayolah sayangku 🎀", "Jangan ngambek 🩷", "Aku mohon banget ✨"];
let noClickCount = 0;

btnNo.addEventListener('click', () => {
    historyTombol.push("Klik Gak");
    btnNo.innerText = teksMohon[noClickCount % teksMohon.length];
    noClickCount++;
    
    btnNo.style.transform = "translateX(15px)";
    setTimeout(() => btnNo.style.transform = "translateX(-15px)", 60);
    setTimeout(() => btnNo.style.transform = "translateX(8px)", 120);
    setTimeout(() => btnNo.style.transform = "translateX(0)", 180);
});

// 6. LOGIKA TOMBOL "IYA" & KIRIM EMAIL
const btnYes = document.getElementById('btn-yes');
btnYes.addEventListener('click', () => {
    historyTombol.push("Akhirnya Klik Iya ❤️");
    btnYes.innerText = "Tunggu ya sayang... ⏳";
    btnYes.disabled = true;
    btnNo.style.display = 'none'; 
    
    let dataKirim = {
        Pesan_Curhatan: keluhKesahText,
        Riwayat_Tombol_Ditekan: historyTombol.join(" -> ")
    };

    fetch(`https://formsubmit.co/ajax/${emailPenerima}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(dataKirim)
    })
    .then(response => response.json())
    .then(data => changeScene(3, 4))
    .catch(error => changeScene(3, 4)); 
});

// 7. EFEK PARTIKEL CINTA SAAT DISENTUH
const particleContainer = document.getElementById('interactive-particles');

function createLoveBurst(x, y) {
    const emojis = ['🩷', '🌸', '✨', '🤍', '🎀'];
    for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.classList.add('magic-particle');
        particle.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';

        const tx = (Math.random() - 0.5) * 120 + 'px'; 
        const ty = (Math.random() - 0.8) * 120 + 'px'; 
        particle.style.setProperty('--tx', tx);
        particle.style.setProperty('--ty', ty);
        particle.style.setProperty('--rot', Math.random() * 360 + 'deg');

        particleContainer.appendChild(particle);
        setTimeout(() => particle.remove(), 1000); 
    }
}

document.addEventListener('touchstart', (e) => {
    if(e.target.tagName.toLowerCase() !== 'textarea' && e.target.tagName.toLowerCase() !== 'button') {
        createLoveBurst(e.touches[0].clientX, e.touches[0].clientY);
    }
});
document.addEventListener('mousedown', (e) => {
    if(e.target.tagName.toLowerCase() !== 'textarea' && e.target.tagName.toLowerCase() !== 'button') {
        createLoveBurst(e.clientX, e.clientY);
    }
});