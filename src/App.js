import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Add from './routes/Add';
import Edit from './routes/Edit';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/add" element={<Add />}></Route>
        <Route path="/edit/:id" elemnet={<Edit />}></Route>
        <Route path="/" element={<HomePage />} />
        <Route path="/dbsearch" element={<DbSearch />} />
        <Route path="/dbadd" element={<DbAdd />} />
        <Route path="/nutrition-stats" element={<NutritionStatsPage />} />
        <Route path="/consumption-stats" element={<ConsumptionStatsPage />} />
        <Route path="/waste-stats" element={<WasteStatsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
