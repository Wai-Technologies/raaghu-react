import type { ReactNode, Ref } from 'react';
import type { SxProps, Theme } from '@mui/material';

export enum TreeLevel {
  Level1 = "Level1",
  Level2 = "Level2",
  Level3 = "Level3",
  Level4 = "Level4",
}

export const IconType = {
  Circle: 'Circle',
  Folder: 'Folder',
} as const;
export type IconType = (typeof IconType)[keyof typeof IconType];

export interface TreeNode {
  id: number;
  name: string;
  language?: string;
  children?: TreeNode[];
}

export interface RdsCompTreeStructureProps {
  level?: TreeLevel;
  showChewron?: boolean;
  showCheckbox?: boolean;
  showFolder?: boolean;
  showFile?: boolean;
  showCollapsed?: boolean;
  selected?: boolean;
  type?: IconType;
  showActions?: boolean;
  treeData?: TreeNode[];
  language?: string;
  /** @deprecated Has no effect. */
  iconName?: ReactNode;
  text?: string;
  fileTypeIcons?: { [key: string]: React.ReactNode };
  getFileIcon?: (fileType: string) => React.ReactNode;
  checkedNodes?: number[];
  onSelectNode?: (item: TreeNode) => void;
  onDeleteNode?: (id: number) => void;
  onNodeEdit?: (data: TreeNode) => void;
  onCreateNode?: (node: TreeNode) => void;
  onCreateSubUnit?: (node: TreeNode) => void;
  onMoveNode?: (id: number) => void;
  onCheckboxChange?: (nodeId: number, checked: boolean) => void;
  sx?: SxProps<Theme>;
  ref?: Ref<HTMLDivElement>;
  className?: string;
}
