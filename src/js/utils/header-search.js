const headerSearch = document.querySelector('.header__search');

if (headerSearch) {
    const input = headerSearch.querySelector('input');
    const button = headerSearch.querySelector('button');

    input.addEventListener('input', function () {
        if (input.value != '') {
            button.disabled = false
        }
        else {
            button.disabled = true
        }
    })
}