export function swiperInit() {

    console.log("running swiper.js");

    // Init Homepage Works Swiper
    let hpWorksSwiper = document.querySelector('.hp_works_swiper');
    const hpWorkSwiperSlides = document.querySelectorAll('.hp_works_slide');

    if (hpWorksSwiper && hpWorkSwiperSlides) {

        setTimeout(() => {
            hpWorksSwiper = new Swiper('.hp_works_swiper', {
                slidesPerView: 1.4,
                spaceBetween: 16,
                centeredSlides: true,
                direction: 'horizontal',
                loop: true,
                speed: 400,
                autoplay: true,

                freeMode: false,
                freeModeMomentum: false,
                allowTouchMove: true,
                slideToClickedSlide: true,

                breakpoints: {
                    // for screens 768px wide and up
                    768: {
                        autoplay: {
                            delay: 0,
                            disableOnInteraction: false, // if true, will pause on hover
                        },
                        loop: true,
                        slidesPerView: 6,
                        spaceBetween: 32,
                        speed: 7500, // Smooth transition speed
                        centeredSlides: false,
                        freeMode: true,
                        // freeModeMomentum: false,
                    }
                },
                on: {
                    init: function () {
                        console.log('Swiper initialized');

                        // fetch all slides again after swiper duplications
                        const allSlides = document.querySelectorAll('.hp_works_slide');

                        // add mouse hover listener to all slides
                        // update swiper measurements with each hover (since they expand on hover)
                        allSlides.forEach((slide) => {
                            slide.addEventListener('mouseenter', () => {
                                if (slide.dataset.dragging !== 'true') {
                                    hpWorksSwiper.update();
                                }
                            });

                            slide.addEventListener('mouseleave', () => {
                                if (slide.dataset.dragging !== 'true') {
                                    hpWorksSwiper.update();
                                }
                            });
                        });
                    },
                    touchStart: function () {
                        const allSlides = document.querySelectorAll('.hp_works_slide');
                        allSlides.forEach(slide => slide.dataset.dragging = 'true');
                    },
                    touchEnd: function () {
                        const allSlides = document.querySelectorAll('.hp_works_slide');
                        allSlides.forEach(slide => slide.dataset.dragging = 'false');
                    },
                    slideChangeTransitionEnd: function () {
                        // Update after slide transition completes (for desktop hover expansion)
                        if (window.innerWidth >= 768) {
                            hpWorksSwiper.update();
                        }
                    },
                }
            });

            window.addEventListener('resize', () => { hpWorksSwiper.update(); });

        }, 800);

    }

}