import { Swiper, Pagination } from "swiper";

const reviewItems = [...document.querySelectorAll('.ourblog__grid article')];

setSlideronMobile(reviewItems)

window.addEventListener('resize', function () {
    setSlideronMobile(reviewItems)
})


function setSlideronMobile(elems) {
    if (elems.length) {
        let swiper = null;

        if (window.innerWidth <= 1024) {

            swiper = new Swiper('.ourblog__grid .swiper', {
                modules: [
                    Pagination
                ],
                loop: true,
                pagination: {
                    el: '.ourblog__grid-pagination',
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

const articleExcerpts = document.querySelectorAll('.ourblog__grid article p');
excerpt(articleExcerpts);

function excerpt(elems) {
    if (elems.length) {
        elems.forEach(item => {
            let text = item.innerText.split(' ');

            if (text.length <= 19) {
                return
            }

            text = text.splice(0, 19)
            item.innerText = text.join(' ') + '...';
        });
    }
}