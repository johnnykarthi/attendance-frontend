import React, { useContext, useEffect, useState } from 'react'
import { Employee } from '../context/EmployeeContext';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { TiArrowLeft } from "react-icons/ti";

import SomethingWrongLogo from '../img/error.png';

export default function AttendanceComp() {
    const { emp, dispatch } = useContext(Employee);
    const { owner } = useContext(AuthContext)
    const [employees, setEmployees] = useState(emp);
    const [weekDates, setWeekDates] = useState([]);
    const [weekOffset, setWeekOffset] = useState(0);
    const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const [attendanceSaved, setAttendanceSaved] = useState(false);
    const [serverError, setServerError] = useState(false)
    const [loading, setLoading] = useState(false)

    const previousDateChange = () => {
        setWeekOffset(prev => prev - 1)
    }

    const nextDateChange = () => {
        setWeekOffset(prev => prev + 1)
    }

    const onChangeHandler = (emp, date) => {
        const dummy = [...employees];
        const updateEmployeeWorkDate = [...emp.workDates]
        if (updateEmployeeWorkDate.includes(date)) {
            const index = updateEmployeeWorkDate.indexOf(date)
            updateEmployeeWorkDate.splice(index, 1);
        }
        else {
            updateEmployeeWorkDate.push(date)
        }
        const indexObject = dummy.findIndex((employee) => emp.employeeName === employee.employeeName)
        dummy[indexObject].workDates = updateEmployeeWorkDate;
        setEmployees(dummy);
    }





    useEffect(() => {
        const getCurrentWeekDates = (offset) => {
            const today = new Date();
            const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + offset * 7 + 1);
            const dates = [];

            for (let i = 0; i < 6; i++) {
                const date = new Date(startOfWeek);
                date.setDate(startOfWeek.getDate() + i);
                dates.push(date.toDateString())
            }
            return dates;
        };
        const currentWeekDays = getCurrentWeekDates(weekOffset);
        setWeekDates(currentWeekDays);
    }, [weekOffset])


    const saveAttendanceHandler = async () => {
        // Sever code here

        try {
            setLoading(true)
            const response = await fetch(`http://localhost:3300/api/employee/saveWorkDates`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${owner.token}`
                },
                method: 'POST',
                body: JSON.stringify(employees)
            })

            if (response.ok) {
                dispatch({ type: 'SAVE_ATTENDANCE', payload: employees })
                setAttendanceSaved(true);
            }
        }
        catch (e) {
            setServerError(true)
        }
        finally {
            setLoading(false)
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
                <h5 className="text-center m-0">Attendance Details</h5>
            </div>
            {!(serverError || emp === null) ?
                <>
                    {!(emp.length === 0) ? <div className="row py-2 justify-content-center  g-0">
                        <div className="col-md-10">
                            <div className="text-center mb-2">
                                <p className="head-month">{`${new Date(weekDates[0]).toLocaleString('default', { month: 'long' })} ${new Date(weekDates[0]).getFullYear()}`}</p>
                            </div>
                            <div className="date-header mb-3">
                                <div className="row align-items-center g-0">
                                    <div className="col-1 text-center">
                                        <span onClick={previousDateChange}><i className="bi bi-arrow-left-square"></i></span>
                                    </div>
                                    <div className="col-10">
                                        <div className="row g-0  align-items-center">
                                            <div className="col-4 ">
                                                <p className="head-employee ps-1">Employee Name</p>
                                            </div>
                                            <div className="col-8 text-center">
                                                <div className="row g-0">
                                                    {weekDates.map((date, index) => (
                                                        <div className="col-2" key={index}>
                                                            <div className="date-box">
                                                                <p className="small">{weekdays[new Date(date).getDay() - 1]}</p>
                                                                <p>{new Date(date).getDate()}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-1 text-center">
                                        <span onClick={nextDateChange}><i className="bi bi-arrow-right-square"></i></span>
                                    </div>
                                </div>
                            </div>
                            {
                                employees.map((employee, i) => (
                                    <div key={i} className="employee-row">
                                        <div className="row justify-content-center g-0">
                                            <div className="col-10">
                                                <div className="row mb-2 g-0  align-items-center">
                                                    <div className="col-4 ">
                                                        <p className="employee-name ps-1">{employee.employeeName}</p>
                                                    </div>
                                                    <div className="col-8 text-center">
                                                        <div className="row g-0">
                                                            {
                                                                weekDates.map((weekdate, index) => (
                                                                    <div className="col-2" key={index}>
                                                                        <div className="checkbox">
                                                                            <input type="checkbox" className="form-check-input checkbox-size" onChange={() => onChangeHandler(employee, weekdate)} checked={employee.workDates.includes(weekdate)} />
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                ))
                            }
                            <div className="text-center">
                                <button className="btn btn-primary btn-sm mt-3" onClick={saveAttendanceHandler} >Save</button>
                            </div>
                        </div>
                    </div>
                        : <>
                            <div className='text-center m-3'>There is no Employees</div>
                            <div className='d-flex justify-content-center'>
                                <Link to='/new'><button className="btn btn-primary me-3 btn-sm">Add new one</button></Link>
                            </div>
                        </>}
                </>
                :
                <div className="something-wrong">
                    <img src={SomethingWrongLogo} alt="" width="60%" />
                    <p>Somthing went wrong..!</p>
                    <button className="btn btn-primary btn-sm" onClick={() => setServerError(false)}>Try Again</button>
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


            <div className={`employee-updated ${attendanceSaved ? '' : 'hide'}`}>
                <p>Attendance has been Saved</p>
                <hr />
                <button className="okay-btn btn-style" onClick={() => setAttendanceSaved(false)}>Okay</button>
            </div>
            <div className={`overlay ${attendanceSaved ? '' : 'hide'}`}></div>
        </div>

    )
}
