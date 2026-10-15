/* ===== EDIT BAGIAN INI ===== */
const CONFIG = {
  name: "Gueva Ocea Fitriana",
  birthday: { year: 2026, month: 10, day: 17 }, // bulan 1-12
  song: { title: "Shape Of My Heart ", artist: "Lagunya indah kyak kamu" },
  hero: "assets/images/hero.jpeg",
  bgmFile: "", // opsional musik latar landing page, mis. "assets/music/backsound.mp3". Kosong = musik bawaan
  photos: [
    { src: "assets/images/foto1.jpeg", alt: "Foto 1", cap: "Haii Cantikk<3", q: "Janji harus lebih bahagia lagi ya?" },
    { src: "assets/images/foto2.jpeg", alt: "Foto 2", cap: "arrghh CANTIKK BNGTT🙈", q: "Janji tetap senyum walau lagi capek?" },
    { src: "assets/images/foto3.jpeg", alt: "Foto 3", cap: "LAHH KOK MAKIN CANTIKK SIHH🫵🏻😭", q: "Janji nggak lupa istirahat dan makan yang enak?" },
    { src: "assets/images/foto4.jpeg", alt: "Foto 4", cap: "ini manusia apa bidadari nyasar?? 🫵🏻😜", q: "Janji percaya sama diri sendiri, kamu itu hebat?" },
    { src: "assets/images/foto5.jpeg", alt: "Foto 5", cap: "MASYAALLAH, INI MAH PRODUK GAGAL JELEK😭", q: "Janji berani mengejar mimpi-mimpimu?" },
    { src: "assets/images/foto6.jpeg", alt: "Foto 6", cap: "imuutt cekalii...😭🎀", q: "Janji nggak terlalu keras sama diri sendiri?" },
    { src: "assets/images/foto7.jpeg", alt: "Foto 7", cap: "resmi kepala dua, tapi lucunya masih nomor satu😆", q: "Janji menikmati usia 20 ini sepenuh hati?" }
  ],
  wrong: [
    "Eits, jawabannya harus “iya” dong 😆",
    "Tombol “Tidak” lagi error nih, coba “Iya” aja ya 🙈",
    "Hmm, jarimu kepleset ya? Coba sekali lagi 😜",
    "Pilihan itu tidak tersedia di usia 20 🎂",
    "Aku pura-pura nggak lihat… jawab “Iya” ya 🥺"
  ],
  gifts: [
    { title: "A Little Note", icon: "💌", body: "Kamu punya cara yang hangat dalam memperlakukan orang lain, dan itu terasa. Terima kasih sudah menjadi orang yang menyenangkan untuk diajak bicara." },
    { title: "For Your New Chapter", icon: "🌸", body: "Semoga usia 20 membawamu ke tempat-tempat baik, pertemuan yang tulus, dan kesempatan untuk belajar hal-hal yang kamu cintai." },
    { title: "A Little Reminder", icon: "✨", body: "Kamu layak mendapatkan hal-hal baik, ruang untuk bertumbuh, dan kebahagiaan yang sederhana. Jangan lupa itu, ya." }
  ]
};
/* ===== SELESAI ===== */

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const PH = "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400"><rect width="300" height="400" fill="#f6d9de"/><text x="150" y="205" text-anchor="middle" font-family="Georgia" font-size="22" fill="#a8455e">foto menyusul ✦</text></svg>');
function makeImg(src, alt) { const i = new Image(); i.alt = alt; i.loading = "lazy"; i.onerror = () => { i.onerror = null; i.src = PH; }; i.src = src; return i; }
const muteBtn = $("#muteBtn"), audio = $("#audio");
let songStarted = false;

/* ---------- Scene controller ---------- */
const scenes = $$(".scene");
let cur = 0, busy = false;
function updateProgress() {
  $("#progText").textContent = String(cur + 1).padStart(2, "0") + " / " + String(scenes.length).padStart(2, "0");
  $("#barFill").style.width = ((cur + 1) / scenes.length * 100) + "%";
  $("#backBtn").disabled = cur === 0;
}
function goToScene(n) {
  if (busy || n < 0 || n >= scenes.length || n === cur) return;
  busy = true;
  const out = scenes[cur]; out.classList.add("out");
  setTimeout(() => {
    out.classList.remove("active", "out"); cur = n;
    scenes[cur].classList.add("active"); updateProgress(); window.scrollTo(0, 0);
    const h = scenes[cur].querySelector("h1,h2"); if (h) h.focus({ preventScroll: true });
    if (cur === 2) calendarIntro();
    if (cur === 6) finale();
    busy = false;
  }, reduce ? 0 : 260);
}
const nextScene = () => goToScene(cur + 1);
$$("[data-next]").forEach(b => b.addEventListener("click", nextScene));
$("#backBtn").addEventListener("click", () => goToScene(cur - 1));
$$("[data-name]").forEach(e => e.textContent = CONFIG.name);
$("#songTitle").textContent = CONFIG.song.title;
$("#songArtist").textContent = CONFIG.song.artist;

