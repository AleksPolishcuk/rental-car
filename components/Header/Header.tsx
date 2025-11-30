import Link from "next/link";
import css from "./Header.module.css";
import Image from "next/image";

export default function Header() {
  return (
    <header className={css.wrapper}>
      <div className={css.container}>
        <Link href="/" aria-label="Home" className={css.headerLogoWrapper}>
          <Image
            src="/RentalCar.svg"
            alt="Car Rental Logo"
            width={104}
            height={16}
            className={css.logo}
          />
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
      </div>
    </header>
  );
}
