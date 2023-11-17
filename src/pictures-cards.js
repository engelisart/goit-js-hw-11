
function pictureElement({
    webformatURL,
    largeImageURL ,
    tags,
    likes,
    views,
    comments,
    downloads,
  }) {
    return `
    <a href="${largeImageURL}">
    <div class="photo-card">
    <img class="photo-img" src="${webformatURL}" data-source="" alt="${tags}" loading="lazy" />
    <div class="info">
    <p class="info-item">
    <b>Likes</b>${likes}
    </p>
    <p class="info-item">
    <b>Views</b>${views}
    </p>
    <p class="info-item">
    <b>Comments</b>${comments}
    </p>
    <p class="info-item">
    <b>Downloads</b>${downloads}
    </p>
    </div>
    </div>
    </a>`;
  }
  
  export function pictureElements(photos) {
    const listPhotos = photos.map(pictureElement).join('');
    return listPhotos;
  }
  