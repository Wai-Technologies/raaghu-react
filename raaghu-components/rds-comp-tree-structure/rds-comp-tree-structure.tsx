import React, { useState, useEffect } from "react";
import "./rds-comp-tree-structure.scss";

// Inlined contents previously in fileTypeIcons.tsx

// Enums
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
export const defaultFileTypeIcons = {
  CSS: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.82366 16L2.68387 11.614H0V9.29825H3.23441L3.75054 6.5614H0.963441V4.2807H4.30107L5.16129 0H8.15484L7.29462 4.2807H10.3226L11.1828 0H14.1763L13.3161 4.2807H16V6.5614H12.9032L12.2495 9.29825H15.0366V11.614H11.8366L10.9763 16H7.94839L8.8086 11.614H5.81505L4.95484 16H1.82366ZM9.25591 9.33333L9.77204 6.5614H6.77849L6.22796 9.33333H9.25591Z" fill="#2534E9"/>
    </svg>
  ),
  Cplus: (
    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 6.95825C0 5.86349 0.181927 4.88005 0.545782 4.00795C0.909635 3.13585 1.37882 2.42147 1.95332 1.86481C2.54698 1.2896 3.27469 0.816435 4.13645 0.445327C4.8067 0.148442 5.67804 0 6.75045 0C7.65051 0 8.45482 0.176276 9.16337 0.528827C9.89108 0.881378 10.4943 1.2896 10.9731 1.75348L8.99102 3.92445L8.76122 3.75745C8.43567 3.51624 8.18672 3.36779 8.01436 3.31213L7.69838 3.22863C7.31538 3.1173 6.9994 3.06163 6.75045 3.06163C6.32914 3.06163 5.93656 3.14513 5.57271 3.31213C5.17056 3.51624 4.845 3.78529 4.59605 4.11928C4.3471 4.43473 4.13645 4.84294 3.96409 5.34394C3.79174 5.84493 3.70557 6.38303 3.70557 6.95825C3.70557 8.29423 4.00239 9.24983 4.59605 9.82505C4.90245 10.1962 5.24716 10.4652 5.63016 10.6322C6.01317 10.7992 6.44405 10.8827 6.9228 10.8827C7.40156 10.8827 7.82286 10.7992 8.18672 10.6322C8.58887 10.4281 8.91442 10.159 9.16337 9.82505L11.1454 12.0239C10.5901 12.6362 9.92938 13.1279 9.16337 13.499C8.45482 13.833 7.65051 14 6.75045 14C5.90784 14 5.03651 13.8608 4.13645 13.5825C3.33214 13.3227 2.614 12.8867 1.98205 12.2744C1.71394 11.996 1.45542 11.6342 1.20646 11.1889C1.07241 10.9291 0.88091 10.5116 0.631957 9.93638C0.210652 9.11995 0 8.12724 0 6.95825ZM8.90485 4.70378H7.64093V6.17893H6.20467V7.40358H7.64093V8.96223H8.90485V7.40358H10.3411V6.17893H8.90485V4.70378ZM14.2765 6.09543V4.36978H12.754V6.09543H11.0592V7.57058H12.754V9.40755H14.2765V7.57058H16V6.09543H14.2765Z" fill="#2534E9"/>
    </svg>
  ),
  Config: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M15.4857 9.09623C15.3356 9.05886 15.1198 8.98411 14.8383 8.87198L14.5005 8.73182C14.5005 8.52626 14.4817 8.2366 14.4442 7.86284C14.4254 7.48909 14.416 7.19943 14.416 6.99387C14.416 6.95649 14.4254 6.92846 14.4442 6.90977C14.4817 6.8724 14.5005 6.83502 14.5005 6.79765L15.4857 6.37717C15.6546 6.28373 15.7672 6.16226 15.8235 6.01276C15.8798 5.84457 15.8798 5.67639 15.8235 5.5082L15.0353 3.74221C14.9415 3.55533 14.8101 3.43386 14.6412 3.3778C14.4911 3.30305 14.3316 3.31239 14.1627 3.40583L13.1774 3.8263C13.0649 3.8263 13.0086 3.79827 13.0086 3.74221C12.9335 3.63008 12.7927 3.48058 12.5863 3.29371L12.3893 3.12552C12.333 3.06945 12.2298 2.98536 12.0796 2.87323C11.9483 2.74242 11.845 2.64898 11.77 2.59292C11.845 2.48079 11.9201 2.3126 11.9952 2.08835C12.089 1.84541 12.1641 1.66788 12.2204 1.55575C12.3142 1.3315 12.3142 1.13528 12.2204 0.967088C12.1453 0.798899 11.9952 0.677429 11.77 0.602678C11.526 0.546614 11.1225 0.425144 10.5596 0.238267L10.1092 0.0700788C9.88397 -0.0233596 9.68692 -0.0233596 9.51802 0.0700788C9.34913 0.14483 9.22715 0.284987 9.15208 0.490551C9.11455 0.640053 9.03948 0.854962 8.92689 1.13528L8.78614 1.47166C8.57971 1.47166 8.28883 1.49034 7.91351 1.52772C7.53818 1.54641 7.2473 1.55575 7.04087 1.55575C7.00334 1.55575 6.96581 1.54641 6.92828 1.52772C6.90951 1.49034 6.88136 1.47166 6.84383 1.47166L6.42159 0.490551C6.32776 0.322362 6.19639 0.210236 6.02749 0.154172C5.87737 0.0981099 5.71785 0.0981099 5.54896 0.154172L3.77554 0.939055C3.58788 1.03249 3.45651 1.16331 3.38145 1.3315C3.32515 1.481 3.34392 1.63984 3.43775 1.80803L3.85999 2.78914C3.85999 2.90126 3.83184 2.95733 3.77554 2.95733L3.5785 3.12552C3.44713 3.21895 3.36268 3.30305 3.32515 3.3778C3.25009 3.47124 3.13749 3.6114 2.98736 3.79827C2.83723 3.96646 2.71525 4.09728 2.62142 4.19071C2.49005 4.15334 2.28362 4.07859 2.00213 3.96646L1.66433 3.8263C1.43914 3.73287 1.24209 3.73287 1.0732 3.8263C0.9043 3.90106 0.782319 4.05056 0.707254 4.27481L0.566507 4.61119C0.341312 5.17182 0.181798 5.58295 0.0879669 5.84457C-0.00586439 6.1062 -0.0246307 6.31177 0.031668 6.46127C0.106733 6.61077 0.266247 6.7229 0.510208 6.79765C0.660339 6.83502 0.876151 6.90977 1.15764 7.0219L1.49544 7.16206C1.49544 7.36762 1.50482 7.65728 1.52359 8.03103C1.56112 8.40479 1.57989 8.69445 1.57989 8.90001C1.57989 8.93739 1.56112 8.97476 1.52359 9.01214C1.50482 9.03083 1.49544 9.05886 1.49544 9.09623L0.510208 9.51671C0.341312 9.61014 0.228714 9.74096 0.172415 9.90915C0.116116 10.0586 0.116116 10.2175 0.172415 10.3857L0.960599 12.1517C1.05443 12.3385 1.17641 12.4694 1.32654 12.5441C1.49544 12.6002 1.66433 12.5815 1.83323 12.488L2.81846 12.0676C2.93106 12.0676 2.98736 12.0956 2.98736 12.1517C3.06242 12.2638 3.20317 12.4133 3.4096 12.6002L3.60664 12.7684C3.66294 12.8244 3.75677 12.9085 3.88814 13.0206C4.03827 13.1328 4.15087 13.2262 4.22593 13.301C4.16963 13.4131 4.09457 13.5906 4.00074 13.8336C3.90691 14.0578 3.83184 14.226 3.77554 14.3381C3.68171 14.5624 3.67233 14.7586 3.74739 14.9268C3.84122 15.095 4.00074 15.2258 4.22593 15.3192C4.3573 15.3566 4.57311 15.4314 4.87337 15.5435C5.30499 15.7304 5.64279 15.8612 5.88675 15.9359C6.14948 16.0107 6.35591 16.02 6.50604 15.964C6.65617 15.9079 6.76876 15.7491 6.84383 15.4874C6.88136 15.3379 6.95643 15.123 7.06902 14.8427L7.20977 14.5063C7.4162 14.5063 7.70708 14.497 8.0824 14.4783C8.45773 14.4409 8.74861 14.4222 8.95504 14.4222C8.99257 14.4222 9.02072 14.4409 9.03948 14.4783C9.07702 14.497 9.11455 14.5063 9.15208 14.5063L9.57432 15.4874C9.66815 15.6556 9.79014 15.7677 9.94027 15.8238C10.1092 15.8799 10.2781 15.8799 10.447 15.8238L12.2204 15.0389C12.408 14.9455 12.53 14.824 12.5863 14.6745C12.6614 14.5063 12.652 14.3381 12.5582 14.1699L12.1359 13.2169C12.1359 13.0861 12.1641 13.0206 12.2204 13.0206C12.333 12.9459 12.4831 12.8057 12.6708 12.6002L12.8397 12.404C12.896 12.3479 12.9804 12.2545 13.093 12.1236C13.2056 11.9741 13.2994 11.8714 13.3745 11.8153C13.5059 11.834 13.7123 11.9087 13.9938 12.0395L14.3316 12.1517C14.5568 12.2451 14.7538 12.2545 14.9227 12.1797C15.0916 12.0863 15.2136 11.9274 15.2887 11.7032C15.345 11.5724 15.4294 11.3574 15.542 11.0584C15.7297 10.6286 15.8516 10.2922 15.9079 10.0493C16.1144 9.56343 15.9736 9.24573 15.4857 9.09623ZM9.32098 10.9183C8.4765 11.2733 7.6414 11.292 6.81568 10.9743C6.00873 10.6567 5.40821 10.0867 5.01412 9.26442C4.65756 8.42348 4.63879 7.60122 4.95782 6.79765C5.27684 5.97539 5.84922 5.36804 6.67493 4.9756C7.51941 4.62053 8.34513 4.60184 9.15208 4.91953C9.9778 5.23723 10.5877 5.8072 10.9818 6.62946C11.3384 7.4704 11.3571 8.30201 11.0381 9.12426C10.7191 9.92784 10.1467 10.5258 9.32098 10.9183Z" fill="#6D8086"/>

