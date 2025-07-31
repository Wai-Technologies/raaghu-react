import React from 'react';
import { Paper, Box } from '@mui/material';

const renderLayoutContent = (displayType: string, hasShadow: boolean) => {

  if (displayType === 'Basic') {
    return (
      <Box className="rds-comp-layout-wrapper_basic" sx={{ boxShadow: hasShadow ? '0 0 6px 5px #4d525912' : 'none', }} >
        <Box className="rds-comp-layout-inner-wrapper_basic">
          <Paper elevation={3} className="rds-comp-layout__card_basic"
            sx={{ boxShadow: '0 0 6px 5px #4d525912', borderRadius: 2.5, }}>
            {/* Blank card for layout showcase */}
          </Paper>
        </Box>
      </Box>
    );
  }

  // Use BEM class for Paper, move static styles to SCSS
  const commonGridSx = { display: 'grid', gap: 2, width: '100%' };

  return (


    <Box className="rds-comp-layout-wrapper" sx={{ boxShadow: hasShadow ? '0 0 6px 5px #4d525912' : 'none', p: { xs: 2, sm: 2 } }}>
      <Box className="rds-comp-layout-inner-wrapper" sx={{ gap: 3 }}>
        {(() => {

          switch (displayType) {

            case 'Board':
              return (
                <>
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
                    {[...Array(2)].map((_, idx) => (
                      <Paper key={`row1-col${idx}`} elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 180, sm: 240, md: 240 } }} />
                    ))}
                  </Box>
                  {/* Row 2: 3 columns, responsive */}
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' } }}>
                    {[...Array(3)].map((_, idx) => (
                      <Paper key={`row2-col${idx}`} elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 180, sm: 240, md: 240 } }} />
                    ))}
                  </Box>
                  {/* Row 4: 2 columns, responsive */}
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
                    {[...Array(2)].map((_, idx) => (
                      <Paper key={`row4-col${idx}`} elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 180, sm: 240, md: 240 } }} />
                    ))}
                  </Box>
                </>

              );

            case 'Boxify':
              return (

                <>
                  {/* Row 1: 1 wide Paper (reduced height) */}
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr' } }}>
                    <Paper key={`row1-col0`} elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 80, sm: 120, md: 120 } }} />
                  </Box>
                  {/* Row 2: 3 columns */}
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' } }}>
                    {[...Array(3)].map((_, idx) => (
                      <Paper key={`row2-col${idx}`} elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 180, sm: 240, md: 240 } }} />
                    ))}
                  </Box>
                  {/* Row 3: 3 columns, first Paper spans 1, second Paper spans 2 columns for perfect alignment with Row 2 */}
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr', md: '1fr 1fr 1fr' } }}>
                    <Paper key={`row3-col0`} elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 180, sm: 240, md: 240 }, width: '100%', gridColumn: { xs: 'auto', sm: 'span 1', md: 'span 1' } }} />
                    <Paper key={`row3-col1`} elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 180, sm: 240, md: 240 }, width: '100%', gridColumn: { xs: 'auto', sm: 'span 2', md: 'span 2' } }} />
                  </Box>
                  {/* Row 4: 3 columns */}
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' } }}>
                    {[...Array(3)].map((_, idx) => (
                      <Paper key={`row4-col${idx}`} elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 180, sm: 240, md: 240 } }} />
                    ))}
                  </Box>
                </>

              );


            case 'Cardify':
              return (

                <>
                  {/* Row 1: 6 equal Papers */}
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)', md: 'repeat(6, 1fr)' } }}>
                    {[...Array(6)].map((_, idx) => (
                      <Paper key={`row1-col${idx}`} elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 80, sm: 120, md: 120 } }} />
                    ))}
                  </Box>

                  {/* Row 2: 6-column grid, first Paper spans 2 columns and 2 rows, 2 stacked Papers each span 4 columns and 1 row */}
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: '1fr', md: 'repeat(6, 1fr)' }, gridTemplateRows: { xs: 'auto', sm: 'auto', md: 'repeat(2, 1fr)' }, alignItems: 'stretch' }}>
                    {/* Tall Paper, left */}
                    <Paper key="row2-col0" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 180, sm: 360, md: 360 }, gridColumn: { xs: 'auto', sm: 'auto', md: 'span 2' }, gridRow: { xs: 'auto', sm: 'auto', md: 'span 2' } }} />
                    {/* Top stacked Paper, right */}
                    <Paper key="row2-col1-row0" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 80, sm: 180, md: 180 }, gridColumn: { xs: 'auto', sm: 'auto', md: '3 / span 4' }, gridRow: { xs: 'auto', sm: 'auto', md: '1' } }} />
                    {/* Bottom stacked Paper, right */}
                    <Paper key="row2-col1-row1" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 80, sm: 180, md: 180 }, gridColumn: { xs: 'auto', sm: 'auto', md: '3 / span 4' }, gridRow: { xs: 'auto', sm: 'auto', md: '2' } }} />
                  </Box>

                  {/* Row 3: 2 Papers, first spans 2 columns, second spans 4 columns */}
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: '1fr', md: 'repeat(6, 1fr)' } }}>
                    <Paper key="row3-col0" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 120, sm: 180, md: 180 }, gridColumn: { xs: 'auto', sm: 'auto', md: 'span 2' } }} />
                    <Paper key="row3-col1" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 120, sm: 180, md: 180 }, gridColumn: { xs: 'auto', sm: 'auto', md: 'span 4' } }} />
                  </Box>

                  {/* Row 4: 2 Papers, first spans 2 columns, second spans 4 columns */}
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: '1fr', md: 'repeat(6, 1fr)' } }}>
                    <Paper key="row4-col0" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 120, sm: 180, md: 180 }, gridColumn: { xs: 'auto', sm: 'auto', md: 'span 2' } }} />
                    <Paper key="row4-col1" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 120, sm: 180, md: 180 }, gridColumn: { xs: 'auto', sm: 'auto', md: 'span 4' } }} />
                  </Box>
                </>

              );

            case 'Collage':
              return (
                <>
                  {/* Row 1: 3 Papers, first two each span 3 columns, third spans 6 columns (12-col grid) */}
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: '1fr', md: 'repeat(12, 1fr)' } }}>
                    <Paper key={`collage-row1-col0`} elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 120, sm: 180, md: 180 }, gridColumn: { xs: 'auto', sm: 'auto', md: 'span 3' } }} />
                    <Paper key={`collage-row1-col1`} elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 120, sm: 180, md: 180 }, gridColumn: { xs: 'auto', sm: 'auto', md: 'span 3' } }} />
                    <Paper key={`collage-row1-col2`} elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 120, sm: 180, md: 180 }, gridColumn: { xs: 'auto', sm: 'auto', md: 'span 6' } }} />
                  </Box>
                  {/* Row 2: 2 Papers, each spans 6 columns (12-col grid) */}
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: '1fr', md: 'repeat(12, 1fr)' } }}>
                    <Paper key={`collage-row2-col0`} elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 120, sm: 180, md: 180 }, gridColumn: { xs: 'auto', sm: 'auto', md: 'span 6' } }} />
                    <Paper key={`collage-row2-col1`} elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 120, sm: 180, md: 180 }, gridColumn: { xs: 'auto', sm: 'auto', md: 'span 6' } }} />
                  </Box>
                  {/* Row 3: 2 Papers, first spans 2 columns, second spans 4 columns (6-col grid) */}
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: '1fr', md: 'repeat(6, 1fr)' } }}>
                    <Paper key="collage-row3-col0" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 120, sm: 180, md: 180 }, gridColumn: { xs: 'auto', sm: 'auto', md: 'span 2' } }} />
                    <Paper key="collage-row3-col1" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 120, sm: 180, md: 180 }, gridColumn: { xs: 'auto', sm: 'auto', md: 'span 4' } }} />
                  </Box>
                  {/* Row 4: 2 Papers, first spans 2 columns, second spans 4 columns (6-col grid) */}
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: '1fr', md: 'repeat(6, 1fr)' } }}>
                    <Paper key="collage-row4-col0" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 120, sm: 180, md: 180 }, gridColumn: { xs: 'auto', sm: 'auto', md: 'span 2' } }} />
                    <Paper key="collage-row4-col1" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 120, sm: 180, md: 180 }, gridColumn: { xs: 'auto', sm: 'auto', md: 'span 4' } }} />
                  </Box>
                </>
              );

            case 'Gridify':
              return (
                <>
                  {/* Row 1: 3 equal columns */}
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' } }}>
                    {[...Array(3)].map((_, idx) => (
                    <Paper key={`gridify-row1-col${idx}`} elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 80, sm: 120, md: 120 } }} />
                    ))}
                  </Box>
                  {/* Row 2: 1 Paper, full width (matches 3 columns above), taller for visual prominence */}
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: '1fr', md: '1fr 1fr 1fr' } }}>
                    <Paper key="gridify-row2-col0" elevation={3} className="rds-comp-layout__card_basic" sx={{ gridColumn: { xs: 'auto', sm: 'auto', md: '1 / span 3' } }}>{/* Blank card for layout showcase */}</Paper>
                  </Box>
                </>
              );



            case 'Highlight':
              return (
                <>
                  {/* Row 1: 3 equal columns, taller */}
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' } }}>
                    {[...Array(3)].map((_, idx) => (
                    <Paper key={`highlight-row1-col${idx}`} elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 80, sm: 180, md: 180 } }} />
                    ))}
                  </Box>
                  {/* Row 2: 3 equal columns, shorter */}
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' } }}>
                    {[...Array(3)].map((_, idx) => (
                    <Paper key={`highlight-row2-col${idx}`} elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 80, sm: 120, md: 120 } }} />
                    ))}
                  </Box>
                </>
              );


            case 'Matrix':
              return (
                <>
                  {/* Row 1: 3 Papers, left 6, right 3, right 3 */}
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' } }}>
                    <Paper key="matrix-row1-col0" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 80, sm: 120, md: 120 }, gridColumn: { xs: 'auto', sm: 'span 6', md: 'span 6' } }} />
                    <Paper key="matrix-row1-col1" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 80, sm: 120, md: 120 }, gridColumn: { xs: 'auto', sm: 'span 3', md: 'span 3' } }} />
                    <Paper key="matrix-row1-col2" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 80, sm: 120, md: 120 }, gridColumn: { xs: 'auto', sm: 'span 3', md: 'span 3' } }} />
                  </Box>
                  {/* Row 2: 2 Papers, left 3, right 9 */}
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' } }}>
                    <Paper key="matrix-row2-col0" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 180, sm: 240, md: 240 }, gridColumn: { xs: 'auto', sm: 'span 3', md: 'span 3' } }} />
                    <Paper key="matrix-row2-col1" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 120, sm: 180, md: 180 }, gridColumn: { xs: 'auto', sm: 'span 3', md: 'span 3' } }} />
                    <Paper key="matrix-row2-col2" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 120, sm: 180, md: 180 }, gridColumn: { xs: 'auto', sm: 'span 6', md: 'span 6' } }} />
                  </Box>
                  {/* Row 3: 1 Paper, full width */}
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' } }}>
                    <Paper key="matrix-row3-col0" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 180, sm: 240, md: 240 }, gridColumn: { xs: 'auto', sm: 'span 12', md: 'span 12' } }} />
                  </Box>
                </>
              );



            case 'Mosaic':
              return (
                <>
                  {/* Row 1: left Paper spans 4 columns, right 4 Papers stacked 2x2, each spans 3 columns */}
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' }, gridTemplateRows: { xs: 'auto', sm: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)' }, alignItems: 'stretch' }}>
                    <Paper key="mosaic-row1-col0" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 120, sm: 240, md: 240 }, gridColumn: { xs: 'auto', sm: 'span 6', md: 'span 6' }, gridRow: { xs: 'auto', sm: '1 / span 2', md: '1 / span 2' } }} />
                    <Paper key="mosaic-row1-col1" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 80, sm: 120, md: 120 }, gridColumn: { xs: 'auto', sm: '7 / span 3', md: '7 / span 3' }, gridRow: { xs: 'auto', sm: '1', md: '1' } }} />
                    <Paper key="mosaic-row1-col2" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 80, sm: 120, md: 120 }, gridColumn: { xs: 'auto', sm: '10 / span 3', md: '10 / span 3' }, gridRow: { xs: 'auto', sm: '1', md: '1' } }} />
                    <Paper key="mosaic-row1-col3" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 80, sm: 120, md: 120 }, gridColumn: { xs: 'auto', sm: '7 / span 3', md: '7 / span 3' }, gridRow: { xs: 'auto', sm: '2', md: '2' } }} />
                    <Paper key="mosaic-row1-col4" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 80, sm: 120, md: 120 }, gridColumn: { xs: 'auto', sm: '10 / span 3', md: '10 / span 3' }, gridRow: { xs: 'auto', sm: '2', md: '2' } }} />
                  </Box>
                  {/* Row 2: 2 Papers, each spans 6 columns */}
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' } }}>
                    <Paper key="mosaic-row2-col0" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 120, sm: 240, md: 240 }, gridColumn: { xs: 'auto', sm: 'span 6', md: 'span 6' } }} />
                    <Paper key="mosaic-row2-col1" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 120, sm: 240, md: 240 }, gridColumn: { xs: 'auto', sm: 'span 6', md: 'span 6' } }} />
                  </Box>
                  {/* Row 3: left Paper spans 4 columns, right Paper spans 8 columns */}
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' } }}>
                    <Paper key="mosaic-row3-col0" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 120, sm: 240, md: 240 }, gridColumn: { xs: 'auto', sm: 'span 4', md: 'span 4' } }} />
                    <Paper key="mosaic-row3-col1" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 120, sm: 240, md: 240 }, gridColumn: { xs: 'auto', sm: 'span 8', md: 'span 8' } }} />
                  </Box>
                </>
              );


            case 'Nexus':
              return (
                <>
                  {/* Row 1: left Paper spans 6 columns (full height), right 2 stacked Papers (3 columns each, top), 1 Paper (6 columns, bottom) */}
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' }, gridTemplateRows: { xs: 'auto', sm: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)' }, alignItems: 'stretch' }}>
                    <Paper key="nexus-row1-col0" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 120, sm: 240, md: 240 }, gridColumn: { xs: 'auto', sm: '1 / span 6', md: '1 / span 6' }, gridRow: { xs: 'auto', sm: '1 / span 2', md: '1 / span 2' } }} />
                    <Paper key="nexus-row1-col1" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 80, sm: 120, md: 120 }, gridColumn: { xs: 'auto', sm: '7 / span 3', md: '7 / span 3' }, gridRow: { xs: 'auto', sm: '1', md: '1' } }} />
                    <Paper key="nexus-row1-col2" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 80, sm: 120, md: 120 }, gridColumn: { xs: 'auto', sm: '7 / span 3', md: '7 / span 3' }, gridRow: { xs: 'auto', sm: '2', md: '2' } }} />
                    <Paper key="nexus-row1-col3" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 80, sm: 240, md: 240 }, gridColumn: { xs: 'auto', sm: '10 / span 3', md: '10 / span 3' }, gridRow: { xs: 'auto', sm: '1 / span 2', md: '1 / span 2' } }} />
                  </Box>
                  {/* Row 2: left 2 vertical Papers (each spans 3 columns), right 1 tall Paper (spans 6 columns, full height) */}
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' }, gridTemplateRows: { xs: 'auto', sm: 'repeat(1, 1fr)', md: 'repeat(1, 1fr)' }, alignItems: 'stretch' }}>
                    <Paper key="nexus-row2-col0" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 120, sm: 240, md: 240 }, gridColumn: { xs: 'auto', sm: '1 / span 3', md: '1 / span 3' }, gridRow: { xs: 'auto', sm: '1', md: '1' } }} />
                    <Paper key="nexus-row2-col1" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 120, sm: 240, md: 240 }, gridColumn: { xs: 'auto', sm: '4 / span 3', md: '4 / span 3' }, gridRow: { xs: 'auto', sm: '1', md: '1' } }} />
                    <Paper key="nexus-row2-col2" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 120, sm: 240, md: 240 }, gridColumn: { xs: 'auto', sm: '7 / span 6', md: '7 / span 6' }, gridRow: { xs: 'auto', sm: '1', md: '1' } }} />
                  </Box>
                </>
              );

            case 'Pinboard':
              return (
                <>
                  {/* Row 1: 1 Paper, full width (12 columns) */}
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' } }}>
                    <Paper key="pinboard-row1-col0" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 80, sm: 120, md: 120 }, gridColumn: { xs: 'auto', sm: 'span 12', md: 'span 12' } }} />
                  </Box>
                  {/* Row 2: 1 Paper, full width (12 columns), taller than Row 1 and Row 3 */}
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' } }}>
                    <Paper key="pinboard-row2-col0" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 120, sm: 240, md: 240 }, gridColumn: { xs: 'auto', sm: 'span 12', md: 'span 12' } }} />
                  </Box>
                  {/* Row 3: 2 Papers, left 9 columns, right 3 columns */}
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' } }}>
                    <Paper key="pinboard-row3-col0" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 120, sm: 240, md: 240 }, gridColumn: { xs: 'auto', sm: '1 / span 9', md: '1 / span 9' } }} />
                    <Paper key="pinboard-row3-col1" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 120, sm: 240, md: 240 }, gridColumn: { xs: 'auto', sm: '10 / span 3', md: '10 / span 3' } }} />
                  </Box>
                  {/* Row 4: 2 Papers, left 3 columns, right 9 columns */}
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' } }}>
                    <Paper key="pinboard-row4-col0" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 120, sm: 240, md: 240 }, gridColumn: { xs: 'auto', sm: '1 / span 3', md: '1 / span 3' } }} />
                    <Paper key="pinboard-row4-col1" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 120, sm: 240, md: 240 }, gridColumn: { xs: 'auto', sm: '4 / span 9', md: '4 / span 9' } }} />
                  </Box>
                </>
              );


            case 'Sections':
              return (
                <>
                  {/* Row 1: 1 Paper, full width (12 columns) */}
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' } }}>
                    <Paper key="sections-row1-col0" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 80, sm: 120, md: 120 }, gridColumn: { xs: 'auto', sm: 'span 12', md: 'span 12' } }} />
                  </Box>
                  {/* Row 2: 4 equal Papers, each spans 3 columns, same height as Row 1 */}
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' } }}>
                    {[0, 1, 2, 3].map(idx => (
                    <Paper key={`sections-row2-col${idx}`} elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 80, sm: 120, md: 120 }, gridColumn: { xs: 'auto', sm: `${1 + idx * 3} / span 3`, md: `${1 + idx * 3} / span 3` } }} />
                    ))}
                  </Box>
                  {/* Row 3: 1 Paper, full width (12 columns), taller than Row 1 */}
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' } }}>
                    <Paper key="sections-row3-col0" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 120, sm: 240, md: 240 }, gridColumn: { xs: 'auto', sm: 'span 12', md: 'span 12' } }} />
                  </Box>
                  {/* Row 4: 1 Paper, full width (12 columns), same height as Row 3 */}
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' } }}>
                    <Paper key="sections-row4-col0" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 120, sm: 240, md: 240 }, gridColumn: { xs: 'auto', sm: 'span 12', md: 'span 12' } }} />
                  </Box>
                  {/* Row 5: 2 equal Papers, each spans 6 columns */}
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' } }}>
                    <Paper key="sections-row5-col0" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 120, sm: 180, md: 180 }, gridColumn: { xs: 'auto', sm: '1 / span 6', md: '1 / span 6' } }} />
                    <Paper key="sections-row5-col1" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 120, sm: 240, md: 240 }, gridColumn: { xs: 'auto', sm: '7 / span 6', md: '7 / span 6' } }} />
                  </Box>
                  {/* Row 6: left 2 equal Papers (each spans 3 columns), right 1 tall Paper (spans 6 columns, full height of row) */}
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' }, alignItems: 'stretch' }}>
                    <Paper key="sections-row6-col0" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 120, sm: 240, md: 240 }, gridColumn: { xs: 'auto', sm: '1 / span 3', md: '1 / span 3' } }} />
                    <Paper key="sections-row6-col1" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 120, sm: 180, md: 180 }, gridColumn: { xs: 'auto', sm: '4 / span 3', md: '4 / span 3' } }} />
                    <Paper key="sections-row6-col2" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 120, sm: 240, md: 240 }, gridColumn: { xs: 'auto', sm: '7 / span 6', md: '7 / span 6' } }} />
                  </Box>
                </>
              );


            case 'Snapshots':
              return (
                <>
                  {/* Row 1: 1 Paper, full width (12 columns) */}
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' } }}>
                    <Paper key="snapshots-row1-col0" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 120, sm: 180, md: 180 }, gridColumn: { xs: 'auto', sm: 'span 12', md: 'span 12' } }} />
                  </Box>
                  {/* Row 2: 4 equal Papers, each spans 3 columns */}
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' } }}>
                    {[0, 1, 2, 3].map(idx => (
                    <Paper key={`snapshots-row2-col${idx}`} elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 80, sm: 120, md: 100 }, gridColumn: { xs: 'auto', sm: `${1 + idx * 3} / span 3`, md: `${1 + idx * 3} / span 3` } }} />
                    ))}
                  </Box>
                  {/* Row 3: 4 equal Papers, each spans 3 columns */}
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' } }}>
                    {[0, 1, 2, 3].map(idx => (
                    <Paper key={`snapshots-row3-col${idx}`} elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 80, sm: 120, md: 100 }, gridColumn: { xs: 'auto', sm: `${1 + idx * 3} / span 3`, md: `${1 + idx * 3} / span 3` } }} />
                    ))}
                  </Box>
                  {/* Row 4: 1 Paper, full width (12 columns) */}
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' } }}>
                    <Paper key="snapshots-row4-col0" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 120, sm: 180, md: 180 }, gridColumn: { xs: 'auto', sm: 'span 12', md: 'span 12' } }} />
                  </Box>
                </>
              );


            case 'Splitz':
              return (
                <>
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' } }}>
                    <Paper key="splitz-col0" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 240, sm: 360, md: 500 }, gridColumn: { xs: 'auto', sm: '1 / span 6', md: '1 / span 6' } }} />
                    <Paper key="splitz-col1" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 240, sm: 360, md: 500 }, gridColumn: { xs: 'auto', sm: '7 / span 6', md: '7 / span 6' } }} />
                  </Box>
                </>
              );

            case 'Spotlight':
              return (
                <>
                  {/* Row 1: 1 Paper, full width, minHeight md:100 */}
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' } }}>
                    <Paper key="spotlight-row1-col0" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 80, sm: 100, md: 100 }, gridColumn: { xs: 'auto', sm: 'span 12', md: 'span 12' } }} />
                  </Box>
                  {/* Row 2: 3 equal Papers, minHeight md:100 */}
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' } }}>
                    {[0, 1, 2].map(idx => (
                    <Paper key={`spotlight-row2-col${idx}`} elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 80, sm: 100, md: 100 }, gridColumn: { xs: 'auto', sm: `${1 + idx * 4} / span 4`, md: `${1 + idx * 4} / span 4` } }} />
                    ))}
                  </Box>
                  {/* Row 3: 1 Paper, full width, minHeight md:400 */}
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' } }}>
                    <Paper key="spotlight-row3-col0" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 120, sm: 180, md: 400 }, gridColumn: { xs: 'auto', sm: 'span 12', md: 'span 12' } }} />
                  </Box>
                </>
              );


            case 'Stacks':
              return (
                <>
                  {/* Row 1: 2 equal Papers, minHeight md:400 */}
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' } }}>
                    <Paper key="stacks-row1-col0" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 180, sm: 240, md: 300 }, gridColumn: { xs: 'auto', sm: '1 / span 6', md: '1 / span 6' } }} />
                    <Paper key="stacks-row1-col1" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 180, sm: 240, md: 300 }, gridColumn: { xs: 'auto', sm: '7 / span 6', md: '7 / span 6' } }} />
                  </Box>
                  {/* Row 2: 2 equal Papers, minHeight md:400 */}
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' } }}>
                    <Paper key="stacks-row2-col0" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 180, sm: 240, md: 300 }, gridColumn: { xs: 'auto', sm: '1 / span 6', md: '1 / span 6' } }} />
                    <Paper key="stacks-row2-col1" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 180, sm: 240, md: 300 }, gridColumn: { xs: 'auto', sm: '7 / span 6', md: '7 / span 6' } }} />
                  </Box>
                </>
              );


            default:
              return null;
          }


        })()}
      </Box>
    </Box>
  );



}

export default renderLayoutContent;




