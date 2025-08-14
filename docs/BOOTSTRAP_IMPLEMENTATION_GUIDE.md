# Bootstrap Implementation Guide

## ✅ Implementation Status

Bootstrap 5.3.7 has been integrated into the Raaghu Design System to provide responsive grid layouts and utilities across all components.

### Global Bootstrap Integration

Bootstrap provides a comprehensive set of features that have been integrated throughout the project:

- ✅ **Responsive Grid System** - For consistent layouts across device sizes
- ✅ **Flexbox Utilities** - For advanced component alignment and positioning
- ✅ **Spacing System** - For consistent margins and padding
- ✅ **Typography Utilities** - For text styling and vertical rhythm
- ✅ **Color Utilities** - For consistent application of the design system's color palette
- ✅ **Display Utilities** - For responsive visibility control
- ✅ **Component Styles** - For consistent UI patterns

## Bootstrap Integration

### Installation and Setup

1. **Package Installation**

   Bootstrap and its dependencies have been added to the project:

   ```json
   "dependencies": {
     "@popperjs/core": "^2.11.8",
     "bootstrap": "^5.3.7"
   }
   ```

2. **Main Import**

   Bootstrap CSS and JS are imported in the main application file:

   ```typescript
   // In main.tsx or similar entry point
   import 'bootstrap/dist/css/bootstrap.min.css';
   import 'bootstrap/dist/js/bootstrap.bundle.min.js';
   ```

3. **Storybook Integration**

   Bootstrap is configured in Storybook via the preview file:

   ```typescript
   // In .storybook/preview.ts
   import 'bootstrap/dist/css/bootstrap.min.css';
   import 'bootstrap/dist/js/bootstrap.bundle.min.js';
   ```

## Grid System Implementation

### Basic Grid Structure

All layout components and page templates should use Bootstrap's grid system for responsive layouts:

```jsx
<div className="container">  {/* or container-fluid for full-width */}
  <div className="row">
    <div className="col-lg-4 col-md-6 col-sm-12">
      {/* Component content */}
    </div>
    <div className="col-lg-8 col-md-6 col-sm-12">
      {/* Component content */}
    </div>
  </div>
</div>
```

### Responsive Breakpoints

Bootstrap's grid system uses the following breakpoints:

- `xs` - Extra small devices (< 576px)
- `sm` - Small devices (≥ 576px)
- `md` - Medium devices (≥ 768px)
- `lg` - Large devices (≥ 992px)
- `xl` - Extra large devices (≥ 1200px)
- `xxl` - Extra extra large devices (≥ 1400px)

### Column Patterns

Common column patterns used in the project:

1. **Four-Column Layout (Desktop)**
   ```jsx
   <div className="col-lg-3 col-md-6 col-sm-12">...</div>
   ```

2. **Three-Column Layout (Desktop)**
   ```jsx
   <div className="col-lg-4 col-md-6 col-sm-12">...</div>
   ```

3. **Two-Column Layout (Desktop)**
   ```jsx
   <div className="col-lg-6 col-md-6 col-sm-12">...</div>
   ```

## Bootstrap Utility Classes

### Common Utility Classes Used

| Category | Classes | Purpose |
|----------|---------|---------|
| **Spacing** | `m-*`, `p-*`, `my-*`, `px-*` | Margin and padding utilities |
| **Flexbox** | `d-flex`, `justify-content-*`, `align-items-*` | Flex layout utilities |
| **Text** | `text-center`, `text-muted`, `fw-bold` | Text styling utilities |
| **Display** | `d-block`, `d-none d-md-block` | Responsive visibility |
| **Sizing** | `w-100`, `h-100` | Width and height utilities |

### Spacing System

Bootstrap uses a spacing scale:

- `0` - 0px
- `1` - 0.25rem (4px)
- `2` - 0.5rem (8px)
- `3` - 1rem (16px)
- `4` - 1.5rem (24px)
- `5` - 3rem (48px)

## Best Practices

1. **Use container appropriately** for consistent page layouts:
   ```jsx
   <div className="container">  {/* fixed width container */}
     <div className="row">...</div>
   </div>
   
   <div className="container-fluid">  {/* full-width container */}
     <div className="row">...</div>
   </div>
   ```

