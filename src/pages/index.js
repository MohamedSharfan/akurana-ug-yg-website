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
          <title>Akurana UG & YG - Home | Student Mentorship & Career Guidance Sri Lanka</title>
          <meta name="description" content="Akurana Undergraduates & Young Graduates - Empowering students through mentorship programs, career guidance, O/L and A/L support, and professional networking in Sri Lanka." />
          <meta name="keywords" content="ugyg, akuranaugyg ,Akurana youth organization, student mentorship Sri Lanka, career guidance programs, O/L guidance, A/L guidance, professional network Sri Lanka, undergraduate community, young graduates Akurana" />
          <link rel="canonical" href="https://yourdomain.com/" />
          
          {/* Open Graph */}
          <meta property="og:url" content="https://yourdomain.com/" />
          <meta property="og:title" content="Akurana UG & YG" />
          <meta property="og:description" content="Join our community of undergraduates and young graduates. Access mentorship, career guidance, and networking opportunities." />
          
          {/* Structured Data - Organization */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Akurana Undergraduates & Young Graduates",
              "alternateName": "Akurana UG & YG",
              "url": "https://yourdomain.com",
              "description": "Youth empowerment organization providing mentorship, career guidance, and professional networking opportunities for students in Akurana, Sri Lanka.",
              "areaServed": "Sri Lanka",
              "sameAs": [
                "https://facebook.com/yourpage",
                "https://instagram.com/yourpage"
              ]
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
