/**
 * Performance monitoring and optimization utilities for Raaghu Design System
 */

// Performance Metrics Interface
export interface PerformanceMetrics {
  componentName: string;
  renderTime: number;
  duration: number;
  timestamp: number;
}

// Performance Monitor Class
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

    const metric: PerformanceMetrics = {
      componentName,
      renderTime: performance.now(),
      duration,
      timestamp: Date.now(),
    };

    this.metrics.push(metric);

    // Log slow renders (> 16ms)
    if (duration > 16) {
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
    
    const total = componentMetrics.reduce((sum, m) => sum + m.duration, 0);
    return total / componentMetrics.length;
  }

  static getSlowComponents(threshold = 16): string[] {
    const slowComponents = new Set<string>();
    
    this.metrics.forEach(metric => {
      if (metric.duration > threshold) {
        slowComponents.add(metric.componentName);
      }
    });
    
    return Array.from(slowComponents);
  }
}

// Bundle Size Analyzer
export class BundleSizeAnalyzer {
  static async analyzeComponent(componentName: string): Promise<number> {
    // Mock implementation - in real scenario, this would analyze actual bundle sizes
    const mockSize = Math.random() * 50000; // 0-50KB
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockSize), 100);
    });
  }

  static async getBundleSizeReport(): Promise<Record<string, number>> {
    const components = [
      'RdsButton', 'RdsCard', 'RdsModal', 'RdsTable', 'RdsForm'
    ];
    
    const report: Record<string, number> = {};
    
    for (const component of components) {
      report[component] = await this.analyzeComponent(component);
    }
    
    return report;
  }
}

// Memory Leak Detector
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
    // Disconnect observers
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();

    // Remove event listeners
    this.eventListeners.forEach(cleanup => cleanup());
    this.eventListeners.clear();

    // Clear timers
    this.timers.forEach(timer => clearTimeout(timer));
    this.timers.clear();
  }

  static getActiveResourceCount(): number {
    return this.observers.size + this.eventListeners.size + this.timers.size;
  }
}

// Performance Timing Utilities
export class PerformanceTimingUtils {
  private static timers: Map<string, number> = new Map();

  static startTimer(name: string): void {
    this.timers.set(name, performance.now());
  }

  static endTimer(name: string): number {
    const startTime = this.timers.get(name);
    if (!startTime) {
      console.warn(`Timer '${name}' was not started`);
      return 0;
    }

    const duration = performance.now() - startTime;
    this.timers.delete(name);
    
    PerformanceMonitor.recordMetric(name, duration);
    return duration;
  }
}

// Export performance utilities
export default {
  PerformanceMonitor,
  BundleSizeAnalyzer,
  MemoryLeakDetector,
  PerformanceTimingUtils,
};
