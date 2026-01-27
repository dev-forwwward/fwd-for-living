export function mainInit() {

    const preloader = document.querySelector('.preloader');

    // LENIS
    window.lenis = new Lenis(); // globally available

    // Sync Lenis scrolling with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
    // This ensures Lenis's smooth scroll animation updates on each GSAP tick
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    // Disable lag smoothing in GSAP to prevent any delay in scroll animations
    gsap.ticker.lagSmoothing(0);

    if (preloader) {
        gsap.to('.preloader', {
            opacity: 0,
            delay: .1,
            duration: .5,
            ease: "power2.out",
            onComplete: () => {
                preloader.remove();
            }
        });
    }

    console.log("running mainInit()");
}