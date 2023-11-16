import axios from 'axios';

export class PicturesAPI {
  constructor() {
    this.page = 1;

    axios.defaults.baseURL = 'https://pixabay.com/api';
  }

  fetchPhotosByQuery() {
    const axiosOptions = {
      params: {
        page: this.page,
        per_page: 20,
        key: '40691012-8f236ebf8c6cb98d313bec4db',
        q: 'flower',
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
