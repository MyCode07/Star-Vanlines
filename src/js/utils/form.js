"use strict"

import dhx from 'dhx-calendar';
const url = 'https://starvanlines.test-yeremyan.site/wp-content/themes/starvanline/assets/files/send-simple.php';

// /get-a-quote.html
// /contacts.html
// /become-an-agent.html
// /rights.html
// /shipment-tracking.html
// /work-for-us.html

document.addEventListener('DOMContentLoaded', function () {

    const forms = Array.from([...document.querySelectorAll('.form form')].concat([...document.querySelectorAll('.whatis form')]));


    function formValidate(form) {
        let formReq = [...form.querySelectorAll('input')]


        formReq.forEach(input => {
            if (input.type !== 'submit' && input.type !== 'checkbox' && !input.classList.contains('formname')) {
                input.addEventListener('input', function () {
                    formRemoveError(input);
                    validateInput(input)
                })

                const inputParent = input.closest('.form__grid-item')
                const selectTitle = inputParent.querySelector('.form__select-title')

                if (selectTitle) {
                    const span = selectTitle.querySelector('span');
                    selectTitle.addEventListener('click', function () {
                        this.classList.toggle('_open')
                        if (span.dataset.value == '' || !span.dataset.value) {
                            span.textContent = span.dataset.title
                        }
                        else {
                            if (this.classList.contains('_open')) {
                                span.textContent = span.dataset.title
                            }
                            else {
                                span.textContent = span.dataset.value
                            }
                        }
                    })
                }

                const dateTitle = inputParent.querySelector('.form__date-title')
                if (dateTitle) {
                    const span = dateTitle.querySelector('span');
                    dateTitle.addEventListener('click', function () {
                        this.classList.toggle('_open')

                        if (span.dataset.value == '' || !span.dataset.value) {
                            span.textContent = span.dataset.title
                        }
                        else {
                            if (this.classList.contains('_open')) {
                                span.textContent = span.dataset.title
                            }
                            else {
                                span.textContent = span.dataset.value
                            }
                        }
                    })
                }

            }
            else if (input.type == 'checkbox') {
                if (input.id == 'flexible-date') {
                    input.addEventListener('input', function () {
                        if (input.checked) {
                            calendar.config.range = true
                        }
                        else {
                            calendar.config.range = false
                        }
                    })
                }
            }
        })


        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            let error = 0;
            formReq.forEach(input => {
                if (input.type !== 'submit' && input.type !== 'checkbox' && !input.classList.contains('formname')) {
                    error += validateInput(input) + 1

                }
            })

            let formData = new FormData(form);

            if (error === 0) {
                form.classList.add('_sending');
                let response = await fetch(url, {
                    method: 'POST',
                    body: formData,
                });
                if (response.ok) {
                    document.querySelector('.form__sent').classList.add('_sent');
                    form.reset();
                    form.classList.remove('_sending');
                    resetForm()

                    if (form.dataset.type && form.dataset.type == "get-a-quote") {
                        form.closest('section').remove();
                        document.querySelector('.form__sent').classList.add('_sent');
                    }
                }
                else {
                    document.querySelector('.form__fail').classList.add('_fail');
                    form.classList.remove('_sending');
                    resetForm()

                    if (form.dataset.type && form.dataset.type == "get-a-quote") {
                        form.closest('section').remove();
                        document.querySelector('.form__fail').classList.add('_fail');
                    }
                }
            }
        })
    }

    if (forms.length) {
        forms.forEach(item => {
            formValidate(item)
        })
    }

    function validateInput(input) {
        let error = 0;

        if (!input.classList.contains('formname')) {
            if (input.classList.contains('form-email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
                else {
                    formAddValid(input);
                    formRemoveError(input);
                    error--;
                }
            }
            else if (input.classList.contains('form-phone')) {
                if (/[_]/.test(input.value) || input.value.length < 14) {
                    formAddError(input);
                    error++;
                }
                else {
                    formAddValid(input);
                    formRemoveError(input);
                    error--;
                }
            }
            else {
                if (input.id == 'zip') {
                    const form = input.closest('form')
                    const city = form.querySelector('input#city')
                    const state = form.querySelector('input#state')
                    if (input.value.length == 5) {

                        if (city.dataset.zip && city.dataset.zip != '') {
                            city.dataset.zip
                            formRemoveError(input);
                            formAddValid(input);

                            formRemoveError(city);
                            formAddValid(city);
                            formRemoveError(state);
                            formAddValid(state);

                            error--;
                        }
                        else {
                            formAddError(input);
                            formAddError(city);
                            formAddError(state);

                            error++;
                        }

                    }
                    else {
                        formAddError(input);
                        error--;
                    }
                }
                else {
                    if (input.value.length < 2) {
                        formAddError(input);
                        error++;
                    }
                    else {
                        formAddValid(input);
                        formRemoveError(input);
                        error--;
                    }
                }
            }
        }
        return error;
    }

    function formAddError(input) {
        input.closest('.form__grid-item').classList.remove('_valid');
        input.closest('.form__grid-item').classList.add('_error');
    }

    function formRemoveError(input) {
        input.closest('.form__grid-item').classList.remove('_error');
    }

    function formAddValid(input) {
        input.closest('.form__grid-item').classList.add('_valid');
    }

    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

    function resetForm() {
        document.querySelectorAll('.form__grid-item').forEach(item => {
            if (item.classList.contains('_valid')) {
                item.classList.remove('_valid')
            }
            const titles = document.querySelectorAll('.form__select-title span');
            if (titles.length) {
                titles.forEach(title => {
                    title.textContent = title.dataset.title;
                })
            }
        });
    }
});


