import React, { useState } from 'react';
// Import all necessary Material-UI icons
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DescriptionIcon from '@mui/icons-material/Description';
import CodeIcon from '@mui/icons-material/Code';
import DataObjectIcon from '@mui/icons-material/DataObject';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SettingsIcon from '@mui/icons-material/Settings';
import StorageIcon from '@mui/icons-material/Storage';
import JavascriptIcon from '@mui/icons-material/Javascript';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import StyleIcon from '@mui/icons-material/Style';
import TypeSpecimenIcon from '@mui/icons-material/TypeSpecimen';
import GitHubIcon from '@mui/icons-material/GitHub';
import TagIcon from '@mui/icons-material/Tag';
import ReorderIcon from '@mui/icons-material/Reorder';
import HexagonIcon from '@mui/icons-material/Hexagon';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FolderIcon from '@mui/icons-material/Folder';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenWithIcon from '@mui/icons-material/OpenWith';
import RdsCheckbox from '../../raaghu-elements/rds-checkbox/rds-checkbox';

// Enums
export enum TreeLevel {
  Level1 = "level1",
  Level2 = "level2",
  Level3 = "level3",
  Level4 = "level4",
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

// Utility function to detect language from file name
export const getLanguageFromFileName = (fileName: string): string | null => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  const extensionMap: { [key: string]: string } = {
    // Common file extensions
  };
  
  // Special cases for files without extensions or special names
  if (fileName.toLowerCase().includes('dockerfile')) return 'Docker';
  if (fileName.toLowerCase().includes('.eslintrc')) return 'ESLint';
  if (fileName.toLowerCase().includes('gulpfile')) return 'Gulp';
  if (fileName.toLowerCase().includes('.git')) return 'Git';
  if (fileName.toLowerCase().includes('.github')) return 'GitHub';
  
  return extension ? extensionMap[extension] || null : null;
};

// Utility function to get all node IDs
export const getAllNodeIds = (nodes: any[]): number[] => {
  let ids: number[] = [];
  nodes.forEach((node) => {
    ids.push(node.id);
    if (node.children) {
      ids = ids.concat(getAllNodeIds(node.children));
    }
  });
  return ids;
};

// Props interface
export interface RdsCompTreeStructureProps {
  level?: TreeLevel; //Level of the tree structure.
  showChewron?: boolean; //Show chevron icon for expandable nodes.
  showCheckbox?: boolean; // Show checkboxes next to the nodes.
  showFolder?: boolean; //Show folder icons for folder nodes.
  showFile?: boolean; //Show file icons for file nodes.
  showCollapsed?: boolean; //Initially collapsed or expanded tree.
  state?: NodeState; //State of the node
  type?: IconType; //Type of icon for folder nodes
  showActions?: boolean; //Show action buttons (add, edit, delete) for nodes.
  treeData?: any; //Data for the tree structure.
  Language?: string; //Language for file icons.
  iconName?: string; // Name of the icon to display.
  text?: string; // Text to display for the node.
  fileTypeIcons?: { [key: string]: React.ReactNode }; // File type icons mapping
  getFileIcon?: (fileType: string) => React.ReactNode; // Function to get file icon
  checkedNodes?: number[]; // Array of checked node IDs
  onSelectNode?: (item: any) => void; //Callback when a node is selected.
  onDeleteNode?: (id: any) => void; //Callback when a node is deleted.
  onNodeEdit?: (data: any) => void; //Callback when a node is edited.
  onCreateNode?: (node: any) => void; //Callback when a new node is created.
  onCreateSubUnit?: (node: any) => void; //Callback when a new sub-unit is created.
  onMoveNode?: (id: any) => void; //Callback when a node is moved.
  onCheckboxChange?: (nodeId: number, checked: boolean) => void; //Callback when checkbox state changes.
}

