import styles from "./contact.module.css";

export default function Contact() {
  return (
    <div className={styles.contactPage}>
      <section className={styles.hero}>
        <div className="container">
          <h1>Contact Us</h1>
          <p className={styles.subtitle}>
            Lets discuss your renovation project and bring your vision to life.
          </p>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container">
          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <h2>Get In Touch</h2>
              <p>
                We are here to answer your questions and provide expert guidance
                for your renovation project.
              </p>

              <div className={styles.contactDetails}>
                <div className={styles.contactItem}>
                  <h4>Email</h4>
                  <a href="mailto:info@renovate.com">info@renovate.com</a>
                </div>

                <div className={styles.contactItem}>
                  <h4>Phone</h4>
                  <a href="tel:+1234567890">+1 (234) 567-890</a>
                </div>

                <div className={styles.contactItem}>
                  <h4>Office Hours</h4>
                  <p>
                    Monday - Friday: 8:00 AM - 6:00 PM
                    <br />
                    Saturday: 9:00 AM - 4:00 PM
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.formPlaceholder}>
              <div className={styles.formBox}>
                <p className={styles.formNote}>
                  Contact form will be implemented in future development phase
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
