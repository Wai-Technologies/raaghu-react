import { useCallback, useMemo, useState } from "react";
import "./rds-comp-tree-structure.scss";
import * as FileType from './fileTypeIcons';
import { getAllNodeIds } from './tree-structure-utils';
import { TreeNodeRow as DirectTreeNodeRow } from './TreeNodeRow';
import { 
  TreeLevel,
  NodeState,
  IconType,
  type RdsCompTreeStructureProps,
} from './tree-structure-types';
import { type TreeNode } from './tree-structure-types';

export { TreeLevel, NodeState, IconType, type RdsCompTreeStructureProps } from './tree-structure-types';

const RdsCompTreeStructure = (props: RdsCompTreeStructureProps) => {
  const ResolvedTreeNodeRow = DirectTreeNodeRow ?? (FileType as any).TreeNodeRow ?? (FileType as any).default?.TreeNodeRow;
  const [expandedNodeIds, setExpandedNodeIds] = useState<number[]>(() =>
    props.showCollapsed ? getAllNodeIds(props.treeData) : []
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
  return (
    <div className="rds-comp-tree-structure">
      {props.treeData?.map((node: TreeNode) => (
        <ResolvedTreeNodeRow
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