// Proper file type icons with correct Material-UI components
export const fileTypeIcons = {
  CSS: <TagIcon sx={{ color: '#1565C0', fontSize: '18px' }} />,
  Cplus: <CodeIcon sx={{ color: '#00599C', fontSize: '18px' }} />,
  Config: <SettingsIcon sx={{ color: '#90A4AE', fontSize: '18px' }} />,
  Database: <StorageIcon sx={{ color: '#F06292', fontSize: '18px' }} />,
  Default: <InsertDriveFileIcon sx={{ color: '#90A4AE', fontSize: '18px' }} />,
  Docker: <ReorderIcon sx={{ color: '#B0BEC5', fontSize: '18px' }} />,
  ESLint: <CodeIcon sx={{ color: '#4B32C3', fontSize: '18px' }} />,
  Git: <HexagonIcon sx={{ color: '#9575CD', fontSize: '18px', background: 'white', borderRadius: '4px' }} />,
  GitHub: <GitHubIcon sx={{ color: '#181717', fontSize: '18px' }} />,
  Go: <CodeIcon sx={{ color: '#00ADD8', fontSize: '18px' }} />,
  Gulp: <GitHubIcon sx={{ color: '#181717', fontSize: '18px' }} />,
  HTML: <CodeIcon sx={{ color: '#E86C1A', fontSize: '18px' }} />,
  JS: <JavascriptIcon sx={{ color: '#F7DF1E', fontSize: '22px' }} />,
  JSON: <DataObjectIcon sx={{ color: '#FBC02D', fontSize: '18px' }} />,
  Markdown: <ArrowDownwardIcon sx={{ color: '#2236f8', fontSize: '18px' }} />,
  Notebook: <MenuBookIcon sx={{ color: '#2236f8', fontSize: '18px' }} />,
  Python: <CodeIcon sx={{ color: '#3776AB', fontSize: '18px' }} />,
  React: <IntegrationInstructionsIcon sx={{ color: '#61DAFB', fontSize: '18px' }} />,
  Sass: <StyleIcon sx={{ color: '#CC6699', fontSize: '18px' }} />,
  TypeScript: <TypeSpecimenIcon sx={{ color: '#3178C6', fontSize: '18px' }} />,
  XML: <CodeIcon sx={{ color: '#FF6600', fontSize: '18px' }} />,
  YML: <DescriptionIcon sx={{ color: '#FFEB3B', fontSize: '18px' }} />
};

// Function to get file icon
export const getFileIcon = (fileType: string) => {
  return fileTypeIcons[fileType as keyof typeof fileTypeIcons] || fileTypeIcons.Default;
};

