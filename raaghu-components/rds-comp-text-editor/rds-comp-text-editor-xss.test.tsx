/**
 * XSS security tests for RdsCompTextEditor
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompTextEditor from './rds-comp-text-editor';
import { sanitizeEditorHtml } from './sanitize-html';
import { RaaghuThemeProvider } from '../../raaghu-react-themes/src/provider/RaaghuThemeProvider';

describe('RdsCompTextEditor XSS Protection', () => {
  const renderInTheme = (ui: React.ReactElement) => {
    return render(<RaaghuThemeProvider>{ui}</RaaghuThemeProvider>);
  };

  describe('sanitizeEditorHtml', () => {
    it('should strip <img> onerror attacks', () => {
      const maliciousHtml = '<img src="x" onerror="alert(\'XSS\')">';
      const sanitized = sanitizeEditorHtml(maliciousHtml);
      expect(sanitized).not.toContain('onerror');
      expect(sanitized).not.toContain('alert');
    });

    it('should strip javascript: href attacks', () => {
      const maliciousHtml = '<a href="javascript:alert(\'XSS\')">Click me</a>';
      const sanitized = sanitizeEditorHtml(maliciousHtml);
      expect(sanitized).not.toContain('javascript:');
      expect(sanitized).not.toContain('alert');
    });

    it('should strip <svg><script> attacks', () => {
      const maliciousHtml = '<svg><script>alert(\'XSS\')</script></svg>';
      const sanitized = sanitizeEditorHtml(maliciousHtml);
      expect(sanitized).not.toContain('<script');
      expect(sanitized).not.toContain('alert');
    });

    it('should strip <iframe> attacks', () => {
      const maliciousHtml = '<iframe src="javascript:alert(\'XSS\')"></iframe>';
      const sanitized = sanitizeEditorHtml(maliciousHtml);
      expect(sanitized).not.toContain('<iframe');
      expect(sanitized).not.toContain('javascript:');
    });

    it('should strip onclick event handlers', () => {
      const maliciousHtml = '<div onclick="alert(\'XSS\')">Click me</div>';
      const sanitized = sanitizeEditorHtml(maliciousHtml);
      expect(sanitized).not.toContain('onclick');
      expect(sanitized).not.toContain('alert');
    });

    it('should strip onmouseover event handlers', () => {
      const maliciousHtml = '<span onmouseover="alert(\'XSS\')">Hover me</span>';
      const sanitized = sanitizeEditorHtml(maliciousHtml);
      expect(sanitized).not.toContain('onmouseover');
      expect(sanitized).not.toContain('alert');
    });

    it('should strip onload event handlers', () => {
      const maliciousHtml = '<body onload="alert(\'XSS\')">Content</body>';
      const sanitized = sanitizeEditorHtml(maliciousHtml);
      expect(sanitized).not.toContain('onload');
      expect(sanitized).not.toContain('alert');
    });

    it('should strip onfocus event handlers', () => {
      const maliciousHtml = '<input onfocus="alert(\'XSS\')">';
      const sanitized = sanitizeEditorHtml(maliciousHtml);
      expect(sanitized).not.toContain('onfocus');
      expect(sanitized).not.toContain('alert');
      expect(sanitized).not.toContain('<input');
    });

    it('should strip <form> tags', () => {
      const maliciousHtml = '<form action="https://evil.com"><input name="data"></form>';
      const sanitized = sanitizeEditorHtml(maliciousHtml);
      expect(sanitized).not.toContain('<form');
      expect(sanitized).not.toContain('<input');
    });

    it('should strip <object> and <embed> tags', () => {
      const maliciousHtml = '<object data="evil.swf"></object><embed src="evil.swf">';
      const sanitized = sanitizeEditorHtml(maliciousHtml);
      expect(sanitized).not.toContain('<object');
      expect(sanitized).not.toContain('<embed');
    });

    it('should allow safe HTML', () => {
      const safeHtml = '<p>Hello <strong>world</strong></p><a href="https://example.com">Link</a>';
      const sanitized = sanitizeEditorHtml(safeHtml);
      expect(sanitized).toContain('<p>');
      expect(sanitized).toContain('<strong>');
      expect(sanitized).toContain('<a');
      expect(sanitized).toContain('https://example.com');
    });

    it('should allow data URIs for images', () => {
      const imageDataUri = '<img src="data:image/png;base64,iVBORw0KGgoAAAANS..." alt="test">';
      const sanitized = sanitizeEditorHtml(imageDataUri);
      expect(sanitized).toContain('<img');
      expect(sanitized).toContain('data:image/png');
    });

    it('should block data: URIs outside images', () => {
      const sanitized = sanitizeEditorHtml('<a href="data:text/html,<script>alert(1)</script>">Open</a>');
      expect(sanitized).toContain('Open');
      expect(sanitized).not.toContain('data:text/html');
    });

    it('should block javascript: protocol case-insensitively', () => {
      const variations = [
        '<a href="javascript:alert(1)">Test</a>',
        '<a href="JavaScript:alert(1)">Test</a>',
        '<a href="JAVASCRIPT:alert(1)">Test</a>',
        '<a href="  javascript:alert(1)">Test</a>',
      ];
      
      variations.forEach(html => {
        const sanitized = sanitizeEditorHtml(html);
        expect(sanitized.toLowerCase()).not.toContain('javascript:');
      });
    });

    it('should handle empty or null input', () => {
      expect(sanitizeEditorHtml('')).toBe('');
      expect(sanitizeEditorHtml(null as unknown as string)).toBe(null);
      expect(sanitizeEditorHtml(undefined as unknown as string)).toBe(undefined);
    });
  });

  describe('Editor integration', () => {
    it('should render without crashing with safe content', () => {
      renderInTheme(
        <RdsCompTextEditor
          defaultValue="<p>Safe content</p>"
          placeholder="Type here..."
        />
      );
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('should sanitize malicious content on initialization', () => {
      const { container } = renderInTheme(
        <RdsCompTextEditor
          defaultValue='<img src="x" onerror="alert(1)">Test'
          placeholder="Type here..."
        />
      );
      const html = container.innerHTML;
      expect(html).not.toContain('onerror');
      expect(html).not.toContain('alert');
    });
  });
});
