
import NotesClient from "./Notes.client";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await params;

  return {
    title: `NoteHub | ${category.slug[0]}`,
    description: "NoteHub | Category",
    openGraph: {
      title: `NoteHub | ${category.slug[0]}`,
      description: "NoteHub | Category",
      url: `https://notehub.com/notes/${category.slug[0]}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "Note App image",
        },
      ],
      type: "article",
    },
  };
}

export default async function NotesPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params; 
  const raw = slug?.[0];
  const tag =
    !raw || raw.toLowerCase() === "all" ? undefined : decodeURIComponent(raw);

  return <NotesClient tag={tag} />;
}