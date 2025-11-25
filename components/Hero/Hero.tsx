import Link from 'next/link';
import css from '../Hero/Hero.module.css';

export default function Hero() {
  return (
    <section className={css.hero}>
      <div className={css.heroWrapper}>
        <div className={css.heroContent}>
          <h1 className={css.title}>Find your perfect rental car</h1>
          <p className={css.subtitle}>Reliable and budget-friendly rentals for any journey</p>
        <Link href="/catalog"><button type="button" className={css.btn}>View Catalog</button></Link>
        </div>
      </div>
    </section>
  );
}
