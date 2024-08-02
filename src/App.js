import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './routes/HomePage';
import DbAdd from './routes/DbAdd';
import DbSearch from './routes/DbSearch';
import NutritionStatsPage from './routes/NutritionStatsPage'
import ConsumptionStatsPage from './routes/ConsumptionStatsPage'
import WasteStatsPage from './routes/WasteStatsPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dbsearch" element={<DbSearch />} />
          <Route path="/dbadd" element={<DbAdd />} />
          <Route path="/nutrition-stats" element={<NutritionStatsPage />} />
          <Route path="/consumption-stats" element={<ConsumptionStatsPage />} />
          <Route path="/waste-stats" element={<WasteStatsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
