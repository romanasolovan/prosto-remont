import styles from "./DataLoader.module.css";

type DataLoaderProps = {
  label: string;
  compact?: boolean;
};

export default function DataLoader({
  label,
  compact = false,
}: DataLoaderProps) {
  return (
    <div
      className={`${styles.loader} ${compact ? styles.compact : ""}`}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <span className={styles.spinner} aria-hidden="true">
        <span />
        <span />
        <span />
      </span>

      <span className={styles.label}>{label}</span>
    </div>
  );
}