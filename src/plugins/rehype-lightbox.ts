import { visit } from "unist-util-visit";
import type { Root } from "hast";

export default function rehypeLightbox() {
  return (tree: Root) => {
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'img') return;
      node.properties = { ...node.properties, 'data-lightbox': '', loading: 'lazy', decoding: 'async' };
    });
  };
}