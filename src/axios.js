import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://us-central1-clone-9b8ae.cloudfunctions.net/api',
})

export default instance;
// 'http://localhost:5001/clone-9b8ae/us-central1/api', // The Api Url (Cloud function) URL