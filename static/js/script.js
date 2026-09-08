const canvas = document.getElementById("c");
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

const platformCode = [
  "define service level objectives",
  "reduce toil",
  "kubectl get pods",
  "measure error budget",
  "improve developer experience",
  "build golden paths",
  "observability",
  "platform as a product",
  "incident response",
  "e-dot.uk",
];

if (canvas && !reduceMotion) {
  const context = canvas.getContext("2d");
  const fontSize = 14;
  let drops = [];
  let animationFrame;
  let lastFrame = 0;

  function resizeCanvas() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * ratio;
    canvas.height = window.innerHeight * ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    drops = Array.from(
      { length: Math.ceil(window.innerWidth / fontSize) },
      () => Math.random() * -80,
    );
  }

  function drawMatrix(timestamp) {
    animationFrame = window.requestAnimationFrame(drawMatrix);
    if (timestamp - lastFrame < 65) return;
    lastFrame = timestamp;

    context.fillStyle = "rgba(8, 11, 16, 0.12)";
    context.fillRect(0, 0, window.innerWidth, window.innerHeight);
    context.fillStyle = "#ff7478";
    context.font = `${fontSize}px "DM Mono", monospace`;

    drops.forEach((drop, index) => {
      const text =
        platformCode[Math.floor(Math.random() * platformCode.length)];
      context.fillText(text, index * fontSize, drop * fontSize);
      drops[index] =
        drop * fontSize > window.innerHeight && Math.random() > 0.98
          ? 0
          : drop + 1;
    });
  }

  resizeCanvas();
  animationFrame = window.requestAnimationFrame(drawMatrix);

  window.addEventListener("resize", resizeCanvas, { passive: true });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      window.cancelAnimationFrame(animationFrame);
    } else {
      animationFrame = window.requestAnimationFrame(drawMatrix);
    }
  });
}

const rotatingWord = document.getElementById("rotating-word");
const phrases = [
  "reliable systems",
  "scalable platforms",
  "useful golden paths",
  "calm on-call rotations",
];

const sleep = (duration) =>
  new Promise((resolve) => window.setTimeout(resolve, duration));

async function rotatePhrases() {
  if (!rotatingWord) return;

  if (reduceMotion) {
    let phraseIndex = 0;
    window.setInterval(() => {
      phraseIndex = (phraseIndex + 1) % phrases.length;
      rotatingWord.textContent = phrases[phraseIndex];
    }, 3000);
    return;
  }

  for (let phraseIndex = 0; ; phraseIndex += 1) {
    const phrase = phrases[phraseIndex % phrases.length];
    rotatingWord.textContent = "";

    for (const character of phrase) {
      rotatingWord.textContent += character;
      await sleep(55);
    }

    await sleep(1800);

    while (rotatingWord.textContent.length > 0) {
      rotatingWord.textContent = rotatingWord.textContent.slice(0, -1);
      await sleep(28);
    }
  }
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

rotatePhrases();
