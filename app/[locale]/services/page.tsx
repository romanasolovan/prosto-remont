"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import styles from "./services.module.css";
import ServiceModal, {
  type ServiceDetail,
} from "@/components/Services/ServiceModal";
import CustomCursor from "@/components/CustomCursor/CustomCursor";

type StaticDetail = Omit<ServiceDetail, "index" | "title">;

const SERVICE_DETAILS: StaticDetail[] = [
  {
    eyebrow: "Interior Renovation",
    desc: "We treat the kitchen as the structural and social core of the home. Every project begins with a full measured survey before a single fixture is moved. Plumbing, electrical, cabinetry, countertop fabrication, and all finish work are coordinated under one contract — no subcontractor confusion, no timeline gaps.",
    specs: [
      { label: "Typical Duration", value: "4–8 Weeks" },
      { label: "Trades Managed", value: "5–7" },
      { label: "Permit Required", value: "Usually" },
      { label: "Starting Budget", value: "$28K+" },
      { label: "Warranty", value: "2 Years" },
      { label: "Consultation", value: "Free" },
    ],
    steps: [
      {
        title: "Site Survey & Measure",
        body: "We document the existing kitchen in full — plumbing stub-outs, electrical panel load, structural walls, ceiling height — before drawing a single layout option.",
      },
      {
        title: "Design & Material Selection",
        body: "Layout options are presented on drafted plans. You select cabinetry, countertop material, tile, hardware, and appliances from our curated supplier network.",
      },
      {
        title: "Demolition & Rough-In",
        body: "Existing finishes are removed carefully. Plumbing, electrical, and HVAC rough-in work is completed and inspected before any wall closure occurs.",
      },
      {
        title: "Installation & Finish",
        body: "Cabinetry, countertops, backsplash, flooring, and fixtures are installed in sequence. A final inspection and punch-list walkthrough closes the project.",
      },
    ],
  },
  {
    eyebrow: "Wet Area Renovation",
    desc: "Bathrooms are technically demanding — waterproofing failures don't surface for years. Our process prioritises the substrate before the surface: cement board, membrane, and slope are verified before any tile is set. We handle all trades from demo to final fixture trim.",
    specs: [
      { label: "Typical Duration", value: "2–4 Weeks" },
      { label: "Trades Managed", value: "3–5" },
      { label: "Permit Required", value: "Often" },
      { label: "Starting Budget", value: "$12K+" },
      { label: "Waterproofing", value: "Certified" },
      { label: "Consultation", value: "Free" },
    ],
    steps: [
      {
        title: "Waterproofing Assessment",
        body: "Existing substrate condition is evaluated. All wet areas receive membrane waterproofing to TCNA standards before any tiling begins.",
      },
      {
        title: "Plumbing Rough-In",
        body: "Supply lines, drain locations, and vent stack modifications are completed with permit where required.",
      },
      {
        title: "Tile & Fixture Install",
        body: "Tile is set on a fully prepared substrate. Fixtures, vanity, and glass enclosure are installed after tile cure time.",
      },
      {
        title: "Final Trim & Seal",
        body: "Grout, caulk joints, and fixture trim complete the installation. All drains are flow-tested before handover.",
      },
    ],
  },
  {
    eyebrow: "Below-Grade Development",
    desc: "An unfinished basement represents the lowest-cost livable square footage in your home. We transform raw concrete into conditioned space — handling moisture control, structural framing, insulation, egress window installation, and all finish trades to code.",
    specs: [
      { label: "Typical Duration", value: "6–10 Weeks" },
      { label: "Moisture Control", value: "Required" },
      { label: "Permit Required", value: "Yes" },
      { label: "Starting Budget", value: "$22K+" },
      { label: "Egress Windows", value: "Included" },
      { label: "Consultation", value: "Free" },
    ],
    steps: [
      {
        title: "Moisture & Structural Review",
        body: "Foundation walls are assessed for water intrusion. Any active moisture issues are resolved before framing begins.",
      },
      {
        title: "Framing & Insulation",
        body: "Stud walls are framed to code with appropriate thermal and vapour barrier insulation for below-grade conditions.",
      },
      {
        title: "Mechanical Rough-In",
        body: "Electrical, plumbing (if applicable), and HVAC distribution are roughed in and inspected.",
      },
      {
        title: "Drywall, Finish & Flooring",
        body: "Moisture-resistant drywall, primer, paint, and flooring complete the space. Final inspections close the permit.",
      },
    ],
  },
  {
    eyebrow: "Whole-Home Project",
    desc: "Whole-home renovations require a general contractor who can hold a complex schedule together. We self-perform or directly manage every trade, maintain a live project schedule, and communicate daily. The result is a renovation that finishes on the date we committed to.",
    specs: [
      { label: "Typical Duration", value: "12–24 Wks" },
      { label: "Trades Managed", value: "8–12" },
      { label: "Permit Required", value: "Yes" },
      { label: "Starting Budget", value: "$90K+" },
      { label: "Project Manager", value: "Dedicated" },
      { label: "Consultation", value: "Free" },
    ],
    steps: [
      {
        title: "Pre-Construction Planning",
        body: "Full scope is documented with a detailed line-item budget and master schedule. Permit drawings are submitted before demolition starts.",
      },
      {
        title: "Demolition & Structural",
        body: "Selective or full demolition is performed. Structural modifications — beam installation, wall removal, foundation work — are completed first.",
      },
      {
        title: "All Mechanical Rough-In",
        body: "Electrical, plumbing, HVAC, and low-voltage systems are roughed in across all floors simultaneously to compress the schedule.",
      },
      {
        title: "Finishes & Closeout",
        body: "Drywall, millwork, flooring, tile, painting, and fixture installation follow in sequence. Final municipal inspection and walkthrough close the project.",
      },
    ],
  },
  {
    eyebrow: "Commercial Construction",
    desc: "Commercial build-outs operate under different constraints than residential — accessibility code, fire suppression, occupancy classifications, and landlord base-building coordination all affect scope. We have experience navigating all of it while keeping your opening date intact.",
    specs: [
      { label: "Typical Duration", value: "8–16 Weeks" },
      { label: "Code Compliance", value: "Full IBC" },
      { label: "Permit Required", value: "Yes" },
      { label: "Starting Budget", value: "$45K+" },
      { label: "Sectors", value: "Office/Retail" },
      { label: "Consultation", value: "Free" },
    ],
    steps: [
      {
        title: "Landlord & Code Review",
        body: "Base building drawings are reviewed. The landlord work letter and tenant improvement allowance are scoped before design begins.",
      },
      {
        title: "Permit Drawings",
        body: "Architectural, mechanical, and electrical permit sets are prepared and submitted. AHJ comments are resolved before work starts.",
      },
      {
        title: "Construction",
        body: "Build-out proceeds on a commercial schedule — typically 10–14 weeks — with daily progress reporting to the tenant.",
      },
      {
        title: "Commissioning & Occupancy",
        body: "Life safety systems are commissioned, the occupancy permit is obtained, and the space is turned over clean and ready for fit-out.",
      },
    ],
  },
  {
    eyebrow: "Finish Carpentry",
    desc: "Carpentry is where the precision of the design is either confirmed or lost. We fabricate custom millwork in our shop and install it on site — built-in cabinetry, library shelving, wainscoting, coffered ceilings, window seats, and architectural trim. Everything is drawn to tolerance before a board is cut.",
    specs: [
      { label: "Fabrication Lead", value: "3–5 Weeks" },
      { label: "Fabrication", value: "In-House" },
      { label: "Materials", value: "Hardwood/MDF" },
      { label: "Finish Options", value: "Paint/Stain" },
      { label: "Tolerances", value: '±1/32"' },
      { label: "Consultation", value: "Free" },
    ],
    steps: [
      {
        title: "Site Measurement & Drawing",
        body: "Each installation is measured in the field. Shop drawings are produced at 1:1 scale and reviewed with you before fabrication begins.",
      },
      {
        title: "Shop Fabrication",
        body: "Components are built in our millwork shop — panels, frames, doors, and drawers are fabricated, sanded, and pre-finished before delivery.",
      },
      {
        title: "Site Installation",
        body: "Millwork is installed plumb, level, and scribed to existing conditions. Scribe mouldings and filler pieces are cut on site.",
      },
      {
        title: "Final Finish & Touch-Up",
        body: "Paint or stain is applied in final coats on site. Hardware is installed and adjusted. The site is left clean.",
      },
    ],
  },
];

