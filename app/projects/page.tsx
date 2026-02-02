import styles from "./projects.module.css";

export default function Projects() {
  const projects = [
    { title: "Modern Kitchen Remodel", category: "Residential" },
    { title: "Downtown Office Space", category: "Commercial" },
    { title: "Master Bathroom Suite", category: "Residential" },
    { title: "Historic Home Restoration", category: "Residential" },
    { title: "Retail Store Renovation", category: "Commercial" },
    { title: "Basement Conversion", category: "Residential" },
  ];

  return (
    <div className={styles.projectsPage}>
      <section className={styles.hero}>
        <div className="container">
          <h1>Our Projects</h1>
          <p className={styles.subtitle}>
            A showcase of our finest work and transformations.
          </p>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container">
          <div className={styles.projectsGrid}>
            {projects.map((project, index) => (
              <div key={index} className={styles.projectCard}>
                <div className={styles.projectImage}></div>
                <div className={styles.projectInfo}>
                  <span className={styles.projectCategory}>
                    {project.category}
                  </span>
                  <h3>{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
