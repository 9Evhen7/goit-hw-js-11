import Notiflix from 'notiflix';

const axios = require('axios').default;

const searchParams = new URLSearchParams({
    key: '28351682-e2b71875895c72fa7531eac7b',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: '40'
});
axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function getImages(q, page, lodeMoreBtnRef) {
    searchParams.append('q', q)
    searchParams.append('page', page)
    lodeMoreBtnRef.classList.add('hide')
    const response = await axios.get(`?${searchParams}`);

    if (response.data.hits.length == 0) {
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    } else { 
        lodeMoreBtnRef.classList.remove('hide');
        Notiflix.Notify.success(`Hooray! We found ${response.data.totalHits} images.`)
    }
        return response.data.hits;
}