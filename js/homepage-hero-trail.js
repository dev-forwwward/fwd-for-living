export function homepageHeroTrail() {

    const heroBgImg = document.querySelector('.hero_image-bg-layer');
    const heroOverlayImg = document.querySelector('.hero_image-plant-overlay-layer');

    const maskCircle = document.querySelector('#heroCircleMask circle');

    if (heroBgImg && heroOverlayImg && window.innerWidth > 991) {

        window.addEventListener('mousemove', e => {
            // handleMove(e.clientX, e.clientY)
            let moveX = e.clientX - window.innerWidth/2;
            let moveY = e.clientY - window.innerHeight/2;
            gsap.to(maskCircle, {
                x: moveX,
                y: moveY,
                duration: .05,
                ease: 'power2.out',
            });
        });

        // CANVAS-BASED INTERACTION
        // const CONFIG = { revealRadius: 450, fadeMs: 400, spawnDist: 5, maxStamps: 100 };

        // const canvas = document.querySelector('#hpHeroCanvas');
        // const ctx = canvas.getContext('2d');
        // const offscreen = document.createElement('canvas');
        // const offCtx = offscreen.getContext('2d');

        // let W, H;
        // let stamps = [], lastX = -9999, lastY = -9999, mouse = { x: -9999, y: -9999 };

        // function resize() {
        //     W = canvas.width = offscreen.width = window.innerWidth;
        //     H = canvas.height = offscreen.height = window.innerHeight;
        // }
        // window.addEventListener('resize', resize);
        // resize();

        // // Input
        // function handleMove(x, y) {
        //     mouse.x = x; mouse.y = y;

        //     const dx = x - lastX, dy = y - lastY;
        //     if (dx * dx + dy * dy < CONFIG.spawnDist ** 2) return;
        //     stamps.push({ x, y, born: performance.now() });
        //     if (stamps.length > CONFIG.maxStamps) stamps.shift();
        //     lastX = x; lastY = y;
        // }
        
        // window.addEventListener('touchmove', e => {
        //     e.preventDefault();
        //     handleMove(e.touches[0].clientX, e.touches[0].clientY);
        // }, { passive: false });

        // function coverFit(c, img, w, h) {
        //     const imgW = img.naturalWidth || img.width;
        //     const imgH = img.naturalHeight || img.height;
        //     const scale = Math.max(w / imgW, h / imgH);
        //     const dw = imgW * scale, dh = imgH * scale;
        //     c.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
        // }

        // function drawCursor(x, y) {
        //     ctx.save();
        //     ctx.strokeStyle = 'rgba(255,255,255,0.7)';
        //     ctx.lineWidth = 1.5;
        //     ctx.beginPath();
        //     ctx.arc(x, y, 7, 0, Math.PI * 2);
        //     ctx.stroke();
        //     ctx.fillStyle = 'rgba(255,255,255,0.9)';
        //     ctx.beginPath();
        //     ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        //     ctx.fill();
        //     ctx.restore();
        // }


        // loop();

        // NOT RUNNING
        function loop() {
            const now = performance.now();

            // 1. Draw bg as the base — full, normal, no effects
            ctx.clearRect(0, 0, W, H);
            ctx.globalCompositeOperation = 'source-over';
            coverFit(ctx, heroBgImg, W, H);

            // 2. On offscreen: create mask from stamps, then composite overlay through it
            offCtx.clearRect(0, 0, W, H);

            // Skip if no stamps to avoid showing full overlay
            if (stamps.length > 0) {
                offCtx.globalCompositeOperation = 'source-over';

                // Draw mask shapes first
                for (let i = stamps.length - 1; i >= 0; i--) {
                    const s = stamps[i];
                    const age = now - s.born;
                    if (age >= CONFIG.fadeMs) { stamps.splice(i, 1); continue; }

                    const t = age / CONFIG.fadeMs;
                    const alpha = 1 - t * t;

                    const grad = offCtx.createRadialGradient(s.x, s.y, 0, s.x, s.y, CONFIG.revealRadius);
                    grad.addColorStop(0, `rgba(255,255,255,${alpha})`);
                    grad.addColorStop(0.55, `rgba(255,255,255,${alpha * 0.55})`);
                    grad.addColorStop(1, 'rgba(255,255,255,0)');

                    offCtx.fillStyle = grad;
                    offCtx.beginPath();
                    offCtx.arc(s.x, s.y, CONFIG.revealRadius, 0, Math.PI * 2);
                    offCtx.fill();
                }

                // Now composite overlay image through the mask
                offCtx.globalCompositeOperation = 'source-in';
                coverFit(offCtx, heroOverlayImg, W, H);
            }

            // 3. Blend the masked fg patch onto the bg
            ctx.globalCompositeOperation = 'overlay';
            // ctx.globalCompositeOperation = 'multiply';
            ctx.drawImage(offscreen, 0, 0);
            ctx.globalCompositeOperation = 'source-over';

            // 4. Cursor
            // if (mouse.x > -100) drawCursor(mouse.x, mouse.y);

            requestAnimationFrame(loop);
        }
    } else {
        // Mobile fallback: animate SVG circle mask
        if (maskCircle) {
            // Animate the circle position within the mask
            gsap.fromTo(maskCircle, {
                attr: { cx: '75%', cy: '5%' },
            }, {
                attr: { cx: '15%', cy: '75%' },
                duration: 3,
                ease: 'power2.inOut',
                yoyo: true,
                repeat: -1
            });
        }
    }
}