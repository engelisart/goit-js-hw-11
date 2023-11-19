import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export class PicturesAPI {
  constructor() {
    this.page = 1;
    this.query = null;

  }

  fetchPhotosByQuery(q) {
    const axiosOptions = {
      params: {
        page: this.page,
        per_page: 40,
        key: '40691012-8f236ebf8c6cb98d313bec4db',
        q: this.query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
      },
    };

    return axios
      .get('', axiosOptions)
      .then(res => res.data)
      .catch(err => console.log(err));
  }
}
