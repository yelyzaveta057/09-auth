"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createNote } from "@/lib/api";
import css from "./NoteForm.module.css";
import { useNoteDraft } from "@/lib/store/noteStore";
import { ChangeEvent } from "react";


type NewNoteData = {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
};

const TAGS = ["Todo", "Work", "Personal", "Meeting", "Shopping"] as const;

export default function NoteForm() {
  const {draft, setDraft, clearDraft} = useNoteDraft();
  const qc = useQueryClient();
  const router = useRouter();



  const { mutate } = useMutation({
    mutationFn: (data: NewNoteData) => createNote(data),
    onSuccess: () => {
      clearDraft();
      qc.invalidateQueries({ queryKey: ["notes"] });
      router.push("/notes/filter/All");
      router.refresh();
    },
  });

  const handleSubmit = (formData: FormData) => {
    const title = (formData.get("title") as string)?.trim() || "";
    const content = (formData.get("content") as string)?.trim() || "";
    const tag = (formData.get("tag") as NewNoteData["tag"]) || "Todo";

    //валідація 
    if (title.length < 3 || title.length > 50) return;
    if (content.length > 500) return;
    if (!TAGS.includes(tag)) return;

    mutate({ title, content, tag });
  };

  const handleCancel = () => router.back();
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> ) =>{
    
    setDraft({
      ...(draft as     NewNoteData ),
[ e.target.name as keyof  NewNoteData]:  e.target.value,

    })
  }

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          className={css.input}
          placeholder="My note title"
          required
          minLength={3}
          maxLength={50}

          onChange={handleChange}
          defaultValue={draft.title}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          className={css.textarea}
         onChange={handleChange}
         defaultValue={draft.content}
          rows={8}
          maxLength={500}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select onChange={handleChange}  id="tag" name="tag" className={css.select} defaultValue={draft?.tag} required >
          {TAGS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={handleCancel}>
          Cancel
        </button>
        <button type="submit" className={css.submitButton}>
          Create note
        </button>
      </div>
    </form>
  );
}
