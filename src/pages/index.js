import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
    return(
      <>
        <Navbar />
        <Hero />      
      </>
    );
}
