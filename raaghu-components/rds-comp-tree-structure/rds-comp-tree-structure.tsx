import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./rds-comp-tree-structure.scss";
import { 
  fileTypeIcons as defaultFileTypeIcons, 
  getFileIcon as getDefaultFileIcon,
  TreeLevel,
  NodeState,
  IconType,
  type RdsCompTreeStructureProps,
  TreeNode,
  getAllNodeIds
} from './fileTypeIcons';

export { 
  defaultFileTypeIcons, 
  getDefaultFileIcon, 
  TreeLevel, 
  NodeState, 
  IconType, 
  type RdsCompTreeStructureProps 
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

  const handleNodeClick = useCallback((id: number) => {
    setExpandedNodeIds((prevExpandedNodeIds) =>
      prevExpandedNodeIds.includes(id)
        ? prevExpandedNodeIds.filter((nodeId) => nodeId !== id)
        : [...prevExpandedNodeIds, id]
    );
  }, []);

  const handleCheckboxClick = useCallback((id: number) => {

    if (!props.checkedNodes) {
      setCheckedNodeIds((prevCheckedNodeIds) =>
        prevCheckedNodeIds.includes(id)
          ? prevCheckedNodeIds.filter((nodeId) => nodeId !== id)
          : [...prevCheckedNodeIds, id]
      );
    }
  }, [props.checkedNodes]);

  const getMaxLevelFromEnum = useCallback((level?: TreeLevel): number => {
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
  }, []);

  const maxLevel = useMemo(() => getMaxLevelFromEnum(props.level), [getMaxLevelFromEnum, props.level]);

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