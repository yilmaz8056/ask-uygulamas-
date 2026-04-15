// =============================================
// QUOTES & DATE IDEAS
// =============================================
const quotes = [
    "Gülüşün dünyadaki en güzel manzara...",
    "Seninle geçen her saniye, ömrümün en değerli anı.",
    "Gözlerine baktığımda tüm dertlerimi unutuyorum.",
    "Sadece varlığın bile beni dünyanın en şanslı insanı yapıyor.",
    "Sen benim en güzel rüyam, en tatlı gerçeğimsin.",
    "Ellerimi tuttuğunda içimde çiçekler açıyor.",
    "Hayatımdaki en güzel tesadüf sensin.",
    "Beni benden daha iyi tanıyan, kalbimin tek sahibisin.",
    "Seninle her şey daha parlak, daha renkli, daha anlamlı.",
    "Dünyanın tüm kelimeleri bir araya gelse, sana olan aşkımı anlatmaya yetmez.",
    "Sen güldüğünde benim de içim gülüyor.",
    "Bana dünyanın neresinde olmak istersin deseler, senin kollarında derim.",
    "Masallardaki prensesler bile senin güzelliğinin yanında sönük kalır.",
    "Seninle her güne uyanmak, hayata yeniden başlamak gibi.",
    "Sen başıma gelen en güzel şeysin."
];

const dateIdeas = [
    "Birlikte mutfağa girip hiç denemediğimiz bir tatlı yapmak 🧁",
    "Evde battaniye altında sıcak çikolata içerek nostaljik bir film izlemek 🍿",
    "Sahilde veya parkta el ele uzun bir akşam yürüyüşü yapmak 🌙",
    "Birbirimize en komik çocukluk fotoğraflarımızı gösterip anılarımızı anlatmak 📸",
    "Arabaya atlayıp nereye gideceğimizi bilmeden şarkılar söyleyerek turlamak 🚗🎶",
    "Şehrin en iyi kahvecisini keşfetmeye çıkıp saatlerce sohbet etmek ☕",
    "Telefonları tamamen kapatıp sadece birbirimizle ilgileneceğimiz bir akşam geçirmek 📵",
    "Birlikte yeni bir oyuna başlamak (Kutu oyunu veya konsol) 🎲",
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
    { id: 'first_place', name: 'Kaşif Çift', icon: '📍' },
    { id: 'first_letter', name: 'Zamanda Yolcu', icon: '✉️' },
    { id: 'first_song', name: 'Aşkın Melodisi', icon: '🎵' }
];

// =============================================
// DATA & STATE
// =============================================
let specialDays = JSON.parse(localStorage.getItem('loveApp_specialDays')) || [
    { title: "Tanışma Yıl Dönümümüz", date: "2026-10-15", icon: "fa-champagne-glasses" },
    { title: "Biriciğimin Doğum Günü", date: "2026-08-20", icon: "fa-cake-candles" },
    { title: "İlk Buluşma", date: "2026-05-10", icon: "fa-calendar-check" }
];

let memories = JSON.parse(localStorage.getItem('loveApp_memories')) || [];
let countdownData = JSON.parse(localStorage.getItem('loveApp_countdown')) || null;
let moodLog = JSON.parse(localStorage.getItem('loveApp_moodLog')) || {};
let places = JSON.parse(localStorage.getItem('loveApp_places')) || [];
let letters = JSON.parse(localStorage.getItem('loveApp_letters')) || [];
let achievements = JSON.parse(localStorage.getItem('loveApp_achievements')) || [];

// =============================================
// DOM ELEMENTS
// =============================================
const elements = {
    introScreen: document.getElementById('intro-screen'),
    appContainer: document.getElementById('main-app'),
    envelope: document.getElementById('envelope'),
    generateBtn: document.getElementById('generate-btn'),
    quoteText: document.getElementById('quote-text'),
    dateBtn: document.getElementById('date-btn'),
    dateCard: document.getElementById('date-card'),
    dateText: document.getElementById('date-text'),
    specialDaysList: document.getElementById('special-days-list'),
    bgMusic: document.getElementById('bg-music'),
    playBtn: document.getElementById('play-pause-btn'),
    musicCard: document.querySelector('.music-card'),
    countdownCard: document.getElementById('countdown-card'),
    heartsContainer: document.getElementById('hearts-container')
};

