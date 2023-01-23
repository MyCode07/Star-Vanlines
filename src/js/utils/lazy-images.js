const bannerImages = Array.from(
    [...document.querySelectorAll('.banner__background source')]
        .concat([...document.querySelectorAll('.banner__background img')])
);


const images = Array.from(
    [...document.querySelectorAll('.about__image img')]
        .concat(
            [...document.querySelectorAll('.moving__images img')],
            [...document.querySelectorAll('.moving__images source')],
            [...document.querySelectorAll('.ourblog__grid article img')],
            [...document.querySelectorAll('.text__images img')],
            [...document.querySelectorAll('.helpful__flex-item img')],
        )
);

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.hasAttribute('src')) {
                img.src = img.dataset.src;
            }
            if (img.hasAttribute('srcset')) {
                img.srcset = img.dataset.srcset;
            }
        }
    })
})

if (bannerImages.length) {
    bannerImages.forEach(img => {
        observer.observe(img)
    })
}

if (images.length) {
    images.forEach(img => {
        observer.observe(img)
    })
}