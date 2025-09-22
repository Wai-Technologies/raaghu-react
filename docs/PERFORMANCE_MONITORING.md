# Raaghu Design System - Performance Monitoring Guide

## Overview

This guide covers the comprehensive performance monitoring strategy for the Raaghu Component Library, ensuring optimal performance and user experience across all components and applications.

## Table of Contents

- [Performance Philosophy](#performance-philosophy)
- [Monitoring Stack](#monitoring-stack)
- [Performance Metrics](#performance-metrics)
- [Component Performance](#component-performance)
- [Bundle Analysis](#bundle-analysis)
- [Runtime Performance](#runtime-performance)
- [Core Web Vitals](#core-web-vitals)
- [Performance Testing](#performance-testing)
- [Continuous Monitoring](#continuous-monitoring)
- [Optimization Strategies](#optimization-strategies)
- [Performance Budget](#performance-budget)

## Performance Philosophy

Our performance approach is built on these core principles:

1. **Performance by Design**: Build performance considerations into every component from the start
2. **Measure Everything**: Comprehensive metrics collection and analysis
3. **User-Centric Metrics**: Focus on metrics that directly impact user experience
4. **Continuous Monitoring**: Real-time performance tracking and alerting
5. **Progressive Enhancement**: Ensure core functionality works even on low-end devices

## Monitoring Stack

### Core Performance Tools

```json
{
  "@perfume/react": "^0.9.0",
  "web-vitals": "^4.2.4",
  "lighthouse": "^12.2.1",
  "bundlesize": "^0.18.2",
  "webpack-bundle-analyzer": "^4.10.2"
}
```

### Performance Testing Libraries

```json
{
  "benchmark": "^2.1.4",
  "puppeteer": "^23.9.0",
  "playwright": "^1.49.1",
  "@storybook/addon-performance": "^0.16.1"
}
```

### Monitoring Services Integration

```json
{
  "@sentry/react": "^8.42.0",
  "datadog-browser-rum": "^5.33.0",
  "new-relic-browser": "^1.264.0"
}
```

## Performance Metrics

### Core Web Vitals

#### 1. Largest Contentful Paint (LCP)
**Target**: < 2.5 seconds

```typescript
// src/utils/performance/web-vitals.ts
import { getLCP } from 'web-vitals';

export const trackLCP = () => {
  getLCP((metric) => {
    console.log('LCP:', metric.value);
    
    // Send to analytics
    gtag('event', 'web_vitals', {
      event_category: 'performance',
      event_label: 'LCP',
      value: Math.round(metric.value),
    });
    
    // Alert if threshold exceeded
    if (metric.value > 2500) {
      console.warn('LCP threshold exceeded:', metric.value);
    }
  });
};
```

#### 2. First Input Delay (FID)
**Target**: < 100 milliseconds

```typescript
import { getFID } from 'web-vitals';

export const trackFID = () => {
  getFID((metric) => {
    console.log('FID:', metric.value);
    
    // Track input responsiveness
    gtag('event', 'web_vitals', {
      event_category: 'performance',
      event_label: 'FID',
      value: Math.round(metric.value),
    });
  });
};
```

#### 3. Cumulative Layout Shift (CLS)
**Target**: < 0.1

```typescript
import { getCLS } from 'web-vitals';

export const trackCLS = () => {
  getCLS((metric) => {
    console.log('CLS:', metric.value);
    
    // Track visual stability
    gtag('event', 'web_vitals', {
      event_category: 'performance',
      event_label: 'CLS',
      value: Math.round(metric.value * 1000),
    });
  });
};
```

### Custom Performance Metrics

#### Component Render Time

```typescript
// src/utils/performance/component-metrics.ts
export class ComponentPerformanceTracker {
  private static instance: ComponentPerformanceTracker;
  private metrics: Map<string, number[]> = new Map();

  static getInstance() {
    if (!this.instance) {
      this.instance = new ComponentPerformanceTracker();
    }
    return this.instance;
  }

  trackRender(componentName: string, renderTime: number) {
    if (!this.metrics.has(componentName)) {
      this.metrics.set(componentName, []);
    }
    
    this.metrics.get(componentName)!.push(renderTime);
    
    // Alert on slow renders
    if (renderTime > 16) { // 16ms = 60fps budget
      console.warn(`Slow render detected: ${componentName} took ${renderTime}ms`);
    }
  }

  getAverageRenderTime(componentName: string): number {
    const times = this.metrics.get(componentName) || [];
    return times.reduce((sum, time) => sum + time, 0) / times.length;
  }

  getP95RenderTime(componentName: string): number {
    const times = this.metrics.get(componentName) || [];
    const sorted = times.sort((a, b) => a - b);
    const index = Math.ceil(sorted.length * 0.95) - 1;
    return sorted[index] || 0;
  }
}
```

#### Memory Usage Tracking

```typescript
// src/utils/performance/memory-tracker.ts
export class MemoryTracker {
  private measurements: { timestamp: number; used: number; total: number }[] = [];

  startTracking() {
    const track = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        this.measurements.push({
          timestamp: Date.now(),
          used: memory.usedJSHeapSize,
          total: memory.totalJSHeapSize,
        });
      }
      
      // Check for memory leaks
      if (this.measurements.length > 1) {
        const current = this.measurements[this.measurements.length - 1];
        const previous = this.measurements[this.measurements.length - 2];
        
        if (current.used > previous.used * 1.2) {
          console.warn('Potential memory leak detected');
        }
      }
    };

    // Track every 5 seconds
    setInterval(track, 5000);
    track(); // Initial measurement
  }

  getMemoryUsage() {
    return this.measurements[this.measurements.length - 1];
  }

  getMemoryTrend() {
    if (this.measurements.length < 2) return 'stable';
    
    const recent = this.measurements.slice(-5);
    const trend = recent.reduce((acc, curr, index) => {
      if (index === 0) return acc;
      return acc + (curr.used - recent[index - 1].used);
    }, 0);

    if (trend > 0) return 'increasing';
    if (trend < 0) return 'decreasing';
    return 'stable';
  }
}
```

## Component Performance

### Performance-Aware Component Wrapper

```typescript
// src/components/common/PerformanceWrapper.tsx
import React, { Profiler, ReactNode } from 'react';
import { ComponentPerformanceTracker } from '../../utils/performance/component-metrics';

interface PerformanceWrapperProps {
  componentName: string;
  children: ReactNode;
  threshold?: number; // ms
}

export const PerformanceWrapper: React.FC<PerformanceWrapperProps> = ({
  componentName,
  children,
  threshold = 16
}) => {
  const onRenderCallback = (
    id: string,
    phase: 'mount' | 'update',
    actualDuration: number,
    baseDuration: number,
    startTime: number,
    commitTime: number
  ) => {
    const tracker = ComponentPerformanceTracker.getInstance();
    tracker.trackRender(componentName, actualDuration);

    // Log detailed performance data
    console.log(`${componentName} - ${phase}:`, {
      actualDuration,
      baseDuration,
      startTime,
      commitTime
    });

    // Send to monitoring service
    if (window.datadog) {
      window.datadog.increment('component.render', 1, {
        component: componentName,
        phase,
        slow: actualDuration > threshold ? 'true' : 'false'
      });
    }
  };

  return (
    <Profiler id={componentName} onRender={onRenderCallback}>
      {children}
    </Profiler>
  );
};
```

### HOC for Component Performance

```typescript
// src/hoc/withPerformanceMonitoring.tsx
import React from 'react';
import { PerformanceWrapper } from '../components/common/PerformanceWrapper';

export function withPerformanceMonitoring<T extends object>(
  Component: React.ComponentType<T>,
  componentName?: string
) {
  const WrappedComponent = (props: T) => {
    const name = componentName || Component.displayName || Component.name || 'Unknown';
    
    return (
      <PerformanceWrapper componentName={name}>
        <Component {...props} />
      </PerformanceWrapper>
    );
  };

  WrappedComponent.displayName = `withPerformanceMonitoring(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}

// Usage example
export const MonitoredButton = withPerformanceMonitoring(RdsButton, 'RdsButton');
```

## Bundle Analysis

### Bundle Size Configuration

```javascript
// bundlesize.config.js
module.exports = [
  {
    "path": "./dist/index.js",
    "maxSize": "50 KB",
    "compression": "gzip"
  },
  {
    "path": "./dist/elements/*.js",
    "maxSize": "10 KB",
    "compression": "gzip"
  },
  {
    "path": "./dist/layouts/*.js",
    "maxSize": "20 KB",
    "compression": "gzip"
  }
];
```

### Webpack Bundle Analyzer Setup

```javascript
// webpack.analyzer.js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'bundle-report.html',
      openAnalyzer: false,
      generateStatsFile: true,
      statsFilename: 'bundle-stats.json'
    })
  ]
};
```

### Tree Shaking Analysis

```typescript
// src/utils/bundle/tree-shaking-test.ts
export const analyzeTreeShaking = () => {
  // Test if unused exports are properly tree-shaken
  const testModules = [
    '@raaghu/elements',
    '@raaghu/layouts',
    '@raaghu/themes'
  ];

  testModules.forEach(module => {
    import(module).then(mod => {
      console.log(`${module} exports:`, Object.keys(mod));
    });
  });
};
```

## Runtime Performance

### Performance Observer Setup

```typescript
// src/utils/performance/runtime-observer.ts
export class RuntimePerformanceObserver {
  private observers: PerformanceObserver[] = [];

  init() {
    this.observeNavigationTiming();
    this.observeResourceTiming();
    this.observeLongTasks();
    this.observeLayoutShifts();
  }

  private observeNavigationTiming() {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const navEntry = entry as PerformanceNavigationTiming;
        
        console.log('Navigation Timing:', {
          domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
          loadComplete: navEntry.loadEventEnd - navEntry.loadEventStart,
          firstPaint: navEntry.responseEnd - navEntry.requestStart,
          domInteractive: navEntry.domInteractive - navEntry.requestStart
        });
      }
    });

    observer.observe({ entryTypes: ['navigation'] });
    this.observers.push(observer);
  }

  private observeResourceTiming() {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const resource = entry as PerformanceResourceTiming;
        
        // Track slow resources
        if (resource.duration > 1000) {
          console.warn('Slow resource:', resource.name, `${resource.duration}ms`);
        }
      }
    });

    observer.observe({ entryTypes: ['resource'] });
    this.observers.push(observer);
  }

  private observeLongTasks() {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.warn('Long task detected:', {
          duration: entry.duration,
          startTime: entry.startTime,
          name: entry.name
        });
      }
    });

    observer.observe({ entryTypes: ['longtask'] });
    this.observers.push(observer);
  }

  private observeLayoutShifts() {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const clsEntry = entry as any; // Layout shift entry
        
        console.log('Layout Shift:', {
          value: clsEntry.value,
          hadRecentInput: clsEntry.hadRecentInput,
          sources: clsEntry.sources
        });
      }
    });

    observer.observe({ entryTypes: ['layout-shift'] });
    this.observers.push(observer);
  }

  cleanup() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}
