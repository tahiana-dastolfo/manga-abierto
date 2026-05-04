import './styles/fonts.css'
import './styles/App.css';
import Login from './pages/Auth/Login';
import { Navigate, Route, Routes } from 'react-router';
import Register from './pages/Auth/Register';
import Home from './pages/Home/Home';
import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import Loader from './components/Loader';

export const ROUTE = {
  LOGIN: '/login',
  REGISTER: '/register',
  HOME: '/home'
}

function App() {
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
      supabase.auth.getSession()
        .then(({ data: { session } }) => { setAuthenticated(!!session); })
        .catch(() => { setAuthenticated(false) })
        .finally(() => { setLoading(false); });
    }, []);

    if (loading) return <Loader />;
    return authenticated ? <>{children}</> : <Navigate to={ROUTE.LOGIN} replace />;
  };

  return (
    <>
    <Routes>
      <Route path='/' element={<Navigate to={ROUTE.LOGIN} replace/>} />
      <Route path={ROUTE.LOGIN} element={<Login />} />
      <Route path={ROUTE.REGISTER} element={<Register />}/>
      <Route path={ROUTE.HOME} element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
    </Routes>
    </>
  );
}

export default App;
