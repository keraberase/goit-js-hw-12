// iziToast import
import iziToast from "izitoast";
// additional iziToast import
import "izitoast/dist/css/iziToast.min.css";
//  SimpleLightbox import
import SimpleLightbox from "simplelightbox";
// additional SimpleLightbox import
import "simplelightbox/dist/simple-lightbox.min.css";

import { itemsTamplate } from './js/render-functions';
import getPostsByUser from './js/pixabay-api';

const searchForm = document.querySelector('.js-search-form');
const getImage = document.querySelector(".gallery");
const loader = document.querySelector('.js-loader');
const loadMore = document.querySelector('.js-btn-load');
const loadMessage = document.querySelector('.load-message');
 // Total number of hits returned by the backend


let query;
let page;
let maxImage;


// ================================================
searchForm.addEventListener('submit', onFormSubmit);
loadMore.addEventListener('click', onLoadMoreClick);
// ================================================
async function onFormSubmit(e){
   e.preventDefault();
   query = e.target.elements.search.value.trim();
    page = 1;

     if (!query) {
         showError('Sorry, there are no images matching your search query. Please try again!');
         return;
    };  
    loadMessage.classList.remove('hidden');
    showLoader();

    try
    {
        const data = await getPostsByUser(query, page);
    if (data.totalHits === 0) {
           showError('There was a problem with the fetch operation. Please try again later.');
         return;
    } 
     

    maxImage = Math.ceil(data.totalHits / 15);
    getImage.innerHTML = '';
    
        renderImages(data.hits);
        loadMessage.classList.add('hidden');
    } catch (error)
    {
        showError(error);
        maxImage = 0;
        getImage.innerHTML = '';
            }
   
    hideLoader();
    checkVisibleBtnStatus();
    e.target.reset()
};
//=====================================  

async function onLoadMoreClick() {
    page += 1;
     if (!query) {

        return iziToast.warning({
            title: 'Warning',
            message: 'Please enter a search query',
            position: 'topCenter'
        });
    };  
loadMessage.classList.remove('hidden');
    showLoader();
    const data = await getPostsByUser(query,page);
   
    renderImages(data.hits);

    hideLoader();

    const cardHeight = document.querySelector('.gallery-item').getBoundingClientRect().height;
    window.scrollBy({
        top: cardHeight * 2, // Прокручуємо на висоту двох карточок галереї
        behavior: 'smooth' // Плавна анімація прокрутки
    });
    loadMessage.classList.add('hidden');
    checkVisibleBtnStatus();
   
}


//===============================================   
function renderImages(hits) {
    const markup = itemsTamplate(hits);
    getImage.insertAdjacentHTML('beforeend', markup);

     const lightbox = new SimpleLightbox('.gallery a');
    lightbox.refresh();
};
//==========================================

function showLoadBtn()
{
    loadMore.classList.remove('hidden');
}

function hideLoadBtn()

{
    loadMore.classList.add('hidden');
}


function showLoader() {
    loader.classList.remove('hidden');
};

function hideLoader() {
     loader.classList.add('hidden');
}


function checkVisibleBtnStatus()
{
    if (page >= maxImage) {
        hideLoadBtn();
         iziToast.info({
            title: 'Info',
            message: "We're sorry, but you've reached the end of search results.",
            position: 'topCenter'
        });
    } else {
        showLoadBtn();
       
    }

};
      
function showError(msg) { iziToast.error({
                    title: 'Error',
                    message: msg,
                    position: 'topCenter'
                });
    
}