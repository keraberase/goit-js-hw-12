
// iziToast import
import iziToast from "izitoast";
// additional iziToast import
import "izitoast/dist/css/iziToast.min.css";
// SimpleLightbox import
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
const lightbox = new SimpleLightbox('.gallery a');
// Total number of hits returned by the backend
let query;
let page;
let maxImage;

// Функція для показу або приховування завантажувача
function toggleLoader(show) {
    if (show) {
        loader.classList.remove('hidden');
    } else {
        loader.classList.add('hidden');
    }
}

// Функція для виведення повідомлення про помилку
function showError(msg) {
    iziToast.error({
        title: 'Error',
        message: msg,
        position: 'topCenter'
    });
}

// Функція для відображення завантажувача
function showLoader() {
    toggleLoader(true);
}

// Функція для приховування завантажувача
function hideLoader() {
    toggleLoader(false);
}

// Додати обробник події для подання форми пошуку
searchForm.addEventListener('submit', onFormSubmit);
// Додати обробник події для кнопки "Завантажити ще"
loadMore.addEventListener('click', onLoadMoreClick);

// Обробник події для подання форми пошуку
async function onFormSubmit(e) {
    e.preventDefault();
    query = e.target.elements.search.value.trim();
    page = 1;

    if (!query) {
        showError('Please enter a search query.');
        return;
    }

    loadMessage.classList.remove('hidden');
    showLoader();

    try {
        const data = await getPostsByUser(query, page);
        if (data.totalHits === 0) {
            getImage.innerHTML = ''; // Очищення списку зображень
            showError('No images found for your search query. Please try again!');
            e.target.elements.search.value = '';
            loadMessage.classList.add('hidden')
            return;
        }

        maxImage = Math.ceil(data.totalHits / 15);
        getImage.innerHTML = '';

        renderImages(data.hits);
        loadMessage.classList.add('hidden');
    } catch (error) {
        showError('There was a problem fetching data. Please try again later.');
        maxImage = 0;
        getImage.innerHTML = '';
    }

    hideLoader();
    checkVisibleBtnStatus();
    e.target.reset();
}

// Обробник події для кнопки "Завантажити ще"
async function onLoadMoreClick() {
    page += 1;
    if (!query) {
        iziToast.warning({
            title: 'Warning',
            message: 'Please enter a search query',
            position: 'topCenter'
        });
        return;
    }
    loadMessage.classList.remove('hidden');
    showLoader();

    try {
        const data = await getPostsByUser(query, page);
        renderImages(data.hits);

        const cardHeight = document.querySelector('.gallery-item').getBoundingClientRect().height;
        window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth'
        });
        loadMessage.classList.add('hidden');
        checkVisibleBtnStatus();
    } catch (error) {
        showError('There was a problem fetching data. Please try again later.');
    }

    hideLoader();
}

// Функція для відображення кнопки "Завантажити ще"
function showLoadBtn() {
    loadMore.classList.remove('hidden');
}

// Функція для приховування кнопки "Завантажити ще"
function hideLoadBtn() {
    loadMore.classList.add('hidden');
}

// Перевірка статусу видимості кнопки "Завантажити ще"
function checkVisibleBtnStatus() {
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
}

// Функція для відображення зображень
function renderImages(hits) {
    const markup = itemsTamplate(hits);
    getImage.insertAdjacentHTML('beforeend', markup);

    lightbox.refresh();
}
