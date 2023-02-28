import axios from 'axios';

const api = axios.create({ URL: 'http://localhost:3001' });

const post = async (route, data) => api.post(`/${route}`, data);
const d = '';

export { post, d };
