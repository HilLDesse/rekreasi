// =========================================================
// CONFIGURATION
// =========================================================
const emailPenerima = "hilmikaut@gmail.com"; 

// DOM Elements
const scenes = [
    document.getElementById('scene-1'),
    document.getElementById('scene-2'),
    document.getElementById('scene-3'),
    document.getElementById('scene-4'),
    document.getElementById('scene-5')
];

const inputCurhatan = document.getElementById('curhatan');
const progressBar = document.querySelector('.progress-bar::before') || document.querySelector('.progress-bar');
const progressDots = document.querySelectorAll('.dot');

// State
let currentScene = 0;
let keluhKesahText = "";
let historyTombol = [];

// =========================================================
// 1. BACKGROUND GENERATION - FLOATING HEARTS
// =========================================================
const floatingHeartsContainer = document.getElementById('floating-hearts-bg');
const heartEmojis = ['💕', '💗', '💖', '💝', '💓'];

function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'bg-heart';
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    heart.style.animationDuration = (Math.random() * 8 + 8) + 's';
    heart.style.animationDelay = Math.random() * 5 + 's';
    floatingHeartsContainer.appendChild(heart);
    
    setTimeout(() => heart.remove(), 16000);
}

for (let i = 0; i < 15; i++) {
    createFloatingHeart();
}
setInterval(createFloatingHeart, 1200);

// =========================================================
// 2. BACKGROUND GENERATION - SPARKLES
// =========================================================
const sparklesContainer = document.getElementById('sparkles-container');

function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random() * 100 + 'vw';
    sparkle.style.top = Math.random() * 100 + 'vh';
    sparkle.style.animationDuration = (Math.random() * 2 + 2) + 's';
    sparkle.style.animationDelay = Math.random() * 2 + 's';
    sparklesContainer.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 5000);
}

for (let i = 0; i < 30; i++) {
    setTimeout(createSparkle, Math.random() * 3000);
}
setInterval(createSparkle, 200);

// =========================================================
// 3. BACKGROUND GENERATION - GRADIENT ORBS
// =========================================================
const gradientOrbsContainer = document.getElementById('gradient-orbs');
const orbColors = [
    'radial-gradient(circle, rgba(255,182,193,0.6), transparent)',
    'radial-gradient(circle, rgba(255,105,180,0.5), transparent)',
    'radial-gradient(circle, rgba(255,228,233,0.7), transparent)'
];

for (let i = 0; i < 5; i++) {
    const orb = document.createElement('div');
    orb.className = 'gradient-orb';
    orb.style.width = (Math.random() * 200 + 150) + 'px';
    orb.style.height = orb.style.width;
    orb.style.background = orbColors[Math.floor(Math.random() * orbColors.length)];
    orb.style.left = Math.random() * 100 + '%';
    orb.style.top = Math.random() * 100 + '%';
    orb.style.animationDuration = (Math.random() * 10 + 15) + 's';
    orb.style.animationDelay = Math.random() * 5 + 's';
    gradientOrbsContainer.appendChild(orb);
}

// =========================================================
// 4. TYPING EFFECT (Scene 1)
// =========================================================
const textToType = '"With this message, I hope you can forgive me, My Darling."';
const typingElement = document.getElementById('typing-text');
const actionArea = document.getElementById('action-area-1');
let charIndex = 0;

function typeText() {
    if (charIndex < textToType.length) {
        typingElement.innerHTML += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 50);
    } else {
        setTimeout(() => {
            actionArea.classList.remove('hidden-fade');
            actionArea.classList.add('show-fade');
        }, 600);
    }
}

setTimeout(typeText, 1500);

