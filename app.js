// =============================================
// ELITE LOVE APP - CORE LOGIC
// =============================================

// DATA COLLECTIONS
const quotes = [
    "Gülüşün dünyadaki en güzel manzara...",
    "Seninle geçen her saniye, ömrümün en değerli anı.",
    "Gözlerine baktığımda tüm dertlerimi unutuyorum.",
    "Sadece varlığın bile beni dünyanın en şanslı insanı yapıyor.",
    "Sen benim en güzel rüyam, en tatlı gerçeğimsin.",
    "Ellerimi tuttuğunda içimde çiçekler açıyor.",
    "Hayatımdaki en güzel tesadüf sensin.",
    "Seni sevmek, nefes almak gibi doğal ve hayatî.",
    "Dünyanın tüm kelimeleri bir araya gelse, sana olan aşkımı anlatmaya yetmez.",
    "Sen güldüğünde benim de içim gülüyor.",
    "Seninle her güne uyanmak, hayata yeniden başlamak gibi.",
    "Sen başıma gelen en güzel şeysin."
];

const dateIdeas = [
    "Birlikte mutfağa girip hiç denemediğimiz bir tatlı yapmak 🧁",
    "Evde battaniye altında sıcak çikolata içerek nostaljik bir film izlemek 🍿",
    "Sahilde veya parkta el ele uzun bir akşam yürüyüşü yapmak 🌙",
    "Arabaya atlayıp nereye gideceğimizi bilmeden şarkılar söyleyerek turlamak 🚗🎶",
    "Şehrin en iyi kahvecisini keşfetmeye çıkıp saatlerce sohbet etmek ☕",
    "Manzarası güzel bir yere gidip güneşin batışını izlemek 🌅",
    "İkimizin de en sevdiği şarkılardan oluşan ortak bir Spotify listesi oluşturmak 🎵"
];

const achievementDefs = [
    { id: 'first_quiz', name: 'İlk Quiz!', icon: '🧠' },
    { id: 'perfect_quiz', name: 'Dahi Aşık', icon: '🏆' },
    { id: 'first_mood', name: 'Ruh Halini Paylaş', icon: '🌈' },
    { id: 'first_fortune', name: 'Fal Meraklısı', icon: '🥠' },
    { id: 'first_letter', name: 'Zamanda Yolcu', icon: '✉️' },
    { id: 'first_song', name: 'Bizim Melodimiz', icon: '🎵' }
];

// STATE MANAGEMENT
let state = {
    specialDays: JSON.parse(localStorage.getItem('loveApp_specialDays')) || [
        { title: "Tanışma Yıl Dönümümüz", date: "2026-10-15", icon: "fa-champagne-glasses" }
    ],
    memories: JSON.parse(localStorage.getItem('loveApp_memories')) || [],
    countdown: JSON.parse(localStorage.getItem('loveApp_countdown')) || { title: "Kavuşmamıza", date: "2026-12-31T00:00" },
    moodLog: JSON.parse(localStorage.getItem('loveApp_moodLog')) || {},
    achievements: JSON.parse(localStorage.getItem('loveApp_achievements')) || []
};

// UI SELECTORS
const ui = {
    countdownCard: document.getElementById('countdown-card'),
    moodContainer: document.getElementById('mood-emojis'),
    polaroidGallery: document.getElementById('polaroid-gallery'),
    quoteText: document.getElementById('quote-text'),
    dateText: document.getElementById('date-text')
};

// =============================================
// EFFECTS & UTILITIES
// =============================================
const vibrate = (ms = 50) => navigator.vibrate && navigator.vibrate(ms);

function createHeart() {
    const overlay = document.getElementById('hearts-overlay');
    if (!overlay) return;
    const heart = document.createElement('i');
    heart.className = 'fa-solid fa-heart floating-heart';
    const size = Math.random() * 20 + 8;
    const dur = Math.random() * 4 + 4;
    heart.style.fontSize = `${size}px`;
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.setProperty('--dur', `${dur}s`);
    overlay.appendChild(heart);
    setTimeout(() => heart.remove(), dur * 1000);
}
setInterval(createHeart, 2500);

