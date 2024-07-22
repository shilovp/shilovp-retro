"use client";
import { useEffect, useState } from "react";
import DraggableWindow from "./components/draggableWindow";
import Start from "./components/start";
import About from "./components/windows/about";
import MovableIcon from "./components/movableIcon";
import MusicPlayer from "./components/windows/musicPlayer";
// import DraggablePlayer from "./components/draggablePlayer";
import Credits from "./components/windows/credits";
import MusicFolder from "./components/windows/musicFolder";
import Game from "./components/windows/game";
import Browser from "./components/browser";

export default function Home() {

  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isAboutHidden, setIsAboutHidden] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSettingsHidden, setIsSettingsHidden] = useState(false);
  const [isMusicPlayerOpen, setIsMusicPlayerOpen] = useState(false);
  const [isMusicPlayerHidden, setIsMusicPlayerHidden] = useState(false);
  const [isCreditsOpen, setIsCreditsOpen] = useState(false);
  const [isCreditsHidden, setIsCreditsHidden] = useState(false);
  const [isMusicFolderOpen, setIsMusicFolderOpen] = useState(false);
  const [isMusicFolderHidden, setIsMusicFolderHidden] = useState(false);
  const [isGameOpen, setIsGameOpen] = useState(false);
  const [isGameHidden, setIsGameHidden] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isBrowserHidden, setIsBrowserHidden] = useState(false);
  const [isBrowserOpen, setIsBrowserOpen] = useState(false);

  useEffect(() => {
    setCurrentTrack(currentTrack);
  }, [currentTrack]);

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
    if (menu === 'musicFolder') {
      setIsMusicFolderOpen(true);
      setIsMusicFolderHidden(false);
    }
    if (menu === 'game') {
      setIsGameOpen(true);
      setIsGameHidden(false);
    }
    if (menu === 'browser') {
      setIsBrowserOpen(true);
      setIsBrowserHidden(false);
    }
  }

  const openResumeInBrowser = () => {
    // smth
  }

  return (
    <main className="flex flex-col min-h-screen w-full font-chicago h-screen">
      <Start onMenuClick={onStartMenuClick} showAboutIcon={isAboutOpen} isAboutHidden={isAboutHidden}
        showSettingsIcon={isSettingsOpen} isSettingHidden={isSettingsHidden} isMusicPlayerHidden={isMusicPlayerHidden} showMusicPlayerIcon={isMusicPlayerOpen}
        showCreditsIcon={isCreditsOpen} isCreditsHidden={isCreditsHidden}
        showMusicFolderIcon={isMusicFolderOpen} isMusicFolderHidden={isMusicFolderHidden}
        showGameIcon={isGameOpen} isGameHidden={isGameHidden} isBrowserHidden={isBrowserHidden} showBrowserIcon={isBrowserOpen  } />
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
        {isMusicFolderOpen && !isMusicFolderHidden ? (
          <DraggableWindow title="Desktop/music" onClose={() => { setIsMusicFolderOpen(false); setIsMusicFolderHidden(false) }} onHide={() => setIsMusicFolderHidden(true)}>
            <MusicFolder onDoubleClick={(trackNumber) => {
              setCurrentTrack(trackNumber);
              setIsMusicPlayerOpen(true);
            }} />
          </DraggableWindow>
        ) : (
          ''
        )}
        {isMusicPlayerOpen && !isMusicPlayerHidden ? (
          // <DraggablePlayer onHide={() => { setIsMusicPlayerHidden(true) }} onClose={() => { setIsMusicPlayerOpen(false); }}>
          // </DraggablePlayer>
          <DraggableWindow onHide={() => { setIsMusicPlayerHidden(true) }} onClose={() => { setIsMusicPlayerOpen(false); }} title="Player">
            <MusicPlayer trackNumber={currentTrack} />
          </DraggableWindow>
        ) : (
          ''
        )}
        {isGameOpen && !isGameHidden ? (
          <DraggableWindow onHide={() => { setIsGameHidden(true) }} onClose={() => { setIsGameOpen(false); }} title="Game">
            <Game />
          </DraggableWindow>
        ) : (
          ''
        )}
        {isBrowserOpen && !isBrowserHidden ? (
          <Browser onHide={() => { setIsBrowserHidden(true) }} onClose={() => { setIsBrowserOpen(false); }} title="Browser" />
        ) : (
          ''
        )}
        <MovableIcon
          icon={'./player.png'}
          label="Player"
          initialPosition={{ x: 25, y: 80 }}
          onDoubleClick={async () => { await setCurrentTrack(0); setIsMusicPlayerOpen(true); setIsMusicPlayerHidden(false) }}
        />
        <MovableIcon
          icon={'./game.png'}
          label="game"
          initialPosition={{ x: 95, y: 80 }}
          onDoubleClick={() => { setIsGameOpen(true); setIsGameHidden(false) }}
        />
        <MovableIcon
          icon={'./globus.png'}
          label="Web"
          initialPosition={{ x: 25, y: 360 }}
          onDoubleClick={() => { setIsBrowserOpen(true); setIsBrowserHidden(false) }}
        />
        <MovableIcon
          icon={'./credits.png'}
          label="Credits"
          initialPosition={{ x: 25, y: 180 }}
          onDoubleClick={() => { setIsCreditsOpen(true); setIsCreditsHidden(false) }}
        />
        <MovableIcon
          icon={'./cv.png'}
          label="Resume"
          initialPosition={{ x: 95, y: 180 }}
          onDoubleClick={() => { setIsBrowserOpen(true); setIsBrowserHidden(false) }}
        />
        <MovableIcon
          icon={'./folder.png'}
          label="music"
          initialPosition={{ x: 25, y: 280 }}
          onDoubleClick={() => { setIsMusicFolderOpen(true); setIsMusicFolderHidden(false) }}
        />
      </div>
    </main>
  );
}
