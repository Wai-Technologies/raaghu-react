/**
 * Tests for HTML sanitization in the text editor.
 * These tests ensure XSS protection via DOMPurify (RDS-020).
 */

import { sanitizeEditorHtml } from './sanitize-html';

describe('sanitizeEditorHtml', () => {
  describe('XSS Protection', () => {
    it('should remove script tags', () => {
      const malicious = '<p>Hello</p><script>alert("XSS")</script>';
      const sanitized = sanitizeEditorHtml(malicious);
      expect(sanitized).not.toContain('<script>');
      expect(sanitized).not.toContain('alert');
      expect(sanitized).toContain('<p>Hello</p>');
    });

    it('should remove inline event handlers', () => {
      const malicious = '<p onclick="alert(\'XSS\')">Click me</p>';
      const sanitized = sanitizeEditorHtml(malicious);
      expect(sanitized).not.toContain('onclick');
      expect(sanitized).not.toContain('alert');
      expect(sanitized).toContain('<p>Click me</p>');
    });

    it('should remove javascript: protocol in links', () => {
      const malicious = '<a href="javascript:alert(\'XSS\')">Link</a>';
      const sanitized = sanitizeEditorHtml(malicious);
      expect(sanitized).not.toContain('javascript:');
      expect(sanitized).not.toContain('alert');
    });

    it('should remove iframe tags', () => {
      const malicious = '<p>Content</p><iframe src="https://evil.com"></iframe>';
      const sanitized = sanitizeEditorHtml(malicious);
      expect(sanitized).not.toContain('<iframe');
      expect(sanitized).toContain('<p>Content</p>');
    });

    it('should remove object and embed tags', () => {
      const malicious = '<object data="evil.swf"></object><embed src="evil.swf">';
      const sanitized = sanitizeEditorHtml(malicious);
      expect(sanitized).not.toContain('<object');
      expect(sanitized).not.toContain('<embed');
    });

    it('should remove form tags', () => {
      const malicious = '<form action="https://evil.com"><input name="data"></form>';
      const sanitized = sanitizeEditorHtml(malicious);
      expect(sanitized).not.toContain('<form');
    });

    it('should handle data URIs in images', () => {
      const dataUri = '<img src="data:image/png;base64,iVBORw0KGgoAAAANS..." alt="Test">';
      const sanitized = sanitizeEditorHtml(dataUri);
      expect(sanitized).toContain('<img');
      expect(sanitized).toContain('data:image/png');
    });

    it('should sanitize pasted HTML content', () => {
      const pastedContent = `
        <div>
          <p>Normal text</p>
          <script>console.log("evil")</script>
          <p onclick="steal()">Clickable</p>
          <a href="javascript:void(0)">Bad link</a>
        </div>
      `;
      const sanitized = sanitizeEditorHtml(pastedContent);
      
      expect(sanitized).toContain('Normal text');
      expect(sanitized).not.toContain('<script>');
      expect(sanitized).not.toContain('onclick');
      expect(sanitized).not.toContain('javascript:');
      expect(sanitized).not.toContain('steal()');
      expect(sanitized).not.toContain('console.log');
    });
  });

  describe('Allowed HTML', () => {
    it('should preserve safe HTML tags', () => {
      const safe = '<p><strong>Bold</strong> and <em>italic</em></p>';
      const sanitized = sanitizeEditorHtml(safe);
      expect(sanitized).toBe(safe);
    });

    it('should preserve links with safe protocols', () => {
      const safe = '<a href="https://example.com">Link</a>';
      const sanitized = sanitizeEditorHtml(safe);
      expect(sanitized).toContain('<a href="https://example.com">Link</a>');
    });

    it('should preserve lists', () => {
      const safe = '<ul><li>Item 1</li><li>Item 2</li></ul>';
      const sanitized = sanitizeEditorHtml(safe);
      expect(sanitized).toContain('<ul>');
      expect(sanitized).toContain('<li>');
    });

    it('should preserve text formatting', () => {
      const safe = '<p><u>Underline</u> and <s>strikethrough</s></p>';
      const sanitized = sanitizeEditorHtml(safe);
      expect(sanitized).toContain('<u>');
      expect(sanitized).toContain('<s>');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty string', () => {
      expect(sanitizeEditorHtml('')).toBe('');
    });

    it('should handle null-ish values', () => {
      expect(sanitizeEditorHtml(null as any)).toBe(null);
      expect(sanitizeEditorHtml(undefined as any)).toBe(undefined);
    });

    it('should handle plain text', () => {
      const plain = 'Just plain text';
      expect(sanitizeEditorHtml(plain)).toBe(plain);
    });

    it('should handle deeply nested XSS attempts', () => {
      const nested = '<div><div><div><script>alert("XSS")</script></div></div></div>';
      const sanitized = sanitizeEditorHtml(nested);
      expect(sanitized).not.toContain('<script>');
      expect(sanitized).toContain('<div>');
    });
  });
});
