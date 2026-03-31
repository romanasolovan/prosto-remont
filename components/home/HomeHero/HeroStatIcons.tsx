import styles from "./HeroStatIcons.module.css";

type HeroStatItem = {
  key: string;
  icon: React.ReactNode;
  label: string;
};

type HeroStatIconsProps = {
  items: HeroStatItem[];
};

export default function HeroStatIcons({ items }: HeroStatIconsProps) {
  return (
    <ul className={styles.iconRow} aria-label="Company highlights">
      {items.map((item, index) => (
        <li
          key={item.key}
          className={styles.iconItem}
          style={{ animationDelay: `${index * 90}ms` }}
        >
          <span className={styles.iconCircle} aria-hidden="true">
            {item.icon}
          </span>
          <span className={styles.srOnly}>{item.label}</span>
        </li>
      ))}
    </ul>
  );
}
