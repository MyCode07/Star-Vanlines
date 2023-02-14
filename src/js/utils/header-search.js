const headerSearch = document.querySelector('.header__search');
if (headerSearch) {
    const input = headerSearch.querySelector('input');
    const button = headerSearch.querySelector('button');
    button.disabled = true
    input.addEventListener('input', function () {
        if (input.value != '') {
            button.disabled = false
        }
        else {
            button.disabled = true
        }
    })
}

const searchSearch = document.querySelector('.search__search');
if (searchSearch) {
    const input = searchSearch.querySelector('input');
    const button = searchSearch.querySelector('button');
    button.disabled = true
    input.addEventListener('input', function () {
        if (input.value != '') {
            button.disabled = false
        }
        else {
            button.disabled = true
        }
    })
}