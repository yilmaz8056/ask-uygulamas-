// =============================================
// ETHEREAL CORE - 2026 GENERATION
// =============================================

const CONFIG = {
    quotes: ["Gülüşün dünyadaki en güzel manzara...", "Seninle geçen her saniye ömrümün en değerli anı.", "Gözlerine baktığımda tüm dertlerimi unutuyorum.", "Sen benim en güzel rüyam, en tatlı gerçeğimsin.", "Masallardaki prensesler bile senin güzelliğinin yanında sönük kalır."],
    dates: ["Birlikte mutfağa girip tatlı yapmak 🧁", "Battaniye altında film gecesi 🍿", "Sahilde uzun bir yürüyüş 🌙", "Spotify ortak listesi oluşturmak 🎵", "Gün batımını izlemek 🌅"],
    fortunes: ["Bugün ona sürpriz bir not yaz 💌", "Birlikte yeni bir kahveci keşfedin ☕", "Ona sarıl ve 10 saniye bırakma 🤗", "En sevdiğiniz şarkıda dans edin 💃"],
    quiz: [
        { q: "İlk mesajımız ne hakkındaydı?", opts: ["Bir şarkı 🎵", "Ders 📚", "Tatil 🌤️", "Diğer"], correct: 0 },
        { q: "En sevdiğim renk?", opts: ["Mavi 💙", "Kırmızı ❤️", "Siyah 🖤", "Mor 💜"], correct: 0 }
    ],
    awards: [
        { id: 'q_1', name: 'Zihin Bağı', icon: '🧠' },
        { id: 'm_1', name: 'Duygu Paylaşımı', icon: '🌈' },
        { id: 'f_1', name: 'Kader Ortağı', icon: '🥠' },
        { id: 'l_1', name: 'Zaman Yolcusu', icon: '✉️' }
    ]
};

let state = {
    countdown: JSON.parse(localStorage.getItem('ethereal_cd')) || { title: "Kavuşmamıza", date: "2026-12-31T00:00" },
    memories: JSON.parse(localStorage.getItem('ethereal_mem')) || [],
    letters: JSON.parse(localStorage.getItem('ethereal_let')) || [],
    moods: JSON.parse(localStorage.getItem('ethereal_mood')) || {},
    awards: JSON.parse(localStorage.getItem('ethereal_awd')) || [],
    startDate: "2023-10-15" // Örnek başlangıç tarihi
};

// =============================================
// DOM ENGINE
// =============================================
const $ = (id) => document.getElementById(id);
const vibrate = (p=50) => navigator.vibrate && navigator.vibrate(p);

function init() {
    renderDashboard();
    renderCountdown();
    renderMemories();
    renderLetters();
    renderAwards();
    setupEventListeners();
    setInterval(renderCountdown, 1000);
}

// RENDERS
function renderDashboard() {
    const start = new Date(state.startDate);
    const now = new Date();
    const days = Math.floor((now - start) / (1000 * 3600 * 24));
    $('dashboard-date-msg').textContent = `Bugün bizim ${days}. günümüz. 💕`;
}

function renderCountdown() {
    const diff = new Date(state.countdown.date).getTime() - Date.now();
    $('cd-days').textContent = Math.max(0, Math.floor(diff / (1000*3600*24)));
    $('cd-hours').textContent = String(Math.max(0, Math.floor((diff % (1000*3600*24)) / (1000*3600)))).padStart(2,'0');
    $('cd-mins').textContent = String(Math.max(0, Math.floor((diff % (1000*3600)) / (1000*60)))).padStart(2,'0');
    $('cd-secs').textContent = String(Math.max(0, Math.floor((diff % (1000*60)) / 1000))).padStart(2,'0');
}

