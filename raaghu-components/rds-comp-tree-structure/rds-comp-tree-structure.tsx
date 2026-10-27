import { useCallback, useMemo, useState } from "react";
import { Box } from "@mui/material";
import clsx from "clsx";
import "./rds-comp-tree-structure.scss";
import { getAllNodeIds } from './tree-structure-utils';
import { TreeNodeRow } from './TreeNodeRow';
import { 
  TreeLevel,
  type RdsCompTreeStructureProps,
} from './tree-structure-types';
import { type TreeNode } from './tree-structure-types';

export { TreeLevel, IconType, type RdsCompTreeStructureProps } from './tree-structure-types';

const RdsCompTreeStructure = (props: RdsCompTreeStructureProps) => {
  const [expandedNodeIds, setExpandedNodeIds] = useState<number[]>(() =>
    props.showCollapsed ? getAllNodeIds(props.treeData ?? []) : []
  );
  const [hoveredNodeId, setHoveredNodeId] = useState<number | null>(null);
  const [checkedNodeIds, setCheckedNodeIds] = useState<number[]>(props.checkedNodes || []);

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
  // Prefer controlled `checkedNodes` when provided so parent updates are visible.
  const resolvedCheckedNodes = props.checkedNodes ?? checkedNodeIds;
  const { className, sx, ref } = props;
  return (
    <Box ref={ref} className={clsx("rds-comp-tree-structure", className)} sx={sx}>
      {props.treeData?.map((node: TreeNode) => (
        <TreeNodeRow
          key={node.id}
          node={node}
          level={1}
          maxLevel={maxLevel}
          props={{ ...props, checkedNodes: resolvedCheckedNodes }}
          expandedNodeIds={expandedNodeIds}
          hoveredNodeId={hoveredNodeId}
          setHoveredNodeId={setHoveredNodeId}
          onNodeClick={handleNodeClick}
          onCheckboxClick={handleCheckboxClick}
        />
      ))}
    </Box>
  );
};

RdsCompTreeStructure.displayName = "RdsCompTreeStructure";
export default RdsCompTreeStructure;