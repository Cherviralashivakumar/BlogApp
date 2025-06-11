// in src/services/axios.js or axiosConfig.ts
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export default instance;
