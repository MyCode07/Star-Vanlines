import Swiper, { Navigation, Pagination } from "swiper";
const whyUsItems = [...document.querySelectorAll('.whyus__flex-item')];


window.addEventListener('resize', function () {
    if (document.querySelector('.whyus__flex .swiper') &&document.querySelector('.whyus__flex .swiper').swiper == null && this.window.innerWidth <= 768) {
        setSlideronMobile(whyUsItems)
    }
})
setSlideronMobile(whyUsItems)

function setSlideronMobile(elems) {
    if (elems.length) {

        if (window.innerWidth <= 768) {

            new Swiper('.whyus__flex .swiper', {
                modules: [
                    Navigation, Pagination
                ],
                loop: true,
                navigation: {
                    prevEl: '.whyus__flex-prev',
                    nextEl: '.whyus__flex-next',
                },
                spaceBetween: 40,
                pagination: {
                    el: '.whyus__flex ._pagination',
                    clickable: true,
                },

                watchSlidesProgress: true,
                watchSlidesVisibility: true,

                on: {
                    resize: function () {
                        if (window.innerWidth > 768) {
                            this.destroy(true, true)
                        }
                    }
                }
            })
        }
    }
}

