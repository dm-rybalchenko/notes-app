import axios from 'axios';


const SERVER_ENDPOINT = 'http://localhost:5000/upload';

export default class FileService {
  static async upload(file: any) {
    const response = await axios.post(SERVER_ENDPOINT, file);
	await delay(1000);
    return response.data;
  }

  static async update(id: any, file: any) {
    const response = await axios.put(`${SERVER_ENDPOINT}/${id}`, file);
	await delay(1000);
    return response.data;
  }

  static async delete(id: any) {
    const response = await axios.delete(`${SERVER_ENDPOINT}/${id}`);
	await delay(1000);
    return response.data;
  }
}

const delay = async(ms: number) => await new Promise(res => setTimeout(res, ms))