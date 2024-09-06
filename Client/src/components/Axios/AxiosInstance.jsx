// src/api/axiosInstance.js
import axios from 'axios';
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 10000, 
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// // Helper function to handle refreshing the token
// const refreshToken = async () => {
//   try {
//     const response = await axiosInstance.post('/auth/refresh-token', {
//       refreshToken: localStorage.getItem('refreshToken'),
//     });
//     localStorage.setItem('token', response.data.token);
//     return response.data.token;
//   } catch (error) {
//     throw new Error('Unable to refresh token');
//   }
// };

// // Add a response interceptor
// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const newToken = await refreshToken();
//         axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
//         originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         toast.error('Session expired. Please log in again.');
//         localStorage.removeItem('token');
//         localStorage.removeItem('refreshToken');
//         window.location = '/';
//         return Promise.reject(refreshError);
//       }
//     }

//     if (error.response.status === 403) {
//       toast.error('You do not have permission to perform this action.');
//     } else if (error.response.status >= 500) {
//       toast.error('Server error. Please try again later.');
//     } else {
//       toast.error(error.response.data.message || 'An error occurred.');
//     }

//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
