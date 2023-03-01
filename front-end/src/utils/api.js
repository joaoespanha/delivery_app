import axios from 'axios';

const api = axios.create({ URL: 'http://localhost:3001' });

const post = async (route, data) => api.post(`/${route}`, data);
const get = async (route) => api.get(`/${route}`);

export { post, get };
