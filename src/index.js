
const imgRef = document.querySelector('.gallery');
const formRef = document.querySelector('#search-form')

    const searchParams = new URLSearchParams({
    key: '28351682-e2b71875895c72fa7531eac7b',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
});

formRef.addEventListener('submit', (e) => { 
    e.preventDefault();

    searchParams.append('q', `${formRef.elements[0].value}`)

    fetch(`https://pixabay.com/api/?${searchParams}`)
    .then(response => {
        return response.json();
    })
        .then((images) => {
            const cardsCode = images.hits.map(({
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
                    <img src="${webformatURL}" alt="${tags}" loading="lazy" class='gallery__image'" />
                    
                    <div class="info">
                        <p class="info-item"> <b>Likes ${likes}</b> </p>
                        <p class="info-item"> <b>Views ${views}</b> </p>
                        <p class="info-item"> <b>Comments ${comments}</b> </p>
                        <p class="info-item"> <b>Downloads ${downloads}</b> </p>
                    </div>
                </a>
            </div>`;
                return code;
            }).join('');
            console.log(cardsCode);
            imgRef.innerHTML = cardsCode;
    });
})
