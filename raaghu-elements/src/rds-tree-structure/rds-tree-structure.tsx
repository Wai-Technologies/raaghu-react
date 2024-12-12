import React, { useState, useEffect } from "react";
import "./rds-tree-structure.css";
import RdsIcon from "../rds-icon/rds-icon";

export interface RdsTreeStructureProps {
  level?: "level1" | "level2" | "level3" | "level4";
  showChewron?: boolean;
  showCheckbox?: boolean;
  showFolder?: boolean;
  showFileIcon?: boolean;
  showCollapsed?: boolean;
  state?: "default" | "hover" | "selected";
  folderType?: "circle" | "folder";
  showActions?: boolean;
  treeData?: any;
  fileLanguage?: string;
  iconName?: string;
  onSelectNode?: (item: any) => void;
  onDeleteNode?: (id: any) => void;
  onNodeEdit?: (data: any) => void;
  onCreateNode?: (node: any) => void;
  onCreateSubUnit?: (node: any) => void;
  onMoveNode?: (id: any) => void;
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
}
  return (
    <div
      className="tree-node-container"
     
    >
      <div
        className={`tree-node p-1 cursor-pointer ${props.state === "hover" ? "nodehover" : ""}`}
        style={{ marginLeft: level * 20 }}
     
       
      >
        <div className="d-flex align-items-center p-3 filename"    onMouseEnter={(e)=> handleMouseEnter(e)}
        onMouseLeave={(e)=>handleMouseLeave(e)}
        onClick={handleClick}>
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
              {props.folderType === "circle" ? (
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
          {props.showFileIcon && <span style={{ color: "#0066cc" }}> <RdsIcon
              height="18px"
              width="18px"
              name={getFileIcon(props.fileLanguage as keyof typeof fileTypeIcons || "Default")}
              fill={false}
              stroke={false}
            /></span>}
          <span style={{ marginLeft: 5 }}>{node.name}</span>
          {(isHovered && props.showActions) && (
           <div className="ms-auto d-flex btngroup" onClick={(e) => e.stopPropagation()}>
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
               colorVariant={getIconClass("plus") === "light" ? "light" : "primary"} // Apply the color conditionally
               classes={`p-1`} // Apply the class conditionally
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
               colorVariant={getIconClass("pencil") === "light" ? "light" : "primary"} // Apply the color conditionally
               classes={`p-1`} // Apply the class conditionally
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
               colorVariant={getIconClass("move") === "light" ? "light" : "primary"} // Apply the color conditionally
               classes={`p-1`} // Apply the class conditionally
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
               colorVariant={getIconClass("delete") === "light" ? "light" : "primary"} // Apply the color conditionally
               classes={`p-1`} // Apply the class conditionally
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