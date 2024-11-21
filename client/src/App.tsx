import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './output.css';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './pages/protected/ProtectedRoute';
import Home from './pages/home/Home';
import UsersList from './pages/users/list/List';
import Login from './pages/auth/login/Login';
import Register from './pages/auth/register/Register';
import Recovery from './pages/auth/recovery/Recovery';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useAuthStore } from './store/auth/auth';
import RegisterUser from './pages/users/register/Register';
import AuthPages from './pages/auth/protected/AuthPages';
import EditUser from './pages/users/edit/Edit';
import ToasterIU from './components/ui/toaster/Toaster';

const App = () => {

  const token = Cookies.get('token')
  const navigate = useNavigate()
  const { isAuthentic, token: tokenNode, clear, verify } = useAuthStore()

  useEffect(() => {
    if (token && isAuthentic) {
      verify()
    }
    if (token == null && isAuthentic) {
      navigate("/auth/login");
      clear()
    }

  }, [navigate, token, isAuthentic]);

  return (
    <AuthProvider>
      <Routes>
        <Route element={<AuthPages />}>
          <Route path='/auth/login' element={<Login />} />
          <Route path='/auth/register' element={<Register />} />
          <Route path='/auth/recovery' element={<Recovery />} />
        </Route>
        <Route element={<ProtectedRoute />} >
          <Route path='/' element={<Home />} />
          <Route path='/users/list/:page' element={<UsersList />} />
          <Route path='/users/register' element={<RegisterUser />} />
          <Route path='/users/edit/:id' element={<EditUser />} />
        </Route>
      </Routes>
      <ToasterIU />
    </AuthProvider>
  );
}

export default App;
