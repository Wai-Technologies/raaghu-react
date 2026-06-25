import React from 'react';
import { render, screen } from '@testing-library/react';
import RdsCompVideoPlayer, {
  VideoPlayerType,
  RdsVideoPlayerProps,
} from './rds-comp-video-player';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

// Mock SCSS
jest.mock('./rds-comp-video-player.scss', () => ({}));

// Mock ReactPlayer
jest.mock('react-player', () => {
  return function MockReactPlayer({
    url,
    playing,
    muted,
    controls,
    volume,
    config,
    width,
    height,
    style,
    className,
  }: any) {
    return (
      <div
        data-testid="react-player"
        data-url={url}
        data-playing={playing}
        data-muted={muted}
        data-controls={controls}
        data-volume={volume}
        data-config={JSON.stringify(config)}
        data-width={width}
        data-height={height}
        data-style={JSON.stringify(style || { width, height })}
        className={className}
      >
        Video Player
      </div>
    );
  };
});

describe('RdsCompVideoPlayer', () => {
  const defaultProps: RdsVideoPlayerProps = {
    videoLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    type: VideoPlayerType.YouTube,
  };

  describe('Basic Rendering', () => {
    it('should render component without crashing', async () => {
      render(<RdsCompVideoPlayer {...defaultProps} />);
      expect(await screen.findByTestId('react-player')).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsCompVideoPlayer.displayName).toBe('RdsCompVideoPlayer');
    });

    it('should render with base class', () => {
      const { container } = render(<RdsCompVideoPlayer {...defaultProps} />);
      expect(container.querySelector('.rds-comp-video-player')).toBeInTheDocument();
    });

    it('should render video player wrapper', () => {
      const { container } = render(<RdsCompVideoPlayer {...defaultProps} />);
      expect(container.querySelector('.rds-comp-video-player__wrapper')).toBeInTheDocument();
    });

    it('should render ReactPlayer component', () => {
      render(<RdsCompVideoPlayer {...defaultProps} />);
      const player = screen.getByTestId('react-player');
      expect(player).toBeInTheDocument();
      expect(player).toHaveClass('rds-comp-video-player__player');
    });

    it('should not render disabled overlay when disabled is false', () => {
      const { container } = render(
        <RdsCompVideoPlayer {...defaultProps} disabled={false} />
      );
      const overlay = container.querySelector('.rds-comp-video-player__overlay');
      expect(overlay).not.toBeInTheDocument();
    });
  });

  describe('Video Type Variants', () => {
    it('should handle YouTube type', () => {
      render(
        <RdsCompVideoPlayer
          {...defaultProps}
          videoLink="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          type={VideoPlayerType.YouTube}
        />
      );
      const player = screen.getByTestId('react-player');
      expect(player).toHaveAttribute('data-url', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    });

    it('should handle Vimeo type', () => {
      render(
        <RdsCompVideoPlayer
          {...defaultProps}
          videoLink="https://vimeo.com/123456789"
          type={VideoPlayerType.Vimeo}
        />
      );
      const player = screen.getByTestId('react-player');
      expect(player).toHaveAttribute('data-url', 'https://vimeo.com/123456789');
    });

    it('should handle Default type', () => {
      render(
        <RdsCompVideoPlayer
          {...defaultProps}
          videoLink="https://example.com/video.mp4"
          type={VideoPlayerType.Default}
        />
      );
      const player = screen.getByTestId('react-player');
      expect(player).toHaveAttribute('data-url', 'https://example.com/video.mp4');
    });
  });

  describe('YouTube URL Handling', () => {
    it('should format standard YouTube URL', () => {
      render(
        <RdsCompVideoPlayer
          {...defaultProps}
          videoLink="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        />
      );
      const player = screen.getByTestId('react-player');
      expect(player).toHaveAttribute('data-url', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    });

    it('should format youtu.be shortened URL', () => {
      render(
        <RdsCompVideoPlayer
          {...defaultProps}
          videoLink="https://youtu.be/dQw4w9WgXcQ"
        />
      );
      const player = screen.getByTestId('react-player');
      expect(player).toHaveAttribute('data-url', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    });

    it('should format YouTube embed URL', () => {
      render(
        <RdsCompVideoPlayer
          {...defaultProps}
          videoLink="https://www.youtube.com/embed/dQw4w9WgXcQ"
        />
      );
      const player = screen.getByTestId('react-player');
      expect(player).toHaveAttribute('data-url', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    });

    it('should handle YouTube URL with query parameters', () => {
      render(
        <RdsCompVideoPlayer
          {...defaultProps}
          videoLink="https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=10s"
        />
      );
      const player = screen.getByTestId('react-player');
      expect(player).toHaveAttribute('data-url', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    });

    it('should set correct YouTube player config', () => {
      render(
        <RdsCompVideoPlayer
          {...defaultProps}
          videoLink="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          controls={true}
        />
      );
      const player = screen.getByTestId('react-player');
      const config = JSON.parse(player.dataset.config || '{}');
      expect(config.youtube).toBeDefined();
      expect(config.youtube.playerVars.modestbranding).toBe(1);
      expect(config.youtube.playerVars.rel).toBe(0);
    });
  });

  describe('Vimeo URL Handling', () => {
    it('should detect Vimeo URL and format correctly', () => {
      render(
        <RdsCompVideoPlayer
          {...defaultProps}
          videoLink="https://vimeo.com/123456789"
        />
      );
      const player = screen.getByTestId('react-player');
      expect(player).toHaveAttribute('data-url', 'https://vimeo.com/123456789');
    });

    it('should set correct Vimeo player config', () => {
      render(
        <RdsCompVideoPlayer
          {...defaultProps}
          videoLink="https://vimeo.com/123456789"
          controls={true}
        />
      );
      const player = screen.getByTestId('react-player');
      const config = JSON.parse(player.dataset.config || '{}');
      expect(config.vimeo).toBeDefined();
      expect(config.vimeo.playerOptions.title).toBe(false);
      expect(config.vimeo.playerOptions.byline).toBe(false);
      expect(config.vimeo.playerOptions.portrait).toBe(false);
    });

    it('should handle Vimeo type with Vimeo URL', () => {
      render(
        <RdsCompVideoPlayer
          {...defaultProps}
          videoLink="https://vimeo.com/123456789"
          type={VideoPlayerType.Vimeo}
        />
      );
      const player = screen.getByTestId('react-player');
      const config = JSON.parse(player.dataset.config || '{}');
      expect(config.vimeo).toBeDefined();
    });
  });

  describe('Controls Prop', () => {
    it('should render with controls enabled by default', () => {
      render(<RdsCompVideoPlayer {...defaultProps} />);
      const player = screen.getByTestId('react-player');
      expect(player).toHaveAttribute('data-controls', 'true');
    });

    it('should disable controls when controls is false', () => {
      render(<RdsCompVideoPlayer {...defaultProps} controls={false} />);
      const player = screen.getByTestId('react-player');
      expect(player).toHaveAttribute('data-controls', 'false');
    });

    it('should pass controls to YouTube config', () => {
      render(
        <RdsCompVideoPlayer
          {...defaultProps}
          videoLink="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          controls={true}
        />
      );
      const player = screen.getByTestId('react-player');
      const config = JSON.parse(player.dataset.config || '{}');
      expect(config.youtube.playerVars.controls).toBe(1);
    });

    it('should disable YouTube controls when controls is false', () => {
      render(
        <RdsCompVideoPlayer
          {...defaultProps}
          videoLink="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          controls={false}
        />
      );
      const player = screen.getByTestId('react-player');
      const config = JSON.parse(player.dataset.config || '{}');
      expect(config.youtube.playerVars.controls).toBe(0);
    });
  });

  describe('Autoplay Prop', () => {
    it('should not autoplay by default', () => {
      render(<RdsCompVideoPlayer {...defaultProps} />);
      const player = screen.getByTestId('react-player');
      expect(player).toHaveAttribute('data-playing', 'false');
    });

    it('should autoplay when autoplay is true', () => {
      render(<RdsCompVideoPlayer {...defaultProps} autoplay={true} />);
      const player = screen.getByTestId('react-player');
      expect(player).toHaveAttribute('data-playing', 'true');
    });

    it('should not autoplay when disabled even if autoplay is true', () => {
      render(
        <RdsCompVideoPlayer
          {...defaultProps}
          autoplay={true}
          disabled={true}
        />
      );
      const player = screen.getByTestId('react-player');
      expect(player).toHaveAttribute('data-playing', 'false');
    });
  });

  describe('Muted Prop', () => {
    it('should not be muted by default', () => {
      render(<RdsCompVideoPlayer {...defaultProps} />);
      const player = screen.getByTestId('react-player');
      expect(player).toHaveAttribute('data-muted', 'false');
    });

    it('should be muted when muted is true', () => {
      render(<RdsCompVideoPlayer {...defaultProps} muted={true} />);
      const player = screen.getByTestId('react-player');
      expect(player).toHaveAttribute('data-muted', 'true');
    });
  });

  describe('Volume Prop', () => {
    it('should have default volume of 0.8', () => {
      render(<RdsCompVideoPlayer {...defaultProps} />);
      const player = screen.getByTestId('react-player');
      expect(player).toHaveAttribute('data-volume', '0.8');
    });

    it('should set custom volume', () => {
      render(<RdsCompVideoPlayer {...defaultProps} volume={0.5} />);
      const player = screen.getByTestId('react-player');
      expect(player).toHaveAttribute('data-volume', '0.5');
    });

    it('should handle maximum volume', () => {
      render(<RdsCompVideoPlayer {...defaultProps} volume={1} />);
      const player = screen.getByTestId('react-player');
      expect(player).toHaveAttribute('data-volume', '1');
    });

    it('should handle minimum volume', () => {
      render(<RdsCompVideoPlayer {...defaultProps} volume={0} />);
      const player = screen.getByTestId('react-player');
      expect(player).toHaveAttribute('data-volume', '0');
    });
  });

  describe('Dimensions Props', () => {
    it('should render with default width and height', () => {
      render(<RdsCompVideoPlayer {...defaultProps} />);
      const player = screen.getByTestId('react-player');
      const style = JSON.parse(player.dataset.style || '{}');
      expect(style.width).toBe('100%');
      expect(style.height).toBe('auto');
    });

    it('should set custom width', () => {
      render(<RdsCompVideoPlayer {...defaultProps} width="800px" />);
      const player = screen.getByTestId('react-player');
      const style = JSON.parse(player.dataset.style || '{}');
      expect(style.width).toBe('800px');
    });

    it('should set custom height', () => {
      render(<RdsCompVideoPlayer {...defaultProps} height="600px" />);
      const player = screen.getByTestId('react-player');
      const style = JSON.parse(player.dataset.style || '{}');
      expect(style.height).toBe('600px');
    });

    it('should handle numeric width', () => {
      render(<RdsCompVideoPlayer {...defaultProps} width={800} />);
      const player = screen.getByTestId('react-player');
      const style = JSON.parse(player.dataset.style || '{}');
      expect(style.width).toBe(800);
    });

    it('should handle numeric height', () => {
      render(<RdsCompVideoPlayer {...defaultProps} height={600} />);
      const player = screen.getByTestId('react-player');
      const style = JSON.parse(player.dataset.style || '{}');
      expect(style.height).toBe(600);
    });

    it('should render player with default dimensions', () => {
      render(<RdsCompVideoPlayer {...defaultProps} />);
      const player = screen.getByTestId('react-player');
      expect(player).toHaveAttribute('data-width', '100%');
      expect(player).toHaveAttribute('data-height', 'auto');
    });
  });

  describe('Disabled State', () => {
    it('should add disabled class when disabled is true', () => {
      const { container } = render(
        <RdsCompVideoPlayer {...defaultProps} disabled={true} />
      );
      const mainDiv = container.querySelector('.rds-comp-video-player');
      expect(mainDiv).toHaveClass('rds-comp-video-player--disabled');
    });

    it('should not add disabled class when disabled is false', () => {
      const { container } = render(
        <RdsCompVideoPlayer {...defaultProps} disabled={false} />
      );
      const mainDiv = container.querySelector('.rds-comp-video-player');
      expect(mainDiv).not.toHaveClass('rds-comp-video-player--disabled');
    });

    it('should render overlay when disabled is true', () => {
      const { container } = render(
        <RdsCompVideoPlayer {...defaultProps} disabled={true} />
      );
      const overlay = container.querySelector('.rds-comp-video-player__overlay');
      expect(overlay).toBeInTheDocument();
    });

    it('should display disabled message', () => {
      render(<RdsCompVideoPlayer {...defaultProps} disabled={true} />);
      expect(screen.getByText('Video player is disabled')).toBeInTheDocument();
    });

    it('should not autoplay when disabled', () => {
      render(
        <RdsCompVideoPlayer
          {...defaultProps}
          autoplay={true}
          disabled={true}
        />
      );
      const player = screen.getByTestId('react-player');
      expect(player).toHaveAttribute('data-playing', 'false');
    });
  });

  describe('Custom ClassName', () => {
    it('should apply custom className', () => {
      const { container } = render(
        <RdsCompVideoPlayer {...defaultProps} className="custom-class" />
      );
      const mainDiv = container.querySelector('.rds-comp-video-player');
      expect(mainDiv).toHaveClass('custom-class');
    });

    it('should maintain base classes with custom className', () => {
      const { container } = render(
        <RdsCompVideoPlayer {...defaultProps} className="custom-class" />
      );
      const mainDiv = container.querySelector('.rds-comp-video-player');
      expect(mainDiv).toHaveClass('rds-comp-video-player');
      expect(mainDiv).toHaveClass('custom-class');
    });

    it('should combine disabled and custom classes', () => {
      const { container } = render(
        <RdsCompVideoPlayer
          {...defaultProps}
          disabled={true}
          className="custom-class"
        />
      );
      const mainDiv = container.querySelector('.rds-comp-video-player');
      expect(mainDiv).toHaveClass('rds-comp-video-player--disabled');
      expect(mainDiv).toHaveClass('custom-class');
    });
  });

  describe('Props Validation', () => {
    it('should render with minimal required props', () => {
      render(<RdsCompVideoPlayer videoLink="https://example.com/video.mp4" />);
      expect(screen.getByTestId('react-player')).toBeInTheDocument();
    });

    it('should handle empty videoLink', () => {
      render(<RdsCompVideoPlayer videoLink="" />);
      const player = screen.getByTestId('react-player');
      expect(player).toHaveAttribute('data-url', '');
    });

    it('should handle undefined optional props', () => {
      render(
        <RdsCompVideoPlayer
          videoLink="https://example.com/video.mp4"
          width={undefined}
          height={undefined}
          controls={undefined}
        />
      );
      expect(screen.getByTestId('react-player')).toBeInTheDocument();
    });
  });

  describe('Combined Props Tests', () => {
    it('should render video with all props customized', () => {
      render(
        <RdsCompVideoPlayer
          videoLink="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          type={VideoPlayerType.YouTube}
          width="1280px"
          height="720px"
          autoplay={true}
          muted={true}
          controls={false}
          volume={0.5}
          className="fullscreen-player"
          disabled={false}
        />
      );

      const player = screen.getByTestId('react-player');
      expect(player).toHaveAttribute('data-playing', 'true');
      expect(player).toHaveAttribute('data-muted', 'true');
      expect(player).toHaveAttribute('data-controls', 'false');
      expect(player).toHaveAttribute('data-volume', '0.5');
    });

    it('should handle disabled state with all other props', () => {
      render(
        <RdsCompVideoPlayer
          videoLink="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          autoplay={true}
          muted={false}
          volume={1}
          disabled={true}
        />
      );

      const player = screen.getByTestId('react-player');
      expect(player).toHaveAttribute('data-playing', 'false');
      const { container } = render(
        <RdsCompVideoPlayer
          videoLink="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          disabled={true}
        />
      );
      expect(container.querySelector('.rds-comp-video-player--disabled')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle invalid YouTube URL', () => {
      render(
        <RdsCompVideoPlayer
          {...defaultProps}
          videoLink="https://www.youtube.com/watch?v=invalid"
        />
      );
      const player = screen.getByTestId('react-player');
      expect(player).toHaveAttribute('data-url', 'https://www.youtube.com/watch?v=invalid');
    });

    it('should handle video URL with special characters', () => {
      render(
        <RdsCompVideoPlayer
          {...defaultProps}
          videoLink="https://example.com/video?title=Test&format=1080p"
        />
      );
      expect(screen.getByTestId('react-player')).toBeInTheDocument();
    });

    it('should handle very long video URL', () => {
      const longUrl = 'https://example.com/' + 'a'.repeat(500) + '.mp4';
      render(<RdsCompVideoPlayer {...defaultProps} videoLink={longUrl} />);
      expect(screen.getByTestId('react-player')).toBeInTheDocument();
    });

    it('should handle protocol-relative URL', () => {
      render(
        <RdsCompVideoPlayer {...defaultProps} videoLink="//example.com/video.mp4" />
      );
      expect(screen.getByTestId('react-player')).toBeInTheDocument();
    });

    it('should handle volume outside normal range', () => {
      render(<RdsCompVideoPlayer {...defaultProps} volume={1.5} />);
      const player = screen.getByTestId('react-player');
      expect(player).toHaveAttribute('data-volume', '1.5');
    });
  });

  describe('Player Configuration', () => {
    it('should set player style correctly', () => {
      render(
        <RdsCompVideoPlayer
          {...defaultProps}
          width="640px"
          height="360px"
        />
      );
      const player = screen.getByTestId('react-player');
      const style = JSON.parse(player.dataset.style || '{}');
      expect(style).toHaveProperty('width', '640px');
      expect(style).toHaveProperty('height', '360px');
    });

    it('should set default player config for non-YouTube/Vimeo URLs', () => {
      render(
        <RdsCompVideoPlayer
          {...defaultProps}
          videoLink="https://example.com/video.mp4"
          type={VideoPlayerType.Default}
        />
      );
      const player = screen.getByTestId('react-player');
      const config = JSON.parse(player.dataset.config || '{}');
      expect(config.file).toBeDefined();
    });

    it('should use type to determine player config', () => {
      const { rerender } = render(
        <RdsCompVideoPlayer
          videoLink="https://example.com/video.mp4"
          type={VideoPlayerType.Default}
        />
      );

      let player = screen.getByTestId('react-player');
      let config = JSON.parse(player.dataset.config || '{}');
      expect(config.file).toBeDefined();

      rerender(
        <RdsCompVideoPlayer
          videoLink="https://vimeo.com/123456789"
          type={VideoPlayerType.Vimeo}
        />
      );

      player = screen.getByTestId('react-player');
      config = JSON.parse(player.dataset.config || '{}');
      expect(config.vimeo).toBeDefined();
    });
  });

  describe('Default Props', () => {
    it('should use default width of 100%', () => {
      render(<RdsCompVideoPlayer videoLink="https://example.com/video.mp4" />);
      const player = screen.getByTestId('react-player');
      const style = JSON.parse(player.dataset.style || '{}');
      expect(style.width).toBe('100%');
    });

    it('should use default height of auto', () => {
      render(<RdsCompVideoPlayer videoLink="https://example.com/video.mp4" />);
      const player = screen.getByTestId('react-player');
      const style = JSON.parse(player.dataset.style || '{}');
      expect(style.height).toBe('auto');
    });

    it('should use default autoplay of false', () => {
      render(<RdsCompVideoPlayer videoLink="https://example.com/video.mp4" />);
      const player = screen.getByTestId('react-player');
      expect(player).toHaveAttribute('data-playing', 'false');
    });

    it('should use default muted of false', () => {
      render(<RdsCompVideoPlayer videoLink="https://example.com/video.mp4" />);
      const player = screen.getByTestId('react-player');
      expect(player).toHaveAttribute('data-muted', 'false');
    });

    it('should use default controls of true', () => {
      render(<RdsCompVideoPlayer videoLink="https://example.com/video.mp4" />);
      const player = screen.getByTestId('react-player');
      expect(player).toHaveAttribute('data-controls', 'true');
    });

    it('should use default volume of 0.8', () => {
      render(<RdsCompVideoPlayer videoLink="https://example.com/video.mp4" />);
      const player = screen.getByTestId('react-player');
      expect(player).toHaveAttribute('data-volume', '0.8');
    });

    it('should use default type of Default', () => {
      render(
        <RdsCompVideoPlayer
          videoLink="https://example.com/video.mp4"
          type={VideoPlayerType.Default}
        />
      );
      expect(screen.getByTestId('react-player')).toBeInTheDocument();
    });

    it('should use default disabled of false', () => {
      const { container } = render(
        <RdsCompVideoPlayer videoLink="https://example.com/video.mp4" />
      );
      const mainDiv = container.querySelector('.rds-comp-video-player');
      expect(mainDiv).not.toHaveClass('rds-comp-video-player--disabled');
    });

    it('should use default className of empty string', () => {
      const { container } = render(
        <RdsCompVideoPlayer videoLink="https://example.com/video.mp4" />
      );
      const mainDiv = container.querySelector('.rds-comp-video-player');
      expect(mainDiv).toHaveClass('rds-comp-video-player');
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsCompVideoPlayer {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
