import Swiper, { Pagination } from "swiper";

const reviewItems = [...document.querySelectorAll('.ourblog__grid article')];

window.addEventListener('resize', function () {
    if (document.querySelector('.ourblog__grid .swiper') &&document.querySelector('.ourblog__grid .swiper').swiper == null && this.window.innerWidth <= 1024) {
        setSlideronMobile(reviewItems)
    }
})
setSlideronMobile(reviewItems)


function setSlideronMobile(elems) {
    if (elems.length) {

        if (window.innerWidth <= 1024) {
            new Swiper('.ourblog__grid .swiper', {
                modules: [
                    Pagination
                ],
                loop: true,
                spaceBetween: 30,
                pagination: {
                    el: '.ourblog__grid ._pagination',
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

const articleExcerpts = document.querySelectorAll('.ourblog__grid article p');
excerpt(articleExcerpts, 19);

export function excerpt(elems, words) {
    if (elems.length) {
        elems.forEach(item => {
            let text = item.innerText.split(' ');

            if (text.length <= words) {
                return
            }

            text = text.splice(0, words)
            item.innerText = text.join(' ') + '...';
        });
    }
}