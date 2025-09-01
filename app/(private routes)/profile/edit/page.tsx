"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { useAuthStore } from "../../../../lib/store/authStore";


import css from "./EditProfilePage.module.css";
import { editProfile } from "@/lib/api/serverApi";

export type UpdateUserRequest = {
  username: string;
  email: string;
  avatar: string;
};

export default function EditPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const setUser = useAuthStore((s) => s.setUser);

  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  async function onEditAction(formData: FormData) {
    setError("");

    const username = String(formData.get("username") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const avatar = String(formData.get("avatar") ?? "").trim();

    const payload: UpdateUserRequest = { username, email, avatar };

    try {
      const updated = await editProfile(payload);

      if (!updated) {
        setError("Failed to update profile.");
        return;
      }

      setUser(updated);
      router.push("/profile");
    } catch (e) {
      console.error("editProfile error:", e);
      setError("Failed to update profile.");
    }
  }

  const handleCancel = () => router.back();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        {user && (
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        )}

        <form
          action={(fd) => startTransition(() => onEditAction(fd))}
          className={css.profileInfo}
        >
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              name="username"
              type="text"
              className={css.input}
              defaultValue={user?.username ?? ""}
              required
            />
          </div>

          <div className={css.usernameWrapper}>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              name="email"
              type="email"
              className={css.input}
              defaultValue={user?.email ?? ""}
              required
            />
          </div>

          <input type="hidden" name="avatar" value={user?.avatar ?? ""} />

          <div className={css.actions}>
            <button type="submit" className={css.saveButton} disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className={css.cancelButton}
              disabled={isPending}
            >
              Cancel
            </button>
          </div>
        </form>

        {error && <p role="alert" className={css.error}>{error}</p>}
      </div>
    </main>
  );
}
