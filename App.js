import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import AddSalary from './components/Salary';
import Salary from './components/addsalary';
import FamilyDetailsForm from './components/FamilyDetailsForm'; // Importing FamilyDetailsForm component
import ViewFamily from './components/ViewFamily';  // Importing the ViewFamily component
import AddLeave from './components/AddLeave';
import LeaveList from './components/LeaveList';
import AddPayroll from './components/AddPayroll';  // Import AddPayroll component
import PayrollList from './components/PayrollList'; 
import DepartmentList from './components/DepartmentList';
import AddDepartment from './components/AddDepartment';
import AttendanceList from './components/AttendanceList';
import AddAttendance from './components/AddAttendance';
import QualificationForm from './components/QualificationForm';  // Import the QualificationForm component
import ViewQualificationDetails from './components/ViewQualificationDetails';
import EmployeeDetailsForm from './components/EmployeeDetailsForm'; 
import ViewEmployeeAccount from './components/ViewEmployeeAccount'; 
import Login from './components/Login';
import './Navbar.css';
import Navbar from './Navbar'; 
import { Carousel } from 'react-bootstrap'; // Import Carousel from react-bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './App.css'; // 

function Home() {
    return (
        <div>
            <div>
            <Carousel>
                <Carousel.Item interval={3000}>
                    <img
                        className="d-block w-100"
                        src="https://www.sahyadri.edu.in/_next/image?url=%2Fimages%2Fbgs%2Fhero-bg.jpg&w=1920&q=75"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>Welcome to HR Management System</h3>
                        <p>Streamline your HR processes with ease and efficiency</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <img
                        className="d-block w-100"
                        src="https://theacademicinsights.com/wp-content/uploads/2020/02/Sahyadri-Campus.jpg"
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <img
                        className="d-block w-100"
                        src="https://www.sahyadri.edu.in/images/banners/home2.jpg"
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
            </div>
            <h1>Welcome to the Employee Management System</h1>
            <div className="button-container"> {/* Add className */}
                <button>
                    <Link to="/employee">Employee</Link> {/* New button for Employee page */}
                </button>
                <button>
                    <Link to="/department">Department</Link>
                </button>
                <button>
                    <Link to="/attendance">Attendance</Link>
                </button>
                <button>
                    <Link to="/leavepage">Leave</Link>
                </button>
                <button>
                    <Link to="/salary">Salary</Link>
                </button>
            </div>
            <PageFooter/>
        </div>
    );
}

function EmployeePage() {
    return (
        <div>
            <h1>Employee Page</h1>
            <div className="button-container">
                <button>
                    <Link to="/add-employee">Add Employee</Link>
                </button>
                <button>
                    <Link to="/view-employees">View Employee Details</Link>
                </button>
                <button>
                    <Link to="/add-qualification">Add Qualification</Link> {/* Button for QualificationForm */}
                </button>
                <button>
                    <Link to="/view-qualification">View Qualification Details</Link> {/* Button for ViewQualification */}
                </button>
                <button>
                    <Link to="/add-employee-details">Add Employee Details</Link> {/* Button for EmployeeDetailsForm */}
                </button>
                <button>
                    <Link to="/view-employee-account">View Employee Account</Link> {/* Button for ViewEmployeeAccount */}
                </button>
                <button>
                    <Link to="/add-family">Add Family Details</Link> {/* New button for family details */}
                </button>
                <button>
                    <Link to="/view-family">View Family Details</Link> {/* New button for adding family */}
                </button>
            </div>
            <FixedFooter/>
        </div>
    );
}

function DepartmentPage() {
    return (
        <div>
            <h1>Department Page</h1>
            <div className='button-container'>
                <button>
                    <Link to="/add-department">Add Department</Link>
                </button>
                <button>
                    <Link to="/view-departments">View Department Details</Link>
                </button>
            </div>
            <FixedFooter/>
        </div>
    );
}

function AttendancePage() {
    return (
        <div>
            <h1>Attendance Page</h1>
            <div className='button-container'>
                <button>
                    <Link to="/add-attendance">Add Attendance</Link>
                </button>
                <button>
                    <Link to="/view-attendance">View Attendance Records</Link>
                </button>
            </div>
            <FixedFooter/>
        </div>
    );
}

function LeavePage() {
    return (
        <div>
            <h1>Leave Page</h1>
            <div className='button-container'>
            <button>
                    <Link to="/add-leave">Add Leave</Link> {/* New button for adding family */}
                </button>
                <button>
                    <Link to="/leave">View Leave Details</Link> {/* New button for adding family */}
                </button>
            </div>
            <FixedFooter/>
        </div>
    );
}

function SalaryPage() {
    return (
        <div>
            <h1>Salary Page</h1>
            <div className='button-container'>
            <button>
                    <Link to="/add-salary">Add Salary Details</Link>
                </button>
                <button>
                    <Link to="/view-salary/1">View Salary Details</Link>
                </button>
                <button>
                    <Link to="/add-payroll">Add Payroll</Link> {/* Button to add payroll */}
                </button>
                <button>
                    <Link to="/view-payroll">View Payroll</Link> {/* Button to view payroll */}
                </button>
            </div>
            <FixedFooter/>
        </div>
    );
}


function App() {
    return (
        <Router>
            <div>
            <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/employee" element={<EmployeePage />} /> {/* Add route for EmployeePage */}
                    <Route path="/department" element={<DepartmentPage />} />
                    <Route path="/attendance" element={<AttendancePage />} />
                    <Route path="/salary" element={<SalaryPage />} />
                    <Route path="/leavepage" element={<LeavePage />} />
                    <Route path="/add-employee" element={<AddEmployee />} />
                    <Route path="/view-employees" element={<EmployeeList />} />
                    <Route path="/add-qualification" element={<QualificationForm />} /> {/* Add route for QualificationForm */}
                    <Route path="/view-qualification" element={<ViewQualificationDetails />} />
                    <Route path="/add-employee-details" element={<EmployeeDetailsForm />} /> {/* Add route for EmployeeDetailsForm */}
                    <Route path="/view-employee-account" element={<ViewEmployeeAccount />} />
                    <Route path="/add-department" element={<AddDepartment />} />
                    <Route path="/view-departments" element={<DepartmentList />} />
                    <Route path="/add-attendance" element={<AddAttendance />} />
                    <Route path="/view-attendance" element={<AttendanceList />} />
                    <Route path="/add-salary" element={<AddSalary />} />
                    <Route path="/view-salary/:eid" element={<Salary />} />
                    <Route path="/add-family" element={<FamilyDetailsForm />} />
                    <Route path="/view-family" element={<ViewFamily />} /> {/* Route for viewing family details */}
                    <Route path="/add-leave" element={<AddLeave />} /> {/* Route for add leave details */}
                    <Route path="/leave" element={<LeaveList />} /> {/* Route for viewing leave details */}
                    <Route path="/add-payroll" element={<AddPayroll />} /> {/* Route for adding payroll */}
                    <Route path="/view-payroll" element={<PayrollList />} /> {/* Route for viewing payroll */}
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        </Router>
    );
}

function FixedFooter() {
    return (
        <footer className="fixed-footer">
            <p>&copy; {new Date().getFullYear()} HR Management System. All Rights Reserved.</p>
        </footer>
    );
}

function PageFooter() {
    return (
        <footer className="page-footer">
            <p>&copy; {new Date().getFullYear()} HR Management System. All Rights Reserved.</p>
        </footer>
    );
}


export default App;
