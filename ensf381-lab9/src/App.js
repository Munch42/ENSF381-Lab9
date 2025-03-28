import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HousePricePredictor from './HousePricePredictor';
import Login from './Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="predict/" element={<HousePricePredictor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
