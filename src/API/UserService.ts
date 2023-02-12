import $api from './api';
import { IAuthModel } from '../interfaces/apiModels.types';


export default class UserService {
  static async login(email: string, password: string): Promise<IAuthModel> {
    const response = await $api.post<IAuthModel>('/user/login', {
      email,
      password,
    });

    return response.data;
  }

  static async logout(): Promise<void> {
    const response = await $api.post('/user/logout');

    return response.data;
  }

  static async registration(
    email: string,
    password: string
  ): Promise<IAuthModel> {
    const response = await $api.post<IAuthModel>('/user/registration', {
      email,
      password,
    });

    return response.data;
  }
}
