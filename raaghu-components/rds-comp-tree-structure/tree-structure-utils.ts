import { type TreeNode } from './tree-structure-types';

export const getAllNodeIds = (nodes: TreeNode[]): number[] => {
  let ids: number[] = [];
  nodes.forEach((node) => {
    ids.push(node.id);
    if (node.children) {
      ids = ids.concat(getAllNodeIds(node.children));
    }
  });
  return ids;
};
