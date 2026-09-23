/* ==========================================================================
   ROMANTIC BIRTHDAY GIFT — INTERACTIVE JS & CANVAS PARTICLE ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const openingOverlay = document.getElementById('opening');
    const mainContent = document.getElementById('mainContent');
    const btnOpen = document.getElementById('btnOpen');
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    
    // Cake Elements
    const cakeWrapper = document.getElementById('cakeWrapper');
    const flameWrapper = document.getElementById('flameWrapper');
    const cakeInstruction = document.getElementById('cakeInstruction');
    const wishMessage = document.getElementById('wishMessage');
    
    // Ending Actions
    const btnRelive = document.getElementById('btnRelive');
    const btnShowerHearts = document.getElementById('btnShowerHearts');

    // Photo Lightbox
    const photoCards = document.querySelectorAll('.photo-card');
    const photoModal = document.getElementById('photoModal');
    const closeModal = document.getElementById('closeModal');
    const modalImg = document.getElementById('modalImg');
    const modalCaption = document.getElementById('modalCaption');

    // State Variables
    let isMusicPlaying = false;
    let isCandleBlown = false;

    // ==========================================================================
    // 1. OPENING LANDING OVERLAY TRANSITION (NO AUTOPLAY)
    // ==========================================================================
    const anniversaryVideo = document.getElementById('anniversaryVideo');

    btnOpen.addEventListener('click', () => {
        // Trigger smooth overlay fade out
        openingOverlay.classList.add('fade-out');
        mainContent.classList.remove('hidden-content');
        mainContent.classList.add('visible');

        // Release 3D Flying Doves & Confetti Burst
        releaseDoves(2);
        triggerConfettiBurst(70);

        // Auto play video
        if (anniversaryVideo) {
            anniversaryVideo.play().catch(err => {
                console.log("Autoplay handled:", err);
            });
        }
    });

    btnOpen.addEventListener('mouseenter', () => {
        triggerConfettiBurst(15);
    });

    // ==========================================================================
    // 2. ROMANTIC MUSIC PLAYER CONTROLS (NO AUTOPLAY)
    // ==========================================================================
    const mainPlayBtn = document.getElementById('mainPlayBtn');
    const playIcon = document.getElementById('playIcon');
    const vinylDisc = document.getElementById('vinylDisc');
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');
    const currentTimeEl = document.getElementById('currentTime');
    const durationTimeEl = document.getElementById('durationTime');

    function toggleMusicPlayback() {
        if (isMusicPlaying) {
            bgMusic.pause();
            isMusicPlaying = false;
            if (vinylDisc) vinylDisc.classList.remove('playing');
            if (playIcon) playIcon.textContent = '▶';
            musicToggle.classList.remove('playing');
        } else {
            bgMusic.volume = 0.85;
            bgMusic.play().then(() => {
                isMusicPlaying = true;
                if (vinylDisc) vinylDisc.classList.add('playing');
                if (playIcon) playIcon.textContent = '❚❚';
                musicToggle.classList.add('playing');
            }).catch(console.error);
        }
    }

    if (mainPlayBtn) {
        mainPlayBtn.addEventListener('click', toggleMusicPlayback);
    }
    musicToggle.addEventListener('click', toggleMusicPlayback);

    // Update Progress Bar & Time Display
    bgMusic.addEventListener('timeupdate', () => {
        if (bgMusic.duration) {
            const current = bgMusic.currentTime;
            const duration = bgMusic.duration;
            const progressPercent = (current / duration) * 100;
            if (progressBar) progressBar.style.width = `${progressPercent}%`;

            if (currentTimeEl) currentTimeEl.textContent = formatAudioTime(current);
            if (durationTimeEl) durationTimeEl.textContent = formatAudioTime(duration);
        }
    });

    if (progressContainer) {
        progressContainer.addEventListener('click', (e) => {
            const width = progressContainer.clientWidth;
            const clickX = e.offsetX;
            const duration = bgMusic.duration;
            if (duration) {
                bgMusic.currentTime = (clickX / width) * duration;
            }
        });
    }

    function formatAudioTime(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    }

    // ==========================================================================
    // 3. ROMANTIC VIDEO CONTROLS
    // ==========================================================================
    btnRelive.addEventListener('click', () => {
        if (anniversaryVideo) {
            anniversaryVideo.currentTime = 0;
            anniversaryVideo.play().catch(console.error);
        }
        
        // Scroll smoothly to video section
        document.getElementById('birthday').scrollIntoView({ behavior: 'smooth' });
        triggerConfettiBurst(40);
        releaseDoves(2);
    });

    btnShowerHearts.addEventListener('click', () => {
        triggerConfettiBurst(100);
    });

    // ==========================================================================
    // 3. INTERACTIVE ENVELOPE & TYPEWRITER ANIMATION
    // ==========================================================================
    const envelopeWrapper = document.getElementById('envelopeWrapper');
    const typewriterText = document.getElementById('typewriterText');
    const cardSignature = document.getElementById('cardSignature');
    const envelopeHint = document.getElementById('envelopeHint');

    let isEnvelopeOpen = false;
    const fullMessage = `"Terima kasih telah memilihku dan berjalan bersamaku.\n\nSemoga setiap detik yang kita lewati selalu dipenuhi kehangatan, pengertian, dan cinta yang tulus.\n\nHappy Anniversary, my love. ♡"`;

    const envelopeContainer = document.querySelector('.envelope-container');

    envelopeWrapper.addEventListener('click', () => {
        if (!isEnvelopeOpen) {
            isEnvelopeOpen = true;
            envelopeWrapper.classList.add('open');
            if (envelopeContainer) envelopeContainer.classList.add('open');
            envelopeHint.textContent = 'Surat cinta spesial untukmu ✨';

            // Fire sparkles burst
            triggerConfettiBurst(40);

            // Delay typewriter animation until letter card emerges
            setTimeout(() => {
                startTypewriter(fullMessage);
            }, 750);
        }
    });

    function startTypewriter(text) {
        typewriterText.innerHTML = '';
        cardSignature.classList.remove('visible');
        cardSignature.classList.add('hidden');

        let index = 0;
        const cursor = document.createElement('span');
        cursor.className = 'typewriter-cursor';
        cursor.textContent = '|';

        typewriterText.appendChild(cursor);

        const typeInterval = setInterval(() => {
            if (index < text.length) {
                const char = text.charAt(index);
                if (char === '\n') {
                    typewriterText.insertBefore(document.createElement('br'), cursor);
                } else {
                    const charNode = document.createTextNode(char);
                    typewriterText.insertBefore(charNode, cursor);
                }
                index++;
            } else {
                clearInterval(typeInterval);
                cursor.remove();
                
                // Reveal signature with smooth fade-in
                setTimeout(() => {
                    cardSignature.classList.remove('hidden');
                    cardSignature.classList.add('visible');
                    triggerConfettiBurst(25);
                }, 400);
            }
        }, 45);
    }

    // ==========================================================================
    // 4. PHOTO LIGHTBOX MODAL & 3D PARALLAX TILT
    // ==========================================================================
    photoCards.forEach(card => {
        // Lightbox Open
        card.addEventListener('click', () => {
            const img = card.querySelector('img');
            const caption = card.querySelector('.photo-caption').textContent;
            modalImg.src = img.src;
            modalCaption.textContent = caption;
            photoModal.classList.remove('hidden');
        });

        // 3D Tilt Interaction
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 12;
            const rotateY = (centerX - x) / 12;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.03)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)`;
        });
    });

    closeModal.addEventListener('click', () => {
        photoModal.classList.add('hidden');
    });

    photoModal.addEventListener('click', (e) => {
        if (e.target === photoModal) {
            photoModal.classList.add('hidden');
        }
    });

    // ==========================================================================
    // 5. SCROLL OBSERVER FOR FADE-IN REVEALS
    // ==========================================================================
    const revealElements = document.querySelectorAll('.reveal-fade, .reveal-scale, .reveal-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => observer.observe(el));

    // ==========================================================================
    // 6. CANVAS PARTICLE ENGINE (Floating Hearts, Cursor Trail, Fireworks)
    // ==========================================================================
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');

    let width, height;
    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Particle Collections
    const particles = [];
    const confettiList = [];
    const cursorParticles = [];

    // Ambient Floating Heart/Star Particle
    class FloatingParticle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = height + Math.random() * 100;
            this.size = Math.random() * 14 + 8;
            this.speedY = Math.random() * 1.2 + 0.5;
            this.speedX = Math.sin(Math.random() * Math.PI) * 0.8;
            this.opacity = Math.random() * 0.7 + 0.3;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = (Math.random() - 0.5) * 1.5;
            this.type = Math.random() < 0.4 ? 'flower' : (Math.random() < 0.7 ? 'heart' : (Math.random() < 0.85 ? 'star' : 'petal'));
            this.color = ['#ff758f', '#ffccd5', '#ff4d6d', '#fffaf6', '#e5b382', '#ffb703'][Math.floor(Math.random() * 6)];
        }

        update() {
            this.y -= this.speedY;
            this.x += Math.sin(this.y * 0.01) * 0.6;
            this.rotation += this.rotationSpeed;

            if (this.y < -30) {
                this.reset();
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate((this.rotation * Math.PI) / 180);
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;

            if (this.type === 'heart') {
                // Draw Heart Path
                ctx.beginPath();
                const topCurveHeight = this.size * 0.3;
                ctx.moveTo(0, topCurveHeight);
                ctx.bezierCurveTo(0, 0, -this.size / 2, 0, -this.size / 2, topCurveHeight);
                ctx.bezierCurveTo(-this.size / 2, (this.size + topCurveHeight) / 2, 0, this.size, 0, this.size);
                ctx.bezierCurveTo(0, (this.size + topCurveHeight) / 2, this.size / 2, (this.size + topCurveHeight) / 2, this.size / 2, topCurveHeight);
                ctx.bezierCurveTo(this.size / 2, 0, 0, 0, 0, topCurveHeight);
                ctx.fill();
            } else if (this.type === 'star') {
                // Draw 4-point Sparkle Star
                ctx.beginPath();
                for (let i = 0; i < 4; i++) {
                    ctx.lineTo(Math.cos((i * Math.PI) / 2) * this.size, Math.sin((i * Math.PI) / 2) * this.size);
                    ctx.lineTo(Math.cos((i * Math.PI) / 2 + Math.PI / 4) * (this.size / 3), Math.sin((i * Math.PI) / 2 + Math.PI / 4) * (this.size / 3));
                }
                ctx.closePath();
                ctx.fill();
            } else {
                // Draw Petal
                ctx.beginPath();
                ctx.ellipse(0, 0, this.size * 0.4, this.size * 0.8, 0, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        }
    }

    // Interactive Cursor Heart/Sparkle Trail Particle
    class CursorParticle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 10 + 6;
            this.speedX = (Math.random() - 0.5) * 2;
            this.speedY = -Math.random() * 2.5 - 1;
            this.opacity = 1;
            this.color = ['#ff758f', '#ffccd5', '#ffffff', '#ff4d6d', '#ffbe0b'][Math.floor(Math.random() * 5)];
            this.rotation = Math.random() * 360;
            this.isHeart = Math.random() < 0.7;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.opacity -= 0.022;
            this.size = Math.max(0, this.size - 0.15);
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate((this.rotation * Math.PI) / 180);
            ctx.globalAlpha = Math.max(0, this.opacity);
            ctx.fillStyle = this.color;

            if (this.isHeart) {
                ctx.beginPath();
                const topCurveHeight = this.size * 0.3;
                ctx.moveTo(0, topCurveHeight);
                ctx.bezierCurveTo(0, 0, -this.size / 2, 0, -this.size / 2, topCurveHeight);
                ctx.bezierCurveTo(-this.size / 2, (this.size + topCurveHeight) / 2, 0, this.size, 0, this.size);
                ctx.bezierCurveTo(0, (this.size + topCurveHeight) / 2, this.size / 2, (this.size + topCurveHeight) / 2, this.size / 2, topCurveHeight);
                ctx.bezierCurveTo(this.size / 2, 0, 0, 0, 0, topCurveHeight);
                ctx.fill();
            } else {
                ctx.beginPath();
                for (let i = 0; i < 4; i++) {
                    ctx.lineTo(Math.cos((i * Math.PI) / 2) * this.size, Math.sin((i * Math.PI) / 2) * this.size);
                    ctx.lineTo(Math.cos((i * Math.PI) / 2 + Math.PI / 4) * (this.size / 3), Math.sin((i * Math.PI) / 2 + Math.PI / 4) * (this.size / 3));
                }
                ctx.closePath();
                ctx.fill();
            }

            ctx.restore();
        }
    }

    // Cursor Movement Trail Handlers
    let lastMoveTime = 0;
    window.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastMoveTime > 25) { // throttle particle generation
            cursorParticles.push(new CursorParticle(e.clientX, e.clientY));
            lastMoveTime = now;
        }
    });

    window.addEventListener('touchmove', (e) => {
        const now = Date.now();
        if (e.touches[0] && now - lastMoveTime > 30) {
            cursorParticles.push(new CursorParticle(e.touches[0].clientX, e.touches[0].clientY));
            lastMoveTime = now;
        }
    }, { passive: true });

    // Initialize Background Floating Particles
    const particleCount = window.innerWidth < 768 ? 30 : 60;
    for (let i = 0; i < particleCount; i++) {
        const p = new FloatingParticle();
        p.y = Math.random() * height;
        particles.push(p);
    }

    // Burst Confetti Particle
    class ConfettiParticle {
        constructor(x, y, speedMult = 1) {
            this.x = x || width / 2;
            this.y = y || height / 2;
            this.size = Math.random() * 12 + 6;
            this.speedX = (Math.random() - 0.5) * 14 * speedMult;
            this.speedY = (Math.random() - 0.8) * 16 * speedMult;
            this.gravity = 0.22;
            this.drag = 0.96;
            this.opacity = 1;
            this.color = ['#ff758f', '#ff4d6d', '#ffe4e9', '#ffbe0b', '#ffffff', '#e5b382'][Math.floor(Math.random() * 6)];
            this.rotation = Math.random() * 360;
            this.rotationSpeed = (Math.random() - 0.5) * 10;
        }

        update() {
            this.speedX *= this.drag;
            this.speedY *= this.drag;
            this.speedY += this.gravity;
            this.x += this.speedX;
            this.y += this.speedY;
            this.opacity -= 0.01;
            this.rotation += this.rotationSpeed;
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate((this.rotation * Math.PI) / 180);
            ctx.globalAlpha = Math.max(0, this.opacity);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.6);
            ctx.restore();
        }
    }

    function triggerConfettiBurst(count = 40) {
        const centerX = width / 2;
        const centerY = height * 0.4;
        for (let i = 0; i < count; i++) {
            confettiList.push(new ConfettiParticle(centerX, centerY));
        }
    }

    // 3D Flying Dove Class with Flapping Wings & Sparkle Trail
    class FlyingDove {
        constructor(customX, customY, customSpeed) {
            this.reset(customX, customY, customSpeed);
        }

        reset(customX, customY, customSpeed) {
            this.x = customX !== undefined ? customX : -80 - Math.random() * 200;
            this.y = customY !== undefined ? customY : height * 0.15 + Math.random() * (height * 0.45);
            this.size = Math.random() * 8 + 18; // Dove scale
            this.speedX = customSpeed !== undefined ? customSpeed : Math.random() * 1.4 + 2.2;
            this.speedY = Math.sin(Math.random() * Math.PI) * 0.5 - 0.2;
            this.wingCycle = Math.random() * Math.PI * 2;
            this.wingSpeed = 0.15 + Math.random() * 0.05;
            this.opacity = Math.random() * 0.25 + 0.75;
            this.trailTimer = 0;
        }

        update() {
            this.x += this.speedX;
            this.y += Math.sin(this.x * 0.008) * 0.8 + this.speedY;
            this.wingCycle += this.wingSpeed;

            // Generate occasional heart particle trail behind dove
            this.trailTimer++;
            if (this.trailTimer % 16 === 0) {
                cursorParticles.push(new CursorParticle(this.x - 15, this.y + 5));
            }

            // Loop when dove flies off-screen
            if (this.x > width + 120) {
                this.reset();
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.globalAlpha = this.opacity;

            // Wing flap angle calculated via sine wave
            const flapAngle = Math.sin(this.wingCycle) * 0.75;

            // 1. Soft Shadow / Glow behind Dove
            ctx.fillStyle = 'rgba(255, 182, 193, 0.25)';
            ctx.beginPath();
            ctx.arc(0, 0, this.size * 0.8, 0, Math.PI * 2);
            ctx.fill();

            // 2. Dove Body
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.ellipse(0, 0, this.size * 0.9, this.size * 0.45, -0.15, 0, Math.PI * 2);
            ctx.fill();

            // Dove Head
            ctx.beginPath();
            ctx.arc(this.size * 0.7, -this.size * 0.2, this.size * 0.3, 0, Math.PI * 2);
            ctx.fill();

            // Beak (Cute Soft Gold)
            ctx.fillStyle = '#ffb703';
            ctx.beginPath();
            ctx.moveTo(this.size * 0.95, -this.size * 0.22);
            ctx.lineTo(this.size * 1.15, -this.size * 0.18);
            ctx.lineTo(this.size * 0.95, -this.size * 0.12);
            ctx.closePath();
            ctx.fill();

            // Eye
            ctx.fillStyle = '#4a3b40';
            ctx.beginPath();
            ctx.arc(this.size * 0.78, -this.size * 0.24, this.size * 0.05, 0, Math.PI * 2);
            ctx.fill();

            // Tail Feathers
            ctx.fillStyle = '#fff5f7';
            ctx.beginPath();
            ctx.moveTo(-this.size * 0.7, 0);
            ctx.lineTo(-this.size * 1.3, -this.size * 0.3);
            ctx.lineTo(-this.size * 1.45, 0);
            ctx.lineTo(-this.size * 1.3, this.size * 0.3);
            ctx.closePath();
            ctx.fill();

            // 3. 3D Flapping Wings
            // Upper Wing
            ctx.save();
            ctx.translate(-this.size * 0.1, -this.size * 0.2);
            ctx.rotate(-0.35 + flapAngle);

            const wingGrad = ctx.createLinearGradient(0, 0, 0, -this.size * 1.3);
            wingGrad.addColorStop(0, '#ffffff');
            wingGrad.addColorStop(0.7, '#fff0f3');
            wingGrad.addColorStop(1, '#ffccd5');
            ctx.fillStyle = wingGrad;

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.quadraticCurveTo(-this.size * 0.4, -this.size * 1.2, this.size * 0.2, -this.size * 1.4);
            ctx.quadraticCurveTo(this.size * 0.6, -this.size * 0.8, this.size * 0.5, 0);
            ctx.closePath();
            ctx.fill();
            ctx.restore();

            // Lower Wing
            ctx.save();
            ctx.translate(this.size * 0.1, 0);
            ctx.rotate(0.35 - flapAngle * 0.7);

            ctx.fillStyle = '#ffe4e9';
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.quadraticCurveTo(-this.size * 0.3, this.size * 0.9, this.size * 0.2, this.size * 1.1);
            ctx.quadraticCurveTo(this.size * 0.5, this.size * 0.6, this.size * 0.4, 0);
            ctx.closePath();
            ctx.fill();
            ctx.restore();

            ctx.restore();
        }
    }

    // Initialize 3D Flying Doves
    const doves = [];
    const doveCount = window.innerWidth < 768 ? 2 : 4;
    for (let i = 0; i < doveCount; i++) {
        const dove = new FlyingDove();
        dove.x = (i * (width / doveCount)) - 120;
        doves.push(dove);
    }

    function releaseDoves(count = 2) {
        for (let i = 0; i < count; i++) {
            const extraDove = new FlyingDove(-100 - i * 80, height * 0.3 + (i * 60), 3.2 + i * 0.6);
            doves.push(extraDove);
        }
    }

    function triggerGrandFireworks() {
        // Multi-stage fireworks & Dove Release
        releaseDoves(3);
        triggerConfettiBurst(60);
        setTimeout(() => {
            for (let i = 0; i < 45; i++) {
                confettiList.push(new ConfettiParticle(width * 0.25, height * 0.5, 1.2));
            }
        }, 200);
        setTimeout(() => {
            for (let i = 0; i < 45; i++) {
                confettiList.push(new ConfettiParticle(width * 0.75, height * 0.5, 1.2));
            }
        }, 400);
        setTimeout(() => {
            for (let i = 0; i < 60; i++) {
                confettiList.push(new ConfettiParticle(width * 0.5, height * 0.3, 1.4));
            }
        }, 600);
    }

    // Animation Loop
    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Render ambient floating particles
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        // Render 3D Flying Doves
        for (let i = doves.length - 1; i >= 0; i--) {
            const d = doves[i];
            d.update();
            d.draw();
            if (doves.length > 5 && d.x > width + 60) {
                doves.splice(i, 1);
            }
        }

        // Render interactive cursor trail
        for (let i = cursorParticles.length - 1; i >= 0; i--) {
            const cp = cursorParticles[i];
            cp.update();
            cp.draw();
            if (cp.opacity <= 0 || cp.size <= 0) {
                cursorParticles.splice(i, 1);
            }
        }

        // Render confetti bursts & fireworks
        for (let i = confettiList.length - 1; i >= 0; i--) {
            const c = confettiList[i];
            c.update();
            c.draw();
            if (c.opacity <= 0) {
                confettiList.splice(i, 1);
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
});
