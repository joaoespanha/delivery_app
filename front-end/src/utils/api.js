import axios from 'axios';

const URL = 'http://localhost:3001';

const post = async (route, data) => axios.post(`${URL}/${route}`, data);
const get = async (route, headers) => axios.get(`${URL}/${route}`, headers);

export { post, get };
