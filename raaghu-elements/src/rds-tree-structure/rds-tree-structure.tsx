import React, { useState, useEffect } from "react";
import "./rds-tree-structure.css";
import RdsIcon from "../rds-icon/rds-icon";

export enum TreeLevel {
  Level1 = "level1",
  Level2 = "level2",
  Level3 = "level3",
  Level4 = "level4",
}

export enum NodeState {
  Default = "default",
  Hover = "hover",
  Selected = "selected",
}

export enum IconType {
  Circle = "circle",
  Folder = "folder",
}

export interface RdsTreeStructureProps {
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
  onSelectNode?: (item: any) => void; //Callback when a node is selected.
  onDeleteNode?: (id: any) => void; //Callback when a node is deleted.
  onNodeEdit?: (data: any) => void; //Callback when a node is edited.
  onCreateNode?: (node: any) => void; //Callback when a new node is created.
  onCreateSubUnit?: (node: any) => void; //Callback when a new sub-unit is created.
  onMoveNode?: (id: any) => void; //Callback when a node is moved.
}

const fileTypeIcons = {
  CSS: "cssicon",
  Cplus: "cppicon",
  Config: "configicon",
  Database: "databaseicon",
  Default: "defaulticon",
  Docker: "dockericon",
  ESLint: "eslinticon",
  Git: "giticon",
  GitHub: "githubicon",
  Go: "goicon",
  Gulp: "gulpicon",
  HTML: "htmlicon",
  JS: "jsicon",
  JSON: "jsonicon",
  Markdown: "markdownicon",
  Notebook: "notebookicon",
  Python: "pythonicon",
  React: "reacticon",
  Sass: "sassicon",
  TypeScript: "typescripticon",
  XML: "xmlicon",
  YML: "ymlicon",
};

const getFileIcon = (fileType: keyof typeof fileTypeIcons) => {
  const fileTypes = fileTypeIcons[fileType] || fileTypeIcons.Default;
  return fileTypeIcons[fileType] || fileTypeIcons.Default;
};