// =============================================
// 1. UTILITIES & EFFECTS
// =============================================
const vibrate = (p = 50) => navigator.vibrate && navigator.vibrate(p);
const launchHearts = (c = 5) => { for(let i=0; i<c; i++) createHeart(); };

function createHeart() {
    const heart = document.createElement('i');
    heart.className = 'fa-solid fa-heart floating-heart';
    const size = Math.random() * 20 + 10;
    const dur = Math.random() * 5 + 5;
    heart.style.fontSize = `${size}px`;
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.setProperty('--dur', `${dur}s`);
    elements.heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), dur * 1000);
}
setInterval(createHeart, 1000);

// Global Click Heart Pop
document.addEventListener('click', (e) => {
    if (e.target.closest('.modal') || e.target.closest('button') || e.target.closest('input')) return;
    const h = document.createElement('span');
    h.textContent = ['❤️','💖','💗','🌸'][Math.floor(Math.random()*4)];
    h.style.cssText = `position:fixed; left:${e.clientX}px; top:${e.clientY}px; font-size:24px; pointer-events:none; z-index:9999; animation: heartPop 1s forwards;`;
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 1000);
});

// =============================================
// 2. RENDERING LOGIC
// =============================================
function renderSpecialDays() {
    const today = new Date(); today.setHours(0,0,0,0);
    elements.specialDaysList.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
            <h3 style="margin:0;"><i class="fa-solid fa-calendar-heart"></i> Günlerimiz</h3>
            <button class="edit-icon" id="open-edit-modal" style="background:none; border:none; color:rgba(255,255,255,0.6); cursor:pointer;"><i class="fa-solid fa-pen"></i></button>
        </div>
    `;
    specialDays.forEach(day => {
        let tgt = new Date(day.date); if (tgt < today) tgt.setFullYear(today.getFullYear() + 1);
        const diff = Math.ceil((tgt - today) / (1000 * 3600 * 24));
        const countdownText = diff === 0 ? "BUGÜN! 🎉" : `${diff} Gün Kaldı`;

        const div = document.createElement('div');
        div.className = 'day-item';
        div.style.cssText = "display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.1); padding:15px; border-radius:18px; margin-bottom:12px; border: 1px solid rgba(255,255,255,0.1);";
        div.innerHTML = `
            <div style="display:flex; align-items:center; gap:12px;">
                <div style="width:40px; height:40px; background:rgba(255,255,255,0.15); border-radius:50%; display:flex; justify-content:center; align-items:center; font-size:18px;"><i class="fa-solid ${day.icon}"></i></div>
                <div><p class="card-title" style="margin:0; font-size:17px;">${day.title}</p><p class="card-sub" style="margin:0; font-size:13px; opacity:0.6;">${tgt.toLocaleDateString('tr-TR', {day:'numeric', month:'long'})}</p></div>
            </div>
            <p class="card-desc" style="font-weight:800; color:var(--accent); margin:0;">${countdownText}</p>
        `;
        elements.specialDaysList.appendChild(div);
    });
    document.getElementById('open-edit-modal').addEventListener('click', () => {
        const container = document.getElementById('edit-form-container'); container.innerHTML = '';
        specialDays.forEach((d, idx) => {
            container.innerHTML += `<div class="edit-row" style="margin-bottom:15px;"><label style="display:block; margin-bottom:5px; font-size:14px; opacity:0.8;">${d.title}</label><input type="date" id="date-input-${idx}" value="${d.date}" style="width:100%; border-radius:12px; border:1px solid rgba(255,255,255,0.2); padding:10px; background:rgba(255,255,255,0.1); color:#fff;"></div>`;
        });
        document.getElementById('edit-modal').classList.add('active');
    });
}

function renderMemories() {
    const gallery = document.getElementById('polaroid-gallery'); gallery.innerHTML = '';
    if (memories.length === 0) { gallery.innerHTML = '<div class="text-center card-desc" style="width:100%; padding:20px; opacity:0.5;">Henüz anı eklenmedi 📸</div>'; return; }
    memories.forEach((mem, idx) => {
        const item = document.createElement('div');
        item.style.cssText = `flex-shrink:0; width:170px; background:#fff; padding:10px 10px 40px 10px; border-radius:4px; box-shadow:0 15px 30px rgba(0,0,0,0.2); transform:rotate(${Math.random()*6-3}deg); cursor:pointer; margin-right:15px;`;
        item.innerHTML = `<img src="${mem.image}" style="width:100%; height:150px; object-fit:cover; border-radius:2px;"><p style="color:#333; font-family:'Dancing Script'; font-size:22px; font-weight:700; margin-top:10px; text-align:center; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${mem.note || '💕'}</p>`;
        item.onclick = () => {
            document.getElementById('polaroid-detail-img').src = mem.image;
            document.getElementById('polaroid-detail-note').textContent = mem.note || '';
            document.getElementById('polaroid-modal').classList.add('active');
            document.getElementById('delete-polaroid-btn').onclick = () => { if(confirm("Anıyı silmek istiyor musun?")) { memories.splice(idx, 1); localStorage.setItem('loveApp_memories', JSON.stringify(memories)); renderMemories(); document.getElementById('polaroid-modal').classList.remove('active'); } };
        };
        gallery.appendChild(item);
    });
}

