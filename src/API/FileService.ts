import $api from './api';

import { IFileModel } from '../interfaces/apiModels.types';


export default class FileService {
  static async upload(file: FormData): Promise<IFileModel> {
    const response = await $api.post<IFileModel>('/upload', file);

    return response.data;
  }

  static async update(id: string, file: FormData): Promise<IFileModel> {
    const response = await $api.put<IFileModel>(`/upload/${id}`, file);

    return response.data;
  }

  static async delete(id: string): Promise<void> {
    const response = await $api.delete(`/upload/${id}`);

    return response.data;
  }
}