/* ---------- Modal + efek ---------- */
const modal = $("#modal"); let lastFocus = null;
function openModal(title, node) {
  lastFocus = document.activeElement; $("#mTitle").textContent = title || "";
  $("#mBody").replaceChildren(node); modal.hidden = false; $("#mClose").focus();
}
function closeModal() { modal.hidden = true; if (lastFocus) lastFocus.focus(); }
$("#mClose").addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape" && !modal.hidden) closeModal(); });
function burst(el, list) {
  if (reduce) return;
  const r = el.getBoundingClientRect(), em = list || ["🎀", "🌸", "⭐", "🧁", "💖", "✨"];
  for (let i = 0; i < 10; i++) {
    const s = document.createElement("span"); s.className = "fly"; s.textContent = em[i % em.length];
    s.style.cssText = "left:" + (r.left + r.width / 2) + "px;top:" + (r.top + r.height / 2) + "px;--dx:" + ((Math.random() - .5) * 280) + "px;--dy:" + (-60 - Math.random() * 180) + "px";
    s.addEventListener("animationend", () => s.remove()); document.body.append(s);
  }
}

/* ---------- Scene 1: amplop ---------- */
$("#openGift").addEventListener("click", e => {
  $("#env").classList.add("open"); e.currentTarget.hidden = true; $("#letsBegin").hidden = false; confetti(30);
});
$("#letsBegin").addEventListener("click", nextScene);

/* ---------- Kue (dipakai di scene 2 dan finale) ---------- */
function buildCake(n, interactive, onSnuff) {
  const cake = document.createElement("div"); cake.className = "cake";
  const rows = document.createElement("div"); rows.className = "crows";
  const cols = ["#d9a3ae", "#a8455e", "#8cc0de", "#f2c14e", "#9fd3a5"]; let idx = 0;
  const layout = [7, 7, n - 14];
  layout.forEach(cnt => {
    const row = document.createElement("div"); row.className = "crow";
    for (let i = 0; i < cnt; i++) {
      idx++;
      const c = document.createElement(interactive ? "button" : "span"); c.className = "candle";
      c.style.setProperty("--d", (Math.random() * .6).toFixed(2) + "s"); c.style.setProperty("--c", cols[idx % 5]);
      c.innerHTML = '<i class="flame"></i><b class="stick"></b>';
      if (interactive) { c.setAttribute("aria-label", "Padamkan lilin " + idx + " dari " + n); c.addEventListener("click", () => onSnuff(c), { once: true }); }
      row.append(c);
    }
    rows.append(row);
  });
  cake.append(rows);
  ["tier tA", "tier tB", "plate"].forEach(k => { const d = document.createElement("div"); d.className = k; cake.append(d); });
  return cake;
}
let blown = 0;
$("#cakeBox").append(buildCake(20, true, c => {
  c.classList.add("out"); c.disabled = true; blown++; Sound.pop();
  const p = document.createElement("i"); p.className = "puff"; c.append(p);
  setTimeout(() => p.remove(), 900);
  const left = 20 - blown;
  $("#cakeCount").textContent = left ? "Sisa " + left + " lilin" : "Semua lilin sudah padam! 🎉";
  if (!left) {
    $("#cakeMsg").textContent = "Permintaanmu sudah terkirim ke langit ✨ Semoga terkabul semua.";
    $("#cakeNext").disabled = false; confetti(100); burst($("#cakeBox"));
  }
}));

