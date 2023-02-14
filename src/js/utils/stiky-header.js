let scrollY = window.scrollY;

window.addEventListener('scroll', function () {
    scrollY = window.scrollY;
    stikyHeader()
})
stikyHeader()


function stikyHeader() {
    const header = document.querySelector('.header');
    const search = document.querySelector('#is-ajax-search-result-908');

    if (scrollY > 70) {
        header.classList.add('_stiky');
        if (search) {
            search.style.opacity = 0;
            search.style.visibility = 'hidden';
            search.style.pointerEvents = 'none';
        }
    }
    else {
        header.classList.remove('_stiky');
        if (search) {
            search.style.opacity = 1;
            search.style.visibility = 'visible';
            search.style.pointerEvents = 'all';
        }
    }
}