```

### Intersection Observer Performance

```typescript
// src/utils/performance/intersection-performance.ts
export class IntersectionPerformanceTracker {
  private observer: IntersectionObserver;
  private trackedElements: Map<Element, number> = new Map();

  constructor() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const startTime = Date.now();
            this.trackedElements.set(entry.target, startTime);
          } else {
            const startTime = this.trackedElements.get(entry.target);
            if (startTime) {
              const visibilityDuration = Date.now() - startTime;
              console.log('Element visibility duration:', visibilityDuration);
              this.trackedElements.delete(entry.target);
            }
          }
        });
      },
      { threshold: 0.1 }
    );
  }

  observe(element: Element) {
    this.observer.observe(element);
  }

  unobserve(element: Element) {
    this.observer.unobserve(element);
    this.trackedElements.delete(element);
  }

  disconnect() {
    this.observer.disconnect();
    this.trackedElements.clear();
  }
}
```

## Core Web Vitals

### Automated Web Vitals Collection

```typescript
// src/utils/performance/web-vitals-reporter.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

interface WebVitalsMetric {
  name: string;
  value: number;
  delta: number;
  id: string;
  entries: PerformanceEntry[];
}

export class WebVitalsReporter {
  private metrics: Map<string, WebVitalsMetric> = new Map();

