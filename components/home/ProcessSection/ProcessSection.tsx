import { useTranslations } from "next-intl";
import styles from "./ProcessSection.module.css";

type ProcessStep = {
  key: "consultation" | "estimate" | "start" | "realization" | "handover";
  icon: "conversation" | "measure" | "contract" | "build" | "keys";
};

const processSteps: ProcessStep[] = [
  { key: "consultation", icon: "conversation" },
  { key: "estimate", icon: "measure" },
  { key: "start", icon: "contract" },
  { key: "realization", icon: "build" },
  { key: "handover", icon: "keys" },
];

function StepIcon({ icon }: { icon: ProcessStep["icon"] }) {
  const icons = {
    conversation: (
      <>
        <path d="M4.5 6.5h10.8v7.2H8.4L4.5 17V6.5Z" />
        <path d="M9.2 9.4h5.1" />
        <path d="M9.2 11.4h3.3" />
        <path d="M14.8 10h4.7v6.5h-2.7L14 19v-5.3" />
      </>
    ),
    measure: (
      <>
        <path d="M4 17.5 17.5 4l2.5 2.5L6.5 20 4 17.5Z" />
        <path d="M14.7 6.8 17.2 9.3" />
        <path d="M11.9 9.6 13.8 11.5" />
        <path d="M9 12.5 11.5 15" />
        <path d="M6.2 15.3 8.1 17.2" />
      </>
    ),
    contract: (
      <>
        <path d="M7 3.8h8.2L19 7.6V20H7V3.8Z" />
        <path d="M15 3.8v4h4" />
        <path d="M10 10.5h5.4" />
        <path d="M10 13.4h4.2" />
        <path d="M10 16.3h5.8" />
        <path d="M4.8 7.2V22h10.8" />
      </>
    ),
    build: (
      <>
        <path d="M14.6 4.2a4.6 4.6 0 0 0 5.2 5.2l-3.2 3.2-5.2-5.2 3.2-3.2Z" />
        <path d="M4.2 19.8 12 12" />
        <path d="M6.8 17.2 4 20" />
        <path d="M8.5 4.5 11 7" />
        <path d="M5.8 7.2 8.5 4.5" />
      </>
    ),
    keys: (
      <>
        <path d="M8.5 14.2a4.2 4.2 0 1 1 3.1-7" />
        <path d="M11.4 11.4 20 20" />
        <path d="M16.2 16.2 18.4 14" />
        <path d="M18.2 18.2 20.2 16.2" />
        <path d="M7.4 9.4h.1" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {icons[icon]}
    </svg>
  );
}

export default function ProcessSection() {
  const t = useTranslations("home.process");

  return (
    <section className={styles.processSection} aria-labelledby="process-title">
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.sectionTop}>
            <span className={styles.label}>{t("eyebrow")}</span>
          </div>

          <h2 className={styles.title} id="process-title">
            {t("title")}
          </h2>

          <ol className={styles.steps}>
            {processSteps.map((step, index) => (
              <li
                key={step.key}
                className={styles.step}
                style={
                  {
                    "--step-index": index,
                    "--ghost-number": `"0${index + 1}"`,
                  } as React.CSSProperties
                }
              >
                <div className={styles.stepTop}>
                  <span className={styles.icon}>
                    <StepIcon icon={step.icon} />
                  </span>
                </div>

                <h3 className={styles.stepTitle}>
                  {t(`steps.${step.key}.title`)}
                </h3>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
