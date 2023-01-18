import { Swiper, Pagination } from "swiper";

const processGridItems = [...document.querySelectorAll('.process__grid-item')];

setSlideronMobile(processGridItems)

window.addEventListener('resize', function () {
    setSlideronMobile(processGridItems)
})


function setSlideronMobile(elems) {
    if (elems.length) {
        let swiper = null;

        if (window.innerWidth <= 768) {

            swiper = new Swiper('.process__grid .swiper', {
                modules: [
                    Pagination
                ],
                loop: true,
                pagination: {
                    el: '.process__grid-pagination',
                    clickable: true,
                },
                spaceBetween: 30,
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

