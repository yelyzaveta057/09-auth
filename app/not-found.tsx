import Link from 'next/link';
import css from "./page.module.css";

export default function NotFound() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/" className={css.link}>
        Go back home
      </Link>
    </div>
  );
}