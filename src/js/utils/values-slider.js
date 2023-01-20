import Swiper, { Pagination } from "swiper";

const processGridItems = [...document.querySelectorAll('.values article')];

window.addEventListener('resize', function () {
    if (document.querySelector('.values .swiper') && document.querySelector('.values .swiper').swiper == null && this.window.innerWidth <= 768) {
        setSlideronMobile(processGridItems)
    }
})
setSlideronMobile(processGridItems)

function setSlideronMobile(elems) {
    if (elems.length) {

        if (window.innerWidth <= 768) {

            new Swiper('.values .swiper', {
                modules: [
                    Pagination
                ],
                loop: true,
                spaceBetween: 30,
                pagination: {
                    el: '.values ._pagination',
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

