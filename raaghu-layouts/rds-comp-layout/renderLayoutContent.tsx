import React from 'react';
import { Paper, Box } from '@mui/material';

const renderLayoutContent = (displayType: string, hasShadow: boolean) => {

  if (displayType === 'Basic') {
    return (
      <Box className="rds-comp-layout-wrapper_basic" sx={{ boxShadow: (theme) => hasShadow ? theme.shadows[2] : 'none', }} >
        <Box className="rds-comp-layout-inner-wrapper_basic">
          <Paper elevation={3} className="rds-comp-layout__card_basic"
            sx={{ borderRadius: 2.5, }}>
          </Paper>
        </Box>
      </Box>
    );
  }

  const commonGridSx = { display: 'grid', gap: 2, width: '100%' };

  return (


    <Box className="rds-comp-layout-wrapper" sx={{ boxShadow: (theme) => hasShadow ? theme.shadows[2] : 'none', p: { xs: 2, sm: 2 } }}>
      <Box className="rds-comp-layout-inner-wrapper" sx={{ gap: 3 }}>
        {(() => {

          switch (displayType) {

            case 'Board':
              return (
                <>
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
                    {[...Array(2)].map((_, idx) => (
                      <Paper key={`row1-col${idx}`} elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-lg" />
                    ))}
                  </Box>
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' } }}>
                    {[...Array(3)].map((_, idx) => (
                      <Paper key={`row2-col${idx}`} elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-lg" />
                    ))}
                  </Box>
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
                    {[...Array(2)].map((_, idx) => (
                      <Paper key={`row4-col${idx}`} elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-lg" />
                    ))}
                  </Box>
                </>

              );

            case 'Boxify':
              return (

                <>
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr' } }}>
                    <Paper key={`row1-col0`} elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-sm" />
                  </Box>
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' } }}>
                    {[...Array(3)].map((_, idx) => (
                      <Paper key={`row2-col${idx}`} elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-lg" />
                    ))}
                  </Box>
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr', md: '1fr 1fr 1fr' } }}>
                    <Paper key={`row3-col0`} elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-lg" sx={{ width: '100%', gridColumn: { xs: 'auto', sm: 'span 1', md: 'span 1' } }} />
                    <Paper key={`row3-col1`} elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-lg" sx={{ width: '100%', gridColumn: { xs: 'auto', sm: 'span 2', md: 'span 2' } }} />
                  </Box>
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' } }}>
                    {[...Array(3)].map((_, idx) => (
                      <Paper key={`row4-col${idx}`} elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-lg" />
                    ))}
                  </Box>
                </>

              );


            case 'Cardify':
              return (

                <>
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)', md: 'repeat(6, 1fr)' } }}>
                    {[...Array(6)].map((_, idx) => (
                      <Paper key={`row1-col${idx}`} elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-sm" />
                    ))}
                  </Box>

                 
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: '1fr', md: 'repeat(6, 1fr)' }, gridTemplateRows: { xs: 'auto', sm: 'auto', md: 'repeat(2, 1fr)' }, alignItems: 'stretch' }}>
                    <Paper key="row2-col0" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-xl" sx={{ gridColumn: { xs: 'auto', sm: 'auto', md: 'span 2' }, gridRow: { xs: 'auto', sm: 'auto', md: 'span 2' } }} />
                    <Paper key="row2-col1-row0" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-md" sx={{ gridColumn: { xs: 'auto', sm: 'auto', md: '3 / span 4' }, gridRow: { xs: 'auto', sm: 'auto', md: '1' } }} />
                    <Paper key="row2-col1-row1" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-md" sx={{ gridColumn: { xs: 'auto', sm: 'auto', md: '3 / span 4' }, gridRow: { xs: 'auto', sm: 'auto', md: '2' } }} />
                  </Box>

                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: '1fr', md: 'repeat(6, 1fr)' } }}>
                    <Paper key="row3-col0" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-md" sx={{ gridColumn: { xs: 'auto', sm: 'auto', md: 'span 2' } }} />
                    <Paper key="row3-col1" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-md" sx={{ gridColumn: { xs: 'auto', sm: 'auto', md: 'span 4' } }} />
                  </Box>

                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: '1fr', md: 'repeat(6, 1fr)' } }}>
                    <Paper key="row4-col0" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-md" sx={{ gridColumn: { xs: 'auto', sm: 'auto', md: 'span 2' } }} />
                    <Paper key="row4-col1" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-md" sx={{ gridColumn: { xs: 'auto', sm: 'auto', md: 'span 4' } }} />
                  </Box>
                </>

              );

            case 'Collage':
              return (
                <>
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: '1fr', md: 'repeat(12, 1fr)' } }}>
                    <Paper key={`collage-row1-col0`} elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-md" sx={{ gridColumn: { xs: 'auto', sm: 'auto', md: 'span 3' } }} />
                    <Paper key={`collage-row1-col1`} elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-md" sx={{ gridColumn: { xs: 'auto', sm: 'auto', md: 'span 3' } }} />
                    <Paper key={`collage-row1-col2`} elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-md" sx={{ gridColumn: { xs: 'auto', sm: 'auto', md: 'span 6' } }} />
                  </Box>
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: '1fr', md: 'repeat(12, 1fr)' } }}>
                    <Paper key={`collage-row2-col0`} elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-md" sx={{ gridColumn: { xs: 'auto', sm: 'auto', md: 'span 6' } }} />
                    <Paper key={`collage-row2-col1`} elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-md" sx={{ gridColumn: { xs: 'auto', sm: 'auto', md: 'span 6' } }} />
                  </Box>
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: '1fr', md: 'repeat(6, 1fr)' } }}>
                    <Paper key="collage-row3-col0" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-md" sx={{ gridColumn: { xs: 'auto', sm: 'auto', md: 'span 2' } }} />
                    <Paper key="collage-row3-col1" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-md" sx={{ gridColumn: { xs: 'auto', sm: 'auto', md: 'span 4' } }} />
                  </Box>
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: '1fr', md: 'repeat(6, 1fr)' } }}>
                    <Paper key="collage-row4-col0" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-md" sx={{ gridColumn: { xs: 'auto', sm: 'auto', md: 'span 2' } }} />
                    <Paper key="collage-row4-col1" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-md" sx={{ gridColumn: { xs: 'auto', sm: 'auto', md: 'span 4' } }} />
                  </Box>
                </>
              );

            case 'Gridify':
              return (
                <>
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' } }}>
                    {[...Array(3)].map((_, idx) => (
                    <Paper key={`gridify-row1-col${idx}`} elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-sm" />
                    ))}
                  </Box>
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: '1fr', md: '1fr 1fr 1fr' } }}>
                    <Paper key="gridify-row2-col0" elevation={3} className="rds-comp-layout__card_basic" sx={{ gridColumn: { xs: 'auto', sm: 'auto', md: '1 / span 3' } }}>{/* Blank card for layout showcase */}</Paper>
                  </Box>
                </>
              );



            case 'Highlight':
              return (
                <>
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' } }}>
                    {[...Array(3)].map((_, idx) => (
                    <Paper key={`highlight-row1-col${idx}`} elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-md" />
                    ))}
                  </Box>
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' } }}>
                    {[...Array(3)].map((_, idx) => (
                    <Paper key={`highlight-row2-col${idx}`} elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-sm" />
                    ))}
                  </Box>
                </>
              );


            case 'Matrix':
              return (
                <>
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' } }}>
                    <Paper key="matrix-row1-col0" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-sm" sx={{ gridColumn: { xs: 'auto', sm: 'span 6', md: 'span 6' } }} />
                    <Paper key="matrix-row1-col1" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-sm" sx={{ gridColumn: { xs: 'auto', sm: 'span 3', md: 'span 3' } }} />
                    <Paper key="matrix-row1-col2" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-sm" sx={{ gridColumn: { xs: 'auto', sm: 'span 3', md: 'span 3' } }} />
                  </Box>
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' } }}>
                    <Paper key="matrix-row2-col0" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-lg" sx={{ gridColumn: { xs: 'auto', sm: 'span 3', md: 'span 3' } }} />
                    <Paper key="matrix-row2-col1" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-md" sx={{ gridColumn: { xs: 'auto', sm: 'span 3', md: 'span 3' } }} />
                    <Paper key="matrix-row2-col2" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-md" sx={{ gridColumn: { xs: 'auto', sm: 'span 6', md: 'span 6' } }} />
                  </Box>
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' } }}>
                    <Paper key="matrix-row3-col0" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-lg" sx={{ gridColumn: { xs: 'auto', sm: 'span 12', md: 'span 12' } }} />
                  </Box>
                </>
              );



            case 'Mosaic':
              return (
                <>
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' }, gridTemplateRows: { xs: 'auto', sm: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)' }, alignItems: 'stretch' }}>
                    <Paper key="mosaic-row1-col0" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-lg" sx={{ gridColumn: { xs: 'auto', sm: 'span 6', md: 'span 6' }, gridRow: { xs: 'auto', sm: '1 / span 2', md: '1 / span 2' } }} />
                    <Paper key="mosaic-row1-col1" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-sm" sx={{ gridColumn: { xs: 'auto', sm: '7 / span 3', md: '7 / span 3' }, gridRow: { xs: 'auto', sm: '1', md: '1' } }} />
                    <Paper key="mosaic-row1-col2" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-sm" sx={{ gridColumn: { xs: 'auto', sm: '10 / span 3', md: '10 / span 3' }, gridRow: { xs: 'auto', sm: '1', md: '1' } }} />
                    <Paper key="mosaic-row1-col3" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-sm" sx={{ gridColumn: { xs: 'auto', sm: '7 / span 3', md: '7 / span 3' }, gridRow: { xs: 'auto', sm: '2', md: '2' } }} />
                    <Paper key="mosaic-row1-col4" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-sm" sx={{ gridColumn: { xs: 'auto', sm: '10 / span 3', md: '10 / span 3' }, gridRow: { xs: 'auto', sm: '2', md: '2' } }} />
                  </Box>
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' } }}>
                    <Paper key="mosaic-row2-col0" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-lg" sx={{ gridColumn: { xs: 'auto', sm: 'span 6', md: 'span 6' } }} />
                    <Paper key="mosaic-row2-col1" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-lg" sx={{ gridColumn: { xs: 'auto', sm: 'span 6', md: 'span 6' } }} />
                  </Box>
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' } }}>
                    <Paper key="mosaic-row3-col0" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-lg" sx={{ gridColumn: { xs: 'auto', sm: 'span 4', md: 'span 4' } }} />
                    <Paper key="mosaic-row3-col1" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-lg" sx={{ gridColumn: { xs: 'auto', sm: 'span 8', md: 'span 8' } }} />
                  </Box>
                </>
              );


            case 'Nexus':
              return (
                <>
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' }, gridTemplateRows: { xs: 'auto', sm: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)' }, alignItems: 'stretch' }}>
                    <Paper key="nexus-row1-col0" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-lg" sx={{ gridColumn: { xs: 'auto', sm: '1 / span 6', md: '1 / span 6' }, gridRow: { xs: 'auto', sm: '1 / span 2', md: '1 / span 2' } }} />
                    <Paper key="nexus-row1-col1" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-sm" sx={{ gridColumn: { xs: 'auto', sm: '7 / span 3', md: '7 / span 3' }, gridRow: { xs: 'auto', sm: '1', md: '1' } }} />
                    <Paper key="nexus-row1-col2" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-sm" sx={{ gridColumn: { xs: 'auto', sm: '7 / span 3', md: '7 / span 3' }, gridRow: { xs: 'auto', sm: '2', md: '2' } }} />
                    <Paper key="nexus-row1-col3" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-lg" sx={{ gridColumn: { xs: 'auto', sm: '10 / span 3', md: '10 / span 3' }, gridRow: { xs: 'auto', sm: '1 / span 2', md: '1 / span 2' } }} />
                  </Box>
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' }, gridTemplateRows: { xs: 'auto', sm: 'repeat(1, 1fr)', md: 'repeat(1, 1fr)' }, alignItems: 'stretch' }}>
                    <Paper key="nexus-row2-col0" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-lg" sx={{ gridColumn: { xs: 'auto', sm: '1 / span 3', md: '1 / span 3' }, gridRow: { xs: 'auto', sm: '1', md: '1' } }} />
                    <Paper key="nexus-row2-col1" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-lg" sx={{ gridColumn: { xs: 'auto', sm: '4 / span 3', md: '4 / span 3' }, gridRow: { xs: 'auto', sm: '1', md: '1' } }} />
                    <Paper key="nexus-row2-col2" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-lg" sx={{ gridColumn: { xs: 'auto', sm: '7 / span 6', md: '7 / span 6' }, gridRow: { xs: 'auto', sm: '1', md: '1' } }} />
                  </Box>
                </>
              );

            case 'Pinboard':
              return (
                <>
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' } }}>
                    <Paper key="pinboard-row1-col0" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-sm" sx={{ gridColumn: { xs: 'auto', sm: 'span 12', md: 'span 12' } }} />
                  </Box>
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' } }}>
                    <Paper key="pinboard-row2-col0" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-lg" sx={{ gridColumn: { xs: 'auto', sm: 'span 12', md: 'span 12' } }} />
                  </Box>
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' } }}>
                    <Paper key="pinboard-row3-col0" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-lg" sx={{ gridColumn: { xs: 'auto', sm: '1 / span 9', md: '1 / span 9' } }} />
                    <Paper key="pinboard-row3-col1" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-lg" sx={{ gridColumn: { xs: 'auto', sm: '10 / span 3', md: '10 / span 3' } }} />
                  </Box>
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' } }}>
                    <Paper key="pinboard-row4-col0" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-lg" sx={{ gridColumn: { xs: 'auto', sm: '1 / span 3', md: '1 / span 3' } }} />
                    <Paper key="pinboard-row4-col1" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-lg" sx={{ gridColumn: { xs: 'auto', sm: '4 / span 9', md: '4 / span 9' } }} />
                  </Box>
                </>
              );


            case 'Sections':
              return (
                <>
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' } }}>
                    <Paper key="sections-row1-col0" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-sm" sx={{ gridColumn: { xs: 'auto', sm: 'span 12', md: 'span 12' } }} />
                  </Box>
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' } }}>
                    {[0, 1, 2, 3].map(idx => (
                    <Paper key={`sections-row2-col${idx}`} elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-sm" sx={{ gridColumn: { xs: 'auto', sm: `${1 + idx * 3} / span 3`, md: `${1 + idx * 3} / span 3` } }} />
                    ))}
                  </Box>
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' } }}>
                    <Paper key="sections-row3-col0" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-lg" sx={{ gridColumn: { xs: 'auto', sm: 'span 12', md: 'span 12' } }} />
                  </Box>
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' } }}>
                    <Paper key="sections-row4-col0" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-lg" sx={{ gridColumn: { xs: 'auto', sm: 'span 12', md: 'span 12' } }} />
                  </Box>
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' } }}>
                    <Paper key="sections-row5-col0" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-md" sx={{ gridColumn: { xs: 'auto', sm: '1 / span 6', md: '1 / span 6' } }} />
                    <Paper key="sections-row5-col1" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-lg" sx={{ gridColumn: { xs: 'auto', sm: '7 / span 6', md: '7 / span 6' } }} />
                  </Box>
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' }, alignItems: 'stretch' }}>
                    <Paper key="sections-row6-col0" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-lg" sx={{ gridColumn: { xs: 'auto', sm: '1 / span 3', md: '1 / span 3' } }} />
                    <Paper key="sections-row6-col1" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-md" sx={{ gridColumn: { xs: 'auto', sm: '4 / span 3', md: '4 / span 3' } }} />
                    <Paper key="sections-row6-col2" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-lg" sx={{ gridColumn: { xs: 'auto', sm: '7 / span 6', md: '7 / span 6' } }} />
                  </Box>
                </>
              );


            case 'Snapshots':
              return (
                <>
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' } }}>
                    <Paper key="snapshots-row1-col0" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-md" sx={{ gridColumn: { xs: 'auto', sm: 'span 12', md: 'span 12' } }} />
                  </Box>
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' } }}>
                    <Paper key="snapshots-row2-col0" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-xs" sx={{ gridColumn: { xs: 'auto', sm: '1 / span 3', md: '1 / span 3' } }} />
                    <Paper key="snapshots-row2-col1" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-xs" sx={{ gridColumn: { xs: 'auto', sm: '4 / span 3', md: '4 / span 3' } }} />
                    <Paper key="snapshots-row2-col2" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-xs" sx={{ gridColumn: { xs: 'auto', sm: '7 / span 3', md: '7 / span 3' } }} />
                    <Paper key="snapshots-row2-col3" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-xs" sx={{ gridColumn: { xs: 'auto', sm: '10 / span 3', md: '10 / span 3' } }} />
                  </Box>
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' } }}>
                    <Paper key="snapshots-row3-col0" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-xs" sx={{ gridColumn: { xs: 'auto', sm: '1 / span 3', md: '1 / span 3' } }} />
                    <Paper key="snapshots-row3-col1" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-xs" sx={{ gridColumn: { xs: 'auto', sm: '4 / span 3', md: '4 / span 3' } }} />
                    <Paper key="snapshots-row3-col2" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-xs" sx={{ gridColumn: { xs: 'auto', sm: '7 / span 3', md: '7 / span 3' } }} />
                    <Paper key="snapshots-row3-col3" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-xs" sx={{ gridColumn: { xs: 'auto', sm: '10 / span 3', md: '10 / span 3' } }} />
                  </Box>
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' } }}>
                    <Paper key="snapshots-row4-col0" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-md" sx={{ gridColumn: { xs: 'auto', sm: 'span 12', md: 'span 12' } }} />
                  </Box>
                </>
              );


            case 'Splitz':
              return (
                <>
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' } }}>
                    <Paper key="splitz-col0" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-full" sx={{ gridColumn: { xs: 'auto', sm: '1 / span 6', md: '1 / span 6' } }} />
                    <Paper key="splitz-col1" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-full" sx={{ gridColumn: { xs: 'auto', sm: '7 / span 6', md: '7 / span 6' } }} />
                  </Box>
                </>
              );

            case 'Spotlight':
              return (
                <>
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' } }}>
                    <Paper key="spotlight-row1-col0" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-xs" sx={{ gridColumn: { xs: 'auto', sm: 'span 12', md: 'span 12' } }} />
                  </Box>
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' } }}>
                    {[0, 1, 2].map(idx => (
                    <Paper key={`spotlight-row2-col${idx}`} elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-xs" sx={{ gridColumn: { xs: 'auto', sm: `${1 + idx * 4} / span 4`, md: `${1 + idx * 4} / span 4` } }} />
                    ))}
                  </Box>
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' } }}>
                    <Paper key="spotlight-row3-col0" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-spotlight" sx={{ gridColumn: { xs: 'auto', sm: 'span 12', md: 'span 12' } }} />
                  </Box>
                </>
              );


            case 'Stacks':
              return (
                <>
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' } }}>
                    <Paper key="stacks-row1-col0" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-stacks" sx={{ gridColumn: { xs: 'auto', sm: '1 / span 6', md: '1 / span 6' } }} />
                    <Paper key="stacks-row1-col1" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-stacks" sx={{ gridColumn: { xs: 'auto', sm: '7 / span 6', md: '7 / span 6' } }} />
                  </Box>
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' } }}>
                    <Paper key="stacks-row2-col0" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-stacks" sx={{ gridColumn: { xs: 'auto', sm: '1 / span 6', md: '1 / span 6' } }} />
                    <Paper key="stacks-row2-col1" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-stacks" sx={{ gridColumn: { xs: 'auto', sm: '7 / span 6', md: '7 / span 6' } }} />
                  </Box>
                </>
              );

            case 'Dashboard':
              return (
                <>
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' }, alignItems: 'stretch' }}>
                    <Paper key="dashboard-row1-col0" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 120, sm: 240, md: 240 }, gridColumn: { xs: 'auto', sm: '1 / span 6', md: '1 / span 6' } }} />
                    <Paper key="dashboard-row1-col1" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 120, sm: 240, md: 240 }, gridColumn: { xs: 'auto', sm: '7 / span 3', md: '7 / span 3' } }} />
                    <Paper key="dashboard-row1-col2" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 120, sm: 240, md: 240 }, gridColumn: { xs: 'auto', sm: '10 / span 3', md: '10 / span 3' } }} />
                  </Box>

                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' }, alignItems: 'stretch' }}>
                    <Paper key="dashboard-row2-col0" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 80, sm: 120, md: 120 }, gridColumn: { xs: 'auto', sm: '1 / span 3', md: '1 / span 3' }, gridRow: { xs: 'auto', sm: '1', md: '1' } }} />
                    <Paper key="dashboard-row2-col1" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 80, sm: 120, md: 120 }, gridColumn: { xs: 'auto', sm: '1 / span 3', md: '1 / span 3' }, gridRow: { xs: 'auto', sm: '2', md: '2' } }} />
                    <Paper key="dashboard-row2-col2" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 180, sm: 240, md: 240 }, gridColumn: { xs: 'auto', sm: '4 / span 3', md: '4 / span 3' }, gridRow: { xs: 'auto', sm: '1 / span 2', md: '1 / span 2' } }} />
                    <Paper key="dashboard-row2-col3" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 180, sm: 240, md: 240 }, gridColumn: { xs: 'auto', sm: '7 / span 6', md: '7 / span 6' }, gridRow: { xs: 'auto', sm: '1 / span 2', md: '1 / span 2' } }} />
                  </Box>

                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' } }}>
                    <Paper key="dashboard-row3-col0" elevation={3} className="rds-comp-layout__paper" sx={{ minHeight: { xs: 120, sm: 240, md: 240 }, gridColumn: { xs: 'auto', sm: 'span 12', md: 'span 12' } }} />
                  </Box>
                </>
              );



            case 'Relaxed':
              return (
                <>
                  <Box sx={{ ...commonGridSx, gridTemplateColumns: { xs: '1fr', sm: 'repeat(12, 1fr)', md: 'repeat(12, 1fr)' }, gridTemplateRows: { xs: 'auto', sm: 'repeat(4, 1fr)', md: 'repeat(4, 1fr)' }, alignItems: 'stretch', minHeight: { xs: 400, sm: 600, md: 600 } }}>
                    <Paper key="relaxed-left" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-relaxed-left" sx={{ gridColumn: { xs: 'auto', sm: '1 / span 3', md: '1 / span 3' }, gridRow: { xs: 'auto', sm: '1 / span 4', md: '1 / span 4' } }} />

                    <Paper key="relaxed-row1" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-sm" sx={{ gridColumn: { xs: 'auto', sm: '4 / span 9', md: '4 / span 9' }, gridRow: { xs: 'auto', sm: '1', md: '1' } }} />

                    <Paper key="relaxed-row2-col0" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-sm" sx={{ gridColumn: { xs: 'auto', sm: '4 / span 2', md: '4 / span 2' }, gridRow: { xs: 'auto', sm: '2', md: '2' } }} />
                    <Paper key="relaxed-row2-col1" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-sm" sx={{ gridColumn: { xs: 'auto', sm: '6 / span 2', md: '6 / span 2' }, gridRow: { xs: 'auto', sm: '2', md: '2' } }} />
                    <Paper key="relaxed-row2-col2" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-sm" sx={{ gridColumn: { xs: 'auto', sm: '8 / span 2', md: '8 / span 2' }, gridRow: { xs: 'auto', sm: '2', md: '2' } }} />

                    <Paper key="relaxed-big" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-relaxed-big" sx={{ gridColumn: { xs: 'auto', sm: '4 / span 6', md: '4 / span 6' }, gridRow: { xs: 'auto', sm: '3 / span 2', md: '3 / span 2' } }} />

                    <Paper key="relaxed-vertical" elevation={3} className="rds-comp-layout__paper rds-comp-layout__paper--height-relaxed-big" sx={{ gridColumn: { xs: 'auto', sm: '10 / span 3', md: '10 / span 3' }, gridRow: { xs: 'auto', sm: '2 / span 3', md: '2 / span 3' } }} />
                  </Box>
                </>
              )


            default:
              return null;
          }


        })()}
      </Box>
    </Box>
  );



}

export default renderLayoutContent;




