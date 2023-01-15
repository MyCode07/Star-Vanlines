import gsap from "gsap";
import { isMobile } from "./isMobile.js";

const headerMenu = [...document.querySelectorAll('.header__menu .sub-menu')];

const arrow = `
<svg viewBox="0 0 20 12" fill="none" >
<path d="M2 2L10 10L18 2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

headerMenu.forEach(menu => {
    const li = menu.closest('li');
    const link = li.querySelector('a');
    link.insertAdjacentHTML('afterend', arrow);

    if (isMobile.any() || window.innerWidth <= 768) {
        li.classList.add('_click');
    }

    let height = 0;
    [...menu.children].forEach(li => {
        height += getHeight(li);
    })

    if (!isMobile.any()) {
        li.addEventListener('mouseenter', function () {
            showMenu(menu, height)
            link.classList.add('_hover');
        })
        li.addEventListener('mouseleave', function () {
            hideMenu(menu)
            link.classList.remove('_hover');
        })
    }
    else {
        li.addEventListener('click', function (e) {
            e.stopPropagation()
            toggleMenu(menu, height);
        })
    }
})

function showMenu(subMenu, height) {
    gsap.timeline()
        .to(subMenu, {
            duration: 0.5,
            height: height,
            ease: "power4.out",
        })
        .set(subMenu, {
            delay: 0.1,
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

function toggleMenu(submenu, height) {
    let target = submenu.closest('li');
    let lockedSubMenu = document.querySelectorAll('.header__menu li[locked]');

    if (!target.hasAttribute('locked')) {

        if (lockedSubMenu.length) {

            if (target.closest('li[locked]')) {
                console.log('locked');
            }
            else {
                lockedSubMenu.forEach(locked => {
                    gsap.timeline()
                        .to(locked.querySelector('.sub-menu'), {
                            duration: 0.5,
                            height: 0,
                            ease: "power4.out",
                        })
                    locked.removeAttribute('locked');
                })
            }
        }

        showMenu(submenu, height);
        submenu.closest('li').setAttribute('locked', 'true')
    }
    else {
        let lockedSubMenu = target.querySelector('li[locked]');
        if (lockedSubMenu) {
            gsap.timeline()
                .to(lockedSubMenu.querySelector('.sub-menu'), {
                    duration: 0.5,
                    height: 0,
                    ease: "power4.out",
                })
            lockedSubMenu.removeAttribute('locked');
        }

        hideMenu(submenu);
        submenu.closest('li').removeAttribute('locked')
    }
}

function getHeight(elem) {
    const compstyle = (typeof window.getComputedStyle === 'undefined') ? elem.currentStyle : window.getComputedStyle(elem);
    let paddingBottom = parseInt(compstyle.marginTop);
    let marginBottom = parseInt(compstyle.marginBottom);
    return elem.getBoundingClientRect().height + paddingBottom + marginBottom;
}