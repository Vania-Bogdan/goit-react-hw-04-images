const API_KEY = '29069245-81d506294048b15027aa503f3';
const BASE_URL = 'https://pixabay.com/api/?key=';
const OPTION = '}&image_type=photo&orientation=horizontal&per_page=12';

function fetchImage(imageSearch, page) {
  return fetch(
    // `https://pixabay.com/api/?key=29069245-81d506294048b15027aa503f3&q=${imageSearch}}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`
    BASE_URL + API_KEY + `&q=${imageSearch}` + OPTION + `&page=${page}`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Nothing`));
  });
}

const api = { fetchImage };

export default api;