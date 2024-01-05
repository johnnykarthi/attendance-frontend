import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import SomethingWrongLogo from '../img/error.png';

export default function Login() {
    const { dispatch } = useContext(AuthContext)
    const [error, setError] = useState(null)
    const [serverError, setServerError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loginDetails, setLoginDetails] = useState({
        email: '',
        password: '',
    })
    const [checkBoxValue, setCheckBoxValue] = useState(false);
    const onChangeHandler = (e) => {
        setError(null)
        const { name, value } = e.target
        setLoginDetails({ ...loginDetails, [name]: value })
    }
    const loginHandler = async () => {
        if (!loginDetails.email || !loginDetails.password) {
            return setError('All field must be filled')
        }
        try {
            setLoading(true)
            const response = await fetch('http://localhost:3300/api/owner/login', {
                headers: {
                    "Content-Type": "application/json"
                },
                method: 'POST',
                body: JSON.stringify(loginDetails)
            })

            const responseData = await response.json()
            if (response.ok) {

                if (checkBoxValue) {
                    localStorage.setItem('owner', JSON.stringify(responseData))
                }
                dispatch({ type: 'LOGIN', payload: responseData })
            }
            setError(responseData.error)
        }
        catch (e) {
            setServerError(true)
        }
        finally{
            setLoading(false)
        }

    }
    return (
        <>
            {
                !serverError ? <div className="main-background">
                    <div className="loginpage">
                        <h4 className="head-title">Attendance Data</h4>
                        <div className="login-box">
                            <div className="form-group">
                                <h5 className="mb-3 text-center">Login</h5>
                                {error && <div className='text-center my-2'>
                                    <small className='text-danger'>{error}</small>
                                </div>}
                                <label htmlFor="">Email</label>
                                <input type="email" value={loginDetails.email} className="form-control form-control-sm mb-2" name='email' onChange={onChangeHandler} />
                                <label htmlFor="">Password</label>
                                <input type="password" value={loginDetails.password} className="form-control form-control-sm" name='password' onChange={onChangeHandler} />
                                <div className="d-flex align-items-center mt-2">
                                    <input type="checkbox" className="me-1" name='checkboxValue' onChange={(e) => setCheckBoxValue(e.target.checked)} /><small>Remember me?</small>
                                </div>

                                <div className="text-center mt-3">
                                    <button className="btn btn-primary btn-sm" onClick={loginHandler}>Login</button>
                                </div>

                                <hr />
                                <p className="forgot-password text-center mb-3">Need an Account? | <Link to='/signup'>Sign up</Link></p>

                                <p className='forgot-password text-center text-danger mb-1'><Link to='/forgotpassword' className='text-decoration-none text-danger'>Forgot your password? </Link></p>
                            </div>
                        </div>
                    </div>
                </div> :
                    <div className="without-login">
                        <div className="something-wrong">
                            <img src={SomethingWrongLogo} alt="" width="60%" />
                            <p>Somthing went wrong..!</p>
                            <button className="btn btn-primary btn-sm" onClick={() => setServerError(false)}>Try Again</button>
                        </div>
                    </div>
            }

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
        </>
    )
}
