import React, { useState } from 'react';
import axios from 'axios';
import './EmployeeList.css';

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [columns, setColumns] = useState({
    EID: true,
    INITIAL: true,
    FIRSTNAME: true,
    MIDDLENAME: true,
    LASTNAME: true,
    DESIGNATION: true,
    DOB: false,
    DATEOFJOINING: false,
    FTYPE: false,
    NATIONALITY: true,
    PHONE: true,
    EMAIL: true,
    CASTE: false,
    DOORNO: false,
    CITY: true,
    STATE: true,
    PINCODE: true,
    GENDER: true,
    PROFEXP_DESIGNATION: true,
    PPROFEXP_FROM: true,
    PPROFEXP_TO: true,
    LEAVE_ML: true,
    LEAVE_LOP: true,
    LEAVE_RH: true,
    LEAVE_OOD: true,
    LEAVE_CL: true,
    DID:true
  });

  const columnAliases = {
    EID: "Employee ID",
    INITIAL: "Initial",
    FIRSTNAME: "First Name",
    MIDDLENAME: "Middle Name",
    LASTNAME: "Last Name",
    DESIGNATION: "Designation",
    DOB: "Date of Birth",
    DATEOFJOINING: "Date of Joining",
    FTYPE: "Employee Type",
    NATIONALITY: "Nationality",
    PHONE: "Phone",
    EMAIL: "Email",
    CASTE: "Caste",
    DOORNO: "Door No",
    CITY: "City",
    STATE: "State",
    PINCODE: "Pincode",
    GENDER: "Gender",
    PROFEXP_DESIGNATION: "Prof Exp Degn",
    PPROFEXP_FROM: "Prof Exp From",
    PPROFEXP_TO: "Prof Exp To",
    LEAVE_ML: "Leave ML",
    LEAVE_LOP: "Leave LOP",
    LEAVE_RH: "Leave RH",
    LEAVE_OOD: "Leave OOD",
    LEAVE_CL: "Leave CL",
    DID: "Department ID"
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      alert('Failed to fetch employee details');
    }
  };

  const handleDelete = async (eid) => {
    try {
        const response = await axios.delete(`http://localhost:5000/employees/${eid}`);
        if (response.status === 200) {
            setEmployees(employees.filter((employee) => employee.EID !== eid));
            alert('Employee and related records deleted successfully');
        }
    } catch (error) {
        console.error('Error deleting employee:', error);
        alert('Failed to delete employee');
    }
};

  const handleColumnToggle = (column) => {
    setColumns({ ...columns, [column]: !columns[column] });
  };

  return (
    <div>
      <h1>Employee Management</h1>
      <button onClick={fetchEmployees}>View Employees</button>
      <div><h3>Select Columns to Display</h3></div>
      <div className="column-selection">
        {Object.keys(columns).map((col) => (
          <label key={col}>
            <input
              type="checkbox"
              checked={columns[col]}
              onChange={() => handleColumnToggle(col)}
            />
            {columnAliases[col] || col} {/* Display alias name or original if no alias */}
          </label>
        ))}
      </div>

      <table border="1" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            {Object.keys(columns).map(
              (col) =>
                columns[col] && <th key={col}>{columnAliases[col]}</th> // Display alias name
            )}
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.EID}>
              {Object.keys(columns).map(
                (col) =>
                  columns[col] && <td key={col}>{employee[col] || 'N/A'}</td>
              )}
              <td>
                  <button onClick={() => handleDelete(employee.EID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeManagement;
