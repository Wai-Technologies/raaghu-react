import type { Variants } from 'motion/react';

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1 },
  exit:    { opacity: 0 },
};

export const slideUp: Variants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: 8 },
};

export const slideDown: Variants = {
  hidden:  { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -8 },
};

export const slideRight: Variants = {
  hidden:  { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0 },
  exit:    { opacity: 0, x: -8 },
};

export const slideLeft: Variants = {
  hidden:  { opacity: 0, x: 16 },
  visible: { opacity: 1, x: 0 },
  exit:    { opacity: 0, x: 8 },
};

export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit:    { opacity: 0, scale: 0.95 },
};

export const expandVertical: Variants = {
  hidden:  { height: 0, opacity: 0, overflow: 'hidden' },
  visible: { height: 'auto', opacity: 1, overflow: 'hidden' },
  exit:    { height: 0, opacity: 0, overflow: 'hidden' },
};