function renderMemories() {
    const list = $('memory-list');
    list.innerHTML = state.memories.length ? '' : '<p style="opacity:0.3; padding:20px; font-size:13px;">Henüz anı eklenmedi. ✨</p>';
    state.memories.forEach((m, i) => {
        const div = document.createElement('div');
        div.className = 'memory-piece';
        div.innerHTML = `<img src="${m.img}" loading="lazy"><p>${m.note || '💕'}</p>`;
        div.onclick = () => { if(confirm("Bu anıyı silelim mi?")) { state.memories.splice(i, 1); save(); renderMemories(); } };
        list.appendChild(div);
    });
}

function renderLetters() {
    const list = $('vault-list');
    list.innerHTML = state.letters.length ? '' : '<p style="opacity:0.3; padding:10px; font-size:12px;">Henüz mektup yok. ✉️</p>';
    const now = new Date();
    state.letters.forEach((l, i) => {
        const unlock = new Date(l.date); const locked = now < unlock;
        const div = document.createElement('div');
        div.style.cssText = "padding:16px; background:rgba(138,125,250,0.05); border-radius:20px; display:flex; align-items:center; gap:12px; cursor:pointer;";
        div.innerHTML = `<span style="font-size:24px;">${locked ? '🔒' : '✉️'}</span><div><p style="font-weight:600; font-size:14px; margin:0;">${l.title}</p><small style="opacity:0.5;">${locked ? unlock.toLocaleDateString() : 'Okumak için dokun'}</small></div>`;
        div.onclick = () => {
            if(locked) return alert("Hala kilitli... Sabret biriciğim. 💕");
            showModal(`<h3>💌 ${l.title}</h3><p style="white-space:pre-wrap; font-size:15px; margin-top:15px; color:#555;">${l.content}</p>`);
        };
        list.appendChild(div);
    });
}

function renderAwards() {
    const shelf = $('award-shelf');
    shelf.innerHTML = '';
    CONFIG.awards.forEach(a => {
        const has = state.awards.includes(a.id);
        shelf.innerHTML += `<div style="text-align:center; filter: ${has ? 'none' : 'grayscale(1) opacity(0.2)'};"><div style="font-size:24px;">${a.icon}</div><small style="font-size:8px; opacity:0.6;">${a.name}</small></div>`;
    });
}

// EVENTS
function setupEventListeners() {
    $('btn-quote').onclick = () => reveal(CONFIG.quotes[Math.floor(Math.random()*CONFIG.quotes.length)]);
    $('btn-date').onclick = () => reveal(CONFIG.dates[Math.floor(Math.random()*CONFIG.dates.length)]);
    
    $('fortune-actor').onclick = () => {
        vibrate(100);
        const today = new Date().toISOString().split('T')[0];
        if(localStorage.getItem('eth_f_date') === today) return reveal(localStorage.getItem('eth_f_txt'));
        const txt = CONFIG.fortunes[Math.floor(Math.random()*CONFIG.fortunes.length)];
        localStorage.setItem('eth_f_date', today);
        localStorage.setItem('eth_f_txt', txt);
        $('fortune-actor').classList.add('hidden');
        $('fortune-msg').textContent = txt;
        $('fortune-msg').classList.remove('hidden');
        unlockAward('f_1');
    };

    document.querySelectorAll('.mood-opt').forEach(m => {
        m.onclick = () => {
            vibrate(30);
            const mood = m.getAttribute('data-mood');
            $('mood-feedback').textContent = `Harika! Bugün ${mood} hissediyorsun. 💕`;
            unlockAward('m_1');
        };
    });

    $('upload-mem').onchange = (e) => {
        const f = e.target.files[0]; if(!f) return;
        const r = new FileReader(); r.onload = (ev) => {
            state.memories.push({ img: ev.target.result, note: prompt("Anı notu?") });
            save(); renderMemories();
        }; r.readAsDataURL(f);
    };

    $('edit-countdown-trigger').onclick = () => showModal(`
        <h3>Ayarlar</h3>
        <input id="in-cd-t" value="${state.countdown.title}" style="width:100%; padding:12px; margin:10px 0; border:1px solid #eee; border-radius:12px;">
        <input type="datetime-local" id="in-cd-d" value="${state.countdown.date}" style="width:100%; padding:12px; margin-bottom:15px; border:1px solid #eee; border-radius:12px;">
        <button class="liquid-btn" style="width:100%;" onclick="saveCd()">Kaydet</button>
    `);

    $('add-letter-trigger').onclick = () => showModal(`
        <h3>Mektup Yaz</h3>
        <input id="in-l-t" placeholder="Başlık" style="width:100%; padding:12px; margin:10px 0; border:1px solid #eee; border-radius:12px;">
        <textarea id="in-l-c" placeholder="İçerik" rows="4" style="width:100%; padding:12px; margin-bottom:10px; border:1px solid #eee; border-radius:12px;"></textarea>
        <input type="date" id="in-l-d" style="width:100%; padding:12px; margin-bottom:15px; border:1px solid #eee; border-radius:12px;">
        <button class="liquid-btn" style="width:100%;" onclick="saveLetter()">Mühürle</button>
    `);

    $('quiz-trigger').onclick = startQuiz;
}

