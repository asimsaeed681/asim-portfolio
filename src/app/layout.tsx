import type { Metadata } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { person } from "@/lib/content";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const description =
  "Asim Saeed — Computer Science student building AI-orchestration systems: content pipelines, a C++ compression engine, and a shipped Chrome extension. Leads a 100+ member generative-AI research track at COMSATS University Islamabad.";

export const metadata: Metadata = {
  metadataBase: new URL("https://asim-portfolio.vercel.app"),
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
      className={`${bricolage.variable} ${hanken.variable} ${jetbrains.variable} antialiased`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
