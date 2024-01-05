
import { Link } from 'react-router-dom'

export default function HomeComponent() {
    return (
        <div className="container">
            <div className="row py-4 justify-content-center">
                <div className="col-6 mb-3">
                    <div className="create-employee box ">
                        <div>
                            <p className='link-style'><Link to='/new'><i className="bi bi-plus-square"></i> Add Employee</Link></p>
                        </div>
                    </div>
                </div>
                <div className="col-6 mb-2">
                    <div className="attendance box">
                        <div>
                            <p className='link-style'><Link to='/attendance'><i className="bi bi-check-square"></i> Mark Attendance</Link></p>
                        </div>
                    </div>
                </div>
                <div className="col-6 mb-2">
                    <div className="view-employee box">
                        <div>
                            <p className='link-style'><Link to='/view'><i className="bi bi-people"></i>  View Employee</Link></p>
                        </div>
                    </div>
                </div>
                <div className="col-6 mb-2">
                    <div className="report box">
                        <div>
                            <p className='link-style'><Link to='/report'><i className="bi bi-file-text"></i> Report</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