export default function ServicesClient() {
  const t = useTranslations("services");
  const [activeService, setActiveService] = useState<ServiceDetail | null>(
    null,
  );

  const services = [
    {
      title: t("list.kitchen.title"),
      description: t("list.kitchen.description"),
      variant: styles.heroPanel,
      abbr: "K",
    },
    {
      title: t("list.bathroom.title"),
      description: t("list.bathroom.description"),
      variant: styles.darkPanel,
      abbr: "B",
    },
    {
      title: t("list.basement.title"),
      description: t("list.basement.description"),
      variant: styles.compactPanel,
      abbr: "BS",
    },
    {
      title: t("list.fullHome.title"),
      description: t("list.fullHome.description"),
      variant: styles.compactPanel,
      abbr: "FH",
    },
    {
      title: t("list.commercial.title"),
      description: t("list.commercial.description"),
      variant: styles.darkPanel,
      abbr: "C",
    },
    {
      title: t("list.carpentry.title"),
      description: t("list.carpentry.description"),
      variant: styles.widePanel,
      abbr: "CP",
    },
  ] as const;

  const openModal = (index: number) => {
    const detail = SERVICE_DETAILS[index];
    const service = services[index];

    if (!detail || !service) return;

    setActiveService({
      index,
      title: service.title,
      ...detail,
    });
  };

  const closeModal = () => setActiveService(null);

  return (
    <>
      <CustomCursor />

      <div className={styles.servicesPage}>
        <section className={styles.hero}>
          <div className={styles.heroGrid} aria-hidden="true" />
          <div className={styles.heroDiagonals} aria-hidden="true">
            <svg
              viewBox="0 0 900 320"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              <line
                x1="60"
                y1="260"
                x2="300"
                y2="20"
                stroke="rgba(14,13,11,0.04)"
                strokeWidth="1"
              />
              <line
                x1="100"
                y1="320"
                x2="380"
                y2="0"
                stroke="rgba(14,13,11,0.025)"
                strokeWidth="0.5"
              />
              <line
                x1="600"
                y1="0"
                x2="840"
                y2="260"
                stroke="rgba(14,13,11,0.04)"
                strokeWidth="1"
              />
              <line
                x1="650"
                y1="0"
                x2="900"
                y2="300"
                stroke="rgba(14,13,11,0.025)"
                strokeWidth="0.5"
              />
            </svg>
          </div>

          <span
            className={`${styles.cornerMark} ${styles.tl}`}
            aria-hidden="true"
          />
          <span
            className={`${styles.cornerMark} ${styles.tr}`}
            aria-hidden="true"
          />
          <span
            className={`${styles.cornerMark} ${styles.bl}`}
            aria-hidden="true"
          />
          <span
            className={`${styles.cornerMark} ${styles.br}`}
            aria-hidden="true"
          />

          <div className={styles.tickRuler} aria-hidden="true">
            {Array.from({ length: 40 }).map((_, index) => (
              <span key={index} />
            ))}
          </div>

          <div className="container">
            <div className={styles.heroInner}>
              <span className={styles.heroEyebrow}>{t("hero.eyebrow")}</span>
              <h1 className={styles.heroTitle}>
                {t("hero.title")}
                <em className={styles.heroTitleItalic}>
                  {t("hero.titleItalic")}
                </em>
              </h1>
              <p className={styles.subtitle}>{t("hero.subtitle")}</p>
            </div>
          </div>
        </section>

        <section className={styles.servicesSection}>
          <span className={styles.diagRule1} aria-hidden="true" />
          <span className={styles.diagRule2} aria-hidden="true" />

          <div className="container">
            <div className={styles.servicesIntro}>
              <div className={styles.servicesIntroText}>
                <span className={styles.servicesEyebrow}>
                  architectural scope
                </span>
                <h2 className={styles.servicesTitle}>{t("section.title")}</h2>
              </div>

              <span className={styles.servicesCount}>
                {String(services.length).padStart(2, "0")} specialisations
              </span>
            </div>

            <div className={styles.sep} aria-hidden="true">
              <span className={styles.sepLine} />
              <span className={styles.sepLabel}>service matrix</span>
              <span className={`${styles.sepLine} ${styles.sepLineReverse}`} />
            </div>

            <div className={styles.servicesBoard}>
              {services.map((service, index) => (
                <article
                  key={service.title}
                  className={`${styles.servicePanel} ${service.variant}`}
                  data-cursor-card="true"
                  onClick={() => openModal(index)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      openModal(index);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`View details for ${service.title}`}
                >
                  <div className={styles.panelInner}>
                    <span className={styles.panelAccent} aria-hidden="true" />

                    <div className={styles.panelTop}>
                      <span className={styles.serviceIndex}>
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className={styles.calloutCircle} aria-hidden="true">
                        {service.abbr}
                      </span>
                    </div>

                    <span className={styles.panelRule} aria-hidden="true" />

                    <div className={styles.panelBody}>
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                    </div>

                    <div className={styles.panelMeta}>
                      <span className={styles.metaDot} aria-hidden="true" />
                      <span className={styles.metaLine} aria-hidden="true" />
                      <span className={styles.metaHint}>view detail</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>

      <ServiceModal service={activeService} onClose={closeModal} />
    </>
  );
}
