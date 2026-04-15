// =============================================
// ETHEREAL CORE - V3 (REPAIR & ENHANCE)
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

function renderLetters() {
    const list = $('vault-list'); list.innerHTML = '';
    if (state.letters.length === 0) { list.innerHTML = '<p style="text-align:center; opacity:0.3; font-size:12px; padding:10px;">Henüz hiç mektup yok. Yazmak için dokun ✉️</p>'; }
    const now = new Date();
    state.letters.forEach((l, i) => {
        const unlock = new Date(l.date); const locked = now < unlock;
        const div = document.createElement('div');
        div.style.cssText = "padding:16px; background:rgba(138,125,250,0.05); border-radius:20px; display:flex; align-items:center; gap:12px; cursor:pointer; margin-bottom:8px;";
        div.innerHTML = `<span style="font-size:24px;">${locked ? '🔒' : '✉️'}</span><div><p style="font-weight:600; font-size:14px; margin:0;">${l.title}</p><small style="opacity:0.5;">${locked ? unlock.toLocaleDateString() : 'Okumak için dokun'}</small></div>`;
        div.onclick = (e) => {
            e.stopPropagation();
            if(locked) return alert("Hala kilitli... Sabret biriciğim. 💕");
            showModal(`<h3>💌 ${l.title}</h3><p style="white-space:pre-wrap; font-size:15px; margin-top:15px; color:#444; line-height:1.6;">${l.content}</p>`);
        };
        list.appendChild(div);
    });
}

function renderWishes() {
    const list = $('wish-list'); list.innerHTML = '';
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
        div.innerHTML = `<img src="${m.img}" loading="lazy"><p>${m.note || '💕'}</p>`;
        div.onclick = () => { if(confirm("Bu anıyı silelim mi?")) { state.memories.splice(i, 1); save(); renderMemories(); } };
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
    const sounds = { paris: $('audio-rain'), stars: $('audio-stars'), beach: $('audio-waves') };
    Object.values(sounds).forEach(s => { if(s) { s.pause(); s.currentTime = 0; } });
    if(sounds[aura]) { sounds[aura].play().catch(() => {}); }
    document.querySelectorAll('.aura-btn').forEach(b => { b.style.opacity = b.getAttribute('data-a') === aura ? '1' : '0.5'; });
}

function setupEventListeners() {
    // Mood Section Modal
    const moodSection = document.querySelector('[data-mood="mutlu"]').parentElement.parentElement;
    moodSection.style.cursor = 'pointer';
    moodSection.onclick = () => {
        showModal(`
            <h3>Ruh Halin Nasıl? 💕</h3>
            <div style="display:flex; justify-content:space-around; font-size:40px; margin-top:20px;">
                <span onclick="setMood('mutlu', '🥰')" style="cursor:pointer;">🥰</span>
                <span onclick="setMood('huzurlu', '😊')" style="cursor:pointer;">😊</span>
                <span onclick="setMood('normal', '😐')" style="cursor:pointer;">😐</span>
                <span onclick="setMood('üzgün', '😢')" style="cursor:pointer;">😢</span>
                <span onclick="setMood('kızgın', '😤')" style="cursor:pointer;">😤</span>
            </div>
        `);
    };

    window.setMood = (m, icon) => {
        vibrate(30);
        $('mood-feedback').textContent = `Harika! Bugün ${m} hissediyorsun. ${icon}`;
        unlockAward('m_1');
        closeModal();
    };

    // Letters Section Click
    const letterSection = $('vault-list').parentElement;
    letterSection.style.cursor = 'pointer';
    letterSection.onclick = () => openAddLetter();

    const openAddLetter = () => showModal(`
        <h3>Mektup Yaz</h3>
        <input id="in-l-t" placeholder="Başlık (Örn: Geleceğimize)" style="width:100%; padding:15px; margin:15px 0; border:1px solid #eee; border-radius:15px;">
        <textarea id="in-l-c" placeholder="Mektubun..." rows="5" style="width:100%; padding:15px; border:1px solid #eee; border-radius:15px;"></textarea>
        <p style="font-size:12px; margin:15px 0 5px 0; opacity:0.6;">Açılacağı Tarih:</p>
        <input type="date" id="in-l-d" style="width:100%; padding:15px; margin-bottom:20px; border:1px solid #eee; border-radius:15px;">
        <button class="liquid-btn" style="width:100%;" onclick="saveLetter()">Mühürle & Sakla</button>
    `);

    $('add-letter-trigger').onclick = (e) => { e.stopPropagation(); openAddLetter(); };

    // Other Triggers
    document.querySelectorAll('.aura-btn').forEach(b => { b.onclick = (e) => { e.stopPropagation(); applyAura(b.getAttribute('data-a')); } });
    $('haptic-heart').onclick = () => { vibrate([100, 50, 100]); for(let i=0; i<5; i++) spawnHeart(); };
    $('fortune-actor').onclick = () => {
        vibrate(100); const today = new Date().toISOString().split('T')[0];
        if(localStorage.getItem('eth_f_date') === today) return reveal(localStorage.getItem('eth_f_txt'));
        const txt = CONFIG.fortunes[Math.floor(Math.random()*CONFIG.fortunes.length)];
        localStorage.setItem('eth_f_date', today); localStorage.setItem('eth_f_txt', txt);
        $('fortune-actor').classList.add('hidden'); $('fortune-msg').textContent = txt; $('fortune-msg').classList.remove('hidden');
        unlockAward('f_1');
    };

    $('unlock-garden-btn').onclick = () => {
        if($('garden-pass').value.toLowerCase() === CONFIG.secretWord.toLowerCase()) {
            $('garden-lock').classList.add('hidden'); $('secret-content').classList.remove('hidden'); unlockAward('g_1'); vibrate([100, 100, 100]);
        } else alert("Yanlış kelime...");
    };

    $('add-wish-trigger').onclick = () => { const t = prompt("Bir hayal ekle:"); if(t) { state.wishes.push({ t, c: false }); save(); renderWishes(); } };
    $('btn-quote').onclick = () => reveal(CONFIG.quotes[Math.floor(Math.random()*CONFIG.quotes.length)]);
    $('btn-date').onclick = () => reveal(CONFIG.dates[Math.floor(Math.random()*CONFIG.dates.length)]);
    $('edit-countdown-trigger').onclick = () => showModal(`<h3>Ayarlar</h3><input id="in-cd-t" value="${state.countdown.title}" style="width:100%; padding:15px; margin:15px 0; border:1px solid #eee; border-radius:15px;"><input type="datetime-local" id="in-cd-d" value="${state.countdown.date}" style="width:100%; padding:15px; margin-bottom:20px; border:1px solid #eee; border-radius:15px;"><button class="liquid-btn" style="width:100%;" onclick="saveCd()">Kaydet</button>`);
    $('quiz-trigger').onclick = startQuiz;
}

