"use client";

import React, { useState } from "react";
import Link from "next/link";

import css from "./TagsMenu.module.css";

export const TagsMenu = () => {
  const tagsList = ["All", "Work", "Personal", "Meeting", "Shopping", "Todo"];
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className={css.menuContainer}>
      <button
        onClick={() => setOpenMenu((prev) => !prev)}
        className={css.menuButton}
      >  Notes ▾
      </button>
      {openMenu && (
        <ul className={css.menuList}>
          {tagsList.map((tag, index) => {
            return (
              <li key={index} className={css.menuItem}>
                <Link
                  onClick={() => setOpenMenu((prev) => !prev)}
                  href={`/notes/filter/${tag}`}
                  className={css.menuLink}
                >
                  {tag}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};