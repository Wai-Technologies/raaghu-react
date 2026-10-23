import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RdsCardDetail, { type RdsCardDetailProps } from './rds-card-detail';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import { warnDeprecatedProp } from '../shared/utils/deprecation';

jest.mock('./rds-card-detail.scss', () => ({}));
jest.mock('../shared/utils/deprecation', () => ({ warnDeprecatedProp: jest.fn() }));

describe('RdsCardDetail', () => {
  const defaultProps: RdsCardDetailProps = {
    children: <div>Card Content</div>,
  };

  const renderWithTheme = (component: React.ReactElement, isDark: boolean = false) =>
    render(
      <ThemeProvider theme={createTheme({ palette: { mode: isDark ? 'dark' : 'light' } })}>{component}</ThemeProvider>
    );
  const setup = (props: Record<string, any> = {}, isDark = false) =>
    renderWithTheme(<RdsCardDetail {...defaultProps} {...props} />, isDark);
  const rerenderWith = (rerender: (ui: React.ReactElement) => void, props: Record<string, any>) =>
    rerender(
      <ThemeProvider theme={createTheme()}>
        <RdsCardDetail {...defaultProps} {...props} />
      </ThemeProvider>
    );

  describe('Basic Rendering', () => {
    it('should render content in MUI Card with wrapper class', () => {
      const { container } = setup();
      expect(screen.getByText('Card Content')).toBeInTheDocument();
      expect(container.querySelector('.MuiCard-root')).toBeInTheDocument();
      expect(container.querySelector('.rds-card-detail')).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsCardDetail.displayName).toBe('RdsCardDetail');
    });
  });

  describe('Children Rendering', () => {
    it.each([
      [<div key="a">Custom Child Content</div>, ['Custom Child Content']],
      [[<div key="a">Child 1</div>, <div key="b">Child 2</div>], ['Child 1', 'Child 2']],
      [
        <div key="a">
          <p>Paragraph 1</p>
          <p>Paragraph 2</p>
        </div>,
        ['Paragraph 1', 'Paragraph 2'],
      ],
      ['String child', ['String child']],
      [<span key="a">React Node</span>, ['React Node']],
    ])('should render children %#', (children, texts) => {
      setup({ children });
      texts.forEach(t => expect(screen.getByText(t)).toBeInTheDocument());
    });

    it('should render children in CardContent', () => {
      const { container } = setup({ children: <span>Content in CardContent</span> });
      expect(container.querySelector('.MuiCardContent-root')?.textContent).toContain('Content in CardContent');
    });
  });

  describe('Title and Subtitle', () => {
    it.each([
      [{ title: 'Card Title' }, ['Card Title']],
      [{ subtitle: 'Card Subtitle' }, ['Card Subtitle']],
      [{ title: 'Title', subtitle: 'Subtitle' }, ['Title', 'Subtitle']],
      [{ title: '', subtitle: 'Sub' }, ['Sub']],
      [
        { title: 'This is a very long title that should display correctly in the card header component' },
        ['This is a very long title that should display correctly in the card header component'],
      ],
      [{ title: 'Title & More!' }, ['Title & More!']],
      [{ title: '🎉 Title' }, ['🎉 Title']],
    ])('should render %j', (props, texts) => {
      setup(props);
      texts.forEach(t => expect(screen.getByText(t)).toBeInTheDocument());
    });

    it.each([
      [{}, false],
      [{ title: 'Title Only' }, true],
      [{ subtitle: 'Subtitle Only' }, true],
    ])('should render CardHeader for %j -> %s', (props, shown) => {
      const { container } = setup(props);
      const header = container.querySelector('.MuiCardHeader-root');
      if (shown) expect(header).toBeInTheDocument();
      else expect(header).not.toBeInTheDocument();
    });
  });

  describe('Image Handling', () => {
    it.each([
      [{ image: '/test-image.jpg', title: 'With Image' }, 'With Image', { src: '/test-image.jpg', height: '140' }],
      [{ image: '/img.jpg', title: 'Alt Text', imageHeight: 200 }, 'Alt Text', { height: '200' }],
      [{ image: '/img.jpg', title: 'Image', imageHeight: 250 }, 'Image', { height: '250' }],
      [{ image: '/path/to/image.jpg', title: 'Image' }, 'Image', { src: '/path/to/image.jpg' }],
      [{ image: '/img.jpg' }, 'Card image', {}],
    ])('should render image for %j', (props, alt, attrs) => {
      setup(props);
      const image = screen.getByAltText(alt);
      expect(image).toBeInTheDocument();
      Object.entries(attrs).forEach(([k, v]) => expect(image).toHaveAttribute(k, v));
    });

    it('should not render CardMedia when image is not provided', () => {
      const { container } = setup();
      expect(container.querySelector('.MuiCardMedia-root')).not.toBeInTheDocument();
    });

    it('should render CardMedia with component img', () => {
      const { container } = setup({ image: '/img.jpg', title: 'Image' });
      expect(container.querySelector('.MuiCardMedia-root')?.tagName).toBe('IMG');
    });
  });

  describe('Actions', () => {
    it.each([
      [<button key="a">Action Button</button>, ['Action Button']],
      [<><button>Save</button><button>Cancel</button></>, ['Save', 'Cancel']],
      [<div><button>Edit</button><button>Delete</button></div>, ['Edit', 'Delete']],
    ])('should render actions %#', (actions, texts) => {
      const { container } = setup({ actions });
      texts.forEach(t => expect(screen.getByText(t)).toBeInTheDocument());
      expect(container.querySelector('.MuiCardActions-root')).toBeInTheDocument();
    });

    it('should not render CardActions when actions is not provided', () => {
      const { container } = setup();
      expect(container.querySelector('.MuiCardActions-root')).not.toBeInTheDocument();
    });
  });

  describe('MUI Props Integration', () => {
    it.each([
      [{ elevation: 8 }],
      [{ variant: 'elevation' }],
      [{ elevation: 4 }],
    ])('should accept %j', props => {
      setup(props);
      expect(screen.getByText('Card Content')).toBeInTheDocument();
    });

    it('should accept sx prop', () => {
      const { container } = setup({ sx: { backgroundColor: 'red' } });
      expect(container.querySelector('.MuiCard-root')).toBeInTheDocument();
    });

    it('should accept data-testid prop', () => {
      const { container } = setup({ 'data-testid': 'custom-card' });
      expect(container.querySelector('[data-testid="custom-card"]')).toBeInTheDocument();
    });
  });

  describe('Theme Integration', () => {
    it.each([
      [false, undefined, undefined],
      [true, undefined, undefined],
      [true, 4, 'elevation'],
      [false, 4, 'elevation'],
      [true, 0, 'elevation'],
    ])('should render with dark=%s elevation=%s variant=%s', (isDark, elevation, variant) => {
      setup({ elevation, variant }, isDark);
      expect(screen.getByText('Card Content')).toBeInTheDocument();
    });
  });

  describe('Combined Props', () => {
    it('should render with all props provided', () => {
      renderWithTheme(
        <RdsCardDetail
          title="Complete Card"
          subtitle="With All Features"
          image="/img.jpg"
          imageHeight={200}
          actions={<button>Action</button>}
          className="custom"
          elevation={4}
        >
          <p>Card content here</p>
        </RdsCardDetail>
      );
      expect(screen.getByText('Complete Card')).toBeInTheDocument();
      expect(screen.getByText('With All Features')).toBeInTheDocument();
      expect(screen.getByText('Card content here')).toBeInTheDocument();
      expect(screen.getByText('Action')).toBeInTheDocument();
    });

    it('should render with title, subtitle, and image', () => {
      setup({ title: 'Title', subtitle: 'Subtitle', image: '/img.jpg', children: 'Content' });
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Subtitle')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('should render with image and actions', () => {
      setup({ image: '/img.jpg', title: 'Card', actions: <button>Button</button>, children: 'Body' });
      expect(screen.getByText('Body')).toBeInTheDocument();
      expect(screen.getByText('Button')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it.each(['title', 'subtitle', 'image', 'actions'])('should handle undefined %s', prop => {
      setup({ [prop]: undefined });
      expect(screen.getByText('Card Content')).toBeInTheDocument();
    });

    it('should handle rapid prop changes', () => {
      const { rerender } = setup({ title: 'Title 1' });
      rerenderWith(rerender, { title: 'Title 2' });
      rerenderWith(rerender, { title: 'Title 3' });
      expect(screen.getByText('Title 3')).toBeInTheDocument();
    });

    it('should handle image URL changes', () => {
      const { rerender } = setup({ image: '/img1.jpg', title: 'Card' });
      rerenderWith(rerender, { image: '/img2.jpg', title: 'Card' });
      expect(screen.getByAltText('Card')).toHaveAttribute('src', '/img2.jpg');
    });

    it('should handle imageHeight changes', () => {
      const { rerender } = setup({ image: '/img.jpg', imageHeight: 140, title: 'Card' });
      rerenderWith(rerender, { image: '/img.jpg', imageHeight: 300, title: 'Card' });
      expect(screen.getByAltText('Card')).toHaveAttribute('height', '300');
    });

    it('should handle actions being added/removed', () => {
      const { rerender } = setup();
      expect(screen.queryByText('Action')).not.toBeInTheDocument();
      rerenderWith(rerender, { actions: <button>Action</button> });
      expect(screen.getByText('Action')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should render with semantic HTML structure', () => {
      const { container } = setup({ title: 'Main Title', subtitle: 'Secondary' });
      expect(container.querySelector('.MuiCard-root')).toBeInTheDocument();
      expect(container.querySelector('.MuiCardHeader-root')).toBeInTheDocument();
      expect(screen.getByText('Main Title')).toBeInTheDocument();
      expect(container.querySelector('.MuiCardHeader-title')).toBeInTheDocument();
    });

    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsCardDetail {...defaultProps} />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe('Style and ClassName', () => {
    it('should merge custom className with rds-card-detail class', () => {
      const { container } = setup({ className: 'my-custom-class' });
      const card = container.querySelector('.rds-card-detail');
      expect(card).toHaveClass('my-custom-class');
      expect(card).toHaveClass('rds-card-detail');
    });

    it.each(['', undefined])('should handle className %p', className => {
      const { container } = setup({ className });
      expect(container.querySelector('.rds-card-detail')).toBeInTheDocument();
    });

    it('should apply MUI Card classes', () => {
      const { container } = setup();
      expect(container.querySelector('.MuiPaper-root')).toBeInTheDocument();
      expect(container.querySelector('.MuiCard-root')).toBeInTheDocument();
    });
  });

  describe('audit fixes', () => {
    it('G1-179: uses imageAlt as the image alt text when given', () => {
      renderWithTheme(
        <RdsCardDetail {...defaultProps} image="/img.jpg" title="Title" imageAlt="A mountain lake" />
      );
      expect(screen.getByAltText('A mountain lake')).toBeInTheDocument();
      expect(screen.queryByAltText('Title')).not.toBeInTheDocument();
    });

    it('G1-179: imageAlt="" marks the image as decorative', () => {
      const { container } = renderWithTheme(
        <RdsCardDetail {...defaultProps} image="/img.jpg" title="Title" imageAlt="" />
      );
      expect(container.querySelector('img.MuiCardMedia-root')).toHaveAttribute('alt', '');
    });

    it('G1-179: keeps the title / "Card image" fallback when imageAlt is omitted', () => {
      const { rerender } = renderWithTheme(
        <RdsCardDetail {...defaultProps} image="/img.jpg" title="Title" />
      );
      expect(screen.getByAltText('Title')).toBeInTheDocument();
      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsCardDetail {...defaultProps} image="/img.jpg" />
        </ThemeProvider>
      );
      expect(screen.getByAltText('Card image')).toBeInTheDocument();
    });

    it('does not forward imageAlt to the Card root', () => {
      const { container } = renderWithTheme(
        <RdsCardDetail {...defaultProps} image="/img.jpg" imageAlt="x" />
      );
      expect(container.querySelector('.rds-card-detail')).not.toHaveAttribute('imagealt');
    });

    it('consumer sx is applied after the base styles (not overwritten)', () => {
      const { container } = renderWithTheme(
        <RdsCardDetail {...defaultProps} sx={{ border: '3px solid rgb(255, 0, 0)' }} />
      );
      const card = container.querySelector('.rds-card-detail') as HTMLElement;
      expect(getComputedStyle(card).borderTopWidth).toBe('3px');
    });

    it('applies every entry of an sx array', () => {
      const { container } = renderWithTheme(
        <RdsCardDetail
          {...defaultProps}
          sx={[{ border: '2px solid rgb(0, 0, 255)' }, { padding: '5px' }]}
        />
      );
      const style = getComputedStyle(container.querySelector('.rds-card-detail') as HTMLElement);
      expect(style.borderTopWidth).toBe('2px');
      expect(style.paddingTop).toBe('5px');
    });

    it('keeps the base border:none for the elevation variant when sx sets no border', () => {
      const { container } = renderWithTheme(
        <RdsCardDetail {...defaultProps} sx={{ padding: '4px' }} />
      );
      const card = container.querySelector('.rds-card-detail') as HTMLElement;
      expect(getComputedStyle(card).paddingTop).toBe('4px');
      const cardClass = Array.from(card.classList).find((c) => c.startsWith('css-'));
      const rules = Array.from(document.styleSheets)
        .flatMap((sheet) => Array.from(sheet.cssRules))
        .map((rule) => rule.cssText.replace(/\s/g, ''));
      expect(rules.some((r) => r.startsWith(`.${cardClass}{`) && r.includes('border:none'))).toBe(true);
    });
  });
});

describe('RdsCardDetail slotProps.media', () => {
  it('uses slotProps.media over image/imageHeight and warns for the old props', () => {
    const { container } = render(
      <RdsCardDetail image="old.png" imageHeight={50} slotProps={{ media: { image: 'new.png', height: 200 } }}>
        x
      </RdsCardDetail>,
    );
    const img = container.querySelector('img') as HTMLImageElement;
    expect(img).toHaveAttribute('src', 'new.png');
    expect(img).toHaveAttribute('height', '200');
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsCardDetail', 'image', '`slotProps.media.image`');
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsCardDetail', 'imageHeight', '`slotProps.media.height`');
  });
});

