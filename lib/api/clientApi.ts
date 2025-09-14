"use client";

import { nextServer } from "./api";
import { NewNoteData, Note } from "../../types/note";
import {  User } from "../../types/user";
import { RegisterRequest } from "../../app/(auth routes)/sign-up/page";

export type CheckSessionRequest = {
  success: boolean;
};

export type UpdateUserRequest = {
  username: string;
  email?: string;
  avatar: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};
export interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  query = "",
  page = 1,
  perPage = 12,
  tag?: string
): Promise<NotesHttpResponse> {
  const params: Record<string, string> = {
    page: String(page),
    perPage: String(perPage),
    ...(query.trim() ? { search: query } : {}),
    ...(tag ? { tag } : {}),
  };

  const { data } = await nextServer.get<NotesHttpResponse>("/notes", { params });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await nextServer.get<Note>(`/notes/${id}`);
  return data;
}

export async function createNote(noteData: NewNoteData): Promise<Note> {
  const { data } = await nextServer.post<Note>("/notes", noteData);
  return data;
}

export async function deleteNote(noteId: string): Promise<Note> {
  const { data } = await nextServer.delete<Note>(`/notes/${noteId}`);
  return data;
}


export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
};

// LOGIN

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
};

// PATCH

export const editProfile = async (data: UpdateUserRequest) => {
  const res = await nextServer.patch<User>("/users/me", data);
  return res.data;
};

// CHECK SESSION

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
};

// AUTH ME

export const getMe = async (): Promise<User> => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

// LOGOUT

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

