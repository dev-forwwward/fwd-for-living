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
                    end: '+=200%',
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
                    delay: .1,
                    yPercent: 200,
                    stagger: .05,
                    duration: 1,
                    ease: 'power2.out'
                }, "<");
        } else if (heroCards.length > 0 && heroSection && window.innerWidth <= mobileBreakpoint) {
            // MOBILE Hero Interaction
            // Card Highlight
            heroCards.forEach((card) => {
                gsap.to(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 58%',
                        end: 'top 10%',
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
    }
}