// =============================================
// FEATURE LOGIC
// =============================================

function updateCountdown() {
    if (!state.countdown) return;
    const diff = new Date(state.countdown.date).getTime() - Date.now();
    document.getElementById('countdown-title').textContent = state.countdown.title;
    
    const d = document.getElementById('cd-days'), h = document.getElementById('cd-hours'), m = document.getElementById('cd-mins'), s = document.getElementById('cd-secs');
    if (!d) return;

    if (diff <= 0) { d.textContent = '🎉'; h.textContent = '00'; m.textContent = '00'; s.textContent = '00'; return; }
    
    d.textContent = Math.floor(diff / (1000*3600*24));
    h.textContent = String(Math.floor((diff % (1000*3600*24)) / (1000*3600))).padStart(2,'0');
    m.textContent = String(Math.floor((diff % (1000*3600)) / (1000*60))).padStart(2,'0');
    s.textContent = String(Math.floor((diff % (1000*60)) / 1000)).padStart(2,'0');
}

function renderMoodTracker() {
    if (!ui.moodContainer) return;
    const btns = ui.moodContainer.querySelectorAll('.mood-btn');
    const today = new Date().toISOString().split('T')[0];

    btns.forEach(btn => {
        const mood = btn.getAttribute('data-mood');
        if (state.moodLog[today] === mood) btn.classList.add('selected');

        btn.onclick = () => {
            vibrate();
            btns.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            state.moodLog[today] = mood;
            localStorage.setItem('loveApp_moodLog', JSON.stringify(state.moodLog));
            document.getElementById('mood-status').textContent = `Harika! Bugün ${mood} hissediyorsun. 💕`;
            checkAchievements('first_mood');
        };
    });
}

function renderMemories() {
    if (!ui.polaroidGallery) return;
    ui.polaroidGallery.innerHTML = '';
    if (state.memories.length === 0) { ui.polaroidGallery.innerHTML = '<p style="opacity:0.4; font-size:14px; padding:20px;">Henüz anı eklenmedi. ✨</p>'; return; }
    
    state.memories.forEach((mem, idx) => {
        const item = document.createElement('div');
        item.className = 'polaroid-item';
        item.innerHTML = `<img src="${mem.image}" loading="lazy"><p>${mem.note || '💕'}</p>`;
        item.onclick = () => {
            document.getElementById('polaroid-detail-img').src = mem.image;
            document.getElementById('polaroid-detail-note').textContent = mem.note || '';
            document.getElementById('polaroid-modal').classList.add('active');
            document.getElementById('delete-polaroid-btn').onclick = () => {
                if(confirm("Bu anıyı silmek istiyor musun?")) {
                    state.memories.splice(idx, 1);
                    localStorage.setItem('loveApp_memories', JSON.stringify(state.memories));
                    renderMemories();
                    document.getElementById('polaroid-modal').classList.remove('active');
                }
            };
        };
        ui.polaroidGallery.appendChild(item);
    });
}

function renderAchievements() {
    const grid = document.getElementById('achievements-grid');
    if (!grid) return;
    grid.innerHTML = '';
    achievementDefs.forEach(def => {
        const unlocked = state.achievements.includes(def.id);
        const div = document.createElement('div');
        div.style.cssText = `text-align:center; padding:10px; border-radius:15px; background:rgba(255,255,255,${unlocked ? '0.08' : '0.02'}); filter: ${unlocked ? 'none' : 'grayscale(1) opacity(0.3)'}; border: 1px solid ${unlocked ? 'rgba(255,45,85,0.3)' : 'transparent'}; transition:all 0.5s;`;
        div.innerHTML = `<div style="font-size:28px; margin-bottom:5px;">${def.icon}</div><small style="font-size:8px; text-transform:uppercase; color:var(--text-dim);">${def.name}</small>`;
        grid.appendChild(div);
    });
}

