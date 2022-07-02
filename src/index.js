import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const formRef = document.querySelector('#search-form');
const gallaryRef = document.querySelector('.gallery')
const lodeMoreBtnRef = document.querySelector('.load-more');


const axios = require('axios').default;

const searchParams = new URLSearchParams({
    key: '28351682-e2b71875895c72fa7531eac7b',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: '40'
});

let page = 1; 
let lightbox = new SimpleLightbox('.gallery a', { 
    captionDelay: 300,
});


axios.defaults.baseURL = 'https://pixabay.com/api/';

async function getImages(q) {
    searchParams.append('q', q)
    searchParams.append('page', page)
    lodeMoreBtnRef.classList.add('hide')
    const response = await axios.get(`?${searchParams}`);
    page += 1;

    if (response.data.hits.length == 0) {
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    } else { 
        lodeMoreBtnRef.classList.remove('hide');
        Notiflix.Notify.success(`Hooray! We found ${response.data.totalHits} images.`)
    }
        return response.data.hits;

}

function renderCards(imgs) { 
    const cardsCode = imgs.map(({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads }) => {
        
        const code =
            `<div class="gallery__item">
                <a href="${largeImageURL}" class="gallery__link">
                <img src="${webformatURL}" alt="${tags}" title="${tags}" loading="lazy" class='gallery__image'" />
                <div class="info">
                    <p class="info-item"> <b>Likes ${likes}</b> </p>
                    <p class="info-item"> <b>Views ${views}</b> </p>
                    <p class="info-item"> <b>Comments ${comments}</b> </p>
                    <p class="info-item"> <b>Downloads ${downloads}</b> </p>
                </div>
                <a/>
        </div>`;
        return code;

    }).join('');

    gallaryRef.insertAdjacentHTML('beforeend', cardsCode);
        lightbox.refresh();
}



formRef.addEventListener('submit', (e) => { 
    e.preventDefault();
    page = 1;
    gallaryRef.innerHTML = '';
    getImages(formRef.elements.searchQuery.value)
        .then(data => { 
            renderCards(data);
        });
})

lodeMoreBtnRef.addEventListener('click', () => {
    getImages(formRef.elements.searchQuery.value)
        .then(data => {
            renderCards(data);

        })
})
