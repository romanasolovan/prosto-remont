// "use client";

// import { useEffect, useMemo, useState } from "react";
// import styles from "./HomeMobileSectionNavigator.module.css";

// type SectionItem = {
//   id: string;
//   label: string;
// };

// type Props = {
//   sections: SectionItem[];
//   activeSection: string;
//   triggerLabel: string;
//   title: string;
//   closeLabel: string;
// };

// export default function HomeMobileSectionNavigator({
//   sections,
//   activeSection,
//   triggerLabel,
//   title,
//   closeLabel,
// }: Props) {
//   const [isOpen, setIsOpen] = useState(false);

//   const activeSectionLabel = useMemo(() => {
//     return (
//       sections.find((section) => section.id === activeSection)?.label ?? ""
//     );
//   }, [sections, activeSection]);

//   useEffect(() => {
//     if (!isOpen) return;

//     const originalBodyOverflow = document.body.style.overflow;
//     const originalHtmlOverflow = document.documentElement.style.overflow;

//     document.body.style.overflow = "hidden";
//     document.documentElement.style.overflow = "hidden";

//     return () => {
//       document.body.style.overflow = originalBodyOverflow;
//       document.documentElement.style.overflow = originalHtmlOverflow;
//     };
//   }, [isOpen]);

//   const handleOpen = () => setIsOpen(true);
//   const handleClose = () => setIsOpen(false);

//   const handleScrollToSection = (id: string) => {
//     const element = document.getElementById(id);

//     if (!element) return;

//     handleClose();

//     requestAnimationFrame(() => {
//       element.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//     });
//   };

//   return (
//     <>
//       <button
//         type="button"
//         className={styles.navigator}
//         onClick={handleOpen}
//         aria-haspopup="dialog"
//         aria-expanded={isOpen}
//         aria-controls="home-mobile-sections-dialog"
//       >
//         <span className={styles.iconWrap} aria-hidden="true">
//           <span className={styles.icon}>
//             <svg
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="1.8"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <circle cx="6" cy="6" r="1.5" />
//               <circle cx="18" cy="6" r="1.5" />
//               <circle cx="6" cy="18" r="1.5" />
//               <circle cx="18" cy="18" r="1.5" />
//               <path d="M8.5 6h8" />
//               <path d="M6 8.5v8" />
//               <path d="M18 8.5v8" />
//               <path d="M8.5 18h8" />
//             </svg>
//           </span>
//         </span>

//         <span className={styles.textBlock}>
//           <span className={styles.triggerTitle}>{triggerLabel}</span>
//           <span className={styles.currentSection}>{activeSectionLabel}</span>
//         </span>
//       </button>

//       {isOpen && (
//         <>
//           <button
//             type="button"
//             className={styles.backdrop}
//             aria-label={closeLabel}
//             onClick={handleClose}
//           />

//           <div
//             id="home-mobile-sections-dialog"
//             className={styles.sheet}
//             role="dialog"
//             aria-modal="true"
//             aria-label={title}
//           >
//             <div className={styles.sheetHandle} aria-hidden="true" />

//             <div className={styles.sheetHeader}>
//               <p className={styles.sheetTitle}>{title}</p>

//               <button
//                 type="button"
//                 className={styles.closeButton}
//                 onClick={handleClose}
//                 aria-label={closeLabel}
//               >
//                 <span aria-hidden="true">×</span>
//               </button>
//             </div>

//             <ul className={styles.sectionList}>
//               {sections.map((section) => {
//                 const isActive = activeSection === section.id;

//                 return (
//                   <li key={section.id} className={styles.sectionItem}>
//                     <button
//                       type="button"
//                       onClick={() => handleScrollToSection(section.id)}
//                       className={`${styles.sectionButton} ${
//                         isActive ? styles.active : ""
//                       }`}
//                       aria-current={isActive ? "location" : undefined}
//                     >
//                       <span className={styles.sectionDot} aria-hidden="true" />
//                       <span className={styles.sectionLabel}>
//                         {section.label}
//                       </span>
//                     </button>
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>
//         </>
//       )}
//     </>
//   );
// }
