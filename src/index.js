import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import getRefs from './js/get-refs';

const DEBOUNCE_DELAY = 300;

const refs = getRefs();

refs.searchBox.addEventListener('input', onInput);

function onInput(e) {
    e.preventDefault();

    fetchCountry()
}



// fetch('https://restcountries.com/v3.1/name/')
//     .then(response => {
//         console.log(response.json());
//     })
    // .then(countries => {
    //     console.log(countries);

    // })


{/* <li class="country-list__item">
  <img class="country-list__flag" src="" alt="" />
  <h2 class="country-list__name"></h2>
</li>

<div class="country-info__container">
  <div class="country-info__title">
    <img class="country-info__flag" src="" alt="" />
    <h2 class="country-info__name"></h2>
  </div>
  <p class="card-info">
    <span class="card-info__prop">Capital: </span><span></span>
  </p>
  <p class="card-info">
    <span class="card-info__prop">Population: </span><span></span>
  </p>
  <p class="card-info">
    <span class="card-info__prop">Languages: </span><span></span>
  </p>
</div> */}
