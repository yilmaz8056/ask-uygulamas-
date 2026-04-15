// =============================================
// ETHEREAL CORE - V4 (FINAL REFINEMENT)
// =============================================

const CONFIG = {
    quotes: ["Gülüşün dünyadaki en güzel manzara...", "Seninle geçen her saniye ömrümün en değerli anı.", "Gözlerine baktığımda tüm dertlerimi unutuyorum.", "Sen benim en güzel rüyam, en tatlı gerçeğimsin."],
    dates: ["Mutfağa girip tatlı yapmak 🧁", "Film gecesi 🍿", "Sahilde yürüyüş 🌙", "Dans edin 💃"],
    fortunes: ["Bugün ona sürpriz bir not yaz 💌", "Birlikte yeni bir kahveci keşfedin ☕", "Ona sarıl ve bırakma 🤗"],
    affirmations: [
        "Bugün varlığın için binlerce şükür sebebim var. 💕",
        "Dünyanın en şanslı insanıyım çünkü seninle aynı gökyüzü altındayım. ✨",
        "Gülüşün, kalbimin en huzurlu limanı. 🌊",
        "Seninle yaşlanmak, hayallerimin en güzel durağı. 🕰️",
        "Her yeni güne seninle uyanmak en büyük ödülüm. 🌈"
    ],
    secretWord: "Sonsuzluk",
    songLink: "https://open.spotify.com/track/4uH8o86B494Y781t56r2P7", // Örnek şarkı
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
    renderDailyAffirmation();
    renderCalendar();
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
    $('dashboard-date-msg').textContent = `Bizim ${days}. günümüz. 💕`;
}

function renderCountdown() {
    const diff = new Date(state.countdown.date).getTime() - Date.now();
    $('cd-days').textContent = Math.max(0, Math.floor(diff / (1000*3600*24)));
    $('cd-hours').textContent = String(Math.max(0, Math.floor((diff % (1000*3600*24)) / (1000*3600)))).padStart(2,'0');
    $('cd-mins').textContent = String(Math.max(0, Math.floor((diff % (1000*3600)) / (1000*60)))).padStart(2,'0');
    $('cd-secs').textContent = String(Math.max(0, Math.floor((diff % (1000*60)) / 1000))).padStart(2,'0');
}

function renderDailyAffirmation() {
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    $('daily-affirmation-text').textContent = CONFIG.affirmations[dayOfYear % CONFIG.affirmations.length];
}

function renderCalendar() {
    const container = $('calendar-container'); container.innerHTML = '';
    const now = new Date();
    const monthNames = ["OCAK","ŞUBAT","MART","NİSAN","MAYIS","HAZİRAN","TEMMUZ","AĞUSTOS","EYLÜL","EKİM","KASIM","ARALIK"];
    $('cal-month-name').textContent = `${monthNames[now.getMonth()]} ${now.getFullYear()}`;

    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    
    // Day Names
    ["Pz","Pt","Sa","Ça","Pe","Cu","Ct"].forEach(d => {
        container.innerHTML += `<div class="cal-day-name">${d}</div>`;
    });

    // Padding
    for(let i=0; i<firstDay; i++) container.innerHTML += `<div></div>`;

    // Days
    for(let d=1; d<=daysInMonth; d++) {
        const isToday = d === now.getDate();
        const dateStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
        const hasEvent = state.memories.some(m => m.date === dateStr) || state.letters.some(l => l.date === dateStr);
        
        container.innerHTML += `<div class="cal-cell ${isToday ? 'today' : ''} ${hasEvent ? 'has-event' : ''}">${d}</div>`;
    }
}

function renderLetters() {
    const list = $('vault-list'); list.innerHTML = '';
    if(!state.letters.length) list.innerHTML = '<p style="text-align:center; opacity:0.3; font-size:11px;">Henüz hiç mektup yok. Yazmak için dokun ✉️</p>';
    state.letters.forEach((l, i) => {
        const locked = new Date() < new Date(l.date);
        const div = document.createElement('div');
        div.style.cssText = "padding:12px; background:rgba(138,125,250,0.05); border-radius:15px; display:flex; align-items:center; gap:10px; cursor:pointer;";
        div.innerHTML = `<span>${locked ? '🔒' : '✉️'}</span><p style="font-weight:600; font-size:13px; margin:0;">${l.title}</p>`;
        div.onclick = (e) => { e.stopPropagation(); if(locked) return alert("Hala kilitli..."); showModal(`<h3>${l.title}</h3><p style="margin-top:10px;">${l.content}</p>`); };
        list.appendChild(div);
    });
}

