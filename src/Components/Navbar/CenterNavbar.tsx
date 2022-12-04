import React, { ReactElement } from 'react';
import { useRecoilState } from 'recoil';
import { Button, Typography } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { appThemeMode, ThemeMode } from '../../app-atoms';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link } from 'react-router-dom';

interface DynamicIconProps {
  mode: ThemeMode;
}

function DynamicIcon({ mode }: DynamicIconProps): ReactElement {
  if (mode === 'dark') return <DarkModeIcon />;
  return <LightModeIcon />;
}

function ModeToggleButton(): ReactElement {
  const [mode, setMode] = useRecoilState(appThemeMode);

  const toggleMode = () => {
    setMode((prevState) => (prevState === 'light' ? 'dark' : 'light'));
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evently',
        width: '100%',
      }}
    >
      <Typography
        component={Link}
        to="/"
        color="textPrimary"
        sx={{
          flexGrow: 1,
          display: {
            xs: 'hidden',
            sm: 'block',
            textDecoration: 'none',
            boxShadow: 'none',
            fontSize: '3rem',
          },
        }}
      >
        COINX
      </Typography>
      <Button
        href="https://github.com/adam-i-horvath"
        target="__blank"
        style={{ margin: '5px', minWidth: '5px' }}
      >
        <GitHubIcon />
      </Button>
      <Button
        href="https://www.linkedin.com/in/horvathadamistvan/"
        target="__blank"
        style={{ margin: '5px', minWidth: '5px' }}
      >
        <LinkedInIcon />
      </Button>
      <Button onClick={toggleMode} sx={{ width: 140, height: 40 }}>
        <DynamicIcon mode={mode} /> &nbsp;{mode + ' mode'}
      </Button>
    </div>
  );
}

export default ModeToggleButton;
