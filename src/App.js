
import './App.css';
import {Routes,Route, Navigate} from 'react-router-dom'
import Home from './pages/Home';
import Report from './pages/Report';
import ViewEmployee from './pages/ViewEmployee';
import Navbar from './components/Navbar';
import Attendance from './pages/Attendance';
import AddEmployee from './pages/AddEmployee';
import ErrorPage from './pages/ErrorPage';
import ViewEmployeeDetails from './components/ViewEmployeeDetails';
import EditEmployee from './components/EditEmployee';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import ChangePassword from './components/ChangePassword';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function App() {
  const {owner} = useContext(AuthContext);
  return (
    <>
     {owner && <Navbar/>}
      <Routes>
         <Route path='/' element={owner ? <Home/> : <Navigate to='/login'/>}></Route>
         <Route path='/new' element={owner ? <AddEmployee/> : <Navigate to='/login'/>}></Route>
         <Route path='/report' element={owner ? <Report/> : <Navigate to='/login'/>}></Route>
         <Route path='/view' element={owner ? <ViewEmployee/> : <Navigate to='/login'/>}></Route>
         <Route path='/view/:id' element={owner ? <ViewEmployeeDetails/> : <Navigate to='/login'/>}></Route>
         <Route path='/edit/:id' element={owner ? <EditEmployee/>: <Navigate to='/login'/>}></Route>
         <Route path='/attendance' element={owner ? <Attendance/>: <Navigate to='/login'/>}></Route>
         <Route path='/changepassword' element={owner ? <ChangePassword/>: <Navigate to='/login'/>}></Route>
         <Route path='/forgotpassword' element={<ForgotPassword/>}></Route>
         <Route path='/reset-password/:id' element={<ResetPassword/>}></Route>
         <Route path='/login' element={!owner ? <Login/> : <Navigate to='/'/>}></Route>
         <Route path='/signup' element={!owner ? <Signup/> : <Navigate to='/'/>}></Route>
         <Route path='*' element={<ErrorPage/>}></Route>
      </Routes>
    </>
  );
}

export default App;
