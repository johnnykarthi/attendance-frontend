import React, { useContext, useState } from 'react'
import { Employee } from '../context/EmployeeContext';
import { AuthContext } from '../context/AuthContext';
import { TiArrowLeft } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import SomethingWrongLogo from '../img/error.png';

export default function AddEmployee() {
    const [addEmployeeStatus, setAddEmployeeStatus] = useState(false);
    const { owner } = useContext(AuthContext)
    const [addEmployeeDetails, setAddEmployeeDetails] = useState({
        employeeName: '',
        mobile: '',
        email: '',
        dept: '',
        role: ''
    })

    const { emp, dispatch } = useContext(Employee)
    const [serverError, setServerError] = useState(false)
    const [error, setError] = useState(null)

    const [loading,setLoading] = useState(false)

    const onChangeHandler = (e) => {
        setError(null)
        const { name, value } = e.target
        setAddEmployeeDetails({
            ...addEmployeeDetails,
            [name]: value
        })
    }

    const addEmployeeHandler = async (e) => {
        e.preventDefault();
        if (!addEmployeeDetails.employeeName || !addEmployeeDetails.email || !addEmployeeDetails.mobile || !addEmployeeDetails.dept || !addEmployeeDetails.role) {
            return setError("All field must be filled")
        }

        if(!validator.isEmail(addEmployeeDetails.email)){
            return setError('Invalid Email')
        }

        if(!(addEmployeeDetails.mobile.length === 10)){
            return setError('Invalid mobile number')
        }

        try {
            setLoading(true)
            const response = await fetch('https://attendance-server-api.onrender.com/api/employee', {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${owner.token}`
                },
                method: 'POST',
                body: JSON.stringify(addEmployeeDetails)
            })
            if (response.ok) {
                const json = await response.json()
                const dummy = [json.response, ...emp]

                dispatch({ type: 'ADD_EMPLOYEE', payload: dummy })

                setAddEmployeeDetails({
                    employeeName: '',
                    mobile: '',
                    email: '',
                    dept: '',
                    role: ''
                })
                setLoading(false)
                setAddEmployeeStatus(true)
            }

        }
        catch (e) {
            setLoading(false)
            setServerError(true)
        }
        
    }
    const navigate = useNavigate()

    const goBack = () => {
        navigate(-1)
    };
    return (
        <div className="container">
            <div className='sub-title py-3'>
                <span onClick={goBack}><TiArrowLeft /></span>
                <h5 className="text-center m-0">Add Employee</h5>
            </div>
            {error && <div className='text-center my-2'>
                <small className='text-danger'>{error}</small>
            </div>}
            {
                !serverError ? <div className="row px-4 py-3 justify-content-center">
                    <div className="col-md-6">
                        <div className="form-employee">
                            <form action="">
                                <label htmlFor="" className='mb-2'>Employee Name:</label>
                                <input type="text" value={addEmployeeDetails.employeeName} className="form-control form-control-sm mb-3" placeholder="Johnny Karthick" name='employeeName' onChange={onChangeHandler} required />
                                <label htmlFor="" className='mb-2'>Mobile:</label>
                                <input type="number" value={addEmployeeDetails.mobile} className="form-control form-control-sm mb-3" placeholder="9876543210" minLength='10' name='mobile' onChange={onChangeHandler} required />
                                <label htmlFor="" className='mb-2'>Email:</label>
                                <input type="email" value={addEmployeeDetails.email} className="form-control form-control-sm mb-3" placeholder="johnny@gmail.com*" name='email' onChange={onChangeHandler} required />
                                <label htmlFor="" className='mb-2'>Dept:</label>
                                <input type="number" value={addEmployeeDetails.dept} className="form-control form-control-sm mb-3" placeholder="1000" name='dept' onChange={onChangeHandler} />
                                <label htmlFor="" className='mb-2'>Role:</label>
                                <select className="form-select form-select-sm mb-4" onChange={onChangeHandler} name='role' value={addEmployeeDetails.role} required>
                                    <option value="">Select Role</option>
                                    <option value="PAT">PAT</option>
                                    <option value="PA">PA</option>
                                    <option value="A">A</option>
                                    <option value="SA">SA</option>
                                    <option value="M">M</option>
                                </select>
                                <div className="d-flex justify-content-center ">
                                    <button type="submit" className="btn btn-success btn-sm" onClick={addEmployeeHandler}>Add Employee</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div> :
                    <div className="something-wrong">
                        <img src={SomethingWrongLogo} alt="" width="60%" />
                        <p>Somthing went wrong..!</p>
                        <button className="btn btn-primary btn-sm" onClick={() => setServerError(false)}>Try Again</button>
                    </div>
            }

            <div className={`${!loading && 'hide' }`}>
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




            <div className={`employee-updated  ${addEmployeeStatus ? '' : 'hide'}`}>
                <p>Employee has been Added</p>
                <hr />
                <button className="okay-btn btn-style" onClick={() => setAddEmployeeStatus(false)}>Okay</button>
            </div>

            <div className={`overlay ${addEmployeeStatus ? '' : 'hide'}`}></div>
        </div>
    )
}
