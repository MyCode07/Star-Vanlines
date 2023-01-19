import Swiper, { Pagination } from "swiper";

const reviewItems = [...document.querySelectorAll('.review__flex-item')];

window.addEventListener('resize', function () {
    if (document.querySelector('.review__flex .swiper') && document.querySelector('.review__flex .swiper').swiper == null && this.window.innerWidth <= 768) {
        setSlideronMobile(reviewItems)
    }
})

setSlideronMobile(reviewItems)


function setSlideronMobile(elems) {
    if (elems.length) {

        if (window.innerWidth <= 1024) {

            new Swiper('.review__flex .swiper', {
                modules: [
                    Pagination
                ],
                loop: true,
                spaceBetween: 30,
                pagination: {
                    el: '.review__flex ._pagination',
                    clickable: true,
                },
                watchSlidesProgress: true,
                watchSlidesVisibility: true,

                on: {
                    resize: function () {
                        if (window.innerWidth > 1025) {
                            this.destroy(true, true)
                        }
                    }
                }
            })
        }
    }
}

