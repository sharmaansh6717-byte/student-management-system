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

// Mouse position (defaults to center)
let mouse = { x: width / 2, y: height / 2 };
window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Create a set of "cloud" blobs that drift and react to the cursor
const clouds = [];
const CLOUD_COUNT = 6;
const colors = [
  'rgba(99, 102, 241, 0.25)',   // indigo
  'rgba(139, 92, 246, 0.22)',   // purple
  'rgba(59, 130, 246, 0.20)',   // blue
];

for (let i = 0; i < CLOUD_COUNT; i++) {
  clouds.push({
    x: Math.random() * width,
    y: Math.random() * height,
    baseRadius: 120 + Math.random() * 180,
    color: colors[i % colors.length],
    angle: Math.random() * Math.PI * 2,
    speed: 0.002 + Math.random() * 0.003,
    driftRadius: 80 + Math.random() * 120
  });
}

let time = 0;

function animate() {
  time += 1;
  ctx.clearRect(0, 0, width, height);

  clouds.forEach((cloud, i) => {
    // Natural drifting motion (like slow-moving clouds)
    cloud.angle += cloud.speed;
    const driftX = Math.cos(cloud.angle) * cloud.driftRadius;
    const driftY = Math.sin(cloud.angle * 0.8) * cloud.driftRadius;

    let targetX = cloud.x + driftX;
    let targetY = cloud.y + driftY;

    // Cursor influence: nearby clouds get pulled/pushed like a wave
    const dx = mouse.x - targetX;
    const dy = mouse.y - targetY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const influenceRadius = 400;

    if (dist < influenceRadius) {
      const force = (1 - dist / influenceRadius) * 60;
      const angle = Math.atan2(dy, dx);
      targetX -= Math.cos(angle) * force;
      targetY -= Math.sin(angle) * force;
    }

    // Pulse the radius slightly with time + cursor proximity
    const pulse = Math.sin(time * 0.02 + i) * 20;
    const proximityBoost = dist < influenceRadius ? (1 - dist / influenceRadius) * 40 : 0;
    const radius = cloud.baseRadius + pulse + proximityBoost;

    const gradient = ctx.createRadialGradient(
      targetX, targetY, 0,
      targetX, targetY, radius
    );
    gradient.addColorStop(0, cloud.color);
    gradient.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(targetX, targetY, radius, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

animate();