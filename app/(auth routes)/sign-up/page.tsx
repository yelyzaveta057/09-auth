// app/(public routes)/sign-up/page.tsx

'use client';


// Додаємо імпорти
import { useState } from 'react';
import { useRouter } from 'next/navigation';


import css from "./SignUpPage.module.css"

import { register } from '../../../lib/api/clientApi';

import { useAuthStore } from '../../../lib/store/authStore';


export type RegisterRequest = {
  email: string;
  password?: string;
  avatar?: string;
  username: string;
};


export default function SignUp() {
  const router = useRouter();
  const [error, setError] = useState("");

  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    try {
      // Типізуємо дані форми
      const formValues = Object.fromEntries(formData) as RegisterRequest;
      // Виконуємо запит
      const res = await register(formValues);
      // Виконуємо редірект або відображаємо помилку
      if (res) {
        setUser(res);
        router.push("/profile");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.log("error", error);
      setError("Invalid email or password");
    }
  };

  return (
    <>
     <main className={css.mainContent}>
  <h1 className={css.formTitle}>Sign up</h1>
	<form className={css.form} action={handleSubmit}>
    <div className={css.formGroup}>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" name="email" className={css.input} required />
    </div>

    <div className={css.formGroup}>
      <label htmlFor="password">Password</label>
      <input id="password" type="password" name="password" className={css.input} required />
    </div>

    <div className={css.actions}>
      <button type="submit" className={css.submitButton}>
        Register
      </button>
    </div>

 {error && <p className={css.error}>{error}</p>}
  </form>

</main>

    </>
  );
};

