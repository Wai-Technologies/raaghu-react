import React, { useRef, useState, useEffect } from "react";
import "./rds-comp-audio-player.scss";
import Forward10OutlinedIcon from "@mui/icons-material/Forward10Outlined";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import IosShareIcon from "@mui/icons-material/IosShare";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";
import RdsSlider from "../../raaghu-elements/rds-slider/rds-slider";
import MonitorWeightOutlinedIcon from "@mui/icons-material/MonitorWeightOutlined";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import SettingsSuggestSharpIcon from "@mui/icons-material/SettingsSuggestSharp";
import RdsButton from "../../raaghu-elements/rds-button/rds-button";
import RdsCompAiFabMenu from "../../raaghu-components/rds-comp-ai-fab-menu/rds-comp-ai-fab-menu";
import { registerMaterialIcons } from "../rds-comp-ai-icon/rds-comp-ai-icon";
import { VolumeSliderComponent, SettingsModalComponent, AudioEditionControls } from "./audio-player-components";

interface AudioPlayerProps {
  src: string;
  type: "Audio Edition" | "Audio Player" | "Collapsed";
  showSettings: boolean;
  showTranscript: boolean;
  showExport: boolean;
  showMoreOptions: boolean;
}

const RdsCompAudioPlayer: React.FC<AudioPlayerProps> = ({ src, type="Audio Player", showSettings, showTranscript, showExport, showMoreOptions }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const volumeSliderRef = useRef<HTMLDivElement>(null);
  const transcriptButtonRef = useRef<HTMLButtonElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [duration, setDuration] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(30);
  const [leftTrimPosition, setLeftTrimPosition] = useState(10);
  const [rightTrimPosition, setRightTrimPosition] = useState(90);
  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);
  const [showTranscriptSlider, setShowTranscriptSlider] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(50);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [isMobileView, setIsMobileView] = useState(false);
  const SLIDER_MAX = 120;

  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth <= 768);
    };
    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    return () => {
      window.removeEventListener('resize', checkMobileView);
    };
  }, []);

  const getTimeMarkConfig = () => {
    if (isMobileView) {
      return { interval: "00:30", count: 5 };
    } else {
      return { interval: "00:10", count: 13 };
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    registerMaterialIcons({ 'share_icon': IosShareIcon, 'pending_icon': PendingOutlinedIcon });
    const handleLoadedMetadata = () => { setDuration(audio?.duration || 0); setSliderValue(0); setCurrentTime(0); };
    const handleTimeUpdate = () => { if (audio) { setCurrentTime(audio.currentTime); setSliderValue(audio.currentTime); } };
    
    const handleDocumentMouseMove = (e: MouseEvent) => {
      if (isDraggingLeft || isDraggingRight) {
        const waveformElement = document.querySelector('.rds-comp-audio-player__edition-waveform');
        if (waveformElement) {
          const rect = waveformElement.getBoundingClientRect();
          const percentage = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
          if (isDraggingLeft && percentage < rightTrimPosition - 5) setLeftTrimPosition(percentage);
          else if (isDraggingRight && percentage > leftTrimPosition + 5) setRightTrimPosition(percentage);
        }
      }
    };
    const handleDocumentMouseUp = () => { setIsDraggingLeft(false); setIsDraggingRight(false); };
    
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (showTranscriptSlider && volumeSliderRef.current && !volumeSliderRef.current.contains(target) &&
          transcriptButtonRef.current && !transcriptButtonRef.current.contains(target)) setShowTranscriptSlider(false);
      
      if (showSettingsModal) {
        const settingsModal = document.querySelector('.rds-comp-audio-player__settings-modal');
        const settingsButton = document.querySelector('.rds-comp-audio-player__settings-button');
        if (settingsModal && !settingsModal.contains(target) && settingsButton && !settingsButton.contains(target)) setShowSettingsModal(false);
      }
    };

    audio?.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio?.addEventListener("timeupdate", handleTimeUpdate);
    if (isDraggingLeft || isDraggingRight) {
      document.addEventListener('mousemove', handleDocumentMouseMove);
      document.addEventListener('mouseup', handleDocumentMouseUp);
    }
    if (showTranscriptSlider || showSettingsModal) document.addEventListener('mousedown', handleClickOutside);

    return () => {
      audio?.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio?.removeEventListener("timeupdate", handleTimeUpdate);
      document.removeEventListener('mousemove', handleDocumentMouseMove);
      document.removeEventListener('mouseup', handleDocumentMouseUp);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDraggingLeft, isDraggingRight, leftTrimPosition, rightTrimPosition, showTranscriptSlider, showSettingsModal]);

  const handleSeek = (_: Event, value: number | number[]) => {
    const time = Array.isArray(value) ? value[0] : value;
    setSliderValue(time); setCurrentTime(time);
    if (audioRef.current && time <= duration) audioRef.current.currentTime = time;
  };

  const formatTime = (time: number) => `${Math.floor(time / 60)}:${Math.floor(time % 60).toString().padStart(2, "0")}`;

  const getSelectedTimeRange = () => {
    const totalDuration = duration > 0 ? duration : 120;
    const startTime = (leftTrimPosition / 100) * totalDuration;
    const endTime = (rightTrimPosition / 100) * totalDuration;
    return { startTime, endTime, selectedDuration: endTime - startTime };
  };

  const handleZoomChange = (_: Event, value: number | number[]) => setZoomLevel(Array.isArray(value) ? value[0] : value);
  const handleZoomIn = () => setZoomLevel(prev => Math.min(100, prev + 10));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(0, prev - 10));
  
  const handleWaveformMouseDown = (e: React.MouseEvent, side: 'left' | 'right') => {
    e.preventDefault();
    side === 'left' ? setIsDraggingLeft(true) : setIsDraggingRight(true);
  };

  const handleWaveformMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingLeft && !isDraggingRight) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    if (isDraggingLeft && percentage < rightTrimPosition - 5) setLeftTrimPosition(percentage);
    else if (isDraggingRight && percentage > leftTrimPosition + 5) setRightTrimPosition(percentage);
  };

  const handleWaveformMouseUp = () => { setIsDraggingLeft(false); setIsDraggingRight(false); };

  const togglePlayPause = () => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.pause() : audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      const newTime = Math.max(0, currentTime - 10);
      audioRef.current.currentTime = newTime; setCurrentTime(newTime); setSliderValue(newTime);
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      const maxDuration = duration > 0 ? duration : SLIDER_MAX;
      const newTime = Math.min(maxDuration, currentTime + 10);
      audioRef.current.currentTime = newTime; setCurrentTime(newTime); setSliderValue(newTime);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, side: 'left' | 'right') => {
    const step = 1;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      side === 'left' ? setLeftTrimPosition(prev => Math.max(0, prev - step)) : 
        setRightTrimPosition(prev => Math.max(leftTrimPosition + 5, prev - step));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      side === 'left' ? setLeftTrimPosition(prev => Math.min(rightTrimPosition - 5, prev + step)) : 
        setRightTrimPosition(prev => Math.min(100, prev + step));
    }
  };

  const toggleTranscriptSlider = () => setShowTranscriptSlider(!showTranscriptSlider);
  const handleVolumeChange = (_: Event, value: number | number[]) => {
    const volume = Array.isArray(value) ? value[0] : value;
    setVolumeLevel(volume);
    if (audioRef.current) audioRef.current.volume = volume / 100;
  };
  const toggleSettingsModal = () => setShowSettingsModal(!showSettingsModal);
  const handlePlaybackSpeedChange = (_: Event, value: number | number[]) => {
    const speed = Array.isArray(value) ? value[0] : value;
    setPlaybackSpeed(speed);
    if (audioRef.current) audioRef.current.playbackRate = speed;
  };

  const exportMenuItems = [
    { icon: 'users', iconHeight: '24px', iconWidth: '24px', key: 'new', some: 'value', value: 'Share Link' },
    { icon: 'refresh', iconHeight: '24px', iconWidth: '24px', key: 'refresh', some: 'value', value: 'Export Audio' },
    { icon: 'export', iconHeight: '24px', iconWidth: '24px', key: 'export', some: 'value', value: 'Export Transcript' },
    { icon: 'delete', iconHeight: '24px', iconWidth: '24px', key: 'delete', some: 'value', value: 'Export Summary' },
    { icon: 'download', iconHeight: '24px', iconWidth: '24px', key: 'download', some: 'value', value: 'Export Mind Map' }
  ];

  const moreOptionsMenuItems = [
    { icon: 'users', iconHeight: '24px', iconWidth: '24px', key: 'new', some: 'value', value: 'Move to folder' },
    { icon: 'refresh', iconHeight: '24px', iconWidth: '24px', key: 'refresh', some: 'value', value: 'Find & Replace' },
    { icon: 'export', iconHeight: '24px', iconWidth: '24px', key: 'export', some: 'value', value: 'Re-Transcribe' },
    { icon: 'delete', iconHeight: '24px', iconWidth: '24px', key: 'delete', some: 'value', value: 'Re-Summarize' }
  ];

  return (
    <>
      {type === "Collapsed" && (
        <div className="rds-comp-audio-player__collapsed-container">
          <span className="rds-comp-audio-player__icon-circle rds-comp-audio-player__icon-circle--purple"><CircleOutlinedIcon /></span>
          <span className="rds-comp-audio-player__icon-settings"><SettingsSuggestSharpIcon /></span>
        </div>
      )}
      {type === "Audio Player" && (
        <div className="rds-comp-audio-player__player rds-comp-audio-player__player--image-layout">
          <span className="rds-comp-audio-player__icon-circle rds-comp-audio-player__icon-circle--purple"><CircleOutlinedIcon /></span>
          <div className="rds-comp-audio-player__main-controls">
            <audio ref={audioRef} src={src} />
            <button className="rds-comp-audio-player__control-btn" onClick={skipBackward}><RestoreOutlinedIcon /></button>
            <button className="rds-comp-audio-player__play-btn" onClick={togglePlayPause}><CircleOutlinedIcon /></button>
            <button className="rds-comp-audio-player__control-btn" onClick={skipForward}><Forward10OutlinedIcon /></button>
            <span className="rds-comp-audio-player__current-time">{formatTime(sliderValue)}</span>
            <RdsSlider min={0} max={duration > 0 ? Math.max(duration, SLIDER_MAX) : SLIDER_MAX} value={sliderValue} onChange={handleSeek} className="rds-comp-audio-player__slider" controlType="one way" leftLabel="" rightLabel="" />
            <span className="rds-comp-audio-player__total-time">{formatTime(duration > 0 ? duration : SLIDER_MAX)}</span>
          </div>
          <div className="rds-comp-audio-player__extra-controls">
            {showSettings && <button className="rds-comp-audio-player__settings-button" onClick={toggleSettingsModal}><SettingsIcon /></button>}
            <CircleOutlinedIcon />
            {showExport && <RdsCompAiFabMenu alignment="right" backgroundType="none" colorVariant="secondary" listItems={exportMenuItems} menuIcon="share_icon" size="small" />}
            {showMoreOptions && <RdsCompAiFabMenu alignment="right" backgroundType="none" colorVariant="secondary" listItems={moreOptionsMenuItems} menuIcon="pending_icon" size="small" />}
            <CircleOutlinedIcon />
            {showTranscript && <button ref={transcriptButtonRef} onClick={toggleTranscriptSlider}><MonitorWeightOutlinedIcon /></button>}
          </div>
          <VolumeSliderComponent showTranscriptSlider={showTranscriptSlider} volumeSliderRef={volumeSliderRef} volumeLevel={volumeLevel} handleVolumeChange={handleVolumeChange} />
          <SettingsModalComponent showSettingsModal={showSettingsModal} playbackSpeed={playbackSpeed} handlePlaybackSpeedChange={handlePlaybackSpeedChange} />
        </div>
      )}
      {type === "Audio Edition" && (
        <div className="rds-comp-audio-player__edition-container">
          <div className="rds-comp-audio-player__edition-buttons-top">
            <RdsButton color="primary" size="medium" text="Cancel" layout="text-only" shape="rectangle" state="default" style="transparent" />
            <RdsButton color="primary" size="medium" text="Save" layout="text-only" shape="rectangle" state="default"  style="filled" />
          </div>
          <div className="rds-comp-audio-player__edition-timemarks">
            {[...Array(getTimeMarkConfig().count)].map((_, i) => (<span key={i} className="rds-comp-audio-player__edition-timemark">{getTimeMarkConfig().interval}</span>))}
          </div>
          <div 
            className={`rds-comp-audio-player__edition-waveform ${isDraggingLeft || isDraggingRight ? 'rds-comp-audio-player__edition-waveform--dragging' : ''}`}
            onMouseMove={handleWaveformMouseMove} onMouseUp={handleWaveformMouseUp} onMouseLeave={handleWaveformMouseUp}
            style={{'--left-trim-position': `${leftTrimPosition}%`, '--right-trim-position': `${rightTrimPosition}%`, '--selection-width': `${rightTrimPosition - leftTrimPosition}%`, '--left-overlay-width': `${leftTrimPosition}%`, '--right-overlay-width': `${100 - rightTrimPosition}%`} as React.CSSProperties}>
            <div className="rds-comp-audio-player__waveform-background">
              <div className="rds-comp-audio-player__waveform-disabled-overlay rds-comp-audio-player__waveform-disabled-overlay--left"></div>
              <div className="rds-comp-audio-player__waveform-disabled-overlay rds-comp-audio-player__waveform-disabled-overlay--right"></div>
              <div className="rds-comp-audio-player__waveform-selection"></div>
              <svg width="100%" height="200" viewBox="0 0 1200 200" preserveAspectRatio="none">
                {[...Array(150)].map((_, i) => {
                  const x = i * 8;
                  const height = Math.max(20, Math.abs(Math.sin(i * 0.1) * 60 + Math.random() * 40));
                  const adjustedHeight = height * Math.max(0.1, zoomLevel / 50);
                  return <rect key={i} x={x} y={(200 - adjustedHeight) / 2} width="5" height={adjustedHeight} fill="white" rx="2" opacity={0.9} />;
                })}
              </svg>
            </div>
            {['left', 'right'].map(side => (
              <div key={side}
                className={`rds-comp-audio-player__waveform-blue-bar rds-comp-audio-player__waveform-blue-bar--${side} ${(side === 'left' ? isDraggingLeft : isDraggingRight) ? 'rds-comp-audio-player__waveform-blue-bar--active' : ''}`}
                onMouseDown={(e) => handleWaveformMouseDown(e, side as 'left' | 'right')} onKeyDown={(e) => handleKeyDown(e, side as 'left' | 'right')}
                tabIndex={0} role="slider" aria-label={`${side} trim handle`}
                aria-valuemin={side === 'left' ? 0 : leftTrimPosition + 5} aria-valuemax={side === 'left' ? rightTrimPosition - 5 : 100}
                aria-valuenow={side === 'left' ? leftTrimPosition : rightTrimPosition}>
                <div className="rds-comp-audio-player__waveform-bar-handle"></div>
              </div>
            ))}
          </div>
          <AudioEditionControls formatTime={formatTime} getSelectedTimeRange={getSelectedTimeRange} togglePlayPause={togglePlayPause} 
            zoomLevel={zoomLevel} handleZoomOut={handleZoomOut} handleZoomIn={handleZoomIn} handleZoomChange={handleZoomChange} />
        </div>
      )}
    </>
  );
};
RdsCompAudioPlayer.displayName = 'RdsCompAudioPlayer';
export default RdsCompAudioPlayer;
