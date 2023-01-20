import $api from './api';


export default class UserService {
  static async login(email: string, password: string): Promise<AuthResponce> {
    const response = await $api.post<AuthResponce>('/user/login', {
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
  ): Promise<AuthResponce> {
    const response = await $api.post<AuthResponce>('/user/registration', {
      email,
      password,
    });

    return response.data;
  }
}
