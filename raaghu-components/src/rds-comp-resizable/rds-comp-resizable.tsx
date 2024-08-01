
import React, { useState } from 'react';
import Resizable from 'react-resizable-layout';

interface ColumnConfig {
  id: string;
  theme: string;
  size: number | string; // Can be a number in pixels or a string in percentage
}

interface ResizableComponentProps {
  columns: ColumnConfig[];
  axis?: 'x' | 'y';
  min?: number;
  max?: number;
}

const ResizableComponent: React.FC<ResizableComponentProps> = ({
  columns,
  axis = 'x',
  min = 100,
  max = Infinity
}) => {
  const [columnSizes, setColumnSizes] = useState<number[]>(columns.map(col => typeof col.size === 'number' ? col.size : 0));

  const handleResize = (index: number, newSize: number) => {
    setColumnSizes(prevSizes => {
      const newSizes = [...prevSizes];
      newSizes[index] = newSize;
      return newSizes;
    });
  };

  return (
    <Resizable axis={axis} min={min} max={max}>
      {({ position, separatorProps }) => (
        <div id="wrapper" style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
          {columns.map((col, index) => {
            const columnWidth = typeof col.size === 'string' ? col.size : `${col.size}px`;
            const adjustedWidth = columnSizes[index] ? `${columnSizes[index]}px` : columnWidth;

            return (
              <React.Fragment key={col.id}>
                <div
                  id={col.id}
                  style={{
                    width: adjustedWidth,
                    background: col.theme,
                    transition: 'width 0.2s'
                  }}
                >
                  <div style={{ padding: '20px', textAlign: 'center' }}>{col.id}</div>
                </div>
                {index < columns.length - 1 && (
                  <div
                    {...separatorProps}
                    style={{ cursor: 'col-resize', padding: '0 10px', background: '#ccc' }}
                    onMouseDown={() => handleResize(index, position)}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      )}
    </Resizable>
  );
};

export default ResizableComponent;