import styles from "./HeroStatIcons.module.css";

type HeroStatItem = {
  key: string;
  icon: React.ReactNode;
  label: string;
};

type HeroStatIconsProps = {
  items: readonly HeroStatItem[];
  ariaLabel: string;
};

export default function HeroStatIcons({
  items,
  ariaLabel,
}: HeroStatIconsProps) {
  return (
    <ul className={styles.iconRow} aria-label={ariaLabel}>
      {items.map((item, index) => (
        <li
          key={item.key}
          className={styles.iconItem}
          style={{ animationDelay: `${index * 90}ms` }}
        >
          <div className={styles.statCard}>
            <span className={styles.iconCircle} aria-hidden="true">
              {item.icon}
            </span>

            <span className={styles.label}>{item.label}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
