import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchPhotosByQuery } from './js/pixabay-api';
import { createGalleryCardTemplate } from './js/render-functions';

document.addEventListener('DOMContentLoaded', () => {
  const searchFormEl = document.querySelector('.js-search-form');
  const galleryEl = document.querySelector('.js-gallery');
  const loader = document.querySelector('.loader');
  const loadMoreButton = document.querySelector('.js-load-more');
  const endMessage = document.querySelector('.js-end-message');

  let currentPage = 1;
  let searchQuery = '';
  let totalHits = 0;
  let loadedImages = 0;
  let gallery = null;

  function toggleLoader(isLoading) {
    if (isLoading) {
      loader.classList.remove('is-hidden');
    } else {
      loader.classList.add('is-hidden');
    }
  }

  const onSearchFormSubmit = async event => {
    event.preventDefault();

    const searchedQuery = event.currentTarget.elements.user_query.value.trim();
    if (searchedQuery === '') {
      iziToast.error({
        message: 'Please enter your request',
        position: 'topRight',
      });
      return;
    }

    searchQuery = searchedQuery;
    currentPage = 1;
    loadedImages = 0;
    galleryEl.innerHTML = '';
    toggleLoader(true);

    try {
      const data = await fetchPhotosByQuery(searchQuery, currentPage, 15);
      totalHits = data.total;
      loadedImages += data.hits.length;

      if (data.hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        toggleLoader(false);
        loadMoreButton.classList.add('is-hidden');
        return;
      }

      const galleryTemplate = data.hits.map(createGalleryCardTemplate).join('');
      galleryEl.innerHTML = galleryTemplate;
      toggleLoader(false);

      if (loadedImages >= totalHits) {
        loadMoreButton.classList.add('is-hidden');
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
          timeout: 3000,
        });
      } else {
        loadMoreButton.classList.remove('is-hidden');
      }

      if (!gallery) {
        gallery = new SimpleLightbox('.js-gallery a', {
          captionDelay: 300,
          captionsData: 'alt',
        });
      } else {
        gallery.refresh();
      }
    } catch (err) {
      console.log(err);
      toggleLoader(false);
    }
  };

  const onLoadMoreClick = async () => {
    if (loadedImages >= totalHits) {
      return;
    }

    currentPage += 1;
    toggleLoader(true);

    try {
      const data = await fetchPhotosByQuery(searchQuery, currentPage, 15);
      loadedImages += data.hits.length;

      const galleryTemplate = data.hits.map(createGalleryCardTemplate).join('');
      galleryEl.insertAdjacentHTML('beforeend', galleryTemplate);
      toggleLoader(false);

      if (loadedImages >= totalHits) {
        loadMoreButton.classList.add('is-hidden');
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
          timeout: 3000,
        });
      }

      gallery.refresh();

      window.scrollBy({
        top: window.innerHeight / 2,
        behavior: 'smooth',
      });
    } catch (err) {
      console.log(err);
      toggleLoader(false);
    }
  };

  searchFormEl.addEventListener('submit', onSearchFormSubmit);
  loadMoreButton.addEventListener('click', onLoadMoreClick);
});
