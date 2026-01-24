import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import '../styles/globals.css'; 
import '../styles/style.css'; 

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Akurana UG & YG - Empowering Youth Through Education & Mentorship</title>
        <meta name="description" content="Akurana Undergraduates & Young Graduates - Empowering students with career guidance, mentorship programs, and professional networking opportunities in Sri Lanka." />
        <meta name="keywords" content="Akurana youth, undergraduate programs, career guidance Sri Lanka, student mentorship, professional network, A/L guidance, O/L guidance, university students, young graduates, Akurana education" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Akurana UG & YG - Empowering Youth" />
        <meta property="og:description" content="Join our community of undergraduates and young graduates. Get mentorship, career guidance, and networking opportunities." />
        <meta property="og:site_name" content="Akurana UG & YG" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Akurana UG & YG - Empowering Youth" />
        <meta name="twitter:description" content="Join our community of undergraduates and young graduates. Get mentorship, career guidance, and networking opportunities." />
      </Head>
      <Component {...pageProps} />
    </>
  );
}



export default MyApp