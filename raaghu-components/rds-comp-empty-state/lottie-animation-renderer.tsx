import { lazy, Suspense, type ComponentProps, type CSSProperties } from 'react';

const LazyLottie = lazy(() => import('lottie-react'));

export type LottieAnimationRendererProps = {
  animationData: object;
  loop?: boolean;
  autoplay?: boolean;
  style?: CSSProperties;
  'data-testid'?: string;
};

/** Default Lottie renderer for {@link RdsCompEmptyState} (`animated`). Exported from `@waiin/raaghu-react/lottie`. */
export function lottieAnimationRenderer({
  animationData,
  loop = true,
  autoplay = true,
  style,
  'data-testid': testId = 'emptyStateLottie',
}: LottieAnimationRendererProps) {
  const lottieProps: ComponentProps<typeof LazyLottie> = {
    animationData,
    loop,
    autoplay,
    style: { width: '100%', height: '100%', ...style },
  };

  return (
    <Suspense
      fallback={
        <div
          className="rds-comp-empty-state__lottie-placeholder"
          data-testid={testId}
          aria-hidden="true"
          style={style}
        />
      }
    >
      <div data-testid={testId} style={{ width: '100%', height: '100%' }}>
        <LazyLottie {...lottieProps} />
      </div>
    </Suspense>
  );
}