import css from "./Loader.module.css";

interface LoaderProps {
  withOverlay?: boolean;
}

export const Loader = ({ withOverlay = false }: LoaderProps) => {
  if (withOverlay) {
    return (
      <div className={css.loaderWithOverlay}>
        <div className={css.loader}></div>
      </div>
    );
  }

  return <div className={css.loader}></div>;
};
