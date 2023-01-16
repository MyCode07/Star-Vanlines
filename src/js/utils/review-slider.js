import { Swiper, Pagination } from "swiper";

const reviewItems = [...document.querySelectorAll('.review__flex-item')];

setSlideronMobile(reviewItems)

window.addEventListener('resize', function () {
    setSlideronMobile(reviewItems)
})


function setSlideronMobile(elems) {
    if (elems.length) {
        let swiper = null;

        if (window.innerWidth <= 1024) {

            swiper = new Swiper('.review__flex .swiper', {
                modules: [
                    Pagination
                ],
                loop: true,
                pagination: {
                    el: '.review__flex-pagination',
                    clickable: true,
                },
                spaceBetween: 30,
                on: {
                    resize: function () {
                        if (window.innerWidth > 1025) {
                            swiper.destroy(true, true)
                        }
                    }
                }
            })
        }
    }
}

