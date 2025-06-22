"use client";

import NoteList from "@/components/NoteList/NoteList";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";
import NoteModal from "@/components/NoteModal/NoteModal";
import SearchBox from "@/components/SearchBox/SearchBox";
import { useDebounce } from "use-debounce";
import Pagination from "@/components/Pagination/Pagination";
import css from "./page.module.css";
import { fetchNotes } from "@/lib/api";
import Loading from "../loading";
import Error from "./error";

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const [SearchText, setSearchText] = useState("");

  const [debouncedSearchText] = useDebounce(SearchText, 300);

  const trimmedSearch = debouncedSearchText.trim();

  const { data, isLoading, isSuccess, isError, error, isFetching } = useQuery({
    queryKey: ["notes", page, trimmedSearch],
    queryFn: () => fetchNotes(page, trimmedSearch),
    placeholderData: keepPreviousData,
  });
  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox
          value={SearchText}
          onChange={(value: string) => {
            setSearchText(value);
            setPage(1);
          }}
        />

        {isSuccess && data.totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </div>
      {data && !isLoading && <NoteList notes={data.notes} />}
      {IsModalOpen && <NoteModal onClose={() => setIsModalOpen(false)} />}
      {(isLoading || isFetching) && <Loading />}
      {(isError || data?.notes.length === 0) && (
        <Error error={error?.message} />
      )}
    </div>
  );
}
