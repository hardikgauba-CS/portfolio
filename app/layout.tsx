import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Hardik Gauba | Software Engineer | hardik-cs.com",
  description:
    "Official portfolio of Hardik Gauba — Software Engineer focused on backend systems and AI. View projects, experience, and skills.",
  keywords: [
    "Hardik Gauba",
    "Hardik Gauba Portfolio",
    "Hardik Gauba Software Engineer",
    "Hardik Gauba SJSU",
    "Hardik Gauba San Jose State University",
    "Hardik Gauba Developer",
    "hardik-cs.com",
    "Software Engineer San Jose",
    "Backend Engineer",
    "AI Engineer",
    "Full-Stack Developer",
    "Backend Developer",
    "React Developer",
    "Next.js Developer",
    "Java Developer",
    "Python Developer",
    "Machine Learning",
    "Computer Science Portfolio",
  ],
  authors: [{ name: "Hardik Gauba", url: "https://hardik-cs.com" }],
  creator: "Hardik Gauba",
  publisher: "Hardik Gauba",
  robots: "index, follow",
  openGraph: {
    title: "Hardik Gauba | Software Engineer",
    description:
      "Official portfolio of Hardik Gauba — Software Engineer focused on backend systems and AI.",
    type: "website",
    url: "https://hardik-cs.com",
    siteName: "Hardik Gauba Portfolio",
    locale: "en_US",
    images: [{ 
      url: "https://hardik-cs.com/profile.jpg",
      width: 1200,
      height: 630,
      alt: "Hardik Gauba - Software Engineer"
    }],
  },
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification
  },
  alternates: {
    canonical: "https://hardik-cs.com",
  },
  metadataBase: new URL("https://hardik-cs.com"),
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Hardik Gauba",
    url: "https://hardik-cs.com",
    image: "https://hardik-cs.com/profile.jpg",
    sameAs: [
      "https://github.com/hardikgauba-CS",
    ],
    jobTitle: "Software Engineer",
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "San Jose State University",
        sameAs: "https://www.sjsu.edu",
      },
    ],
    knowsAbout: [
      "Software Engineering",
      "Artificial Intelligence",
      "Machine Learning",
      "Full-Stack Development",
      "Java",
      "Python",
      "TypeScript",
      "React",
      "Next.js",
      "Backend Systems",
    ],
    email: "mailto:hardikgauba9@gmail.com",
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
