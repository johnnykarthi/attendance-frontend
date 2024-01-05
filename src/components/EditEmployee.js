import React, { useContext, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { Employee } from '../context/EmployeeContext';
import { AuthContext } from '../context/AuthContext';
import { TiArrowLeft } from "react-icons/ti";

import SomethingWrongLogo from '../img/error.png';


export default function EditEmployee() {

    const { id } = useParams();
    const { emp, dispatch } = useContext(Employee)
    const {owner} = useContext(AuthContext)
    const employeeDetail = emp.find((emps) => emps._id === id);
    const [employeeName, setEmployeeName] = useState(employeeDetail.employeeName);
    const [mobile, setMobile] = useState(employeeDetail.mobile);
    const [email, setEmail] = useState(employeeDetail.email);
    const [role, setRole] = useState(employeeDetail.role);
    const [dept, setDept] = useState(employeeDetail.dept);
    const [employeeSaved, setEmployeeSaved] = useState(false)
    const [loading,setLoading] = useState(false)
    const [severError,setServerError] = useState(false)


    const saveHandler = async (e) => {
        e.preventDefault()
        const dummtData = {
            employeeName,
            mobile,
            email,
            role,
            dept
        }
        try {
            setLoading(true)
            const response = await fetch(`http://localhost:3300/api/employee/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${owner.token}`
                },
                method: 'PATCH',
                body: JSON.stringify(dummtData)
            })

            if (response.ok) {
                const demo = [...emp];
                const index = demo.findIndex((emps) => emps._id === id);
                demo[index].employeeName = employeeName;
                demo[index].mobile = mobile;
                demo[index].email = email;
                demo[index].role = role;
                demo[index].dept = dept;
                dispatch({ type: 'UPDATE_EMPLOYEE', payload: demo })
                setEmployeeSaved(true)
            }
        }
        catch(e){
            setServerError(true)
        }
        finally{
            setLoading(false)
        }
    }

    const navigate = useNavigate()

    const goBack = () => {
        navigate(-1) // Go back to the previous page
    };




    return (
        <div className="container">
            <div className='sub-title py-3'>
                <span onClick={goBack}><TiArrowLeft /></span>
                <h5 className="text-center m-0">Edit Employee</h5>
            </div>
            {severError ? <div class="something-wrong">
                <img src={SomethingWrongLogo} alt="" width="60%" />
                <p>Somthing went wrong..!</p>
                <button class="btn btn-primary btn-sm" onClick={()=>setServerError(false)}>Try Again</button>
            </div> :
            <div className="row py-3 px-4 justify-content-center">
            <div className="col-md-6">
                <div className="form-employee">
                    <label htmlFor="" className='mb-2'>Employee Name:</label>
                    <input type="text" value={employeeName} className="form-control form-control-sm mb-3" placeholder="Johnny Karthick" onChange={(e) => setEmployeeName(e.target.value)} required />
                    <label htmlFor="" className='mb-2'>Mobile:</label>
                    <input type="number" value={mobile} className="form-control form-control-sm mb-3" placeholder="9876543210" onChange={(e) => setMobile(e.target.value)} required />
                    <label htmlFor="" className='mb-2'>Email:</label>
                    <input type="email" value={email} className="form-control form-control-sm mb-3" placeholder="johnny@gmail.com" onChange={(e) => setEmail(e.target.value)} required />
                    <label htmlFor="" className='mb-2'>Dept:</label>
                    <input type="number" value={dept} className="form-control form-control-sm mb-3" placeholder="1000" onChange={(e) => setDept(e.target.value)} />
                    <label htmlFor="" className='mb-2'>Role:</label>
                    <select name="" id="" value={role} className="form-select form-select-sm mb-3" onChange={(e) => setRole(e.target.value)} required>
                        <option value="">Select Role</option>
                        <option value="PAT">PAT</option>
                        <option value="PA">PA</option>
                        <option value="A">A</option>
                        <option value="SA">SA</option>
                        <option value="M">M</option>
                    </select>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-success btn-sm" onClick={saveHandler}>Save</button>
                    </div>

                </div>
            </div>
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

            <div className={`employee-updated ${employeeSaved ? '' : 'hide'}`}>
                <p>Employee Details has been Updated</p>
                <hr />
                <button className="okay-btn btn-style" onClick={() => { setEmployeeSaved(false); goBack() }}>Okay</button>
            </div>

            <div className={`overlay ${employeeSaved ? '' : 'hide'}`}></div>
        </div>
    )
}