  init() {
    getCLS(this.handleMetric.bind(this));
    getFID(this.handleMetric.bind(this));
    getFCP(this.handleMetric.bind(this));
    getLCP(this.handleMetric.bind(this));
    getTTFB(this.handleMetric.bind(this));
  }

  private handleMetric(metric: WebVitalsMetric) {
    console.log(`${metric.name}:`, metric.value);
    this.metrics.set(metric.name, metric);

    // Send to analytics
    this.sendToAnalytics(metric);
    
    // Check thresholds
    this.checkThresholds(metric);
  }

  private sendToAnalytics(metric: WebVitalsMetric) {
    // Google Analytics 4
    if (window.gtag) {
      window.gtag('event', metric.name, {
        event_category: 'web_vitals',
        event_label: metric.id,
        value: Math.round(metric.value),
        custom_map: { metric_id: 'dimension1' },
      });
    }

    // DataDog RUM
    if (window.DD_RUM) {
      window.DD_RUM.addTiming(metric.name, metric.value);
    }

    // Custom analytics
    fetch('/api/analytics/web-vitals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        metric: metric.name,
        value: metric.value,
        id: metric.id,
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent
      })
    });
  }

  private checkThresholds(metric: WebVitalsMetric) {
    const thresholds = {
      CLS: 0.1,
      FID: 100,
      FCP: 1800,
      LCP: 2500,
      TTFB: 800
    };

    const threshold = thresholds[metric.name as keyof typeof thresholds];
    if (threshold && metric.value > threshold) {
      console.warn(`${metric.name} threshold exceeded:`, {
        value: metric.value,
        threshold,
        exceedsBy: metric.value - threshold
      });

      // Alert performance team
      this.alertPerformanceTeam(metric, threshold);
    }
  }

  private alertPerformanceTeam(metric: WebVitalsMetric, threshold: number) {
    // Send alert to monitoring service
    if (window.Sentry) {
      window.Sentry.captureMessage(`Web Vital threshold exceeded: ${metric.name}`, {
        level: 'warning',
        tags: {
          metric: metric.name,
          value: metric.value,
          threshold
        }
      });
    }
  }

  getMetrics() {
    return Array.from(this.metrics.values());
  }

  getMetric(name: string) {
    return this.metrics.get(name);
  }
}
```

## Performance Testing

### Component Performance Benchmarks

```typescript
// src/tests/performance/component-benchmarks.test.ts
import { performance } from 'perf_hooks';
import { render, cleanup } from '@testing-library/react';
import React from 'react';
import RdsButton from '../../raaghu-elements/rds-button/rds-button';
import RdsTable from '../../raaghu-elements/rds-table/rds-table';

