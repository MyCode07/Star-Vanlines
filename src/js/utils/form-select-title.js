const formSelectTitles = document.querySelectorAll('.form__select-title span');

if (formSelectTitles.length && window.innerWidth <= 768) {
    formSelectTitles.forEach(item => {
        let text = item.textContent.split(' ');
        if (text.length > 2) {
            text = text.slice(0, 2)
            item.textContent = text.join(' ') + ' ...';
        }
    })
}