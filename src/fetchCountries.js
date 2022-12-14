import { Notify } from 'notiflix/build/notiflix-notify-aio';
export function fetchCountries(searchName) {
  const BASE_URL = 'https://restcountries.com/v3.1';

  return fetch(
    `${BASE_URL}/name/${searchName}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(
        Notify.failure('Oops, there is no country with that name')
      );
    }
    return response.json();
  });
}
