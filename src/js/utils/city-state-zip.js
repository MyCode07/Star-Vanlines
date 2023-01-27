import { usaStates } from './states.js'

let countryCode = 'US';
let statesFile = 'https://raw.githubusercontent.com/harpreetkhalsagtbit/country-state-city/develop/data/United_States-US/allStates.lite.json';
let citiesFile = 'https://raw.githubusercontent.com/harpreetkhalsagtbit/country-state-city/develop/data/allCitiesNested.lite.json';

let stateInput = document.querySelector('input#state');
let cityInput = document.querySelector('input#city');
let zipInput = document.querySelector('input#zip');

async function fetchStatesData(file) {
    const response = await fetch(file, {
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
        inputOnStateCityZip(stateInput, res)
    }
}

async function fetchCitiesData(file) {
    const response = await fetch(file, {
        method: 'GET'
    });

    if (response.ok) {
        let result = await response.json();
        loadCities(result);
    }
    else {
        console.log('Ошибка');
    }

    function loadCities(res) {
        let cities = []

        for (const states in res['United_States-US']) {
            const state = res['United_States-US'][states]

            for (let i = 0; i < state.length; i++) {
                const city = state[i];
                cities.push(city);
            }
        }

        inputOnStateCityZip(cityInput, cities)
    }
}

async function fetchCurrnetState(file, code) {
    const response = await fetch(file, {
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
        for (let i = 0; i < res.length; i++) {
            const state = res[i];

            if (state.isoCode == code) {
                console.log(state);
                stateInput.value = state.name;
            }
        }
    }
}

async function fetchCurrnetStateCities(file, code) {
    const response = await fetch(file, {
        method: 'GET'
    });

    if (response.ok) {
        let result = await response.json();
        loadCities(result);
    }
    else {
        console.log('Ошибка');
    }

    function loadCities(res) {
        let cities = []

        const state = res['United_States-US'][code]
        for (let i = 0; i < state.length; i++) {
            const city = state[i];
            cities.push(city);
        }

        inputOnStateCityZip(cityInput, cities)
    }
}



const allStates = fetchStatesData(statesFile)
const allCities = fetchCitiesData(citiesFile);






async function myFunc() {
    const { getByStateCity, getByCityState, getByZip } = await import('zcs')

    // console.log(getByCityState('Orlando'))
    // console.log(getByStateCity('FL'))
    // console.log(getByZip('03809'))


    inputOnStateCityZip(zipInput, [])

    zipInput.addEventListener('input', function () {
        if (zipInput.value.length == 5) {

            let zip = getByZip(zipInput.value);
            if (zip) {
                zipInput.dataset.state = zip.state;
                zipInput.dataset.city = zip.city;

                fetchCurrnetState(statesFile, zipInput.dataset.state);
                stateInput.dataset.state = capitalize(zipInput.dataset.state);

                cityInput.dataset.state = capitalize(zipInput.dataset.state);
                cityInput.value = capitalize(zipInput.dataset.city);
            }
            else {
                stateInput.dataset.state = '';
                stateInput.value = 'State';
                cityInput.dataset.state = '';
                cityInput.value = 'City';

                setTimeout(() => {
                    alert('The zip code ' + zipInput.value + ' not founded');
                }, 1000);
            }
        }
    })

}

myFunc()





function inputOnStateCityZip(input, array) {
    if (input) {
        const parent = input.closest('.form__grid-item');
        const selectBody = parent.querySelector('.form__select-select');


        input.addEventListener('input', function (e) {
            if (this.value.length >= 2) {
                let locationarray = getTheLocationInfo(this.value, array);

                if (input.id == 'city') {

                    if (this.dataset.state) {
                        let code = `${usaStates[this.dataset.state]}-${this.dataset.state}`
                        fetchCurrnetStateCities(citiesFile, code);
                    }


                    selectBody.style.display = 'block';


                    createCitySelect(selectBody, locationarray)
                    insertIntoInput(this)
                }

                else if (input.id == 'state') {
                    selectBody.style.display = 'block';
                    createSteteSelect(selectBody, locationarray)
                    insertIntoInput(this)
                }
            }
            else {
                if (!input.id == 'zip') {
                    selectBody.style.display = 'none';
                }
            }
        })
    }
}

function getTheLocationInfo(value, arr) {
    let location = [];
    for (let i = 0; i < arr.length; i++) {
        const elem = arr[i];
        if (((elem.name).toLowerCase()).includes(value.toLowerCase())) {

            location.push(elem)
        }
    }
    return location;
}

async function insertIntoInput(input) {
    const options = input.closest('.form__grid-item').querySelectorAll('.form__select-select span')
    const select = input.closest('.form__grid-item').querySelector('.form__select-select')

    const { getByCityState } = await import('zcs')


    if (options.length) {
        options.forEach(option => {
            option.addEventListener('click', function () {
                input.value = option.dataset.value;
                input.dataset.state = option.dataset.state;
                input.dataset.zip = option.dataset.zip;
                select.style.display = 'none';

                if (input.id == 'city') {
                    let zip = getByCityState(option.dataset.value, option.dataset.state);
                    console.log(zip);
                    zipInput.value = zip[0]
                    zipInput.dataset.state = option.dataset.state;
                    zipInput.dataset.city = option.dataset.value;

                    fetchCurrnetState(statesFile, option.dataset.state);
                    stateInput.dataset.state = capitalize(option.dataset.state);
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
            select += `<span data-value="${elem.name}" data-state="${elem.stateCode}">${elem.name}</span>`;
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
            select += `<span data-value="${elem.name}" data-state="${elem.isoCode}">${elem.name}</span>`;
        }
    }

    if (selectBody.querySelectorAll('span').length) {
        selectBody.querySelectorAll('span').forEach(item => {
            item.remove();
        });
    }
    selectBody.insertAdjacentHTML('beforeend', select);
}

function capitalize(str) {
    const arr = str.split(" ");
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1).toLowerCase();
    }
    return arr.join(" ");
}