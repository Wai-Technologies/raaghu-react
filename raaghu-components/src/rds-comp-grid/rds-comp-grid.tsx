import React, { useEffect, useRef, useState} from 'react';
import { DndProvider, DragSourceMonitor, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './rds-comp-grid.css';
import { RdsIcon, RdsPagination, RdsSearch } from '../rds-elements';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css'; // Import the styles for resizable

const Popup: React.FC<{
  data: any[],
  onClose: () => void,
  onFilterChange: (value: string, checked: boolean) => void,
  selectedValues: Set<string>,
  position: { top: number, left: number }
}> = ({ data, onClose, onFilterChange, selectedValues, position }) => {
  return (
    <div className="popup" style={{ top: position.top, left: position.left }}>
      <div className="popup-content">     
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <RdsIcon
           colorVariant="dark"
           height="10px"
           name="cancel"
           stroke
           width="10px"
          onClick={onClose}
        />
        </div>
        {data.map((item, index) => (
          <div key={index}>
            <input
              type="checkbox"
              id={`checkbox-${index}`}
              checked={selectedValues.has(item)}
              onChange={(e) => onFilterChange(item, e.target.checked)}
            />
            <label htmlFor={`checkbox-${index}`}>{item}</label>
          </div>
        ))}
      </div>
    </div>
  );
};


interface Column {
  key: string;
  label: string;
  displayName: string;
  hasSearch?: boolean;
  filter?: boolean;
  wraptext?: boolean;
  sortable?: boolean;
}

interface Row {
  id: string | number;
  [key: string]: any;  
}

interface RdsCompGridProps {
  tableHeaders: Column[];
  tableData: Row[];
  allSearch?: boolean;
  allFilter?: boolean;
  recordsPerPage?: number;
  recordsPerPageSelectListOption?: boolean;
  pagination: boolean;
  onPaginationHandler?: (currentPage: number, recordsPerPage: number) => void;
  totalRecords?: any;
}

interface DraggableColumnHeaderProps {
  column: {
    displayName: string;
    key: string;
    hasSearch?: boolean;
    filter?: boolean; 
  };
  index: number;
  moveColumn: (fromIndex: number, toIndex: number) => void;
  onSearchChange?: (key: string, value: string) => void;
  allFilter?: boolean;
  allSearch?: boolean; 
}

interface DragItem {
  index: number;
}

const DraggableColumnHeader: React.FC<{ column: Column; index: number; moveColumn: (fromIndex: number, toIndex: number) => void; hasSearch?: boolean; filter?:boolean; onSearchChange?: (key: string, value: string) => void; onFilterClick?: (key: string, position: DOMRect) => void; allSearch?:boolean; allFilter?: boolean; onSortClick?: (key: string) => void; sortConfig?: { key: string, direction: 'asc' | 'desc' } | null}> = ({ column, index, moveColumn, hasSearch, filter, onSearchChange, onFilterClick, allSearch, allFilter, onSortClick, sortConfig}) => {
  const refheader = useRef<HTMLTableHeaderCellElement>(null);
  const [resizeStop, setResizeStop] = useState(true);
  const [isResizing, setIsResizing] = useState(false);
  const [{ isDragging }, drag] = useDrag({
    type: 'COLUMN',
    item: { index },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

   const [, drop] = useDrop({
    accept: 'COLUMN',
    hover(item: DragItem) {
      if (item.index !== index) {      
        if(resizeStop == true) {
        moveColumn(item.index, index);
        item.index = index;
        }
      }    
    },
  });

 if (!isResizing) // if resinging start the  desable drag drop
 {
  drag(drop(refheader));
 }
  
  const handleSortIconClick = () => {
    if (onSortClick) {
      onSortClick(column.key);
    }
  };

const handleFilterIconClick = () => { 
  if (refheader.current && onFilterClick) {
    const position = refheader.current.getBoundingClientRect();
    onFilterClick(column.key, position);
  }
};
const handleResizeStop = (event: any, { size }: any) => { 
  setResizeStop(true);  
  setIsResizing(false);
}
const handleResizeStart = (event: any, { size }: any) => {
  setResizeStop(false);
  setIsResizing(true);
}

  return (
    <th className="text-nowrap"
        ref={refheader}   
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: 'move',
          position: 'relative',          
        }}        
      >
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <span>{column.displayName}</span>
          {(column.sortable) && (
            <div onClick={handleSortIconClick} style={{ cursor: 'pointer' }}>
              {sortConfig && sortConfig.key === column.key ? (
                sortConfig.direction === 'asc' ? '▲' : '▼'
              ) : (
                '↕'
              )}
            </div>
          )}

          {(column.filter || allFilter) && (
            <div>
              <RdsIcon
                colorVariant="dark"
                height="10px"
                name="filter"
                stroke
                width="20px"
                onClick={handleFilterIconClick} 
              />
            </div>
          )}
       
       
       <ResizableBox
          width={10} // Initial width of the column header
          height={20} // Height of the column header
          axis="x"
          resizeHandles={['e']}
          minConstraints={[50, Infinity]} // Minimum width the column can resize to
          maxConstraints={[400, Infinity]} // Maximum width the column can resize to
          onResizeStop={handleResizeStop}     
          onResizeStart={handleResizeStart}
        >        
        </ResizableBox>

        </div>
       
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        {(column.hasSearch || allSearch) && (
            <RdsSearch           
              labelPosition="top"
              placeholder="Search"
              size="small" 
              onChange={(e) => onSearchChange && onSearchChange(column.key, e.target.value)}             
            />
        )}
        </div>       
      
    </th>  
  );
};

const RdsCompGrid: React.FC<RdsCompGridProps> = (props: RdsCompGridProps) => {  
  const [searchTexts, setSearchTexts] = useState<{ [key: string]: string }>({});
  const [columns, setColumns] = useState<Column[]>(props.tableHeaders);
  const [totalData, setTotalData] = useState<Row[]>(props.tableData);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(props.recordsPerPage ? props.recordsPerPage : 10); 
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);
  const [totalRecords, setTotalRecords] = useState<any>(props.totalRecords);
 
  const moveColumn = (fromIndex: number, toIndex: number) => { 
    const updatedColumns = [...columns];
    const [removed] = updatedColumns.splice(fromIndex, 1);
    updatedColumns.splice(toIndex, 0, removed);
    setColumns(updatedColumns);    
  };

  const handleSearchChange = (key: string, value: string) => {
    setSearchTexts((prev) => ({ ...prev, [key]: value }));    
    setTotalData(filteredData);
  };

  const [popupData, setPopupData] = useState<any[]>([]);
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [popupPosition, setPopupPosition] = useState<{ top: number, left: number }>({ top: 0, left: 0 });
  const [popupColumnKey, setPopupColumnKey] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: Set<string> }>({});

  const handleFilterClick = (key: string, position: DOMRect) => {  
    const distinctData = Array.from(new Set(props.tableData.map((row) => row[key])));
    setPopupData(distinctData);
    setPopupVisible(true);
    setPopupColumnKey(key);
    const width = position.width;  
    const lastColumnKey = columns[columns.length - 1];

    if (lastColumnKey.key !== key) {
      setPopupPosition({ top: position.bottom, left: position.left + width - 20 });
    }
    else
    {
      setPopupPosition({ top: position.bottom, left:  position.left + 12});
    }    
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  const handleFilterChange = (value: string, checked: boolean) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      if (!newFilters[popupColumnKey!]) {
        newFilters[popupColumnKey!] = new Set();
      }
      if (checked) {
        newFilters[popupColumnKey!].add(value);
      } else {
        newFilters[popupColumnKey!].delete(value);
      }
      return newFilters;
    });
  };

  const filteredData = props.tableData.filter((row) => {
    return Object.entries(searchTexts).every(([key, value]) =>
      row[key].toString().toLowerCase().includes(value.toLowerCase())
    ) && Object.entries(selectedFilters).every(([key, values]) => {
      if (values.size === 0) return true;
      return values.has(row[key]);
    });
  });

  const getSortedData = (data: Row[], config: { key: string, direction: 'asc' | 'desc' } | null, currentPage: any) => {
    let  startingIndex = 0;
    if (currentPage === 1) {
      startingIndex = 0;   
    }
    else {
       startingIndex = (currentPage - 1) * rowsPerPage;     
    }
  
    if (!config) return data.slice(startingIndex, rowsPerPage*currentPage);
  
    return [...data].sort((a, b) => {
      if (a[config.key] < b[config.key]) {
        return config.direction === 'asc' ? -1 : 1;
      }
      if (a[config.key] > b[config.key]) {
        return config.direction === 'asc' ? 1 : -1;
      }
      return 0;
    }).slice(startingIndex, rowsPerPage*currentPage);  
  };
 
  const sortedData = getSortedData( selectedFilters? filteredData : totalData, sortConfig, currentPage);
 
  const handleSortClick = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });    
  };
 
  const [rowStatus, setRowStatus] = useState({
    startingRow: 0,
    endingRow: props.recordsPerPage,
  });

  const onPageChangeHandler = (currentPage: number, recordsPerPage: number) => { 
    props.onPaginationHandler &&
      props.onPaginationHandler(currentPage, recordsPerPage);
    if (totalRecords) {
      setRowStatus({
        startingRow:  (currentPage - 1) * recordsPerPage,//0, //0-index
        endingRow: recordsPerPage, //considering that 1st element has '0' index
      });
    } else {
      setRowStatus({
        startingRow: (currentPage - 1) * recordsPerPage, //0-index
        endingRow: currentPage * recordsPerPage, //considering that 1st element has '0' index
      });
    }
    setCurrentPage(currentPage);
  };

  useEffect(() => {
    setTotalRecords(props.totalRecords);
  }, [props.totalRecords]);

  const resetGrid = () => {   
    setSortConfig(null);
    setTotalData(props.tableData); // Reset data to original
    setSearchTexts({}); // Reset search texts
    setSelectedFilters({}); // Reset filters   
    setCurrentPage(1); // Reset to the first page   
  };

  return (
    <DndProvider backend={HTML5Backend}>     
      <table className={`table table-hover table-bordered`}
                id='grid'>
        <thead className="text-nowrap">
          <tr className="align-middle">
            {columns.map((column, index) => (
              <DraggableColumnHeader
                key={column.key}
                column={column}
                index={index}
                moveColumn={moveColumn}
                onSearchChange={handleSearchChange}             
                onFilterClick={handleFilterClick}  
                onSortClick={handleSortClick}
                sortConfig={sortConfig}
                allSearch={props.allSearch}
                allFilter={props.allFilter}     
              />
            ))}
          </tr>
        </thead>

        <tbody>
          {/* Render table rows using the reordered columns */}
          {sortedData.map((row,  rowIndex) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td className={`px-2 align-middle fw-medium ${
                  column.wraptext ? 'wrap-text' : 'text-nowrap'
                }`} key={column.key}>{row[column.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {popupVisible && (
        <Popup
          data={popupData}
          onClose={handleClosePopup}
          onFilterChange={handleFilterChange}
          selectedValues={selectedFilters[popupColumnKey!] || new Set()}
          position={popupPosition}
        />
      )}

      <div className='pagination-container'>
              <RdsIcon
                colorVariant="primary"
                height="20px"
                name="refresh"
                stroke
                width="20px"
                onClick={resetGrid}
              />
             {props.pagination  && <RdsPagination              
                totalRecords={totalRecords}                 
                recordsPerPage={
                  props.recordsPerPage ? props.recordsPerPage : 10
                }
                onPageChange={onPageChangeHandler}
                paginationType={
                  props.recordsPerPageSelectListOption ? "default" : "advanced"
                }
              ></RdsPagination>
             }
             
      </div>         
   
    </DndProvider>
  );
};

export default RdsCompGrid;
