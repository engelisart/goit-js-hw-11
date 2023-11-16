import { PicturesAPI } from './pictures-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';

const refs = {
  formElem: document.querySelector('.js-form'),
  inputElem: document.querySelector('.js-input'),
  btnLoadMore: document.querySelector('.js-load-more'),
  gallery: document.querySelector('.js-gallery'),
};

const picturesAPI = new PicturesAPI();


refs.formElem.addEventListener('submit', onFormElemSubmit);
refs.inputElem.addEventListener('change', onInputElemChange);

function onFormElemSubmit(event) {
  event.preventDefault();
  picturesAPI.fetchPhotosByQuery().then(data=>{
    console.log()
    data.hits.forEach((d)=>{
        refs.gallery.innerHTML += pictureElements(d)
    })
  })
  
}

function onInputElemChange(event) {
  event.preventDefault();

  console.log('hello!');
}

function pictureElements({
  wedformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `<div class="photo-card">
<img src="${wedformatURL}" alt="${tags}" loading="lazy" />
<div class="info">
  <p class="info-item">
    <b>${likes}</b>
  </p>
  <p class="info-item">
    <b>${views}</b>
  </p>
  <p class="info-item">
    <b>${comments}</b>
  </p>
  <p class="info-item">
    <b>${downloads}</b>
  </p>
</div>
</div>`;
}
