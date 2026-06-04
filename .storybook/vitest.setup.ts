import { setProjectAnnotations } from '@storybook/react-vite';
import * as projectAnnotations from './preview';

// Registers the framework renderer (renderToCanvas) and user preview config
// into globalProjectAnnotations so vitest can render stories.
// See: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
setProjectAnnotations([projectAnnotations]);
