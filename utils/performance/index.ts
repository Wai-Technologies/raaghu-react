/**
 * Performance monitoring and optimization utilities for Raaghu Design System
 */

const isDev = typeof process === 'undefined' || process.env?.NODE_ENV !== 'production';

/** Oldest metrics are dropped beyond this many entries so the buffer cannot grow forever. */
const MAX_METRICS = 500;

export interface PerformanceMetrics {
  componentName: string;
  renderTime: number;
  duration: number;
  timestamp: number;
}

export class PerformanceMonitor {
  private static metrics: PerformanceMetrics[] = [];
  private static isEnabled = true;

  static enable(): void {
    this.isEnabled = true;
  }

  static disable(): void {
    this.isEnabled = false;
  }

  static recordMetric(componentName: string, duration: number): void {
    if (!this.isEnabled) return;

    this.metrics.push({ componentName, renderTime: performance.now(), duration, timestamp: Date.now() });
    if (this.metrics.length > MAX_METRICS) this.metrics.shift();

    if (isDev && duration > 16) {
      console.warn(`Slow render detected: ${componentName} took ${duration}ms`);
    }
  }

  static getMetrics(): PerformanceMetrics[] {
    return [...this.metrics];
  }

  static clearMetrics(): void {
    this.metrics = [];
  }

  static getAverageRenderTime(componentName: string): number {
    const componentMetrics = this.metrics.filter(m => m.componentName === componentName);
    if (componentMetrics.length === 0) return 0;
    return componentMetrics.reduce((sum, m) => sum + m.duration, 0) / componentMetrics.length;
  }

  static getSlowComponents(threshold = 16): string[] {
    return [...new Set(this.metrics.filter(m => m.duration > threshold).map(m => m.componentName))];
  }
}

export class BundleSizeAnalyzer {
  /**
   * @deprecated Returns a random mock size, not a real measurement. Use the `size-limit` script instead.
   */
  static async analyzeComponent(_componentName: string): Promise<number> {
    return new Promise((resolve) => setTimeout(() => resolve(Math.random() * 50000), 100));
  }

  static async getBundleSizeReport(): Promise<Record<string, number>> {
    const components = ['RdsButton', 'RdsCard', 'RdsModal', 'RdsTable', 'RdsForm'];
    const entries = await Promise.all(
      components.map(async (component) => [component, await this.analyzeComponent(component)] as const)
    );

    return Object.fromEntries(entries);
  }
}

export class MemoryLeakDetector {
  private static observers: Set<MutationObserver> = new Set();
  private static eventListeners: Set<() => void> = new Set();
  private static timers: Set<number> = new Set();

  static trackObserver(observer: MutationObserver): void {
    this.observers.add(observer);
  }

  static trackEventListener(cleanup: () => void): void {
    this.eventListeners.add(cleanup);
  }

  static trackTimer(timer: number): void {
    this.timers.add(timer);
  }

  static cleanup(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();

    this.eventListeners.forEach(cleanup => cleanup());
    this.eventListeners.clear();

    this.timers.forEach(timer => clearTimeout(timer));
    this.timers.clear();
  }

  static getActiveResourceCount(): number {
    return this.observers.size + this.eventListeners.size + this.timers.size;
  }
}

export class PerformanceTimingUtils {
  private static timers: Map<string, number> = new Map();

  static startTimer(name: string): void {
    this.timers.set(name, performance.now());
  }

  static endTimer(name: string): number {
    const startTime = this.timers.get(name);
    if (startTime === undefined) {
      if (isDev) console.warn(`Timer '${name}' was not started`);
      return 0;
    }

    const duration = performance.now() - startTime;
    this.timers.delete(name);
    PerformanceMonitor.recordMetric(name, duration);
    return duration;
  }
}

export default {
  PerformanceMonitor,
  BundleSizeAnalyzer,
  MemoryLeakDetector,
  PerformanceTimingUtils,
};
