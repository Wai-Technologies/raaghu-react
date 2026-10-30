import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import RdsCompAudioPlayer from './rds-comp-audio-player';

jest.mock('./rds-comp-audio-player.scss', () => ({}));

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

jest.mock('../../raaghu-elements/rds-button/rds-button', () => {
  return function MockRdsButton(props: any) {
    return (
      <button data-testid={`rds-button-${props.text}`} className={`rds-button rds-button--${props.color}`} onClick={props.onClick}>
        {props.text}
      </button>
    );
  };
});

const mockFabMenuProps: any[] = [];
jest.mock('../../raaghu-components/rds-comp-ai-fab-menu/rds-comp-ai-fab-menu', () => {
  return function MockRdsCompAiFabMenu(props: any) {
    mockFabMenuProps.push(props);
    return (
      <div data-testid="rds-fab-menu" data-menu-type={props.menuIcon}>
        FAB Menu
      </div>
    );
  };
});

jest.mock('../../raaghu-elements/shared/utils/deprecation', () => ({ warnDeprecatedProp: jest.fn() }));

jest.mock('./VolumeSliderComponent', () => ({
  VolumeSliderComponent: ({ showVolumeSlider, volumeSliderRef, volumeLevel, handleVolumeChange }: any) => (
    <div ref={volumeSliderRef} data-testid="volume-slider" style={{ display: showVolumeSlider ? 'block' : 'none' }}>
      <input type="range" min="0" max="100" value={volumeLevel} onChange={handleVolumeChange} />
    </div>
  ),
}));
jest.mock('./SettingsModalComponent', () => ({
  SettingsModalComponent:({ showSettingsModal, playbackSpeed, handlePlaybackSpeedChange }: any) => (
    <div data-testid="settings-modal" style={{ display: showSettingsModal ? 'block' : 'none' }}>
      <input type="range" min="0.5" max="2" step="0.25" value={playbackSpeed} onChange={handlePlaybackSpeedChange} />
    </div>
  ),
}));
const mockEditionProps: any[] = [];
jest.mock('./AudioEditionControls', () => ({
  AudioEditionControls: (props: any) => {
    mockEditionProps.push(props);
    const { togglePlayPause, zoomLevel, handleZoomOut, handleZoomIn, handleZoomChange } = props;
    return (
      <div data-testid="audio-edition-controls">
        <button onClick={togglePlayPause}>Play/Pause</button>
        <button onClick={handleZoomOut}>Zoom Out</button>
        <button onClick={handleZoomIn}>Zoom In</button>
        <input type="range" value={zoomLevel} onChange={handleZoomChange} data-testid="zoom-slider" />
      </div>
    );
  },
}));

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

const setup = (p: Record<string, any> = {}) => render(<RdsCompAudioPlayer {...defaultProps} {...p} />);
const playerSetup = (p: Record<string, any> = {}) => setup({ type: 'Audio Player', ...p });
const q = (c: HTMLElement, cls: string) => c.querySelector(`.rds-comp-audio-player__${cls}`);

