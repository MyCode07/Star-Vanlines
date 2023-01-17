import gsap from "gsap";

let scrollY = window.scrollY;

window.addEventListener('scroll', function () {
    scrollY = window.scrollY;
    stikyHeader()
})
stikyHeader()


function stikyHeader() {
    const header = document.querySelector('.header');

    if (scrollY > 70) {
        header.classList.add('_stiky');
    }
    else {
        header.classList.remove('_stiky');
    }
}