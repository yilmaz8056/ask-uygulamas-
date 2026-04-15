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

// =============================================
// QUIZ QUESTIONS
// =============================================
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

// =============================================
// DATA
// =============================================
let specialDays = JSON.parse(localStorage.getItem('loveApp_specialDays')) || [
    { title: "Tanışma Yıl Dönümümüz", date: "2026-10-15", icon: "fa-champagne-glasses" },
    { title: "Biriciğimin Doğum Günü", date: "2026-08-20", icon: "fa-cake-candles" },
    { title: "İlk Buluşma", date: "2026-05-10", icon: "fa-calendar-check" }
];

let memories = JSON.parse(localStorage.getItem('loveApp_memories')) || [];
let countdownData = JSON.parse(localStorage.getItem('loveApp_countdown')) || null;

// =============================================
// ELEMENTS
// =============================================
const introScreen = document.getElementById('intro-screen');
const appContainer = document.getElementById('main-app');
const envelope = document.getElementById('envelope');
const generateBtn = document.getElementById('generate-btn');
const quoteText = document.getElementById('quote-text');
const dateBtn = document.getElementById('date-btn');
const dateCard = document.getElementById('date-card');
const dateText = document.getElementById('date-text');
const specialDaysList = document.getElementById('special-days-list');
const bgMusic = document.getElementById('bg-music');
const playBtn = document.getElementById('play-pause-btn');
const playIcon = playBtn.querySelector('i');
const musicCard = document.querySelector('.music-card');

// =============================================
// 1. TOUCH HEARTS (Dokunmatik Kalpler)
// =============================================
document.body.addEventListener('click', (e) => {
    // Modal veya buton üstünde değilse kalp saç
    if (e.target.closest('.modal') || e.target.closest('button') || e.target.closest('input') || e.target.closest('label') || e.target.closest('.edit-icon') || e.target.closest('.envelope')) return;
    
    const layer = document.getElementById('touch-hearts-layer');
    const x = e.clientX;
    const y = e.clientY;

    // Ana kalp
    const heart = document.createElement('span');
    heart.className = 'touch-heart';
    heart.textContent = ['❤️','💕','💖','💗','💘'][Math.floor(Math.random()*5)];
    heart.style.left = (x - 11) + 'px';
    heart.style.top = (y - 11) + 'px';
    layer.appendChild(heart);
    setTimeout(() => heart.remove(), 1200);

    // Parıltılar
    for (let i = 0; i < 6; i++) {
        const spark = document.createElement('span');
        spark.className = 'touch-sparkle';
        spark.style.left = x + 'px';
        spark.style.top = y + 'px';
        spark.style.setProperty('--sx', (Math.random()*60-30) + 'px');
        spark.style.setProperty('--sy', (Math.random()*60-30) + 'px');
        spark.style.background = ['#ffd700','#ff4d6d','#ff8fab','#fff'][Math.floor(Math.random()*4)];
        layer.appendChild(spark);
        setTimeout(() => spark.remove(), 800);
    }

    if (navigator.vibrate) navigator.vibrate(30);
});

// =============================================
// BACKGROUND HEARTS
// =============================================
function createHeart() {
    const heart = document.createElement('i');
    heart.classList.add('fa-solid', 'fa-heart', 'floating-heart');
    const size = Math.random() * 20 + 10;
    heart.style.fontSize = `${size}px`;
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.animationDuration = `${Math.random() * 5 + 5}s`;
    document.getElementById('hearts-container').appendChild(heart);
    setTimeout(() => heart.remove(), 10000);
}
setInterval(createHeart, 600);

// =============================================
// APP ENTRY (Zarf Açılışı)
// =============================================
envelope.addEventListener('click', () => {
    if (navigator.vibrate) navigator.vibrate(100);
    introScreen.style.opacity = '0';
    setTimeout(() => {
        introScreen.style.visibility = 'hidden';
        appContainer.classList.add('active');
        renderSpecialDays();
        renderMemories();
        changeQuote();
        initCountdown();
        toggleMusic(true);
    }, 1000);
});

