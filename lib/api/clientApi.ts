
import type { Note, NewNoteData} from '../../types/note';
import { apiServer } from "./api";
import type {
  User,
  RegisterRequest,
  LoginRequest,
  CheckSessionRequest,
} from "../../types/user";

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
  const params: Record<string, string> = ({
    page: page.toString(),
    perPage: perPage.toString(),
  });

  if (query.trim()) {
    params.search = query;
  }
if (tag) params.tag = tag;

  const response = await apiServer.get<NotesHttpResponse>('/notes', { params });

  return response.data;
};





export const createNote = async (noteData: NewNoteData): Promise<Note> => {
  const res = await apiServer.post<Note>('/notes', noteData);
  return res.data;
};

export const deleteNote = async (noteId: string) => {
  const res = await apiServer.delete<Note>(`/notes/${noteId}`);
  return res.data;
};


//register

export const register = async (data: RegisterRequest) => {
  const res = await apiServer.post<User>("/auth/register", data);
  return res.data;
};

//login

export const login = async (data: LoginRequest) => {
  const res = await apiServer.post<User>("/auth/login", data);
  return res.data;
};

//checkSession

export const checkSession = async () => {
  const res = await apiServer.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
};

//getMe

export const getMe = async () => {
  const res = await apiServer.get<User>("/users/me");
  return res.data;
};

//updateProfile
export const updateProfile = async (data: { username: string }) => {
  const res = await apiServer.patch<User>("/users/me", data);
  return res.data;
};

//logout

export const logout = async (): Promise<void> => {
  await apiServer.post("/auth/logout");
};