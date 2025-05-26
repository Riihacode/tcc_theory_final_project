import axios from 'axios';

const API_URL = 'http://localhost:5000';
//const API_URL = 'https://backend-notes-hafizh-136536138076.us-central1.run.app';

//mengambil token dari local storage
const getToken = () => localStorage.getItem('accessToken');

// Refresh token jika expired
export const getNewAccessToken = async () => {
  try {
    const response = await axios.post(`${API_URL}/refresh-token`, {}, {
      withCredentials: true
    });
    const { accessToken } = response.data;
    localStorage.setItem('accessToken', accessToken);
    return accessToken;
  } catch (error) {
    console.error("Gagal refresh token", error);
    window.location.href = "/login";
  }
};

// Buat axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor request → tambahkan token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor response → refresh token jika 403
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await getNewAccessToken();
      originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
      return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export const getNotes = async () => {
  return await axiosInstance.get('/notes');
};

export const getNoteById = async (id) => {
  return await axiosInstance.get(`/note/${id}`);
}

export const createNote = async (note) => {
  return await axiosInstance.post('/add-note', note);
};

export const updateNote = async (id, note) => {
  return await axiosInstance.put(`/edit-note/${id}`, note);
};

export const deleteNote = async (id) => {
  return await axiosInstance.delete(`/delete-note/${id}`);
};

export const getUsers = async () => {
  const response = await axiosInstance.get('/users');
  return response.data;
};

export const createUser = async (user) => {
  const response = await axiosInstance.post('/users', user);
  return response.data;
};

export const updateUser = async (id, user) => {
  const response = await axiosInstance.put(`/users/${id}`, user);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axiosInstance.delete(`/users/${id}`);
  return response.data;
};