const formFail = document.querySelector('.form__fail');
const formSent = document.querySelector('.form__sent');

document.addEventListener('click', function (e) {
    let targetEl = e.target;
    if (targetEl.classList.contains('form__fail') || targetEl.classList.contains('form__fail-body') || targetEl.classList.contains('form__fail-close')) {
        formFail.classList.remove('_fail');
    }

    if (targetEl.classList.contains('form__sent') || targetEl.classList.contains('form__sent-body') || targetEl.classList.contains('form__sent-close')) {
        formSent.classList.remove('_sent');
    }
})
