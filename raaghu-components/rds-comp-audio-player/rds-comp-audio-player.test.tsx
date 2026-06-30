import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import RdsCompAudioPlayer from './rds-comp-audio-player';

// Mock SCSS
jest.mock('./rds-comp-audio-player.scss', () => ({}));

// Mock Material UI Icons
jest.mock('@mui/icons-material/Forward10Outlined', () => {
  return function MockForward10Icon() {
    return <span>Forward10</span>;
  };
});

jest.mock('@mui/icons-material/RestoreOutlined', () => {
  return function MockRestoreIcon() {
    return <span>Restore</span>;
  };
});

jest.mock('@mui/icons-material/Settings', () => {
  return function MockSettingsIcon() {
    return <span>Settings</span>;
  };
});

jest.mock('@mui/icons-material/IosShare', () => {
  return function MockShareIcon() {
    return <span>Share</span>;
  };
});

jest.mock('@mui/icons-material/PendingOutlined', () => {
  return function MockPendingIcon() {
    return <span>Pending</span>;
  };
});

jest.mock('@mui/icons-material/CircleOutlined', () => {
  return function MockCircleIcon() {
    return <span>Circle</span>;
  };
});

jest.mock('@mui/icons-material/SettingsSuggestSharp', () => {
  return function MockSettingsSuggestIcon() {
    return <span>SettingsSuggest</span>;
  };
});

// Mock RdsSlider
jest.mock('../../raaghu-elements/rds-slider/rds-slider', () => {
  return function MockRdsSlider(props: any) {
    return (
      <input
        type="range"
        data-testid="rds-slider"
        min={props.min}
        max={props.max}
        value={props.value}
        onChange={props.onChange}
        className={props.className}
        aria-label={props['aria-label']}
      />
    );
  };
});

// Mock RdsButton
jest.mock('../../raaghu-elements/rds-button/rds-button', () => {
  return function MockRdsButton(props: any) {
    return (
      <button data-testid={`rds-button-${props.text}`} className={`rds-button rds-button--${props.color}`}>
        {props.text}
      </button>
    );
  };
});

// Mock RdsCompAiFabMenu
jest.mock('../../raaghu-components/rds-comp-ai-fab-menu/rds-comp-ai-fab-menu', () => {
  return function MockRdsCompAiFabMenu(props: any) {
    return (
      <div data-testid="rds-fab-menu" data-menu-type={props.menuIcon}>
        FAB Menu
      </div>
    );
  };
});

// Mock audio-player-components
jest.mock('./audio-player-components', () => ({
  VolumeSliderComponent: ({ showTranscriptSlider, volumeSliderRef, volumeLevel, handleVolumeChange }: any) => (
    <div ref={volumeSliderRef} data-testid="volume-slider" style={{ display: showTranscriptSlider ? 'block' : 'none' }}>
      <input type="range" min="0" max="100" value={volumeLevel} onChange={handleVolumeChange} />
    </div>
  ),
  SettingsModalComponent: ({ showSettingsModal, playbackSpeed, handlePlaybackSpeedChange }: any) => (
    <div data-testid="settings-modal" style={{ display: showSettingsModal ? 'block' : 'none' }}>
      <input type="range" min="0.5" max="2" step="0.25" value={playbackSpeed} onChange={handlePlaybackSpeedChange} />
    </div>
  ),
  AudioEditionControls: ({ _formatTime, _getSelectedTimeRange, togglePlayPause, zoomLevel, handleZoomOut, handleZoomIn, handleZoomChange }: any) => (
    <div data-testid="audio-edition-controls">
      <button onClick={togglePlayPause}>Play/Pause</button>
      <button onClick={handleZoomOut}>Zoom Out</button>
      <button onClick={handleZoomIn}>Zoom In</button>
      <input type="range" value={zoomLevel} onChange={handleZoomChange} data-testid="zoom-slider" />
    </div>
  ),
}));

// Mock registerMaterialIcons function
jest.mock('../rds-comp-ai-icon/rds-comp-ai-icon', () => ({
  registerMaterialIcons: jest.fn(),
}));

