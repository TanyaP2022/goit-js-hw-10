const BASE_URL = 'https://restcountries.com/v3.1';

function fetchCountries(name) {
  return fetch(
    `${BASE_URL}/name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    return response.json();
  });
}
export default { fetchCountries };

// Виконай санітизацію введеного рядка методом trim() - спалити пробіли
// виводь такий рядок "Too many matches found. Please enter a more specific name."
