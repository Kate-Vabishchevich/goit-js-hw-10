import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import getRefs from './js/get-refs';

const DEBOUNCE_DELAY = 300;

const refs = getRefs();

refs.searchBox.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
    e.preventDefault();

    const country = e.target.value.trim();
    clearData();

    if (!country) {
        return
    }

    fetchCountries(country).then(renderData).catch(onError)
}

function clearData() {
    refs.countryList.innerHTML = "";
    refs.searchBox.focus();
}

function getWarning() {
    return Notiflix.Notify.warning("Too many matches found. Please enter a more specific name.");
}

function onError() {
    return Notiflix.Notify.failure("Oops, there is no country with that name");
}

function countryListTpl(coutries) {
    return coutries.map(country => {
        return `<li class="country-list__item">
    <img class="country-list__flag" src="${country.flags.png}" alt="${country.name.official}" width = "40" />
    <p class="country-list__name">${country.name.official}</p>
</li>`;
    }).join("");
}

function countryInfoTpl(countries) {
    return countries.map(country => {
        return `<div class="country-info__container">
    <div class="country-info__title">
    <img class="country-info__flag" src="${country.flags.png}" alt="${country.name.official}" width = "40"/>
    <h2 class="country-info__name">${country.name.official}</h2>
    </div>
    <p class="card-info">
    <span class="card-info__prop">Capital: </span>${country.capital}
    </p>
    <p class="card-info">
    <span class="card-info__prop">Population: </span>${country.population}
    </p>
    <p class="card-info">
    <span class="card-info__prop">Languages: </span>${Object.values(country.languages).join(", ")}
    </p>
</div> `
    })
}

function renderData(items) {
    if (items.length >= 10) {
        getWarning();
        refs.countryList.innerHTML = "";
        refs.countryInfo.innerHTML = "";
    }

    else if (items.length >= 2 && items.length < 10) {
        const markupList = countryListTpl(items);
        refs.countryList.insertAdjacentHTML('beforeend', markupList);
        refs.countryInfo.innerHTML = "";
    }

    else {
        const markupInfo = countryInfoTpl(items);
        refs.countryInfo.insertAdjacentHTML('beforeend', markupInfo);
        refs.countryList.innerHTML = "";
    }
}