describe('Component Performance Benchmarks', () => {
  afterEach(cleanup);

  it('RdsButton renders within performance budget', () => {
    const iterations = 100;
    const times: number[] = [];

    for (let i = 0; i < iterations; i++) {
      const start = performance.now();
      
      const { unmount } = render(
        <RdsButton label={`Button ${i}`} onClick={() => {}} />
      );
      
      const end = performance.now();
      times.push(end - start);
      
      unmount();
    }

    const averageTime = times.reduce((sum, time) => sum + time, 0) / times.length;
    const p95Time = times.sort((a, b) => a - b)[Math.floor(times.length * 0.95)];

    console.log(`RdsButton Performance:`, {
      average: `${averageTime.toFixed(2)}ms`,
      p95: `${p95Time.toFixed(2)}ms`,
      samples: iterations
    });

    // Performance assertions
    expect(averageTime).toBeLessThan(2); // 2ms average
    expect(p95Time).toBeLessThan(5); // 5ms P95
  });

  it('RdsTable handles large datasets efficiently', () => {
    const largeDataset = Array.from({ length: 1000 }, (_, i) => ({
      id: i,
      name: `Item ${i}`,
      value: Math.random() * 1000,
      category: `Category ${i % 10}`
    }));

    const start = performance.now();
    
    const { unmount } = render(
      <RdsTable 
        data={largeDataset}
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'name', label: 'Name' },
          { key: 'value', label: 'Value' },
          { key: 'category', label: 'Category' }
        ]}
      />
    );
    
    const end = performance.now();
    const renderTime = end - start;

    console.log(`RdsTable Large Dataset Performance: ${renderTime.toFixed(2)}ms`);

    unmount();

    // Should handle 1000 rows under 100ms
    expect(renderTime).toBeLessThan(100);
  });
});
```

### Memory Leak Detection

```typescript
// src/tests/performance/memory-leak.test.ts
import { render, cleanup, act } from '@testing-library/react';
import React from 'react';
import RdsModal from '../../raaghu-elements/rds-modal/rds-modal';

