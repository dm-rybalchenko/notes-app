import $api from './api';


export default class NoteService {
  static async getAll(): Promise<INote[]> {
    const response = await $api.get('/');

    return response.data;
  }

  static async create(note: INote): Promise<INote> {
    const response = await $api.post('/', note);

    return response.data;
  }

  static async update(note: INote): Promise<INote> {
    const response = await $api.put('/', note);

    return response.data;
  }

  static async delete(id: string): Promise<INote> {
    const response = await $api.delete(`/${id}`);

    return response.data;
  }
}
