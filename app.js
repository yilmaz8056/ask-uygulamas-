// =============================================
// ELITE LOVE APP - CORE LOGIC (RESTORATION)
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

const quizQuestions = [
    {
        q: "İlk mesajımız ne hakkındaydı?",
        opts: ["Bir şarkı hakkında 🎵", "Ders hakkında 📚", "Havadan sudan 🌤️", "Bir fotoğraf hakkında 📸"],
        correct: 0
    },
    {
        q: "Benim en sevdiğim renk hangisi?",
        opts: ["Mavi 💙", "Kırmızı ❤️", "Siyah 🖤", "Mor 💜"],
        correct: 0
    },
    {
        q: "Birlikte yaptığımız en güzel aktivite?",
        opts: ["Film izlemek 🎬", "Yürüyüş yapmak 🚶", "Yemek yapmak 🍳", "Hepsi! 💕"],
        correct: 3
    },
    {
        q: "Sana taktığım ilk lakap neydi?",
        opts: ["Biriciğim 💗", "Tatlım 🍬", "Canım 💖", "Bebeğim 👶"],
        correct: 0 
    },
    {
        q: "En sevdiğim yemek hangisi?",
        opts: ["Makarna 🍝", "Pizza 🍕", "Kebap 🥩", "Senin elinden çıkan her şey! 👨‍🍳"],
        correct: 3
    }
];

const achievementDefs = [
    { id: 'first_quiz', name: 'İlk Quiz!', icon: '🧠' },
    { id: 'perfect_quiz', name: 'Dahi Aşık', icon: '🏆' },
    { id: 'first_mood', name: 'Ruh Halini Paylaş', icon: '🌈' },
    { id: 'first_fortune', name: 'Fal Meraklısı', icon: '🥠' },
    { id: 'first_letter', name: 'Zamanda Yolcu', icon: '✉️' },
    { id: 'first_song', name: 'Bizim Melodimiz', icon: '🎵' },
    { id: 'first_place', name: 'Kaşif Çift', icon: '📍' }
];

// STATE MANAGEMENT
let state = {
    specialDays: JSON.parse(localStorage.getItem('loveApp_specialDays')) || [
        { title: "Tanışma Yıl Dönümümüz", date: "2026-10-15", icon: "fa-champagne-glasses" },
        { title: "Doğum Günü", date: "2026-08-20", icon: "fa-cake-candles" }
    ],
    memories: JSON.parse(localStorage.getItem('loveApp_memories')) || [],
    countdown: JSON.parse(localStorage.getItem('loveApp_countdown')) || { title: "Kavuşmamıza", date: "2026-12-31T00:00" },
    moodLog: JSON.parse(localStorage.getItem('loveApp_moodLog')) || {},
    achievements: JSON.parse(localStorage.getItem('loveApp_achievements')) || [],
    places: JSON.parse(localStorage.getItem('loveApp_places')) || [],
    letters: JSON.parse(localStorage.getItem('loveApp_letters')) || []
};

// UI SELECTORS
const getUi = () => ({
    countdownCard: document.getElementById('countdown-card'),
    moodContainer: document.getElementById('mood-emojis'),
    polaroidGallery: document.getElementById('polaroid-gallery'),
    quoteText: document.getElementById('quote-text'),
    dateText: document.getElementById('date-text'),
    fortuneCookie: document.getElementById('fortune-cookie'),
    fortuneResult: document.getElementById('fortune-result'),
    letterList: document.getElementById('letter-list'),
    specialDaysList: document.getElementById('special-days-list'),
    loveTimeline: document.getElementById('love-timeline')
});

let ui = getUi();

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

function launchFireworks() {
    const c = document.getElementById('fireworks-canvas'); if(!c) return;
    const ctx = c.getContext('2d'); c.width = window.innerWidth; c.height = window.innerHeight;
    let p = []; for(let i=0; i<60; i++) p.push({x:c.width/2, y:c.height/2, vx:Math.random()*12-6, vy:Math.random()*12-6, l:1, col:`hsl(${Math.random()*360}, 100%, 50%)`});
    const animate = () => {
        ctx.clearRect(0,0,c.width,c.height);
        p.forEach(r => { r.x+=r.vx; r.y+=r.vy; r.vy+=0.1; r.l-=0.015; ctx.fillStyle=r.col; ctx.globalAlpha=r.l; ctx.fillRect(r.x,r.y,4,4); });
        if(p[0].l > 0) requestAnimationFrame(animate); else ctx.clearRect(0,0,c.width,c.height);
    }; animate();
}

