import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Add from './routes/Add';
import Edit from './routes/Edit';
import HomePage from './routes/HomePage';
import DbAdd from './routes/DbAdd';
import DbSearch from './routes/DbSearch';
import Login from './routes/Login';
import Signup from './routes/Signup';
// import UserData from './components/UserData';  // UserData 컴포넌트를 import
import NutritionStatsPage from './routes/NutritionStatsPage';
import ConsumptionStatsPage from './routes/ConsumptionStatsPage';
import WasteStatsPage from './routes/WasteStatsPage';
import Mypage from './routes/Mypage';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add" element={<Add />}></Route>
        <Route path="/edit" element={<Edit />}></Route>
        <Route path="/home" element={<HomePage />} />
        <Route path="/dbsearch" element={<DbSearch />} />
        <Route path="/dbadd" element={<DbAdd />} />
        <Route path="/nutrition-stats" element={<NutritionStatsPage />} />
        <Route path="/consumption-stats" element={<ConsumptionStatsPage />} />
        <Route path="/waste-stats" element={<WasteStatsPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage" element={<Mypage />} />
        {/* <Route path="/userdata" element={<UserData />} />  // UserData 경로 추가 */}
      </Routes>
    </Router>
  );
}

export default App;