// SHARED UTILS
function reveal(txt) { vibrate(30); $('reveal-area').classList.remove('hidden'); $('reveal-text').textContent = txt; for(let i=0; i<8; i++) spawnHeart(); }
function spawnHeart() {
    const h = document.createElement('div'); h.className = 'floating-heart';
    h.innerHTML = ['❤️','💖','✨'][Math.floor(Math.random()*3)];
    h.style.left = Math.random() * 100 + 'vw';
    h.style.fontSize = (Math.random()*20 + 15) + 'px';
    h.style.setProperty('--dur', (Math.random()*3 + 3) + 's');
    document.body.appendChild(h); setTimeout(() => h.remove(), 6000);
}
function showModal(html) { $('modal-surface').innerHTML = html + `<button onclick="closeModal()" style="width:100%; margin-top:20px; background:none; border:none; color:#999; cursor:pointer;">Kapat</button>`; $('modal-base').classList.add('active'); }
window.closeModal = () => $('modal-base').classList.remove('active');
window.saveCd = () => { state.countdown = { title: $('in-cd-t').value, date: $('in-cd-d').value }; save(); closeModal(); renderCountdown(); };
window.saveLetter = () => { state.letters.push({ title: $('in-l-t').value, content: $('in-l-c').value, date: $('in-l-d').value }); save(); closeModal(); renderLetters(); unlockAward('l_1'); };
function startQuiz() {
    let current = 0, score = 0;
    const next = () => {
        if(current >= CONFIG.quiz.length) return showModal(`<h3>Test Bitti! 🏆</h3><p style="font-size:24px; font-weight:800; color:var(--c-primary);">${score}/${CONFIG.quiz.length}</p>`);
        const q = CONFIG.quiz[current];
        let h = `<h3>${q.q}</h3><div style="display:grid; gap:10px; margin-top:20px;">`;
        q.opts.forEach((o, i) => h += `<button class="liquid-btn" style="background:#f0f0f5; color:#555; box-shadow:none;" onclick="handleAns(${i}, ${q.correct})">${o}</button>`);
        showModal(h + `</div>`);
    };
    window.handleAns = (i, c) => { if(i===c) score++; current++; next(); vibrate(40); };
    next();
}
function unlockAward(id) { if(!state.awards.includes(id)) { state.awards.push(id); save(); renderAwards(); vibrate([100,50,100]); } }
function save() {
    localStorage.setItem('ethereal_cd', JSON.stringify(state.countdown));
    localStorage.setItem('ethereal_mem', JSON.stringify(state.memories));
    localStorage.setItem('ethereal_let', JSON.stringify(state.letters));
    localStorage.setItem('ethereal_wish', JSON.stringify(state.wishes));
    localStorage.setItem('ethereal_awd', JSON.stringify(state.awards));
}

document.addEventListener('DOMContentLoaded', init);
