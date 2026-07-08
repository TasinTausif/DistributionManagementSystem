import axios from 'axios';
import Swal from 'sweetalert2';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
        delete config.headers['Content-Type'];
    }

    return config;
});

api.interceptors.response.use((response) => {
    if (response.data && response.data.alert) {
        const { type, message } = response.data.alert;
        Swal.fire({
            icon: type,
            title: type.charAt(0).toUpperCase() + type.slice(1),
            text: message,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
        });
    }
    return response;
},
    (error) => {
        if (!error.response || error.response.status !== 422) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || error.message || 'An unexpected error occurred',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 4000
            });
        }
        return Promise.reject(error);
    }
);

export default api;
