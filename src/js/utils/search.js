const searchIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" " stroke-linecap="
                            round" stroke-linejoin="round" />
                        <path d="M21 20.9999L16.65 16.6499" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>`;

const search = document.querySelector('.header__search');
if (search) {
    const input = search.querySelector('input');
    const button = search.querySelector('button');
    if (button.querySelector('span')) {
        button.querySelectorAll('span').forEach(item => {
            item.remove();
        })
    }
    button.insertAdjacentHTML('beforeend', searchIcon);
}

const searchSearch = document.querySelector('.search__search');

if (searchSearch) {
    const input = searchSearch.querySelector('input');
    const button = searchSearch.querySelector('button');
    if (button.querySelector('span')) {
        button.querySelectorAll('span').forEach(item => {
            item.remove();
        })
    }
    button.insertAdjacentHTML('beforeend', searchIcon);
}