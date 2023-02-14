import $api from './api';

import { INoteModel } from '../interfaces/apiModels.types';


export default class NoteService {
  static async getAll(): Promise<INoteModel[]> {
    const response = await $api.get('/');

    return response.data;
  }

  static async getById(id: string): Promise<INoteModel> {
    const response = await $api.get(`/${id}`);

    return response.data;
  }

  static async create(note: INoteModel): Promise<INoteModel> {
    const response = await $api.post('/', note);

    return response.data;
  }

  static async update(note: INoteModel): Promise<INoteModel> {
    const response = await $api.put('/', note);

    return response.data;
  }

  static async delete(id: string): Promise<INoteModel> {
    const response = await $api.delete(`/${id}`);

    return response.data;
  }
}
