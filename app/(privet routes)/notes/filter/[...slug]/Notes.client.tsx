"use client";
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { fetchNotes } from "@/lib/api";
import { useEffect } from "react";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Link from "next/link";



import type { NotesHttpResponse } from "@/lib/api";
import css from "./NotesPage.module.css"

interface NotesClientProps {
  tag?: string;           
  initialData?: NotesHttpResponse;
}

export default function NotesClient({tag, initialData }: NotesClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [debounceSearchTerm] = useDebounce(searchTerm, 1000);

 const perPage = 12;
useEffect(() => { setCurrentPage(1); }, [tag]);
const { data, isLoading, error } = useQuery({
  queryKey: ["notes", debounceSearchTerm, currentPage, tag],
  
  queryFn: () => fetchNotes(debounceSearchTerm, currentPage, perPage, tag), 
  placeholderData: keepPreviousData,
    initialData,
});
;


  const handleSearchChange = (newTerm: string) => {
    setSearchTerm(newTerm);
    setCurrentPage(1);
  };
  

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchTerm} onChange={handleSearchChange} />
        {data && data.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            pageCount={data.totalPages}
            onPageChange={setCurrentPage}
          />
        )}
  <Link className={css.button} href="/notes/action/create">
          Create note +
        </Link>
      </header>

      {isLoading && <strong className={css.loading}>Loading notes...</strong>}
      {error && (
        <div className={css.error}>
          <strong>Error loading notes:</strong> {error.message}
        </div>
      )}
      {data && <NoteList notes={data.notes} />}
 
    </div>
  );
}
