import React, { ReactElement } from 'react';
import { useRecoilState } from 'recoil';
import { Button, Typography } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { appThemeMode, ThemeMode } from '../app-atoms';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

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
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <Typography
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        [ Adam I. Horvath ]
        <Button style={{ margin: '5px', minWidth: '5px' }}>
          <GitHubIcon />
        </Button>
        <Button style={{ margin: '5px', minWidth: '5px' }}>
          <LinkedInIcon />
        </Button>
      </Typography>
      <Button onClick={toggleMode} sx={{ width: 140, height: 40 }}>
        <DynamicIcon mode={mode} /> &nbsp;{mode + ' mode'}
      </Button>
    </div>
  );
}

export default ModeToggleButton;
