import React from "react"
import  RdsTable  from "./rds-table"
import figma from "@figma/code-connect"
import RdsBadge from "../rds-badge/rds-badge"
import RdsIconButton from "../../raaghu-elements/rds-icon-button/rds-icon-button";
import DeleteIcon from '@mui/icons-material/Delete';
import RdsProgress from "../../raaghu-elements/rds-progress/rds-progress";
import RdsAvatar from '../../raaghu-elements/rds-avatar/rds-avatar';

figma.connect(
  RdsTable,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=1601-16775",
  {
    props: {

    },
    example: (props) => 
    <RdsTable
  columns={[
    {
      align: 'center',
      id: 'menuIcon',
      label: 'Text',
      minWidth: 60,
      type: 'text'
    },
    {
      id: 'text1',
      label: 'Text',
      minWidth: 80,
      type: 'text'
    },
    {
      format: (value: string) => (
          <div className="rds-table__content-row">
            <RdsBadge
              badgeContent="Badge"
              color="secondary"
              size="small"
              shape="rectangle"
              colorVariant="secondary"
            />
          </div>
        ),
      id: 'badge1',
      label: 'Text',
      minWidth: 60,
      type: 'text'
    },
    {
      align: 'center',
      id: 'radio1',
      label: 'Text',
      minWidth: 80,
      type: 'radio'
    },
    {
      align: 'center',
      id: 'checkbox1',
      label: 'Text',
      minWidth: 80,
      type: 'checkbox'
    },
    {
      id: 'text2',
      label: 'Text',
      minWidth: 80,
      type: 'text'
    },
    {
      format: (value: unknown) => value as React.ReactNode,
      id: 'textColumn',
      label: 'Text',
      minWidth: 80,
      type: 'text'
    },
    {
    format: (value: string) => (
            <RdsAvatar
              alt="User Avatar"
              subText="Developer"
              displayStyle="with-name"
              title="Wai Technologies"
              showDesignation
              showName
            />
        ),
      id: 'user',
      label: 'Text',
      minWidth: 230,
      type: 'text'
    },
    {
      id: 'sampleText',
      label: 'Text',
      minWidth: 165,
      type: 'text'
    },
    {
      format: (value: unknown) => value as React.ReactNode,
      id: 'linkText',
      label: 'Text',
      minWidth: 80,
      type: 'text'
    },
    {
    format: (value: string) => (
          <div className="rds-table__progress-container">
              <RdsProgress
              color="primary"
              stepperType="circle"
              steps={4}
              style="line"
              variant="determinate"
            />
            <span>{value}</span>
        </div>
        ),
      id: 'progressBar1',
      label: 'Text',
      minWidth: 120,
      type: 'text' as const,
    },
    {
      id: 'text5',
      label: 'Text',
      minWidth: 180,
      type: 'text' as const,
      format: (value: string) => (
          <div className="rds-table__content-row">
            <span>{value}</span>
            <div className="rds-table__badge-group">
              <RdsBadge
                badgeContent="Active"
                color="secondary"
                size="small"
                shape="rectangle"
                colorVariant="secondary"
              />
              <RdsBadge
                badgeContent="Pending"
                color="secondary"
                size="small"
                shape="rectangle"
                colorVariant="secondary"
              />
            </div>
          </div>
        ),
    },
    {
      align: 'center',
      format: (value: string) => (
          <RdsIconButton color="error">
             <DeleteIcon />
          </RdsIconButton>
        ),
      id: 'deleteAction',
      label: 'Text',
      minWidth: 80,
      type: 'text'
    },
    {
        format: (value: string) => (
          <div className="rds-table__content-row">
            <div className="rds-table__badge-group">
              <RdsBadge
                badgeContent="Active"
                color="secondary"
                size="small"
                shape="rectangle"
                colorVariant="secondary"
              />
              <RdsBadge
                badgeContent="Pending"
                color="secondary"
                size="small"
                shape="rectangle"
                colorVariant="secondary"
              />
            </div>
            <span>{value}</span>
          </div>
        ),
      id: 'text6',
      label: 'Text',
      minWidth: 180,
      type: 'text' as const,
      align: 'center' 
    }
  ]}
  rows={[
    {
      badge1: 'Badge',
      badge2: 'Badge',
      badge3: 'Badge',
      badge4: 'Badge',
      badge5: 'Badge',
      badge6: 'Badge',
      badge7: 'Badge',
      checkbox1: 'checkbox',
      deleteAction: 'delete',
      id: '1',
      linkText: 'Text',
      menuIcon: '⋮',
      progressBar1: 'Text',
      progressText: 'Text',
      radio1: 'radio',
      sampleText: 'This is a sample text',
      text1: 'Text',
      text2: 'Text',
      text3: 'Text',
      text5: 'Text',
      text6: 'Text',
      textColumn: 'Text Text',
      textNew1: 'Text',
      textNew2: 'Text',
    },
    
  ]}
/>
  },
)
