import axios from 'axios';

const URL = 'URL';

const post = async (route, data) => axios.post(`${URL}${route}`, data);
const get = async (route) => axios.get(`${URL}${route}`);

export { post, get };
