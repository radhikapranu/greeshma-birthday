
document.addEventListener("DOMContentLoaded", () => {
  const surpriseButton = document.getElementById("surpriseButton");
  const surpriseMessage = document.getElementById("surpriseMessage");
  const memoryButton = document.getElementById("memoryButton");

  function createHearts(count = 1) {
    const container = document.querySelector(".hearts-container");

    if (!container) return;

    for (let i = 0; i < count; i++) {
      const heart = document.createElement("span");

      heart.className = "heart";
      heart.textContent = ["💗", "💕", "💖", "🩷", "✨"][
        Math.floor(Math.random() * 5)
      ];

      heart.style.left = Math.random() * 100 + "%";
      heart.style.fontSize = 16 + Math.random() * 20 + "px";
      heart.style.animationDuration = 4 + Math.random() * 3 + "s";

      container.appendChild(heart);

      heart.addEventListener("animationend", () => heart.remove());
    }
  }

  surpriseButton?.addEventListener("click", () => {
    surpriseMessage.classList.toggle("show");

    if (surpriseMessage.classList.contains("show")) {
      surpriseButton.textContent = "Your surprise is open 💗";
      createHearts(25);
    } else {
      surpriseButton.textContent = "Your surprise awaits 💌";
    }
  });

  memoryButton?.addEventListener("click", () => {
    document.querySelector(".memories").scrollIntoView({
      behavior: "smooth"
    });

    createHearts(20);
  });

  setInterval(() => createHearts(1), 1800);
});
