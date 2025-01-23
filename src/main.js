import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { createGalleryCardTemplate } from './js/render-functions';
import { fetchPhotosByQuery } from './js/pixabay-api';

const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loader = document.querySelector('.loader');
const onSearchFormSubmit = event => {
  event.preventDefault();

  function toggleLoader(isLoading) {
    if (isLoading) {
      loaderContainer.classList.remove('is-hidden');
    } else {
      loaderContainer.classList.add('is-hidden');
    }
  }

  const searchedQuery = event.currentTarget.elements.user_query.value.trim();
  if (searchedQuery === '') {
    iziToast.error({
      message: 'Please enter your request',
      position: 'topRight',
    });
    return;
  }
  loader.classList.remove('is-hidden');
  fetchPhotosByQuery(searchedQuery)
    .then(data => {
      if (data.total === 0) {
        iziToast.error({
          message:
            '"Sorry, there are no images matching your search query. Please try again!"',
          position: 'topRight',
        });

        galleryEl.innerHTML = '';
        searchFormEl.reset();
        return;
      }

      const galleryTemplate = data.hits
        .map(el => createGalleryCardTemplate(el))
        .join('');
      galleryEl.innerHTML = galleryTemplate;
      loader.classList.add('is-hidden');
      const gallery = new SimpleLightbox('.js-gallery a', {
        captionDelay: 300,
        captionsData: 'alt',
      });
      gallery.refresh();
    })
    .catch(err => {
      loader.style.display = 'none';
      console.log(err);
    });
  searchFormEl.reset();
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
