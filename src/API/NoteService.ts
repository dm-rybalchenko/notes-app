import axios from 'axios';


const SERVER_ENDPOINT = 'http://localhost:5000';
export default class NoteService {
  static async getAll() {
    const response = await axios.get(SERVER_ENDPOINT);
    await delay(1000);
    return response.data;
  }

  static async create(note: INote) {
    const response = await axios.post(SERVER_ENDPOINT, note);
    await delay(1000);
    return response.data;
  }

  static async update(note: INote) {
    const response = await axios.put(SERVER_ENDPOINT, note);
    await delay(1000);
    return response.data;
  }

  static async delete(id: string) {
    const response = await axios.delete(`${SERVER_ENDPOINT}/${id}`);
    await delay(1000);
    return response.data;
  }
}

const delay = async (ms: number) =>
  await new Promise((res) => setTimeout(res, ms));
