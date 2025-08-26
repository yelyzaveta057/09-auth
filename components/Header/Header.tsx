import css from "./Header.module.css";
import React from "react";
import Link from "next/link";
import AuthNavigation from "../AuthNavigation/AuthNavigation";



const Header = async () => {


    return <header className={css.header}>
  <Link href="/" aria-label="Home">
    NoteHub
  </Link>
  <nav aria-label="Main Navigation">
    <ul className={css.navigation}>
      {/* <li>
        <Link href="/">Home</Link>
      </li> */}
      <li>
        <AuthNavigation />
      </li>
    </ul>
  </nav>
</header>
};

export default Header;