function renderWishes() {
    const list = $('wish-list'); list.innerHTML = '';
    state.wishes.forEach((w, i) => {
        const div = document.createElement('div');
        div.className = `wish-item ${w.c ? 'checked' : ''}`;
        div.innerHTML = `<div class="check-box">${w.c ? '✓' : ''}</div><p style="font-size:13px; margin:0;">${w.t}</p>`;
        div.onclick = () => { w.c = !w.c; save(); renderWishes(); vibrate(30); unlockAward('w_1'); };
        list.appendChild(div);
    });
}

function renderMemories() {
    const list = $('memory-list'); list.innerHTML = '';
    state.memories.forEach((m, i) => {
        const div = document.createElement('div');
        div.className = 'memory-piece';
        div.innerHTML = `<img src="${m.img}" loading="lazy"><p>${m.note || '💕'}</p>`;
        div.onclick = () => { if(confirm("Silmek istiyor musun?")) { state.memories.splice(i, 1); save(); renderMemories(); renderCalendar(); } };
        list.appendChild(div);
    });
}

function renderAwards() {
    const shelf = $('award-shelf'); shelf.innerHTML = '';
    CONFIG.awards.forEach(a => {
        const has = state.awards.includes(a.id);
        shelf.innerHTML += `<div style="text-align:center; opacity: ${has ? 1 : 0.2};"><div style="font-size:20px;">${a.icon}</div></div>`;
    });
}

function applyAura(aura) {
    document.body.setAttribute('data-aura', aura);
    state.aura = aura;
    localStorage.setItem('ethereal_aura', aura);
    const sounds = { paris: $('audio-rain'), stars: $('audio-stars'), beach: $('audio-waves') };
    Object.values(sounds).forEach(s => { if(s) { s.pause(); s.currentTime = 0; } });
    if(sounds[aura]) { sounds[aura].play().catch(() => {}); }
    document.querySelectorAll('.aura-btn').forEach(b => { b.style.opacity = b.getAttribute('data-a') === aura ? '1' : '0.5'; });
}

