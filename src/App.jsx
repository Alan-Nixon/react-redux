import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './component/pages/Home';
import Login from './component/pages/Login';
import { IsLoggedIn } from './userBackend/UserController';
import Signup from './component/pages/Signup';
import Admin from './component/pages/Admin';
import Profile from './component/pages/Profile';



const App = () => {

  const [isLoggedInComponent, setIsLoggedInComponent] = useState(null);

  const AuthenticatedHome = ({ ifLogged, notLogged, Admin }) => {
    useEffect(() => {
      IsLoggedIn(Admin).then(result => { setIsLoggedInComponent(result) });
    }, []);
    if (isLoggedInComponent === null) { return null; }
    return (isLoggedInComponent ? ifLogged : notLogged);
  };




  return (
    <Router>
      <Routes>

        <Route path="/" element={<AuthenticatedHome ifLogged={<Home />} notLogged={<Navigate to='/login' />} />} />

        <Route path='/login' element={<AuthenticatedHome ifLogged={<Navigate to='/' />} notLogged={<Login />} />} />

        <Route path='/signup' element={<AuthenticatedHome ifLogged={<Navigate to='/' />} notLogged={<Signup />} />} />

        <Route path='/profile' element={<Profile />} />

        <Route path='/admin' element={<AuthenticatedHome ifLogged={<Admin />} notLogged={<Navigate to='/admin/login' />} Admin />} />

        <Route path='/admin/login' element={<AuthenticatedHome ifLogged={<Navigate to='/admin' />} notLogged={<Login isAdminLogin={true} />} Admin />} />

      </Routes>
    </Router>
  );
};

export default App;