// =============================================
// FEATURE LOGIC (RESTORED)
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

function renderSpecialDays() {
    if (!ui.specialDaysList) return;
    const today = new Date(); today.setHours(0,0,0,0);
    ui.specialDaysList.innerHTML = '';
    state.specialDays.forEach(day => {
        let tgt = new Date(day.date); if (tgt < today) tgt.setFullYear(today.getFullYear() + 1);
        const diff = Math.ceil((tgt - today) / (1000 * 3600 * 24));
        const countdownText = diff === 0 ? "BUGÜN! 🎉" : `${diff} Gün Kaldı`;
        const div = document.createElement('div');
        div.style.cssText = "display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.05); padding:15px; border-radius:18px; border: 1px solid rgba(255,255,255,0.05);";
        div.innerHTML = `
            <div style="display:flex; align-items:center; gap:12px;">
                <div style="width:36px; height:36px; background:rgba(255,45,85,0.1); border-radius:50%; display:flex; justify-content:center; align-items:center; color:var(--accent);"><i class="fa-solid ${day.icon}"></i></div>
                <div><p style="margin:0; font-size:15px; font-weight:600;">${day.title}</p><p style="margin:0; font-size:12px; opacity:0.6;">${tgt.toLocaleDateString('tr-TR', {day:'numeric', month:'long'})}</p></div>
            </div>
            <p style="font-weight:800; color:var(--accent); margin:0; font-size:13px;">${countdownText}</p>
        `;
        ui.specialDaysList.appendChild(div);
    });
}

function renderLetters() {
    if (!ui.letterList) return;
    ui.letterList.innerHTML = '';
    if (state.letters.length === 0) { ui.letterList.innerHTML = '<p style="text-align:center; opacity:0.4; font-size:13px; padding:15px;">Henüz mektup yok. ✉️</p>'; return; }
    const now = new Date();
    state.letters.forEach((l, i) => {
        const unlock = new Date(l.unlockDate); const locked = now < unlock;
        const div = document.createElement('div');
        div.style.cssText = "display:flex; align-items:center; gap:15px; background:var(--surface-light); padding:15px; border-radius:20px; cursor:pointer; border:1px solid rgba(255,255,255,0.05); transition: 0.3s;";
        div.innerHTML = `<div style="font-size:28px;">${locked ? '🔒' : '✉️'}</div><div style="flex:1;"><p style="font-weight:600; margin:0;">${l.title}</p><p style="font-size:11px; opacity:0.6; margin:0;">${locked ? unlock.toLocaleDateString('tr-TR')+' tarihinde açılacak' : 'Okumak için dokun'}</p></div>`;
        div.onclick = () => {
            if (locked) alert(`🔒 Bu mektup kilitli!\n\nAçılmasına ${Math.ceil((unlock-now)/(1000*3600*24))} gün var. 💕`);
            else { 
                document.getElementById('letter-read-title').textContent = '💌 ' + l.title; 
                document.getElementById('letter-read-content').textContent = l.content; 
                document.getElementById('letter-read-modal').classList.add('active'); 
                vibrate(100); 
            }
        };
        ui.letterList.appendChild(div);
    });
}

function renderPlaces() {
    if (!ui.loveTimeline) return;
    ui.loveTimeline.innerHTML = '';
    if (state.places.length === 0) { ui.loveTimeline.innerHTML = '<p style="text-align:center; opacity:0.4; font-size:13px; padding:15px;">Henüz yer eklenmedi. 📍</p>'; return; }
    state.places.sort((a,b) => new Date(a.date) - new Date(b.date)).forEach((p, i) => {
        const div = document.createElement('div');
        div.style.cssText = "position:relative; padding-left:25px; border-left:2px solid var(--surface-light); margin-bottom:20px; margin-left:10px;";
        div.innerHTML = `
            <div style="position:absolute; left:-6px; top:0; width:10px; height:10px; background:var(--secondary); border-radius:50%; box-shadow:0 0 5px var(--secondary);"></div>
            <p style="font-weight:600; margin:0; font-size:15px;">${p.name} 📍</p>
            <p style="font-size:12px; opacity:0.7; margin:0;">${p.note || ''}</p>
            <p style="font-size:10px; color:var(--text-dim); margin-top:3px;">${new Date(p.date).toLocaleDateString('tr-TR', {day:'numeric', month:'long', year:'numeric'})}</p>
            <button onclick="deletePlace(${i})" style="position:absolute; right:0; top:0; background:none; border:none; color:rgba(255,255,255,0.2); cursor:pointer;"><i class="fa-solid fa-trash"></i></button>
        `;
        ui.loveTimeline.appendChild(div);
    });
}

