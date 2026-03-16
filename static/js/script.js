// ============================================================================
// SECTION 1: MATRIX RAIN BACKGROUND EFFECT
// ============================================================================

const devOpsCode = [
  'terraform apply',
  'terraform init',
  'terraform plan',
  'ansible-playbook site.yml',
  'kubectl get pods',
  'kubectl apply -f deployment.yaml',
  'docker build -t app .',
  'docker-compose up -d',
  'git push origin main',
  'git pull --rebase',
  'helm upgrade --install',
  'helm repo update',
  'aws ec2 describe-instances',
  'gcloud container clusters get-credentials',
  'az aks get-credentials',
  'systemctl restart nginx',
  'journalctl -fu service',
  'prometheus --config.file=prometheus.yml',
  'grafana-server',
  'vault secrets enable pki',
  'consul agent -dev',
  'packer build template.pkr.hcl',
  'pulumi up',
  'argocd app sync',
  'flux reconcile source git',
  'DevOps',
  'Infrastructure as Code',
  'CI/CD',
  'SRE',
  'Observability',
  'e-dot.uk',
];

const matrixCanvas = document.getElementById('c');

if (matrixCanvas) {
  const matrixCtx = matrixCanvas.getContext('2d');
  const matrixFontSize = 14;

  let matrixColumns;
  let matrixDrops;

  function resizeMatrixCanvas() {
    const width = window.innerWidth;
    const height = Math.max(
      window.innerHeight,
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    if (matrixCanvas.width !== width || matrixCanvas.height !== height) {
      matrixCanvas.width = width;
      matrixCanvas.height = height;
    }
    matrixColumns = Math.floor(matrixCanvas.width / matrixFontSize);
    matrixDrops = [];
    for (let i = 0; i < matrixColumns; i++) {
      matrixDrops[i] = Math.random() * -100;
    }
  }

  resizeMatrixCanvas();

  function drawMatrix() {
    matrixCtx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

    matrixCtx.fillStyle = '#FF7777';
    matrixCtx.font = matrixFontSize + 'px monospace';

    for (let i = 0; i < matrixDrops.length; i++) {
      const text = devOpsCode[Math.floor(Math.random() * devOpsCode.length)];
      matrixCtx.fillText(text, i * matrixFontSize, matrixDrops[i] * matrixFontSize);

      if (matrixDrops[i] * matrixFontSize > matrixCanvas.height && Math.random() > 0.975) {
        matrixDrops[i] = 0;
      }

      matrixDrops[i]++;
    }
  }

  setInterval(drawMatrix, 50);
  window.addEventListener('resize', resizeMatrixCanvas);
}

// ============================================================================
// SECTION 2: TYPEWRITER ANIMATION
// ============================================================================

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
