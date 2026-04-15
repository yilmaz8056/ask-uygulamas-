// =============================================
// ETHEREAL CORE - V2 (ELITE FEATURES)
// =============================================

const CONFIG = {
    quotes: ["Gülüşün dünyadaki en güzel manzara...", "Seninle geçen her saniye ömrümün en değerli anı.", "Gözlerine baktığımda tüm dertlerimi unutuyorum.", "Sen benim en güzel rüyam, en tatlı gerçeğimsin.", "Masallardaki prensesler bile senin güzelliğinin yanında sönük kalır."],
    dates: ["Birlikte mutfağa girip tatlı yapmak 🧁", "Battaniye altında film gecesi 🍿", "Sahilde uzun bir yürüyüş 🌙", "Spotify ortak listesi oluşturmak 🎵", "Gün batımını izlemek 🌅"],
    fortunes: ["Bugün ona sürpriz bir not yaz 💌", "Birlikte yeni bir kahveci keşfedin ☕", "Ona sarıl ve 10 saniye bırakma 🤗", "En sevdiğiniz şarkıda dans edin 💃"],
    secretWord: "Sonsuzluk",
    awards: [
        { id: 'f_1', name: 'Kader Ortağı', icon: '🥠' },
        { id: 'l_1', name: 'Zaman Yolcusu', icon: '✉️' },
        { id: 'w_1', name: 'Hayalperest', icon: '💭' },
        { id: 'g_1', name: 'Bahçıvan', icon: '🌸' }
    ]
};

let state = {
    countdown: JSON.parse(localStorage.getItem('ethereal_cd')) || { title: "Kavuşmamıza", date: "2026-12-31T00:00" },
    memories: JSON.parse(localStorage.getItem('ethereal_mem')) || [],
    letters: JSON.parse(localStorage.getItem('ethereal_let')) || [],
    wishes: JSON.parse(localStorage.getItem('ethereal_wish')) || [{ t: "İlk buluştuğumuz yere gitmek", c: false }],
    awards: JSON.parse(localStorage.getItem('ethereal_awd')) || [],
    aura: localStorage.getItem('ethereal_aura') || 'default',
    startDate: "2023-10-15"
};

const $ = (id) => document.getElementById(id);
const vibrate = (p=50) => navigator.vibrate && navigator.vibrate(p);

function init() {
    renderDashboard();
    renderCountdown();
    renderMemories();
    renderLetters();
    renderWishes();
    renderAwards();
    applyAura(state.aura);
    setupEventListeners();
    setInterval(renderCountdown, 1000);
}

// RENDERS
function renderDashboard() {
    const days = Math.floor((new Date() - new Date(state.startDate)) / (1000 * 3600 * 24));
    $('dashboard-date-msg').textContent = `Bugün bizim ${days}. günümüz. 💕`;
}

function renderCountdown() {
    const diff = new Date(state.countdown.date).getTime() - Date.now();
    $('cd-days').textContent = Math.max(0, Math.floor(diff / (1000*3600*24)));
    $('cd-hours').textContent = String(Math.max(0, Math.floor((diff % (1000*3600*24)) / (1000*3600)))).padStart(2,'0');
    $('cd-mins').textContent = String(Math.max(0, Math.floor((diff % (1000*3600)) / (1000*60)))).padStart(2,'0');
    $('cd-secs').textContent = String(Math.max(0, Math.floor((diff % (1000*60)) / 1000))).padStart(2,'0');
}

function renderWishes() {
    const list = $('wish-list');
    list.innerHTML = '';
    state.wishes.forEach((w, i) => {
        const div = document.createElement('div');
        div.className = `wish-item ${w.c ? 'checked' : ''}`;
        div.innerHTML = `<div class="check-box">${w.c ? '✓' : ''}</div><p style="font-size:14px; margin:0;">${w.t}</p>`;
        div.onclick = () => { w.c = !w.c; save(); renderWishes(); vibrate(30); unlockAward('w_1'); };
        list.appendChild(div);
    });
}

function renderMemories() {
    const list = $('memory-list'); list.innerHTML = '';
    state.memories.forEach((m, i) => {
        const div = document.createElement('div');
        div.className = 'memory-piece';
        div.innerHTML = `<img src="${m.img}"><p>${m.note || '💕'}</p>`;
        div.onclick = () => { if(confirm("Sil?")) { state.memories.splice(i, 1); save(); renderMemories(); } };
        list.appendChild(div);
    });
}

function renderLetters() {
    const list = $('vault-list'); list.innerHTML = '';
    state.letters.forEach((l, i) => {
        const locked = new Date() < new Date(l.date);
        const div = document.createElement('div');
        div.style.cssText = "padding:16px; background:rgba(255,255,255,0.05); border-radius:15px; display:flex; align-items:center; gap:10px; cursor:pointer;";
        div.innerHTML = `<span>${locked ? '🔒' : '✉️'}</span><div><p style="font-weight:600; margin:0;">${l.title}</p></div>`;
        div.onclick = () => {
            if(locked) return alert("Hala kilitli...");
            showModal(`<h3>${l.title}</h3><p style="margin-top:10px;">${l.content}</p>`);
        };
        list.appendChild(div);
    });
}

