// app/not-found.tsx

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import css from "./page.module.css"
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: "Not-Found Page",
  description: "Something went wrong",
  openGraph: {
      title: "Not-Found Page",
      description: "Something went wrong",
      url: `https://notehub.com/not-found`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt:  "Error",
        },
      ],
      type: 'article',
    },
  
};
const NotFound = () => {
  const router = useRouter();


  useEffect(() => {

    const timer = setTimeout(() => router.push('/'), 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
<p className={css.description}>Sorry, the page you are looking for does not exist.</p>

    </div>
  );
};

export default NotFound