import React from "react";
import '@testing-library/jest-dom';
import { render } from "@testing-library/react";
import { RdsVideoPlayer } from "../src";
import { RdsVideoPlayerProps } from "../src/rds-video-player/rds-video-player";

// Import the jest-dom library
import '@testing-library/jest-dom';

jest.mock('lottie-web');
jest.mock('react-lottie-player', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock the useTranslation hook
jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe("RdsVideoPlayer", () => {
  const defaultProps: RdsVideoPlayerProps = {
    width: "640px",
    height: "360px",
    autoplay: false,
    muted: true,
    videoLink: "https://example.com/video.mp4",
  };

  it("renders without crashing", () => {
    const { container } = render(<RdsVideoPlayer {...defaultProps} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
