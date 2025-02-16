import Head from "next/head";
import Image from "next/image";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Showcase from '@/app/components/proyectos/Showcase'

export default function Home() {
  return (
    <div >
      <Head>
        
        <link 
         rel="icon" 
         href="/icon.png" 
         type="image/<generated>"
         sizes="32x32"/>
      </Head>
      <Hero />
    </div>
  );
}
