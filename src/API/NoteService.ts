import data from './data.json'

export default class NoteService {

  static async getAllNotes() {
	await delay(1000);
	return [...data]
  }

  static async createNote(note: INote) {
	const newNote = {...note, id: Math.random().toString(36).substring(2,6)}
	await delay(1000);
	return newNote;
  }

  static async updateNote(note: INote) {
	await delay(1000);
	return note;
  }

  static async removeNote(id: string) {
	await delay(1000);
	return data.find(note => note.id === id);
  }
}

const delay = async(ms: number) => await new Promise(res => setTimeout(res, ms))