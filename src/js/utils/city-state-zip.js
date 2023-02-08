// import { usaStates50 } from './states.js'
import { usaStates } from './states.js'

if (document.querySelector('.form-request')) {

    const url = 'https://raw.githubusercontent.com/millbj92/US-Zip-Codes-JSON/master/USCities.json';

    let stateInput = document.querySelector('input#state');
    let cityInput = document.querySelector('input#city');
    let zipInput = document.querySelector('input#zip');

    fetchCitiesData()
    async function fetchCitiesData() {
        const response = await fetch(url, {
            method: 'GET'
        });

        if (response.ok) {
            let result = await response.json();
            loadStates(result);
        }
        else {
            console.log('Ошибка');
        }

        function loadStates(res) {
            res.forEach(data => {
                data.zip_code = data.zip_code.toString();
                if (data.zip_code.length == 3) {
                    data.zip_code = '00' + data.zip_code
                }
                else if (data.zip_code.length == 4) {
                    data.zip_code = '0' + data.zip_code
                }
            })

            localStorage.setItem('mapData', JSON.stringify(res))
        }
    }

    let mapData = null;
    if (localStorage.getItem('mapData')) {
        mapData = JSON.parse(localStorage.getItem('mapData'));
    }
    inputOnStateCityZip(cityInput, mapData)

    const allStates = Array.from(
        new Set(
            mapData.map(index => {
                return index.state
            })
        )
    )

    inputOnStateCityZip(stateInput, allStates)
    inputOnStateCityZip(zipInput, mapData)


    function inputOnStateCityZip(input, array) {
        if (input) {
            const parent = input.closest('.form__grid-item');
            const selectBody = parent.querySelector('.form__select-select');

            input.addEventListener('input', function (e) {

                if (document.querySelectorAll('.search-input').length) {
                    document.querySelectorAll('.search-input').forEach(input => {
                        if (input !== this && input.id != 'zip') {
                            const selectBody = input.closest('.form__grid-item').querySelector('.form__select-select');
                            selectBody.style.display = 'none'
                        }
                    });
                }


                if (this.value.length >= 2) {

                    if (input.id == 'city') {
                        let locationarray = getTheLocationInfo(this, array);

                        if (this.dataset.state) {
                            let code = this.dataset.state;
                            const currentStateCities = mapData.filter(index => {
                                if (index.state == code) {
                                    return index
                                }
                            })
                            locationarray = getTheLocationInfo(this, currentStateCities);
                        }
                        createCitySelect(selectBody, locationarray)
                        selectBody.style.display = 'block';
                    }

                    else if (input.id == 'state') {
                        let locationarray = getTheLocationInfo(this, array);
                        createSteteSelect(selectBody, locationarray)
                        selectBody.style.display = 'block';
                    }

                    else if (input.id == 'zip') {
                        let locationarray = getTheLocationInfo(this, array);

                        if (input.value.length == 5) {
                            if (locationarray.length) {
                                input.dataset.state = locationarray[0].state
                                input.dataset.city = locationarray[0].city

                                stateInput.value = usaStates[locationarray[0].state];
                                stateInput.dataset.state = locationarray[0].state;

                                cityInput.value = locationarray[0].city
                                cityInput.dataset.state = locationarray[0].state;
                                cityInput.dataset.zip = input.value;
                            }
                            else {
                                setTimeout(() => {
                                    alert('no zip code')
                                }, 500);

                                input.dataset.state = ''
                                input.dataset.city = ''
                                input.dataset.zip = ''
                                stateInput.dataset.state = ''
                                stateInput.value = ''
                                cityInput.dataset.state = ''
                                cityInput.dataset.zip = ''
                                cityInput.value = ''
                            }
                        }
                    }

                    insertIntoInput(this)
                }
                else {
                    if (!input.id == 'zip') {
                        selectBody.style.display = 'none';
                    }
                }
            })
        }
    }

    function getTheLocationInfo(input, arr) {
        let location = [];
        for (let i = 0; i < arr.length; i++) {
            const elem = arr[i];
            if (elem != undefined) {
                if (input.id == 'city') {
                    if (((elem.city).toLowerCase()).includes(input.value.toLowerCase())) {
                        location.push(elem)
                    }
                }
                else if (input.id == 'state') {
                    if (usaStates[elem] != undefined) {
                        if ((usaStates[elem].toLowerCase()).includes(input.value.toLowerCase())) {
                            location.push(elem)
                        }
                    }
                }
                else if (input.id == 'zip') {
                    if ((elem.zip_code).includes(input.value)) {
                        location.push(elem)
                    }
                }
            }
        }
        return location;
    }


    async function insertIntoInput(input) {
        const options = input.closest('.form__grid-item').querySelectorAll('.form__select-select span')
        const select = input.closest('.form__grid-item').querySelector('.form__select-select')

        if (options.length) {
            options.forEach(option => {
                option.addEventListener('click', function () {
                    input.value = option.dataset.value;
                    input.dataset.state = option.dataset.state;
                    input.dataset.zip = option.dataset.zip;
                    select.style.display = 'none';



                    if (input.id == 'city') {
                        if (zipInput) {
                            let zip = input.dataset.zip;
                            zipInput.value = zip;
                            zipInput.dataset.state = option.dataset.state;
                            zipInput.dataset.city = option.dataset.value;
                        }



                        stateInput.value = usaStates[option.dataset.state];
                        stateInput.dataset.state = option.dataset.state;
                    }

                    else if (input.id == 'state') {
                        if (zipInput) {
                            zipInput.value = '';
                            zipInput.ariaPlaceholder = 'Zip';
                            zipInput.dataset.state = '';
                            zipInput.dataset.city = '';
                        }

                        cityInput.value = '';
                        cityInput.ariaPlaceholder = 'City';
                        cityInput.dataset.state = option.dataset.state;
                    }
                })
            })
        }
    }

    function createCitySelect(selectBody, arr) {

        let select = '';
        if (arr.length) {
            selectBody.style.display = 'block';
            for (let i = 0; i < arr.length; i++) {
                const elem = arr[i];
                select += `<span data-value="${elem.city}" data-state="${elem.state}" data-zip="${elem.zip_code}">${elem.city}, ${usaStates[elem.state]}, ${elem.zip_code}</span>`;
            }
        }

        if (selectBody.querySelectorAll('span').length) {
            selectBody.querySelectorAll('span').forEach(item => {
                item.remove();
            });
        }
        selectBody.insertAdjacentHTML('beforeend', select);
    }

    function createSteteSelect(selectBody, arr) {
        let select = '';
        if (arr.length) {
            selectBody.style.display = 'block';
            for (let i = 0; i < arr.length; i++) {
                const elem = arr[i];
                select += `<span data-value="${usaStates[elem]}" data-state="${elem}">${usaStates[elem]}</span>`;
            }
        }

        if (selectBody.querySelectorAll('span').length) {
            selectBody.querySelectorAll('span').forEach(item => {
                item.remove();
            });
        }
        selectBody.insertAdjacentHTML('beforeend', select);
    }
}