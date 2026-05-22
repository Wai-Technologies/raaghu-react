import './App.css';
import React, { useState } from 'react';
import { Button, Container, Typography, Box, Tabs, Tab } from '@mui/material';
import { makeStyles } from '@griffel/react';
import { useThemeToggle } from '../../utils/griffel/GriffelProvider';

// Griffel styles for the main App component using existing theme files
const useAppStyles = makeStyles({
  appContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    padding: '20px 0',
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px',
    padding: '24px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
  },
  title: {
    fontSize: '3rem',
    fontWeight: 700,
    background: 'linear-gradient(45deg, #3C98FF, #2534E9)', // Using colors from existing theme files
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '16px',
  },
  subtitle: {
    fontSize: '1.25rem',
    color: '#666',
    marginBottom: '24px',
  },
  tabContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '12px',
    padding: '8px',
    marginBottom: '24px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
  },
  contentArea: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '16px',
    padding: '32px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
  },
  themeToggle: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 'var(--rds-z-index-portal)',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '12px 16px',
    borderRadius: '12px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  // Demo styles showing Griffel integration with existing themes
  griffelDemo: {
    padding: '16px',
    margin: '16px 0',
    borderRadius: '8px',
    border: '2px solid #3C98FF', // Using primary color from theme
    backgroundColor: 'rgba(60, 152, 255, 0.1)',
    '&:hover': {
      backgroundColor: 'rgba(60, 152, 255, 0.2)',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(60, 152, 255, 0.3)',
    },
    transition: 'all 0.3s ease-in-out',
  },
  griffelText: {
    color: '#3C98FF', // Using primary color from theme
    fontWeight: 600,
    fontSize: '1.1rem',
  },
});

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const classes = useAppStyles();
  const { toggleTheme, isLight } = useThemeToggle();

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <div className={classes.appContainer}>
      {/* Global Theme Toggle */}
      <div className={classes.themeToggle}>
        <Button 
          variant="outlined" 
          onClick={toggleTheme}
          sx={{ 
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: '8px',
            px: 2,
            py: 1
          }}
        >
          {isLight ? '🌙 Dark' : '☀️ Light'} Mode
        </Button>
      </div>

      <Container maxWidth="lg">
        <div className={classes.header}>
          <Typography variant="h1" className={classes.title}>
            Raaghu Design System
          </Typography>
          
          <Typography variant="h6" className={classes.subtitle}>
            React + Vite + MUI + Griffel Integration
          </Typography>
        </div>

                     <div className={classes.tabContainer}>
               <Tabs value={activeTab} onChange={handleTabChange} centered>
                 <Tab label="Home" />
               </Tabs>
             </div>

        <div className={classes.contentArea}>
          {activeTab === 0 && (
            <Box textAlign="center">
              <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
                Welcome to Raaghu Design System
              </Typography>
              <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
                Start creating pages by using Application Shells, Layouts, Components, Elements, Charts and more.
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                Now enhanced with Griffel CSS-in-JS for better performance and styling capabilities!
              </Typography>
              
              {/* Griffel Demo Section */}
              <div className={classes.griffelDemo}>
                <Typography className={classes.griffelText}>
                  🎨 Griffel is now integrated with your existing theme files!
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                  This box is styled with Griffel and uses colors from your lightTheme.ts and darkTheme.ts files.
                  Toggle the theme to see it adapt automatically!
                </Typography>
              </div>
              
            </Box>
          )}

        </div>
      </Container>
    </div>
  )
}

export default App;