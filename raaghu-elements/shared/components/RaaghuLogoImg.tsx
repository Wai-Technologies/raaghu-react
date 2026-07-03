import type { ImgHTMLAttributes } from 'react';
import { useRaaghuLogoSrc } from '../hooks/useRaaghuLogoSrc';

export interface RaaghuLogoImgProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  alt?: string;
}

export function RaaghuLogoImg({
  alt = 'Raaghu Design System',
  className,
  style,
  ...props
}: RaaghuLogoImgProps) {
  const src = useRaaghuLogoSrc();
  return <img src={src} alt={alt} className={className} style={style} {...props} />;
}
