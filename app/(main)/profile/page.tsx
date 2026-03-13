import { getCurrentUser } from "@/lib/actions/auth";
import { redirect } from "next/navigation";
import LogoutButton from "./LogoutButton";
import Container from "@/components/Container/Container";
import css from "./page.module.scss";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <main className={css.profile}>
      <Container>
        <div className={css.profile__card}>
          <div className={css.profile__avatar}>{initials}</div>
          <h1 className={css.profile__name}>{user.name}</h1>
          <p className={css.profile__email}>{user.email}</p>
          <LogoutButton />
        </div>
      </Container>
    </main>
  );
}
