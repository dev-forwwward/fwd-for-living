const mobileBreakpoint = 767;

export function homepage() {
    const homepageBody = document.querySelector('.homepage_body');

    if (homepageBody) {
        const heroSection = document.querySelector('.section_hero');
        const heroCards = document.querySelectorAll('.section_hero_followup_content_card');

        if (heroCards.length > 0 && heroSection && window.innerWidth > mobileBreakpoint) {

            // DEKSTOP & TABLET Hero Interaction
            gsap.timeline({
                scrollTrigger: {
                    trigger: heroSection,
                    pin: true,
                    start: 'top top',
                    end: '+=180%',
                    scrub: 1
                }
            })
                .to('.hero_image-overlay-layer', {
                    delay: .125,
                    opacity: .8,
                    duration: .8,
                    ease: 'power2.out'
                })
                .to('.hero_main_content', {
                    delay: .08,
                    opacity: 0,
                    filter: 'blur(5px)',
                    duration: 1,
                    ease: 'power2.out'
                }, "<")
                .from(heroCards, {
                    yPercent: 200,
                    stagger: .1,
                    duration: 1,
                    ease: 'none'
                }, "<");
        } else if (heroCards.length > 0 && heroSection && window.innerWidth <= mobileBreakpoint) {
            // MOBILE Hero Interaction

            // Hero content fadef-out
            gsap.timeline({
                scrollTrigger: {
                    trigger: heroSection,
                    pin: '.hero_main_content',
                    start: 'top top',
                    end: 'bottom 25%',
                    pinSpacing: false,
                    scrub: 1
                }
            })
                .to('.hero_image-overlay-layer', {
                    delay: .05,
                    opacity: .8,
                    duration: .8,
                    ease: 'none'
                })
                .to('.hero_main_content', {
                    delay: .08,
                    opacity: 0,
                    filter: 'blur(5px)',
                    duration: 1,
                    ease: 'none'
                }, "<");

            // Card Highlight
            heroCards.forEach((card) => {
                gsap.to(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 62%',
                        end: 'top 16%',
                        scrub: false,
                        onEnter: () => {
                            card.classList.add("active");
                        },
                        onLeave: () => {
                            card.classList.remove("active");
                        },
                        onEnterBack: () => {
                            card.classList.add("active");
                        },
                        onLeaveBack: () => {
                            card.classList.remove("active");
                        }
                    }
                });
            });

        }

        // Waterfall section
        const waterfallBlocks = document.querySelectorAll('.waterfall_text_block');
        if (window.innerWidth > 991) {
            waterfallBlocks.forEach((block) => {
                gsap.timeline({
                    scrollTrigger: {
                        trigger: block,
                        start: 'top 55%',
                        scrub: false
                    }
                }).from(block.querySelector('.waterfall-number'), {
                    opacity: 0,
                    xPercent: -20,
                    duration: .5,
                    ease: 'power2.out'
                }).from(block.querySelectorAll('.waterfall_text_container > div'), {
                    opacity: 0,
                    delay: .2,
                    xPercent: -20,
                    stagger: .1,
                    duration: .5,
                    ease: 'power2.out'
                }, "<")
                    .fromTo(block.querySelector('.waterfall_text_block_line_container'), {
                        height: "0%",
                        width: "1px"
                    }, {
                        height: "100%",
                        width: "1px",
                        duration: .45,
                        delay: .25,
                        ease: 'none'
                    }, "<")
                    .fromTo(block.querySelector('.waterfall_text_block_line_container'), {
                        width: "1px"
                    }, {
                        width: "100%",
                        delay: .45,
                        duration: 1,
                        ease: 'power2.out'
                    }, "<");
            });
        } else {
            waterfallBlocks.forEach((block) => {
                gsap.timeline({
                    scrollTrigger: {
                        trigger: block,
                        start: 'top 55%',
                        scrub: false
                    }
                }).from(block.querySelector('.waterfall-number'), {
                    opacity: 0,
                    yPercent: -20,
                    duration: .5,
                    ease: 'power2.out'
                }).from(block.querySelectorAll('.waterfall_text_container > div'), {
                    opacity: 0,
                    delay: .2,
                    yPercent: -20,
                    stagger: .1,
                    duration: .5,
                    ease: 'power2.out'
                }, "<")
                    .fromTo(block.querySelector('.waterfall_text_block_svg_container.hide-desktop'), {
                        height: "0%",
                        width: "1px"
                    }, {
                        height: "100%",
                        width: "1px",
                        duration: .45,
                        delay: .25,
                        ease: 'none'
                    }, "<");
            });
        }
    }
}