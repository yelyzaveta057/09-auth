import { Metadata } from "next";

import "./globals.css";
import NotFoundClient from "./not-found.client";

export const metadata: Metadata = {
  title: "Not found page",
  description: "Error 404",
  openGraph: {
    title: "Page not found",
    description: "Sorry, the page you were looking for doesn't exist.",
    url: "https://notehub.com/404",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Page not found illustration",
      },
    ],
  },
};

const NotFound = () => {
  return (
    <div className="error">
      <NotFoundClient />
    </div>
  );
};

export default NotFound;