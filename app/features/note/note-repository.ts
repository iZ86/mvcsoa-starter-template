
import { NoteData } from "./note-model";

const NOTESDATA: NoteData[] = [
  {
    noteId: 1,
    note: "I like turtles.",
    userId: 1,
  },
  {
    noteId: 2,
    note: "Today I went to the park!",
    userId: 1,
  },
  {
    noteId: 3,
    note: "I hit a new PR!",
    userId: 2,
  },
  {
    noteId: 4,
    note: "I like sleep",
    userId: 1,
  }
]


interface INoteRepository {
  getNotesByUserId(userId: number): Promise<NoteData[]>;
}


/** Here you would connect to whatever database you want to use, and the methods here interact with the database. */
class NoteRepository implements INoteRepository {
  public async getNotesByUserId(userId: number): Promise<NoteData[]> {

    return NOTESDATA.filter(note => note.userId === userId);
  }
}

export default new NoteRepository();
