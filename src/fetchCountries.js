import { Notify } from 'notiflix';

const BASE_URL = 'https://restcountries.com/v3.1';

export const fetchCountries = name => {
  return fetch(
    `${BASE_URL}/name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response) {
      throw new Error(
        Notify.failure('Oops, there is no country with that name')
      );
    }
    return response.json();
  });
};
