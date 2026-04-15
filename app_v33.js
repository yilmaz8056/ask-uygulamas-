// =============================================
// ETHEREAL CORE - V33 (ELITE SOUNDCLOUD EDITION)
// =============================================

const CONFIG = {
    quotes: ["Gülüşün dünyadaki en güzel manzara...", "Seninle geçen her saniye ömrümün en değerli anı.", "Gözlerine baktığımda tüm dertlerimi unutuyorum.", "Sen benim en güzel rüyam, en tatlı gerçeğimsin."],
    dates: ["Mutfağa girip tatlı yapmak 🧁", "Film gecesi 🍿", "Sahilde yürüyüş 🌙", "Dans edin 💃"],
    fortunes: ["Bugün ona sürpriz bir not yaz 💌", "Birlikte yeni bir akıl almaz macera ☕", "Ona sarıl ve bırakma 🤗"],
    affirmations: ["Bugün varlığın için binlerce şükür sebebim var. 💕", "Dünyanın en şanslı insanıyım... ✨", "Gülüşün kalbimin huzurlu limanı. 🌊"],
    secretWord: "Sonsuzluk",
    defaultUrl: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1256339191&color=%23ff5500&auto_play=false",
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
    
    // Set default player src without autoplay
    const player = $('audio-player-frame');
    if(player) player.src = CONFIG.defaultUrl;
}

// RENDERS
function renderDashboard() {
    const days = Math.floor((new Date() - new Date(state.startDate)) / (1000 * 3600 * 24));
    const msg = $('dashboard-date-msg');
    if(msg) msg.textContent = `Bugün bizim ${days}. günümüz. 💕`;
}

function renderCountdown() {
    const diff = new Date(state.countdown.date).getTime() - Date.now();
    if($('cd-days')) $('cd-days').textContent = Math.max(0, Math.floor(diff / (1000*3600*24)));
    if($('cd-hours')) $('cd-hours').textContent = String(Math.max(0, Math.floor((diff % (1000*3600*24)) / (1000*3600)))).padStart(2,'0');
    if($('cd-mins')) $('cd-mins').textContent = String(Math.max(0, Math.floor((diff % (1000*3600)) / (1000*60)))).padStart(2,'0');
    if($('cd-secs')) $('cd-secs').textContent = String(Math.max(0, Math.floor((diff % (1000*60)) / 1000))).padStart(2,'0');
}

function renderDailyAffirmation() {
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const text = $('daily-affirmation-text');
    if(text) text.textContent = CONFIG.affirmations[dayOfYear % CONFIG.affirmations.length];
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
        const dateStr = `${now.getFullYear()}-${now.getMonth()+1}-${d}`;
        const hasEvent = state.memories.some(m => m.date === dateStr);
        container.innerHTML += `<div class="cal-cell ${isToday ? 'today' : ''} ${hasEvent ? 'has-event' : ''}">${d}</div>`;
    }
}

function renderMemories() {
    const list = $('memory-list'); if(!list) return;
    list.innerHTML = state.memories.length ? '' : '<p style="opacity:0.3; padding:20px; font-size:12px;">Henüz hiç anı yok. ✨</p>';
    state.memories.slice().reverse().forEach((m, i) => {
        const div = document.createElement('div');
        div.className = 'memory-piece';
        div.style.cssText = "flex: 0 0 120px; text-align:center;";
        div.innerHTML = `<img src="${m.img}" loading="lazy" style="width:100%; aspect-ratio:1; object-fit:cover; border-radius:15px; box-shadow:0 5px 15px rgba(0,0,0,0.1);"><p style="font-size:11px; margin-top:5px; font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; color:var(--c-primary);">${m.note || '💕'}</p>`;
        div.onclick = () => { if(confirm("Bu anıyı silmek istiyor musun?")) { state.memories.splice(state.memories.length - 1 - i, 1); save(); renderMemories(); renderCalendar(); } };
        list.appendChild(div);
    });
}