// =============================================
// SPECIAL DAYS
// =============================================
function renderSpecialDays() {
    const today = new Date();
    today.setHours(0,0,0,0);
    
    specialDaysList.innerHTML = `
        <div class="header-with-edit">
            <h3 style="margin: 0;">Önemli Günlerimiz 🗓️</h3>
            <i class="fa-solid fa-pen edit-icon" id="open-edit-modal" title="Tarihleri Düzenle"></i>
        </div>
    `;
    
    specialDays.forEach(day => {
        let targetDate = new Date(day.date);
        if (targetDate < today) targetDate.setFullYear(today.getFullYear() + 1);
        
        const diffTime = targetDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const countdownText = diffDays === 0 ? "BUGÜN! 🎉" : `${diffDays} Gün Kaldı`;

        const div = document.createElement('div');
        div.className = 'day-item';
        div.innerHTML = `
            <div class="day-info">
                <div class="day-icon"><i class="fa-solid ${day.icon}"></i></div>
                <div class="day-text">
                    <h5>${day.title}</h5>
                    <p>${targetDate.toLocaleDateString('tr-TR')}</p>
                </div>
            </div>
            <div class="day-countdown">${countdownText}</div>
        `;
        specialDaysList.appendChild(div);
    });

    document.getElementById('open-edit-modal').addEventListener('click', openEditModal);
}

// =============================================
// QUOTES & DATE IDEAS
// =============================================
function changeQuote() {
    quoteText.style.opacity = '0';
    if (navigator.vibrate) navigator.vibrate(50);
    setTimeout(() => {
        quoteText.textContent = quotes[Math.floor(Math.random() * quotes.length)];
        quoteText.style.opacity = '1';
        for(let i=0; i<5; i++) createHeart();
    }, 500);
}
generateBtn.addEventListener('click', changeQuote);

function changeDateIdea() {
    dateCard.style.display = 'block';
    dateText.style.opacity = '0';
    if (navigator.vibrate) navigator.vibrate(50);
    setTimeout(() => {
        dateText.textContent = dateIdeas[Math.floor(Math.random() * dateIdeas.length)];
        dateText.style.opacity = '1';
        for(let i=0; i<3; i++) createHeart();
    }, 500);
}
dateBtn.addEventListener('click', changeDateIdea);

// =============================================
// MUSIC PLAYER
// =============================================
let isPlaying = false;

function toggleMusic(forcePlay = false) {
    if (forcePlay || !isPlaying) {
        bgMusic.play().then(() => {
            isPlaying = true;
            playIcon.classList.remove('fa-play');
            playIcon.classList.add('fa-pause');
            musicCard.classList.add('playing');
        }).catch(() => console.log("Autoplay engellendi."));
    } else {
        bgMusic.pause();
        isPlaying = false;
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
        musicCard.classList.remove('playing');
    }
}
playBtn.addEventListener('click', () => toggleMusic());

// =============================================
// EDIT MODAL (Special Days)
// =============================================
const editModal = document.getElementById('edit-modal');
const editFormContainer = document.getElementById('edit-form-container');
const saveDatesBtn = document.getElementById('save-dates-btn');
const closeModalBtn = document.getElementById('close-modal-btn');

function openEditModal() {
    editFormContainer.innerHTML = '';
    specialDays.forEach((day, index) => {
        editFormContainer.innerHTML += `
            <div class="edit-row">
                <label>${day.title}</label>
                <input type="date" id="date-input-${index}" value="${day.date}">
            </div>
        `;
    });
    editModal.classList.add('active');
}

closeModalBtn.addEventListener('click', () => editModal.classList.remove('active'));

saveDatesBtn.addEventListener('click', () => {
    specialDays.forEach((day, index) => {
        const inputVal = document.getElementById(`date-input-${index}`).value;
        if(inputVal) day.date = inputVal;
    });
    localStorage.setItem('loveApp_specialDays', JSON.stringify(specialDays));
    editModal.classList.remove('active');
    renderSpecialDays();
});

