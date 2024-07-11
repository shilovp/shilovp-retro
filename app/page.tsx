"use client";
import { useState } from "react";
import DraggableWindow from "./components/draggableWindow";
import Start from "./components/start";
import About from "./components/windows/about";
import QuickPanel from "./components/quickPanel";

export default function Home() {

  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isAboutHidden, setIsAboutHidden] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSettingsHidden, setIsSettingsHidden] = useState(false);

  const onStartMenuClick = (menu: string) => {
    if (menu === 'about') {
      setIsAboutOpen(true);
      setIsAboutHidden(false);
      console.log('opening about: ', isAboutOpen);
    }
    if (menu === 'settings') {
      setIsSettingsOpen(true);
      setIsSettingsHidden(false);
      console.log('opening settings');
    }
  }

  return (
    <main className="flex flex-col min-h-screen w-full font-chicago h-screen">
      <Start onMenuClick={onStartMenuClick} showAboutIcon={isAboutOpen} isAboutHidden={isAboutHidden}
        showSettingsIcon={isSettingsOpen} isSettingHidden={isSettingsHidden} />
      <div className="bg-[url('./poolside-fm-pacific-breeze.jpg')] bg-center h-full">
        {isAboutOpen && !isAboutHidden ? (
          <DraggableWindow title="About" onClose={() => { setIsAboutOpen(false); setIsAboutHidden(false) }} onHide={() => setIsAboutHidden(true)}>
            <About />
          </DraggableWindow>
        ) : (
          ''
        )}
        {isSettingsOpen && !isSettingsHidden ? (
          <DraggableWindow title="Settings" onClose={() => { setIsSettingsOpen(false); setIsSettingsHidden(false) }} onHide={() => setIsSettingsHidden(true)}>
            <div>SETTINGS</div>
          </DraggableWindow>
        ) : (
          ''
        )}
      </div>
    </main>
  );
}
