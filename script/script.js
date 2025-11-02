const balloonContainer = document.getElementById("balloon-container");
const random = (n) => Math.floor(Math.random() * n);
const clamp = (v, min = 0, max = 255) => Math.max(min, Math.min(max, v));

function getRandomStyles() {
  const r = random(255);
  const g = random(255);
  const b = random(255);
  const mt = random(200);
  const ml = random(50);
  const dur = random(7) + 5;
  return `
    background-color: rgb(${r},${g},${b});
    color: rgba(${r},${g},${b},0.9);
    box-shadow: inset -7px -3px 10px rgb(${r - 10},${g - 10},${b - 10});
    margin: ${mt}px 0 0 ${ml}px;
    animation: float ${dur}s ease 1 forwards;
  `;
}

function createBalloons(num) {
  for (let i = 0; i < num; i++) {
    const balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.style.cssText = getRandomStyles();

    // Remove after the animation ends so nothing remains on screen.
    balloon.addEventListener("animationend", () => balloon.remove(), {
      once: true,
    });

    balloonContainer.append(balloon);
  }
}

function removeBalloons() {
  balloonContainer.style.opacity = 0;
  setTimeout(() => {
    balloonContainer.remove();
  }, 500);
}

function createBalloonsOnce(num) {
  if (!balloonContainer) return;
  if (balloonContainer.querySelector(".balloon")) return;
  createBalloons(num);
}

// Spawn once on full load
window.addEventListener("load", () => createBalloonsOnce(20), { once: true });

// Handle bfcache restores (Safari/Firefox)
window.addEventListener(
  "pageshow",
  (e) => {
    if (e.persisted) createBalloonsOnce(20);
  },
  { once: true }
);
const photos = [
  { src: "images/fotka1.JPEG", caption: "Kvetinky od teba" },
  { src: "images/fotka5.jpg", caption: "Pedofília na spiši" },
  { src: "images/fotka6.JPEG", caption: "Moja prvá fotka teba haha" },
  { src: "images/fotka2.jpg", caption: "Tvoja pusinka na mne" },
  { src: "images/fotka3.JPEG", caption: "Povedala som ANO!" },
  { src: "images/fotka4.JPEG", caption: "Naša prva spoločna fotka!!!" },
];

let current = 0;

const photo = document.getElementById("polaroid-photo");
const caption = document.querySelector(".caption");

document.getElementById("prev").addEventListener("click", () => {
  current = (current - 1 + photos.length) % photos.length;
  updatePhoto();
});

document.getElementById("next").addEventListener("click", () => {
  current = (current + 1) % photos.length;
  updatePhoto();
});

function updatePhoto() {
  photo.src = photos[current].src;
  caption.textContent = photos[current].caption;
}

const events = [
  { date: "3.5.", text: "Najlepší deň, začali sme si písať" },
  { date: "21.5.", text: "Uznala si, že si v tom až po uši" },
  { date: "22.5.", text: "Prvé kvetinky od teba" },
  { date: "29.5.", text: "Pribudol môj nový parťák na spinkanie" },
  { date: "5.6.", text: "Sľúbila si, že si kľakneš predomňa, keď prídeš" },
  { date: "16.6.", text: "Prvé stretko, prvá pusaaaa" },
  { date: "17.6.", text: "Spomienka na to, ako si prehrala v parku :P" },
  { date: "18.7. - 20.7", text: "Najlepší víkend s tebou" },
  { date: "18.7.", text: "Naša prvá noc spolu" },
  { date: "25.7.", text: "Uznala si, že ťa ľúbim viac" },
  { date: "9.8.", text: "Prvé milujem ťa" },
  { date: "24.8.", text: "Uznala si, že si pdf :P" },
  { date: "14.9.", text: "Napísala si, že som tvoja spriaznená duša" },
  { date: "12.10.", text: "Call kde sme obidve zaspinkali" },
  { date: "30.10.", text: "Padla ta dlho očakávana otázka" },
];

const timeline = document.getElementById("timeline");

events.forEach((event) => {
  const item = document.createElement("div");
  item.className = "timeline-item";

  const date = document.createElement("div");
  date.className = "timeline-date";
  date.textContent = event.date;

  const text = document.createElement("div");
  text.className = "timeline-text";
  text.textContent = event.text;

  item.appendChild(date);
  item.appendChild(text);
  timeline.appendChild(item);
});
const startTime = new Date("2025-05-03T09:06:00+02:00");

function updateCounter() {
  const now = new Date();
  const diffMs = now - startTime;
  const totalHours = Math.floor(diffMs / (1000 * 60 * 60));

  document.getElementById("counter").textContent = `${totalHours} hodín`;
}

setInterval(updateCounter, 1000);
updateCounter();
