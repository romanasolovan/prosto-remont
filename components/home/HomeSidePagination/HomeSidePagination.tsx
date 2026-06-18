// "use client";

// import styles from "./Pagination.module.css";

// type SectionItem = {
//   id: string;
//   label: string;
// };

// type Props = {
//   sections: SectionItem[];
//   activeSection: string;
//   navLabel: string;
// };

// export default function HomeSidePagination({
//   sections,
//   activeSection,
//   navLabel,
// }: Props) {
//   const handleScrollToSection = (id: string) => {
//     const element = document.getElementById(id);
//     if (!element) return;

//     element.scrollIntoView({
//       behavior: "smooth",
//       block: "start",
//     });
//   };

//   return (
//     <nav className={styles.sidePagination} aria-label={navLabel}>
//       <ul className={styles.sidePaginationList}>
//         {sections.map((section) => {
//           const isActive = activeSection === section.id;

//           return (
//             <li key={section.id} className={styles.sidePaginationItem}>
//               <button
//                 type="button"
//                 onClick={() => handleScrollToSection(section.id)}
//                 className={`${styles.sidePaginationButton} ${
//                   isActive ? styles.active : ""
//                 }`}
//                 aria-label={section.label}
//                 aria-current={isActive ? "location" : undefined}
//               >
//                 <span className={styles.sidePaginationDot} />
//                 <span className={styles.sidePaginationLabel}>
//                   {section.label}
//                 </span>
//               </button>
//             </li>
//           );
//         })}
//       </ul>
//     </nav>
//   );
// }
