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

  const [deleteaccount, setDeleteAccount] = useState(false)
  const [deleteAccountSuccessfull, setDeleteAccountSuccessfull] = useState(false)
  const [loading, setLoading] = useState(false)
  const { owner, dispatch } = useContext(AuthContext)
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
    dispatch({ type: 'LOGOUT' })
  }


  const deactivateAccount = () => {
    setSideBar({
      hamburger: true,
      sideBar: 'hide'
    })
    setDeleteAccount(true)
  }

  const deactivateAccountRequest = async () => {
    try {
      setLoading(true)
      const response = await fetch(`https://attendance-server-api.onrender.com/api/owner/deactivate-account`, {
        headers: {
          "Content-Type": "application/json"
        },
        method: 'POST',
        body: JSON.stringify({ email: owner.email })
      })
      if (response.ok) {
        setDeleteAccountSuccessfull(true)
      }
    }
    catch (e) {
      console.log(e)
    }
    finally {
      setLoading(false)
    }

  }

  return (

    <>
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
                  <p onClick={deactivateAccount}>Deactivate your account</p>
                  <hr />
                  <p><button className='btn btn-danger btn-sm' onClick={logoutHandler}>Logout</button></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={deleteaccount ? '' : 'hide'}>
        <div className={`employee-updated`}>
          <p>Are you sure you want to deactivate your account?</p>
          <hr />
          <div className="d-flex justify-content-evenly">
            <button className="no-btn btn-style" onClick={deactivateAccountRequest}>Yes</button>
            <button className="yes-btn btn-style" onClick={() => setDeleteAccount(false)}>No</button>
          </div>
        </div>
        <div className={`overlay`}></div>

      </div>

      <div className={`${!loading && 'hide'}`}>
        <div className="loader">
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>

        <div className="overlay-loader"></div>
      </div>

      <div className={`${!deleteAccountSuccessfull && 'hide'}`}>
        <div className={`employee-updated`}>
          <p>Your account has been deactivated successfully</p>
          <hr />
          <button className="btn btn-success btn-sm" onClick={() => { setDeleteAccountSuccessfull(false); logoutHandler() }}>Okay</button>
        </div>
        <div className={`overlay`}></div>
      </div>

    </>

  )
}
