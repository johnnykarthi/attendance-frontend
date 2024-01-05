import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import validator from 'validator'

export default function ForgotPasswordComp() {
    const [email, setEmail] = useState('')
    const [error, setError] = useState(null)

    const [emailsent, setEmailsent] = useState(false)
    const [loading, setLoading] = useState(false)

    const onChangeHandler = (e) => {
        setError(null)
        setEmail(e.target.value)
    }
    const resetHandler = async () => {

        if (!validator.isEmail(email)) {
            return setError('Invalid Email')
        }

        try {
            setLoading(true)
            const response = await fetch('http://localhost:3300/api/owner/forgot-password', {
                headers: {
                    "Content-Type": "application/json"
                },
                method: 'POST',
                body: JSON.stringify({ email })
            })

            if (!response.ok) {
                return setError('Email is not registered')
            }
            setEmailsent(true)
        } catch (e) {
            setError("Something went wrong. Try again..!")
        }
        finally{
            setLoading(false)
        }

    }

    const navigate = useNavigate()

    const goBack = ()=>{
        navigate(-1)
    }
    return (
        <div className="main-background">
            <div className="loginpage">
                <h4 className="head-title">Attendance Data</h4>
                <div className="login-box">
                    <div className="form-group">
                        <h5 className="mb-3 text-center">Reset your password</h5>
                        {error && <div className='text-center my-2'>
                            <small className='text-danger'>{error}</small>
                        </div>}
                        <div className={`${emailsent && 'hide'}`}>
                            <p className="text-center m-2">Registered Email</p>
                            <input type="email" name='email' value={email} onChange={onChangeHandler} className="form-control form-control-sm mb-2" placeholder="Enter your registered email" />
                            <div className="text-center mt-3">
                                <button className="btn btn-primary btn-sm me-2" onClick={goBack}>Back</button>
                                <button className="btn btn-primary btn-sm" onClick={resetHandler}>Send</button>
                            </div>
                        </div>
                        <div className={`${!emailsent && 'hide'}`}>
                            <hr />
                            <p className="reset-password-text">
                                <small>Reset link has been sent to your registered email address.
                                    <Link to='/login'> click here </Link> to login</small>
                            </p>
                        </div>

                    </div>
                </div>
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
        </div>
        
    )
}
