import Swiper, { Pagination } from "swiper";

const processGridItems = [...document.querySelectorAll('.process__grid-item')];

window.addEventListener('resize', function () {
    if (document.querySelector('.process__grid .swiper') &&document.querySelector('.process__grid .swiper').swiper == null && this.window.innerWidth <= 768) {
        setSlideronMobile(processGridItems)
    }
})
setSlideronMobile(processGridItems)

function setSlideronMobile(elems) {
    if (elems.length) {

        if (window.innerWidth <= 768) {

            new Swiper('.process__grid .swiper', {
                modules: [
                    Pagination
                ],
                loop: true,
                spaceBetween: 30,
                pagination: {
                    el: '.process__grid ._pagination',
                    clickable: true,
                },
                watchSlidesProgress: true,
                watchSlidesVisibility: true,

                on: {
                    resize: function () {
                        if (window.innerWidth > 769) {
                            this.destroy(true, true)
                        }
                    }
                }
            })
        }
    }
}

