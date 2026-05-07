"use client";

import { useThemeStore } from "@/lib/stores/themeStore";
import css from "./page.module.scss";

export default function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <button className={css.toggle} onClick={() => toggleTheme()}>
      <span
        className={`${css.toggle__track} ${theme === "dark" ? css["toggle__track--active"] : ""}`}
      >
        <span className={css.toggle__thumb} />
      </span>
      <span className={css.toggle__label}>
        {theme === "dark" ? "Dark" : "Light"}
      </span>
    </button>
  );
}