window.deletePlace = (i) => { if(confirm("Bu yeri silmek istiyor musun?")) { state.places.splice(i, 1); localStorage.setItem('loveApp_places', JSON.stringify(state.places)); renderPlaces(); } };

function initFortuneCookie() {
    if (!ui.fortuneCookie) return;
    const today = new Date().toISOString().split('T')[0];
    if (localStorage.getItem('loveApp_lastFortune') === today) { 
        ui.fortuneCookie.classList.add('hidden'); 
        ui.fortuneResult.classList.remove('hidden'); 
        ui.fortuneResult.innerHTML = `<i class="fa-solid fa-quote-left" style="font-size:12px; color:var(--accent); margin-right:5px;"></i> ${localStorage.getItem('loveApp_fortuneText')}`; 
    }
    ui.fortuneCookie.onclick = () => {
        vibrate(100); ui.fortuneCookie.style.transform = 'scale(0.8)';
        setTimeout(() => {
            const fortunes = ["Bugün ona sürpriz bir kahve al ☕", "Birlikte yeni bir maceraya atılın! 🌟", "Ona küçük bir not bırak 💌", "Bu akşam gökyüzüne birlikte bakın ⭐", "Ona sarıl ve 10 saniye bırakma 🤗", "Çocukluk fotoğraflarınıza bakın 📸", "Sadece birlikte olduğunuz bir akşam geçirin 💕"];
            const txt = fortunes[Math.floor(Math.random()*fortunes.length)];
            ui.fortuneCookie.classList.add('hidden'); 
            ui.fortuneResult.classList.remove('hidden'); 
            ui.fortuneResult.innerHTML = `<i class="fa-solid fa-quote-left" style="font-size:12px; color:var(--accent); margin-right:5px;"></i> ${txt}`;
            localStorage.setItem('loveApp_lastFortune', today); 
            localStorage.setItem('loveApp_fortuneText', txt);
            launchHearts(8); checkAchievements('first_fortune');
        }, 500);
    };
}

function handleQuiz() {
    const qModal = document.getElementById('quiz-modal');
    if (!qModal) return;
    qModal.classList.add('active');
    let qIdx = 0, score = 0;
    const body = document.getElementById('quiz-body');
    const renderQ = () => {
        if(qIdx >= quizQuestions.length) {
            body.innerHTML = `<div class="text-center"><div style="font-size:50px; margin-bottom:15px;">🏆</div><p style="font-size:20px; font-weight:800;">Test Bitti!</p><p style="color:var(--accent); font-size:24px; font-weight:800;">Puanın: ${score}/${quizQuestions.length}</p></div>`;
            if(score === quizQuestions.length) { checkAchievements('perfect_quiz'); launchFireworks(); }
            checkAchievements('first_quiz');
            return;
        }
        const q = quizQuestions[qIdx];
        document.getElementById('quiz-question').textContent = q.q;
        const opts = document.getElementById('quiz-options'); opts.innerHTML = '';
        q.opts.forEach((o, i) => {
            const b = document.createElement('button'); b.className = 'action-btn'; b.style.cssText = "background: var(--surface-light); color: #fff; box-shadow: none; font-size: 15px; margin-bottom: 5px;"; b.textContent = o;
            b.onclick = () => { if(i === q.correct) score++; qIdx++; renderQ(); vibrate(50); };
            opts.appendChild(b);
        });
    };
    renderQ();
}

// =============================================
// BOOTSTRAP & EVENTS
// =============================================

function bootstrap() {
    ui = getUi(); // Refresh selectors
    updateCountdown();
    renderMoodTracker();
    renderMemories();
    renderAchievements();
    renderSpecialDays();
    renderLetters();
    renderPlaces();
    initFortuneCookie();
}

