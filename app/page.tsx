"use client";
import { useState } from "react";
import DraggableWindow from "./draggableWindow";
import Start from "./start";

export default function Home() {

  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const openAboutWindow = () => {
    setIsAboutOpen(true);
  };

  const closeAboutWindow = () => {
    setIsAboutOpen(false);
  };

  const onStartMenuClick = (menu: string) => {
    if (menu === 'about') {
      console.log('opening about');
    }
  }



  return (
    <main className="flex flex-col min-h-screen w-full font-chicago h-screen">
      <Start onMenuClick={onStartMenuClick}/>
      <div className="bg-[url('./poolside-fm-pacific-breeze.jpg')] bg-center h-full">
      <DraggableWindow />
      </div>
    </main>
  );
}
