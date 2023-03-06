import axios from 'axios';

const URL = 'http://localhost:3001';

const post = async (route, data, headers) => axios.post(`${URL}/${route}`, data, headers);
const get = async (route, headers) => axios.get(`${URL}/${route}`, headers);
const patch = async (route, sata, headers) => axios
  .patch(`${URL}/${route}`, data, headers);

export { post, get, patch };
