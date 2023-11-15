import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

const axiosOptions = {
    params: {
        image_type: '',
       page: 1,
       per_page: 20, 
    }
}
