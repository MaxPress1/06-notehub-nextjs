import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

export default async function Notes() {
  const res = await fetchNotes();
  return (
    <div>
      <NotesClient initialData={res} />
    </div>
  );
}