const TreeNode = ({
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
  props: RdsTreeStructureProps;
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
      return "light"; // Define this class in your CSS
    }
    return "";
  };

  const handleClick = () => {
    onNodeClick(node.id);
  };

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCheckboxClick(node.id);
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
    <div className="tree-node-container">
      <div
        className={`tree-node p-1 cursor-pointer ${props.state === "hover" ? "nodehover" : ""}`}
        style={{ marginLeft: level * 20 }}
      >
        <div
          className="d-flex align-items-center p-3 filename"
          onMouseEnter={(e) => handleMouseEnter(e)}
          onMouseLeave={(e) => handleMouseLeave(e)}
          onClick={handleClick}
        >
          {(node.children && level < maxLevel && props.showChewron) && (
            <span
              className="me-2 cursor-pointer"
              style={{
                transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
                transition: "transform 0.2s",
              }}
            >
              <RdsIcon
                height="16px"
                width="16px"
                name="chevron_right"
                fill={false}
                stroke={true}
              />
            </span>
          )}
          {props.showCheckbox && (
            <input
              className="me-2"
              type="checkbox"
              onClick={handleCheckboxClick}
            />
          )}
          {props.showFolder && (
            <span style={{ color: "#FFA500", marginRight: 5 }}>
              {props.type === "circle" ? (
                <span
                  style={{
                    display: "inline-block",
                    width: "10px",
                    height: "10px",
                    backgroundColor: "#CDCDCD",
                    borderRadius: "50%",
                  }}
                ></span>
              ) : (
                <RdsIcon
                  height="18px"
                  width="18px"
                  name="treefolder"
                  fill={false}
                  stroke={false}
                />
              )}
            </span>
          )}
          {props.showFile && (
            <span style={{ color: "#0066cc" }}>
              <RdsIcon
                height="18px"
                width="18px"
                name={getFileIcon(props.Language as keyof typeof fileTypeIcons || "Default")}
                fill={false}
                stroke={false}
              />
            </span>
          )}
          <span style={{ marginLeft: 5 }}>{props.text || node.name}</span> {/* Display the text or node name */}
          {(isHovered && props.showActions) && (
            <div className="d-flex btngroup" onClick={(e) => e.stopPropagation()}>
              <small
                className="customborder p-2"
                onMouseEnter={() => handleIconMouseEnter("plus")}
                onMouseLeave={handleIconMouseLeave}
              >
                <RdsIcon
                  height="16px"
                  width="16px"
                  name="plus"
                  fill={false}
                  stroke={true}
                  colorVariant={getIconClass("plus") === "light" ? "light" : "primary"}
                  classes={`p-1`}
                  onClick={(e) => handlerButtonGroupClick(e, "plus", { data: node })}
                />
              </small>
              <small
                className="customborder p-2"
                onMouseEnter={() => handleIconMouseEnter("pencil")}
                onMouseLeave={handleIconMouseLeave}
              >
                <RdsIcon
                  height="16px"
                  width="16px"
                  name="pencil"
                  fill={false}
                  stroke={true}
                  colorVariant={getIconClass("pencil") === "light" ? "light" : "primary"}
                  classes={`p-1`}
                  onClick={(e) => handlerButtonGroupClick(e, "edit", { data: node })}
                />
              </small>
              <small
                className="customborder p-2"
                onMouseEnter={() => handleIconMouseEnter("move")}
                onMouseLeave={handleIconMouseLeave}
              >
                <RdsIcon
                  height="16px"
                  width="16px"
                  name="move"
                  fill={false}
                  stroke={true}
                  colorVariant={getIconClass("move") === "light" ? "light" : "primary"}
                  classes={`p-1`}
                  onClick={(e) => handlerButtonGroupClick(e, "move", { data: node })}
                />
              </small>
              <small
                className="customborder p-2"
                onMouseEnter={() => handleIconMouseEnter("delete")}
                onMouseLeave={handleIconMouseLeave}
              >
                <RdsIcon
                  height="16px"
                  width="16px"
                  name="delete"
                  fill={false}
                  stroke={true}
                  colorVariant={getIconClass("delete") === "light" ? "light" : "primary"}
                  classes={`p-1`}
                  onClick={(e) => handlerButtonGroupClick(e, "delete", { data: node })}
                />
              </small>
            </div>
          )}
        </div>
      </div>
      {isExpanded &&
        node.children &&
        level < maxLevel &&
        node.children.map((child: any) => (
          <div className="tree-node-children" key={child.id}>
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

const RdsTreeStructure = (props: RdsTreeStructureProps) => {
  const [expandedNodeIds, setExpandedNodeIds] = useState<number[]>([]);
  const [hoveredNodeId, setHoveredNodeId] = useState<number | null>(null);

  useEffect(() => {
    if (!props.showCollapsed) {
      setExpandedNodeIds([]);
    } else {
      const allNodeIds = getAllNodeIds(props.treeData);
      setExpandedNodeIds(allNodeIds);
    }
  }, [props.showCollapsed]);

  const handleNodeClick = (id: number) => {
    setExpandedNodeIds((prevExpandedNodeIds) =>
      prevExpandedNodeIds.includes(id)
        ? prevExpandedNodeIds.filter((nodeId) => nodeId !== id)
        : [...prevExpandedNodeIds, id]
    );
  };

  const handleCheckboxClick = (id: number) => {
    console.log(`Checkbox clicked for node ${id}`);
    // Add your custom logic here
  };

  const maxLevel = parseInt(props.level?.replace('level', '') || '1');

  return (
    <div>
      {props.treeData?.map((node: any) => (
        <TreeNode
          key={node.id}
          node={node}
          level={1}
          maxLevel={maxLevel}
          props={props}
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

const getAllNodeIds = (nodes: any[]): number[] => {
  let ids: number[] = [];
  nodes.forEach((node) => {
    ids.push(node.id);
    if (node.children) {
      ids = ids.concat(getAllNodeIds(node.children));
    }
  });
  return ids;
};

export default RdsTreeStructure;