// script.js
const canvas = document.getElementById('wires');
const ctx = canvas.getContext('2d');
let width, height, points;

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  generatePoints();
}

function generatePoints() {
  points = [];
  for (let i = 0; i < 100; i++) {
    points.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5
    });
  }
}

function drawLines() {
  ctx.clearRect(0, 0, width, height);
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;

    for (let j = i + 1; j < points.length; j++) {
      const q = points[j];
      const dx = p.x - q.x;
      const dy = p.y - q.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(52, 152, 219,' + (1 - dist / 120) + ')';
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  drawLines();
  requestAnimationFrame(animate);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
animate();
