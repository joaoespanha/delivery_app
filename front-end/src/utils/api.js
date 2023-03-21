import axios from 'axios';

const HOST = process.env.REACT_APP_API_HOST || 'localhost:3001';
const PROTOCOL = process.env.REACT_APP_API_PROTOCOL || 'http';

const URL = `${PROTOCOL}://${HOST}`;

const api = axios.create({
  baseURL: URL,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

/* const URL = 'https://back-end-production-9f66.up.railway.app'; */

console.log(URL);
const post = async (route, data, headers) => api.post(`${URL}/${route}`, data, headers)
|| console.log('isso é a URL', URL);
const destroy = async (route, data, headers) => api
  .delete(`${URL}/${route}`, data, headers);
const get = async (route, headers) => api.get(`${URL}/${route}`, headers);
const patch = async (route, data, headers) => api
  .patch(`${URL}/${route}`, data, headers);

export { post, get, patch, destroy };
