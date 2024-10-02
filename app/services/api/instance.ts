import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

const accessToken = localStorage.getItem('accessToken');
if (accessToken) {
  instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
}

export default instance;
