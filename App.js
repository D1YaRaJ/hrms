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

function Home() {
    return (
        <div>
            <h1>Welcome to the Employee Management System</h1>
            <div>
                <button>
                    <Link to="/add-employee">Add Employee</Link>
                </button>
                <button>
                    <Link to="/view-employees">View Employee Details</Link>
                </button>
                <button>
                    <Link to="/add-salary">Add Salary Details</Link>
                </button>
                <button>
                    <Link to="/view-salary/1">View Salary Details</Link>
                </button>
                <button>
                    <Link to="/view-family">Add Family Details</Link> {/* New button for family details */}
                </button>
                <button>
                    <Link to="/add-family">View Family Details</Link> {/* New button for adding family */}
                </button>
                <button>
                    <Link to="/add-leave">Add Leave</Link> {/* New button for adding family */}
                </button>
                <button>
                    <Link to="/leave">View Leave Details</Link> {/* New button for adding family */}
                </button>
                
                <button>
                    <Link to="/add-payroll">Add Payroll</Link> {/* Button to add payroll */}
                </button>
                <button>
                    <Link to="/view-payroll">View Payroll</Link> {/* Button to view payroll */}
                </button>
                
            </div>
        </div>
    );
}

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/add-employee" element={<AddEmployee />} />
                    <Route path="/view-employees" element={<EmployeeList />} />
                    <Route path="/add-salary" element={<AddSalary />} />
                    <Route path="/view-salary/:eid" element={<Salary />} />
                    <Route path="/add-family" element={<FamilyDetailsForm />} />
                    <Route path="/view-family" element={<ViewFamily />} /> {/* Route for viewing family details */}
                    <Route path="/add-leave" element={<AddLeave />} /> {/* Route for add leave details */}
                    <Route path="/leave" element={<LeaveList />} /> {/* Route for viewing leave details */}
                    <Route path="/add-payroll" element={<AddPayroll />} /> {/* Route for adding payroll */}
                    <Route path="/view-payroll" element={<PayrollList />} /> {/* Route for viewing payroll */}
                {/* Route for adding family */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;