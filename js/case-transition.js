const mobileBreakpoint = 767;

export function caseTransition() {
    const caseSection = document.querySelector('.section_work_case');
    const caseSectionMain = document.querySelector('.work_case_page_content_wrapper');
    const nextCaseContainer = document.querySelector('.work_case_next_case_content');

    console.log("running caseTransition()");

    if (caseSection && caseSectionMain && nextCaseContainer) {
        const imgs = [...document.images];
        const pending = imgs.filter(img => !img.complete);
        const ready = () => {
            gsap.timeline({
                scrollTrigger: {
                    trigger: caseSection,
                    start: 'bottom bottom',
                    end: '+=1200px',
                    pin: caseSectionMain,
                    scrub: true,
                }
            }).from(nextCaseContainer, {
                opacity: 0,
                duration: 1.2,
                ease: 'power1.out'
            }).from('.slide-from-right', {
                x: ()=> {
                    return (document.querySelector('.work_case_next_case_wrapper').offsetWidth/2)
                },
                duration: 1,
                ease: 'none'
            }, "<")
            .to('.work_case_page_content', {
                x: () => {
                    let leftOffset = - document.querySelector('.work_case_next_case_wrapper').offsetWidth;
                    if(window.innerWidth <= mobileBreakpoint) {
                        leftOffset = -window.innerWidth;
                    }
                    return leftOffset
                },
                duration: 1,
                ease: 'none'
            }, "<")
            .to(caseSection, {
                delay: .25,
                background: 'black',
                duration: 1,
                ease: 'power1.out'
            }, "<");
        };

        if (pending.length === 0) {
            ready();
        } else {
            let loaded = 0;
            pending.forEach(img => img.addEventListener('load', () => {
                if (++loaded === pending.length) ready();
            }));
        }
    }

}