document.addEventListener('click', function (e) {
    let targetEl = e.target;
    if (!targetEl.closest('.form__date')) {
        const dateTitle = document.querySelector('.form__date-title')
        if (dateTitle && dateTitle.classList.contains('_open')) {
            dateTitle.classList.remove('_open')
        }
    }

    if (targetEl.hasAttribute('data-value') && targetEl.closest('.form__select-select')) {
        const form = targetEl.closest('form');
        const formItem = targetEl.closest('.form__grid-item');
        formItem.classList.remove('_error');
        formItem.classList.add('_valid');

        let cityInput = formItem.querySelector('input#city');

        if (cityInput) {
            form.querySelectorAll('input.search-input').forEach(inp => {
                inp.closest('.form__grid-item').classList.remove('_error');
                inp.closest('.form__grid-item').classList.add('_valid');
            })
        }
    }
})

const firstDate = new Date();
const secondDate = new Date(Date.now() + 1000000000);

let calendar = null;

if (document.querySelector('#calendar-container')) {
    calendar = new dhx.Calendar("calendar-container", {
        weekStart: "monday",
        range: false,
        value: [firstDate, secondDate],
        css: "form-calendar",
        dateFormat: "%d.%m.%Y",
        thisMonthOnly: true,
    });

    if (document.querySelector('.dhx_calendar-action__show-month')) {
        document.querySelector('.dhx_calendar-action__show-month').disabled = true;
    }
    if (document.querySelector('.dhx_button__icon')) {
        const arrow =
            `<svg  viewBox="0 0 8 14" fill="none" >
     <path d="M7 13L1 7L7 1" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;

        document.querySelectorAll('.dhx_button__icon').forEach(item => {
            item.insertAdjacentHTML('beforeend', arrow)
        });
    }

    if (document.querySelector('.dhx_calendar-weekday')) {
        document.querySelectorAll('.dhx_calendar-weekday').forEach(item => {
            item.textContent = item.textContent.substring(0, 1);
        });
    }

    if (calendar != null) {
        calendar.events.on("change", function () {
            const formDate = document.querySelector('.form-date');
            const formDateParent = formDate.closest('.form__grid-item');
            const formDateTitle = formDateParent.querySelector('.form__date-title span');

            let date = calendar.getValue();
            if (typeof date != 'string') {
                formDateTitle.textContent = date.join(',').replace(/,/, ' — ');
                formDateTitle.dataset.value = date.join(',').replace(/,/, ' — ');
            }
            else {
                formDateTitle.textContent = date;
                formDateTitle.dataset.value = date;
            }

            formDate.value = date;

            if (formDateParent.classList.contains('_error')) {
                formDateParent.classList.remove('_error');
            }
            formDateParent.classList.add('_valid');
        });
    }
}

const formSelects = document.querySelectorAll('.form__select-select');
if (formSelects.length) {
    formSelects.forEach(select => {
        const title = select.closest('.form__grid-item').querySelector('.form__select-title')
        const options = select.querySelectorAll('span');
        const input = select.closest('.form__grid-item').querySelector('input')

        if (options.length) {
            options.forEach(option => {
                option.addEventListener('click', function () {
                    title.querySelector('span').textContent = option.textContent
                    title.querySelector('span').dataset.value = option.dataset.value
                    input.value = option.dataset.value;
                    title.classList.remove('_open')
                })
            })
        }
    })
}

if (document.querySelector('input#zip')) {
    document.querySelector('input#zip').addEventListener('input', function () {
        this.value = this.value.replace(/\D/g, '');
    });
}