import axios, { AxiosInstance } from 'axios';

const baseURL = 'http://localhost:5000/api';

export const axiosInstance: AxiosInstance = axios.create({
    baseURL,
    withCredentials: true,
});
