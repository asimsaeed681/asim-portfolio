import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import "./globals.css";
import { person } from "@/lib/content";

const display = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const description =
  "Asim Saeed — Computer Science student building AI-orchestration systems: content pipelines, a C++ compression engine, and a shipped Chrome extension. Leads a 100+ member generative-AI research track at COMSATS University Islamabad.";

export const metadata: Metadata = {
  metadataBase: new URL("https://asimsaeed.me"),
  title: "Asim Saeed — AI-orchestration systems",
  description,
  keywords: [
    "Asim Saeed",
    "Muhammad Asim Saeed",
    "Computer Science",
    "COMSATS University Islamabad",
    "prompt engineering",
    "AI orchestration",
    "generative AI",
    "software engineering intern",
  ],
  authors: [{ name: person.fullName }],
  openGraph: {
    title: "Asim Saeed — AI-orchestration systems",
    description,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Asim Saeed — AI-orchestration systems",
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.fullName,
  alternateName: "Asim Saeed",
  jobTitle: "Computer Science Student",
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "COMSATS University Islamabad",
  },
  email: `mailto:${person.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Islamabad", addressCountry: "PK" },
  sameAs: [person.github, person.linkedin],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} antialiased`}
    >
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
