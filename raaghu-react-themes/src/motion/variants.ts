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

/**
 * Stagger parent — wrap a list container with this variant.
 * Children using `staggerItem` will cascade in with a 60ms delay between each.
 *
 * @example
 * <motion.ul variants={staggerContainer} initial="hidden" animate="visible">
 *   {items.map(item => <motion.li key={item.id} variants={staggerItem} />)}
 * </motion.ul>
 */
export const staggerContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0 } },
  exit:    { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};

/**
 * Stagger child — use inside a `staggerContainer` parent.
 * Slides up 12px and fades in; exits by fading and sliding down.
 */
export const staggerItem: Variants = {
  hidden:  { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { ease: [0, 0, 0.2, 1] } },
  exit:    { opacity: 0, y: 8,  transition: { ease: [0.4, 0, 1, 1] } },
};
