import Calendar from "@/components/Calendar";
import Hero from "@/components/Hero";
import Main from "@/components/Main";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <Main>
      <Hero />
      <Calendar demo />
    </Main>
  );
}
