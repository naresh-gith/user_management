import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CREATE_ACCOUNT, HOME, LOGIN ,DATA, PROFILE, UPDATE_ACCOUNT} from './AppRoutes';
import Login from '../components/Login/Login';
import CreateAccount from '../components/CreateAccount/CreateAccount';
import Header from '../components/Header/Header';
import Home from '../components/Home/Home';
import Database from "../components/Database/Data"
import Profile from '../components/Profile/Profile';

export default function AppNavigation() {
  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route path={LOGIN} element={<Login />} />
          <Route path={CREATE_ACCOUNT} element={<CreateAccount />} />
          <Route path={HOME} element={<Home/>}/>
          <Route path={DATA} element={<Database/>}/>
          <Route path={PROFILE} element={<Profile/>}/>
          <Route path={`${UPDATE_ACCOUNT}/:id`} element={<CreateAccount/>}/>
        </Routes>
      </>
    </Router>
  );
}
