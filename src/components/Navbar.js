import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";
import { AuthContext } from '../context/AuthContext';
export default function Navbar() {

  const [sideBar, setSideBar] = useState({
    hamburger: true,
    sideBar: 'hide'
  })

  const { owner,dispatch } = useContext(AuthContext)
  const sidebarChangeHandler = () => {
    if (sideBar.hamburger) {
      setSideBar({
        hamburger: false,
        sideBar: ''
      })
    } else {
      setSideBar({
        hamburger: true,
        sideBar: 'hide'
      })
    }
  }


  const logoutHandler = () => {
    localStorage.removeItem('owner')
    dispatch({type:'LOGOUT'})
  }
  return (
    <div className="navbar-box">
      <div className="container">
        <div className="nac">
          <span className='link-style-head'><Link to='/'><h4 className="m-0 logo">₯</h4></Link></span>
          <div>
            <div className="hamburger">
              <div className={`hamburger-icon ${sideBar.hamburger ? 'white-fontcolor' : 'black-fontcolor'}`} onClick={sidebarChangeHandler}>{sideBar.hamburger ? <RxHamburgerMenu /> : <IoCloseOutline />}</div>
            </div>
            <div className={`navbar-side-box ${sideBar.sideBar}`}>
              <div className="account-name"><span>{owner.fullname}</span>  <br /><small>{owner.email}</small><hr /></div>
              <div className='list-data'>
                <Link to='/new'><p onClick={sidebarChangeHandler}>Add Employee</p></Link>
                <Link to='/attendance'><p onClick={sidebarChangeHandler}>Attendance</p></Link>
                <Link to='/view'><p onClick={sidebarChangeHandler}>View Employee</p></Link>
                <Link to='/report'><p onClick={sidebarChangeHandler}>Report</p></Link>
                <hr />
                <Link to='/changepassword'><p onClick={sidebarChangeHandler}>Change your password</p></Link>
                <hr />
                <p><button className='btn btn-danger btn-sm' onClick={logoutHandler}>Logout</button></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
