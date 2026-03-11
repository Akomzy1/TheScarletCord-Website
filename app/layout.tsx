import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Scarlet Cord Architects & Builders Ltd | Lagos, Nigeria",
  description:
    "The Scarlet Cord Architects & Builders Ltd — top-rated architectural design and building construction company in Lagos, Nigeria. Specialising in residential, commercial, renovation, and interior design projects.",
  keywords: [
    "architects in Lagos",
    "building construction Lagos Nigeria",
    "architectural design Nigeria",
    "residential construction Lagos",
    "interior design Lagos",
    "renovation Lagos",
    "building contractors Lagos",
    "The Scarlet Cord Architects",
    "architects Ojodu Berger",
    "construction company Nigeria",
  ],
  authors: [{ name: "The Scarlet Cord Architects & Builders Ltd" }],
  creator: "The Scarlet Cord Architects & Builders Ltd",
  publisher: "The Scarlet Cord Architects & Builders Ltd",
  metadataBase: new URL("https://thescarletcord.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "The Scarlet Cord Architects & Builders Ltd | Lagos, Nigeria",
    description:
      "Top-rated architectural design and building construction company in Lagos, Nigeria. Residential, commercial, renovation and interior design services.",
    type: "website",
    url: "https://thescarletcord.com",
    siteName: "The Scarlet Cord Architects & Builders Ltd",
    locale: "en_NG",
    images: [
      {
        url: "/hero-poster.jpg",
        width: 1200,
        height: 630,
        alt: "The Scarlet Cord Architects & Builders Ltd — Lagos, Nigeria",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Scarlet Cord Architects & Builders Ltd | Lagos, Nigeria",
    description:
      "Top-rated architectural design and building construction company in Lagos, Nigeria.",
    images: ["/hero-poster.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Outfit:wght@300;400;500;600;700&family=Oswald:wght@700&family=Raleway:wght@500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "The Scarlet Cord Architects & Builders Ltd",
              "description": "Top-rated architectural design and building construction company in Lagos, Nigeria. Specialising in residential, commercial, renovation, and interior design.",
              "url": "https://thescarletcord.com",
              "telephone": "+2348067343333",
              "email": "thescarletcordarchitects@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Ojodu Berger",
                "addressLocality": "Lagos",
                "addressCountry": "NG"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 6.6367,
                "longitude": 3.3511
              },
              "openingHours": "Mo-Fr 08:00-17:00",
              "sameAs": [],
              "priceRange": "$$",
              "currenciesAccepted": "NGN",
              "paymentAccepted": "Cash, Bank Transfer",
              "areaServed": {
                "@type": "State",
                "name": "Lagos, Nigeria"
              },
              "serviceType": [
                "Architectural Design",
                "Building Construction",
                "Renovation",
                "Interior Design",
                "3D Visualization"
              ],
              "image": "https://thescarletcord.com/hero-poster.jpg",
              "logo": "https://thescarletcord.com/logo.png",
              "foundingDate": "2021"
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
