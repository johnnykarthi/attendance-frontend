import React, { useContext, useState } from 'react'
import { Employee } from '../context/EmployeeContext'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { TiArrowLeft } from "react-icons/ti";

import SomethingWrongLogo from '../img/error.png';

export default function ViewEmployeeComp() {
    const { emp, dispatch } = useContext(Employee)
    const [deleteEmployee, setDeleteEmployee] = useState(null)
    const [serverError, setServerError] = useState(false)
    const { owner } = useContext(AuthContext)

    const [loading,setLoading] = useState(false)
    const [deleteEmployeeSuccessfull,setDeleteEmployeeSuccessfull] = useState(false)

    const navigate = useNavigate()

    const goBack = () => {
        navigate(-1) // Go back to the previous page
    };

    const deleteEmployeeHandler = async () => {

        //* Sever Code here
        setDeleteEmployee(null)
        try {
            setLoading(true)
            const response = await fetch(`https://attendance-server-api.onrender.com/api/employee/${deleteEmployee._id}`, {
                headers: {
                    "Authorization": `Bearer ${owner.token}`
                },
                method: 'DELETE',
            })
            if (response.ok) {
                const dummy = [...emp]
                const index = dummy.findIndex((employeesd) => employeesd._id === deleteEmployee._id)
                dummy.splice(index, 1)
                setDeleteEmployeeSuccessfull(true)
                dispatch({ type: 'DELETE_EMPLOYEE', payload: dummy })
            }
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
            <div className="container">
                <div className='sub-title py-3'>
                    <span onClick={goBack}><TiArrowLeft /></span>
                    <h5 className="text-center m-0">Employee List</h5>
                </div>
                {
                    !(serverError || emp === null) ? <div className={`row ${!(emp.length === 0) ? 'py-3' : ''} justify-content-center`}>
                        <div className="col-11">
                            {
                                !(emp.length === 0) ? <>
                                    <table className="table table-sm">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Name</th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                emp.map((employee, i) => {
                                                    return (
                                                        <tr key={employee._id}>
                                                            <th scope="row">{i + 1}</th>
                                                            <td> {employee.employeeName}</td>
                                                            <td className="text-center view-btn"><Link to={employee._id}><i className="bi bi-eye-fill"></i></Link></td>
                                                            <td className="text-center delete-btn"><i className="bi bi-trash3" onClick={() => setDeleteEmployee(employee)}></i></td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>

                                </> : <>
                                    <div className='text-center m-3'>There is no Employees</div>
                                    <div className='d-flex justify-content-center'>
                                        <Link to='/new'><button className="btn btn-primary me-3 btn-sm">Add new one</button></Link>
                                    </div>
                                </>
                            }

                        </div>
                    </div> :
                        <div className="something-wrong">
                            <img src={SomethingWrongLogo} alt="" width="60%" />
                            <p>Somthing went wrong..!</p>
                            <button className="btn btn-primary btn-sm" onClick={() => setServerError(false)}>Try Again</button>
                        </div>
                }


                <div className={`${!deleteEmployeeSuccessfull && 'hide'}`}>
                    <div className={`employee-updated`}>
                        <p>Employee has been deleted successfully</p>
                        <hr />
                        <button className="btn btn-success btn-sm" onClick={() => setDeleteEmployeeSuccessfull(false)}>Okay</button>
                    </div>
                    <div className={`overlay`}></div>
                </div>

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

                <div className={`employee-updated ${deleteEmployee ? '' : 'hide'}`}>
                    <p>Are you sure you want to delete?</p>
                    <h6 className="pt-2">"{deleteEmployee?.employeeName}"</h6>
                    <hr />
                    <div className="d-flex justify-content-evenly">
                        <button className="no-btn btn-style" onClick={deleteEmployeeHandler}>Yes</button>
                        <button className="yes-btn btn-style" onClick={() => setDeleteEmployee(null)}>No</button>
                    </div>
                </div>
                <div className={`overlay ${deleteEmployee ? '' : 'hide'}`}></div>
            </div>
        </>
    )
}
