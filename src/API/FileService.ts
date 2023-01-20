import $api from './api';


export default class FileService {
  static async upload(file: FormData): Promise<IFile> {
    const response = await $api.post<IFile>('/upload', file);

    return response.data;
  }

  static async update(id: string, file: FormData): Promise<IFile> {
    const response = await $api.put<IFile>(`/upload/${id}`, file);

    return response.data;
  }

  static async delete(id: string): Promise<void> {
    const response = await $api.delete(`/upload/${id}`);

    return response.data;
  }
}
