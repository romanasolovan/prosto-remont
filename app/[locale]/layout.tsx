import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { Inter, Playfair_Display } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { locales, type Locale } from "@/i18n/request";
import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "600", "700"],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.home" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      languages: {
        en: "/en",
        pl: "/pl",
        uk: "/uk",
        ru: "/ru",
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <Header />
            <main style={{ flex: "1" }}>{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