describe('RdsCompAudioPlayer', () => {
  describe('Basic Rendering', () => {
    it('renders the component without crashing', () => {
      const { container } = setup();
      expect(container).toBeInTheDocument();
    });

    it('renders with correct display name', () => {
      expect(RdsCompAudioPlayer.displayName).toBe('RdsCompAudioPlayer');
    });

    it('renders audio element with src', () => {
      const { container } = setup();
      const audio = container.querySelector('audio');
      expect(audio).toBeInTheDocument();
      expect(audio).toHaveAttribute('src', defaultProps.src);
    });
  });

  describe('Audio Player Type', () => {
    it('renders Audio Player layout', () => {
      const { container } = playerSetup();
      const player = q(container, 'player');
      expect(player).toBeInTheDocument();
      expect(player).toHaveClass('rds-comp-audio-player__player--image-layout');
    });

    it('renders main controls, play and skip buttons in Audio Player', () => {
      const { container } = playerSetup();
      expect(q(container, 'main-controls')).toBeInTheDocument();
      expect(q(container, 'play-btn')).toBeInTheDocument();
      expect(q(container, 'control-btn')).toBeInTheDocument();
      expect(container.querySelectorAll('.rds-comp-audio-player__control-btn').length).toBeGreaterThanOrEqual(2);
    });

    it('renders audio slider', () => {
      playerSetup();
      expect(screen.getByTestId('rds-slider')).toBeInTheDocument();
    });

    it('renders current and total time display', () => {
      const { container } = playerSetup();
      const currentTime = q(container, 'current-time');
      expect(currentTime).toBeInTheDocument();
      expect(currentTime).toHaveTextContent('0:00');
      expect(q(container, 'total-time')).toBeInTheDocument();
    });
  });

  describe('Collapsed Type', () => {
    it('renders Collapsed layout', () => {
      const { container } = setup({ type: 'Collapsed' });
      expect(q(container, 'collapsed-container')).toBeInTheDocument();
    });

    it('renders icon circle in collapsed view', () => {
      const { container } = setup({ type: 'Collapsed' });
      expect(q(container, 'icon-circle--purple')).toBeInTheDocument();
    });

    it('does not render main controls in collapsed view', () => {
      const { container } = setup({ type: 'Collapsed' });
      expect(q(container, 'main-controls')).not.toBeInTheDocument();
    });
  });

  describe('Audio Edition Type', () => {
    it('renders Audio Edition layout', () => {
      const { container } = setup({ type: 'Audio Edition' });
      expect(q(container, 'edition-container')).toBeInTheDocument();
    });

    it('renders Cancel and Save buttons in Audio Edition', () => {
      setup({ type: 'Audio Edition' });
      expect(screen.getByTestId('rds-button-Cancel')).toBeInTheDocument();
      expect(screen.getByTestId('rds-button-Save')).toBeInTheDocument();
    });

    it('renders waveform, time marks and SVG in Audio Edition', () => {
      const { container } = setup({ type: 'Audio Edition' });
      expect(q(container, 'edition-waveform')).toBeInTheDocument();
      expect(container.querySelectorAll('.rds-comp-audio-player__edition-timemark').length).toBeGreaterThan(0);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('renders audio edition controls', () => {
      setup({ type: 'Audio Edition' });
      expect(screen.getByTestId('audio-edition-controls')).toBeInTheDocument();
    });

    it('renders left and right trim handles', () => {
      const { container } = setup({ type: 'Audio Edition' });
      expect(container.querySelectorAll('.rds-comp-audio-player__waveform-blue-bar').length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Settings Button', () => {
    it('renders settings button when showSettings is true', () => {
      const { container } = playerSetup({ showSettings: true });
      expect(q(container, 'settings-button')).toBeInTheDocument();
    });

    it('does not render settings button when showSettings is false', () => {
      const { container } = playerSetup({ showSettings: false });
      expect(q(container, 'settings-button')).not.toBeInTheDocument();
    });

    it('toggles settings modal on click', () => {
      const { container } = playerSetup({ showSettings: true });
      const settingsModal = screen.getByTestId('settings-modal');
      expect(settingsModal).toHaveStyle({ display: 'none' });
      fireEvent.click(q(container, 'settings-button') as HTMLElement);
      expect(settingsModal).toHaveStyle({ display: 'block' });
    });
  });

  describe('Transcript Button', () => {
    it('renders transcript button when showTranscript is true', () => {
      const { container } = playerSetup({ showTranscript: true });
      expect(q(container, 'extra-controls')).toBeInTheDocument();
    });

    it('does not render transcript button when showTranscript is false', () => {
      playerSetup({ showTranscript: false });
      expect(screen.getByTestId('volume-slider')).toHaveStyle({ display: 'none' });
    });
  });

  describe('Export and More Options Menu', () => {
    it('renders export menu when showExport is true', () => {
      playerSetup({ showExport: true });
      expect(screen.getAllByTestId('rds-fab-menu').length).toBeGreaterThanOrEqual(1);
    });

    it('renders more options menu when showMoreOptions is true', () => {
      playerSetup({ showMoreOptions: true });
      expect(screen.getAllByTestId('rds-fab-menu').length).toBeGreaterThanOrEqual(1);
    });

    it.each([
      ['showExport', { showExport: false, showMoreOptions: false }],
      ['showMoreOptions', { showMoreOptions: false, showExport: false }],
    ])('does not render menus when %s is false', (_n, props) => {
      const { container } = playerSetup(props);
      expect(container.querySelectorAll('[data-testid="rds-fab-menu"]').length).toBe(0);
    });
  });

  describe('Icon Circle', () => {
    it('renders purple icon circle and extra controls in Audio Player', () => {
      const { container } = playerSetup();
      expect(q(container, 'icon-circle--purple')).toBeInTheDocument();
      expect(q(container, 'extra-controls')).toBeInTheDocument();
    });
  });

  describe('Volume Control', () => {
    it('renders volume slider component hidden initially', () => {
      playerSetup({ showTranscript: true });
      const volumeSlider = screen.getByTestId('volume-slider');
      expect(volumeSlider).toBeInTheDocument();
      expect(volumeSlider).toHaveStyle({ display: 'none' });
    });
  });

  describe('Settings Modal', () => {
    it('renders settings modal component hidden initially', () => {
      playerSetup({ showSettings: true });
      const settingsModal = screen.getByTestId('settings-modal');
      expect(settingsModal).toBeInTheDocument();
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
      const { container } = setup();
      expect(q(container, 'settings-button')).toBeInTheDocument();
    });

    it('renders with different audio source', () => {
      const { container } = setup({ src: 'https://different-source.com/audio.wav' });
      expect(container.querySelector('audio')).toHaveAttribute('src', 'https://different-source.com/audio.wav');
    });
  });

  describe('Mobile Responsiveness', () => {
    it('responds to window resize', () => {
      const { container } = setup({ type: 'Audio Edition' });
      global.innerWidth = 500;
      fireEvent.resize(window);
      expect(q(container, 'edition-container')).toBeInTheDocument();
    });
  });

  describe('Audio Element Properties', () => {
    it('audio element is rendered in main controls', () => {
      const { container } = playerSetup();
      expect(q(container, 'main-controls')?.querySelector('audio')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty src gracefully', () => {
      const { container } = setup({ src: '' });
      expect(container).toBeInTheDocument();
    });

    it('handles very long audio source URL', () => {
      const longUrl = 'https://example.com/' + 'a'.repeat(500) + '/audio.mp3';
      const { container } = setup({ src: longUrl });
      expect(container.querySelector('audio')).toHaveAttribute('src', longUrl);
    });

    it.each(['Collapsed', 'Audio Player', 'Audio Edition'])('renders %s type without errors', (type) => {
      const { container } = setup({ type });
      expect(container).toBeInTheDocument();
    });

    it('handles toggling all boolean props', () => {
      const { rerender } = setup();
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
      expect(screen.getByTestId('volume-slider')).toBeInTheDocument();
    });
  });

  describe('Re-render Behavior', () => {
    it('updates src on prop change', () => {
      const { rerender, container } = setup({ src: 'https://first.com/audio.mp3' });
      expect(container.querySelector('audio')).toHaveAttribute('src', 'https://first.com/audio.mp3');
      rerender(<RdsCompAudioPlayer {...defaultProps} src="https://second.com/audio.mp3" />);
      expect(container.querySelector('audio')).toHaveAttribute('src', 'https://second.com/audio.mp3');
    });

    it('updates type on prop change', () => {
      const { rerender, container } = playerSetup();
      expect(q(container, 'player')).toBeInTheDocument();
      rerender(<RdsCompAudioPlayer {...defaultProps} type="Collapsed" />);
      expect(q(container, 'collapsed-container')).toBeInTheDocument();
    });

    it('shows/hides settings button on prop change', () => {
      const { rerender, container } = playerSetup({ showSettings: true });
      expect(q(container, 'settings-button')).toBeInTheDocument();
      rerender(<RdsCompAudioPlayer {...defaultProps} type="Audio Player" showSettings={false} />);
      expect(q(container, 'settings-button')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('waveform trim handles have aria attributes and are keyboard accessible', () => {
      const { container } = setup({ type: 'Audio Edition' });
      container.querySelectorAll('.rds-comp-audio-player__waveform-blue-bar').forEach((bar) => {
        expect(bar).toHaveAttribute('role', 'slider');
        expect(bar).toHaveAttribute('aria-label');
        expect(bar).toHaveAttribute('tabIndex', '0');
      });
    });

    it('has no axe accessibility violations', async () => {
      const { container } = setup();
      expect(await axe(container)).toHaveNoViolations();
    }, 15000);
  });

  describe('CSS Classes', () => {
    it('applies correct classes to waveform elements', () => {
      const { container } = setup({ type: 'Audio Edition' });
      expect(q(container, 'edition-waveform')).toBeInTheDocument();
      expect(q(container, 'waveform-background')).toBeInTheDocument();
    });
  });
});

describe('audit fixes', () => {
  const { warnDeprecatedProp } = jest.requireMock('../../raaghu-elements/shared/utils/deprecation');
  const ActualEditionControls = jest.requireActual('./AudioEditionControls').AudioEditionControls;
  const ActualSettingsModal = jest.requireActual('./SettingsModalComponent').SettingsModalComponent;
  const noop = () => undefined;
  const range = () => ({ startTime: 0, endTime: 1, selectedDuration: 1 });

  afterEach(() => jest.restoreAllMocks());

  it('G3-151: renders a hidden <audio> in the editor and collapsed variants', () => {
    const { container, rerender } = render(<RdsCompAudioPlayer src="a.mp3" type="Audio Edition" />);
    expect(container.querySelector('audio')).not.toHaveAttribute('controls');
    rerender(<RdsCompAudioPlayer src="a.mp3" type="Collapsed" />);
    expect(container.querySelector('audio')).toHaveAttribute('src', 'a.mp3');
  });

  it('G3-152/153: isPlaying follows audio events and a rejected play() is caught', async () => {
    jest.spyOn(window.HTMLMediaElement.prototype, 'play').mockImplementation(() => Promise.reject(new Error('blocked')));
    const { container } = render(<RdsCompAudioPlayer src="a.mp3" />);
    const playBtn = screen.getByRole('button', { name: 'Play or pause' });
    fireEvent.click(playBtn);
    await waitFor(() => expect(playBtn).toHaveAttribute('aria-pressed', 'false'));
    const audio = container.querySelector('audio') as HTMLAudioElement;
    fireEvent.play(audio);
    expect(playBtn).toHaveAttribute('aria-pressed', 'true');
    fireEvent.ended(audio);
    expect(playBtn).toHaveAttribute('aria-pressed', 'false');
  });

  it('G3-155: passes exportItems/moreItems; defaults have no junk field', () => {
    mockFabMenuProps.length = 0;
    const items = [{ key: 'a', value: 'A', onClick: jest.fn() }];
    render(<RdsCompAudioPlayer src="a.mp3" showExport showMoreOptions exportItems={items} />);
    expect(mockFabMenuProps.find((p) => p.icon === 'share_icon').items).toBe(items);
    const defaults = mockFabMenuProps.find((p) => p.icon === 'pending_icon').items;
    expect(defaults).toHaveLength(4);
    expect(defaults[0]).not.toHaveProperty('some');
  });

  it('G3-156: Cancel/Save/Trim/Delete call their handlers with the trim range', () => {
    mockEditionProps.length = 0;
    const onCancel = jest.fn();
    const onSave = jest.fn();
    const onTrim = jest.fn();
    const onDelete = jest.fn();
    render(<RdsCompAudioPlayer src="a.mp3" type="Audio Edition" onCancel={onCancel} onSave={onSave} onTrim={onTrim} onDelete={onDelete} />);
    fireEvent.click(screen.getByTestId('rds-button-Cancel'));
    fireEvent.click(screen.getByTestId('rds-button-Save'));
    const props = mockEditionProps[mockEditionProps.length - 1];
    props.onTrim();
    props.onDelete();
    expect(onCancel).toHaveBeenCalled();
    expect(onSave).toHaveBeenCalled();
    expect(onTrim).toHaveBeenCalledWith({ start: 12, end: 108 });
    expect(onDelete).toHaveBeenCalledWith({ start: 12, end: 108 });
  });

  it('G3-156: AudioEditionControls wires Trim and Delete buttons', () => {
    const onTrim = jest.fn();
    const onDelete = jest.fn();
    render(
      <ActualEditionControls formatTime={() => ''} getSelectedTimeRange={range} togglePlayPause={noop} zoomLevel={30}
        handleZoomOut={noop} handleZoomIn={noop} handleZoomChange={noop} onTrim={onTrim} onDelete={onDelete} />
    );
    fireEvent.click(screen.getByText('Trim'));
    fireEvent.click(screen.getByText('Delete'));
    expect(onTrim).toHaveBeenCalled();
    expect(onDelete).toHaveBeenCalled();
  });

  it('G3-158: renders a custom waveform', () => {
    const { container } = render(<RdsCompAudioPlayer src="a.mp3" type="Audio Edition" waveform={[10, 20, 30]} />);
    const svg = container.querySelector('.rds-comp-audio-player__waveform-background svg') as SVGElement;
    expect(svg.querySelectorAll('rect')).toHaveLength(3);
    expect(svg).toHaveAttribute('viewBox', '0 0 24 200');
  });

  it('G3-159: controls.volume shows the volume button; controls.transcript is a deprecated alias', () => {
    const { rerender } = render(<RdsCompAudioPlayer src="a.mp3" controls={{ volume: 'visible' }} />);
    expect(screen.getByRole('button', { name: 'Toggle volume' })).toBeInTheDocument();
    rerender(<RdsCompAudioPlayer src="a.mp3" controls={{ transcript: 'visible' }} />);
    expect(screen.getByRole('button', { name: 'Toggle volume' })).toBeInTheDocument();
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsCompAudioPlayer', 'controls.transcript', '`controls.volume`');
  });

  it('G3-160: variant maps to type and wins over type', () => {
    const { container } = render(<RdsCompAudioPlayer src="a.mp3" type="Audio Player" variant="editor" />);
    expect(container.querySelector('.rds-comp-audio-player__edition-container')).toBeInTheDocument();
  });

  it('G3-165: progress slider max follows the loaded duration', () => {
    const { container } = render(<RdsCompAudioPlayer src="a.mp3" />);
    expect(screen.getByTestId('rds-slider')).toHaveAttribute('max', '120');
    const audio = container.querySelector('audio') as HTMLAudioElement;
    Object.defineProperty(audio, 'duration', { value: 60, configurable: true });
    fireEvent(audio, new Event('loadedmetadata'));
    expect(screen.getByTestId('rds-slider')).toHaveAttribute('max', '60');
  });

  it('G3-166: audio volume starts at the UI volume', () => {
    const { container } = render(<RdsCompAudioPlayer src="a.mp3" />);
    expect((container.querySelector('audio') as HTMLAudioElement).volume).toBe(0.5);
  });

  it('G3-167: listeners attach to the audio mounted after a variant switch', () => {
    const { container, rerender } = render(<RdsCompAudioPlayer src="a.mp3" type="Collapsed" />);
    rerender(<RdsCompAudioPlayer src="a.mp3" type="Audio Player" />);
    fireEvent.play(container.querySelector('audio') as HTMLAudioElement);
    expect(screen.getByRole('button', { name: 'Play or pause' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('G3-168: zoom controls have accessible names', () => {
    render(
      <ActualEditionControls formatTime={() => ''} getSelectedTimeRange={range} togglePlayPause={noop} zoomLevel={30}
        handleZoomOut={noop} handleZoomIn={noop} handleZoomChange={noop} />
    );
    expect(screen.getByRole('button', { name: 'Zoom out' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Zoom in' })).toBeInTheDocument();
    expect(screen.getByRole('slider', { name: 'Zoom' })).toBeInTheDocument();
  });

  it('G3-169: settings dialog has a role/label and closes on Escape', () => {
    const onClose = jest.fn();
    render(<ActualSettingsModal showSettingsModal playbackSpeed={1} handlePlaybackSpeedChange={noop} onClose={onClose} />);
    fireEvent.keyDown(screen.getByRole('dialog', { name: 'Playback speed settings' }), { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('G3-169: Escape closes the open settings modal', () => {
    const { container } = render(<RdsCompAudioPlayer src="a.mp3" showSettings />);
    fireEvent.click(container.querySelector('.rds-comp-audio-player__settings-button') as HTMLElement);
    expect(screen.getByTestId('settings-modal')).toHaveStyle({ display: 'block' });
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.getByTestId('settings-modal')).toHaveStyle({ display: 'none' });
  });

  it('G3-170: forwards className, ref and rest props to the root', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { container } = render(<RdsCompAudioPlayer src="a.mp3" ref={ref} className="custom" data-testid="root" />);
    const root = screen.getByTestId('root');
    expect(root).toHaveClass('rds-comp-audio-player__player', 'custom');
    expect(ref.current).toBe(root);
    expect(container.firstChild).toBe(root);
  });
});

describe('RdsCompAudioPlayer id and sx', () => {
  it('forwards id and sx to the root', () => {
    const { container } = setup({ id: 'ap', sx: { opacity: 0.5 } });
    const root = container.firstChild as HTMLElement;
    expect(root).toHaveAttribute('id', 'ap');
    expect(root).toHaveStyle({ opacity: '0.5' });
  });
  it('adds no id when omitted', () => {
    const { container } = setup();
    expect(container.firstChild).not.toHaveAttribute('id');
  });
});
