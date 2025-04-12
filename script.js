// Fungsi untuk toggle tema gelap/terang
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme'); // Ambil tema saat ini
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark'; // Ganti tema
    body.setAttribute('data-theme', newTheme); // Terapkan tema baru
    
    // Update ikon tombol toggle
    const toggleButton = document.querySelector('.theme-toggle');
    toggleButton.textContent = newTheme === 'dark' ? '🌙' : '☀️';
    
    // Simpan preferensi tema ke localStorage
    localStorage.setItem('theme', newTheme);
}

// Muat tema yang tersimpan saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark'; // Default gelap
    document.body.setAttribute('data-theme', savedTheme);
    document.querySelector('.theme-toggle').textContent = 
        savedTheme === 'dark' ? '🌙' : '☀️';
});

// Animasi Partikel (Connected Particles)
const canvas = document.querySelector('.particles');
const ctx = canvas.getContext('2d');

// Sesuaikan ukuran canvas dengan layar
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = []; // Array untuk menyimpan partikel
const numberOfParticles = 80; // Jumlah partikel

// Kelas untuk membuat partikel
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width; // Posisi X acak
        this.y = Math.random() * canvas.height; // Posisi Y acak
        this.size = Math.random() * 3 + 1; // Ukuran partikel
        this.speedX = Math.random() * 1 - 0.5; // Kecepatan lambat
        this.speedY = Math.random() * 1 - 0.5;
    }

    // Update posisi partikel
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        // Pantulkan partikel jika keluar layar
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    // Gambar partikel
    draw() {
        ctx.fillStyle = document.body.getAttribute('data-theme') === 'dark' 
            ? 'rgba(255, 255, 255, 0.8)' 
            : 'rgba(0, 0, 0, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Inisialisasi partikel
function init() {
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

// Fungsi untuk menghubungkan partikel dengan garis
function connectParticles() {
    const maxDistance = 120; // Jarak maksimum untuk koneksi
    for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i + 1; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Gambar garis jika jarak kurang dari maxDistance
            if (distance < maxDistance) {
                ctx.strokeStyle = document.body.getAttribute('data-theme') === 'dark' 
                    ? `rgba(255, 255, 255, ${1 - distance / maxDistance})`
                    : `rgba(0, 0, 0, ${1 - distance / maxDistance})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }
    }
}

// Animasi loop untuk partikel
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Bersihkan canvas
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    connectParticles(); // Hubungkan partikel dengan garis
    requestAnimationFrame(animate); // Loop animasi
}

init(); // Mulai inisialisasi
animate(); // Mulai animasi

// Sesuaikan ukuran canvas saat window di-resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Smooth scrolling untuk semua link dan tombol navigasi
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); // Mencegah perilaku default
        const targetId = this.getAttribute('href'); // Ambil ID target
        const targetElement = document.querySelector(targetId); // Cari elemen target
        if (targetElement) {
            // Scroll halus ke elemen target
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Tambahkan efek visual saat klik
            this.style.transition = 'transform 0.2s ease';
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        }
    });
});