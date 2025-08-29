import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";
import { fetchNoteById } from "../../../../lib/api/clientApi";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({params}:Props): Promise<Metadata>  {
  try {
    const {id} = await params
    const note = await fetchNoteById(id)
    
    if (!note) {
      return {
        title: "Note not found",
        description: "The requested note could not be found",
      };
    }
    
    return{
      title: `Note: ${note.title}`,
      description: note.content.slice(0, 30),
      openGraph: {
        title: `Note: ${note.title}`,
        description: note.content.slice(0, 100),
        url: `https://notehub.com/notes/${id}`,
        siteName: 'NoteHub',
        images: [
          {
            url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
            width: 1200,
            height: 630,
            alt: note.title,
          },
        ],
        type: 'article',
      },
    }
  } catch (error) {
    console.error("Error generating metadata for note:", error);
    return {
      title: "Note",
      description: "Note details",
    };
  }
}

const NoteDetails = async ({ params }: Props) => {
  try {
    const { id } = await params;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
      queryKey: ["note", Number(id)],
      queryFn: () => fetchNoteById(id),
    });

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetailsClient />
      </HydrationBoundary>
    );
  } catch (error) {
    console.error("Error loading note details:", error);
    return (
      <div>
        <h1>Error</h1>
        <p>Failed to load note details. Please try again.</p>
      </div>
    );
  }
};

export default NoteDetails;