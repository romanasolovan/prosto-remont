// "use client";

// import { useEffect, useRef, useState, type ReactNode } from "react";
// import { useTranslations } from "next-intl";
// import { Link } from "@/navigation";
// import styles from "./WhyChooseUs.module.css";

// type PillarKey = "craft" | "precision" | "clarity";

// const PillarIcons: Record<PillarKey, ReactNode> = {
//   craft: (
//     <svg
//       viewBox="0 0 48 48"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.5"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       aria-hidden="true"
//     >
//       <path d="M16 31.5 31.5 16" />
//       <path d="M28.5 13 35 19.5" />
//       <path d="M13 35l6.5-1.5L35 18l-5-5-15.5 15.5L13 35z" />
//     </svg>
//   ),
//   precision: (
//     <svg
//       viewBox="0 0 48 48"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.5"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       aria-hidden="true"
//     >
//       <circle cx="24" cy="24" r="10" />
//       <circle cx="24" cy="24" r="3.5" />
//       <path d="M24 14V9" />
//       <path d="M24 39v-5" />
//       <path d="M34 24h5" />
//       <path d="M9 24h5" />
//     </svg>
//   ),
//   clarity: (
//     <svg
//       viewBox="0 0 48 48"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.5"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       aria-hidden="true"
//     >
//       <rect x="14" y="11" width="20" height="26" rx="2.5" />
//       <path d="M19 18h10" />
//       <path d="M19 24h10" />
//       <path d="M19 30h7" />
//     </svg>
//   ),
// };

// export default function WhyChooseUs() {
//   const t = useTranslations("about.whyChooseUs");
//   const sectionRef = useRef<HTMLElement | null>(null);
//   const [isVisible, setIsVisible] = useState(false);

//   const pillars = [
//     {
//       key: "craft" as const,
//       title: t("pillars.first.title"),
//       description: t("pillars.first.description"),
//     },
//     {
//       key: "precision" as const,
//       title: t("pillars.second.title"),
//       description: t("pillars.second.description"),
//     },
//     {
//       key: "clarity" as const,
//       title: t("pillars.third.title"),
//       description: t("pillars.third.description"),
//     },
//   ];

//   useEffect(() => {
//     const node = sectionRef.current;
//     if (!node) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(false);

//           requestAnimationFrame(() => {
//             requestAnimationFrame(() => {
//               setIsVisible(true);
//             });
//           });
//         } else {
//           setIsVisible(false);
//         }
//       },
//       { threshold: 0.3 },
//     );

//     observer.observe(node);
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className={styles.whySection}
//       aria-labelledby="why-choose-us-eyebrow"
//     >
//       <div className={styles.sectionGlow} aria-hidden="true" />

//       <div className="container">
//         <div className={styles.whyShell}>
//           <div className={styles.whyHero}>
//             <div className={styles.whyHeroCopy}>
//               <span className={styles.sectionLabel} id="why-choose-us-eyebrow">
//                 {t("eyebrow")}
//               </span>

//               <p className={styles.whyDescription}>{t("description")}</p>

//               <div className={styles.breadcrumbMock} aria-hidden="true">
//                 <span>Home</span>
//                 <span className={styles.breadcrumbDivider}>→</span>
//                 <span>About us</span>
//               </div>
//             </div>

//             <Link
//               href="/about"
//               className={styles.planetLink}
//               aria-label={t("button")}
//             >
//               <span className={styles.planetShell}>
//                 <span className={styles.planetCore}>
//                   <span className={styles.planetText}>{t("button")}</span>
//                 </span>
//               </span>
//             </Link>
//           </div>

//           <div className={styles.whyGrid}>
//             {pillars.map((pillar, index) => (
//               <article
//                 className={`${styles.whyCard} ${isVisible ? styles.isVisible : ""}`}
//                 key={pillar.key}
//                 style={
//                   { ["--card-index" as string]: index } as React.CSSProperties
//                 }
//               >
//                 <div className={styles.whyCardIcon} aria-hidden="true">
//                   {PillarIcons[pillar.key]}
//                 </div>

//                 <h3 className={styles.whyCardTitle}>{pillar.title}</h3>

//                 <p className={styles.whyCardDescription}>
//                   {pillar.description}
//                 </p>
//               </article>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
