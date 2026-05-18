import React, { useRef, useEffect, useState } from 'react';
import './rds-comp-masonry.scss';

export interface RdsCompMasonryProps {
  /**
   * The content of the masonry layout (array of React elements)
   */
  children?: React.ReactNode;

  /**
   * The number of columns for the masonry layout
   * @default 3
   */
  columns?: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };

  /**
   * The spacing between masonry items (in px)
   * @default 24
   */
  spacing?: number;

  /**
   * Optional CSS class name
   */
  className?: string;

  /**
   * Variant style for the masonry layout
   * @default 'standard'
   */
  variant?: 'standard' | 'compact' | 'spacious';
}

const RdsCompMasonry: React.FC<RdsCompMasonryProps> = ({
  children,
  columns = 3,
  spacing = 24,
  className,
  variant = 'standard',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [columnCount, setColumnCount] = useState(3);
  const [itemPositions, setItemPositions] = useState<Array<{ column: number; row: number }>>([]);

  // Determine responsive column count
  useEffect(() => {
    const updateColumns = () => {
      if (!containerRef.current) return;

      const width = containerRef.current.offsetWidth;
      let cols = 3;

      if (typeof columns === 'number') {
        cols = columns;
      } else {
        // Responsive columns based on screen width
        if (width < 600) cols = columns.xs || 1;
        else if (width < 960) cols = columns.sm || 2;
        else if (width < 1264) cols = columns.md || 3;
        else if (width < 1904) cols = columns.lg || 4;
        else cols = columns.xl || 5;
      }

      setColumnCount(cols);
    };

    updateColumns();
    const resizeObserver = new ResizeObserver(updateColumns);
    if (containerRef.current) resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, [columns]);

  // Distribute children to columns (true masonry: fill shortest column)
  useEffect(() => {
    const childArray = React.Children.toArray(children).filter(Boolean);
    if (childArray.length === 0) {
      setItemPositions([]);
      return;
    }

    // Initialize column row counters
    const columnRows: { [key: number]: number } = {};
    for (let i = 0; i < columnCount; i++) {
      columnRows[i] = 1; // Grid rows are 1-indexed
    }

    // Calculate positions (place each item in shortest column)
    const positions: Array<{ column: number; row: number }> = [];

    childArray.forEach(() => {
      // Find column with fewest items (shortest column)
      let shortestColumn = 0;
      let shortestRowCount = columnRows[0];

      for (let i = 1; i < columnCount; i++) {
        if (columnRows[i] < shortestRowCount) {
          shortestRowCount = columnRows[i];
          shortestColumn = i;
        }
      }

      positions.push({ column: shortestColumn, row: columnRows[shortestColumn] });
      columnRows[shortestColumn]++;
    });

    setItemPositions(positions);
  }, [children, columnCount]);

  const rootClasses = [
    'rds-comp-masonry',
    `rds-comp-masonry--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const spacingValue = 
    variant === 'compact' ? Math.max(16, spacing - 8) : 
    variant === 'spacious' ? spacing + 8 : 
    spacing;

  const childArray = React.Children.toArray(children).filter(Boolean);

  return (
    <div 
      className={rootClasses} 
      data-testid="rds-comp-masonry"
      ref={containerRef}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
        gap: `${spacingValue}px`,
        width: '100%',
        gridAutoRows: 'max-content',
      } as React.CSSProperties}
    >
      {childArray.map((child, index) => {
        const position = itemPositions[index];
        return (
          <div 
            key={index}
            className="rds-masonry-item"
            style={{
              gridColumn: (position?.column ?? 0) + 1,
              gridRow: position?.row ?? 'auto',
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
};

RdsCompMasonry.displayName = 'RdsCompMasonry';
export default RdsCompMasonry;
