import React from 'react';
import './App.css';
import { RecoilRoot } from 'recoil';
import { Container, Stack } from '@mui/material';
import AppThemeProvider from './Components/ThemeProvider';
import ModeToggleButton from './Components/ModeToggleButton';

import { Route, Routes } from 'react-router-dom';

import Home from './Pages/Home';
import About from './Pages/About';
import Navbar from './Components/Navbar';
import Top100 from './Components/Top100';

function App() {
  return (
    <RecoilRoot>
      <AppThemeProvider>
        <Container sx={{ height: '100%' }}>
          <Stack direction="row" justifyContent="flex-end" sx={{ my: 2 }}>
            <ModeToggleButton />
          </Stack>

          <Stack justifyContent="center" alignItems="center">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/chart" element={<Top100 />} />
            </Routes>
          </Stack>
        </Container>
      </AppThemeProvider>
    </RecoilRoot>
  );
}

export default App;
