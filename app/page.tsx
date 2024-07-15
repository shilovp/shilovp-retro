"use client";
import { useState } from "react";
import DraggableWindow from "./components/draggableWindow";
import Start from "./components/start";
import About from "./components/windows/about";
import MovableIcon from "./components/movableIcon";
import MusicPlayer from "./components/windows/musicPlayer";
import DraggablePlayer from "./components/draggablePlayer";
import Credits from "./components/windows/credits";

export default function Home() {

  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isAboutHidden, setIsAboutHidden] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSettingsHidden, setIsSettingsHidden] = useState(false);
  const [isMusicPlayerOpen, setIsMusicPlayerOpen] = useState(false);
  const [isMusicPlayerHidden, setIsMusicPlayerHidden] = useState(false);
  const [isCreditsOpen, setIsCreditsOpen] = useState(false);
  const [isCreditsHidden, setIsCreditsHidden] = useState(false);

  const onStartMenuClick = (menu: string) => {
    if (menu === 'about') {
      setIsAboutOpen(true);
      setIsAboutHidden(false);
    }
    if (menu === 'settings') {
      setIsSettingsOpen(true);
      setIsSettingsHidden(false);
    }
    if (menu === 'musicPlayer') {
      setIsMusicPlayerOpen(true);
      setIsMusicPlayerHidden(false);
    }
    if (menu === 'credits') {
      setIsCreditsOpen(true);
      setIsCreditsHidden(false);
    }
  }

  return (
    <main className="flex flex-col min-h-screen w-full font-chicago h-screen">
      <Start onMenuClick={onStartMenuClick} showAboutIcon={isAboutOpen} isAboutHidden={isAboutHidden}
        showSettingsIcon={isSettingsOpen} isSettingHidden={isSettingsHidden} isMusicPlayerHidden={isMusicPlayerHidden} showMusicPlayerIcon={isMusicPlayerOpen}
        showCreditsIcon={isCreditsOpen} isCreditsHidden={isCreditsHidden} />
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
        {isCreditsOpen && !isCreditsHidden ? (
          <DraggableWindow title="Credits" onClose={() => { setIsCreditsOpen(false); setIsCreditsHidden(false) }} onHide={() => setIsCreditsHidden(true)}>
            <Credits />
          </DraggableWindow>
        ) : (
          ''
        )}
        {isMusicPlayerOpen && !isMusicPlayerHidden ? (
          // <DraggablePlayer onHide={() => { setIsMusicPlayerHidden(true) }} onClose={() => { setIsMusicPlayerOpen(false); }}>
          // </DraggablePlayer>
          <DraggableWindow onHide={() => { setIsMusicPlayerHidden(true) }} onClose={() => { setIsMusicPlayerOpen(false); }} title="Music player">
            <MusicPlayer></MusicPlayer>
          </DraggableWindow>
        ) : (
          ''
        )}
        <MovableIcon
          icon={'./player.png'}
          label="Music"
          initialPosition={{ x: 25, y: 70 }}
          onDoubleClick={() => { setIsMusicPlayerOpen(true); setIsMusicPlayerHidden(false) }}
        />
        <MovableIcon
          icon={'./credits.png'}
          label="Credits"
          initialPosition={{ x: 85, y: 70 }}
          onDoubleClick={() => { setIsCreditsOpen(true); setIsCreditsHidden(false) }}
        />
      </div>
    </main>
  );
}
