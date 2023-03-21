import axios from 'axios';

const URL = 'https://back-end-production-9f66.up.railway.app';

const post = async (route, data, headers) => axios.post(`${URL}/${route}`, data, headers);
const destroy = async (route, data, headers) => axios
  .delete(`${URL}/${route}`, data, headers);
const get = async (route, headers) => axios.get(`${URL}/${route}`, headers);
const patch = async (route, data, headers) => axios
  .patch(`${URL}/${route}`, data, headers);

export { post, get, patch, destroy };