/* ---------- Scene 3: lagu + kalender ---------- */
const MONTHS = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
(function buildCalendar() {
  const { year, month, day } = CONFIG.birthday, cal = $("#cal");
  const lead = (new Date(year, month - 1, 1).getDay() + 6) % 7, total = new Date(year, month, 0).getDate();
  cal.innerHTML = '<h3></h3><div class="wd"></div><div class="days"></div>';
  $("h3", cal).textContent = MONTHS[month - 1] + " " + year;
  ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].forEach(d => { const s = document.createElement("span"); s.textContent = d; $(".wd", cal).append(s); });
  for (let i = 0; i < lead; i++) $(".days", cal).append(document.createElement("span"));
  for (let d = 1; d <= total; d++) {
    const s = document.createElement("span"); s.className = "day" + (d === day ? " bday" : ""); s.textContent = d;
    if (d === day) s.setAttribute("aria-label", "Tanggal " + d + ", hari ulang tahunmu");
    $(".days", cal).append(s);
  }
  $("#calNote").textContent = day + " " + MONTHS[month - 1] + " " + year + " — di ultah kali ini harus inget moment ini yaa 🎂";
})();
function calendarIntro() { const b = $(".bday"); if (b) { b.classList.remove("hit"); void b.offsetWidth; b.classList.add("hit"); } }
const playBtn = $("#playBtn"), msg = $("#audioMsg"), fmt = s => isFinite(s) ? Math.floor(s / 60) + ":" + String(Math.floor(s % 60)).padStart(2, "0") : "--:--";
audio.addEventListener("error", () => { msg.textContent = "Lagunya belum tersedia, tapi kamu tetap bisa lanjut ya."; $("#songNext").disabled = false; });
audio.addEventListener("loadedmetadata", () => $("#tDur").textContent = fmt(audio.duration));
audio.addEventListener("timeupdate", () => {
  $("#tNow").textContent = fmt(audio.currentTime);
  $("#seekFill").style.width = (audio.duration ? audio.currentTime / audio.duration * 100 : 0) + "%";
});
audio.addEventListener("play", () => {
  playBtn.textContent = "❚❚"; playBtn.setAttribute("aria-label", "Jeda lagu");
  if (!songStarted) { songStarted = true; Sound.stop(); $("#songNext").disabled = false; $(".bday").classList.add("on"); confetti(60); burst($(".bday")); }
  sync();
});
audio.addEventListener("pause", () => { playBtn.textContent = "▶"; playBtn.setAttribute("aria-label", "Putar lagu"); sync(); });
playBtn.addEventListener("click", () => {
  msg.textContent = "";
  if (audio.paused) { const r = audio.play(); if (r && r.catch) r.catch(() => { msg.textContent = "Lagu tidak bisa diputar. Coba ketuk lagi."; }); }
  else audio.pause();
});

/* ---------- Scene 4: galeri + kuis ---------- */
const answered = new Set();
function refreshGallery() {
  $("#galCount").textContent = answered.size + " / " + CONFIG.photos.length + " janji tercatat";
  $("#galNext").disabled = answered.size < CONFIG.photos.length;
}
CONFIG.photos.forEach((p, i) => {
  const b = document.createElement("button");
  b.setAttribute("aria-label", "Buka foto dan jawab: " + p.q);
  b.append(makeImg(p.src, p.alt));
  const s = document.createElement("span"); s.textContent = p.cap; b.append(s);
  const t = document.createElement("em"); t.className = "tick"; t.textContent = "💗"; t.setAttribute("aria-hidden", "true"); b.append(t);
  b.addEventListener("click", () => {
    const w = document.createElement("div"); w.className = "quiz"; w.append(makeImg(p.src, p.alt));
    const q = document.createElement("p"); q.className = "q"; q.textContent = p.q; w.append(q);
    if (answered.has(i)) { const d = document.createElement("p"); d.textContent = "Janjimu sudah tercatat 💗"; w.append(d); openModal("", w); return; }
    const row = document.createElement("div"); row.className = "qrow";
    const yes = document.createElement("button"); yes.className = "btn"; yes.textContent = "Iya 💗";
    const no = document.createElement("button"); no.className = "btn ghost"; no.textContent = "Tidak";
    const oops = document.createElement("div"); oops.className = "oops"; oops.setAttribute("role", "alert");
    row.append(yes, no); w.append(row, oops);
    let n = 0;
    no.addEventListener("click", () => {
      n++; Sound.pop(); oops.textContent = CONFIG.wrong[(n - 1) % CONFIG.wrong.length];
      oops.classList.remove("shake"); void oops.offsetWidth; oops.classList.add("shake");
      yes.style.transform = "scale(" + (1 + Math.min(n, 5) * .08) + ")"; no.style.transform = "scale(" + Math.max(.75, 1 - n * .06) + ")";
    });
    yes.addEventListener("click", () => {
      answered.add(i); b.classList.add("done"); refreshGallery(); Sound.pop(); closeModal(); confetti(40); burst(b, ["💗", "✨", "🌸"]);
    });
    openModal("", w);
  });
  $("#gallery").append(b);
});

