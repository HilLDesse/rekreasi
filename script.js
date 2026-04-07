// --- KONFIGURASI EMAIL FORM SUBMIT ---
// ⚠️ GANTI EMAIL DI BAWAH INI DENGAN EMAIL KAMU! ⚠️
const emailPenerima = "EMAIL_KAMU_DISINI@gmail.com"; 

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

// Fungsi Pindah Halaman dengan transisi ultra-smooth
function changeScene(currentIndex, nextIndex) {
    scenes[currentIndex].classList.remove('visible');
    scenes[currentIndex].classList.add('hidden');
    
    setTimeout(() => {
        scenes[currentIndex].style.display = 'none';
        scenes[nextIndex].style.display = 'block';
        
        // Memaksa browser render ulang sebelum animasi masuk
        void scenes[nextIndex].offsetWidth; 
        
        scenes[nextIndex].classList.remove('hidden');
        scenes[nextIndex].classList.add('visible');
    }, 500); 
}

// Inisialisasi tampilan awal
scenes.forEach((scene, index) => {
    if(index !== 0) scene.style.display = 'none';
});

// Tombol Lanjut
document.getElementById('btn-next-1').addEventListener('click', () => changeScene(0, 1));
document.getElementById('btn-next-2').addEventListener('click', () => changeScene(1, 2));

document.getElementById('btn-next-3').addEventListener('click', () => {
    keluhKesahText = inputCurhatan.value;
    if (keluhKesahText.trim() === "") keluhKesahText = "(Kosong, dia tidak menulis curhatan)";
    changeScene(2, 3);
});

// Logika Tombol "Gak"
const btnNo = document.getElementById('btn-no');
const teksMohon = ["Pliss maafin 🥺", "Gak mau beneran? 😭", "Ayolah sayang 🥹", "Jangan ngambek 🎀", "Mohon banget 🤍"];
let noClickCount = 0;

btnNo.addEventListener('click', () => {
    historyTombol.push("Klik Gak");
    btnNo.innerText = teksMohon[noClickCount % teksMohon.length];
    noClickCount++;
    
    // Animasi goyang estetik
    btnNo.style.transform = "translateX(12px)";
    setTimeout(() => btnNo.style.transform = "translateX(-12px)", 60);
    setTimeout(() => btnNo.style.transform = "translateX(8px)", 120);
    setTimeout(() => btnNo.style.transform = "translateX(0)", 180);
});

// Logika Tombol "Iya" & Kirim FormSubmit
const btnYes = document.getElementById('btn-yes');
btnYes.addEventListener('click', () => {
    historyTombol.push("Akhirnya Klik Iya ❤️");
    btnYes.innerHTML = "<span>Tunggu sebentar... ⏳</span>";
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
    .catch(error => changeScene(3, 4)); // Tetap lanjut ke halaman terakhir meski error
});

// ==========================================
// EFEK LEDAKAN PARTIKEL (Micro-Interactions)
// ==========================================
function createParticles(x, y) {
    const emojis = ['✨', '💖', '🫧', '🩷'];
    for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';

        // Arah ledakan acak
        const tx = (Math.random() - 0.5) * 160 + 'px'; 
        const ty = (Math.random() - 0.5) * 160 - 40 + 'px'; 
        particle.style.setProperty('--tx', tx);
        particle.style.setProperty('--ty', ty);
        particle.style.setProperty('--rot', Math.random() * 360 + 'deg');

        document.getElementById('decorations').appendChild(particle);
        setTimeout(() => particle.remove(), 800);
    }
}

// Memicu ledakan saat layar disentuh atau diklik
document.addEventListener('touchstart', (e) => {
    if(e.target.tagName.toLowerCase() !== 'textarea') {
        createParticles(e.touches[0].clientX, e.touches[0].clientY);
    }
});

document.addEventListener('mousedown', (e) => {
    if(e.target.tagName.toLowerCase() !== 'textarea') {
        createParticles(e.clientX, e.clientY);
    }
});