describe('Memory Leak Detection', () => {
  it('components clean up properly on unmount', async () => {
    const initialMemory = (performance as any).memory?.usedJSHeapSize || 0;
    
    // Create and destroy components multiple times
    for (let i = 0; i < 100; i++) {
      const { unmount } = render(
        <RdsModal open={true} onClose={() => {}}>
          <div>Modal Content {i}</div>
        </RdsModal>
      );
      
      // Force cleanup
      act(() => {
        unmount();
      });
    }

    // Force garbage collection if available
    if ((global as any).gc) {
      (global as any).gc();
    }

    await new Promise(resolve => setTimeout(resolve, 100));

    const finalMemory = (performance as any).memory?.usedJSHeapSize || 0;
    const memoryIncrease = finalMemory - initialMemory;
    const memoryIncreasePercent = (memoryIncrease / initialMemory) * 100;

    console.log(`Memory Usage:`, {
      initial: `${(initialMemory / 1024 / 1024).toFixed(2)}MB`,
      final: `${(finalMemory / 1024 / 1024).toFixed(2)}MB`,
      increase: `${(memoryIncrease / 1024 / 1024).toFixed(2)}MB`,
      increasePercent: `${memoryIncreasePercent.toFixed(2)}%`
    });

    // Should not increase memory by more than 20%
    expect(memoryIncreasePercent).toBeLessThan(20);
  });
});
```

## Continuous Monitoring

### Performance Dashboard

```typescript
// src/utils/performance/dashboard.ts
export class PerformanceDashboard {
  private metricsHistory: Map<string, Array<{ timestamp: number; value: number }>> = new Map();

  addMetric(name: string, value: number) {
    if (!this.metricsHistory.has(name)) {
      this.metricsHistory.set(name, []);
    }
    
    const history = this.metricsHistory.get(name)!;
    history.push({ timestamp: Date.now(), value });
    
    // Keep only last 100 measurements
    if (history.length > 100) {
      history.shift();
    }
  }

  getMetricTrend(name: string, timeWindow: number = 3600000): 'improving' | 'degrading' | 'stable' {
    const history = this.metricsHistory.get(name) || [];
    const cutoff = Date.now() - timeWindow;
    const recentMetrics = history.filter(m => m.timestamp > cutoff);
    
    if (recentMetrics.length < 2) return 'stable';
    
    const first = recentMetrics[0].value;
    const last = recentMetrics[recentMetrics.length - 1].value;
    const change = ((last - first) / first) * 100;
    
    if (change > 10) return 'degrading';
    if (change < -10) return 'improving';
    return 'stable';
  }

  generateReport() {
    const report: any = {
      timestamp: new Date().toISOString(),
      metrics: {}
    };

    for (const [name, history] of this.metricsHistory.entries()) {
      const values = history.map(h => h.value);
      const average = values.reduce((sum, val) => sum + val, 0) / values.length;
      const trend = this.getMetricTrend(name);
      
      report.metrics[name] = {
        current: values[values.length - 1],
        average: Math.round(average),
        trend,
        samples: values.length
      };
    }

    return report;
  }
}
```

### Automated Performance Alerts

```typescript
// src/utils/performance/alerting.ts
export class PerformanceAlerting {
  private thresholds = {
    LCP: { warning: 2000, critical: 4000 },
    FID: { warning: 100, critical: 300 },
    CLS: { warning: 0.1, critical: 0.25 },
    renderTime: { warning: 16, critical: 50 },
    bundleSize: { warning: 50000, critical: 100000 } // bytes
  };

  checkAlert(metric: string, value: number) {
    const threshold = this.thresholds[metric as keyof typeof this.thresholds];
    if (!threshold) return null;

    if (value > threshold.critical) {
      return this.sendCriticalAlert(metric, value, threshold.critical);
    }
    
    if (value > threshold.warning) {
      return this.sendWarningAlert(metric, value, threshold.warning);
    }

    return null;
  }

  private sendCriticalAlert(metric: string, value: number, threshold: number) {
    const alert = {
      level: 'critical',
      metric,
      value,
      threshold,
      message: `Critical performance issue: ${metric} = ${value} (threshold: ${threshold})`
    };

    // Send to monitoring services
    this.sendToSlack(alert);
    this.sendToEmail(alert);
    this.sendToPagerDuty(alert);

    return alert;
  }

  private sendWarningAlert(metric: string, value: number, threshold: number) {
    const alert = {
      level: 'warning',
      metric,
      value,
      threshold,
      message: `Performance warning: ${metric} = ${value} (threshold: ${threshold})`
    };

    this.sendToSlack(alert);
    return alert;
  }

