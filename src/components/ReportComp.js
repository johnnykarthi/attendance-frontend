import React, { useContext, useState } from 'react'
import { Employee } from '../context/EmployeeContext';
import { useNavigate } from 'react-router-dom';
import { TiArrowLeft } from "react-icons/ti";

export default function ReportComp() {
    const { emp } = useContext(Employee)
    const employees = emp;
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [report, setReport] = useState(null);
    const [total, setTotal] = useState(0);
    const [hideEmployee,setHideEmployee] = useState(false)
    const [correctDate, setCorrectDate] = useState(false)

    const calculateNumberofDays = (start, end, dates) => {
        const tempStart = new Date(start);
        const tempEnd = new Date(end);

        const filtered = dates.filter(date => {
            const currentDate = new Date(date)
            return tempStart <= currentDate && tempEnd >= currentDate;
        })
        return filtered.length
    }

    const updateTotal = (dummy) => {
        let totals = 0;
        for (let i = 0; i < dummy.length; i++) {
            let salary = dummy[i].salary;
            totals = totals + salary;
        }
        setTotal(totals)
    }

    const calculateSalary = (workdays, role) => {
        switch (role) {
            case 'PAT':
                return (100 * workdays)
            case 'PA':
                return (200 * workdays)
            case 'A':
                return (300 * workdays)
            case 'SA':
                return (400 * workdays)
            case 'M':
                return (500 * workdays)
            default:
                return 0
        }

    }

    const generateReport = () => {
        if(employees.length === 0)
            return setHideEmployee(true)
        if (!(fromDate < toDate))
            return setCorrectDate(true)
        const dummy = [];
        for (let i = 0; i < employees.length; i++) {
            const empName = employees[i].employeeName
            const workdays = calculateNumberofDays(fromDate, toDate, employees[i].workDates)
            const salary = calculateSalary(workdays, employees[i].role)
            dummy.push({ empName, workdays, salary })
        }
        setReport(dummy);
        if (dummy.length !== 0) {
            updateTotal(dummy);
        }
    }

    const hideNoEmployees = ()=>{
            setHideEmployee(false)
            setFromDate(null)
            setToDate(null)
    }       

    const correctDateHandler = () => {
        setCorrectDate(false)
        setFromDate(null)
        setToDate(null)
    }

    const navigate = useNavigate()

    const goBack = () => {
        navigate(-1) 
     }

    return (
        <>
            <div className="container">
            <div className='sub-title py-3'>
                <span onClick={goBack}><TiArrowLeft /></span>
                <h5 className="text-center m-0">Employee Report</h5>
            </div>
                <div className="row py-3 justify-content-center">
                    <div className="col-md-6">
                        <div>
                            <div className="row g-0 justify-content-center align-items-center">
                                <div className="col-4">
                                    <input type="date" name="" id="" className="form-control form-control-sm" onChange={(e) => setFromDate(e.target.value)} />
                                </div>
                                <div className="col-2 text-center">
                                    <span>to</span>
                                </div>
                                <div className="col-4">
                                    <input type="date" name="" id="" className="form-control form-control-sm" onChange={(e) => setToDate(e.target.value)} />
                                </div>
                            </div>
                            <div className="d-flex justify-content-center mt-4">
                                <button className="btn btn-primary btn-sm" onClick={generateReport} disabled={!(fromDate && toDate)}>Generate</button>
                            </div>
                        </div>
                        {report ? <div className="table-container">
                            <table className="table table-sm">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Days</th>
                                        <th scope="col">Salary</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        report.map((employeeReport, i) => (
                                            <tr key={i}>
                                                <th scope="row">{i + 1}</th>
                                                <td> {employeeReport.empName}</td>
                                                <td>{employeeReport.workdays}</td>
                                                <td>{employeeReport.salary}</td>
                                            </tr>
                                        )
                                        )
                                    }

                                </tbody>
                            </table>
                            <div className="total-box">
                                <p className="total">Total Amount: {total}</p>
                            </div>
                        </div> :
                            <>
                                <div className={`employee-updated ${hideEmployee ? '':'hide'}`}>
                                    <p>Couldn't generate report because there is no employees</p>
                                    <hr />
                                    <button className="okay-btn btn-style" onClick={hideNoEmployees}>Okay</button>
                                </div>
                                <div className={`overlay ${hideEmployee ? '' : 'hide'}`}></div>
                            </>
                        }
                    </div>
                </div>
                <div className={`employee-updated ${correctDate ? '' : 'hide'}`}>
                    <p>To-date must be greater than From-date</p>
                    <hr />
                    <button className="okay-btn btn-style" onClick={correctDateHandler}>Okay</button>
                </div>
                <div className={`overlay ${correctDate ? '' : 'hide'}`}></div>
            </div>
        </>
    )
}