// TreeNode component
export const TreeNode = ({
  node,
  level,
  maxLevel,
  props,
  expandedNodeIds,
  hoveredNodeId,
  setHoveredNodeId,
  onNodeClick,
  onCheckboxClick,
}: {
  node: any;
  level: number;
  maxLevel: number;
  props: RdsCompTreeStructureProps;
  expandedNodeIds: number[];
  hoveredNodeId: number | null;
  setHoveredNodeId: (id: number | null) => void;
  onNodeClick: (id: number) => void;
  onCheckboxClick: (id: number) => void;
}) => {
  const isExpanded = expandedNodeIds.includes(node.id);
  const isHovered = hoveredNodeId === node.id;
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const handleIconMouseEnter = (iconName: string) => {
    setHoveredIcon(iconName);
  };

  const handleIconMouseLeave = () => {
    setHoveredIcon(null);
  };

  const getIconClass = (iconName: string) => {
    if (hoveredIcon === iconName) {
      return "light"; 
    }
    return "";
  };

  // Only chevron should expand/collapse
  const handleChevronClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNodeClick(node.id);
  }

  const handleCheckboxClick = (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    e.stopPropagation();
    onCheckboxClick(node.id);
    if (props.onCheckboxChange) {
      props.onCheckboxChange(node.id, checked);
    }
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHoveredNodeId(node.id);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHoveredNodeId(null);
  };

  const handlerButtonGroupClick = (e: any, id: any, node: any) => {
    if (id == 'plus') {
        e.stopPropagation();
        props.onCreateNode && props.onCreateNode(node.data)
    }
    if (id == 'edit') {
        e.stopPropagation();
        props.onNodeEdit && props.onNodeEdit(node.data);
    }
    if (id == 'move') {
      e.stopPropagation();
        props.onMoveNode && props.onMoveNode(node.data.id);
    }
    if (id == 'delete') {
      e.stopPropagation();
        props.onDeleteNode && props.onDeleteNode(node.data.id);
    }
  };

  return (
    <div className="rds-comp-tree-structure__node-container">
      <div
        className={`rds-comp-tree-structure__node ${props.state === "Hover" ? "rds-comp-tree-structure__node--hover" : ""}`}
        style={{ marginLeft: level * 20 }}
      >
        <div
          className="rds-comp-tree-structure__node-content"
          onMouseEnter={(e) => handleMouseEnter(e)}
          onMouseLeave={(e) => handleMouseLeave(e)}
        >
          {(node.children && level < maxLevel && props.showChewron) && (
            <span
              className={`rds-comp-tree-structure__chevron ${isExpanded ? 'rds-comp-tree-structure__chevron--expanded' : ''}`}
              onClick={handleChevronClick}
            >
              <ChevronRightIcon />
            </span>
          )}
          {props.showCheckbox && (
            <div 
              className="rds-comp-tree-structure__checkbox-container"
              onClick={(e) => e.stopPropagation()}
            >
              <RdsCheckbox
                className="rds-comp-tree-structure__checkbox"
                onChange={handleCheckboxClick}
                status={props.checkedNodes?.includes(node.id) ? "checked" : "unchecked"}
                showText={false}
                size="small"
              />
            </div>
          )}
          {props.showFolder && (
            <span className="rds-comp-tree-structure__icon rds-comp-tree-structure__icon--folder">
              {props.type === "Circle" ? (
                <span className="rds-comp-tree-structure__icon--circle"></span>
              ) : (
                <FolderIcon className="rds-comp-tree-structure__icon--folder" />
              )}
            </span>
          )}
          {props.showFile && (
            <span className="rds-comp-tree-structure__icon rds-comp-tree-structure__icon--file">
              {props.getFileIcon ? 
                props.getFileIcon(node.language || props.Language || getLanguageFromFileName(node.name) || "Default") : 
                getFileIcon(node.language || props.Language || getLanguageFromFileName(node.name) || "Default")
              }
            </span>
          )}
          <span className="rds-comp-tree-structure__text">{props.text || node.name}</span>
          {/* Debug info */}
          {props.showActions && (
            <span></span>
          )}
          {(isHovered && props.showActions) && (
            <div className="rds-comp-tree-structure__actions" onClick={(e) => e.stopPropagation()}>
              <small
                className="rds-comp-tree-structure__action-btn"
                onMouseEnter={() => handleIconMouseEnter("plus")}
                onMouseLeave={handleIconMouseLeave}
                onClick={(e) => handlerButtonGroupClick(e, "plus", { data: node })}
              >
                <AddIcon />
              </small>
              <small
                className="rds-comp-tree-structure__action-btn"
                onMouseEnter={() => handleIconMouseEnter("pencil")}
                onMouseLeave={handleIconMouseLeave}
                onClick={(e) => handlerButtonGroupClick(e, "edit", { data: node })}
              >
                <EditIcon />
              </small>
              <small
                className="rds-comp-tree-structure__action-btn"
                onMouseEnter={() => handleIconMouseEnter("move")}
                onMouseLeave={handleIconMouseLeave}
                onClick={(e) => handlerButtonGroupClick(e, "move", { data: node })}
              >
                <OpenWithIcon />
              </small>
              <small
                className="rds-comp-tree-structure__action-btn"
                onMouseEnter={() => handleIconMouseEnter("delete")}
                onMouseLeave={handleIconMouseLeave}
                onClick={(e) => handlerButtonGroupClick(e, "delete", { data: node })}
              >
                <DeleteIcon/>
              </small>
            </div>
          )}
        </div>
      </div>
      {isExpanded &&
        node.children &&
        level < maxLevel &&
        node.children.map((child: any) => (
          <div className="rds-comp-tree-structure__node-children" key={child.id}>
            <TreeNode
              node={child}
              level={level + 1}
              maxLevel={maxLevel}
              props={props}
              expandedNodeIds={expandedNodeIds}
              hoveredNodeId={hoveredNodeId}
              setHoveredNodeId={setHoveredNodeId}
              onNodeClick={onNodeClick}
              onCheckboxClick={onCheckboxClick}
            />
          </div>
        ))}
    </div>
  );
};

export default fileTypeIcons;