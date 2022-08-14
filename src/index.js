import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const inputSearchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;
const clearListCountriesEl = () => {
  countryList.innerHTML = '';
};

const insertContent = array => {
  const result = generateContent(array);
  countryList.insertAdjacentHTML('beforeend', result);
};

const generateContent = array =>
  array.reduce((acc, item) => acc + createListItems(item), '');

const createListItems = item =>
  `<li class="list-item">
<img src="${item.flags.svg}" 
alt="flag of ${item.name.official}"
width="50">
<h2>${item.name.official}</h2></li>`;

inputSearchBox.addEventListener(
  'input',
  debounce(onInputChange, DEBOUNCE_DELAY)
);
function onInputChange(event) {
  const searchName = event.target.value.trim().toUpperCase();
  fetchCountries(searchName)
    .then(data => {
      filterCountries(data);
    })
    .catch(error => {
      console.log(error);
    });
}
const filterCountries = array => {
  if (array.length === 1) {
    clearListCountriesEl();
    return createOneItem(array[0]);
  } else if (array.length < 10 && array.length > 0) {
    clearListCountriesEl();
    insertContent(array);
  } else if (array.length > 10) {
    clearListCountriesEl();
    Notiflix.Notify.failure(
      'Too many matches found. Please enter a more specific name.'
    );
  } else {
    clearListCountriesEl();
    Notiflix.Notify.failure('Oops, there is no country with that name');
  }
};
const createOneItem = item => {
  const itemResult = `<li>
 <h2><span>Country: </span> ${item.name.official}</h2>
 <p><span>Capital: </span> ${item.capital}</p>
 <p><span>Popolation: </span> ${item.population}</p>
 <p><span>Flag: </span>
 <img src="${item.flags.svg}" alt="flag of ${
    item.name.official
  }" width="50"></p>
 <p><span>Languages: </span> ${Object.values(item.languages)}</p>
 </li>`;
  countryList.insertAdjacentHTML('beforeend', itemResult);
};
function onInputChange(e) {
  const searchName = e.target.value.trim().toUpperCase();
  fetchCountries(searchName)
    .then(data => {
      filterCountries(data);
    })
    .catch(error => {
      console.log(error);
    });
}
