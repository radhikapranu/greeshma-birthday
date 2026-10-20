
document.addEventListener("DOMContentLoaded", () => {
  const surpriseButton = document.getElementById("surpriseButton");
  const surpriseMessage = document.getElementById("surpriseMessage");
  const memoryButton = document.getElementById("memoryButton");

  surpriseButton?.addEventListener("click", () => {
    document.getElementById("surprise").scrollIntoView({
      behavior: "smooth"
    });

    surpriseMessage.classList.add("show");
    createHearts(20);
  });

  memoryButton?.addEventListener("click", () => {
    document.querySelector(".memories").scrollIntoView({
      behavior: "smooth"
    });

    createHearts(15);
  });

  function createHearts(count) {
    for (let i = 0; i < count; i++) {
      const heart = document.createElement("span");
      heart.className = "heart";
      heart.textContent = ["💗", "💕", "💖", "🩷", "✨"][
        Math.floor(Math.random() * 5)
      ];

      heart.style.left = Math.random() * 100 + "vw";
      heart.style.fontSize = 16 + Math.random() * 18 + "px";
      heart.style.animationDuration = 3 + Math.random() * 3 + "s";

      document.body.appendChild(heart);

      heart.addEventListener("animationend", () => heart.remove());
    }
  }

  setInterval(() => createHearts(1), 1800);
});
