// import { useTranslations } from "next-intl";
// import { Link } from "@/navigation";
// import styles from "./ContactCTA.module.css";

// export default function ContactCTA() {
//   const t = useTranslations("contactCta");
//   const tCommon = useTranslations("common");

//   return (
//     <section className={styles.ctaSection}>
//       <div className="container">
//         <div className={styles.ctaCard}>
//           <div className={styles.ctaGrid} aria-hidden="true" />
//           <div className={styles.ctaLine} aria-hidden="true" />

//           <div className={styles.ctaContent}>
//             <span className={styles.ctaEyebrow}>{t("eyebrow")}</span>

//             <h2 className={styles.ctaTitle}>{t("title")}</h2>

//             <p className={styles.ctaDescription}>{t("description")}</p>

//             <Link href="/process" className={styles.ctaButton}>
//               {tCommon("requestQuote")}
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
