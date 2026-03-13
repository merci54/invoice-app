"use client";

import { useState } from "react";
import { login } from "@/lib/actions/auth";
import Link from "next/link";
import Image from "next/image";
import css from "../auth.module.scss";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    const result = await login(email, password);

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

        <h1 className={css.auth__title}>Welcome Back</h1>
        <p className={css.auth__subtitle}>Sign in to your account</p>

        <form className={css.auth__form} onSubmit={handleSubmit}>
          {error && <div className={css.auth__error}>{error}</div>}

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
              placeholder="Your password"
              autoComplete="current-password"
            />
          </div>

          <button
            className={css.auth__submit}
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className={css.auth__footer}>
          Don&apos;t have an account?{" "}
          <Link href="/register" className={css.auth__link}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
