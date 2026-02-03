import styles from "./services.module.css";

export default function Services() {
  const services = [
    {
      title: "Kitchen Renovation",
      description:
        "Complete kitchen transformations including cabinetry, countertops, appliances, and layout optimization.",
    },
    {
      title: "Bathroom Remodeling",
      description:
        "Luxurious bathroom upgrades with modern fixtures, tile work, and spa-inspired design.",
    },
    {
      title: "Basement Finishing",
      description:
        "Convert unused basement space into functional living areas, home offices, or entertainment zones.",
    },
    {
      title: "Full Home Renovation",
      description:
        "Comprehensive whole-home transformations that reimagine your entire living space.",
    },
    {
      title: "Commercial Projects",
      description:
        "Professional renovation services for offices, retail spaces, and commercial properties.",
    },
    {
      title: "Custom Carpentry",
      description:
        "Bespoke woodwork, built-ins, and custom solutions tailored to your specific needs.",
    },
  ];

  return (
    <div className={styles.servicesPage}>
      <section className={styles.hero}>
        <div className="container">
          <h1>Our Services</h1>
          <p className={styles.subtitle}>
            Comprehensive renovation solutions for every space and vision.
          </p>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container">
          <div className={styles.servicesGrid}>
            {services.map((service, index) => (
              <div key={index} className={styles.serviceCard}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