function renderAwards() {
    const shelf = $('award-shelf'); shelf.innerHTML = '';
    CONFIG.awards.forEach(a => {
        const has = state.awards.includes(a.id);
        shelf.innerHTML += `<div style="text-align:center; opacity: ${has ? 1 : 0.2};"><div style="font-size:24px;">${a.icon}</div></div>`;
    });
}

// FEATURE ACTIONS
function applyAura(aura) {
    document.body.setAttribute('data-aura', aura);
    state.aura = aura;
    localStorage.setItem('ethereal_aura', aura);
    
    // Audio control
    const sounds = { paris: $('audio-rain'), stars: $('audio-stars'), beach: $('audio-waves') };
    Object.values(sounds).forEach(s => { s.pause(); s.currentTime = 0; });
    if(sounds[aura]) {
        sounds[aura].play().catch(() => console.log("User interaction needed for audio"));
    }
    
    document.querySelectorAll('.aura-btn').forEach(b => {
        b.style.opacity = b.getAttribute('data-a') === aura ? '1' : '0.5';
    });
}

function setupEventListeners() {
    // Aura
    document.querySelectorAll('.aura-btn').forEach(b => {
        b.onclick = () => applyAura(b.getAttribute('data-a'));
    });

    // Pulse
    $('haptic-heart').onclick = () => {
        vibrate([100, 50, 100]);
        for(let i=0; i<5; i++) spawnHeart();
    };

    // Fortune / Love Jar
    const shakeJar = () => {
        vibrate(100);
        const txt = CONFIG.fortunes[Math.floor(Math.random()*CONFIG.fortunes.length)];
        $('fortune-actor').classList.add('hidden');
        $('fortune-msg').textContent = txt;
        $('fortune-msg').classList.remove('hidden');
        unlockAward('f_1');
    };
    $('fortune-actor').onclick = shakeJar;

    // Shake detection
    let lastX, lastY, lastZ;
    window.addEventListener('devicemotion', (e) => {
        let acc = e.accelerationIncludingGravity;
        if (!acc.x) return;
        let delta = Math.abs(acc.x + acc.y + acc.z - lastX - lastY - lastZ);
        if (delta > 20) shakeJar();
        lastX = acc.x; lastY = acc.y; lastZ = acc.z;
    });

    // Secret Garden
    $('unlock-garden-btn').onclick = () => {
        if($('garden-pass').value.toLowerCase() === CONFIG.secretWord.toLowerCase()) {
            $('garden-lock').classList.add('hidden');
            $('secret-content').classList.remove('hidden');
            $('secret-msg-dynamic').textContent = `Kalbimizin anahtarı senin elinde. ✨`;
            unlockAward('g_1');
            vibrate([100, 100, 100]);
        } else {
            alert("Kelime yanlış... Kalbini dinle. 💕");
        }
    };

    // Wishlist Add
    $('add-wish-trigger').onclick = () => {
        const t = prompt("Bir hayal ekle:");
        if(t) { state.wishes.push({ t: t, c: false }); save(); renderWishes(); }
    };

    $('btn-quote').onclick = () => reveal(CONFIG.quotes[Math.floor(Math.random()*CONFIG.quotes.length)]);
    $('btn-date').onclick = () => reveal(CONFIG.dates[Math.floor(Math.random()*CONFIG.dates.length)]);
}

function reveal(txt) {
    vibrate(30); $('reveal-area').classList.remove('hidden'); $('reveal-text').textContent = txt;
    for(let i=0; i<8; i++) spawnHeart();
}

function spawnHeart() {
    const h = document.createElement('div'); h.className = 'floating-heart';
    h.innerHTML = ['❤️','💖','✨'][Math.floor(Math.random()*3)];
    h.style.left = Math.random() * 100 + 'vw';
    h.style.fontSize = (Math.random()*20 + 15) + 'px';
    h.style.setProperty('--dur', (Math.random()*3 + 3) + 's');
    document.body.appendChild(h); setTimeout(() => h.remove(), 6000);
}

function showModal(html) {
    $('modal-surface').innerHTML = html + `<button onclick="closeModal()" style="width:100%; margin-top:20px; background:none; border:none; color:#999;">Kapat</button>`;
    $('modal-base').classList.add('active');
}
window.closeModal = () => $('modal-base').classList.remove('active');

function save() {
    localStorage.setItem('ethereal_cd', JSON.stringify(state.countdown));
    localStorage.setItem('ethereal_mem', JSON.stringify(state.memories));
    localStorage.setItem('ethereal_let', JSON.stringify(state.letters));
    localStorage.setItem('ethereal_wish', JSON.stringify(state.wishes));
    localStorage.setItem('ethereal_awd', JSON.stringify(state.awards));
}

function unlockAward(id) { if(!state.awards.includes(id)) { state.awards.push(id); save(); renderAwards(); vibrate([100,50,100]); } }

document.addEventListener('DOMContentLoaded', init);
