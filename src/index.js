import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';
const debounce = require('lodash.debounce');

const inputSearchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

inputSearchBox.addEventListener(
  'input',
  debounce(onInputChange, DEBOUNCE_DELAY)
);
function createListItems(response) {
  const itemList = response
    .map(item => {
      return `<li class="list-item">
<img src="${item.flags.svg}" alt="flag of ${item.name.official}" width="50">
<h2>${item.name.official}</h2></li>`;
    })
    .join('');
  countryList.innerHTML = itemList;
}

function createOneItem(response) {
  const itemResult = response
    .map(item => {
      return `<li>
 <p><span>Capital: </span> ${item.capital}</p>
 <p><span>Popolation: </span> ${item.population}</p>
 <p><span>Languages: </span> ${Object.values(item.languages)}</p>
 </li>`;
    })
    .join('');
  countryInfo.innerHTML = itemResult;
}

function onInputChange(event) {
  const searchName = event.target.value.trim().toUpperCase();
  if (searchName === '') {
    return;
  }
  fetchCountries(searchName)
    .then(response => {
      if (response.length === 1) {
        createOneItem(response);
      }
      if (response.length < 10 && response.length > 0) {
        createListItems(response);
      }
      if (response.length > 10) {
        Notify.failure(
          'Too many matches found. Please enter a more specific name.'
        );
      }
    })
    .catch(error => console.log(error));
  clearListCountriesEl();
}
function clearListCountriesEl() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}