// =============================================
// PROFILE PHOTO
// =============================================
const profilePicBtn = document.getElementById('profile-pic-btn');
const photoUpload = document.getElementById('photo-upload');
const userPhoto = document.getElementById('user-photo');
const fallbackIcon = document.getElementById('fallback-icon');

const savedPhoto = localStorage.getItem('loveApp_userPhoto');
if (savedPhoto) {
    userPhoto.src = savedPhoto;
    userPhoto.style.display = 'block';
    fallbackIcon.style.display = 'none';
}

profilePicBtn.addEventListener('click', () => photoUpload.click());

photoUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            userPhoto.src = event.target.result;
            userPhoto.style.display = 'block';
            fallbackIcon.style.display = 'none';
            localStorage.setItem('loveApp_userPhoto', event.target.result);
        };
        reader.readAsDataURL(file);
    }
});

// =============================================
// 2. POLAROID GALLERY (Anılarımız)
// =============================================
function renderMemories() {
    const gallery = document.getElementById('polaroid-gallery');
    const emptyMsg = document.getElementById('polaroid-empty');
    
    if (memories.length === 0) {
        gallery.innerHTML = '';
        const empty = document.createElement('div');
        empty.className = 'polaroid-empty';
        empty.id = 'polaroid-empty';
        empty.innerHTML = '<i class="fa-solid fa-images" style="font-size:2rem; opacity:0.5;"></i><p style="opacity:0.6; font-size:0.85rem;">Henüz anı eklenmedi</p>';
        gallery.appendChild(empty);
        return;
    }
    
    gallery.innerHTML = '';
    memories.forEach((mem, idx) => {
        const item = document.createElement('div');
        item.className = 'polaroid-item';
        item.innerHTML = `<img src="${mem.image}" alt="Anı"><p>${mem.note || '💕'}</p>`;
        item.addEventListener('click', () => openPolaroidDetail(idx));
        gallery.appendChild(item);
    });
}

document.getElementById('polaroid-upload').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const note = prompt("Bu anıya bir not yaz (opsiyonel):", "💕");
    
    const reader = new FileReader();
    reader.onload = (event) => {
        // Sıkıştırma
        const img = new Image();
        img.onload = () => {
            const MAX = 400;
            const scale = Math.min(1, MAX / img.width);
            const canvas = document.createElement('canvas');
            canvas.width = img.width * scale;
            canvas.height = img.height * scale;
            canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
            const compressed = canvas.toDataURL('image/jpeg', 0.6);
            
            memories.push({ image: compressed, note: note || '💕', date: Date.now() });
            localStorage.setItem('loveApp_memories', JSON.stringify(memories));
            renderMemories();
            if (navigator.vibrate) navigator.vibrate([50, 50, 50]);
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
});

// Polaroid Detail Modal
function openPolaroidDetail(idx) {
    const mem = memories[idx];
    document.getElementById('polaroid-detail-img').src = mem.image;
    document.getElementById('polaroid-detail-note').textContent = mem.note || '';
    document.getElementById('quiz-modal').classList.remove('active'); // güvenlik
    
    const modal = document.getElementById('polaroid-modal');
    modal.classList.add('active');
    
    document.getElementById('delete-polaroid-btn').onclick = () => {
        if (confirm("Bu anıyı silmek istediğine emin misin?")) {
            memories.splice(idx, 1);
            localStorage.setItem('loveApp_memories', JSON.stringify(memories));
            renderMemories();
            modal.classList.remove('active');
        }
    };
    
    document.getElementById('close-polaroid-btn').onclick = () => modal.classList.remove('active');
}

