import {
  ArcElement,
  BarController,
  BarElement,
  BubbleController,
  CategoryScale,
  Chart,
  DoughnutController,
  Filler,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PieController,
  PointElement,
  PolarAreaController,
  RadarController,
  RadialLinearScale,
  ScatterController,
  Title,
  Tooltip,
} from 'chart.js';

const registered = new Set<string>();

/** Registers Chart.js parts once per bundle (idempotent). */
function registerChartParts(key: string, ...items: Parameters<typeof Chart.register>): void {
  if (registered.has(key)) {
    return;
  }
  Chart.register(...items);
  registered.add(key);
}

const cartesianScales = [CategoryScale, LinearScale] as const;
const commonPlugins = [Legend, Tooltip, Title, Filler] as const;

/** Bar and stacked bar charts. */
export function registerBarChart(): void {
  registerChartParts('bar', BarController, BarElement, ...cartesianScales, ...commonPlugins);
}

/** Line chart. */
export function registerLineChart(): void {
  registerChartParts('line', LineController, LineElement, PointElement, ...cartesianScales, ...commonPlugins);
}

/** Area chart (filled line). */
export function registerAreaChart(): void {
  registerChartParts('area', LineController, LineElement, PointElement, ...cartesianScales, ...commonPlugins);
}

/** Mixed bar + line on one cartesian axis. */
export function registerMixedChart(): void {
  registerChartParts(
    'mixed',
    BarController,
    BarElement,
    LineController,
    LineElement,
    PointElement,
    ...cartesianScales,
    ...commonPlugins,
  );
}

/** Pie chart. */
export function registerPieChart(): void {
  registerChartParts('pie', PieController, ArcElement, Legend, Tooltip, Title);
}

/** Doughnut, boolean, and gauge charts. */
export function registerDoughnutChart(): void {
  registerChartParts('doughnut', DoughnutController, ArcElement, Legend, Tooltip, Title);
}

/** Polar area chart. */
export function registerPolarAreaChart(): void {
  registerChartParts(
    'polarArea',
    PolarAreaController,
    ArcElement,
    RadialLinearScale,
    Legend,
    Tooltip,
    Title,
  );
}

/** Radar chart. */
export function registerRadarChart(): void {
  registerChartParts(
    'radar',
    RadarController,
    LineElement,
    PointElement,
    RadialLinearScale,
    Legend,
    Tooltip,
    Title,
    Filler,
  );
}

/** Scatter chart. */
export function registerScatterChart(): void {
  registerChartParts('scatter', ScatterController, PointElement, LinearScale, Legend, Tooltip, Title);
}

/** Bubble chart. */
export function registerBubbleChart(): void {
  registerChartParts('bubble', BubbleController, PointElement, LinearScale, Legend, Tooltip, Title);
}