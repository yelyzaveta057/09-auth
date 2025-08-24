import axios from 'axios';
import type { Note, NewNoteData} from '../types/note';



const BASE_URL = "https://notehub-public.goit.study/api";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const noteServiceClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  query: string = "",
  page: number = 1,
  perPage: number = 12,
  tag?: string,
): Promise<NotesHttpResponse> => {
  const params: Record<string, string> = {
    page: page.toString(),
    perPage: perPage.toString(),
  };

  if (query.trim()) {
    params.search = query;
  }
if (tag) params.tag = tag;

  const response = await noteServiceClient.get<NotesHttpResponse>('/notes', { params });

  return response.data;
};



export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await noteServiceClient.get<Note>(`/notes/${id}`);
  return res.data;
};

export const createNote = async (noteData: NewNoteData): Promise<Note> => {
  const res = await noteServiceClient.post<Note>('/notes', noteData);
  return res.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const res = await noteServiceClient.delete<Note>(`/notes/${noteId}`);
  return res.data;
};