function setupEventListeners() {
    // Vinyl
    $('vinyl-trigger').onclick = () => {
        const disk = $('vinyl-disk');
        disk.classList.toggle('playing');
        vibrate(100);
        setTimeout(() => { if(confirm("Müzik açılıyor... Spotify'a gitmek ister misin?")) window.open(CONFIG.songLink, '_blank'); }, 500);
    };

    // Cards
    const moodCard = document.querySelector('[data-mood="mutlu"]').parentElement.parentElement;
    moodCard.onclick = () => showModal(`<h3>Ruh Halin?</h3><div style="display:flex; justify-content:space-around; font-size:32px; margin-top:15px;"><span onclick="setM('🥰')" style="cursor:pointer;">🥰</span><span onclick="setM('😊')" style="cursor:pointer;">😊</span><span onclick="setM('😐')" style="cursor:pointer;">😐</span></div>`);
    window.setM = (i) => { $('mood-feedback').textContent = `Harika! ${i}`; vibrate(30); unlockAward('m_1'); closeModal(); };

    $('vault-list').parentElement.onclick = () => openL();
    const openL = () => showModal(`<h3>Mektup Yaz</h3><input id="in-l-t" placeholder="Başlık" style="width:100%; padding:12px; margin:10px 0; border:1px solid #eee; border-radius:12px;"><textarea id="in-l-c" placeholder="İçerik" rows="4" style="width:100%; padding:12px; border:1px solid #eee; border-radius:12px;"></textarea><input type="date" id="in-l-d" style="width:100%; padding:12px; margin:10px 0; border:1px solid #eee; border-radius:12px;"><button class="liquid-btn" style="width:100%;" onclick="saveLetter()">Mühürle</button>`);
    $('add-letter-trigger').onclick = (e) => { e.stopPropagation(); openL(); };

    // Common
    document.querySelectorAll('.aura-btn').forEach(b => { b.onclick = (e) => { e.stopPropagation(); applyAura(b.getAttribute('data-a')); }});
    $('haptic-heart').onclick = () => { vibrate([100,50,100]); for(let i=0; i<5; i++) spawnHeart(); };
    $('fortune-actor').onclick = () => { vibrate(100); const txt = CONFIG.fortunes[Math.floor(Math.random()*CONFIG.fortunes.length)]; $('fortune-actor').classList.add('hidden'); $('fortune-msg').textContent = txt; $('fortune-msg').classList.remove('hidden'); unlockAward('f_1'); };
    $('unlock-garden-btn').onclick = () => { if($('garden-pass').value.toLowerCase() === CONFIG.secretWord.toLowerCase()) { $('garden-lock').classList.add('hidden'); $('secret-content').classList.remove('hidden'); unlockAward('g_1'); vibrate([100,100,100]); } else alert("Yanlış kelime..."); };
    $('add-wish-trigger').onclick = () => { const t = prompt("Bir hayal ekle:"); if(t) { state.wishes.push({ t, c: false }); save(); renderWishes(); } };
    $('btn-quote').onclick = () => reveal(CONFIG.quotes[Math.floor(Math.random()*CONFIG.quotes.length)]);
    $('btn-date').onclick = () => reveal(CONFIG.dates[Math.floor(Math.random()*CONFIG.dates.length)]);
    $('upload-mem').onchange = (e) => { const r = new FileReader(); r.onload = (ev) => { const n = prompt("Notun?"); state.memories.push({ img: ev.target.result, note: n, date: new Date().toISOString().split('T')[0] }); save(); renderMemories(); renderCalendar(); }; r.readAsDataURL(e.target.files[0]); };
    $('edit-countdown-trigger').onclick = () => showModal(`<h3>Ayarlar</h3><input id="in-cd-t" value="${state.countdown.title}" style="width:100%; padding:12px; margin:10px 0;"><input type="datetime-local" id="in-cd-d" value="${state.countdown.date}" style="width:100%;"><button class="liquid-btn" style="width:100%; margin-top:15px;" onclick="saveCd()">Kaydet</button>`);
}

function reveal(txt) { vibrate(30); $('reveal-area').classList.remove('hidden'); $('reveal-text').textContent = txt; for(let i=0; i<8; i++) spawnHeart(); }
function spawnHeart() { const h = document.createElement('div'); h.className = 'floating-heart'; h.innerHTML = '❤️'; h.style.left = Math.random() * 100 + 'vw'; h.style.fontSize = '20px'; h.style.setProperty('--dur', '4s'); document.body.appendChild(h); setTimeout(() => h.remove(), 4000); }
function showModal(html) { $('modal-surface').innerHTML = html + `<button onclick="closeModal()" style="width:100%; margin-top:15px; background:none; border:none; color:#999; cursor:pointer;">Kapat</button>`; $('modal-base').classList.add('active'); }
window.closeModal = () => $('modal-base').classList.remove('active');
window.saveCd = () => { state.countdown = { title: $('in-cd-t').value, date: $('in-cd-d').value }; save(); closeModal(); renderCountdown(); };
window.saveLetter = () => { state.letters.push({ title: $('in-l-t').value, content: $('in-l-c').value, date: $('in-l-d').value }); save(); closeModal(); renderLetters(); renderCalendar(); unlockAward('l_1'); };
function unlockAward(id) { if(!state.awards.includes(id)) { state.awards.push(id); save(); renderAwards(); vibrate([100,50,100]); } }
function save() {
    localStorage.setItem('ethereal_cd', JSON.stringify(state.countdown));
    localStorage.setItem('ethereal_mem', JSON.stringify(state.memories));
    localStorage.setItem('ethereal_let', JSON.stringify(state.letters));
    localStorage.setItem('ethereal_wish', JSON.stringify(state.wishes));
    localStorage.setItem('ethereal_awd', JSON.stringify(state.awards));
}

document.addEventListener('DOMContentLoaded', init);
