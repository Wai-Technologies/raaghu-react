import React from 'react';
import { Box, BoxProps, Paper } from '@mui/material';
import './rds-comp-layout.css';

export interface RdsCompLayoutProps extends BoxProps {
  children?: React.ReactNode;
  spacing?: number;
  direction?: 'row' | 'column';
  wrap?: boolean;
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  fullHeight?: boolean;
  fullWidth?: boolean;
  displayType?: 'Basic' | 'Board' | 'Boxify'|'Cardify'|'Collage';
  hasShadow?: boolean;
}


const RdsCompLayout: React.FC<RdsCompLayoutProps> = ({
  children,
  spacing = 2,
  direction = 'column',
  wrap = false,
  justifyContent = 'flex-start',
  alignItems = 'stretch',
  fullHeight = false,
  fullWidth = false,
  displayType,
  hasShadow = false,
  className,
  ...props
}) => {
  const layoutClass = `rds-layout ${direction} ${fullHeight ? 'full-height' : ''} ${fullWidth ? 'full-width' : ''} ${className || ''}`;


  switch (displayType) {
    case 'Basic':
      return (
        <Box
         className="rds-comp-layout-wrapper_basic"
          sx={{
            // minHeight: '83vh',
            // width: '100%',
            // display: 'flex',
            // flexDirection: 'column',
            // alignItems: 'stretch',
            // justifyContent: 'flex-start',
            boxShadow: hasShadow ? '0 0 6px 5px #4d525912' : 'none',
            // transition: 'box-shadow 0.3s',
          }}
        >
          <Box
            className="rds-comp-layout-inner-wrapper_basic"
          >
            <Paper
              elevation={3}  className="rds-comp-layout__card_basic"
              sx={{
    boxShadow: '0 0 6px 5px #4d525912',
    borderRadius: 2.5,
     // Only if dynamic, else move to CSS
  }}
              // sx={{
              //   position: 'relative',
              //   p: 2.5,
              //   border: '1px solid #d3dcea',
              //   borderRadius: 2.5,
              //   boxShadow:  '0 0 6px 5px #4d525912',
              //   background: '#fff',
              //   minHeight: 200,
              //   height: '83vh',
              //   width: '100%',
              //   maxWidth: 1580,
              //   mx: 'auto',
              //   transition: 'box-shadow 0.3s, border 0.3s',
              //   display: 'flex',
              //   alignItems: 'center',
              //   justifyContent: 'center',
              // }}
            >
              {/* Blank card for layout showcase */}
            </Paper>
          </Box>
        </Box>
      );
    case 'Board':
      return (
        <Box
        className="rds-comp-layout-wrapper"
          sx={{
            // minHeight: '100vh',
            // width: '100%',
            // display: 'flex',
            // flexDirection: 'column',
            // alignItems: 'center',
            // justifyContent: 'center',
            boxShadow: hasShadow ? '0 0 6px 5px #4d525912' : 'none',
            p: { xs: 2, sm: 2 },
          }}
        >
          <Box
          className="rds-comp-layout-inner-wrapper"
            sx={{
              // minHeight: 300,
              // width: '100%',
              // maxWidth: 1200,
              // mx: 'auto',
              // display: 'flex',
              // flexDirection: 'column',
              gap: 3,
            }}
          >
            {/* Row 1: 2 columns, responsive (same as Row 4) */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: '1fr 1fr',
                },
                gap: 2,
                width: '100%',
              }}
            >
              {[...Array(2)].map((_, idx) => (
                <Paper
                  key={`row1-col${idx}`}
                  elevation={3}
                  sx={{
                    border: '1px solid #d3dcea',
                    borderRadius: 2.5,
                    background: '#fff',
                    minHeight: { xs: 180, sm: 240, md: 240 },
                    boxShadow: '0 0 6px 5px #4d525912',
                  }}
                />
              ))}
            </Box>
            {/* Row 2: 3 columns, responsive */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: '1fr 1fr',
                  md: '1fr 1fr 1fr',
                },
                gap: 2,
                width: '100%',
              }}
            >
              {[...Array(3)].map((_, idx) => (
                <Paper
                  key={`row2-col${idx}`}
                  elevation={3}
                  sx={{
                    border: '1px solid #d3dcea',
                    borderRadius: 2.5,
                    background: '#fff',
                    minHeight: { xs: 180, sm: 240, md: 240 },
                    boxShadow: '0 0 6px 5px #4d525912',
                  }}
                />
              ))}
            </Box>
            {/* Row 4: 2 columns, responsive */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: '1fr 1fr',
                },
                gap: 2,
                width: '100%',
              }}
            >
              {[...Array(2)].map((_, idx) => (
                <Paper
                  key={`row4-col${idx}`}
                  elevation={3}
                  sx={{
                    border: '1px solid #d3dcea',
                    borderRadius: 2.5,
                    background: '#fff',
                    minHeight: { xs: 180, sm: 240, md: 240 },
                    boxShadow: '0 0 6px 5px #4d525912',
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      );

    case 'Boxify':
      return (
        <Box
        
          sx={{
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: hasShadow ? '0 0 6px 5px #4d525912' : 'none',
            p: { xs: 2, sm: 2 },
          }}
        >
          <Box
          
            sx={{
              minHeight: 300,
              width: '100%',
              maxWidth: 1200,
              mx: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
            }}
          >
            {/* Row 1: 1 wide Paper (reduced height) */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                },
                gap: 2,
                width: '100%',
              }}
            >
              <Paper
                key={`row1-col0`}
                elevation={3}
                sx={{
                  border: '1px solid #d3dcea',
                  borderRadius: 2.5,
                  background: '#fff',
                  minHeight: { xs: 80, sm: 120, md: 120 },
                  boxShadow: '0 0 6px 5px #4d525912',
                }}
              />
            </Box>
            {/* Row 2: 3 columns */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: '1fr 1fr',
                  md: '1fr 1fr 1fr',
                },
                gap: 2,
                width: '100%',
              }}
            >
              {[...Array(3)].map((_, idx) => (
                <Paper
                  key={`row2-col${idx}`}
                  elevation={3}
                  sx={{
                    border: '1px solid #d3dcea',
                    borderRadius: 2.5,
                    background: '#fff',
                    minHeight: { xs: 180, sm: 240, md: 240 },
                    boxShadow: '0 0 6px 5px #4d525912',
                  }}
                />
              ))}
            </Box>
            {/* Row 3: 3 columns, first Paper spans 1, second Paper spans 2 columns for perfect alignment with Row 2 */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: '1fr 1fr 1fr',
                  md: '1fr 1fr 1fr',
                },
                gap: 2,
                width: '100%',
              }}
            >
              <Paper
                key={`row3-col0`}
                elevation={3}
                sx={{
                  border: '1px solid #d3dcea',
                  borderRadius: 2.5,
                  background: '#fff',
                  minHeight: { xs: 180, sm: 240, md: 240 },
                  boxShadow: '0 0 6px 5px #4d525912',
                  width: '100%',
                  gridColumn: {
                    xs: 'auto',
                    sm: 'span 1',
                    md: 'span 1',
                  },
                }}
              />
              <Paper
                key={`row3-col1`}
                elevation={3}
                sx={{
                  border: '1px solid #d3dcea',
                  borderRadius: 2.5,
                  background: '#fff',
                  minHeight: { xs: 180, sm: 240, md: 240 },
                  boxShadow: '0 0 6px 5px #4d525912',
                  width: '100%',
                  gridColumn: {
                    xs: 'auto',
                    sm: 'span 2',
                    md: 'span 2',
                  },
                }}
              />
            </Box>
            {/* Row 4: 3 columns */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: '1fr 1fr',
                  md: '1fr 1fr 1fr',
                },
                gap: 2,
                width: '100%',
              }}
            >
              {[...Array(3)].map((_, idx) => (
                <Paper
                  key={`row4-col${idx}`}
                  elevation={3}
                  sx={{
                    border: '1px solid #d3dcea',
                    borderRadius: 2.5,
                    background: '#fff',
                    minHeight: { xs: 180, sm: 240, md: 240 },
                    boxShadow: '0 0 6px 5px #4d525912',
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      );


      case 'Cardify':
        return (
          <Box
            sx={{
              minHeight: '100vh',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: hasShadow ? '0 0 6px 5px #4d525912' : 'none',
              p: { xs: 2, sm: 2 },
            }}
          >
            <Box
              sx={{
                minHeight: 300,
                width: '100%',
                maxWidth: 1400,
                mx: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
              }}
            >
              {/* Row 1: 6 equal Papers */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(3, 1fr)',
                    md: 'repeat(6, 1fr)',
                  },
                  gap: 2,
                  width: '100%',
                }}
              >
                {[...Array(6)].map((_, idx) => (
                  <Paper
                    key={`row1-col${idx}`}
                    elevation={3}
                    sx={{
                      border: '1px solid #d3dcea',
                      borderRadius: 2.5,
                      background: '#fff',
                      minHeight: { xs: 80, sm: 120, md: 120 },
                      boxShadow: '0 0 6px 5px #4d525912',
                    }}
                  />
                ))}
              </Box>

              {/* Row 2: 6-column grid, first Paper spans 2 columns and 2 rows, 2 stacked Papers each span 4 columns and 1 row */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: '1fr',
                    md: 'repeat(6, 1fr)',
                  },
                  gridTemplateRows: {
                    xs: 'auto',
                    sm: 'auto',
                    md: 'repeat(2, 1fr)',
                  },
                  gap: 2,
                  width: '100%',
                  alignItems: 'stretch',
                }}
              >
                {/* Tall Paper, left */}
                <Paper
                  key="row2-col0"
                  elevation={3}
                  sx={{
                    border: '1px solid #d3dcea',
                    borderRadius: 2.5,
                    background: '#fff',
                    minHeight: { xs: 180, sm: 360, md: 360 },
                    boxShadow: '0 0 6px 5px #4d525912',
                    gridColumn: {
                      xs: 'auto',
                      sm: 'auto',
                      md: 'span 2',
                    },
                    gridRow: {
                      xs: 'auto',
                      sm: 'auto',
                      md: 'span 2',
                    },
                  }}
                />
                {/* Top stacked Paper, right */}
                <Paper
                  key="row2-col1-row0"
                  elevation={3}
                  sx={{
                    border: '1px solid #d3dcea',
                    borderRadius: 2.5,
                    background: '#fff',
                    minHeight: { xs: 80, sm: 180, md: 180 },
                    boxShadow: '0 0 6px 5px #4d525912',
                    gridColumn: {
                      xs: 'auto',
                      sm: 'auto',
                      md: '3 / span 4',
                    },
                    gridRow: {
                      xs: 'auto',
                      sm: 'auto',
                      md: '1',
                    },
                  }}
                />
                {/* Bottom stacked Paper, right */}
                <Paper
                  key="row2-col1-row1"
                  elevation={3}
                  sx={{
                    border: '1px solid #d3dcea',
                    borderRadius: 2.5,
                    background: '#fff',
                    minHeight: { xs: 80, sm: 180, md: 180 },
                    boxShadow: '0 0 6px 5px #4d525912',
                    gridColumn: {
                      xs: 'auto',
                      sm: 'auto',
                      md: '3 / span 4',
                    },
                    gridRow: {
                      xs: 'auto',
                      sm: 'auto',
                      md: '2',
                    },
                  }}
                />
              </Box>

              {/* Row 3: 2 Papers, first spans 2 columns, second spans 4 columns */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: '1fr',
                    md: 'repeat(6, 1fr)',
                  },
                  gap: 2,
                  width: '100%',
                }}
              >
                <Paper
                  key="row3-col0"
                  elevation={3}
                  sx={{
                    border: '1px solid #d3dcea',
                    borderRadius: 2.5,
                    background: '#fff',
                    minHeight: { xs: 120, sm: 180, md: 180 },
                    boxShadow: '0 0 6px 5px #4d525912',
                    gridColumn: {
                      xs: 'auto',
                      sm: 'auto',
                      md: 'span 2',
                    },
                  }}
                />
                <Paper
                  key="row3-col1"
                  elevation={3}
                  sx={{
                    border: '1px solid #d3dcea',
                    borderRadius: 2.5,
                    background: '#fff',
                    minHeight: { xs: 120, sm: 180, md: 180 },
                    boxShadow: '0 0 6px 5px #4d525912',
                    gridColumn: {
                      xs: 'auto',
                      sm: 'auto',
                      md: 'span 4',
                    },
                  }}
                />
              </Box>

              {/* Row 4: 2 Papers, first spans 2 columns, second spans 4 columns */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: '1fr',
                    md: 'repeat(6, 1fr)',
                  },
                  gap: 2,
                  width: '100%',
                }}
              >
                <Paper
                  key="row4-col0"
                  elevation={3}
                  sx={{
                    border: '1px solid #d3dcea',
                    borderRadius: 2.5,
                    background: '#fff',
                    minHeight: { xs: 120, sm: 180, md: 180 },
                    boxShadow: '0 0 6px 5px #4d525912',
                    gridColumn: {
                      xs: 'auto',
                      sm: 'auto',
                      md: 'span 2',
                    },
                  }}
                />
                <Paper
                  key="row4-col1"
                  elevation={3}
                  sx={{
                    border: '1px solid #d3dcea',
                    borderRadius: 2.5,
                    background: '#fff',
                    minHeight: { xs: 120, sm: 180, md: 180 },
                    boxShadow: '0 0 6px 5px #4d525912',
                    gridColumn: {
                      xs: 'auto',
                      sm: 'auto',
                      md: 'span 4',
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>
        );

case 'Collage':
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: hasShadow ? '0 0 6px 5px #4d525912' : 'none',
        p: { xs: 2, sm: 2 },
      }}
    >
      <Box
        sx={{
          minHeight: 300,
          width: '100%',
          maxWidth: 1200,
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        {/* Row 1: 3 Papers, first two each span 3 columns, third spans 6 columns (12-col grid) */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr',
              md: 'repeat(12, 1fr)',
            },
            gap: 2,
            width: '100%',
          }}
        >
          <Paper
            key={`collage-row1-col0`}
            elevation={3}
            sx={{
              border: '1px solid #d3dcea',
              borderRadius: 2.5,
              background: '#fff',
              minHeight: { xs: 120, sm: 180, md: 180 },
              boxShadow: '0 0 6px 5px #4d525912',
              gridColumn: {
                xs: 'auto',
                sm: 'auto',
                md: 'span 3',
              },
            }}
          />
          <Paper
            key={`collage-row1-col1`}
            elevation={3}
            sx={{
              border: '1px solid #d3dcea',
              borderRadius: 2.5,
              background: '#fff',
              minHeight: { xs: 120, sm: 180, md: 180 },
              boxShadow: '0 0 6px 5px #4d525912',
              gridColumn: {
                xs: 'auto',
                sm: 'auto',
                md: 'span 3',
              },
            }}
          />
          <Paper
            key={`collage-row1-col2`}
            elevation={3}
            sx={{
              border: '1px solid #d3dcea',
              borderRadius: 2.5,
              background: '#fff',
              minHeight: { xs: 120, sm: 180, md: 180 },
              boxShadow: '0 0 6px 5px #4d525912',
              gridColumn: {
                xs: 'auto',
                sm: 'auto',
                md: 'span 6',
              },
            }}
          />
        </Box>
        {/* Row 2: 2 Papers, each spans 6 columns (12-col grid) */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr',
              md: 'repeat(12, 1fr)',
            },
            gap: 2,
            width: '100%',
          }}
        >
          <Paper
            key={`collage-row2-col0`}
            elevation={3}
            sx={{
              border: '1px solid #d3dcea',
              borderRadius: 2.5,
              background: '#fff',
              minHeight: { xs: 120, sm: 180, md: 180 },
              boxShadow: '0 0 6px 5px #4d525912',
              gridColumn: {
                xs: 'auto',
                sm: 'auto',
                md: 'span 6',
              },
            }}
          />
          <Paper
            key={`collage-row2-col1`}
            elevation={3}
            sx={{
              border: '1px solid #d3dcea',
              borderRadius: 2.5,
              background: '#fff',
              minHeight: { xs: 120, sm: 180, md: 180 },
              boxShadow: '0 0 6px 5px #4d525912',
              gridColumn: {
                xs: 'auto',
                sm: 'auto',
                md: 'span 6',
              },
            }}
          />
        </Box>
        {/* Row 3: 2 Papers, first spans 2 columns, second spans 4 columns (6-col grid) */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr',
              md: 'repeat(6, 1fr)',
            },
            gap: 2,
            width: '100%',
          }}
        >
          <Paper
            key="collage-row3-col0"
            elevation={3}
            sx={{
              border: '1px solid #d3dcea',
              borderRadius: 2.5,
              background: '#fff',
              minHeight: { xs: 120, sm: 180, md: 180 },
              boxShadow: '0 0 6px 5px #4d525912',
              gridColumn: {
                xs: 'auto',
                sm: 'auto',
                md: 'span 2',
              },
            }}
          />
          <Paper
            key="collage-row3-col1"
            elevation={3}
            sx={{
              border: '1px solid #d3dcea',
              borderRadius: 2.5,
              background: '#fff',
              minHeight: { xs: 120, sm: 180, md: 180 },
              boxShadow: '0 0 6px 5px #4d525912',
              gridColumn: {
                xs: 'auto',
                sm: 'auto',
                md: 'span 4',
              },
            }}
          />
        </Box>
        {/* Row 4: 2 Papers, first spans 2 columns, second spans 4 columns (6-col grid) */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr',
              md: 'repeat(6, 1fr)',
            },
            gap: 2,
            width: '100%',
          }}
        >
          <Paper
            key="collage-row4-col0"
            elevation={3}
            sx={{
              border: '1px solid #d3dcea',
              borderRadius: 2.5,
              background: '#fff',
              minHeight: { xs: 120, sm: 180, md: 180 },
              boxShadow: '0 0 6px 5px #4d525912',
              gridColumn: {
                xs: 'auto',
                sm: 'auto',
                md: 'span 2',
              },
            }}
          />
          <Paper
            key="collage-row4-col1"
            elevation={3}
            sx={{
              border: '1px solid #d3dcea',
              borderRadius: 2.5,
              background: '#fff',
              minHeight: { xs: 120, sm: 180, md: 180 },
              boxShadow: '0 0 6px 5px #4d525912',
              gridColumn: {
                xs: 'auto',
                sm: 'auto',
                md: 'span 4',
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );

    
    default:
      break;
  }

    

  return (

    
    <Box
      className={layoutClass}
      sx={{
        display: 'flex',
        flexDirection: direction,
        flexWrap: wrap ? 'wrap' : 'nowrap',
        justifyContent,
        alignItems,
        gap: spacing,
        height: fullHeight ? '100%' : 'auto',
        width: fullWidth ? '100%' : 'auto',
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default RdsCompLayout;