function checkAchievements(id) {
    if (id && !state.achievements.includes(id)) {
        state.achievements.push(id);
        localStorage.setItem('loveApp_achievements', JSON.stringify(state.achievements));
        renderAchievements();
        vibrate([100, 50, 100]);
    }
}

// =============================================
// BOOTSTRAP & EVENTS
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initial Renders
    updateCountdown();
    setInterval(updateCountdown, 1000);
    renderMoodTracker();
    renderMemories();
    renderAchievements();

    // Generate Quote
    document.getElementById('generate-btn').onclick = () => {
        vibrate();
        const display = document.getElementById('quote-display');
        display.classList.remove('hidden');
        ui.quoteText.style.opacity = '0';
        setTimeout(() => {
            ui.quoteText.textContent = quotes[Math.floor(Math.random() * quotes.length)];
            ui.quoteText.style.opacity = '1';
        }, 150);
        for(let i=0; i<6; i++) setTimeout(createHeart, i*100);
    };

    // Date Idea
    document.getElementById('date-btn').onclick = () => {
        vibrate();
        const display = document.getElementById('date-display');
        display.classList.remove('hidden');
        ui.dateText.style.opacity = '0';
        setTimeout(() => {
            ui.dateText.textContent = dateIdeas[Math.floor(Math.random() * dateIdeas.length)];
            ui.dateText.style.opacity = '1';
        }, 150);
    };

    // Music Player
    let playing = false;
    const playBtn = document.getElementById('play-pause-btn');
    const bgMusic = document.getElementById('bg-music');
    if (playBtn && bgMusic) {
        playBtn.onclick = () => {
            const icon = playBtn.querySelector('i');
            if (playing) { bgMusic.pause(); icon.className = 'fa-solid fa-play'; }
            else { bgMusic.play(); icon.className = 'fa-solid fa-pause'; }
            playing = !playing;
            vibrate(30);
        };
    }

    // Countdown Modal
    document.getElementById('countdown-edit-btn').onclick = () => document.getElementById('countdown-modal').classList.add('active');
    document.getElementById('close-countdown-modal').onclick = () => document.getElementById('countdown-modal').classList.remove('active');
    document.getElementById('save-countdown-btn').onclick = () => {
        const t = document.getElementById('cd-title-input').value;
        const d = document.getElementById('cd-date-input').value;
        if (!t || !d) return alert("Bilgileri doldur biriciğim! 💕");
        state.countdown = { title: t, date: d };
        localStorage.setItem('loveApp_countdown', JSON.stringify(state.countdown));
        updateCountdown();
        document.getElementById('countdown-modal').classList.remove('active');
        vibrate(100);
    };

    // Polaroid Upload
    document.getElementById('polaroid-upload').onchange = (e) => {
        const f = e.target.files[0]; if(!f) return;
        const note = prompt("Bu anıya ne yazalım?");
        const r = new FileReader();
        r.onload = (ev) => {
            const i = new Image();
            i.onload = () => {
                const c = document.createElement('canvas'); const ct = c.getContext('2d');
                const maxW = 800;
                const scale = Math.min(1, maxW / i.width);
                c.width = i.width * scale; c.height = i.height * scale;
                ct.drawImage(i, 0, 0, c.width, c.height);
                state.memories.push({ image: c.toDataURL('image/jpeg', 0.8), note: note });
                localStorage.setItem('loveApp_memories', JSON.stringify(state.memories));
                renderMemories();
                vibrate(100);
            };
            i.src = ev.target.result;
        };
        r.readAsDataURL(f);
    };

    // Close Modals on overlay click
    document.querySelectorAll('.modal').forEach(m => {
        m.onclick = (e) => { if(e.target === m) m.classList.remove('active'); };
    });
    
    // UI Polish: Date Header
    const now = new Date();
    document.getElementById('today-date-text').textContent = now.toLocaleDateString('tr-TR', { day:'numeric', month:'long', weekday:'long' }) + " 💕";
});
