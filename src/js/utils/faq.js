import gsap from "gsap";

const faqs = document.querySelectorAll('[data-accordeon-item]');
let locked = false;

if (faqs.length) {
    faqs.forEach(faq => {
        const question = faq.querySelector('[data-accordeon-open]');
        const answer = faq.querySelector('[data-accordeon-hidden]');
        const height = getHeight(faq.querySelector('[data-accordeon-height]'));

        question.addEventListener('click', function () {
            locked = [...faqs].some(item => checkLocked(item));
            toggleHeight(answer, height, locked)
        })
    })
}

function checkLocked(el) {
    if (el.hasAttribute('locked')) {
        return el;
    }
}

function toggleHeight(elem, height, locked) {
    function open() {
        gsap.timeline()
            .to(elem, {
                duration: 0.5,
                height: height,
                ease: "power4.out",
            })
            .set(elem, {
                height: 'auto',
            })
    }

    function close() {
        gsap.timeline()
            .to(elem, {
                duration: 0.5,
                height: 0,
                ease: "power4.out",
            })
    }

    if (!elem.closest('[data-accordeon-item]').hasAttribute('locked')) {

        let openElem = document.querySelector('[data-accordeon-item][locked]');
        if (openElem) {
            gsap.timeline()
                .to(openElem.querySelector('[data-accordeon-hidden]'), {
                    duration: 0.5,
                    height: 0,
                    ease: "power4.out",
                })
            openElem.removeAttribute('locked');
        }

        open();
        elem.closest('[data-accordeon-item]').setAttribute('locked', 'true')
    }
    else {
        close();
        elem.closest('[data-accordeon-item]').removeAttribute('locked')
    }
}

function getHeight(elem) {
    const compstyle = (typeof window.getComputedStyle === 'undefined') ? elem.currentStyle : window.getComputedStyle(elem);
    let paddingTop = parseInt(compstyle.marginTop);
    return elem.getBoundingClientRect().height + paddingTop;
}