import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SomethingWrongLogo from '../img/error.png';

import validator from 'validator';

export default function Signup() {
    const [ownerDetails, setOwnerDetails] = useState({
        fullname: '',
        mobile: '',
        email: '',
        password: '',
        confirmPassword: '',
        otp: ''
    })

    const [signupSuccess, setSignupSuccess] = useState(false)
    const [serverError, setServerError] = useState(false)
    const [error, setError] = useState(null)
    const [loading,setLoading] = useState(false)



    const [otpbox, setotpbox] = useState(false)
    const [emailBox, setEmailBox] = useState(true)
    const [passwordBox, setPasswordBox] = useState(false)

    const onChangeHandler = (e) => {
        const { name, value } = e.target
        setError(null)
        setOwnerDetails({ ...ownerDetails, [name]: value })
    }

    const signuphandler = async (e) => {
        e.preventDefault()

        if (ownerDetails.fullname && ownerDetails.email && ownerDetails.mobile && ownerDetails.password) {
            if (ownerDetails.password !== ownerDetails.confirmPassword)
                return setError('Password must match')

            try {
                setLoading(true)
                const response = await fetch('http://localhost:3300/api/owner/signup', {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: 'POST',
                    body: JSON.stringify(ownerDetails)
                })
                const responseData = await response.json()
                if (response.ok) {
                    return setSignupSuccess(true)
                }
                setError(responseData.error)
            }
            catch (e) {
                setServerError(true)
            }finally{
                setLoading(false)
            }
        }
        else {
            setError('All field must be filled')
        }

    }

    const otpgenerator = async () => {
        if (!validator.isEmail(ownerDetails.email)) {
            return setError('Invalid email')
        }
        try {
            setLoading(true)
            const response = await fetch('http://localhost:3300/api/otp/generate-otp', {
                headers: {
                    "Content-Type": "application/json"
                },
                method: 'POST',
                body: JSON.stringify({ email: ownerDetails.email })
            })
            const json = await response.json()

            if (!response.ok) {
                return setError(json.err)
            }
            setEmailBox(false)
            setotpbox(true)
        } catch (e) {
            setServerError(true)
        }
        finally{
            setLoading(false)
        }
    }

    const verifyOTP = async () => {

        if (!ownerDetails.otp) {
            return setError('Please enter your otp')
        }

        try {
            setLoading(true)
            const response = await fetch('http://localhost:3300/api/otp/validate-otp', {
                headers: {
                    "Content-Type": "application/json"
                },
                method: 'POST',
                body: JSON.stringify({ email: ownerDetails.email, otp: ownerDetails.otp })
            })
            const json = await response.json()

            if (!response.ok) {
                return setError(json.err)
            }
            setotpbox(false)
            setPasswordBox(true)
        } catch (e) {
            setServerError(true)
        }finally{
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
                                
                                <h5 className="mb-3 text-center">Signup</h5>
                                {error && <div className='text-center my-2'>
                                    <small className='text-danger'>{error}</small>
                                </div>}
                                {emailBox && <>
                                        <label htmlFor="">Email</label>
                                        <input type="email" value={ownerDetails.email} className="form-control form-control-sm mb-2" name='email' onChange={onChangeHandler} required />
                                        <div className="text-center mt-3">
                                            <button className="btn btn-primary btn-sm" onClick={otpgenerator}>Next</button>
                                        </div>
                                    </>
                                }
                                {otpbox && <>
                                    <label htmlFor="">OTP</label>
                                    <input type="number" value={ownerDetails.otp} className="form-control form-control-sm mb-2" name='otp' minLength='4' onChange={onChangeHandler} required />
                                    <div className="text-center mt-3">
                                        <button className="btn btn-primary btn-sm" onClick={verifyOTP}>Next</button>
                                    </div>
                                </>}

                                { passwordBox && <>
                                    <label htmlFor="">Full Name</label>
                                    <input type="text" value={ownerDetails.fullname} className="form-control form-control-sm mb-2" name='fullname' onChange={onChangeHandler} required />
                                    <label htmlFor="">Mobile</label>
                                    <input type="number" value={ownerDetails.mobile} className="form-control form-control-sm mb-2" name='mobile' onChange={onChangeHandler} required />
                                    <label htmlFor="">Password</label>
                                    <input type="password" value={ownerDetails.password} className="form-control form-control-sm" name='password' onChange={onChangeHandler} required />
                                    <label htmlFor="">Confirm Password</label>
                                    <input type="password" value={ownerDetails.confirmPassword} className="form-control form-control-sm" name='confirmPassword' onChange={onChangeHandler} required />
                                    <div className="text-center mt-3">
                                        <button type='submit' className="btn btn-primary btn-sm" onClick={signuphandler}>Finish</button>
                                    </div>
                                </>

                                }

                                <hr />
                                <p className="forgot-password text-center">Already have an Account? | <Link to='/login'>Login</Link></p>
                            </div>
                        </div>
                    </div>
                    <div className={`employee-updated  ${signupSuccess ? '' : 'hide'}`}>
                        <p>You have successfully Signup! </p>
                        <hr />
                        <Link to='/login'><button className="okay-btn btn-style">Login</button></Link>
                    </div>

                    <div className={`overlay ${signupSuccess ? '' : 'hide'}`}></div>
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