// =============================================
// 3. SENİ ÖZLEDİM! (WhatsApp Yönlendirme)
// =============================================
document.getElementById('miss-btn').addEventListener('click', () => {
    if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 200]);
    
    const missMessages = [
        "Şu an seni çok özledim... Yanımda olmanı istiyorum. ❤️",
        "Her saniye sensiz geçen zaman, kaybedilmiş bir an gibi... Seni çok seviyorum 💕",
        "Gözlerini kapatıp seni düşünüyorum... Keşke şu an yanımda olsaydın 🥺💗",
        "Bu mesaj otomatik değil, kalbimden geliyor: SENİ ÇOK ÖZLEDİM! 💘",
        "Dünyanın en güzel insanına: Seni özledim, seni seviyorum, sana sarılmak istiyorum 🤗💖"
    ];
    
    const msg = missMessages[Math.floor(Math.random() * missMessages.length)];
    
    if (navigator.share) {
        navigator.share({
            title: '💌 Sana Bir Mesaj Var',
            text: msg
        }).catch(() => {});
    } else {
        // WhatsApp fallback
        const encoded = encodeURIComponent(msg);
        window.open(`https://wa.me/?text=${encoded}`, '_blank');
    }
    
    // Kalp patlaması efekti
    for (let i = 0; i < 15; i++) createHeart();
});

// =============================================
// 4. AŞK TESTİ (Quiz)
// =============================================
let currentQuizIndex = 0;
let quizScore = 0;

document.getElementById('quiz-btn').addEventListener('click', startQuiz);

function startQuiz() {
    if (navigator.vibrate) navigator.vibrate(80);
    currentQuizIndex = 0;
    quizScore = 0;
    document.getElementById('quiz-result').style.display = 'none';
    document.getElementById('quiz-title').textContent = '💕 Aşk Testi';
    showQuizQuestion();
    document.getElementById('quiz-modal').classList.add('active');
}

function showQuizQuestion() {
    if (currentQuizIndex >= quizQuestions.length) {
        showQuizResult();
        return;
    }
    
    const q = quizQuestions[currentQuizIndex];
    document.getElementById('quiz-question').textContent = q.q;
    const optContainer = document.getElementById('quiz-options');
    optContainer.innerHTML = '';
    
    q.opts.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-opt-btn';
        btn.textContent = opt;
        btn.addEventListener('click', () => handleQuizAnswer(i, btn));
        optContainer.appendChild(btn);
    });
}

function handleQuizAnswer(selected, btn) {
    const q = quizQuestions[currentQuizIndex];
    const allBtns = document.querySelectorAll('.quiz-opt-btn');
    allBtns.forEach(b => b.style.pointerEvents = 'none');
    
    if (selected === q.correct) {
        btn.classList.add('correct');
        quizScore++;
        if (navigator.vibrate) navigator.vibrate(50);
    } else {
        btn.classList.add('wrong');
        allBtns[q.correct].classList.add('correct');
        if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
    }
    
    currentQuizIndex++;
    setTimeout(() => showQuizQuestion(), 1200);
}

function showQuizResult() {
    document.getElementById('quiz-question').textContent = '';
    document.getElementById('quiz-options').innerHTML = '';
    
    const resultDiv = document.getElementById('quiz-result');
    resultDiv.style.display = 'block';
    
    const total = quizQuestions.length;
    const pct = Math.round((quizScore / total) * 100);
    
    if (pct === 100) {
        resultDiv.innerHTML = `🎉 TAM PUAN! ${quizScore}/${total}<br><br>Sen beni dünyanın en iyi tanıyan insansın! Sonsuza dek seninle... 💍`;
        launchFireworks();
        if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 400]);
    } else if (pct >= 60) {
        resultDiv.innerHTML = `💖 ${quizScore}/${total} Doğru!<br><br>Harikasın! Beni çok iyi tanıyorsun... Ama hala öğreneceğin çok şey var 😘`;
    } else {
        resultDiv.innerHTML = `🥺 ${quizScore}/${total} Doğru...<br><br>Hmm biraz daha dikkat etmen lazım galiba... Ama olsun, seni yine de çok seviyorum! 💗`;
    }
}

document.getElementById('close-quiz-btn').addEventListener('click', () => {
    document.getElementById('quiz-modal').classList.remove('active');
});

// =============================================
// 5. GERİ SAYIM SAYACI (Countdown)
// =============================================
let countdownInterval = null;

