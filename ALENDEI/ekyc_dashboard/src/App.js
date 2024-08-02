import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import LoginPage from './Pages/SignIn';
import Dashboard from './Pages/Dashboard';
import ProtectedRoute from './Components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './Components/Loading';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loadApp = async () => {
      // console.log('Loading');
      await new Promise((resolve) => setTimeout(resolve, 2200)); // Simulating a 2-second delay
      setIsLoading(false);
    };

    loadApp();
  }, []);
  return (
    <Router>
      {isLoading ? (
        <Loading />
      ) : (
        <Routes>
          <Route exact path='/' element={<LoginPage />} />
          <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
            <Route exact path='/dashboard' element={<Dashboard />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={['Reviewer']} />}>
            <Route exact path='/reviewer' element={<Dashboard />} />
          </Route>
        </Routes>
      )}
      <ToastContainer
        className='toast-position'
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
    </Router>
  );
};

export default App;