function renderPlaces() {
    const container = document.getElementById('love-timeline'); container.innerHTML = '';
    if (places.length === 0) { container.innerHTML = '<p class="text-center card-desc" style="padding:20px;">Henüz yer eklenmedi 📍</p>'; return; }
    places.sort((a,b) => new Date(a.date) - new Date(b.date)).forEach((p, i) => {
        const div = document.createElement('div');
        div.style.cssText = "position:relative; padding-left:30px; border-left:2px dashed rgba(255,255,255,0.3); margin-bottom:25px; margin-left:10px;";
        div.innerHTML = `
            <div style="position:absolute; left:-9px; top:0; width:16px; height:16px; background:var(--accent); border-radius:50%; border:3px solid #fff; box-shadow:0 0 10px var(--accent);"></div>
            <p class="card-title" style="font-size:18px;">${p.name} 📍</p>
            <p class="card-desc" style="font-size:14px; opacity:0.9;">${p.note || ''}</p>
            <p class="card-sub" style="font-size:12px; margin-top:5px;">${new Date(p.date).toLocaleDateString('tr-TR', {day:'numeric', month:'long', year:'numeric'})}</p>
            <button onclick="deletePlace(${i})" style="position:absolute; right:0; top:0; background:none; border:none; color:rgba(255,255,255,0.3); cursor:pointer;"><i class="fa-solid fa-trash-can"></i></button>
        `;
        container.appendChild(div);
    });
}

window.deletePlace = (i) => { if(confirm("Bu yeri silmek istiyor musun?")) { places.splice(i, 1); localStorage.setItem('loveApp_places', JSON.stringify(places)); renderPlaces(); } };

function renderLetters() {
    const container = document.getElementById('letter-list'); container.innerHTML = '';
    if (letters.length === 0) { container.innerHTML = '<p class="text-center card-desc" style="padding:20px;">Henüz mektup yok ✉️</p>'; return; }
    const now = new Date();
    letters.forEach((l, i) => {
        const unlock = new Date(l.unlockDate); const locked = now < unlock;
        const div = document.createElement('div');
        div.className = 'day-item'; div.style.cssText = "display:flex; align-items:center; gap:20px; background:rgba(255,255,255,0.1); padding:18px; border-radius:20px; margin-bottom:12px; cursor:pointer; border:1px solid rgba(255,255,255,0.05);";
        div.innerHTML = `<div style="font-size:35px; filter: drop-shadow(0 0 5px rgba(255,255,255,0.3));">${locked ? '🔒' : '✉️'}</div><div style="flex:1;"><p class="card-title" style="font-size:18px;">${l.title}</p><p class="card-sub" style="font-size:13px; opacity:0.7;">${locked ? unlock.toLocaleDateString('tr-TR')+' tarihinde kilit açılacak' : 'Okumak için dokun'}</p></div>`;
        div.onclick = () => {
            if (locked) alert(`🔒 Bu mektup kilitli!\n\nAçılmasına ${Math.ceil((unlock-now)/(1000*3600*24))} gün var. Sabretmelisin... 💕`);
            else { document.getElementById('letter-read-title').textContent = '💌 ' + l.title; document.getElementById('letter-read-content').textContent = l.content; document.getElementById('letter-read-modal').classList.add('active'); launchFireworks(); vibrate(100); }
        };
        container.appendChild(div);
    });
}

