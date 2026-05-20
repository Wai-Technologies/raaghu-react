import React, { useState, useCallback } from 'react';
import { TreeView, TreeItem, TreeViewProps } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import './rds-comp-tree-view.scss';

export interface RdsTreeNode {
  id: string;
  label: React.ReactNode;
  children?: RdsTreeNode[];
  disabled?: boolean;
  icon?: React.ReactElement;
}

export interface RdsCompTreeViewProps extends Omit<TreeViewProps, 'defaultExpanded' | 'defaultCollapseIcon' | 'defaultEndIcon' | 'defaultExpandIcon'> {
  nodes: RdsTreeNode[];
  expanded?: string[];
  defaultExpanded?: string[];
  selected?: string | string[];
  defaultSelected?: string | string[];
  multiSelect?: boolean;
  showLines?: boolean;
  showCheckbox?: boolean;
  itemSize?: 'small' | 'medium' | 'large';
  onNodeToggle?: (expanded: string[]) => void;
  onNodeSelect?: (selected: string | string[]) => void;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const renderNodes = (nodes: RdsTreeNode[]) =>
  nodes.map((n) => (
    <TreeItem
      key={n.id}
      nodeId={n.id}
      label={n.label}
      disabled={n.disabled}
      classes={{ label: 'rds-comp-tree-view__label' }}
    >
      {n.children && n.children.length > 0 ? renderNodes(n.children) : null}
    </TreeItem>
  ));

// removed static native renderer — a dynamic native renderer is created inside the component

const RdsCompTreeView = React.forwardRef<HTMLDivElement, RdsCompTreeViewProps>(
  (
    {
      nodes,
      expanded: controlledExpanded,
      defaultExpanded,
      selected: controlledSelected,
      defaultSelected,
      multiSelect = false,
      onNodeToggle,
      onNodeSelect,
      size = 'medium',
      className,
      ...props
    },
    ref
  ) => {
    const isControlledExpanded = controlledExpanded !== undefined;
    const isControlledSelected = controlledSelected !== undefined;

    const [internalExpanded, setInternalExpanded] = useState<string[]>(defaultExpanded || []);
    const [internalSelected, setInternalSelected] = useState<string | string[] | null>(defaultSelected || null);

    const expanded = isControlledExpanded ? controlledExpanded : internalExpanded;
    const selected = isControlledSelected ? controlledSelected : internalSelected || undefined;

    const handleNodeToggle = useCallback(
      (_: React.SyntheticEvent, nodeIds: string[]) => {
        if (!isControlledExpanded) setInternalExpanded(nodeIds);
        onNodeToggle?.(nodeIds);
      },
      [isControlledExpanded, onNodeToggle]
    );

    const handleNodeSelect = useCallback(
      (_: React.SyntheticEvent, nodeIds: string | string[]) => {
        if (!isControlledSelected) setInternalSelected(nodeIds as any);
        onNodeSelect?.(nodeIds as any);
      },
      [isControlledSelected, onNodeSelect]
    );

    const effectiveSize = (props.itemSize as any) || size;
    const rootClasses = ['rds-comp-tree-view', `rds-comp-tree-view--${effectiveSize}`, className].filter(Boolean).join(' ');

    return (
      <div className={rootClasses} ref={ref} data-testid="rds-comp-tree-view-root">
        <TreeView
          multiSelect={multiSelect}
          expanded={expanded}
          selected={selected as any}
          defaultExpanded={defaultExpanded}
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          onNodeToggle={handleNodeToggle}
          onNodeSelect={handleNodeSelect}
          {...props}
        >
          {renderNodes(nodes)}
        </TreeView>

        {/* Native fallback for environments where MUI TreeView doesn't render */}
        <div className={`rds-comp-tree-view__native ${props.showLines ? 'rds-comp-tree-view--lines' : ''}`}>
          {(() => {
            const isSelected = (id: string) => {
              if (multiSelect) {
                return Array.isArray(selected) && (selected as string[]).includes(id);
              }
              return selected === id;
            };

            const toggleSelect = (id: string) => {
              if (multiSelect) {
                const sel = Array.isArray(selected) ? [...(selected as string[])] : [];
                const idx = sel.indexOf(id);
                if (idx >= 0) sel.splice(idx, 1);
                else sel.push(id);
                if (!isControlledSelected) setInternalSelected(sel);
                onNodeSelect?.(sel);
              } else {
                const next = selected === id ? null : id;
                if (!isControlledSelected) setInternalSelected(next as any);
                onNodeSelect?.(next as any);
              }
            };

            const toggleExpand = (id: string) => {
              const exp = Array.isArray(expanded) ? [...expanded] : [];
              const idx = exp.indexOf(id);
              if (idx >= 0) exp.splice(idx, 1);
              else exp.push(id);
              if (!isControlledExpanded) setInternalExpanded(exp);
              onNodeToggle?.(exp);
            };

            const nativeRender = (items: RdsTreeNode[], level = 0) => (
              <ul className="rds-comp-tree-view__fallback" role={level === 0 ? 'tree' : 'group'}>
                {items.map((n) => {
                  const hasChildren = !!(n.children && n.children.length > 0);
                  const expandedNow = Array.isArray(expanded) && expanded.includes(n.id);
                  return (
                    <li key={n.id} className={`rds-comp-tree-view__fallback-item ${hasChildren ? 'has-children' : 'is-leaf'} ${expandedNow ? 'is-expanded' : ''}`} role="treeitem" aria-expanded={hasChildren ? expandedNow : undefined} style={{ paddingLeft: `${level * 16}px` }}>
                      <div className="rds-comp-tree-view__row">
                        {hasChildren ? (
                          <button type="button" className="rds-comp-tree-view__chev" aria-label={expandedNow ? 'Collapse' : 'Expand'} onClick={() => toggleExpand(n.id)}>
                            {expandedNow ? '▾' : '▸'}
                          </button>
                        ) : (
                          <span className="rds-comp-tree-view__chev" />
                        )}

                        {props.showCheckbox ? (
                          <button type="button" className={`rds-comp-tree-view__checkbox ${isSelected(n.id) ? 'is-checked' : ''}`} onClick={() => toggleSelect(n.id)} aria-pressed={isSelected(n.id)} />
                        ) : null}

                        <span className="rds-comp-tree-view__icon">{n.icon ?? (hasChildren ? '📁' : '📄')}</span>
                        <span className="rds-comp-tree-view__label">{n.label}</span>
                      </div>
                      {hasChildren && expandedNow ? nativeRender(n.children!, level + 1) : null}
                    </li>
                  );
                })}
              </ul>
            );

            return nativeRender(nodes);
          })()}
        </div>
      </div>
    );
  }
);

RdsCompTreeView.displayName = 'RdsCompTreeView';

export default RdsCompTreeView;