// =========================================================
// 5. SCENE TRANSITION SYSTEM
// =========================================================
function updateProgress(sceneIndex) {
    const progress = ((sceneIndex + 1) / scenes.length) * 100;
    if (progressBar) {
        progressBar.style.setProperty('--progress', progress + '%');
        document.querySelector('.progress-bar').style.setProperty('--progress-width', progress + '%');
    }
    
    const progressBarElement = document.querySelector('.progress-bar');
    if (progressBarElement) {
        progressBarElement.style.setProperty('--progress-width', progress + '%');
    }
    
    progressDots.forEach((dot, index) => {
        if (index <= sceneIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function changeScene(fromIndex, toIndex) {
    currentScene = toIndex;
    
    scenes[fromIndex].classList.remove('visible');
    scenes[fromIndex].classList.add('hidden');
    
    setTimeout(() => {
        scenes[fromIndex].style.display = 'none';
        scenes[toIndex].style.display = 'block';
        
        void scenes[toIndex].offsetWidth;
        
        scenes[toIndex].classList.remove('hidden');
        scenes[toIndex].classList.add('visible');
        
        updateProgress(toIndex);
    }, 800);
}

// Initialize
scenes.forEach((scene, index) => {
    if (index !== 0) scene.style.display = 'none';
});
updateProgress(0);

const style = document.createElement('style');
style.textContent = `
    .progress-bar::before {
        width: var(--progress-width, 0%);
    }
`;
document.head.appendChild(style);

// =========================================================
// 6. BUTTON EVENT LISTENERS
// =========================================================
document.getElementById('btn-next-1').addEventListener('click', () => {
    historyTombol.push('Membuka Surat');
    changeScene(0, 1);
});

document.getElementById('btn-next-2').addEventListener('click', () => {
    historyTombol.push('Lanjut ke Curhatan');
    changeScene(1, 2);
});

document.getElementById('btn-next-3').addEventListener('click', () => {
    keluhKesahText = inputCurhatan.value;
    if (keluhKesahText.trim() === "") {
        keluhKesahText = "(Tidak ada curhatan yang ditulis)";
    }
    historyTombol.push('Mengirim Curhatan');
    changeScene(2, 3);
});

// =========================================================
// 7. "GAK" BUTTON LOGIC - EVADING & BEGGING
// =========================================================
const btnNo = document.getElementById('btn-no');
const teksMohon = [
    "Pliss dimaafin 🥺",
    "Serius gak mau? 😭",
    "Ayolah sayangku 🥹",
    "Jangan hukum aku 💔",
    "Aku mohon banget ✨",
    "Maafin dong sayang 💕",
    "Please please please 🙏",
    "Aku janji gak ngulangin 💝"
];
let noClickCount = 0;

btnNo.addEventListener('click', () => {
    historyTombol.push(`Klik Gak (ke-${noClickCount + 1})`);
    btnNo.innerHTML = `<span>${teksMohon[noClickCount % teksMohon.length]}</span>`;
    noClickCount++;
    
    btnNo.style.transition = 'all 0.1s ease';
    btnNo.style.transform = "translateX(20px) scale(0.85)";
    setTimeout(() => btnNo.style.transform = "translateX(-20px) scale(0.85)", 60);
    setTimeout(() => btnNo.style.transform = "translateX(15px) scale(0.9)", 120);
    setTimeout(() => btnNo.style.transform = "translateX(-10px) scale(0.95)", 180);
    setTimeout(() => {
        btnNo.style.transition = 'all 0.3s ease';
        btnNo.style.transform = "translateX(0) scale(1)";
    }, 240);
    
    createSadParticles(btnNo);
});

function createSadParticles(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const sadEmojis = ['😢', '💔', '😭'];
    
    for (let i = 0; i < 3; i++) {
        createMagicBurst(centerX, centerY, sadEmojis);
    }
}

// =========================================================
// 8. "IYA" BUTTON & EMAIL SUBMISSION
// =========================================================
const btnYes = document.getElementById('btn-yes');

btnYes.addEventListener('click', () => {
    historyTombol.push("Akhirnya Klik Iya ❤️");
    
    btnYes.innerHTML = "<span class='btn-content'><span class='btn-icon'>✨</span><span class='btn-text'>Memproses Cinta...</span></span>";
    btnYes.disabled = true;
    btnYes.style.opacity = '0.7';
    btnNo.style.display = 'none';
    
    let dataKirim = {
        Pesan_Curhatan: keluhKesahText,
        Riwayat_Tombol: historyTombol.join(" → "),
        Jumlah_Penolakan: noClickCount
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
    .then(data => {
        setTimeout(() => {
            changeScene(3, 4);
            setTimeout(createConfetti, 500);
        }, 1000);
    })
    .catch(error => {
        setTimeout(() => {
            changeScene(3, 4);
            setTimeout(createConfetti, 500);
        }, 1000);
    });
});

// Tombol Ulangi
document.getElementById('btn-replay')?.addEventListener('click', () => {
    location.reload();
});

// =========================================================
// 9. CONFETTI CELEBRATION EFFECT
// =========================================================
function createConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    const colors = ['#FF69B4', '#FFB6C1', '#FF1493', '#FFC0CB', '#FF85A2', '#FFE4E9'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.width = (Math.random() * 8 + 5) + 'px';
        confetti.style.height = confetti.style.width;
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        
        confettiContainer.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
    }
}

// =========================================================
// 10. INTERACTIVE PARTICLE BURST SYSTEM
// =========================================================
const particleContainer = document.getElementById('interactive-particles');

function createMagicBurst(x, y, customEmojis = null) {
    const emojis = customEmojis || ['✨', '💖', '💫', '🌸', '💕', '⭐', '💗', '🌟'];
    const burstCount = 12;

    for (let i = 0; i < burstCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('magic-particle');
        particle.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';

        const angle = (i / burstCount) * Math.PI * 2;
        const velocity = Math.random() * 100 + 80;
        const tx = Math.cos(angle) * velocity + 'px';
        const ty = Math.sin(angle) * velocity - 50 + 'px';
        
        particle.style.setProperty('--tx', tx);
        particle.style.setProperty('--ty', ty);
        particle.style.setProperty('--rot', Math.random() * 720 - 360 + 'deg');

        particleContainer.appendChild(particle);
        setTimeout(() => particle.remove(), 1500);
    }
}

let lastBurstTime = 0;
const burstCooldown = 300; 

function handleInteraction(e) {
    const now = Date.now();
    if (now - lastBurstTime < burstCooldown) return;
    
    const target = e.target;
    if (target.tagName.toLowerCase() === 'textarea' || 
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'input') {
        return;
    }
    
    let x, y;
    if (e.type === 'touchstart') {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
    } else {
        x = e.clientX;
        y = e.clientY;
    }
    
    createMagicBurst(x, y);
    lastBurstTime = now;
}

document.addEventListener('touchstart', handleInteraction, { passive: true });
document.addEventListener('mousedown', handleInteraction);

// =========================================================
// 11. FLOATING LABEL FOR INPUT
// =========================================================
const floatingLabel = document.getElementById('floating-label');

if (inputCurhatan && floatingLabel) {
    inputCurhatan.addEventListener('focus', () => {
        floatingLabel.style.top = '-12px';
        floatingLabel.style.fontSize = '0.85rem';
        floatingLabel.style.color = 'var(--pink-primary)';
    });
    
    inputCurhatan.addEventListener('blur', () => {
        if (inputCurhatan.value === '') {
            floatingLabel.style.top = '20px';
            floatingLabel.style.fontSize = '1rem';
            floatingLabel.style.color = '#999';
        }
    });
}

// =========================================================
// 12. SMOOTH SCROLL PREVENTION
// =========================================================
document.body.style.overflow = 'hidden';
document.documentElement.style.overflow = 'hidden';

// =========================================================
// 13. PERFORMANCE OPTIMIZATION
// =========================================================
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.01s');
}

// =========================================================
// 14. ADDITIONAL BUTTON INTERACTIONS
// =========================================================
const allButtons = document.querySelectorAll('button');

allButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.pointerEvents = 'none';
        
        const rect = this.getBoundingClientRect();
        ripple.style.left = (e.clientX - rect.left - 10) + 'px';
        ripple.style.top = (e.clientY - rect.top - 10) + 'px';
        
        this.appendChild(ripple);
        
        ripple.animate([
            { transform: 'scale(0)', opacity: 1 },
            { transform: 'scale(4)', opacity: 0 }
        ], {
            duration: 600,
            easing: 'ease-out'
        });
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// =========================================================
// 15. CONSOLE MESSAGE
// =========================================================
console.log('%c💖 Made with Love 💖', 'color: #FF69B4; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});