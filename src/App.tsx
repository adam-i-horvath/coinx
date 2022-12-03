import React from 'react';
import './App.css';
import { Container, Stack } from '@mui/material';
import AppThemeProvider from './Components/ThemeProvider';
import ModeToggleButton from './Components/ModeToggleButton';

import { Route, Routes } from 'react-router-dom';

import Home from './Pages/Home';
import About from './Pages/About';
import Navbar from './Components/Navbar';
import Top100 from './Components/Top100';
import Details from './Pages/Details';

function App() {
  return (
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
            <Route path="/top100" element={<Top100 />} />
            <Route path=":id" element={<Details />} />
          </Routes>
        </Stack>
      </Container>
    </AppThemeProvider>
  );
}

export default App;
