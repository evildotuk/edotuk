document.addEventListener("DOMContentLoaded", () => {
  const dataText = [
    "London.",
    "DevOps.",
    "Backend.",
    "Architecting.",
    "Planning.",
    "Consulting.",
  ];

  const h1Element = document.querySelector("h1");
  const TYPING_SPEED = 150;
  const PAUSE_AFTER_WORD = 700;
  const PAUSE_AFTER_CYCLE = 15000;

  let isAnimating = false;

  async function typeWriter(text) {
    if (!h1Element || isAnimating) return;

    isAnimating = true;

    for (let i = 0; i <= text.length; i++) {
      h1Element.textContent = text.substring(0, i);
      await sleep(TYPING_SPEED);
    }

    await sleep(PAUSE_AFTER_WORD);
    isAnimating = false;
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function startTextAnimation() {
    while (true) {
      for (let i = 0; i < dataText.length; i++) {
        await typeWriter(dataText[i]);
      }
      await sleep(PAUSE_AFTER_CYCLE);
    }
  }

  if (h1Element) {
    startTextAnimation();
  }
});
