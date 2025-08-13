import * as React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

/**
 * Combined empty state icon (circle + folders + badge) rendered as a single MUI SvgIcon.
 * Accepts standard SvgIconProps; size can be controlled via sx width/height or fontSize.
 */
const RdsCompEmptyStateIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon viewBox="0 0 250 250" {...props}>
    {/* Background circle */}
    <circle cx="125" cy="125" r="120" fill="#E5E7EB" />
    {/* Subtle background lines */}
    <g opacity="0.25" stroke="#ffffff" strokeWidth="4" strokeLinecap="round">
      <line x1="150" y1="70" x2="220" y2="70" />
      <line x1="160" y1="90" x2="200" y2="90" />
      <line x1="40" y1="110" x2="140" y2="110" />
    </g>
    {/* Back folder */}
    <path
      d="M70 118c0-6.6 5.4-12 12-12h60c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H82c-6.6 0-12-5.4-12-12v-40Z"
      fill="#9CA3AF"
    />
    <path d="M92 100h34c4.4 0 8 3.6 8 8v4H84v-4c0-4.4 3.6-8 8-8Z" fill="#9CA3AF" />
    {/* Front folder */}
    <path
      d="M100 130c0-6.6 5.4-12 12-12h70c6.6 0 12 5.4 12 12v46c0 6.6-5.4 12-12 12h-70c-6.6 0-12-5.4-12-12v-46Z"
      fill="#6B7280"
    />
    {/* Square detail */}
    <rect x="116" y="142" width="10" height="10" rx="2" fill="#D1D5DB" />
    {/* Badge */}
    <g transform="translate(165 165)">
      <circle cx="30" cy="30" r="30" fill="#FFFFFF" />
      <circle cx="30" cy="30" r="26" fill="#8B5CF6" />
      <path d="M22 22l16 16M38 22l-16 16" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
    </g>
  </SvgIcon>
);

export default RdsCompEmptyStateIcon;
