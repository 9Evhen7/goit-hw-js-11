import { getImages } from './getImages';
import { renderCards } from './renderCards';
import { autoScroll } from './autoScroll';


const formRef = document.querySelector('#search-form');
const gallaryRef = document.querySelector('.gallery')
const lodeMoreBtnRef = document.querySelector('.load-more');

let page = 1; 

formRef.addEventListener('submit', (e) => { 
    e.preventDefault();
    page = 1;
    gallaryRef.innerHTML = '';
    getImages(formRef.elements.searchQuery.value, page,lodeMoreBtnRef)
        .then(data => { 
            renderCards(data,gallaryRef);
        });
})

lodeMoreBtnRef.addEventListener('click', () => {
    page += 1;
    getImages(formRef.elements.searchQuery.value, page,lodeMoreBtnRef)
        .then(data => {
            renderCards(data, gallaryRef);
            autoScroll();

        })
})
