"use client";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchNoteById } from "../../../../lib/api";

import Modal from "../../../../components/Modal/Modal";
import css from "./NotePreview.module.css"

const NotePreview = () => {
  const router = useRouter();
  const close = () => router.back();

  const { id } = useParams<{ id: string }>();


  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p className="loader">Loading, please wait...</p>;
  if (error || !note) return <p className="error">Something went wrong.</p>;

  return (
    <Modal onClose={close}>
      <div className={css.container}>
        <h2 className={css.header}>{note.title}</h2>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{note.createdAt}</p>
        <p className={css.tag}>{note.tag}</p>

        <button onClick={close} className={css.backBtn}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default NotePreview;