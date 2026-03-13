"use client";

import { logout } from "@/lib/actions/auth";
import css from "./page.module.scss";

export default function LogoutButton() {
  return (
    <button className={css.profile__logout} onClick={() => logout()}>
      Sign Out
    </button>
  );
}
