
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let lightbox = new SimpleLightbox('.gallery a', { 
    captionDelay: 300,
});

export function renderCards(imgs,gallaryRef) { 
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

