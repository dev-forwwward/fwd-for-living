export function mainInit() {

    const preloader = document.querySelector('.preloader');
    const containerL = document.querySelector('.container-large'); // for container width measurements reference
    let containerWidth = containerL.offsetWidth;

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
            delay: .25,
            duration: .5,
            ease: "power2.out",
            onComplete: () => {
                preloader.remove();
            }
        });
    }


    // SERVICES PAGE 
    // - Hero Reveal
    const imgOverlayContainer = document.querySelector('.header32_background-image-wrapper.overlay-reveal');

    if (imgOverlayContainer) {
        gsap.timeline()
            .to(imgOverlayContainer, {
                delay: .1,
                clipPath: 'polygon(25% 90%, 75% 90%, 75% 100%, 25% 100%)',
                duration: .3,
                ease: 'none',
            });

        setTimeout(() => {
            gsap.fromTo(imgOverlayContainer, {
                clipPath: 'polygon(25% 90%, 75% 90%, 75% 100%, 25% 100%)',
            }, {
                scrollTrigger: {
                    trigger: '.services_hero_section',
                    pin: true,
                    start: 'top top',
                    end: '+=200%',
                    scrub: true,
                },
                immediateRender: false,
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                duration: 1,
                ease: 'none'
            })
        }, 50);
    }

    // - Project Rows
    const pjStepsRows = document.querySelectorAll('.step-row');
    const pjStepsContainer = document.querySelector('.project-step-container-2');
    const pjDescList = document.querySelectorAll('.pj_step_desc');

    if (pjStepsContainer && pjStepsRows.length > 0 && pjDescList.length > 0) {

        const pjRulerMarks = document.querySelectorAll('.ruler_marker-2');
        const totalMarks = pjRulerMarks.length;
        const pjContext = document.querySelector('.pj_step_context_container');

        let rowVisibilityEnd = 'bottom 25%';
        let rulerStart = 'top 25%';

        setTimeout(() => {
            pjStepsRows.forEach((row, i) => {

                // rows active
                ScrollTrigger.create({
                    trigger: row,
                    start: () => {
                        if (window.innerWidth <= 991) { rulerStart = 'top 50%' } else { rulerStart = 'top 25%'; }
                        return rulerStart;
                    },
                    end: () => {
                        if (window.innerWidth <= 991) { rowVisibilityEnd = 'bottom 50%' } else { rowVisibilityEnd = 'bottom 25%' }
                        return rowVisibilityEnd
                    },
                    scrub: true,
                    onEnter: () => {
                        let currentActiveRow = document.querySelector('.step-row.active');
                        let currentActiveDesc = document.querySelector('.pj_step_desc.active');
                        // just to make sure there are no more than 1 row with the .active class
                        if (currentActiveRow) {
                            currentActiveRow.classList.remove('active');
                        }
                        //apply same logic to desc container
                        if (currentActiveDesc) {
                            currentActiveDesc.classList.remove('active');
                        }
                        row.classList.add('active');
                        pjDescList[i].classList.add('active');
                    },
                    onLeave: () => {
                        row.classList.remove('active');
                        row.classList.add('mobile-hidden');
                        console.log("ON LEAVE")
                    },
                    onEnterBack: () => {
                        let currentActiveRow = document.querySelector('.step-row.active');
                        let currentActiveDesc = document.querySelector('.pj_step_desc.active');
                        if (currentActiveRow) {
                            currentActiveRow.classList.remove('active');
                        }
                        if (currentActiveDesc) {
                            currentActiveDesc.classList.remove('active');
                        }
                        row.classList.add('active');
                        row.classList.remove('mobile-hidden');
                        pjDescList[i].classList.add('active');
                    },
                    onLeaveBack: () => {
                        row.classList.remove('active');
                    }
                });

                let slideInEnd = 'top 10%';

                // rows slide-in
                gsap.from(row.querySelector('.step-name'), {
                    scrollTrigger: {
                        trigger: row,
                        start: 'top 90%',
                        end: () => {
                            if (window.innerWidth <= 991) { slideInEnd = 'top 25%' }
                            return slideInEnd
                        },
                        scrub: true,
                    },
                    opacity: 0,
                    x: () => {
                        let leftTranslate = window.innerWidth;
                        return leftTranslate
                    },
                    ease: 'power2.out'
                });
            });

            // ruller scroll effect
            ScrollTrigger.create({
                trigger: pjStepsContainer,
                start: () => {
                    return rulerStart;
                },
                end: () => { return rowVisibilityEnd },
                scrub: true,
                onUpdate: (self) => {
                    let progress = self.progress;
                    let prevIndexItem = document.querySelector('.ruler_marker-2.active');
                    let currentIndex = Math.round(progress * (totalMarks - 1));
                    let currentIndexItem = pjRulerMarks[currentIndex];

                    if (prevIndexItem !== currentIndexItem) {
                        document.querySelector('.ruler_marker-2.active').classList.remove('active');
                        pjRulerMarks[currentIndex].classList.add('active');
                    }

                },
                onEnter: () => {
                    gsap.fromTo(pjContext, {
                        opacity: 0
                    }, {
                        opacity: 1,
                        duration: .5,
                        ease: 'power2.out'
                    });
                },
                onLeaveBack: () => {
                    gsap.to(pjContext, {
                        opacity: 0,
                        duration: .5,
                        ease: 'power2.out'
                    });
                }
            });
        }, 750);
    }

    // RULER EFFECT (WORK PAGE)
    const filterItems = document.querySelectorAll('.filter_item');
    const filterInner = document.querySelector('.filter_ruler_inner');
    const rulerMarker = document.querySelector('.ruler_marker');
    const gap = 30;
    let distanceToNextTag = 9 * gap; // each tag is separated by 9 markers, this value will be static across different screen sizes

    if (filterInner && rulerMarker && filterItems.length > 0) {
        rulerMarker.classList.remove('active');

        // calculate total n of marker elements
        let nTotalMarkers = containerWidth * 3 / gap;

        for (let i = 0; i < nTotalMarkers; i++) {
            filterInner.appendChild(rulerMarker.cloneNode(true));
        }

        const markersList = document.querySelectorAll('.ruler_marker');
        // console.log(markersList);
        let starterMarker = markersList.length - 35;
        markersList[starterMarker].classList.add('active');

        let activeIndex = 0;
        let currentX = 0;

        filterItems.forEach((filter, index) => {
            filter.addEventListener('click', () => {

                if (activeIndex == index) {
                    return
                }

                let direction = -1;

                // check new active filter index compared to previous
                // to know direction of movement
                if (activeIndex < index) {
                    direction = 1;
                }

                let indexSpace = Math.abs(activeIndex - index); // the space (in number of indexes) that sparate the previous and current active filter
                currentX += direction * indexSpace * distanceToNextTag;

                console.log("separated by ", indexSpace);
                // ruler slide animation on filter click
                if (window.innerWidth > 767) {
                    gsap.to(filterInner, {
                        x: currentX,
                        duration: .8,
                        ease: 'power2.out'
                    });
                }

                // update tag 'active' state visiblity
                filterItems[activeIndex].querySelector('.tag').classList.remove("active");
                filterItems[index].querySelector('.tag').classList.add("active");

                // update active index
                activeIndex = index;
            });
        });

    }

    // CASE HOVER (WORK PAGE)
    const caseListContainer = document.querySelector('.blog12_list');
    const caseList = document.querySelectorAll('.blog12_item');
    const seeMoreTag = document.querySelector('.see-more-text-container');

    if (caseListContainer && seeMoreTag && caseList.length > 0 && window.innerWidth > 991) {
        caseList.forEach((item) => {
            let itemImg = item.querySelector('img');

            itemImg.addEventListener('mouseover', (e) => {
                e.stopPropagation();
                seeMoreTag.classList.add('show');
            });

            itemImg.addEventListener('mouseout', (e) => {
                e.stopPropagation();
                seeMoreTag.classList.remove('show');
            });
        });
    }


    // CONTACT PAGE BG MAP Interaction
    const bgMap = document.querySelector('.contact_map_bg_container');

    if (bgMap) {
        // on load reveal
        gsap.fromTo(bgMap, {
            opacity: 0
        }, {
            opacity: 1,
            delay: .3,
            duration: 1.25
        });
    }

    setTimeout(() => {
        window.addEventListener('mousemove', (e) => {

            let mouseX = e.clientX;
            let mouseY = e.clientY;

            // WORK PAGE CURSOR INTERATION
            if (caseListContainer && seeMoreTag && caseList.length > 0 && window.innerWidth > 991) {

                gsap.to(seeMoreTag, {
                    left: mouseX + 10,
                    top: mouseY - 35,
                    duration: .5,
                    delay: .01,
                    ease: 'power2.out'
                });
            }

            const bgMapDot = document.querySelector('.contact_map_bg_dot');

            const bgMapInfoBox = document.querySelector('.location_info_container');

            if (bgMap && bgMap && bgMapInfoBox && window.innerWidth > 991) {

                let percentCap = 30;
                let mouseXMapped = mouseX * percentCap / window.innerWidth - (percentCap / 2);
                let mouseYMapped = mouseY * percentCap / window.innerHeight - (percentCap / 2);

                gsap.to(bgMap, {
                    x: () => {
                        let xTranslate = window.innerWidth * mouseXMapped * .001;
                        return xTranslate
                    },
                    y: () => {
                        let yTranslate = window.innerHeight * mouseYMapped * .001;
                        return yTranslate
                    },
                    duration: 0.6,
                    ease: 'power1.out'
                });

                gsap.to(bgMapDot, {
                    x: () => {
                        let xTranslate = window.innerWidth * mouseXMapped * .001;
                        return xTranslate
                    },
                    y: () => {
                        let yTranslate = window.innerHeight * mouseYMapped * .001;
                        return yTranslate
                    },
                    duration: 0.6,
                    ease: 'power1.out'
                });

                gsap.to(bgMapInfoBox, {
                    x: () => {
                        let xTranslate = window.innerWidth * mouseXMapped * .0005;
                        return xTranslate
                    },
                    y: () => {
                        let yTranslate = window.innerHeight * mouseYMapped * .0005;
                        return yTranslate
                    },
                    duration: 0.75,
                    ease: 'power2.out'
                });

                // console.log(mouseXMapped);
            }


        });
    }, 200);

    // Work Case Link Redirect (for case links in Homepage and Works)
    const workCaseLinks = document.querySelectorAll('.work_case_link');
    if (workCaseLinks.length > 0) {
        workCaseLinks.forEach(link => {
            link.href += link.getAttribute('slug');
        });
    }

    // TEAM PAGE SECTION
    const teamSection = document.querySelector('.team_cols_section');

    if (teamSection) {
        gsap.timeline({
            scrollTrigger: {
                trigger: teamSection,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        })
            .to('.team-2_list_col:nth-child(odd)', {
                yPercent: 20,
                duration: 1,
                ease: 'none'
            })
            .to('.team-2_list_col:nth-child(even)', {
                yPercent: -10,
                duration: 1,
                ease: 'none'
            }, "<");

    }

    console.log("running mainInit()");
}