
const startBtn = document.getElementById("startBtn");
const giftSection = document.getElementById("gift");
const giftBtn = document.getElementById("giftBtn");
const giftEmoji = document.getElementById("giftEmoji");
const giftHint = document.getElementById("giftHint");
const reveal = document.getElementById("reveal");
const memoryBtn = document.getElementById("memoryBtn");
const memories = document.getElementById("memories");
const letter = document.getElementById("letter");
const celebrateBtn = document.getElementById("celebrateBtn");

// Smoothly show a section
function showSection(section) {
    section.classList.remove("hidden");
    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

// Start the birthday surprise
startBtn.addEventListener("click", () => {
    showSection(giftSection);
});

// Open the birthday gift
giftBtn.addEventListener("click", () => {
    giftEmoji.textContent = "💝";
    giftHint.textContent = "Surprise! You are loved more than you know! 💗";
    reveal.classList.remove("hidden");
    giftBtn.textContent = "Gift Opened ❤️";
    giftBtn.disabled = true;
    giftBtn.style.opacity = "0.7";
    showSection(reveal);
    burstConfetti();
});

// Show the memories and birthday letter
memoryBtn.addEventListener("click", () => {
    showSection(memories);

    setTimeout(() => {
        showSection(letter);
    }, 700);
});

// Floating hearts
const heartsContainer = document.getElementById("hearts");
const heartSymbols = ["❤️", "💕", "💗", "💖", "💘", "💞"];

function createHeart() {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent =
        heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (14 + Math.random() * 24) + "px";
    heart.style.animationDuration = (5 + Math.random() * 6) + "s";

    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 11000);
}

setInterval(createHeart, 450);

// Confetti celebration
const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");

let confettiPieces = [];
let animationFrame = null;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function burstConfetti() {
    const colors = [
        "#ff5c9a",
        "#ffd166",
        "#ff8fab",
        "#cdb4db",
        "#ffffff"
    ];

    for (let i = 0; i < 140; i++) {
        confettiPieces.push({
            x: Math.random() * canvas.width,
            y: -20 - Math.random() * canvas.height * 0.5,
            size: 4 + Math.random() * 7,
            speed: 2 + Math.random() * 5,
            drift: (Math.random() - 0.5) * 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360
        });
    }

    if (!animationFrame) {
        animateConfetti();
    }
}

function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confettiPieces.forEach(piece => {
        piece.y += piece.speed;
        piece.x += piece.drift;
        piece.rotation += 4;

        ctx.save();
        ctx.translate(piece.x, piece.y);
        ctx.rotate(piece.rotation * Math.PI / 180);
        ctx.fillStyle = piece.color;
        ctx.fillRect(-piece.size / 2, -piece.size / 2,
                     piece.size, piece.size * 0.65);
        ctx.restore();
    });

    confettiPieces = confettiPieces.filter(
        piece => piece.y < canvas.height + 30
    );

    if (confettiPieces.length > 0) {
        animationFrame = requestAnimationFrame(animateConfetti);
    } else {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

// Final birthday celebration
celebrateBtn.addEventListener("click", () => {
    burstConfetti();
    celebrateBtn.textContent = "Happy Birthday Greeshma! 🎂💗";

    showSection(letter);
});
