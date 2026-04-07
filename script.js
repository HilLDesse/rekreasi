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

// 1. GENERATE BACKGROUND: BINTANG KOSMIK
const nightSky = document.getElementById('night-sky');
for (let i = 0; i < 150; i++) {
    let star = document.createElement('div');
    star.className = 'star';
    star.style.width = Math.random() * 3 + 'px';
    star.style.height = star.style.width;
    star.style.left = Math.random() * 100 + 'vw';
    star.style.top = Math.random() * 100 + 'vh';
    star.style.animationDuration = Math.random() * 3 + 1 + 's';
    star.style.animationDelay = Math.random() * 3 + 's';
    nightSky.appendChild(star);
}

// 2. GENERATE BACKGROUND: KUNANG-KUNANG / API AJAIB
const firefliesContainer = document.getElementById('fireflies-container');
for (let i = 0; i < 25; i++) {
    let firefly = document.createElement('div');
    firefly.className = 'firefly';
    firefly.style.left = Math.random() * 100 + 'vw';
    firefly.style.top = Math.random() * 100 + 'vh';
    firefly.style.animationDuration = Math.random() * 10 + 5 + 's';
    firefly.style.animationDelay = Math.random() * 5 + 's';
    firefliesContainer.appendChild(firefly);
}

// 3. EFEK MENGETIK OTOMATIS (Scene 1)
const textToType = '"With this message, I hope you can forgive me, My Darling."';
const typingElement = document.getElementById('typing-text');
const actionArea = document.getElementById('action-area-1');
let charIndex = 0;

function typeText() {
    if (charIndex < textToType.length) {
        typingElement.innerHTML += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 60); // Kecepatan ngetik
    } else {
        // Tampilkan tombol setelah selesai ngetik
        setTimeout(() => {
            actionArea.classList.remove('hidden-fade');
            actionArea.classList.add('show-fade');
        }, 500);
    }
}
// Mulai ngetik setelah web loading 1 detik
setTimeout(typeText, 1000);

// 4. FUNGSI GANTI HALAMAN (Transisi 3D Halus)
function changeScene(currentIndex, nextIndex) {
    scenes[currentIndex].classList.remove('visible');
    scenes[currentIndex].classList.add('hidden');
    
    setTimeout(() => {
        scenes[currentIndex].style.display = 'none';
        scenes[nextIndex].style.display = 'block';
        void scenes[nextIndex].offsetWidth; 
        scenes[nextIndex].classList.remove('hidden');
        scenes[nextIndex].classList.add('visible');
    }, 800); // Waktu transisi dibuat lebih lama agar dramatis
}

// Inisialisasi tampilan
scenes.forEach((scene, index) => { if(index !== 0) scene.style.display = 'none'; });

// Event Listener Tombol Lanjut
document.getElementById('btn-next-1').addEventListener('click', () => changeScene(0, 1));
document.getElementById('btn-next-2').addEventListener('click', () => changeScene(1, 2));
document.getElementById('btn-next-3').addEventListener('click', () => {
    keluhKesahText = inputCurhatan.value;
    if (keluhKesahText.trim() === "") keluhKesahText = "(Kosong, dia tidak menulis curhatan)";
    changeScene(2, 3);
});

// 5. LOGIKA TOMBOL "GAK" (Bergerak Menjauh & Memohon)
const btnNo = document.getElementById('btn-no');
const teksMohon = ["Pliss dimaafin 🥺", "Serius gak mau? 😭", "Ayolah sayangku 🥹", "Jangan hukum aku 💔", "Aku mohon banget ✨"];
let noClickCount = 0;

btnNo.addEventListener('click', () => {
    historyTombol.push("Klik Gak");
    btnNo.innerText = teksMohon[noClickCount % teksMohon.length];
    noClickCount++;
    
    // Efek getar dramatis
    btnNo.style.transform = "translateX(15px) scale(0.9)";
    setTimeout(() => btnNo.style.transform = "translateX(-15px) scale(0.9)", 50);
    setTimeout(() => btnNo.style.transform = "translateX(10px) scale(0.95)", 100);
    setTimeout(() => btnNo.style.transform = "translateX(0) scale(1)", 150);
});

// 6. LOGIKA TOMBOL "IYA" & KIRIM EMAIL
const btnYes = document.getElementById('btn-yes');
btnYes.addEventListener('click', () => {
    historyTombol.push("Akhirnya Klik Iya ❤️");
    btnYes.innerHTML = "<span>Memproses Cinta... ✨</span>";
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

// 7. EFEK FISIKA PARTIKEL SAAT DISENTUH (MAGIC BURST)
const particleContainer = document.getElementById('interactive-particles');

function createMagicBurst(x, y) {
    const emojis = ['✨', '💖', '💫', '🌸', '✨'];
    const burstCount = 10; // Jumlah partikel sekali sentuh

    for (let i = 0; i < burstCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('magic-particle');
        particle.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';

        // Lemparan fisika acak (kiri/kanan/atas) sebelum akhirnya jatuh ke bawah
        const tx = (Math.random() - 0.5) * 200 + 'px'; 
        const ty = (Math.random() - 1) * 150 + 'px'; // Terlempar ke atas dulu
        particle.style.setProperty('--tx', tx);
        particle.style.setProperty('--ty', ty);
        particle.style.setProperty('--rot', Math.random() * 720 + 'deg');

        particleContainer.appendChild(particle);
        setTimeout(() => particle.remove(), 1500); // Hapus setelah animasi selesai
    }
}

// Trigger ledakan saat layar disentuh (Mobile) atau diklik (PC)
document.addEventListener('touchstart', (e) => {
    if(e.target.tagName.toLowerCase() !== 'textarea' && e.target.tagName.toLowerCase() !== 'button') {
        createMagicBurst(e.touches[0].clientX, e.touches[0].clientY);
    }
});
document.addEventListener('mousedown', (e) => {
    if(e.target.tagName.toLowerCase() !== 'textarea' && e.target.tagName.toLowerCase() !== 'button') {
        createMagicBurst(e.clientX, e.clientY);
    }
});