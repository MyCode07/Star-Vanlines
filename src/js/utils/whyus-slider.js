import { Swiper, Navigation, Pagination } from "swiper";

const whyUsItems = [...document.querySelectorAll('.whyus__flex-item')];

setSlideronMobile(whyUsItems)

window.addEventListener('resize', function () {
    setSlideronMobile(whyUsItems)
})


function setSlideronMobile(elems) {
    if (elems.length) {
        let swiper = null;

        if (window.innerWidth <= 768) {

            swiper = new Swiper('.whyus__flex .swiper', {
                modules: [
                    Navigation, Pagination
                ],
                loop: true,
                pagination: {
                    el: '.whyus__flex-pagination',
                    clickable: true,
                },
                navigation: {
                    prevEl: '.whyus__flex-prev',
                    nextEl: '.whyus__flex-next',
                },
                spaceBetween: 40,
                on: {
                    resize: function () {
                        if (window.innerWidth > 769) {
                            swiper.destroy(true, true)
                        }
                    }
                }
            })
        }
    }
}

