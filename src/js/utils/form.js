"use strict"

import dhx from 'dhx-calendar';

// get-a-quote.html
// contacts.html
// become-an-agent.html
// rights.html
// shipment-tracking.html
// work-for-us.html

const formSent = document.querySelector('.form-sent');

document.addEventListener('DOMContentLoaded', function () {
    const forms = document.querySelectorAll('form');

    function formValidate(form) {
        let error = 0;
        let formReq = Array.from(
            [...form.querySelectorAll('input')]
                .concat([...form.querySelectorAll('textarea')]));

        formReq.forEach(input => {
            if (input.type !== 'submit' && input.type !== 'checkbox') {
                if (!input.hasAttribute('hidden')) {
                    input.addEventListener('input', function () {
                        formRemoveError(input);
                        validateInput(input, error)
                    })
                }
                else {
                    const inputParent = input.closest('.form__grid-item')
                    const select = inputParent.querySelector('.form__select')
                    const selectTitle = inputParent.querySelector('.form__select-title')

                    if (selectTitle) {
                        selectTitle.addEventListener('click', function () {
                            this.classList.toggle('_open')
                        })
                    }

                    const dateTitle = inputParent.querySelector('.form__date-title')
                    if (dateTitle) {
                        dateTitle.addEventListener('click', function () {
                            this.classList.toggle('_open')
                        })
                    }

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


        form.addEventListener('submit', function (e) {
            e.preventDefault();
            // console.log(error);
            // if errer = -1 form is valid and can be sent

            formReq.forEach(input => {
                if (input.type !== 'submit' && input.type !== 'checkbox') {
                    validateInput(input, error)
                }
            })
            console.log(error);

        })

        return error;
    }

    forms.forEach(item => {
        formValidate(item)
    })


    function validateInput(input, error) {
        if (input.classList.contains('form-email')) {
            if (emailTest(input)) {
                formAddError(input);
                error++;
            }
            else {
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
                formRemoveError(input);
                error--;
            }
        }

        else {
            if (input.value.length < 2) {
                formAddError(input);
                error++;
            }
            else {
                formRemoveError(input);
                error--;
            }
        }
    }


    function formAddError(input) {
        input.closest('.form__grid-item').classList.remove('_valid');
        input.closest('.form__grid-item').classList.add('_error');
    }

    function formRemoveError(input) {
        input.closest('.form__grid-item').classList.remove('_error');
        input.closest('.form__grid-item').classList.add('_valid');
    }

    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
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
            }
            else {
                formDateTitle.textContent = date;
            }

            formDate.value = date;

            if (formDateParent.classList.contains('_error')) {
                formDateParent.classList.remove('_error');
            }
            formDateParent.classList.add('_valid');
        });
    }
}