import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsCompFunnelChart from "./rds-comp-chart-funnel";

jest.mock("./rds-comp-chart-funnel.scss", () => ({}));

const mockFunnelChart = jest.fn((props) => (
  <div data-testid="mui-funnel-chart" data-gap={props.gap} />
));

jest.mock("@mui/x-charts-pro/FunnelChart", () => ({
  FunnelChart: (props: any) => mockFunnelChart(props),
}), { virtual: true });

const defaultProps = {
  series: [
    {
      curve: "bump",
      variant: "filled",
      data: [
        { label: "Visitors", value: 1200, color: "#60a5fa" },
        { label: "Leads", value: 740, color: "#3b82f6" },
        { label: "Qualified", value: 420, color: "#2563eb" },
      ],
    },
  ],
  gap: 0,
  id: "funnel-chart-1",
};

beforeEach(() => {
  mockFunnelChart.mockClear();
});

describe("RdsCompFunnelChart", () => {
  describe("Basic Rendering", () => {
    it("renders the component without crashing", () => {
      const { container } = render(<RdsCompFunnelChart {...defaultProps} />);
      expect(container).toBeInTheDocument();
    });

    it("renders with correct display name", () => {
      expect(RdsCompFunnelChart.displayName).toBe("RdsCompFunnelChart");
    });

    it("renders wrapper with correct class", () => {
      const { container } = render(<RdsCompFunnelChart {...defaultProps} />);
      const wrapper = container.querySelector(".rds-comp-chart-funnel");
      expect(wrapper).toBeInTheDocument();
    });

    it("renders a canvas with id and data-testid", () => {
      render(<RdsCompFunnelChart {...defaultProps} />);
      const wrapper = screen.getByTestId("funnel-chart-1");
      expect(wrapper).toHaveAttribute("id", "funnel-chart-1");
      expect(screen.getByTestId("mui-funnel-chart")).toBeInTheDocument();
    });
  });

  describe("Props Handling", () => {
    it("passes series to MUI FunnelChart", () => {
      render(
        <RdsCompFunnelChart
          {...defaultProps}
          series={[
            {
              curve: "bump",
              variant: "filled",
              data: [
                { label: "Stage 1", value: 600, color: "#22c55e" },
                { label: "Stage 2", value: 300, color: "#16a34a" },
                { label: "Stage 3", value: 90, color: "#15803d" },
              ],
            },
          ]}
        />
      );
      expect(screen.getByTestId("mui-funnel-chart")).toBeInTheDocument();
      expect(mockFunnelChart).toHaveBeenCalled();
    });

    it("passes gap to MUI FunnelChart", () => {
      render(<RdsCompFunnelChart {...defaultProps} gap={6} />);
      expect(screen.getByTestId("mui-funnel-chart")).toHaveAttribute("data-gap", "6");
    });

    it("maps legacy labels and dataSets to MUI funnel series", () => {
      render(
        <RdsCompFunnelChart
          id="legacy-funnel"
          labels={["A", "B", "C"]}
          dataSets={[
            {
              data: [100, 60, 20],
              backgroundColor: ["#111111", "#222222", "#333333"],
            },
          ]}
        />
      );

      expect(mockFunnelChart).toHaveBeenCalled();
      const calledWith = mockFunnelChart.mock.calls[0][0];
      expect(calledWith.series[0].data[0]).toEqual({ label: "A", value: 100, color: "#111111" });
      expect(calledWith.series[0].data[2]).toEqual({ label: "C", value: 20, color: "#333333" });
    });
  });

  describe("MUI Integration", () => {
    it("uses default gap as 0 when gap prop is not provided", () => {
      render(<RdsCompFunnelChart id="default-gap" series={defaultProps.series} />);
      const calledWith = mockFunnelChart.mock.calls[0][0];
      expect(calledWith.gap).toBe(0);
    });
  });
});
