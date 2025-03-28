import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HousePricePredictor from './HousePricePredictor';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={} />
        <Route path="predict/" element={<HousePricePredictor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
