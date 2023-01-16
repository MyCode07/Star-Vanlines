const search = document.querySelector('.header__search');
const menu = document.querySelector('.header__menu');

if (search && window.innerWidth <= 768) {
    menu.insertAdjacentElement('afterbegin', search)
}