// Function to get file icon
export const getFileIcon = (fileType: string) => {
  return defaultFileTypeIcons[fileType as keyof typeof defaultFileTypeIcons] || defaultFileTypeIcons.Default;
};

// TreeNode component (inlined)
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
        className={`rds-comp-tree-structure__node ${props.state === "Hover" ? "rds-comp-tree-structure__node--hover" : ""} rds-comp-tree-structure__node--lvl-${level}`}
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
          {props.showActions && isHovered && (
            <div className="rds-comp-tree-structure__actions" onClick={(e) => e.stopPropagation()}>
              <small
                className="rds-comp-tree-structure__action-btn"
                onClick={(e) => handlerButtonGroupClick(e, "plus", { data: node })}
              >
                <AddIcon />
              </small>
              <small
                className="rds-comp-tree-structure__action-btn"
                onClick={(e) => handlerButtonGroupClick(e, "edit", { data: node })}
              >
                <EditIcon />
              </small>
              <small
                className="rds-comp-tree-structure__action-btn"
                onClick={(e) => handlerButtonGroupClick(e, "move", { data: node })}
              >
                <OpenWithIcon />
              </small>
              <small
                className="rds-comp-tree-structure__action-btn"
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

const RdsCompTreeStructure = (props: RdsCompTreeStructureProps) => {
  const [expandedNodeIds, setExpandedNodeIds] = useState<number[]>([]);
  const [hoveredNodeId, setHoveredNodeId] = useState<number | null>(null);
  const [checkedNodeIds, setCheckedNodeIds] = useState<number[]>(props.checkedNodes || []);

  useEffect(() => {
    if (!props.showCollapsed) {
      setExpandedNodeIds([]);
    } else {
      const allNodeIds = getAllNodeIds(props.treeData);
      setExpandedNodeIds(allNodeIds);
    }
  }, [props.showCollapsed]);

  // Sync with external checkedNodes prop
  useEffect(() => {
    if (props.checkedNodes) {
      setCheckedNodeIds(props.checkedNodes);
    }
  }, [props.checkedNodes]);

  const handleNodeClick = (id: number) => {
    setExpandedNodeIds((prevExpandedNodeIds) =>
      prevExpandedNodeIds.includes(id)
        ? prevExpandedNodeIds.filter((nodeId) => nodeId !== id)
        : [...prevExpandedNodeIds, id]
    );
  };

  const handleCheckboxClick = (id: number) => {

    if (!props.checkedNodes) {
      setCheckedNodeIds((prevCheckedNodeIds) =>
        prevCheckedNodeIds.includes(id)
          ? prevCheckedNodeIds.filter((nodeId) => nodeId !== id)
          : [...prevCheckedNodeIds, id]
      );
    }
  };

  const getMaxLevelFromEnum = (level?: TreeLevel): number => {
    if (!level) return 1;
    
    switch (level) {
      case TreeLevel.Level1:
        return 1;
      case TreeLevel.Level2:
        return 2;
      case TreeLevel.Level3:
        return 3;
      case TreeLevel.Level4:
        return 4;
      default:
        return 1;
    }
  };

  const maxLevel = getMaxLevelFromEnum(props.level);

  return (
    <div className="rds-comp-tree-structure">
      {props.treeData?.map((node: any) => (
        <TreeNode
          key={node.id}
          node={node}
          level={1}
          maxLevel={maxLevel}
          props={{...props, checkedNodes: checkedNodeIds}}
          expandedNodeIds={expandedNodeIds}
          hoveredNodeId={hoveredNodeId}
          setHoveredNodeId={setHoveredNodeId}
          onNodeClick={handleNodeClick}
          onCheckboxClick={handleCheckboxClick}
        />
      ))}
    </div>
  );
};

RdsCompTreeStructure.displayName = "RdsCompTreeStructure";
export default RdsCompTreeStructure;