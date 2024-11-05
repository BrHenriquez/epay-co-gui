import axios from 'axios';

const instance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
});

instance.interceptors.response.use(
    (response) => {
        // Verify if has response data and response data equals or greater than 400
        if (response?.data && response?.data?.code >= 400) {
            const error = response?.data?.message;
            console.error('Error in response', error);
            throw new Error(error);
        }
        // If no error, return original response.
        return response;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export const httpService = () => {

    const get = (url: string) => instance.get(url).then((response) => response?.data);

    const post = (url: string, options = {}) => instance.post(url, options).then((response) => response.data);

    return {
        get,
        post,
    };
};
