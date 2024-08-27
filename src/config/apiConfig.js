import axios from "axios";

export const apiConfig = {
    baseURL: 'http://localhost:5454',
};

const api = axios.create({
    baseURL: apiConfig.baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
