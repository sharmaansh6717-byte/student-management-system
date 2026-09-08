// public/js/script.js

const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height;
function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

let mouse = { x: width / 2, y: height / 2 };
window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Generate stars
const STAR_COUNT = 180;
const stars = [];

for (let i = 0; i < STAR_COUNT; i++) {
  stars.push({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.6 + 0.4,
    baseAlpha: Math.random() * 0.6 + 0.3,
    twinkleSpeed: Math.random() * 0.02 + 0.005,
    twinklePhase: Math.random() * Math.PI * 2,
    parallax: Math.random() * 0.04 + 0.01 // how much it drifts with cursor
  });
}

let time = 0;

function animate() {
  time += 1;
  ctx.clearRect(0, 0, width, height);

  // Offset from center — used for parallax drift
  const offsetX = (mouse.x - width / 2);
  const offsetY = (mouse.y - height / 2);

  stars.forEach((star) => {
    // Parallax: stars shift slightly opposite/with cursor based on their depth
    const px = star.x - offsetX * star.parallax;
    const py = star.y - offsetY * star.parallax;

    // Twinkle effect
    const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase);
    const alpha = star.baseAlpha + twinkle * 0.3;

    // Slight glow boost near cursor
    const dx = mouse.x - px;
    const dy = mouse.y - py;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const proximityGlow = dist < 150 ? (1 - dist / 150) * 0.6 : 0;

    ctx.beginPath();
    ctx.arc(px, py, star.radius + proximityGlow * 1.5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(alpha + proximityGlow, 1)})`;
    ctx.shadowBlur = 4 + proximityGlow * 10;
    ctx.shadowColor = 'rgba(199, 210, 254, 0.9)';
    ctx.fill();
  });

  ctx.shadowBlur = 0;
  requestAnimationFrame(animate);
}

animate();