function renderAchievements() {
    const grid = document.getElementById('achievements-grid'); grid.innerHTML = '';
    achievementDefs.forEach(def => {
        const unlocked = achievements.includes(def.id);
        const div = document.createElement('div');
        div.style.cssText = `text-align:center; padding:15px 5px; border-radius:24px; background:rgba(255,255,255,${unlocked ? '0.15' : '0.04'}); filter: ${unlocked ? 'none' : 'grayscale(1) opacity(0.3)'}; border: 1px solid ${unlocked ? 'var(--accent)' : 'rgba(255,255,255,0.05)'}; transition:all 0.5s;`;
        div.innerHTML = `<div style="font-size:38px; margin-bottom:8px;">${def.icon}</div><p class="card-sub" style="font-weight:800; font-size:11px; text-transform:uppercase; letter-spacing:0.5px;">${def.name}</p>`;
        grid.appendChild(div);
    });
}

function checkAchievements() {
    const awards = [];
    if(Object.keys(moodLog).length > 0) awards.push('first_mood');
    if(localStorage.getItem('loveApp_lastFortune')) awards.push('first_fortune');
    if(places.length > 0) awards.push('first_place');
    if(letters.length > 0) awards.push('first_letter');
    if(localStorage.getItem('loveApp_ourSong')) awards.push('first_song');
    awards.forEach(id => { if(!achievements.includes(id)) { achievements.push(id); vibrate([100, 50, 100]); launchHearts(10); } });
    localStorage.setItem('loveApp_achievements', JSON.stringify(achievements));
    renderAchievements();
}

function renderMoodTracker() {
    const container = document.getElementById('mood-emojis');
    if (!container) return;
    
    // Emojilere tıklama olaylarını bağla
    container.querySelectorAll('.mood-emoji').forEach(btn => {
        const mood = btn.getAttribute('data-mood');
        btn.onclick = () => {
            vibrate(40);
            container.querySelectorAll('.mood-emoji').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            const today = new Date().toISOString().split('T')[0];
            moodLog[today] = mood;
            localStorage.setItem('loveApp_moodLog', JSON.stringify(moodLog));
            document.getElementById('mood-status').textContent = `Harika! Bugün ${mood} hissediyorsun. 💕`;
            checkAchievements();
            launchHearts(3);
        };
    });

    // Bugünün ruh halini kontrol et
    const today = new Date().toISOString().split('T')[0];
    if (moodLog[today]) {
        const btn = Array.from(container.querySelectorAll('.mood-emoji')).find(b => b.getAttribute('data-mood') === moodLog[today]);
        if (btn) btn.classList.add('selected');
        document.getElementById('mood-status').textContent = `Bugün ${moodLog[today]} hissediyorsun. 💕`;
    }
}

// =============================================
// 3. FEATURE INITIALIZERS
// =============================================
function initCountdown() { if (!countdownData) return; elements.countdownCard.classList.remove('hidden'); updateCountdown(); setInterval(updateCountdown, 1000); }
function updateCountdown() {
    const diff = new Date(countdownData.date).getTime() - Date.now();
    if (diff <= 0) { document.getElementById('cd-days').textContent = '🎉'; return; }
    document.getElementById('cd-days').textContent = Math.floor(diff / (1000*3600*24));
    document.getElementById('cd-hours').textContent = String(Math.floor((diff % (1000*3600*24)) / (1000*3600))).padStart(2,'0');
    document.getElementById('cd-mins').textContent = String(Math.floor((diff % (1000*3600)) / (1000*60))).padStart(2,'0');
    document.getElementById('cd-secs').textContent = String(Math.floor((diff % (1000*60)) / 1000)).padStart(2,'0');
}

