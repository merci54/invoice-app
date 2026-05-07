import Link from 'next/link';
import Image from 'next/image';
import css from './page.module.scss';
import { getSession } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import DemoButton from '@/components/DemoBanner/DemoButton';

export default async function HomePage() {
  const session = await getSession();

  // If user is already authenticated, redirect to invoices
  if (session) {
    redirect('/invoices');
  }

  return (
    <div className={css.landing}>
      {/* Animated background shapes */}
      <div className={css.bgShapes}>
        <div className={css.bgShapes__circle1} />
        <div className={css.bgShapes__circle2} />
        <div className={css.bgShapes__circle3} />
      </div>

      <div className={css.container}>
        {/* Header */}
        <header className={css.header}>
          <div className={css.header__logo}>
            <Image src="/icons/logo.svg" alt="Invoice App Logo" width={28} height={28} />
            <span className={css.header__logoText}>Invoice App</span>
          </div>
          <Link href="/login" className={css.header__signIn}>
            Sign In
          </Link>
        </header>

        {/* Hero Section */}
        <section className={css.hero}>
          <div className={css.hero__badge}>
            <span className={css.hero__badgeDot} />
            Full-Stack Invoice Management
          </div>
          <h1 className={css.hero__title}>
            Create & Manage
            <br />
            <span className={css.hero__titleGradient}>Your Invoices</span>
          </h1>
          <p className={css.hero__subtitle}>
            A modern invoicing application built with Next.js, MongoDB, and TypeScript.
            Create, edit, filter, and track invoices with a beautiful responsive interface.
          </p>
          <div className={css.hero__actions}>
            <DemoButton />
            <Link href="/login" className={css.hero__secondary}>
              Sign In
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className={css.features}>
          <div className={css.features__grid}>
            <div className={css.feature}>
              <div className={css.feature__icon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className={css.feature__title}>Invoice CRUD</h3>
              <p className={css.feature__desc}>Create, read, update and delete invoices with validation and real-time feedback</p>
            </div>

            <div className={css.feature}>
              <div className={css.feature__icon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className={css.feature__title}>Status Filtering</h3>
              <p className={css.feature__desc}>Filter invoices by Draft, Pending, and Paid statuses with URL-based state</p>
            </div>

            <div className={css.feature}>
              <div className={css.feature__icon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className={css.feature__title}>Dark / Light Theme</h3>
              <p className={css.feature__desc}>Toggle between themes with smooth transitions and persistent preference</p>
            </div>

            <div className={css.feature}>
              <div className={css.feature__icon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 8L8 16M8 8L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className={css.feature__title}>Auth & Security</h3>
              <p className={css.feature__desc}>JWT authentication with bcrypt password hashing and protected routes</p>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className={css.tech}>
          <h2 className={css.tech__title}>Tech Stack</h2>
          <div className={css.tech__tags}>
            {['Next.js 16', 'React 19', 'TypeScript', 'MongoDB', 'Mongoose', 'JWT (jose)', 'SCSS Modules', 'Formik + Yup', 'Zustand'].map((tag) => (
              <span key={tag} className={css.tech__tag}>{tag}</span>
            ))}
          </div>
        </section>

        {/* Developer */}
        <footer className={css.dev}>
          <div className={css.dev__card}>
            <div className={css.dev__avatar}>YL</div>
            <div className={css.dev__info}>
              <h3 className={css.dev__name}>Yaroslav Lytvyn</h3>
              <a href="mailto:yaroslavlit@gmail.com" className={css.dev__email}>
                yaroslavlit@gmail.com
              </a>
            </div>
          </div>
          <p className={css.dev__copy}>© {new Date().getFullYear()} Yaroslav Lytvyn. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
