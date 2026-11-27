import { type JSX } from 'react';
import {
  DecoratorNode,
  type DOMConversionMap,
  type DOMExportOutput,
  type EditorConfig,
  type NodeKey,
  type SerializedLexicalNode,
  type Spread,
} from 'lexical';

type ImageData = { src: string; altText: string; width?: number; height?: number };

type SerializedImageNode = Spread<ImageData, SerializedLexicalNode>;

/** Lexical node for images inserted from the toolbar or imported from HTML. */
export class ImageNode extends DecoratorNode<JSX.Element> {
  __src: string;
  __altText: string;
  __width?: number;
  __height?: number;

  static getType(): string {
    return 'image';
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(node.__src, node.__altText, node.__width, node.__height, node.__key);
  }

  static importJSON({ src, altText, width, height }: SerializedImageNode): ImageNode {
    return $createImageNode({ src, altText, width, height });
  }

  static importDOM(): DOMConversionMap | null {
    return {
      img: () => ({
        conversion: (domNode: HTMLElement) =>
          domNode instanceof HTMLImageElement
            ? {
                node: $createImageNode({
                  src: domNode.src,
                  altText: domNode.alt,
                  width: domNode.width || undefined,
                  height: domNode.height || undefined,
                }),
              }
            : null,
        priority: 0,
      }),
    };
  }

  constructor(src: string, altText: string, width?: number, height?: number, key?: NodeKey) {
    super(key);
    this.__src = src;
    this.__altText = altText;
    this.__width = width;
    this.__height = height;
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('img');
    element.setAttribute('src', this.__src);
    element.setAttribute('alt', this.__altText);
    if (this.__width !== undefined) element.setAttribute('width', String(this.__width));
    if (this.__height !== undefined) element.setAttribute('height', String(this.__height));
    return { element };
  }

  exportJSON(): SerializedImageNode {
    return {
      type: 'image',
      version: 1,
      src: this.__src,
      altText: this.__altText,
      width: this.__width,
      height: this.__height,
    };
  }

  createDOM(config: EditorConfig): HTMLElement {
    const span = document.createElement('span');
    if (config.theme.image) span.className = config.theme.image;
    return span;
  }

  updateDOM(): false {
    return false;
  }

  decorate(): JSX.Element {
    return <img src={this.__src} alt={this.__altText} width={this.__width} height={this.__height} />;
  }
}

export function $createImageNode({ src, altText, width, height }: ImageData): ImageNode {
  return new ImageNode(src, altText, width, height);
}
