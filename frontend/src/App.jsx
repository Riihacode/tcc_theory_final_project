import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Home from './pages/Home';
import EditNote from './pages/EditNote';
import Logout from './components/Logout';
import { Navigate } from 'react-router-dom';
import PrivateRoute from './components/PtivateRoute';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("accessToken"));

  useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
  }, []);  // Hanya sekali cek saat mount

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected routes */}
        <Route
          path="/home"
          element={
            <PrivateRoute token={token}>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <PrivateRoute token={token}>
              <EditNote />
            </PrivateRoute>
          }
        />

        <Route path="/logout" element={<Logout />} />

        {/* Default route */}
        <Route
          path="/"
          element={
            <PrivateRoute token={token}>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;