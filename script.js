
/* Greeshma's Birthday Website 💗 */

// Get the HTML elements
const startBtn = document.getElementById("startBtn");
const giftBtn = document.getElementById("giftBtn");
const giftEmoji = document.getElementById("giftEmoji");
const giftHint = document.getElementById("giftHint");
const reveal = document.getElementById("reveal");
const memoryBtn = document.getElementById("memoryBtn");
const celebrateBtn = document.getElementById("celebrateBtn");

const gift = document.getElementById("gift");
const memories = document.getElementById("memories");
const hearts = document.getElementById("hearts");

// Welcome button: scroll to the gift
startBtn.addEventListener("click", () => {
  gift.scrollIntoView({ behavior: "smooth" });
  launchConfetti(100);
});

// Open the birthday gift
giftBtn.addEventListener("click", () => {
  if (!reveal.classList.contains("hidden")) {
    return;
  }

  giftEmoji.textContent = "🎉";
  giftHint.textContent = "Your surprise is here, Greeshma! 💗";

  reveal.classList.remove("hidden");
  giftBtn.style.animation = "none";
  giftBtn.setAttribute("aria-expanded", "true");

  launchConfetti(180);
});

// Go to the photo gallery
memoryBtn.addEventListener("click", () => {
  memories.scrollIntoView({ behavior: "smooth" });
});

// Celebrate again
celebrateBtn.addEventListener("click", () => {
  launchConfetti(220);
  createHeart();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Floating hearts 💕
function createHeart() {
  const heart = document.createElement("span");
  heart.className = "heart";

  const symbols = ["💗", "💜", "💕", "✨", "🩷"];

  heart.textContent =
    symbols[Math.floor(Math.random() * symbols.length)];

  heart.style.left = Math.random() * 100 + "%";
  heart.style.fontSize = (14 + Math.random() * 22) + "px";
  heart.style.animationDuration = (5 + Math.random() * 5) + "s";

  hearts.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 11000);
}

// Create floating hearts periodically
setInterval(createHeart, 700);

// Confetti animation 🎊
const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");

let confettiPieces = [];
let animationRunning = false;

// Fit the canvas to the browser window
function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;

  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;

  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Launch confetti
function launchConfetti(amount = 150) {
  const colors = [
    "#ff6fae",
    "#c5a0ff",
    "#8857dc",
    "#ffd166",
    "#ff9bc9"
  ];

  for (let i = 0; i < amount; i++) {
    confettiPieces.push({
      x: Math.random() * window.innerWidth,
      y: -20 - Math.random() * window.innerHeight * 0.4,
      size: 4 + Math.random() * 7,
      speed: 2 + Math.random() * 4,
      drift: (Math.random() - 0.5) * 3,
      rotation: Math.random() * 360,
      spin: (Math.random() - 0.5) * 10,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

  if (!animationRunning) {
    animationRunning = true;
    requestAnimationFrame(animateConfetti);
  }
}

// Animate the confetti pieces
function animateConfetti() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  confettiPieces.forEach((piece) => {
    piece.x += piece.drift;
    piece.y += piece.speed;
    piece.rotation += piece.spin;

    ctx.save();
    ctx.translate(piece.x, piece.y);
    ctx.rotate(piece.rotation * Math.PI / 180);

    ctx.fillStyle = piece.color;

    ctx.fillRect(
      -piece.size / 2,
      -piece.size / 2,
      piece.size,
      piece.size * 0.65
    );

    ctx.restore();
  });

  confettiPieces = confettiPieces.filter(
    (piece) => piece.y < window.innerHeight + 30
  );

  if (confettiPieces.length > 0) {
    requestAnimationFrame(animateConfetti);
  } else {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    animationRunning = false;
  }
}
