import Swiper, { Pagination } from "swiper";

const employeesItems = [...document.querySelectorAll('.employees__flex-item')];

window.addEventListener('resize', function () {
    if (document.querySelector('.employees__flex .swiper') && document.querySelector('.employees__flex .swiper').swiper == null && this.window.innerWidth <= 1024) {
        setSlideronMobile(employeesItems)
    }
})

setSlideronMobile(employeesItems)


function setSlideronMobile(elems) {
    if (elems.length) {

        if (window.innerWidth <= 1024) {

            new Swiper('.employees__flex .swiper', {
                modules: [
                    Pagination
                ],
                loop: true,
                spaceBetween: 30,
                pagination: {
                    el: '._pagination',
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

