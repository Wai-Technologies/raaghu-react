import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Chart from 'chart.js/auto';
import { useChart, type UseChartConfig } from './use-chart';

const mockDestroy = jest.fn();
const mockUpdate = jest.fn();

jest.mock('chart.js/auto', () =>
  jest.fn().mockImplementation((_ctx, config) => ({
    canvas: { style: {} },
    config,
    data: config.data,
    options: config.options,
    destroy: mockDestroy,
    update: mockUpdate,
  }))
);

const ChartMock = Chart as unknown as jest.Mock;

type Datasets = { data: number[]; backgroundColor: string }[];

const TestChart = ({ datasets }: { datasets: Datasets }) => {
  const { canvasRef } = useChart({ type: 'bar', labels: ['a', 'b'], datasets }, [datasets]);
  return <canvas ref={canvasRef} data-testid="chart" />;
};

const TypedChart = ({ type }: { type: 'bar' | 'line' }) => {
  const { canvasRef } = useChart({ type, datasets: [{ data: [1] }] } as UseChartConfig<'bar' | 'line'>, [type]);
  return <canvas ref={canvasRef} />;
};

const KeyedChart = ({ canvasKey }: { canvasKey: string }) => {
  const { canvasRef } = useChart({ type: 'bar', datasets: [{ data: [1] }] }, [canvasKey]);
  return <canvas key={canvasKey} ref={canvasRef} />;
};

describe('audit fixes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .spyOn(HTMLCanvasElement.prototype, 'getContext')
      .mockReturnValue({} as unknown as ReturnType<HTMLCanvasElement['getContext']>);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('does not mutate consumer datasets and passes a resolved copy to Chart', () => {
    document.documentElement.style.setProperty('--x', '#123456');
    const datasets = [{ data: [1, 2], backgroundColor: 'var(--x)' }];
    render(<TestChart datasets={datasets} />);

    expect(datasets[0].backgroundColor).toBe('var(--x)');
    const config = ChartMock.mock.calls[0][1];
    expect(config.data.datasets[0]).not.toBe(datasets[0]);
    expect(config.data.datasets[0].backgroundColor).toBe('#123456');
    expect(config.data.datasets[0].data).toEqual([1, 2]);
    document.documentElement.style.removeProperty('--x');
  });

  it('destroys the chart on unmount', () => {
    const { unmount } = render(<TestChart datasets={[{ data: [1], backgroundColor: 'red' }]} />);
    expect(mockDestroy).not.toHaveBeenCalled();
    unmount();
    expect(mockDestroy).toHaveBeenCalledTimes(1);
  });
});

describe('create once, update in place (RDS-067 / RDS-068)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .spyOn(HTMLCanvasElement.prototype, 'getContext')
      .mockReturnValue({} as unknown as ReturnType<HTMLCanvasElement['getContext']>);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('keeps a single Chart across rerenders with equal (but not identical) props', () => {
    const { rerender } = render(<TestChart datasets={[{ data: [1, 2], backgroundColor: 'red' }]} />);
    expect(ChartMock).toHaveBeenCalledTimes(1);

    rerender(<TestChart datasets={[{ data: [1, 2], backgroundColor: 'red' }]} />);
    rerender(<TestChart datasets={[{ data: [1, 2], backgroundColor: 'red' }]} />);

    expect(ChartMock).toHaveBeenCalledTimes(1);
    expect(mockUpdate).not.toHaveBeenCalled();
    expect(mockDestroy).not.toHaveBeenCalled();
  });

  it('updates the existing chart in place when data changes', () => {
    const { rerender } = render(<TestChart datasets={[{ data: [1, 2], backgroundColor: 'red' }]} />);
    const chart = ChartMock.mock.results[0].value;

    rerender(<TestChart datasets={[{ data: [3, 4], backgroundColor: 'red' }]} />);

    expect(ChartMock).toHaveBeenCalledTimes(1);
    expect(mockDestroy).not.toHaveBeenCalled();
    expect(mockUpdate).toHaveBeenCalledTimes(1);
    expect(mockUpdate).toHaveBeenCalledWith('none');
    expect(chart.data.datasets[0].data).toEqual([3, 4]);
    expect(chart.data.labels).toEqual(['a', 'b']);
  });

  it('recreates the chart only when the type changes', () => {
    const { rerender } = render(<TypedChart type="bar" />);
    expect(ChartMock).toHaveBeenCalledTimes(1);

    rerender(<TypedChart type="line" />);

    expect(mockDestroy).toHaveBeenCalledTimes(1);
    expect(ChartMock).toHaveBeenCalledTimes(2);
    expect(ChartMock.mock.calls[1][1].type).toBe('line');
    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it('recreates the chart when the canvas element remounts', () => {
    const { rerender } = render(<KeyedChart canvasKey="one" />);
    rerender(<KeyedChart canvasKey="two" />);

    expect(mockDestroy).toHaveBeenCalledTimes(1);
    expect(ChartMock).toHaveBeenCalledTimes(2);
  });

  it('destroys only once, on unmount, after in-place updates', () => {
    const { rerender, unmount } = render(<TestChart datasets={[{ data: [1], backgroundColor: 'red' }]} />);
    rerender(<TestChart datasets={[{ data: [2], backgroundColor: 'red' }]} />);
    expect(mockDestroy).not.toHaveBeenCalled();

    unmount();
    expect(mockDestroy).toHaveBeenCalledTimes(1);
    expect(ChartMock).toHaveBeenCalledTimes(1);
  });

  it('omits plugins when none are given and recreates if they appear later', () => {
    const MaybePlugin = ({ withPlugin }: { withPlugin: boolean }) => {
      const { canvasRef } = useChart(
        {
          type: 'doughnut',
          datasets: [{ data: [1] }],
          ...(withPlugin && { plugins: [{ id: 'p' }] as never }),
        },
        [withPlugin]
      );
      return <canvas ref={canvasRef} />;
    };
    const { rerender } = render(<MaybePlugin withPlugin={false} />);
    expect(ChartMock.mock.calls[0][1].plugins).toBeUndefined();

    rerender(<MaybePlugin withPlugin />);
    expect(ChartMock).toHaveBeenCalledTimes(2);
    expect(ChartMock.mock.calls[1][1].plugins).toHaveLength(1);
  });

  it('refreshes plugins in place so their closures stay current', () => {
    const makePlugin = (title: string) => ({ id: 'center', title });
    const PluginChart = ({ title }: { title: string }) => {
      const { canvasRef } = useChart(
        { type: 'doughnut', datasets: [{ data: [1] }], plugins: [makePlugin(title)] as never },
        [title]
      );
      return <canvas ref={canvasRef} />;
    };
    const { rerender } = render(<PluginChart title="A" />);
    const passedPlugins = ChartMock.mock.calls[0][1].plugins;
    expect(passedPlugins[0].title).toBe('A');

    rerender(<PluginChart title="B" />);

    expect(ChartMock).toHaveBeenCalledTimes(1);
    expect(passedPlugins[0].title).toBe('B');
  });
});
