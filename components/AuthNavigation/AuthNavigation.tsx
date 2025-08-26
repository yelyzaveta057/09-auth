import css from "./AuthNavigation.module.css"
import React from "react";
import Link from "next/link";




const AuthNavigation = async () => {


    return <header className={css.header}>
  <nav aria-label="Main Navigation">
    <ul className={css.navigation}>
      <li className={css.navigationItem}>
  <Link href="/profile" prefetch={false} className={css.navigationLink}>
    Profile
  </Link>
</li>

<li className={css.navigationItem}>
  <p className={css.userEmail}>User email</p>
  <button className={css.logoutButton}>
    Logout
  </button>
</li>

<li className={css.navigationItem}>
  <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
    Login
  </Link>
</li>

<li className={css.navigationItem}>
  <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
    Sign up
  </Link>
</li>

    </ul>
  </nav>
</header>
};

export default AuthNavigation;