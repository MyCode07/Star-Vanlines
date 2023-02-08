const arrow = `<svg viewBox="0 0 8 14" fill="none">
                            <path d="M1 13L7 7L1 1" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>`;

if (document.querySelector('.blog__pagination-prev')) {
    document.querySelector('.blog__pagination-prev').insertAdjacentHTML('beforeend',arrow);
}

if (document.querySelector('.blog__pagination-next')) {
    document.querySelector('.blog__pagination-next').insertAdjacentHTML('beforeend', arrow);

}