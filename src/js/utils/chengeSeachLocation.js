const search = document.querySelector('.header__search');
const menu = document.querySelector('.header__menu');

changeLocation()
window.addEventListener('resize', changeLocation)

function changeLocation() {
    if (search && window.innerWidth <= 768) {
        menu.insertAdjacentElement('afterbegin', search)
    }
    else {
        document.querySelector('.header__actions').insertAdjacentElement('beforebegin', search)
    }
}