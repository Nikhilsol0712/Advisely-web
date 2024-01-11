"use client"; //place it on top only

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import HeroSection from "./components/HeroSection/HeroSection";
import ExpetsCard from "./components/ExpertsCard/ExpertsCard";
import HomeTitle from "./components/HomeTitle/HomeTitle";
import Footer from "./components/Footer/Footer";
import HomeTextTitle from "./components/HomeTextTitle/HomeTextTitle";
import HomeFlow from "./components/HomeFlow/HomeFlow";

export default function Home() {
  const route = useRouter();
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    const cloneItems = () => {
      const items = container.getElementsByClassName("expert-card");
      if (items.length >= 2) {
        const clone1 = items[0].cloneNode(true);
        const clone2 = items[1].cloneNode(true);
        container.appendChild(clone1);
        container.appendChild(clone2);
      }
    };

    const animateScroll = () => {
      container.style.scrollBehavior = "smooth";
      container.scrollLeft += container.offsetWidth;
    };

    const handleScrollEnd = () => {
      const items = container.getElementsByClassName("expert-card");
      const firstItem = items[0];
      container.scrollLeft -= firstItem.offsetWidth;
    };

    const init = () => {
      setInterval(() => {
        cloneItems();
        animateScroll();
      }, 2000); // Adjust the interval as needed
      container.addEventListener("scroll", () => {
        if (container.scrollLeft % container.offsetWidth === 0) {
          handleScrollEnd();
        }
      });
    };

    init();
  }, []);
  return (
    <main className="flex bg-  w-full text-black min-h-screen flex-col items-center justify-between ">
      <div className="w-full relative">
        <HeroSection></HeroSection>
      </div>
      <div className="w-full overflow-x-hidden">
        <h6 className="mt-10 font-semibold text-lg text-center">
          Talk to students and alumni from 500+ universities.
        </h6>

        <div ref={containerRef} className="flex flex-row ">
          <ExpetsCard />
          <ExpetsCard />
          <ExpetsCard />
          <ExpetsCard />
          <ExpetsCard />
          {/* Add more cards as needed */}
        </div>
        <div className="mt-10">
          <HomeTitle></HomeTitle>
        </div>
        <div className="mt-10">
          <HomeTextTitle></HomeTextTitle>
        </div>
        <div>
          <HomeFlow></HomeFlow>
        </div>
        <div>
          <Footer></Footer>
        </div>
      </div>
    </main>
  );
}
