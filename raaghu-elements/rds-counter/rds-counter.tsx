import React from 'react';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

export interface RdsCounterProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  showInput?: boolean;
  label?: string;
  variant?: 'default' | 'compact';
}

const RdsCounter: React.FC<RdsCounterProps> = ({
  value,
  onChange,
  min = 0,
  max = Infinity,
  step = 1,
  disabled = false,
  size = 'medium',
  showInput = true,
  label,
  variant = 'default',
}) => {
  const handleIncrement = () => {
    const newValue = Math.min(value + step, max);
    onChange(newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(value - step, min);
    onChange(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  const getSizeProps = () => {
    switch (size) {
      case 'small':
        return {
          buttonSize: 'small' as const,
          inputWidth: 60,
          fontSize: '0.875rem',
        };
      case 'large':
        return {
          buttonSize: 'large' as const,
          inputWidth: 100,
          fontSize: '1.25rem',
        };
      default:
        return {
          buttonSize: 'medium' as const,
          inputWidth: 80,
          fontSize: '1rem',
        };
    }
  };

  const sizeProps = getSizeProps();

  if (variant === 'compact') {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0.5,
        }}
      >
        {label && (
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
        )}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            border: 1,
            borderColor: 'grey.300',
            borderRadius: 1,
            overflow: 'hidden',
          }}
        >
          <IconButton
            onClick={handleDecrement}
            disabled={disabled || value <= min}
            size={sizeProps.buttonSize}
            sx={{ borderRadius: 0 }}
          >
            <Remove />
          </IconButton>
          <Box
            sx={{
              px: 2,
              py: 1,
              backgroundColor: 'grey.50',
              borderLeft: 1,
              borderRight: 1,
              borderColor: 'grey.300',
              minWidth: sizeProps.inputWidth / 2,
              textAlign: 'center',
              fontSize: sizeProps.fontSize,
            }}
          >
            {value}
          </Box>
          <IconButton
            onClick={handleIncrement}
            disabled={disabled || value >= max}
            size={sizeProps.buttonSize}
            sx={{ borderRadius: 0 }}
          >
            <Add />
          </IconButton>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {label && (
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      )}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton
          onClick={handleDecrement}
          disabled={disabled || value <= min}
          size={sizeProps.buttonSize}
          color="primary"
        >
          <Remove />
        </IconButton>
        
        {showInput ? (
          <TextField
            value={value}
            onChange={handleInputChange}
            disabled={disabled}
            inputProps={{
              min,
              max,
              step,
              style: {
                textAlign: 'center',
                fontSize: sizeProps.fontSize,
              },
            }}
            sx={{
              width: sizeProps.inputWidth,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'grey.300',
                },
              },
            }}
            size={size === 'large' ? 'medium' : 'small'}
          />
        ) : (
          <Box
            sx={{
              width: sizeProps.inputWidth,
              textAlign: 'center',
              fontSize: sizeProps.fontSize,
              fontWeight: 'medium',
            }}
          >
            {value}
          </Box>
        )}
        
        <IconButton
          onClick={handleIncrement}
          disabled={disabled || value >= max}
          size={sizeProps.buttonSize}
          color="primary"
        >
          <Add />
        </IconButton>
      </Box>
    </Box>
  );
};

export default RdsCounter;
