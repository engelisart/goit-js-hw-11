import { PicturesAPI } from './pictures-api';
import { pictureElements } from './pictures-cards';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  formElem: document.querySelector('.js-form'),
  inputElem: document.querySelector('.js-input'),
  gallery: document.querySelector('.js-gallery'),
  btnLoadMore: document.querySelector('.js-load-more'),
};

var lightbox = new SimpleLightbox('.gallery a');

const picturesAPI = new PicturesAPI();

refs.formElem.addEventListener('submit', onFormElemSubmit);
refs.btnLoadMore.addEventListener('click', onBtnLoadMoreClick);

refs.btnLoadMore.classList.add('is-hidden');

function onFormElemSubmit(event) {
  event.preventDefault();

  const { target: searchQuery } = event;

  picturesAPI.query = event.target.elements.searchQuery.value;
  picturesAPI.page = 1;

  picturesAPI
    .fetchPhotosByQuery()
    .then(data => {
      const totalHits = data.totalHits;

      if (data.hits.length > 0) {
        refs.gallery.innerHTML = pictureElements(data.hits);

        refs.formElem.reset();
        refs.btnLoadMore.classList.remove('is-hidden');

        lightbox.refresh();

        Notify.success(`Hooray! We found ${totalHits} images.`);
      } else {
        refs.gallery.innerHTML = 'Not found!';
        refs.btnLoadMore.classList.add('is-hidden');

        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );

        refs.formElem.reset();
      }
    })
    .catch(err => {
      console.log(err);
    });
}

function onBtnLoadMoreClick(event) {
  picturesAPI.page += 1;

  picturesAPI
    .fetchPhotosByQuery()
    .then(data => {
      console.log(data);

      refs.gallery.insertAdjacentHTML('beforeend', pictureElements(data.hits));
      lightbox.refresh();
      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });

      if(data.hits.length < 40){
        refs.btnLoadMore.classList.add('is-hidden');

        Notify.info(
          `We're sorry, but you've reached the end of search results.`
        );
      }

    })
    .catch(err => {
      console.log(err);
    });
}