/* ---------- Scene 5: hadiah ---------- */
const opened = new Set();
CONFIG.gifts.forEach((g, i) => {
  const b = document.createElement("button"); b.className = "gift"; b.style.setProperty("--d", (i * .4) + "s");
  b.innerHTML = '<span class="gbox" aria-hidden="true"><i class="lid"></i><i class="gbody"></i><em class="face">ᵔᴗᵔ</em></span><span class="gtxt"><strong></strong><small></small></span><span class="bubble" aria-hidden="true">ketuk aku!</span>';
  $("strong", b).textContent = g.title;
  const sm = $("small", b), st = () => sm.textContent = opened.has(i) ? "Sudah dibuka. Ketuk untuk baca lagi." : "Masih terkunci, ketuk untuk membuka.";
  st();
  b.addEventListener("click", () => {
    const first = !opened.has(i); opened.add(i); b.classList.add("opened"); $(".face", b).textContent = "^o^"; st();
    $("#giftCount").textContent = opened.size + " of 3 surprises opened"; $("#giftContinue").disabled = opened.size < CONFIG.gifts.length;
    const w = document.createElement("div"); w.className = "pop-card";
    w.innerHTML = '<div class="big">' + g.icon + '</div><p></p>'; $("p", w).textContent = g.body;
    openModal(g.title, w); Sound.pop(); burst(b); if (first) confetti(35);
  });
  $("#gifts").append(b);
});

/* ---------- Scene 6: surat ---------- */
const panels = $$(".panel"); let pi = 0;
function showPanel() {
  panels.forEach((p, k) => p.classList.toggle("show", k === pi));
  $("#letterCount").textContent = (pi + 1) + " / " + panels.length;
  $("#letterNext").textContent = pi === panels.length - 1 ? "One last surprise..." : "Next";
}
$("#letterNext").addEventListener("click", () => {
  if (pi < panels.length - 1) { pi++; showPanel(); confetti(30); burst($("#letter"), ["🌸", "🎀", "✨", "💖"]); Sound.pop(); } else nextScene();
});
showPanel();

/* ---------- Scene 7: finale (kue + buket) ---------- */
$("#heroImg").replaceWith(Object.assign(makeImg(CONFIG.hero, "Foto utama"), { id: "heroImg", className: "hero" }));
$("#finCake").append(buildCake(20, false));
(function bouquet() {
  const fl = (x, y, c) => [0, 72, 144, 216, 288].map(a => '<circle cx="' + (x + 9 * Math.cos(a * Math.PI / 180)).toFixed(1) + '" cy="' + (y + 9 * Math.sin(a * Math.PI / 180)).toFixed(1) + '" r="8" fill="' + c + '"/>').join("") + '<circle cx="' + x + '" cy="' + y + '" r="5" fill="#f7d774"/>';
  const pts = [[60, 26, "#d9a3ae"], [34, 46, "#f6c4cf"], [86, 46, "#a8455e"], [48, 72, "#e8b1bc"], [74, 72, "#f9d9a8"]];
  $("#bouquet").innerHTML = '<svg viewBox="0 0 120 170" role="img" aria-label="Buket bunga"><g class="sway">' +
    pts.map(p => '<path d="M60 150 L' + p[0] + ' ' + p[1] + '" stroke="#6a9a6a" stroke-width="3" fill="none"/>').join("") +
    '<ellipse cx="38" cy="96" rx="12" ry="5" fill="#8cbf8c" transform="rotate(-30 38 96)"/><ellipse cx="82" cy="96" rx="12" ry="5" fill="#8cbf8c" transform="rotate(30 82 96)"/>' +
    pts.map(p => '<g class="bl">' + fl(p[0], p[1], p[2]) + '</g>').join("") +
    '<polygon points="26,100 94,100 68,158 52,158" fill="#f6d9de" stroke="#d9a3ae" stroke-width="2"/><circle cx="52" cy="122" r="7" fill="#a8455e"/><circle cx="68" cy="122" r="7" fill="#a8455e"/><circle cx="60" cy="122" r="5" fill="#8a2f47"/></g></svg>';
  const sp = $("#finSparks");
  for (let i = 0; i < 10; i++) { const s = document.createElement("span"); s.textContent = i % 2 ? "✦" : "✿"; s.style.cssText = "left:" + (Math.random() * 94) + "%;top:" + (Math.random() * 90) + "%;animation-delay:" + (Math.random() * 2) + "s"; sp.append(s); }
})();
function finale() {
  const s = $("#stage"); s.classList.remove("go"); void s.offsetWidth; s.classList.add("go");
  confetti(90); setTimeout(() => confetti(70), 1500);
}
$("#replayBtn").addEventListener("click", finale);
$("#restartBtn").addEventListener("click", () => goToScene(0));
$("#shareBtn").addEventListener("click", async () => {
  const m = $("#shareMsg"), url = location.href;
  try {
    if (navigator.share) await navigator.share({ title: "Chapter 20", text: "Happy 20th Birthday!", url });
    else { await navigator.clipboard.writeText(url); m.textContent = "Link disalin."; }
  } catch (e) { if (e.name !== "AbortError") m.textContent = "Tidak bisa membagikan. Salin link dari address bar."; }
});

