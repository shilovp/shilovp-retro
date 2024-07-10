"use client";
import { ReactElement, useState } from "react";
import DraggableWindow from "./components/draggableWindow";
import Start from "./components/start";
import About from "./components/windows/about";

export default function Home() {

  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isAboutHidden, setIsAboutHidden] = useState(false);

  const onStartMenuClick = (menu: string) => {
    if (menu === 'about') {
      setIsAboutOpen(true);
      console.log('opening about: ', isAboutOpen);
    }
  }

  return (
    <main className="flex flex-col min-h-screen w-full font-chicago h-screen">
      <Start onMenuClick={onStartMenuClick} />
      <div className="bg-[url('./poolside-fm-pacific-breeze.jpg')] bg-center h-full">
        {isAboutOpen ? (
          <DraggableWindow title="About" onClose={() => setIsAboutOpen(false)} onHide={() => setIsAboutHidden(true)}>
            <About />
          </DraggableWindow>
        ) : (
          ''
        )}
      </div>
    </main>
  );
}
