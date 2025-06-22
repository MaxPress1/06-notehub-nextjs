import { Metadata } from "next";
import NotesClient from "./Notes.client";

export default function App() {
  const metadata: Metadata = {
    title: "Notes page",
  };
  return (
    <div>
      <NotesClient />
    </div>
  );
}
