# .storybook/shims/ — Icon Compatibility Shims

This folder contains thin re-export shims for MUI icon paths that differ between MUI versions or are not available in the standard `@mui/icons-material` package.

## Files

| Shim File | Aliased Path | Actual Export |
|-----------|-------------|---------------|
| `CheckIcon.tsx` | `@icons/material/CheckIcon` | `@mui/icons-material/Check` |
| `UnfoldMoreHorizontalIcon.tsx` | `@icons/material/UnfoldMoreHorizontalIcon` | `@mui/icons-material/UnfoldMore` |

## Why These Exist

Some MUI Data Grid or MUI X components import icons using an internal `@icons/material/*` path convention. When Storybook's Vite bundler resolves these paths, they can fail if the icon name does not map 1:1 to a real file in `@mui/icons-material`.

These shims act as path aliases. They are registered in `.storybook/main.ts` under `viteFinal → resolve.alias`:

```ts
'@icons/material/CheckIcon': '.../.storybook/shims/CheckIcon.tsx',
'@icons/material/UnfoldMoreHorizontalIcon': '.../.storybook/shims/UnfoldMoreHorizontalIcon.tsx',
```

This way Storybook resolves the path correctly without needing to patch MUI source code or install additional packages.

## Adding a New Shim

If a new MUI component causes a missing icon import error in Storybook:

1. Find the real icon in `@mui/icons-material` (search the [MUI icon list](https://mui.com/material-ui/material-icons/))
2. Create a shim file: `.storybook/shims/MyIconName.tsx`
   ```tsx
   import ActualIcon from '@mui/icons-material/ActualIconName';
   export default ActualIcon;
   ```
3. Add the alias in `.storybook/main.ts` inside `viteFinal → resolve.alias`

These shims are only loaded during Storybook development and build — they do not affect the published package.
