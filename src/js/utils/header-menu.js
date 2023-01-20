import gsap from "gsap";
import { isMobile } from "./isMobile.js";

let windowWidth = window.innerWidth
let ismobile = isMobile.any();

window.addEventListener('resize', function () {
    windowWidth = window.innerWidth
    ismobile = isMobile.any();
})

const headerMenu = [...document.querySelectorAll('.header__menu .sub-menu')];

const arrow = `
<svg viewBox="0 0 20 12" fill="none" >
<path d="M2 2L10 10L18 2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

headerMenu.forEach(menu => {
    const li = menu.closest('li');
    const link = li.querySelector('a');
    menuMobile();

    function menuMobile() {
        if (ismobile || windowWidth <= 768) {
            li.classList.add('_click');
            if (!li.querySelector('svg')) {
                link.insertAdjacentHTML('afterend', arrow);
            }
            link.classList.remove('_hover');
        }
        else {
            if (li.querySelector('svg')) {
                li.querySelector('svg').remove();
            }
            li.classList.remove('_click');
        }
    }

    let height = 0;
    [...menu.children].forEach(li => {
        height += getHeight(li);
    })

    window.addEventListener('resize', function () {
        height = 0;
        [...menu.children].forEach(li => {
            height += getHeight(li);
        })
        menuMobile();
    })

    window.addEventListener('scroll', function () {
        height = 0;
        [...menu.children].forEach(li => {
            height += getHeight(li);
        })
        menuMobile();
    })

    li.addEventListener('click', function (e) {
        if (ismobile) {
            e.stopPropagation()
            toggleMenuHeight(menu, height);
        }

    })

    li.addEventListener('mouseenter', function () {
        if (!ismobile) {
            showMenu(menu, height)
            link.classList.add('_hover');
        }
    })

    li.addEventListener('mouseleave', function () {
        if (!ismobile) {
            hideMenu(menu)
            link.classList.remove('_hover');
        }
    })
})

// document.body.addEventListener('click', function (e) {
//     let targetEl = e.target;
//     if (!isMobile.any()) {
//         if (!targetEl.closest('.header__menu li[locked]') && document.querySelectorAll('.header__menu li[locked]').length) {
//             console.log('da');
//             document.querySelectorAll('.header__menu li[locked]').forEach(li => {
//                 li.removeAttribute('locked');
//             })
//         }
//     }
// })

function showMenu(subMenu, height) {
    gsap.timeline()
        .to(subMenu, {
            duration: 0.5,
            height: height,
            ease: "power4.out",
        })
        .set(subMenu, {
            height: 'auto',
        })
}

function hideMenu(subMenu) {
    gsap.timeline()
        .to(subMenu, {
            duration: 0.5,
            height: 0,
            ease: "power4.out",
        })
}

function toggleMenuHeight(submenu, height) {
    let target = submenu.closest('li');
    let lockedSubMenu = document.querySelectorAll('.header__menu li[locked]');

    if (!target.hasAttribute('locked')) {
        if (lockedSubMenu.length && !target.closest('li[locked]')) {
            lockedSubMenu.forEach(locked => {
                closeLockedMenu(locked)
            })
        }

        showMenu(submenu, height);
        submenu.closest('li').setAttribute('locked', 'true')
    }
    else {
        let lockedSubMenu = target.querySelector('li[locked]');
        if (lockedSubMenu) {
            closeLockedMenu(lockedSubMenu)
        }

        hideMenu(submenu);
        submenu.closest('li').removeAttribute('locked')
    }

    function closeLockedMenu(menu) {
        gsap.timeline()
            .to(menu.querySelector('.sub-menu'), {
                duration: 0.5,
                height: 0,
                ease: "power4.out",
            })
        menu.removeAttribute('locked');
    }
}

function getHeight(elem) {
    const compstyle = (typeof window.getComputedStyle === 'undefined') ? elem.currentStyle : window.getComputedStyle(elem);
    let paddingBottom = parseInt(compstyle.marginTop);
    let marginBottom = parseInt(compstyle.marginBottom);
    return elem.getBoundingClientRect().height + paddingBottom + marginBottom;
}


const burger = document.querySelector('.header__burger');
const menu = document.querySelector('.header__menu');
const header = document.querySelector('.header');
const headerButtons = document.querySelector('.header__top-right');

menuToggle();

function menuToggle() {
    if (burger && window.innerWidth <= windowWidth) {
        burger.addEventListener('click', function () {
            document.body.classList.toggle('_noscroll')
            burger.classList.toggle('_active')
            menu.classList.toggle('_open')

            if (header.classList.contains('_stiky') && headerButtons) {
                headerButtons.classList.toggle('_visible')
            }
        })
    }
}