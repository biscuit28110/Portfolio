"use client";

import HeroBackgroundVideo from "@/components/hero-background-video";
import Navbar from "./navbar";

export default function HomeSection() {
  return (
    <section
      id="hero"
    >
      <HeroBackgroundVideo />
      <Navbar/>
    </section>
  );
}
