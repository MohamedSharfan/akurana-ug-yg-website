import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Activities from "@/components/Activities";
import Exco from "@/components/Exco";
import Sub from "@/components/Sub";

export default function Home() {
    return(
      <>
        <Head>
          <title>Akurana UG & YG - Student Mentorship & Career Guidance Sri Lanka</title>
          <meta name="description" content="Akurana Undergraduates & Young Graduates (UG&YG) - Premier youth organization providing free mentorship, career guidance, O/L & A/L support, and professional networking for students in Akurana, Sri Lanka. Join 500+ students and graduates building successful careers." />
          <meta name="keywords" content="ugyg, akuranaugyg, Akurana youth organization, student mentorship Sri Lanka, career guidance programs, O/L guidance, A/L guidance, professional network Sri Lanka, undergraduate community, young graduates Akurana, free education Sri Lanka, student empowerment" />
          <link rel="canonical" href="https://ugygakurana.lk/" />
          
          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://ugygakurana.lk/" />
          <meta property="og:site_name" content="Akurana UG & YG" />
          <meta property="og:title" content="Akurana UG & YG - Student Mentorship & Career Guidance" />
          <meta property="og:description" content="Join our community of 500+ undergraduates and young graduates. Access free mentorship, career guidance, exam support, and professional networking in Sri Lanka." />
          <meta property="og:image" content="https://ugygakurana.lk/logo.png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:locale" content="en_US" />
          
          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://ugygakurana.lk/" />
          <meta name="twitter:title" content="Akurana UG & YG - Student Mentorship & Career Guidance" />
          <meta name="twitter:description" content="Empowering students through mentorship, career guidance, and professional networking in Sri Lanka." />
          <meta name="twitter:image" content="https://ugygakurana.lk/logo.png" />
          
          {/* Additional SEO */}
          <meta name="theme-color" content="#2D58FF" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          
          {/* Structured Data - Organization */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Akurana Undergraduates & Young Graduates",
              "alternateName": ["Akurana UG & YG", "UG&YG", "UGYG"],
              "url": "https://ugygakurana.lk",
              "logo": "https://ugygakurana.lk/logo.png",
              "description": "Youth empowerment organization providing free mentorship, career guidance, O/L & A/L exam support, and professional networking opportunities for students in Akurana, Sri Lanka.",
              "foundingDate": "2020",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Akurana",
                "addressRegion": "Central Province",
                "addressCountry": "LK"
              },
              "areaServed": {
                "@type": "Country",
                "name": "Sri Lanka"
              },
              "sameAs": [
                "https://facebook.com/yourpage",
                "https://instagram.com/yourpage"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "General Inquiries",
                "areaServed": "LK",
                "availableLanguage": ["English", "Sinhala"]
              }
            })}
          </script>
          
          {/* Structured Data - Educational Organization */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "Akurana UG & YG",
              "url": "https://ugygakurana.lk",
              "description": "Non-profit educational organization offering free mentorship and career development programs",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Educational Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Career Mentorship Programs"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "O/L & A/L Exam Guidance"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Professional Networking"
                    }
                  }
                ]
              }
            })}
          </script>
        </Head>
        <div className="body-back">
          <Navbar />
          <Hero />
          <About />
          <Activities />
          <Exco />
          <Sub />
          <Contact />
          <Footer /> 
        </div>
      </>
    );
}