function initCountdown() {
    const card = document.getElementById('countdown-card');
    
    if (!countdownData) {
        // İlk kez: düzenleme açılsın
        card.style.display = 'block';
        document.getElementById('countdown-title').textContent = 'Geri Sayım Ayarla ⏳';
        document.getElementById('cd-days').textContent = '-';
        document.getElementById('cd-hours').textContent = '-';
        document.getElementById('cd-mins').textContent = '-';
        document.getElementById('cd-secs').textContent = '-';
    } else {
        card.style.display = 'block';
        document.getElementById('countdown-title').textContent = countdownData.title || 'Kavuşmamıza';
        startCountdownTicker();
    }
}

function startCountdownTicker() {
    if (countdownInterval) clearInterval(countdownInterval);
    
    countdownInterval = setInterval(() => {
        if (!countdownData) return;
        const target = new Date(countdownData.date).getTime();
        const now = Date.now();
        const diff = target - now;
        
        if (diff <= 0) {
            document.getElementById('cd-days').textContent = '🎉';
            document.getElementById('cd-hours').textContent = '';
            document.getElementById('cd-mins').textContent = '';
            document.getElementById('cd-secs').textContent = '';
            document.getElementById('countdown-title').textContent = 'KAVUŞTUK! 🎉💖';
            clearInterval(countdownInterval);
            launchFireworks();
            return;
        }
        
        const d = Math.floor(diff / (1000*60*60*24));
        const h = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
        const m = Math.floor((diff % (1000*60*60)) / (1000*60));
        const s = Math.floor((diff % (1000*60)) / 1000);
        
        document.getElementById('cd-days').textContent = d;
        document.getElementById('cd-hours').textContent = String(h).padStart(2,'0');
        document.getElementById('cd-mins').textContent = String(m).padStart(2,'0');
        document.getElementById('cd-secs').textContent = String(s).padStart(2,'0');
    }, 1000);
}

// Countdown Edit
document.getElementById('countdown-edit-btn').addEventListener('click', () => {
    const modal = document.getElementById('countdown-modal');
    if (countdownData) {
        document.getElementById('cd-title-input').value = countdownData.title || '';
        document.getElementById('cd-date-input').value = countdownData.date || '';
    }
    modal.classList.add('active');
});

document.getElementById('save-countdown-btn').addEventListener('click', () => {
    const title = document.getElementById('cd-title-input').value || 'Kavuşmamıza';
    const date = document.getElementById('cd-date-input').value;
    if (!date) return alert("Lütfen bir hedef tarih seçin!");
    
    countdownData = { title, date };
    localStorage.setItem('loveApp_countdown', JSON.stringify(countdownData));
    document.getElementById('countdown-title').textContent = title;
    startCountdownTicker();
    document.getElementById('countdown-modal').classList.remove('active');
    if (navigator.vibrate) navigator.vibrate(100);
});

document.getElementById('cancel-countdown-btn').addEventListener('click', () => {
    document.getElementById('countdown-modal').classList.remove('active');
});

// =============================================
// FIREWORKS (Havai Fişek)
// =============================================
function launchFireworks() {
    const canvas = document.getElementById('fireworks-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const colors = ['#ff4d6d','#ffd700','#ff8fab','#a855f7','#10b981','#3b82f6','#f59e0b','#fff'];
    
    function createBurst(x, y) {
        for (let i = 0; i < 40; i++) {
            const angle = (Math.PI * 2 / 40) * i;
            const speed = Math.random() * 5 + 2;
            particles.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 3 + 1
            });
        }
    }
    
    // Birden fazla patlama noktası
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createBurst(
                Math.random() * canvas.width * 0.6 + canvas.width * 0.2,
                Math.random() * canvas.height * 0.4 + canvas.height * 0.1
            );
        }, i * 400);
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.05; // yerçekimi
            p.life -= 0.015;
            
            if (p.life <= 0) {
                particles.splice(i, 1);
                continue;
            }
            
            ctx.globalAlpha = p.life;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        }
        
        ctx.globalAlpha = 1;
        
        if (particles.length > 0) {
            requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    
    animate();
}
