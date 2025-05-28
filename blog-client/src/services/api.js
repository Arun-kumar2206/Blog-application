import axios from 'axios';

const API_URL = 'https://blog-application-amyh.onrender.com/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const loginUser = async (credentials) => {
    try {
        const response = await api.post('/auth/login', credentials);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await api.post('/auth/register', userData);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

export const getBlogs = async (page = 1, limit = 5) => {
    try {
        const response = await api.get(`/blogs?page=${page}&limit=${limit}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getBlogById = async (id) => {
    try {
        const response = await api.get(`/blogs/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const createBlog = async (blogData) => {
    try {
        const response = await api.post('/blogs', blogData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const updateBlog = async (id, blogData) => {
    try {
        const response = await api.put(`/blogs/${id}`, blogData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const deleteBlog = async (id) => {
    try {
        const response = await api.delete(`/blogs/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export default api;