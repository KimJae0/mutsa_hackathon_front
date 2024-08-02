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
      </Routes>
    </Router>
  );
}

export default App;
