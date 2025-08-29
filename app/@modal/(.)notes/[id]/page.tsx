import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import NotePreview from "./NotePreview.client";

import { fetchNoteById } from "../../../../lib/api/clientApi";

type Props = {
  params: Promise<{ id: string }>;
};

const NotesPage = async ({ params }: Props) => {
  try {
    const { id } = await params;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
      queryKey: ["note", Number(id)],
      queryFn: () => fetchNoteById(String(id)),
    });

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotePreview />
      </HydrationBoundary>
    );
  } catch (error) {
    console.error("Error loading modal note:", error);
    return (
      <div>
        <h1>Error</h1>
        <p>Failed to load note. Please try again.</p>
      </div>
    );
  }
};

export default NotesPage;
