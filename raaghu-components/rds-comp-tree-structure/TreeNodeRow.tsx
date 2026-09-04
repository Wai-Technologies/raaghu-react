import { type MouseEvent, type ChangeEvent } from 'react';
import clsx from 'clsx';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FolderIcon from '@mui/icons-material/Folder';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenWithIcon from '@mui/icons-material/OpenWith';
import RdsCheckbox from '../../raaghu-elements/rds-checkbox/rds-checkbox';
import { type TreeNode, type RdsCompTreeStructureProps } from './tree-structure-types';

export const TreeNodeRow = ({
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
  node: TreeNode;
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

  const handleChevronClick = (e: MouseEvent) => {
    e.stopPropagation();
    onNodeClick(node.id);
  };

  const handleCheckboxClick = (e: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    e.stopPropagation();
    onCheckboxClick(node.id);
    if (props.onCheckboxChange) props.onCheckboxChange(node.id, checked);
  };

  const handleMouseEnter = (e: MouseEvent) => {
    e.stopPropagation();
    setHoveredNodeId(node.id);
  };

  const handleMouseLeave = (e: MouseEvent) => {
    e.stopPropagation();
    setHoveredNodeId(null);
  };

  const handlerButtonGroupClick = (e: MouseEvent, id: string, nodeObj: { data: TreeNode }) => {
    if (id == 'plus') {
      e.stopPropagation();
      props.onCreateNode && props.onCreateNode(nodeObj.data);
    }
    if (id == 'edit') {
      e.stopPropagation();
      props.onNodeEdit && props.onNodeEdit(nodeObj.data);
    }
    if (id == 'move') {
      e.stopPropagation();
      props.onMoveNode && props.onMoveNode(nodeObj.data.id);
    }
    if (id == 'delete') {
      e.stopPropagation();
      props.onDeleteNode && props.onDeleteNode(nodeObj.data.id);
    }
  };

  return (
    <div className="rds-comp-tree-structure__node-container">
      <div
        className={clsx(
          'rds-comp-tree-structure__node',
          props.state === 'Hover' && 'rds-comp-tree-structure__node--hover'
        )}
        style={{ marginLeft: level * 20 }}
      >
        <div
          className="rds-comp-tree-structure__node-content"
          onMouseEnter={(e) => handleMouseEnter(e as any)}
          onMouseLeave={(e) => handleMouseLeave(e as any)}
        >
          {(node.children && level < maxLevel && props.showChewron) && (
            <button
              type="button"
              className={clsx(
                'rds-comp-tree-structure__chevron',
                isExpanded && 'rds-comp-tree-structure__chevron--expanded'
              )}
              onClick={handleChevronClick}
              aria-label="Toggle node"
            >
              <ChevronRightIcon />
            </button>
          )}
          {props.showCheckbox && (
            <div
              className="rds-comp-tree-structure__checkbox-container"
              onClick={(e) => e.stopPropagation()}
            >
              <RdsCheckbox
                className="rds-comp-tree-structure__checkbox"
                onChange={handleCheckboxClick}
                status={props.checkedNodes?.includes(node.id) ? 'checked' : 'unchecked'}
                showText={false}
                size="small"
              />
            </div>
          )}
          {props.showFolder && (
            <span className="rds-comp-tree-structure__icon rds-comp-tree-structure__icon--folder">
              {props.type === 'Circle' ? (
                <span className="rds-comp-tree-structure__icon--circle"></span>
              ) : (
                <FolderIcon className="rds-comp-tree-structure__icon--folder" />
              )}
            </span>
          )}
          {props.showFile && (
            <span className="rds-comp-tree-structure__icon rds-comp-tree-structure__icon--file">
              {props.getFileIcon ?
                props.getFileIcon(node.language || props.Language || 'Default') :
                // minimal fallback: render nothing if no icon provider
                <span />
              }
            </span>
          )}
          <span className="rds-comp-tree-structure__text">{props.text || node.name}</span>
          {props.showActions && (
            <span></span>
          )}
          {(isHovered && props.showActions) && (
            <div className="rds-comp-tree-structure__actions" aria-label="Item actions">
              <button
                type="button"
                className="rds-comp-tree-structure__action-btn"
                onClick={(e) => handlerButtonGroupClick(e as any, 'plus', { data: node })}
                aria-label="Add child"
              >
                <AddIcon />
              </button>
              <button
                type="button"
                className="rds-comp-tree-structure__action-btn"
                onClick={(e) => handlerButtonGroupClick(e as any, 'edit', { data: node })}
                aria-label="Edit node"
              >
                <EditIcon />
              </button>
              <button
                type="button"
                className="rds-comp-tree-structure__action-btn"
                onClick={(e) => handlerButtonGroupClick(e as any, 'move', { data: node })}
                aria-label="Move node"
              >
                <OpenWithIcon />
              </button>
              <button
                type="button"
                className="rds-comp-tree-structure__action-btn"
                onClick={(e) => handlerButtonGroupClick(e as any, 'delete', { data: node })}
                aria-label="Delete node"
              >
                <DeleteIcon />
              </button>
            </div>
          )}
        </div>
      </div>
      {isExpanded && node.children && level < maxLevel && node.children.map((child: TreeNode) => (
        <div
          className="rds-comp-tree-structure__node-children"
          key={child.id}
          style={{ overflow: 'visible' }}
        >
          <TreeNodeRow
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

TreeNodeRow.displayName = 'TreeNodeRow';
