import gsap from "gsap";

let windowWidth = window.innerWidth

window.addEventListener('resize', function () {
    windowWidth = window.innerWidth
})

const headerMenu = [...document.querySelectorAll('.footer__menu ul')];

const arrow = `
<svg viewBox="0 0 20 12" fill="none" >
<path d="M2 2L10 10L18 2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

headerMenu.forEach(menu => {
    const li = menu.querySelectorAll('li')[0];
    let link = null;
    if (li.querySelector('a')) {
        link = li.querySelector('a');
    }

    if (windowWidth > 768) {
        menu.style.height = 'auto'
    }


    mebunibile();
    function mebunibile() {
        if (windowWidth <= 768) {
            if (!li.querySelector('svg')) {
                li.insertAdjacentHTML('beforeend', arrow);
            }
            if (!menu.querySelector('li[locked]')) {
                menu.style.height = 24 + 'px'
            }
        }

        else {
            if (li.querySelector('svg')) {
                li.querySelector('svg').remove();
            }
            if (!menu.querySelector('li[locked]')) {
                menu.style.height = 'auto'
            }
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
        mebunibile();
    })
    li.addEventListener('click', function (e) {
        e.stopPropagation()
        toggleMenuHeight(menu, height);
    })
})

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
            height: 25,
            ease: "power4.out",
        })
}

function toggleMenuHeight(submenu, height) {
    let target = submenu.querySelectorAll('li')[0];
    let lockedSubMenu = document.querySelectorAll('.footer__menu li[locked]');

    if (!target.hasAttribute('locked')) {
        if (lockedSubMenu.length && !target.querySelector('li[locked]')) {
            lockedSubMenu.forEach(locked => {
                closeLockedMenu(locked.closest('ul'))
            })
        }

        showMenu(submenu, height);
        submenu.querySelectorAll('li')[0].setAttribute('locked', 'true')
    }
    else {
        let lockedSubMenu = target.querySelector('li[locked]');
        if (lockedSubMenu) {
            closeLockedMenu(lockedSubMenu)
        }

        hideMenu(submenu);
        submenu.querySelectorAll('li')[0].removeAttribute('locked')
    }

    function closeLockedMenu(menu) {
        gsap.timeline()
            .to(menu, {
                duration: 0.5,
                height: 25,
                ease: "power4.out",
            })
        menu.querySelectorAll('li')[0].removeAttribute('locked')
    }
}

function getHeight(elem) {
    const compstyle = (typeof window.getComputedStyle === 'undefined') ? elem.currentStyle : window.getComputedStyle(elem);
    let paddingBottom = parseInt(compstyle.marginTop);
    let marginBottom = parseInt(compstyle.marginBottom);
    return elem.getBoundingClientRect().height + paddingBottom + marginBottom;
}

