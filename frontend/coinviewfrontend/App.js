import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Dashboard from './components/Dashboard';
import CoinPage from './components/CoinPage';
import InsightsPage from './components/InsightsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/coin/:symbol" element={<CoinPage />} />
      </Routes>
    </Router>
  );
}

export default App;
