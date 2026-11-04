export interface RdsCarouselLocaleText {
  carouselLabel: string;
  previousSlideLabel: string;
  nextSlideLabel: string;
  goToSlideLabel: (index: number) => string;
  slideLabel: (index: number, total: number) => string;
}

export const DEFAULT_RDS_CAROUSEL_LOCALE_TEXT: RdsCarouselLocaleText = {
  carouselLabel: 'Carousel',
  previousSlideLabel: 'Previous slide',
  nextSlideLabel: 'Next slide',
  goToSlideLabel: (index) => `Go to slide ${index}`,
  slideLabel: (index, total) => `${index} of ${total}`,
};
