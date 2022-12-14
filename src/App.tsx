import React from 'react';
import './App.css';

import {
  Routes,
  Route,
} from "react-router-dom";

import Navbar from './components/navbar/Navbar';
import SortingAlgorithms from './components/algorithms/sorts/SortingAlgorithms';
import ErrorPage from './components/error/ErrorPage';
import Home from './components/Home';
import { createTheme } from '@mui/material/styles';
import { green, indigo } from '@mui/material/colors';
import { ThemeProvider } from '@emotion/react';
import GraphingAlgorithms from './components/algorithms/graphs/GraphingAlgorithms';

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: indigo[800],
      },
      secondary: {
        main: green[500],
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Navbar/>
      <Routes>
        <Route path="/sorts" element={<SortingAlgorithms />} />
        <Route path="/graphs" element={<GraphingAlgorithms/>} />
        <Route path="/" element={<Home/>} />
        <Route path="*" element={<ErrorPage />} />

      </Routes>
    </ThemeProvider>
  )
    
  }

export default App;