function initFortuneCookie() {
    const cookie = document.getElementById('fortune-cookie'); const result = document.getElementById('fortune-result');
    const today = new Date().toISOString().split('T')[0];
    if (localStorage.getItem('loveApp_lastFortune') === today) { cookie.classList.add('hidden'); result.classList.remove('hidden'); result.textContent = localStorage.getItem('loveApp_fortuneText'); }
    cookie.onclick = () => {
        cookie.style.transform = 'scale(0.8) rotate(10deg)'; vibrate(100);
        setTimeout(() => {
            const fortunes = ["Bugün ona sürpriz bir kahve al ☕", "Birlikte yeni bir maceraya atılın! 🌟", "Ona küçük bir not bırak 💌", "Bu akşam gökyüzüne birlikte bakın ⭐", "Ona sarıl ve 10 saniye bırakma 🤗", "Çocukluk fotoğraflarınıza bakın 📸", "Sadece birlikte olduğunuz bir akşam geçirin 💕"];
            const txt = fortunes[Math.floor(Math.random()*fortunes.length)];
            cookie.classList.add('hidden'); result.classList.remove('hidden'); result.textContent = txt;
            localStorage.setItem('loveApp_lastFortune', today); localStorage.setItem('loveApp_fortuneText', txt);
            launchHearts(8); checkAchievements();
        }, 500);
    };
}

function initOurSong() {
    const src = localStorage.getItem('loveApp_ourSong');
    if (src) {
        document.getElementById('our-song-player').classList.remove('hidden');
        document.getElementById('no-song-msg').classList.add('hidden');
        document.getElementById('our-song-audio').src = src;
        document.getElementById('song-name').textContent = localStorage.getItem('loveApp_ourSongName') || 'Bizim Şarkımız';
    }
}

// =============================================
// 4. FLOW & EVENTS
// =============================================
if (elements.envelope) {
    elements.envelope.addEventListener('click', function() {
        vibrate(100); 
        console.log("Zarf tıklandı, uygulama başlatılıyor...");
        elements.introScreen.style.opacity = '0';
        setTimeout(() => { 
            elements.introScreen.style.display = 'none'; 
            elements.appContainer.classList.add('active'); 
            bootstrap(); 
        }, 800);
    }, { once: true });
}

function bootstrap() {
    renderSpecialDays(); 
    renderMemories(); 
    renderMoodTracker(); 
    renderPlaces(); 
    renderLetters(); 
    renderAchievements();
    initCountdown(); 
    initFortuneCookie(); 
    initOurSong();
}

elements.generateBtn.onclick = () => {
    elements.quoteText.style.opacity = '0'; vibrate(40);
    setTimeout(() => { elements.quoteText.textContent = quotes[Math.floor(Math.random()*quotes.length)]; elements.quoteText.style.opacity = '1'; launchHearts(5); }, 400);
};

elements.dateBtn.onclick = () => {
    elements.dateCard.classList.remove('hidden'); elements.dateText.style.opacity = '0'; vibrate(40);
    setTimeout(() => { elements.dateText.textContent = dateIdeas[Math.floor(Math.random()*dateIdeas.length)]; elements.dateText.style.opacity = '1'; }, 400);
};

// Modals Setup
document.querySelectorAll('.modal').forEach(m => {
    const close = () => { m.classList.remove('active'); vibrate(30); };
    m.onclick = (e) => { if(e.target === m) close(); };
    m.querySelectorAll('button').forEach(btn => { if(btn.textContent.includes('İptal') || btn.textContent.includes('Kapat')) btn.onclick = close; });
});

// Song Upload
document.getElementById('song-upload').onchange = (e) => {
    const f = e.target.files[0]; if(!f) return;
    const r = new FileReader(); r.onload = (ev) => {
        try { localStorage.setItem('loveApp_ourSong', ev.target.result); localStorage.setItem('loveApp_ourSongName', f.name.split('.')[0]); initOurSong(); checkAchievements(); vibrate(100); }
        catch(e) { alert("Dosya çok büyük!"); }
    }; r.readAsDataURL(f);
};

