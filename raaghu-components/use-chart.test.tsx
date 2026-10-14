import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Chart from 'chart.js/auto';
import { useChart } from './use-chart';

const mockDestroy = jest.fn();

jest.mock('chart.js/auto', () =>
  jest.fn().mockImplementation(() => ({
    canvas: { style: {} },
    destroy: mockDestroy,
  }))
);

const TestChart = ({ datasets }: { datasets: { data: number[]; backgroundColor: string }[] }) => {
  const { canvasRef } = useChart({ type: 'bar', labels: ['a', 'b'], datasets }, [datasets]);
  return <canvas ref={canvasRef} data-testid="chart" />;
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
    const datasets = [{ data: [1, 2], backgroundColor: 'var(--x, #123456)' }];
    render(<TestChart datasets={datasets} />);

    expect(datasets[0].backgroundColor).toBe('var(--x, #123456)');
    const config = (Chart as unknown as jest.Mock).mock.calls[0][1];
    expect(config.data.datasets[0]).not.toBe(datasets[0]);
    expect(config.data.datasets[0].backgroundColor).toBe('#123456');
    expect(config.data.datasets[0].data).toEqual([1, 2]);
  });

  it('destroys the chart on unmount', () => {
    const { unmount } = render(<TestChart datasets={[{ data: [1], backgroundColor: 'red' }]} />);
    expect(mockDestroy).not.toHaveBeenCalled();
    unmount();
    expect(mockDestroy).toHaveBeenCalledTimes(1);
  });
});
