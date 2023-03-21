import axios from 'axios';

/* const HOST = process.env.REACT_APP_API_HOST || 'back-end-production-9f66.up.railway.app'; */
const HOST = process.env.REACT_APP_API_HOST || 'localhost:3001';
const PROTOCOL = process.env.REACT_APP_API_PROTOCOL || 'http';

const BASE_URL = `${PROTOCOL}://${HOST}`;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

/* const URL = 'https://back-end-production-9f66.up.railway.app';
 */
console.log(BASE_URL);
const post = async (route, data, headers) => api.post(
  `${BASE_URL}/${route}`,
  data,
  headers,
)
|| console.log('isso é a URL', BASE_URL);
const destroy = async (route, data, headers) => api
  .delete(`${BASE_URL}/${route}`, data, headers);
const get = async (route, headers) => api.get(`${BASE_URL}/${route}`, headers);
const patch = async (route, data, headers) => api
  .patch(`${BASE_URL}/${route}`, data, headers);

export { post, get, patch, destroy };
