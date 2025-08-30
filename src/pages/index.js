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
    );
}
