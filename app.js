// =============================================
// ETHEREAL CORE - V6 (YOUTUBE RADIO ENGINE)
// =============================================

const CONFIG = {
    quotes: ["Gülüşün dünyadaki en güzel manzara...", "Seninle geçen her saniye ömrümün en değerli anı.", "Gözlerine baktığımda tüm dertlerimi unutuyorum.", "Sen benim en güzel rüyam, en tatlı gerçeğimsin."],
    dates: ["Mutfağa girip tatlı yapmak 🧁", "Film gecesi 🍿", "Sahilde yürüyüş 🌙", "Dans edin 💃"],
    fortunes: ["Bugün ona sürpriz bir not yaz 💌", "Birlikte yeni bir akıl almaz macera ☕", "Ona sarıl ve bırakma 🤗"],
    affirmations: ["Bugün varlığın için binlerce şükür sebebim var. 💕", "Dünyanın en şanslı insanıyım... ✨", "Gülüşün kalbimin huzurlu limanı. 🌊"],
    secretWord: "Sonsuzluk",
    ytVideoId: "_fX-O0zV93o", // Kararlı Bir Türkçe Slow Mix (Gerekirse değiştirilebilir)
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

let ytPlayer = null;

const $ = (id) => document.getElementById(id);
const vibrate = (p=50) => navigator.vibrate && navigator.vibrate(p);

// Dinamik YouTube API Yükleme
function loadYT() {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// YouTube API Callback
window.onYouTubeIframeAPIReady = function() {
    ytPlayer = new YT.Player('yt-player', {
        height: '1',
        width: '1',
        videoId: CONFIG.ytVideoId,
        playerVars: {
            'autoplay': 0,
            'controls': 0,
            'disablekb': 1,
            'fs': 0,
            'rel': 0,
            'modestbranding': 1,
            'mute': 0
        },
        events: {
            'onReady': onPlayerReady,
            'onError': onPlayerError
        }
    });
};

function onPlayerReady(event) {
    ytPlayer.unMute();
    ytPlayer.setVolume(100);
    console.log("YouTube Radyo Hazır.");
}

function onPlayerError(event) {
    console.error("YouTube Hata:", event.data);
    $('song-name').textContent = "Bağlantı Hatası";
}

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
    const container = $('calendar-container'); if(!container) return;
    container.innerHTML = '';
    const now = new Date();
    const monthNames = ["OCAK","ŞUBAT","MART","NİSAN","MAYIS","HAZİRAN","TEMMUZ","AĞUSTOS","EYLÜL","EKİM","KASIM","ARALIK"];
    const monthNameSpan = $('cal-month-name'); if(monthNameSpan) monthNameSpan.textContent = `${monthNames[now.getMonth()]} ${now.getFullYear()}`;

    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    
    ["Pz","Pt","Sa","Ça","Pe","Cu","Ct"].forEach(d => container.innerHTML += `<div class="cal-day-name">${d}</div>`);
    for(let i=0; i<firstDay; i++) container.innerHTML += `<div></div>`;
    for(let d=1; d<=daysInMonth; d++) {
        const isToday = d === now.getDate();
        const dateStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
        const hasEvent = state.memories.some(m => m.date === dateStr) || state.letters.some(l => l.date === dateStr);
        container.innerHTML += `<div class="cal-cell ${isToday ? 'today' : ''} ${hasEvent ? 'has-event' : ''}">${d}</div>`;
    }
}

function renderMemories() {
    const list = $('memory-list'); if(!list) return;
    list.innerHTML = state.memories.length ? '' : '<p style="opacity:0.3; padding:20px; font-size:12px;">Henüz hiç anı yok. ✨</p>';
    state.memories.slice().reverse().forEach((m, i) => {
        const div = document.createElement('div');
        div.className = 'memory-piece';
        div.innerHTML = `<img src="${m.img}" loading="lazy"><p style="font-size:11px; margin-top:5px; text-align:center; font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${m.note || '💕'}</p>`;
        div.onclick = () => { if(confirm("Bu anıyı silmek istiyor musun?")) { state.memories.splice(state.memories.length - 1 - i, 1); save(); renderMemories(); renderCalendar(); } };
        list.appendChild(div);
    });
}

function renderLetters() {
    const list = $('vault-list'); if(!list) return;
    list.innerHTML = state.letters.length ? '' : '<p style="text-align:center; opacity:0.3; font-size:11px;">Mektubun yok. ✉️</p>';
    state.letters.forEach((l, i) => {
        const locked = new Date() < new Date(l.date);
        const div = document.createElement('div');
        div.style.cssText = "padding:12px; background:rgba(138,125,250,0.05); border-radius:15px; display:flex; align-items:center; gap:10px; cursor:pointer;";
        div.innerHTML = `<span>${locked ? '🔒' : '✉️'}</span><p style="font-weight:600; font-size:13px; margin:0;">${l.title}</p>`;
        div.onclick = (e) => { e.stopPropagation(); if(locked) return alert("Hala kilitli..."); showModal(`<h3>${l.title}</h3><p style="margin-top:10px; line-height:1.6;">${l.content}</p>`); };
        list.appendChild(div);
    });
}

function renderWishes() {
    const list = $('wish-list'); if(!list) return;
    list.innerHTML = '';
    state.wishes.forEach((w, i) => {
        const div = document.createElement('div');
        div.className = `wish-item ${w.c ? 'checked' : ''}`;
        div.innerHTML = `<div class="check-box">${w.c ? '✓' : ''}</div><p style="font-size:13px; margin:0;">${w.t}</p>`;
        div.onclick = () => { w.c = !w.c; save(); renderWishes(); vibrate(30); unlockAward('w_1'); };
        list.appendChild(div);
    });
}

function renderAwards() {
    const shelf = $('award-shelf'); if(!shelf) return;
    shelf.innerHTML = '';
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
    // YOUTUBE RADIO SYSTEM
    $('vinyl-trigger').onclick = () => {
        const disk = $('vinyl-disk');
        const statusText = $('song-name');
        
        vibrate(100);
        
        if(!ytPlayer || typeof ytPlayer.getPlayerState !== 'function') {
            statusText.textContent = "Hazırlanıyor...";
            setTimeout(() => { if($('vinyl-trigger')) $('vinyl-trigger').click(); }, 1500);
            return;
        }

        const playerState = ytPlayer.getPlayerState();
        
        if(playerState !== YT.PlayerState.PLAYING) {
            statusText.textContent = "Bağlanıyor...";
            ytPlayer.unMute();
            ytPlayer.setVolume(100);
            ytPlayer.playVideo();
            disk.classList.add('playing');
            statusText.textContent = "Keyifli Dinlemeler... 💕";
        } else {
            ytPlayer.pauseVideo();
            disk.classList.remove('playing');
            statusText.textContent = "Radyo Durduruldu";
        }
    };

    // BUTTON FIXES
    $('btn-quote').onclick = () => reveal(CONFIG.quotes[Math.floor(Math.random()*CONFIG.quotes.length)]);
    $('btn-date').onclick = () => reveal(CONFIG.dates[Math.floor(Math.random()*CONFIG.dates.length)]);

    // MOOD
    const moodCard = document.querySelector('[data-mood="mutlu"]').parentElement.parentElement;
    moodCard.onclick = () => showModal(`<h3>Ruh Halin?</h3><div style="display:flex; justify-content:space-around; font-size:32px; margin-top:15px;"><span onclick="setM('mutlu', '🥰')" style="cursor:pointer;">🥰</span><span onclick="setM('huzurlu', '😊')" style="cursor:pointer;">😊</span><span onclick="setM('normal', '😐')" style="cursor:pointer;">😐</span></div>`);
    window.setM = (t, i) => { $('mood-feedback').textContent = `Bugün ${t} hissediyorsun. ${i}`; vibrate(30); unlockAward('m_1'); closeModal(); };

    // MEMORY UPLOAD
    $('upload-mem').onchange = (e) => {
        const file = e.target.files[0];
        if(!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            const note = prompt("Bu anı için bir not eklemek ister misin?");
            try {
                state.memories.push({ img: ev.target.result, note: note, date: new Date().toISOString().split('T')[0] });
                save();
                renderMemories();
                renderCalendar();
            } catch (err) {
                alert("Hafıza doldu! Lütfen bazı eski anıları silerek yer aç.");
                state.memories.pop();
            }
        };
        reader.readAsDataURL(file);
    };

    // OTHERS
    $('add-letter-trigger').onclick = (e) => { e.stopPropagation(); showModal(`<h3>Mektup Yaz</h3><input id="in-l-t" placeholder="Başlık" style="width:100%; padding:12px; margin:10px 0;"><textarea id="in-l-c" placeholder="İçerik" rows="4" style="width:100%; padding:12px;"></textarea><input type="date" id="in-l-d" style="width:100%; margin:10px 0;"><button class="liquid-btn" style="width:100%;" onclick="saveLetter()">Mühürle</button>`); };
    $('add-wish-trigger').onclick = () => { const t = prompt("Bir hayal ekle:"); if(t) { state.wishes.push({ t, c: false }); save(); renderWishes(); } };
    $('haptic-heart').onclick = () => { vibrate([100,50,100]); for(let i=0; i<5; i++) spawnHeart(); };
    $('unlock-garden-btn').onclick = () => { if($('garden-pass').value.toLowerCase() === CONFIG.secretWord.toLowerCase()) { $('garden-lock').classList.add('hidden'); $('secret-content').classList.remove('hidden'); vibrate([100,100,100]); } else alert("Yanlış kelime..."); };
    document.querySelectorAll('.aura-btn').forEach(b => { b.onclick = (e) => { e.stopPropagation(); applyAura(b.getAttribute('data-a')); }});
    $('edit-countdown-trigger').onclick = () => showModal(`<h3>Ayarlar</h3><input id="in-cd-t" value="${state.countdown.title}" style="width:100%;"><input type="datetime-local" id="in-cd-d" value="${state.countdown.date}" style="width:100%; margin-top:10px;"><button class="liquid-btn" style="width:100%; margin-top:15px;" onclick="saveCd()">Kaydet</button>`);
}

function reveal(txt) {
    vibrate(30);
    const area = $('reveal-area');
    const text = $('reveal-text');
    area.classList.remove('hidden');
    text.textContent = txt;
    for(let i=0; i<8; i++) spawnHeart();
    area.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function spawnHeart() { const h = document.createElement('div'); h.className = 'floating-heart'; h.innerHTML = '❤️'; h.style.left = Math.random() * 100 + 'vw'; h.style.fontSize = '20px'; h.style.setProperty('--dur', '4s'); document.body.appendChild(h); setTimeout(() => h.remove(), 4000); }
function showModal(html) { $('modal-surface').innerHTML = html + `<button onclick="closeModal()" style="width:100%; margin-top:15px; background:none; border:none; color:#999; cursor:pointer;">Kapat</button>`; $('modal-base').classList.add('active'); }
window.closeModal = () => $('modal-base').classList.remove('active');
window.saveCd = () => { state.countdown = { title: $('in-cd-t').value, date: $('in-cd-d').value }; save(); closeModal(); renderCountdown(); };
window.saveLetter = () => { state.letters.push({ title: $('in-l-t').value, content: $('in-l-c').value, date: $('in-l-d').value }); save(); closeModal(); renderLetters(); renderCalendar(); };
function unlockAward(id) { if(!state.awards.includes(id)) { state.awards.push(id); save(); renderAwards(); vibrate([100,50,100]); } }
function save() {
    localStorage.setItem('ethereal_cd', JSON.stringify(state.countdown));
    localStorage.setItem('ethereal_mem', JSON.stringify(state.memories));
    localStorage.setItem('ethereal_let', JSON.stringify(state.letters));
    localStorage.setItem('ethereal_wish', JSON.stringify(state.wishes));
    localStorage.setItem('ethereal_awd', JSON.stringify(state.awards));
}

loadYT();
document.addEventListener('DOMContentLoaded', init);
