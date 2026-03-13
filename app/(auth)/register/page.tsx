"use client";

import { useState } from "react";
import { register } from "@/lib/actions/auth";
import Link from "next/link";
import Image from "next/image";
import css from "../auth.module.scss";

export default function RegisterPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !password) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    const result = await register(name, email, password);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className={css.auth}>
      <div className={css.auth__card}>
        <div className={css.auth__logo}>
          <Image src="/icons/logo.svg" alt="logo" width={28} height={28} />
        </div>

        <h1 className={css.auth__title}>Create Account</h1>
        <p className={css.auth__subtitle}>
          Sign up to start managing your invoices
        </p>

        <form className={css.auth__form} onSubmit={handleSubmit}>
          {error && <div className={css.auth__error}>{error}</div>}

          <div className={css.auth__field}>
            <label className={css.auth__label} htmlFor="name">
              Name
            </label>
            <input
              className={css.auth__input}
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              autoComplete="name"
            />
          </div>

          <div className={css.auth__field}>
            <label className={css.auth__label} htmlFor="email">
              Email
            </label>
            <input
              className={css.auth__input}
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>

          <div className={css.auth__field}>
            <label className={css.auth__label} htmlFor="password">
              Password
            </label>
            <input
              className={css.auth__input}
              id="password"
              name="password"
              type="password"
              placeholder="Min. 6 characters"
              autoComplete="new-password"
            />
          </div>

          <button
            className={css.auth__submit}
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className={css.auth__footer}>
          Already have an account?{" "}
          <Link href="/login" className={css.auth__link}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
