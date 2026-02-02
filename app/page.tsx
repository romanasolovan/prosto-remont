import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>Transform Your Space</h1>
          <p className={styles.heroSubtitle}>
            Premium renovation services that bring your vision to life with
            precision and care.
          </p>
          <Link href="/contact" className="btn btn-primary">
            Start Your Project
          </Link>
        </div>
      </section>

      {/* About Preview */}
      <section
        className={`${styles.previewSection} section-spacing`}
        id="about"
      >
        <div className="container">
          <h2>About Us</h2>
          <p>
            With decades of experience in residential and commercial renovation,
            we deliver exceptional craftsmanship and attention to detail in
            every project. Our team of skilled professionals is committed to
            transforming spaces while maintaining the highest standards of
            quality.
          </p>
          <Link href="/about" className="btn btn-secondary">
            Learn More About Us
          </Link>
        </div>
      </section>

      {/* Services Preview */}
      <section
        className={`${styles.previewSection} ${styles.alternateBackground} section-spacing`}
        id="services"
      >
        <div className="container">
          <h2>Our Services</h2>
          <p>
            From complete home renovations to specialized commercial projects,
            we offer comprehensive services tailored to your needs. Kitchen
            remodeling, bathroom upgrades, basement finishing, and full property
            transformations—we handle it all with expertise.
          </p>
          <Link href="/services" className="btn btn-secondary">
            Explore Our Services
          </Link>
        </div>
      </section>

      {/* Projects Preview */}
      <section
        className={`${styles.previewSection} section-spacing`}
        id="projects"
      >
        <div className="container">
          <h2>Our Projects</h2>
          <p>
            Discover our portfolio of completed renovations that showcase our
            commitment to excellence. Each project reflects our dedication to
            quality, innovative design, and client satisfaction. View real
            transformations from concept to completion.
          </p>
          <Link href="/projects" className="btn btn-secondary">
            View Our Portfolio
          </Link>
        </div>
      </section>

      {/* Process Preview */}
      <section
        className={`${styles.previewSection} ${styles.alternateBackground} section-spacing`}
        id="process"
      >
        <div className="container">
          <h2>Our Process</h2>
          <p>
            We believe in transparency and collaboration. Our streamlined
            process ensures your project runs smoothly from initial consultation
            through final walkthrough. Clear communication, detailed planning,
            and meticulous execution define our approach.
          </p>
          <Link href="/process" className="btn btn-secondary">
            Understand Our Process
          </Link>
        </div>
      </section>

      {/* Contact Preview */}
      <section
        className={`${styles.previewSection} section-spacing`}
        id="contact"
      >
        <div className="container">
          <h2>Get In Touch</h2>
          <p>
            Ready to start your renovation journey? Contact us today for a
            consultation. We are here to answer your questions, discuss your
            vision, and provide expert guidance every step of the way.
          </p>
          <Link href="/contact" className="btn btn-primary">
            Contact Us Today
          </Link>
        </div>
      </section>
    </div>
  );
}