/* ---------- Confetti (ringan, terbatas) ---------- */
const cv = $("#confetti"), ctx = cv.getContext("2d");
let parts = [], raf = 0;
function size() { cv.width = innerWidth; cv.height = innerHeight; }
addEventListener("resize", size); size();
function confetti(n) {
  if (reduce) return;
  const colors = ["#f6d9de", "#d9a3ae", "#a8455e", "#f2c14e", "#e8b1bc", "#8cc0de"];
  for (let i = 0; i < Math.min(n, 100) && parts.length < 150; i++)
    parts.push({ x: Math.random() * cv.width, y: -10 - Math.random() * 80, vx: (Math.random() - .5) * 2, vy: 2 + Math.random() * 3, r: 4 + Math.random() * 5, a: Math.random() * 6, c: colors[i % colors.length], life: 0 });
  if (!raf) raf = requestAnimationFrame(tick);
}
function tick() {
  ctx.clearRect(0, 0, cv.width, cv.height);
  parts = parts.filter(p => p.y < cv.height + 20 && p.life < 260);
  parts.forEach(p => { p.x += p.vx; p.y += p.vy; p.a += .1; p.life++; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a); ctx.fillStyle = p.c; ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 1.6); ctx.restore(); });
  raf = parts.length ? requestAnimationFrame(tick) : 0;
  if (!raf) ctx.clearRect(0, 0, cv.width, cv.height);
}

/* ---------- Suara: hitung mundur, fanfare, musik latar ---------- */
const Sound = (() => {
  let ac, master, bgm, timer, bar = 0, nextT = 0, playing = false, fileEl = null;
  const chords = [[261.63, 329.63, 392], [196, 246.94, 293.66], [220, 261.63, 329.63], [174.61, 220, 261.63]];
  function init() {
    if (ac) { if (ac.state === "suspended") ac.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
    ac = new AC(); master = ac.createGain(); master.gain.value = .9; master.connect(ac.destination);
  }
  function tone(f, t, d, type, v, dest) {
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = type; o.frequency.value = f;
    g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(v, t + .02); g.gain.exponentialRampToValueAtTime(.0001, t + d);
    o.connect(g); g.connect(dest || master); o.start(t); o.stop(t + d + .05);
  }
  const beep = () => { init(); if (ac) tone(523.25, ac.currentTime, .25, "square", .07); };
  function fanfare() {
    if (!ac) return; const t = ac.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, t + i * .09, .9, "triangle", .12));
    [261.63, 329.63, 392].forEach(f => tone(f, t + .35, 1.6, "sawtooth", .035));
    for (let i = 0; i < 8; i++) tone(1568 + i * 120, t + .45 + i * .07, .25, "sine", .04);
  }
  function bar1() {
    const c = chords[bar % 4];
    for (let i = 0; i < 8; i++) tone(c[[0, 1, 2, 1, 0, 1, 2, 1][i]] * 2, nextT + i * .25, .3, "triangle", .05, bgm);
    tone(c[0] / 2, nextT, .9, "sine", .09, bgm); tone(c[0] / 2, nextT + 1, .9, "sine", .06, bgm);
    bar++; nextT += 2;
  }
  function loop() { if (!playing || !ac) return; while (nextT < ac.currentTime + .6) bar1(); timer = setTimeout(loop, 200); }
  function startSynth() {
    init(); if (!ac) return;
    bgm = ac.createGain(); bgm.gain.value = 1; bgm.connect(master);
    playing = true; nextT = ac.currentTime + .05; loop();
  }
  function start() {
    if (playing) return;
    if (CONFIG.bgmFile) {
      fileEl = new Audio(CONFIG.bgmFile); fileEl.loop = true; fileEl.volume = .6;
      fileEl.addEventListener("error", () => { fileEl = null; if (playing) { playing = false; startSynth(); sync(); } }, { once: true });
      playing = true;
      fileEl.play().catch(() => {});
    } else startSynth();
  }
  function stop() {
    if (!playing) return; playing = false; clearTimeout(timer);
    if (fileEl) fileEl.pause();
    if (bgm) bgm.gain.setTargetAtTime(0, ac.currentTime, .05);
  }
  const pop = () => { if (ac) tone(700 + Math.random() * 300, ac.currentTime, .12, "sine", .09); };
  return { init, beep, pop, fanfare, start, stop, get playing() { return playing; } };
})();

