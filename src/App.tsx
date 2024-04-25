import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

function App() {

  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <HomePage /> : <Navigate to="/auth" />}
          />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
