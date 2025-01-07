import React, { useState } from "react";
import './rds-truncate-text.css';

// Export the RdsTruncateTextProps interface
export interface RdsTruncateTextProps {
        text: string;             // Text to display
        maxLength: number;        // Maximum number of characters before truncation
        state: 'default' | 'hover'; // Control the state (default or hover)
}

const TruncatedText = ({ text, maxLength, state }: RdsTruncateTextProps) => {
        const [isHovered, setIsHovered] = useState(false);

        const handleMouseEnter = () => {
                if (state === 'hover') {
                        setIsHovered(true);
                }
        };

        const handleMouseLeave = () => {
                if (state === 'hover') {
                        setIsHovered(false);
                }
        };

        // Conditionally truncate the text based on the state
        const displayText = (state === 'hover' && isHovered) || state === 'default'
                ? text
                : `${text.slice(0, maxLength)}...`;

        return (
                <div
                        className="rds-truncate-text"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                >
                        <p>{displayText}</p>
                </div>
        );
};

export default TruncatedText;
