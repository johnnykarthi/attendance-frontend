import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import validator from 'validator'
import { AuthContext } from '../context/AuthContext'
import { TiArrowLeft } from "react-icons/ti";


import SomethingWrongLogo from '../img/error.png';

export default function ChangePassword() {
    const { owner } = useContext(AuthContext)
    const [passwordData, setPasswordData] = useState({
        oldpassword: '',
        newpassword: '',
        confirmpassword: ''
    })

    const [error, setError] = useState(null)
    const [serverError, setServerError] = useState(false)
    const [loading, setLoading] = useState(false)

    const onChangeHandler = (e) => {
        const { name, value } = e.target
        setError(null)
        setPasswordData({ ...passwordData, [name]: value })
    }

    const navigate = useNavigate()

    const goBack = () => {
        navigate(-1)
    }

    const [passwordChanged, setPasswordChanged] = useState(false)

    const passwordChangeHandler = async () => {
        if (!passwordData.oldpassword || !passwordData.newpassword || !passwordData.confirmpassword) {
            return setError('All filed must be filled')
        }

        if (!validator.isStrongPassword(passwordData.newpassword)) {
            return setError("Password is not strong")
        }

        if (passwordData.newpassword !== passwordData.confirmpassword) {
            return setError('Password did not match')
        }

        if(passwordData.oldpassword === passwordData.newpassword){
            return setError("New password is not same as old password")
        }

        const changeRequestData = {
            email: owner.email,
            oldpassword: passwordData.oldpassword,
            newpassword: passwordData.newpassword
        }


        try {
            setLoading(true)
            const response = await fetch('http://localhost:3300/api/owner/changepassword', {
                headers: {
                    "Content-Type": "application/json"
                },
                method: 'POST',
                body: JSON.stringify(changeRequestData)
            })

            const json = await response.json()

            if (!response.ok) {
                return setError(json.err)
            }

            setPasswordChanged(true)

        } catch (e) {
            setServerError(true)
        }
        finally{
            setLoading(false)
        }
    }

    return (
        <>
            <div className="container">
                <div className='sub-title py-3'>
                    <span onClick={goBack}><TiArrowLeft /></span>
                    <h5 className="text-center m-0">Change password</h5>
                </div>
                {
                    !serverError ? <div className="row px-3 justify-content-center">
                        <div className="col-11">

                            {error && <div className='text-center my-2'>
                                <small className='text-danger'>{error}</small>
                            </div>}
                            <div className="form-employee">
                                <label className="my-2">Old password:</label>
                                <input type="password" name='oldpassword' value={passwordData.oldpassword} onChange={onChangeHandler} className="form-control form-control-sm" placeholder="Enter your old password" />
                                <label className="my-2">New password:</label>
                                <input type="password" name='newpassword' value={passwordData.newpassword} onChange={onChangeHandler} className="form-control form-control-sm" placeholder="Enter new password" />
                                <label className="my-2">Confirm password:</label>
                                <input type="password" name='confirmpassword' value={passwordData.confirmpassword} onChange={onChangeHandler} className="form-control form-control-sm" placeholder="Enter confirm password" />
                                <div className="d-flex justify-content-center my-4">
                                    <button type="submit" className="btn btn-success btn-sm" onClick={passwordChangeHandler}>Save</button>
                                </div>
                            </div>
                        </div>
                    </div> :
                        <div className="something-wrong">
                            <img src={SomethingWrongLogo} alt="" width="60%" />
                            <p>Somthing went wrong..!</p>
                            <button className="btn btn-primary btn-sm" onClick={() => setServerError(false)}>Try Again</button>
                        </div>
                }

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

            <div className={`employee-updated ${!passwordChanged && 'hide'}`}>
                <p>Password has been changed successfully</p>
                <hr />
                <Link to='/'><button className="btn btn-success btn-sm" onClick={() => setPasswordChanged(false)}>Okay</button></Link>
            </div>

            <div className={`overlay ${!passwordChanged && 'hide'}`}></div>
        </>
    )
}
