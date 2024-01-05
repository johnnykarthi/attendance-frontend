import React, { useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Employee } from '../context/EmployeeContext';
import { TiArrowLeft } from "react-icons/ti";



export default function ViewEmployeeDetails() {
    const { id } = useParams()
    const { emp } = useContext(Employee)
    const employeeDetail = emp.find((emps) => emps._id === id);
    const navigate = useNavigate()
    const goBack = () => {
        navigate(-1) // Go back to the previous page
    };

    return (
        <div className="container">
            <div className='sub-title py-3'>
                <span onClick={goBack}><TiArrowLeft /></span>
                <h5 className="text-center m-0">Employee Details</h5>
            </div>
            <div className="row px-4 justify-content-center">
                <div className="col-12">
                    <table className="table table-sm">
                        <tbody>
                            <tr>
                                <th scope="row">Name</th>
                                <td>{employeeDetail.employeeName}</td>
                            </tr>
                            <tr>
                                <th scope="row">Email</th>
                                <td>{employeeDetail.email}</td>
                            </tr>
                            <tr>
                                <th scope="row">Mobile</th>
                                <td>{employeeDetail.mobile}</td>
                            </tr>
                            <tr>
                                <th scope="row">Role</th>
                                <td>{employeeDetail.role}</td>
                            </tr>
                            <tr>
                                <th scope="row">Dept</th>
                                <td>{employeeDetail.dept ? employeeDetail.dept : '-'}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='d-flex justify-content-center'>
                        <Link to={`/edit/${employeeDetail._id}`}><button className="btn btn-primary btn-sm">Edit</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
