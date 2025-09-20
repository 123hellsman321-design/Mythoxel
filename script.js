// Smoke background effect using canvas
const canvas = document.getElementById('smoke-bg');
const ctx = canvas.getContext('2d');
let width, height;
function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Simple smoke particle system
const particles = [];
const colors = [
    'rgba(255,60,0,0.15)', // red
    'rgba(255,179,0,0.12)', // orange
    'rgba(0,0,0,0.18)' // black
];
function createParticle() {
    const x = Math.random() * width;
    const y = height + 20;
    const radius = 60 + Math.random() * 80;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const speed = 0.5 + Math.random() * 1.2;
    return { x, y, radius, color, speed, alpha: 1 };
}
function drawParticles() {
    ctx.clearRect(0, 0, width, height);
    for (let p of particles) {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 40;
        ctx.fill();
        ctx.restore();
        p.y -= p.speed;
        p.alpha -= 0.002 + Math.random() * 0.002;
    }
    // Remove faded particles
    for (let i = particles.length - 1; i >= 0; i--) {
        if (particles[i].alpha <= 0) particles.splice(i, 1);
    }
    // Add new particles
    if (particles.length < 60) {
        particles.push(createParticle());
    }
    requestAnimationFrame(drawParticles);
}
drawParticles();

// Copy buttons logic
const copyMcBtn = document.getElementById('copy-mc');
const copyDiscordBtn = document.getElementById('copy-discord');
const mcIpText = document.getElementById('mc-ip').textContent;
const discordLinkText = document.getElementById('discord-link').textContent;

copyMcBtn.addEventListener('click', function() {
    navigator.clipboard.writeText(mcIpText).then(() => {
        copyMcBtn.textContent = 'Copied!';
        setTimeout(() => copyMcBtn.textContent = 'Copy IP', 1200);
    });
});

copyDiscordBtn.addEventListener('click', function() {
    navigator.clipboard.writeText(discordLinkText).then(() => {
        copyDiscordBtn.textContent = 'Copied!';
        setTimeout(() => copyDiscordBtn.textContent = 'Copy Link', 1200);
    });
});
