import { excerpt } from './ourblog-slider.js'

changeLocation()
window.addEventListener('resize', changeLocation)

excerpt(document.querySelectorAll('.client__item p'), 53)

function changeLocation() {
    const clientItem = document.querySelectorAll('.client__item');
    if (clientItem.length) {
        clientItem.forEach(item => {
            const img = item.querySelector(".client__item-img");
            const imgParent = item.querySelector('.client__item-left');
            const rearMore = item.querySelector('.client__item a');

            if (window.innerWidth <= 768) {
                rearMore.insertAdjacentElement("beforebegin", img);
            }
            else {
                imgParent.insertAdjacentElement("afterbegin", img);
            }
        });
    }
}