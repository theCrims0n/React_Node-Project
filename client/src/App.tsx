import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './output.css';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './pages/protected/ProtectedRoute';
import Home from './pages/home/Home';
import UsersList from './pages/users/list/List';
import Login from './pages/auth/login/Login';
import Register from './pages/auth/register/Register';
import Recovery from './pages/auth/recovery/Recovery';
import RegisterUser from './pages/users/register/Register';
import AuthPages from './pages/auth/protected/AuthPages';
import EditUser from './pages/users/edit/Edit';
import ToasterIU from './components/ui/toaster/Toaster';
import InvitationsList from './pages/invitations/list/List';
import AdminRoute from './pages/admin/AdminRoute';
import Profile from './pages/main/profile/Profile';
import ProfileEditUser from './pages/main/profile/edit/Edit';
import Chat from './pages/main/chat/Chat';

const App = () => {

  return (
    <div >
      <AuthProvider>
        <Routes>
          <Route element={<AuthPages />}>
            <Route path='/auth/login' element={<Login />} />
            <Route path='/auth/register' element={<Register />} />
            <Route path='/auth/recovery' element={<Recovery />} />
          </Route>
          <Route element={<ProtectedRoute />} >
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/profile/edit/' element={<ProfileEditUser />} />
            <Route path='/chat' element={<Chat />} />
            <Route element={<AdminRoute />} >
              <Route path='/users/list/:page' element={<UsersList />} />
              <Route path='/invitations/list/:page' element={<InvitationsList />} />
              <Route path='/users/register' element={<RegisterUser />} />
              <Route path='/users/edit/:id' element={<EditUser />} />
            </Route>
          </Route>
        </Routes>
        <ToasterIU />
      </AuthProvider>
    </div >
  );
}

export default App;
