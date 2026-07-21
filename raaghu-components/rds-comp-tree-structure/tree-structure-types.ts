export enum TreeLevel {
  Level1 = "Level1",
  Level2 = "Level2",
  Level3 = "Level3",
  Level4 = "Level4",
}

export enum NodeState {
  Default = "Default",
  Hover = "Hover",
  Selected = "Selected",
}

export enum IconType {
  Circle = "Circle",
  Folder = "Folder",
}

export interface TreeNode {
  id: number;
  name: string;
  language?: string;
  icon?: string;
  children?: TreeNode[];
}

export interface RdsCompTreeStructureProps {
  level?: TreeLevel;
  showChewron?: boolean;
  showCheckbox?: boolean;
  showFolder?: boolean;
  showFile?: boolean;
  showCollapsed?: boolean;
  state?: NodeState;
  type?: IconType;
  showActions?: boolean;
  treeData?: TreeNode[];
  Language?: string;
  iconName?: string;
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
}