2. **Always use the row class** before columns to ensure proper layout:
   ```jsx
   <div className="row">
     <div className="col-*">...</div>
   </div>
   ```

3. **Use responsive classes** to ensure components look good on all devices:
   ```jsx
   <div className="d-none d-md-block">Only visible on medium and larger screens</div>
   <div className="d-md-none">Only visible on small screens</div>
   ```

4. **Combine with custom CSS** when Bootstrap utilities are insufficient:
   ```jsx
   <div className="col-lg-4" style={{ height: '100%' }}>...</div>
   ```

5. **Nest grid systems** for complex layouts:
   ```jsx
   <div className="row">
     <div className="col-lg-6">
       <div className="row">
         <div className="col-md-6">...</div>
         <div className="col-md-6">...</div>
       </div>
     </div>
   </div>
   ```

6. **Add gutters** with the `g-*` classes when needed:
   ```jsx
   <div className="row g-4">...</div>
   ```
   
7. **Use Bootstrap spacing utilities** for consistent spacing:
   ```jsx
   <div className="mt-4 mb-3 p-3">...</div>
   ```
   
8. **Apply flex utilities** for advanced alignment:
   ```jsx
   <div className="d-flex justify-content-between align-items-center">...</div>
   ```

## Implementation Examples

### Grid System Examples

#### Cards Grid

```jsx
<div className="row g-4">
  {/* Four cards per row on large screens */}
  <div className="col-lg-3 col-md-6 col-sm-12">
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">Card Title</h5>
        <p className="card-text">Card content goes here</p>
      </div>
    </div>
  </div>
  
  {/* Additional cards follow the same pattern */}
</div>
```

#### Form Layout

```jsx
<div className="row">
  <div className="col-lg-8 col-md-10 col-sm-12">
    <form>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">First Name</label>
          <input type="text" className="form-control" />
        </div>
        <div className="col-md-6">
          <label className="form-label">Last Name</label>
          <input type="text" className="form-control" />
        </div>
      </div>
      
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input type="email" className="form-control" />
      </div>
    </form>
  </div>
</div>
```

### Flex Utilities Example

```jsx
<div className="d-flex align-items-center justify-content-between p-3">
  <div className="d-flex align-items-center">
    <img src="avatar.jpg" className="rounded-circle me-2" width="40" height="40" />
    <div>
      <h5 className="mb-0">User Name</h5>
      <small className="text-muted">Role</small>
    </div>
  </div>
  
  <div className="d-flex">
    <button className="btn btn-primary me-2">Action</button>
    <button className="btn btn-outline-secondary">Secondary</button>
  </div>
</div>
```

## Additional Bootstrap Features

### Responsive Images

Use Bootstrap's responsive image classes to ensure images scale properly:

```jsx
<img src="image.jpg" className="img-fluid rounded" alt="Description" />
```

### Interactive Components

Bootstrap includes JavaScript components that can be used alongside React components:

```jsx
// After importing the Bootstrap JS bundle
<button 
  type="button" 
  className="btn btn-primary" 
  data-bs-toggle="modal" 
  data-bs-target="#exampleModal"
>
  Launch Modal
</button>
```

### Color System

Use Bootstrap's color utility classes for consistent theming:

```jsx
<div className="bg-primary text-white p-3">
  Primary background with white text
</div>

<div className="text-success">
  Success colored text
</div>
```

### Forms

Bootstrap provides extensive form styling:

```jsx
<div className="mb-3">
  <label htmlFor="exampleInput" className="form-label">Example Input</label>
  <input type="text" className="form-control" id="exampleInput" />
  <div className="form-text">Helper text goes here</div>
</div>
```

## Further Resources

- [Bootstrap Documentation](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
- [Grid System](https://getbootstrap.com/docs/5.3/layout/grid/)
- [Flex Utilities](https://getbootstrap.com/docs/5.3/utilities/flex/)
- [Spacing Utilities](https://getbootstrap.com/docs/5.3/utilities/spacing/)
- [Components](https://getbootstrap.com/docs/5.3/components/accordion/)
- [Forms](https://getbootstrap.com/docs/5.3/forms/overview/)
- [Customize Bootstrap](https://getbootstrap.com/docs/5.3/customize/overview/)