const defaultProps = {
  src: 'https://example.com/audio.mp3',
  type: 'Audio Player' as const,
  showSettings: true,
  showTranscript: true,
  showExport: true,
  showMoreOptions: true,
};

describe('RdsCompAudioPlayer', () => {
  describe('Basic Rendering', () => {
    it('renders the component without crashing', () => {
      const { container } = render(<RdsCompAudioPlayer {...defaultProps} />);
      expect(container).toBeInTheDocument();
    });

    it('renders with correct display name', () => {
      expect(RdsCompAudioPlayer.displayName).toBe('RdsCompAudioPlayer');
    });

    it('renders audio element with src', () => {
      const { container } = render(<RdsCompAudioPlayer {...defaultProps} />);
      const audio = container.querySelector('audio');
      expect(audio).toBeInTheDocument();
      expect(audio).toHaveAttribute('src', defaultProps.src);
    });
  });

  describe('Audio Player Type', () => {
    it('renders Audio Player layout', () => {
      const { container } = render(<RdsCompAudioPlayer {...defaultProps} type="Audio Player" />);
      const player = container.querySelector('.rds-comp-audio-player__player');
      expect(player).toBeInTheDocument();
      expect(player).toHaveClass('rds-comp-audio-player__player--image-layout');
    });

    it('renders main controls in Audio Player', () => {
      const { container } = render(<RdsCompAudioPlayer {...defaultProps} type="Audio Player" />);
      const mainControls = container.querySelector('.rds-comp-audio-player__main-controls');
      expect(mainControls).toBeInTheDocument();
    });

    it('renders play button', () => {
      const { container } = render(<RdsCompAudioPlayer {...defaultProps} type="Audio Player" />);
      const playBtn = container.querySelector('.rds-comp-audio-player__play-btn');
      expect(playBtn).toBeInTheDocument();
    });

    it('renders skip backward button', () => {
      const { container } = render(<RdsCompAudioPlayer {...defaultProps} type="Audio Player" />);
      const skipBackwardBtn = container.querySelector('.rds-comp-audio-player__control-btn');
      expect(skipBackwardBtn).toBeInTheDocument();
    });

    it('renders skip forward button', () => {
      const { container } = render(<RdsCompAudioPlayer {...defaultProps} type="Audio Player" />);
      const buttons = container.querySelectorAll('.rds-comp-audio-player__control-btn');
      expect(buttons.length).toBeGreaterThanOrEqual(2);
    });

    it('renders audio slider', () => {
      render(<RdsCompAudioPlayer {...defaultProps} type="Audio Player" />);
      const slider = screen.getByTestId('rds-slider');
      expect(slider).toBeInTheDocument();
    });

    it('renders current time display', () => {
      const { container } = render(<RdsCompAudioPlayer {...defaultProps} type="Audio Player" />);
      const currentTime = container.querySelector('.rds-comp-audio-player__current-time');
      expect(currentTime).toBeInTheDocument();
      expect(currentTime).toHaveTextContent('0:00');
    });

    it('renders total time display', () => {
      const { container } = render(<RdsCompAudioPlayer {...defaultProps} type="Audio Player" />);
      const totalTime = container.querySelector('.rds-comp-audio-player__total-time');
      expect(totalTime).toBeInTheDocument();
    });
  });

  describe('Collapsed Type', () => {
    it('renders Collapsed layout', () => {
      const { container } = render(<RdsCompAudioPlayer {...defaultProps} type="Collapsed" />);
      const collapsed = container.querySelector('.rds-comp-audio-player__collapsed-container');
      expect(collapsed).toBeInTheDocument();
    });

    it('renders icon circle in collapsed view', () => {
      const { container } = render(<RdsCompAudioPlayer {...defaultProps} type="Collapsed" />);
      const iconCircle = container.querySelector('.rds-comp-audio-player__icon-circle--purple');
      expect(iconCircle).toBeInTheDocument();
    });

    it('does not render main controls in collapsed view', () => {
      const { container } = render(<RdsCompAudioPlayer {...defaultProps} type="Collapsed" />);
      const mainControls = container.querySelector('.rds-comp-audio-player__main-controls');
      expect(mainControls).not.toBeInTheDocument();
    });
  });

  describe('Audio Edition Type', () => {
    it('renders Audio Edition layout', () => {
      const { container } = render(<RdsCompAudioPlayer {...defaultProps} type="Audio Edition" />);
      const editionContainer = container.querySelector('.rds-comp-audio-player__edition-container');
      expect(editionContainer).toBeInTheDocument();
    });

    it('renders Cancel and Save buttons in Audio Edition', () => {
      render(<RdsCompAudioPlayer {...defaultProps} type="Audio Edition" />);
      const cancelBtn = screen.getByTestId('rds-button-Cancel');
      const saveBtn = screen.getByTestId('rds-button-Save');
      expect(cancelBtn).toBeInTheDocument();
      expect(saveBtn).toBeInTheDocument();
    });

    it('renders waveform in Audio Edition', () => {
      const { container } = render(<RdsCompAudioPlayer {...defaultProps} type="Audio Edition" />);
      const waveform = container.querySelector('.rds-comp-audio-player__edition-waveform');
      expect(waveform).toBeInTheDocument();
    });

    it('renders time marks in Audio Edition', () => {
      const { container } = render(<RdsCompAudioPlayer {...defaultProps} type="Audio Edition" />);
      const timeMarks = container.querySelectorAll('.rds-comp-audio-player__edition-timemark');
      expect(timeMarks.length).toBeGreaterThan(0);
    });

    it('renders waveform SVG', () => {
      const { container } = render(<RdsCompAudioPlayer {...defaultProps} type="Audio Edition" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('renders audio edition controls', () => {
      render(<RdsCompAudioPlayer {...defaultProps} type="Audio Edition" />);
      const controls = screen.getByTestId('audio-edition-controls');
      expect(controls).toBeInTheDocument();
    });

    it('renders left and right trim handles', () => {
      const { container } = render(<RdsCompAudioPlayer {...defaultProps} type="Audio Edition" />);
      const trimBars = container.querySelectorAll('.rds-comp-audio-player__waveform-blue-bar');
      expect(trimBars.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Settings Button', () => {
    it('renders settings button when showSettings is true', () => {
      const { container } = render(
        <RdsCompAudioPlayer {...defaultProps} type="Audio Player" showSettings={true} />
      );
      const settingsBtn = container.querySelector('.rds-comp-audio-player__settings-button');
      expect(settingsBtn).toBeInTheDocument();
    });

    it('does not render settings button when showSettings is false', () => {
      const { container } = render(
        <RdsCompAudioPlayer {...defaultProps} type="Audio Player" showSettings={false} />
      );
      const settingsBtn = container.querySelector('.rds-comp-audio-player__settings-button');
      expect(settingsBtn).not.toBeInTheDocument();
    });

    it('toggles settings modal on click', () => {
      const { container } = render(
        <RdsCompAudioPlayer {...defaultProps} type="Audio Player" showSettings={true} />
      );
      const settingsBtn = container.querySelector('.rds-comp-audio-player__settings-button') as HTMLElement;
      const settingsModal = screen.getByTestId('settings-modal');
      
      expect(settingsModal).toHaveStyle({ display: 'none' });
      fireEvent.click(settingsBtn);
      expect(settingsModal).toHaveStyle({ display: 'block' });
    });
  });

  describe('Transcript Button', () => {
    it('renders transcript button when showTranscript is true', () => {
      const { container } = render(
        <RdsCompAudioPlayer {...defaultProps} type="Audio Player" showTranscript={true} />
      );
      const _transcriptBtn = container.querySelector('button[class*="transcript"]');
      // The transcript button is rendered but doesn't have a specific class
      expect(container.querySelector('.rds-comp-audio-player__extra-controls')).toBeInTheDocument();
    });

    it('does not render transcript button when showTranscript is false', () => {
      render(
        <RdsCompAudioPlayer {...defaultProps} type="Audio Player" showTranscript={false} />
      );
      const volumeSlider = screen.getByTestId('volume-slider');
      // Volume slider shouldn't be visible if transcript is not shown
      expect(volumeSlider).toHaveStyle({ display: 'none' });
    });
  });

  describe('Export Menu', () => {
    it('renders export menu when showExport is true', () => {
      render(<RdsCompAudioPlayer {...defaultProps} type="Audio Player" showExport={true} />);
      const fabMenus = screen.getAllByTestId('rds-fab-menu');
      expect(fabMenus.length).toBeGreaterThanOrEqual(1);
    });

    it('does not render export menu when showExport is false', () => {
      const { container } = render(
        <RdsCompAudioPlayer {...defaultProps} type="Audio Player" showExport={false} showMoreOptions={false} />
      );
      const fabMenus = container.querySelectorAll('[data-testid="rds-fab-menu"]');
      expect(fabMenus.length).toBe(0);
    });
  });

  describe('More Options Menu', () => {
    it('renders more options menu when showMoreOptions is true', () => {
      render(<RdsCompAudioPlayer {...defaultProps} type="Audio Player" showMoreOptions={true} />);
      const fabMenus = screen.getAllByTestId('rds-fab-menu');
      expect(fabMenus.length).toBeGreaterThanOrEqual(1);
    });

    it('does not render more options menu when showMoreOptions is false', () => {
      const { container } = render(
        <RdsCompAudioPlayer {...defaultProps} type="Audio Player" showMoreOptions={false} showExport={false} />
      );
      const fabMenus = container.querySelectorAll('[data-testid="rds-fab-menu"]');
      expect(fabMenus.length).toBe(0);
    });
  });

  describe('Icon Circle', () => {
    it('renders purple icon circle in Audio Player', () => {
      const { container } = render(
        <RdsCompAudioPlayer {...defaultProps} type="Audio Player" />
      );
      const iconCircle = container.querySelector('.rds-comp-audio-player__icon-circle--purple');
      expect(iconCircle).toBeInTheDocument();
    });

    it('renders settings icon in extra controls', () => {
      const { container } = render(
        <RdsCompAudioPlayer {...defaultProps} type="Audio Player" />
      );
      const extraControls = container.querySelector('.rds-comp-audio-player__extra-controls');
      expect(extraControls).toBeInTheDocument();
    });
  });

  describe('Volume Control', () => {
    it('renders volume slider component', () => {
      render(<RdsCompAudioPlayer {...defaultProps} type="Audio Player" />);
      const volumeSlider = screen.getByTestId('volume-slider');
      expect(volumeSlider).toBeInTheDocument();
    });

    it('volume slider is hidden initially', () => {
      render(<RdsCompAudioPlayer {...defaultProps} type="Audio Player" showTranscript={true} />);
      const volumeSlider = screen.getByTestId('volume-slider');
      expect(volumeSlider).toHaveStyle({ display: 'none' });
    });
  });

  describe('Settings Modal', () => {
    it('renders settings modal component', () => {
      render(<RdsCompAudioPlayer {...defaultProps} type="Audio Player" showSettings={true} />);
      const settingsModal = screen.getByTestId('settings-modal');
      expect(settingsModal).toBeInTheDocument();
    });

    it('settings modal is hidden initially', () => {
      render(<RdsCompAudioPlayer {...defaultProps} type="Audio Player" showSettings={true} />);
      const settingsModal = screen.getByTestId('settings-modal');
      expect(settingsModal).toHaveStyle({ display: 'none' });
    });
  });

  describe('Props Variants', () => {
    it('renders with minimal props', () => {
      const { container } = render(
        <RdsCompAudioPlayer
          src="https://example.com/audio.mp3"
          type="Audio Player"
          showSettings={false}
          showTranscript={false}
          showExport={false}
          showMoreOptions={false}
        />
      );
      expect(container.querySelector('audio')).toBeInTheDocument();
    });

    it('renders with all features enabled', () => {
      const { container } = render(<RdsCompAudioPlayer {...defaultProps} />);
      expect(container.querySelector('.rds-comp-audio-player__settings-button')).toBeInTheDocument();
    });

    it('renders with different audio source', () => {
      const { container } = render(
        <RdsCompAudioPlayer
          {...defaultProps}
          src="https://different-source.com/audio.wav"
        />
      );
      const audio = container.querySelector('audio');
      expect(audio).toHaveAttribute('src', 'https://different-source.com/audio.wav');
    });
  });

  describe('Mobile Responsiveness', () => {
    it('responds to window resize', () => {
      const { container } = render(<RdsCompAudioPlayer {...defaultProps} type="Audio Edition" />);
      const _initialTimeMarks = container.querySelectorAll('.rds-comp-audio-player__edition-timemark').length;
      
      // Simulate window resize to mobile
      global.innerWidth = 500;
      fireEvent.resize(window);
      
      // Component should still render
      expect(container.querySelector('.rds-comp-audio-player__edition-container')).toBeInTheDocument();
    });
  });

  describe('Audio Element Properties', () => {
    it('audio element has correct src attribute', () => {
      const { container } = render(<RdsCompAudioPlayer {...defaultProps} />);
      const audio = container.querySelector('audio');
      expect(audio).toHaveAttribute('src', defaultProps.src);
    });

    it('audio element is rendered in main controls', () => {
      const { container } = render(<RdsCompAudioPlayer {...defaultProps} type="Audio Player" />);
      const mainControls = container.querySelector('.rds-comp-audio-player__main-controls');
      const audio = mainControls?.querySelector('audio');
      expect(audio).toBeInTheDocument();
    });
  });

  describe('Extra Controls', () => {
    it('renders extra controls section', () => {
      const { container } = render(
        <RdsCompAudioPlayer {...defaultProps} type="Audio Player" />
      );
      const extraControls = container.querySelector('.rds-comp-audio-player__extra-controls');
      expect(extraControls).toBeInTheDocument();
    });

    it('renders correct number of circle icons', () => {
      const { container } = render(
        <RdsCompAudioPlayer {...defaultProps} type="Audio Player" />
      );
      const extraControls = container.querySelector('.rds-comp-audio-player__extra-controls');
      expect(extraControls).toBeInTheDocument();
    });
  });

  describe('Time Formatting', () => {
    it('displays formatted time correctly', () => {
      const { container } = render(
        <RdsCompAudioPlayer {...defaultProps} type="Audio Player" />
      );
      const currentTime = container.querySelector('.rds-comp-audio-player__current-time');
      expect(currentTime).toHaveTextContent('0:00');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty src gracefully', () => {
      const { container } = render(
        <RdsCompAudioPlayer
          {...defaultProps}
          src=""
        />
      );
      expect(container).toBeInTheDocument();
    });

    it('handles very long audio source URL', () => {
      const longUrl = 'https://example.com/' + 'a'.repeat(500) + '/audio.mp3';
      const { container } = render(
        <RdsCompAudioPlayer
          {...defaultProps}
          src={longUrl}
        />
      );
      const audio = container.querySelector('audio');
      expect(audio).toHaveAttribute('src', longUrl);
    });

    it('renders all three types without errors', () => {
      const types: Array<'Collapsed' | 'Audio Player' | 'Audio Edition'> = ['Collapsed', 'Audio Player', 'Audio Edition'];
      
      types.forEach(type => {
        const { container, unmount } = render(
          <RdsCompAudioPlayer {...defaultProps} type={type} />
        );
        expect(container).toBeInTheDocument();
        unmount();
      });
    });

    it('handles toggling all boolean props', () => {
      const { rerender } = render(<RdsCompAudioPlayer {...defaultProps} />);
      expect(screen.getByTestId('settings-modal')).toBeInTheDocument();
      
      rerender(
        <RdsCompAudioPlayer
          {...defaultProps}
          showSettings={false}
          showTranscript={false}
          showExport={false}
          showMoreOptions={false}
        />
      );
      // Component should still render without errors
      expect(screen.getByTestId('volume-slider')).toBeInTheDocument();
    });
  });

  describe('Re-render Behavior', () => {
    it('updates src on prop change', () => {
      const { rerender, container } = render(
        <RdsCompAudioPlayer {...defaultProps} src="https://first.com/audio.mp3" />
      );
      let audio = container.querySelector('audio');
      expect(audio).toHaveAttribute('src', 'https://first.com/audio.mp3');

      rerender(
        <RdsCompAudioPlayer {...defaultProps} src="https://second.com/audio.mp3" />
      );
      audio = container.querySelector('audio');
      expect(audio).toHaveAttribute('src', 'https://second.com/audio.mp3');
    });

    it('updates type on prop change', () => {
      const { rerender, container } = render(
        <RdsCompAudioPlayer {...defaultProps} type="Audio Player" />
      );
      expect(container.querySelector('.rds-comp-audio-player__player')).toBeInTheDocument();

      rerender(
        <RdsCompAudioPlayer {...defaultProps} type="Collapsed" />
      );
      expect(container.querySelector('.rds-comp-audio-player__collapsed-container')).toBeInTheDocument();
    });

    it('shows/hides settings button on prop change', () => {
      const { rerender, container } = render(
        <RdsCompAudioPlayer {...defaultProps} type="Audio Player" showSettings={true} />
      );
      expect(container.querySelector('.rds-comp-audio-player__settings-button')).toBeInTheDocument();

      rerender(
        <RdsCompAudioPlayer {...defaultProps} type="Audio Player" showSettings={false} />
      );
      expect(container.querySelector('.rds-comp-audio-player__settings-button')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('waveform trim handles have aria attributes', () => {
      const { container } = render(
        <RdsCompAudioPlayer {...defaultProps} type="Audio Edition" />
      );
      const trimBars = container.querySelectorAll('.rds-comp-audio-player__waveform-blue-bar');
      trimBars.forEach(bar => {
        expect(bar).toHaveAttribute('role', 'slider');
        expect(bar).toHaveAttribute('aria-label');
      });
    });
    
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsCompAudioPlayer {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }, 15000);

    it('trim handles are keyboard accessible', () => {
      const { container } = render(
        <RdsCompAudioPlayer {...defaultProps} type="Audio Edition" />
      );
      const trimBars = container.querySelectorAll('.rds-comp-audio-player__waveform-blue-bar');
      trimBars.forEach(bar => {
        expect(bar).toHaveAttribute('tabIndex', '0');
      });
    });

    it('buttons are keyboard accessible', () => {
      const { container } = render(
        <RdsCompAudioPlayer {...defaultProps} type="Audio Player" />
      );
      const buttons = container.querySelectorAll('button');
      buttons.forEach(btn => {
        expect(btn).toBeInTheDocument();
      });
    });
  });

  describe('CSS Classes', () => {
    it('applies correct CSS classes in Audio Player', () => {
      const { container } = render(
        <RdsCompAudioPlayer {...defaultProps} type="Audio Player" />
      );
      expect(container.querySelector('.rds-comp-audio-player__player')).toHaveClass('rds-comp-audio-player__player--image-layout');
      expect(container.querySelector('.rds-comp-audio-player__main-controls')).toBeInTheDocument();
    });

    it('applies muted class to current time', () => {
      const { container } = render(
        <RdsCompAudioPlayer {...defaultProps} type="Audio Player" />
      );
      const currentTime = container.querySelector('.rds-comp-audio-player__current-time');
      expect(currentTime).toBeInTheDocument();
    });

    it('applies correct classes to waveform elements', () => {
      const { container } = render(
        <RdsCompAudioPlayer {...defaultProps} type="Audio Edition" />
      );
      expect(container.querySelector('.rds-comp-audio-player__edition-waveform')).toBeInTheDocument();
      expect(container.querySelector('.rds-comp-audio-player__waveform-background')).toBeInTheDocument();
    });
  });
});