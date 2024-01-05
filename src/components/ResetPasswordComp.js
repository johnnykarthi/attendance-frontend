import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import validator from 'validator'
export default function ResetPasswordComp() {

    const {id} = useParams()

    const [passwordData,setPasswordData] = useState({
        newPassword:'',
        confirmPassword:''
    })

    const [passwordChanged,setPasswordChanged]  = useState(false)

    const [error,setError] = useState(null)
    const [loading, setLoading] = useState(false)


    const onChangeHandler = (e)=>{
        const {name,value} = e.target
        setError(null)
        setPasswordData({...passwordData,[name]:value})

    }

    const submitHandler = async()=>{
        if(!passwordData.newPassword || !passwordData.confirmPassword){
            return setError("All filed must be filed")
        }
        if(passwordData.newPassword !== passwordData.confirmPassword){
            return setError('Password must be match')
        }

        if(!validator.isStrongPassword(passwordData.newPassword)){
            return setError("Password is not strong")
        }

        try{
            setLoading(true)
            const response = await fetch(`http://localhost:3300/api/owner/reset-password/${id}`, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: 'POST',
                body: JSON.stringify({ password:passwordData.newPassword })
            })

            const json = await response.json()
            if(!response.ok){
                return setError(json.err)
            }

            setPasswordChanged(true)

        }catch(e){
            setError('Something went wrong. Try again..!')
        }finally{
            setLoading(false)
        }


    }
  

    return (
        <>
            <div className="main-background">
                <div className="loginpage">
                    <h4 className="head-title">Attendance Data</h4>
                    <div className="login-box">
                        <div className="form-group">
                            <h5 className="mb-4 text-center">Create new password</h5>
                            {error && <div className='text-center my-2'>
                            <small className='text-danger'>{error}</small>
                        </div>}
                            <div>
                                <p className="mb-2">New password</p>
                                <input type="password" name='newPassword' value={passwordData.newPassword} onChange={onChangeHandler} className="form-control form-control-sm mb-2" placeholder="Enter new password" />
                                <p className="mb-2">Confirm password</p>
                                <input type="password" name='confirmPassword' value={passwordData.confirmPassword} onChange={onChangeHandler} className="form-control form-control-sm mb-2" placeholder="Enter confirm password" />
                                <div className="text-center mt-3">
                                   
                                    <button className="btn btn-primary btn-sm" onClick={submitHandler}>Save</button>
                                </div>
                            </div>
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

            <div className={`employee-updated ${!passwordChanged && 'hide'}`}>
                <p>Password changed successfully</p>
                <hr />
                <Link to='/login'> <button className="okay-btn btn-style">Login</button></Link>
            </div>
            <div className={`overlay ${!passwordChanged && 'hide'}`}></div>

        </>
    )
}