function sync() {
  const on = songStarted ? !audio.paused : Sound.playing;
  muteBtn.textContent = on ? "🔊" : "🔇";
  muteBtn.setAttribute("aria-pressed", String(!on));
  muteBtn.setAttribute("aria-label", on ? "Jeda musik" : "Putar musik");
}
muteBtn.addEventListener("click", () => {
  if (songStarted) { audio.paused ? audio.play().catch(() => {}) : audio.pause(); }
  else { Sound.playing ? Sound.stop() : Sound.start(); }
  sync();
});

/* ---------- Landing page: 3 · 2 · 1 → Happy Birthday ---------- */
const intro = $("#intro");
document.body.classList.add("intro-on");
const showStep = id => ["introStart", "introCount", "introBday"].forEach(x => $("#" + x).hidden = x !== id);
$("#introStart h1").focus({ preventScroll: true });
let balloonTimer;
function balloon() {
  if (reduce || $$(".balloon").length > 12) return;
  const b = document.createElement("i"), cols = ["#f6d9de", "#d9a3ae", "#a8455e", "#e8b1bc", "#fff"];
  b.className = "balloon";
  b.style.cssText = "left:" + (Math.random() * 88) + "%;background:" + cols[Math.random() * 5 | 0] + ";animation-duration:" + (5 + Math.random() * 3) + "s";
  b.addEventListener("animationend", () => b.remove());
  $("#balloons").append(b);
}
function celebrate() {
  showStep("introBday");
  const t = $("#btitle"); t.textContent = "";
  "Happy Birthday!".split(" ").forEach((w, wi) => {
    const d = document.createElement("div"); d.setAttribute("aria-hidden", "true");
    [...w].forEach((ch, i) => { const s = document.createElement("span"); s.textContent = ch; s.style.setProperty("--i", wi * 6 + i); d.append(s); });
    t.append(d);
  });
  const hero = makeImg(CONFIG.hero, "Foto " + CONFIG.name); hero.loading = "eager"; $("#bhero").replaceChildren(hero);
  const sp = $("#sparks"); sp.textContent = "";
  for (let i = 0; i < 12; i++) { const s = document.createElement("span"); s.textContent = "✦"; s.style.cssText = "left:" + (Math.random() * 94) + "%;top:" + (Math.random() * 90) + "%;animation-delay:" + (Math.random() * 2) + "s;font-size:" + (.8 + Math.random() * 1.2) + "rem"; sp.append(s); }
  Sound.fanfare(); Sound.start(); sync();
  confetti(100); setTimeout(() => confetti(80), 1400); setTimeout(() => confetti(60), 3000);
  for (let i = 0; i < 6; i++) setTimeout(balloon, i * 250);
  balloonTimer = setInterval(balloon, 800);
  t.focus({ preventScroll: true });
}
$("#startBtn").addEventListener("click", () => {
  Sound.init(); muteBtn.hidden = false; showStep("introCount");
  const num = $("#countNum"); let n = 3;
  (function step() {
    if (n === 0) { celebrate(); return; }
    /* FIX: pakai class "beat" (bukan "tick") agar tidak bentrok dengan ikon centang galeri */
    num.textContent = n; num.classList.remove("beat"); void num.offsetWidth; num.classList.add("beat");
    Sound.beep(); n--; setTimeout(step, 1000);
  })();
}, { once: true });
$("#introNext").addEventListener("click", () => {
  clearInterval(balloonTimer);
  intro.classList.add("leave");
  setTimeout(() => {
    intro.hidden = true; document.body.classList.remove("intro-on");
    scenes[0].classList.add("active"); updateProgress();
    const h = scenes[0].querySelector("h1"); if (h) h.focus({ preventScroll: true });
  }, reduce ? 0 : 450);
}, { once: true }); 