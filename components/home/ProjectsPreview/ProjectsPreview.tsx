// "use client";

// import { useState } from "react";
// import { useTranslations } from "next-intl";
// import { Link } from "@/navigation";
// import { projects } from "@/data/projects";
// import ProjectCardCarousel from "@/components/Projects/ProjectCardCarousel/ProjectCardCarousel";
// import styles from "./ProjectsPreview.module.css";

// export default function ProjectsPreview() {
//   const t = useTranslations("home");
//   const tCommon = useTranslations("common");

//   const previewProjects = projects.filter(
//     (project) => project.coverImages.length > 0,
//   );

//   const [activeProjectSlug, setActiveProjectSlug] = useState(
//     previewProjects[0]?.slug,
//   );

//   const activeIndex = previewProjects.findIndex(
//     (p) => p.slug === activeProjectSlug,
//   );

//   const activeProject = previewProjects[activeIndex];

//   if (!activeProject) return null;

//   const pad = (n: number) => String(n).padStart(2, "0");

//   return (
//     <section className={styles.projectsPreview} id="projects">
//       <div className="container">
//         <div className={styles.inner}>

//           <div className={styles.headerRow}>
//             <div className={styles.headerLeft}>
//               <span className={styles.sectionEyebrow}>
//                 {t("labels.projects")}
//               </span>
//               <Link href="/projects" className={styles.allProjectsLink}>
//                 {tCommon("viewPortfolio")}
//                 <span aria-hidden="true">→</span>
//               </Link>
//             </div>

//             <span className={styles.projectCount} aria-hidden="true">
//               {pad(previewProjects.length)}&nbsp;Projects
//             </span>
//           </div>

//           <div
//             className={styles.projectTabs}
//             role="tablist"
//             aria-label="Select project"
//           >
//             {previewProjects.map((project, i) => (
//               <button
//                 key={project.slug}
//                 type="button"
//                 role="tab"
//                 aria-selected={project.slug === activeProjectSlug}
//                 className={`${styles.projectTab} ${
//                   project.slug === activeProjectSlug ? styles.activeTab : ""
//                 }`}
//                 onClick={() => setActiveProjectSlug(project.slug)}
//               >
//                 <span className={styles.tabIndex} aria-hidden="true">
//                   {pad(i + 1)}
//                 </span>
//                 <span className={styles.tabName}>{project.title}</span>
//               </button>
//             ))}
//           </div>

//           <div className={styles.showcase}>
//             {/* Photo-mount frame */}
//             <div className={styles.frameWrap}>
//               <div className={styles.imageFrame}>
//                 <div className={styles.carouselShell}>
//                   <ProjectCardCarousel
//                     images={activeProject.coverImages}
//                     alt={activeProject.title}
//                     mobileImagesPerPage={1}
//                     desktopImagesPerPage={1}
//                     sizes="(max-width: 767px) 100vw, (max-width: 1199px) 90vw, 1120px"
//                   />
//                 </div>

//                 <span className={styles.slideCounter} aria-hidden="true">
//                   {pad(activeIndex + 1)}&nbsp;/&nbsp;
//                   {pad(previewProjects.length)}
//                 </span>
//               </div>
//             </div>

//             <div className={styles.metaColumn} aria-hidden="true">
//               <div className={styles.metaRule} />
//               <div className={styles.metaContent}>
//                 <div className={styles.metaTop}>
//                   <span className={styles.metaEyebrow}>
//                     {t("labels.projects")}
//                   </span>
//                   <p className={styles.metaProjectTitle}>
//                     {activeProject.title}
//                   </p>

//                   <p className={styles.metaTagline}>
//                     {(activeProject as { tagline?: string }).tagline ??
//                       "Premium renovation, refined to the last detail."}
//                   </p>
//                 </div>

//                 <div className={styles.metaBottom}>
//                   <div className={styles.metaDivider} />

//                   <span className={styles.metaIndex}>
//                     {pad(activeIndex + 1)}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className={styles.captionBar}>

//               <div className={styles.captionLeft}>
//                 <span className={styles.projectLabel} aria-hidden="true">
//                   {t("labels.projects")}
//                 </span>
//                 <span className={styles.captionTitle}>
//                   {activeProject.title}
//                 </span>
//               </div>

//               <Link
//                 href={`/projects/${activeProject.slug}`}
//                 className={styles.projectLink}
//               >
//                 View project
//                 <span aria-hidden="true">→</span>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
