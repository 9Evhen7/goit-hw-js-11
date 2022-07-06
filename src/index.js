import { getImages } from './getImages';
import { renderCards } from './renderCards';
import { autoScroll } from './autoScroll';


const formRef = document.querySelector('#search-form');
const gallaryRef = document.querySelector('.gallery')
const lodeMoreBtnRef = document.querySelector('.load-more');

let page = 1;

formRef.addEventListener('submit', (e) => { 
    e.preventDefault();
    gallaryRef.innerHTML = '';
    getImages(formRef.elements.searchQuery.value, page=1,lodeMoreBtnRef,true)
        .then(data => {
            renderCards(data.hits,gallaryRef);
        });
})

lodeMoreBtnRef.addEventListener('click', () => {
    getImages(formRef.elements.searchQuery.value.trim(), page+=1,lodeMoreBtnRef,false)
        .then(data => {
            renderCards(data.hits, gallaryRef);
            autoScroll();
        })

})
