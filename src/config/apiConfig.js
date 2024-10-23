import axios from "axios";

export const apiConfig = {
    baseURL: 'http://192.168.18.57:5454',
};

const api = axios.create({
    baseURL: apiConfig.baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
