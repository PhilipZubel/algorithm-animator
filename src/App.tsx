import React from 'react';
import './App.css';

import {
  Routes,
  Route,
} from "react-router-dom";

import Navbar from './components/navbar/Navbar';

import SortingAlgorithms from './components/algorithms/sorts/SortingAlgorithms';
import ErrorPage from './components/error/ErrorPage';
import GraphAlgorithms from './components/algorithms/graphs/GraphAlgorithms';
import TextAlgorithms from './components/algorithms/texts/TextAlgorithms';

export const App = () => ( 

    <>
    <Navbar/>
    {/* <Navbar2 /> */}
    <Routes>
      <Route path="/sorts" element={<SortingAlgorithms />} />
      <Route path="/graphs" element={<GraphAlgorithms />} />
      <Route path="/text" element={<TextAlgorithms />} />
      <Route path="*" element={<ErrorPage />} />

    </Routes>
  </>
)

export default App;

