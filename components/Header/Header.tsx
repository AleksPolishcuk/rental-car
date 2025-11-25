import Link from 'next/link';
import css from './Header.module.css';

export default function Header() {
  return (
    <header className={css.container}>
      <Link href="/" aria-label="Home" className={css.headerLogoWrapper}>
      <svg
            width="104"
            height="16"
            aria-label="Logo"
          >
            <use href="/RentalCar.svg"></use>
          </svg>
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li className={css.navigationItem}>
            <Link href="/">Home</Link>
          </li>
          <li className={css.navigationItem}>
            <Link href="/catalog">Catalog</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}