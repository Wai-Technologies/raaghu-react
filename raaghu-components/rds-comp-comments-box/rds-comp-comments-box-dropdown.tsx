import { useRef, useEffect, type RefObject } from 'react';
import ComputerIcon from '@mui/icons-material/Computer';
import CloudIcon from '@mui/icons-material/Cloud';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

interface DropdownMenuProps {
  visible: boolean;
  anchorRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
  onSelect: (label: string) => void;
}

export const DropdownMenu = ({ visible, anchorRef, onClose, onSelect, labels }: DropdownMenuProps & { labels?: { computer?: string; googleDrive?: string; oneDrive?: string } }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }
    if (visible) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [visible, onClose, anchorRef]);
  if (!visible) return null;
  return (
    <div ref={menuRef} className="rds-comments-box__attachment-dropdown-menu">
      <button type="button" className="rds-comments-box__attachment-dropdown-item" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} onClick={() => { onSelect(labels?.computer || 'Computer'); onClose(); }}>
        <ComputerIcon className="rds-comments-box__attachment-dropdown-icon" />
        <span className="rds-comments-box__attachment-dropdown-label">{labels?.computer || 'Computer'}</span>
      </button>
      <button type="button" className="rds-comments-box__attachment-dropdown-item" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} onClick={() => { onSelect(labels?.googleDrive || 'Google Drive'); onClose(); }}>
        <InsertDriveFileIcon className="rds-comments-box__attachment-dropdown-icon" />
        <span className="rds-comments-box__attachment-dropdown-label">{labels?.googleDrive || 'Google Drive'}</span>
      </button>
      <button type="button" className="rds-comments-box__attachment-dropdown-item" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} onClick={() => { onSelect(labels?.oneDrive || 'One Drive'); onClose(); }}>
        <CloudIcon className="rds-comments-box__attachment-dropdown-icon" />
        <span className="rds-comments-box__attachment-dropdown-label">{labels?.oneDrive || 'One Drive'}</span>
      </button>
    </div>
  );
};

DropdownMenu.displayName = 'DropdownMenu';
