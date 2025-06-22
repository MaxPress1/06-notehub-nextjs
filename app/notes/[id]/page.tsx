import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type NoteDetailsProps = {
  params: Promise<{ id: string }>;
};

export default async function NoteDetails({ params }: NoteDetailsProps) {
  const { id } = await params;
  const newId = Number(id);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", newId],
    queryFn: () => fetchNoteById(newId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