document.addEventListener('DOMContentLoaded', () => {
    bootstrap();
    setInterval(updateCountdown, 1000);

    // Header Date
    const hDate = document.getElementById('today-date-text');
    if(hDate) hDate.textContent = new Date().toLocaleDateString('tr-TR', { day:'numeric', month:'long', weekday:'long' }) + " 💕";

    // Primary Actions
    document.getElementById('generate-btn').onclick = () => {
        vibrate();
        const display = document.getElementById('quote-display');
        display.classList.remove('hidden');
        document.getElementById('quote-text').textContent = quotes[Math.floor(Math.random() * quotes.length)];
        for(let i=0; i<6; i++) setTimeout(createHeart, i*100);
    };

    document.getElementById('date-btn').onclick = () => {
        vibrate();
        const display = document.getElementById('date-display');
        display.classList.remove('hidden');
        document.getElementById('date-text').textContent = dateIdeas[Math.floor(Math.random() * dateIdeas.length)];
    };

    // Music
    let playing = false;
    const playBtn = document.getElementById('play-pause-btn');
    const player = document.getElementById('bg-music');
    if (playBtn && player) {
        playBtn.onclick = () => {
            const icon = playBtn.querySelector('i');
            if (playing) { player.pause(); icon.className = 'fa-solid fa-play'; }
            else { player.play(); icon.className = 'fa-solid fa-pause'; }
            playing = !playing;
            vibrate(30);
        };
    }

    // Modal Triggers
    document.getElementById('quiz-btn-trigger').onclick = handleQuiz;
    document.getElementById('add-place-trigger').onclick = () => document.getElementById('place-modal').classList.add('active');
    document.getElementById('add-letter-btn').onclick = () => document.getElementById('letter-modal').classList.add('active');
    document.getElementById('countdown-edit-btn').onclick = () => document.getElementById('countdown-modal').classList.add('active');

    // Save Handlers
    document.getElementById('save-countdown-btn').onclick = () => {
        const t = document.getElementById('cd-title-input').value, d = document.getElementById('cd-date-input').value;
        if (!t || !d) return alert("Bilgileri doldur!");
        state.countdown = { title: t, date: d };
        localStorage.setItem('loveApp_countdown', JSON.stringify(state.countdown));
        updateCountdown();
        document.getElementById('countdown-modal').classList.remove('active');
    };

    document.getElementById('save-place-btn').onclick = () => {
        const n = document.getElementById('place-name').value, d = document.getElementById('place-date').value, nt = document.getElementById('place-note').value;
        if (!n || !d) return alert("Eksik bilgi!");
        state.places.push({ name: n, date: d, note: nt });
        localStorage.setItem('loveApp_places', JSON.stringify(state.places));
        renderPlaces(); checkAchievements('first_place');
        document.getElementById('place-modal').classList.remove('active');
    };

    document.getElementById('save-letter-btn').onclick = () => {
        const t = document.getElementById('letter-title').value, c = document.getElementById('letter-content').value, u = document.getElementById('letter-unlock').value;
        if(!t || !c || !u) return alert("Eksik alan var!");
        state.letters.push({ title: t, content: c, unlockDate: u });
        localStorage.setItem('loveApp_letters', JSON.stringify(state.letters));
        renderLetters(); checkAchievements('first_letter');
        document.getElementById('letter-modal').classList.remove('active');
    };

    // Close Button Handlers
    document.getElementById('close-countdown-modal').onclick = () => document.getElementById('countdown-modal').classList.remove('active');
    document.getElementById('close-letter-modal').onclick = () => document.getElementById('letter-modal').classList.remove('active');
    document.getElementById('close-letter-read-btn').onclick = () => document.getElementById('letter-read-modal').classList.remove('active');
    document.getElementById('close-place-modal').onclick = () => document.getElementById('place-modal').classList.remove('active');
    document.getElementById('close-quiz-modal').onclick = () => document.getElementById('quiz-modal').classList.remove('active');
    document.getElementById('close-polaroid-btn').onclick = () => document.getElementById('polaroid-modal').classList.remove('active');

    // Polaroid Upload
    document.getElementById('polaroid-upload').onchange = (e) => {
        const f = e.target.files[0]; if(!f) return;
        const note = prompt("Anı notun?");
        const r = new FileReader(); r.onload = (ev) => {
            const i = new Image(); i.onload = () => {
                const c = document.createElement('canvas'); const ct = c.getContext('2d');
                const scale = Math.min(1, 800/i.width);
                c.width = i.width * scale; c.height = i.height * scale;
                ct.drawImage(i, 0, 0, c.width, c.height);
                state.memories.push({ image: c.toDataURL('image/jpeg', 0.8), note: note });
                localStorage.setItem('loveApp_memories', JSON.stringify(state.memories));
                renderMemories(); vibrate(100);
            }; i.src = ev.target.result;
        }; r.readAsDataURL(f);
    };

    // Click on overlay to close
    document.querySelectorAll('.modal').forEach(m => {
        m.onclick = (e) => { if(e.target === m) m.classList.remove('active'); };
    });
});