// ACTIONS
function reveal(txt) {
    vibrate(30);
    $('reveal-area').classList.remove('hidden');
    $('reveal-text').textContent = txt;
    for(let i=0; i<8; i++) spawnHeart();
}

function spawnHeart() {
    const h = document.createElement('div');
    h.className = 'floating-heart';
    h.innerHTML = ['❤️','💖','✨'][Math.floor(Math.random()*3)];
    h.style.left = Math.random() * 100 + 'vw';
    h.style.fontSize = (Math.random()*20 + 15) + 'px';
    h.style.setProperty('--dur', (Math.random()*3 + 3) + 's');
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 6000);
}

function showModal(html) {
    $('modal-surface').innerHTML = html + `<button onclick="closeModal()" style="width:100%; margin-top:15px; background:none; border:none; color:#999; cursor:pointer;">Kapat</button>`;
    $('modal-base').classList.add('active');
}

window.closeModal = () => $('modal-base').classList.remove('active');

window.saveCd = () => {
    state.countdown = { title: $('in-cd-t').value, date: $('in-cd-d').value };
    save(); closeModal(); renderCountdown();
};

window.saveLetter = () => {
    state.letters.push({ title: $('in-l-t').value, content: $('in-l-c').value, date: $('in-l-d').value });
    save(); closeModal(); renderLetters(); unlockAward('l_1');
};

function startQuiz() {
    let current = 0, score = 0;
    const next = () => {
        if(current >= CONFIG.quiz.length) {
            showModal(`<h3>Test Bitti! 🏆</h3><p style="font-size:24px; font-weight:800; color:var(--c-primary);">${score}/${CONFIG.quiz.length}</p>`);
            unlockAward('q_1'); return;
        }
        const q = CONFIG.quiz[current];
        let html = `<h3>${q.q}</h3><div style="display:grid; gap:10px; margin-top:20px;">`;
        q.opts.forEach((o, i) => {
            html += `<button class="liquid-btn" style="background:#f0f0f5; color:#555; box-shadow:none;" onclick="handleAns(${i}, ${q.correct})">${o}</button>`;
        });
        showModal(html + `</div>`);
    };
    window.handleAns = (i, c) => { if(i===c) score++; current++; next(); vibrate(40); };
    next();
}

function unlockAward(id) { if(!state.awards.includes(id)) { state.awards.push(id); save(); renderAwards(); vibrate([100,50,100]); } }
function save() {
    localStorage.setItem('ethereal_cd', JSON.stringify(state.countdown));
    localStorage.setItem('ethereal_mem', JSON.stringify(state.memories));
    localStorage.setItem('ethereal_let', JSON.stringify(state.letters));
    localStorage.setItem('ethereal_awd', JSON.stringify(state.awards));
}

document.addEventListener('DOMContentLoaded', init);