  private sendToSlack(alert: any) {
    fetch(process.env.SLACK_WEBHOOK_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: alert.message,
        attachments: [{
          color: alert.level === 'critical' ? 'danger' : 'warning',
          fields: [
            { title: 'Metric', value: alert.metric, short: true },
            { title: 'Value', value: alert.value, short: true },
            { title: 'Threshold', value: alert.threshold, short: true }
          ]
        }]
      })
    });
  }

  private sendToEmail(alert: any) {
    // Email notification implementation
    console.log('Email alert sent:', alert);
  }

  private sendToPagerDuty(alert: any) {
    // PagerDuty integration implementation
    console.log('PagerDuty alert sent:', alert);
  }
}
```

## Optimization Strategies

### Code Splitting Strategies

```typescript
// src/utils/performance/code-splitting.ts
import { lazy, Suspense } from 'react';

// Route-based code splitting
export const LazyDashboard = lazy(() => import('../pages/Dashboard'));
export const LazySettings = lazy(() => import('../pages/Settings'));

// Component-based code splitting
export const LazyDataVisualization = lazy(() => import('../components/DataVisualization'));

// Feature-based code splitting
export const LazyAdvancedFeatures = lazy(() => 
  import('../features/advanced').then(module => ({
    default: module.AdvancedFeatures
  }))
);

// Wrapper component for lazy loading with performance tracking
export const LazyWithPerformanceTracking = ({ 
  component: Component, 
  fallback, 
  name 
}: {
  component: React.ComponentType;
  fallback: React.ReactNode;
  name: string;
}) => {
  const start = performance.now();
  
  return (
    <Suspense 
      fallback={
        <div>
          {fallback}
          {/* Track loading time */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.componentLoadTimes = window.componentLoadTimes || {};
                window.componentLoadTimes['${name}'] = ${start};
              `
            }}
          />
        </div>
      }
    >
      <Component />
    </Suspense>
  );
};
```

### Bundle Optimization

```javascript
// webpack.optimization.js
const optimizationConfig = {
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all',
      },
      mui: {
        test: /[\\/]node_modules[\\/]@mui[\\/]/,
        name: 'mui',
        chunks: 'all',
      },
      raaghu: {
        test: /[\\/]raaghu-/,
        name: 'raaghu-core',
        chunks: 'all',
      }
    }
  },
  runtimeChunk: 'single',
  usedExports: true,
  sideEffects: false
};

module.exports = optimizationConfig;
```

### Performance Budget

```json
{
  "performanceBudget": {
    "bundles": [
      {
        "path": "./dist/main.*.js",
        "maxSize": "250kb"
      },
      {
        "path": "./dist/vendors.*.js",
        "maxSize": "500kb"
      }
    ],
    "metrics": [
      {
        "metric": "first-contentful-paint",
        "budget": 2000
      },
      {
        "metric": "largest-contentful-paint",
        "budget": 2500
      },
      {
        "metric": "cumulative-layout-shift",
        "budget": 0.1
      }
    ]
  }
}
```

## CI/CD Integration

### Performance Testing Pipeline

```yaml
# .github/workflows/performance.yml
name: Performance Testing
on: 
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 0 * * 0' # Weekly

jobs:
  performance-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build project
        run: npm run build
        
      - name: Bundle size check
        run: npm run bundlesize
        
      - name: Lighthouse CI
        run: |
          npm install -g @lhci/cli
          lhci autorun
          
      - name: Performance benchmarks
        run: npm run test:performance
        
      - name: Upload performance reports
        uses: actions/upload-artifact@v3
        with:
          name: performance-reports
          path: |
            lighthouse-report.html
            bundle-report.html
            performance-benchmarks.json
```

### Lighthouse CI Configuration

```javascript
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000'],
      numberOfRuns: 3,
      settings: {
        chromeFlags: '--no-sandbox --headless --disable-gpu'
      }
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }]
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
};
```

---

## Quick Reference

### Performance Commands

```bash
# Bundle analysis
npm run analyze:bundle

# Performance benchmarks
npm run test:performance

# Lighthouse audit
npm run audit:lighthouse

# Bundle size check
npm run bundlesize

# Memory leak detection
npm run test:memory

# Web vitals monitoring
npm run monitor:vitals
```

### Key Performance Targets

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| LCP | ≤ 2.5s | 2.5s - 4.0s | > 4.0s |
| FID | ≤ 100ms | 100ms - 300ms | > 300ms |
| CLS | ≤ 0.1 | 0.1 - 0.25 | > 0.25 |
| Bundle Size | ≤ 250KB | 250KB - 500KB | > 500KB |
| Component Render | ≤ 16ms | 16ms - 50ms | > 50ms |

This comprehensive performance monitoring guide ensures our component library maintains optimal performance and provides excellent user experience at scale.
