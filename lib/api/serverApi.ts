
import { apiServer } from "./api";
import { cookies } from "next/headers";
import { Note, NewNoteData } from "../../types/note";
import type { User } from "../../types/user";

interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

// GET NOTES

export const getServerNotes = async (
  query: string,
  page: number,
  tag?: string
): Promise<NotesHttpResponse> => {
  const PARAMS = new URLSearchParams({
    ...(query !== "" ? { search: query } : {}),
    ...(tag !== undefined ? { tag } : {}),
    page: page.toString(),
  });
  const cookieStore = await cookies();

  const response = await apiServer.get("/notes", {
    params: PARAMS,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
};

// POST FETCH

export const createServerNote = async (newNote: NewNoteData): Promise<Note> => {
  const cookieStore = await cookies();
  const response = await apiServer.post("/notes", newNote, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

// FETCH NOTE BY ID

export const fetchServerNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const response = await apiServer.get(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

// DELETE POST

export const deleteServerNote = async (id: string) => {
  const cookieStore = await cookies();
  const response = await apiServer.delete<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

// EDIT PROFILE

export const editProfile = async (data: User) => {
  const cookieStore = await cookies();
  const res = await apiServer.patch("/users/me", data, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};

// PRIVAT USER

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await apiServer.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

// CHECK SESSION

export const checkSession = async () => {
  const cookieStore = await cookies();
  const response = await apiServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await apiServer.get<Note>(`/notes/${id}`);
  return res.data;
};