function renderLetters() {
    const list = $('vault-list'); if(!list) return;
    list.innerHTML = state.letters.length ? '' : '<p style="text-align:center; opacity:0.3; font-size:11px; padding:10px;">Henüz mektup mühürlenmedi. ✉️</p>';
    state.letters.forEach((l, i) => {
        const locked = new Date() < new Date(l.date);
        const div = document.createElement('div');
        div.style.cssText = "padding:12px; background:rgba(138,125,250,0.05); border-radius:15px; display:flex; align-items:center; gap:10px; cursor:pointer; border:1px solid rgba(138,125,250,0.1);";
        div.innerHTML = `<span>${locked ? '🔒' : '✉️'}</span><p style="font-weight:600; font-size:13px; margin:0; flex:1;">${l.title}</p><small style="font-size:9px; opacity:0.4;">${l.date.split('T')[0]}</small>`;
        div.onclick = (e) => { e.stopPropagation(); if(locked) return alert("Bu mektubun vaktine henüz var..."); showModal(`<h3>${l.title}</h3><p style="margin-top:15px; line-height:1.6; font-size:14px; color:#555;">${l.content}</p>`); };
        list.appendChild(div);
    });
}

function renderWishes() {
    const list = $('wish-list'); if(!list) return;
    list.innerHTML = '';
    state.wishes.forEach((w, i) => {
        const div = document.createElement('div');
        div.style.cssText = `padding:12px; margin-bottom:10px; background:${w.c ? 'rgba(138,125,250,0.1)' : 'rgba(255,255,255,0.4)'}; border-radius:15px; display:flex; align-items:center; gap:12px; cursor:pointer; transition:0.3s;`;
        div.innerHTML = `<div style="width:20px; height:20px; border:2px solid var(--c-primary); border-radius:5px; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:900; color:var(--c-primary);">${w.c ? '✓' : ''}</div><p style="font-size:13px; margin:0; font-weight:600; text-decoration: ${w.c ? 'line-through' : 'none'}; opacity: ${w.c ? 0.5 : 1};">${w.t}</p>`;
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
    document.querySelectorAll('.aura-btn').forEach(b => { 
        if(b.getAttribute('data-a') === aura) {
             b.style.opacity = '1';
             b.style.transform = 'scale(1.2)';
        } else {
             b.style.opacity = '0.5';
             b.style.transform = 'scale(1)';
        }
    });
}

function toggleMusicDrawer(show = true) {
    const drawer = $('music-drawer');
    const haze = $('drawer-haze');
    if (show) {
        drawer.classList.add('active');
        haze.classList.add('active');
        vibrate(100);
    } else {
        drawer.classList.remove('active');
        haze.classList.remove('active');
    }
}

function switchChannel(url) {
    vibrate(50);
    const player = $('audio-player-frame');
    if(player) {
        $('yt-status').textContent = "Elite Kanal Hazırlanıyor... ✨";
        player.src = ""; // Clear for refreshing
        setTimeout(() => {
            player.src = url;
            $('vinyl-disk').classList.add('playing');
            $('song-name').textContent = "Çalıyor... 💕";
            $('yt-status').textContent = "Müzik Yayında. ✨";
        }, 100);
    }
}

function setupEventListeners() {
    $('vinyl-trigger').onclick = () => toggleMusicDrawer(true);
    $('drawer-haze').onclick = () => toggleMusicDrawer(false);
    $('close-drawer-btn').onclick = () => toggleMusicDrawer(false);

    document.querySelectorAll('.station-btn').forEach(btn => {
        if(btn.dataset.url) {
            btn.onclick = () => switchChannel(btn.dataset.url);
        }
    });

    $('stop-btn').onclick = () => { 
        const player = $('audio-player-frame');
        if(player) player.src = "";
        $('vinyl-disk').classList.remove('playing');
        $('song-name').textContent = "Müzik Durduruldu";
        $('yt-status').textContent = "Müzik Hazır. ✨";
    };

    $('btn-quote').onclick = () => reveal(CONFIG.quotes[Math.floor(Math.random()*CONFIG.quotes.length)]);
    $('btn-date').onclick = () => reveal(CONFIG.dates[Math.floor(Math.random()*CONFIG.dates.length)]);

    document.querySelectorAll('.mood-opt').forEach(opt => {
        opt.onclick = () => {
            const mood = opt.getAttribute('data-mood');
            const emoji = opt.textContent;
            $('mood-feedback').textContent = `Bugün kendimi ${mood} hissediyorum ${emoji}`;
            vibrate(30);
            unlockAward('f_1');
        };
    });

    $('upload-mem').onchange = (e) => {
        const file = e.target.files[0];
        if(!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            const note = prompt("Bu anı için bir not eklemek ister misin?");
            try {
                state.memories.push({ 
                    img: ev.target.result, 
                    note: note, 
                    date: new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate() 
                });
                save();
                renderMemories();
                renderCalendar();
            } catch (err) {
                alert("Hafıza doldu! Lütfen bazı eski anıları silerek yer aç.");
            }
        };
        reader.readAsDataURL(file);
    };

    $('add-letter-trigger').onclick = () => { 
        showModal(`<h3>Mektup Yaz</h3><input id="in-l-t" placeholder="Başlık" style="width:100%; padding:12px; margin:10px 0; border-radius:10px; border:1px solid #ddd;"><textarea id="in-l-c" placeholder="İçerik..." rows="4" style="width:100%; padding:12px; border-radius:10px; border:1px solid #ddd;"></textarea><input type="date" id="in-l-d" style="width:100%; margin:10px 0; padding:10px; border-radius:10px; border:1px solid #ddd;"><button class="liquid-btn" style="width:100%;" onclick="saveLetter()">Mühürle</button>`); 
    };

    $('add-wish-trigger').onclick = () => { 
        const t = prompt("Bir hayal ekle:"); 
        if(t) { state.wishes.push({ t, c: false }); save(); renderWishes(); } 
    };

    $('haptic-heart').onclick = () => { 
        vibrate([100,50,100]); 
        for(let i=0; i<8; i++) spawnHeart(); 
    };

    $('unlock-garden-btn').onclick = () => { 
        if($('garden-pass').value.toLowerCase() === CONFIG.secretWord.toLowerCase()) { 
            $('garden-lock').classList.add('hidden'); 
            $('secret-content').classList.remove('hidden'); 
            vibrate([100,100,100]); 
            $('secret-msg-dynamic').textContent = "Kalbimin en derin yerindesin...";
        } else alert("Yanlış anahtar kelime..."); 
    };

    document.querySelectorAll('.aura-btn').forEach(b => { 
        b.onclick = (e) => { e.stopPropagation(); applyAura(b.getAttribute('data-a')); }
    });

    $('edit-countdown-trigger').onclick = () => {
        showModal(`<h3>Geri Sayım</h3><input id="in-cd-t" value="${state.countdown.title}" style="width:100%; padding:10px; margin-bottom:10px; border:1px solid #ddd; border-radius:10px;"><input type="datetime-local" id="in-cd-d" value="${state.countdown.date}" style="width:100%; padding:10px; border:1px solid #ddd; border-radius:10px;"><button class="liquid-btn" style="width:100%; margin-top:15px;" onclick="saveCd()">Kaydet</button>`);
    };
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

function spawnHeart() { 
    const h = document.createElement('div'); 
    h.className = 'floating-heart'; 
    h.innerHTML = '❤️'; 
    h.style.left = Math.random() * 100 + 'vw'; 
    h.style.fontSize = (Math.random() * 20 + 20) + 'px'; 
    h.style.setProperty('--dur', (Math.random() * 2 + 2) + 's'); 
    document.body.appendChild(h); 
    setTimeout(() => h.remove(), 4000); 
}

function showModal(html) { 
    $('modal-surface').innerHTML = html + `<button onclick="closeModal()" style="width:100%; margin-top:15px; background:none; border:none; color:#999; cursor:pointer; font-weight:700;">Kapat</button>`; 
    $('modal-base').classList.add('active'); 
}

window.closeModal = () => $('modal-base').classList.remove('active');
window.saveCd = () => { state.countdown = { title: $('in-cd-t').value, date: $('in-cd-d').value }; save(); closeModal(); renderCountdown(); };
window.saveLetter = () => { 
    const t = $('in-l-t').value;
    const c = $('in-l-c').value;
    const d = $('in-l-d').value;
    if(!t || !c || !d) return alert("Lütfen tüm alanları doldur.");
    state.letters.push({ title: t, content: c, date: d }); 
    save(); closeModal(); renderLetters(); renderCalendar(); 
};

function unlockAward(id) { if(!state.awards.includes(id)) { state.awards.push(id); save(); renderAwards(); vibrate([100,50,100]); } }

function save() {
    localStorage.setItem('ethereal_cd', JSON.stringify(state.countdown));
    localStorage.setItem('ethereal_mem', JSON.stringify(state.memories));
    localStorage.setItem('ethereal_let', JSON.stringify(state.letters));
    localStorage.setItem('ethereal_wish', JSON.stringify(state.wishes));
    localStorage.setItem('ethereal_awd', JSON.stringify(state.awards));
}

document.addEventListener('DOMContentLoaded', init);
