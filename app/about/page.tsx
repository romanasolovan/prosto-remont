import styles from "./about.module.css";

export default function About() {
  return (
    <div className={styles.aboutPage}>
      <section className={styles.hero}>
        <div className="container">
          <h1>About Us</h1>
          <p className={styles.subtitle}>
            Building excellence through experience, integrity, and
            craftsmanship.
          </p>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container">
          <div className={styles.content}>
            <h2>Our Story</h2>
            <p>
              Founded with a passion for transforming spaces, our company has
              grown from a small team of dedicated craftsmen to a full-service
              renovation firm trusted by homeowners and businesses alike. Every
              project we undertake reflects our commitment to quality and our
              respect for the spaces we work in.
            </p>

            <h2>Our Values</h2>
            <p>
              We believe in honest communication, transparent pricing, and
              delivering results that exceed expectations. Our team consists of
              licensed professionals who take pride in their work and treat
              every space as if it were their own.
            </p>

            <h2>Why Choose Us</h2>
            <p>
              With years of experience, a portfolio of successful projects, and
              a dedication to staying current with industry trends and
              techniques, we bring both expertise and innovation to every
              renovation. Your satisfaction is our measure of success.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
