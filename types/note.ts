export interface Note {
  id: string;
  title: string;
  content: string;
  categotyId: string,
  createdAt: string;
  updatedAt: string;
  tag: string;
}


export interface NewNoteData {
  title: string;
  content: string;
  tag: string;
}



export type NoteListResponse = {
  notes: Note[];
  total: number;
};