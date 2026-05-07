import { getCurrentUser } from "@/lib/actions/auth";
import { redirect } from "next/navigation";
import LogoutButton from "./LogoutButton";
import Container from "@/components/Container/Container";
import css from "./page.module.scss";
import { connectMongoDB } from "@/lib/db/connectMongoDB";
import { Invoice } from "@/lib/models/invoice";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  await connectMongoDB();

  // Fetch invoice statistics
  const invoices = await Invoice.find({ userId: user.userId }).lean();

  const totalInvoices = invoices.length;
  const paidInvoices = invoices.filter((inv) => inv.status === "Paid").length;
  const pendingInvoices = invoices.filter((inv) => inv.status === "Pending").length;
  const draftInvoices = invoices.filter((inv) => inv.status === "Draft").length;

  const totalRevenue = invoices
    .filter((inv) => inv.status === "Paid")
    .reduce((sum, inv) => sum + (inv.totalAmount || 0), 0);

  const pendingAmount = invoices
    .filter((inv) => inv.status === "Pending")
    .reduce((sum, inv) => sum + (inv.totalAmount || 0), 0);

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <main className={css.profile}>
      <Container>
        {/* Back navigation */}
        <Link href="/invoices" className={css.back}>
          <svg
            width="5"
            height="10"
            viewBox="0 0 5 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.22778 0.707031L-0.000118256 4.93493L4.22778 9.16283"
              stroke="#7C5DFA"
              strokeWidth="2"
            />
          </svg>
          <span>Go back</span>
        </Link>

        {/* Profile card */}
        <div className={css.card}>
          <div className={css.card__header}>
            <div className={css.card__avatar}>{initials}</div>
            <div className={css.card__info}>
              <h1 className={css.card__name}>{user.name}</h1>
              <p className={css.card__email}>{user.email}</p>
              {user.isDemo && (
                <span className={css.card__demoBadge}>Demo Account</span>
              )}
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className={css.stats}>
          <div className={css.stats__item}>
            <span className={css.stats__value}>{totalInvoices}</span>
            <span className={css.stats__label}>Total Invoices</span>
          </div>
          <div className={css.stats__item}>
            <span className={`${css.stats__value} ${css['stats__value--paid']}`}>{paidInvoices}</span>
            <span className={css.stats__label}>Paid</span>
          </div>
          <div className={css.stats__item}>
            <span className={`${css.stats__value} ${css['stats__value--pending']}`}>{pendingInvoices}</span>
            <span className={css.stats__label}>Pending</span>
          </div>
          <div className={css.stats__item}>
            <span className={`${css.stats__value} ${css['stats__value--draft']}`}>{draftInvoices}</span>
            <span className={css.stats__label}>Draft</span>
          </div>
        </div>

        {/* Revenue cards */}
        <div className={css.revenue}>
          <div className={css.revenue__card}>
            <div className={css.revenue__icon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 1V23M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className={css.revenue__info}>
              <span className={css.revenue__label}>Total Revenue</span>
              <span className={css.revenue__amount}>£ {totalRevenue.toFixed(2)}</span>
            </div>
          </div>
          <div className={`${css.revenue__card} ${css['revenue__card--pending']}`}>
            <div className={css.revenue__icon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className={css.revenue__info}>
              <span className={css.revenue__label}>Pending Amount</span>
              <span className={css.revenue__amount}>£ {pendingAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Settings section */}
        <div className={css.section}>
          <h2 className={css.section__title}>Preferences</h2>

          <div className={css.setting}>
            <div className={css.setting__info}>
              <div className={css.setting__icon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <p className={css.setting__name}>Appearance</p>
                <p className={css.setting__desc}>Toggle between light and dark theme</p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>

        {/* Account section */}
        <div className={css.section}>
          <h2 className={css.section__title}>Account</h2>

          <div className={css.setting}>
            <div className={css.setting__info}>
              <div className={css.setting__icon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className={css.setting__name}>{user.name}</p>
                <p className={css.setting__desc}>{user.email}</p>
              </div>
            </div>
          </div>

          <LogoutButton />
        </div>
      </Container>
    </main>
  );
}
