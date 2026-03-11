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
  title: "Atishay Jain | Software Engineer & AI Developer | atie.dev",
  description:
    "Official portfolio of Atishay Jain - Software Engineer specializing in AI, Machine Learning & Full-Stack Development. MS in Computer Science at Santa Clara University (SCU), BS in CS from San Jose State University (SJSU). View projects, experience, and skills.",
  keywords: [
    "Atishay Jain",
    "Atishay Jain Portfolio",
    "Atishay Jain Software Engineer",
    "Atishay Jain SCU",
    "Atishay Jain Santa Clara University",
    "Atishay Jain SJSU",
    "Atishay Jain San Jose State",
    "Atishay Jain Developer",
    "Atishay Jain AI",
    "Atishay Jain Machine Learning",
    "atie.dev",
    "Software Engineer Bay Area",
    "AI Developer San Jose",
    "Full-Stack Developer",
    "Spring Boot Developer",
    "React Developer",
    "Next.js Developer",
    "Java Developer",
    "Python Developer",
    "Machine Learning Engineer",
    "Computer Science Portfolio",
  ],
  authors: [{ name: "Atishay Jain", url: "https://www.atie.dev" }],
  creator: "Atishay Jain",
  publisher: "Atishay Jain",
  robots: "index, follow",
  openGraph: {
    title: "Atishay Jain | Software Engineer & AI Developer",
    description:
      "Official portfolio of Atishay Jain - Software Engineer with expertise in AI, Machine Learning & Full-Stack Development. Currently pursuing MS in CS at Santa Clara University.",
    type: "website",
    url: "https://www.atie.dev",
    siteName: "Atishay Jain Portfolio",
    locale: "en_US",
    images: [{ 
      url: "https://www.atie.dev/profile.jpg",
      width: 1200,
      height: 630,
      alt: "Atishay Jain - Software Engineer"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Atishay Jain | Software Engineer & AI Developer",
    description:
      "Official portfolio of Atishay Jain - Software Engineer specializing in AI, ML & Full-Stack. MS CS @ SCU, BS CS @ SJSU.",
    images: [{ url: "https://www.atie.dev/profile.jpg" }],
    creator: "@AtishayJain19",
    site: "@AtishayJain19",
  },
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification
  },
  alternates: {
    canonical: "https://www.atie.dev",
  },
  metadataBase: new URL("https://www.atie.dev"),
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Atishay Jain",
    url: "https://www.atie.dev",
    image: "https://www.atie.dev/profile.jpg",
    sameAs: [
      "https://github.com/atishay8192261",
      "https://linkedin.com/in/atishayjain19",
      "https://twitter.com/AtishayJain19",
    ],
    jobTitle: "Software Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Santa Clara University",
    },
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "Santa Clara University",
        sameAs: "https://www.scu.edu",
      },
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
      "Spring Boot",
    ],
    email: "mailto:atishayjain@atie.dev",
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
