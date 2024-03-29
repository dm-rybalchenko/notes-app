import axios, { AxiosRequestHeaders } from 'axios';

import { IAuthModel } from '../interfaces/apiModels.types';


export const API_URL = process.env.REACT_APP_SERVER_URL;

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  (
    config.headers as Partial<AxiosRequestHeaders>
  ).Authorization = `Bearer ${localStorage.getItem('token')}`;

  return config;
});

$api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status == 401
      && error.config
      && !error.config._isRetry
    ) {
      originalRequest._isRetry = true;

      try {
        const response = await axios.get<IAuthModel>(
          `${API_URL}/user/refresh`,
          {
            withCredentials: true,
          },
        );
        localStorage.setItem('token', response.data.accessToken);

        return await $api.request(originalRequest);
      } catch (e) {
        console.log('Пользователь не авторизован');
      }
    }

    throw error;
  },
);

export default $api;