// Song Play
let sPlaying = false;
document.getElementById('our-song-play').onclick = () => {
    const a = document.getElementById('our-song-audio'); const i = document.getElementById('our-song-play').querySelector('i');
    if(sPlaying) { a.pause(); i.className = 'fa-solid fa-play'; sPlaying = false; }
    else { a.play(); i.className = 'fa-solid fa-pause'; sPlaying = true; }
};

// Quiz
document.getElementById('quiz-btn').onclick = () => {
    const qModal = document.getElementById('quiz-modal');
    qModal.classList.add('active');
    let qIdx = 0, score = 0;
    const renderQ = () => {
        if(qIdx >= quizQuestions.length) {
            document.getElementById('quiz-options').innerHTML = '';
            document.getElementById('quiz-question').textContent = `Test Bitti! Puanın: ${score}/${quizQuestions.length}`;
            if(score === quizQuestions.length) { checkAchievements(); launchFireworks(); }
            return;
        }
        const q = quizQuestions[qIdx];
        document.getElementById('quiz-question').textContent = q.q;
        const opts = document.getElementById('quiz-options'); opts.innerHTML = '';
        q.opts.forEach((o, i) => {
            const b = document.createElement('button'); b.className = 'generate-btn'; b.style.marginBottom = '10px'; b.textContent = o;
            b.onclick = () => { if(i === q.correct) score++; qIdx++; renderQ(); vibrate(50); };
            opts.appendChild(b);
        });
    };
    renderQ();
};

// Add Place
document.getElementById('add-place-btn').onclick = () => document.getElementById('place-modal').classList.add('active');
document.getElementById('save-place-btn').onclick = () => {
    const n = document.getElementById('place-name').value, d = document.getElementById('place-date').value, nt = document.getElementById('place-note').value;
    if(!n || !d) return alert("Bilgileri doldur!");
    places.push({name:n, date:d, note:nt}); localStorage.setItem('loveApp_places', JSON.stringify(places));
    renderPlaces(); checkAchievements(); document.getElementById('place-modal').classList.remove('active');
};

// Add Letter
document.getElementById('add-letter-btn').onclick = () => document.getElementById('letter-modal').classList.add('active');
document.getElementById('save-letter-btn').onclick = () => {
    const t = document.getElementById('letter-title').value, c = document.getElementById('letter-content').value, u = document.getElementById('letter-unlock').value;
    if(!t || !c || !u) return alert("Eksik alan var!");
    letters.push({title:t, content:c, unlockDate:u}); localStorage.setItem('loveApp_letters', JSON.stringify(letters));
    renderLetters(); checkAchievements(); document.getElementById('letter-modal').classList.remove('active');
};

// Save Dates
document.getElementById('save-dates-btn').onclick = () => {
    specialDays.forEach((d, i) => { const v = document.getElementById(`date-input-${i}`).value; if(v) d.date = v; });
    localStorage.setItem('loveApp_specialDays', JSON.stringify(specialDays));
    renderSpecialDays(); document.getElementById('edit-modal').classList.remove('active');
};

// Polaroid Upload
document.getElementById('polaroid-upload').onchange = (e) => {
    const f = e.target.files[0]; if(!f) return;
    const n = prompt("Notun?");
    const r = new FileReader(); r.onload = (ev) => {
        const i = new Image(); i.onload = () => {
            const c = document.createElement('canvas'); const ct = c.getContext('2d');
            c.width = 400; c.height = (400/i.width)*i.height; ct.drawImage(i, 0, 0, c.width, c.height);
            memories.push({image: c.toDataURL('image/jpeg', 0.7), note: n});
            localStorage.setItem('loveApp_memories', JSON.stringify(memories)); renderMemories(); launchHearts(5);
        }; i.src = ev.target.result;
    }; r.readAsDataURL(f);
};

// MAIN MUSIC
let mPlaying = false;
elements.playBtn.onclick = () => {
    if(mPlaying) { elements.bgMusic.pause(); elements.playBtn.querySelector('i').className = 'fa-solid fa-play'; mPlaying = false; }
    else { elements.bgMusic.play(); elements.playBtn.querySelector('i').className = 'fa-solid fa-pause'; mPlaying = true; }
};

// FIREWORKS (Mini)
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
