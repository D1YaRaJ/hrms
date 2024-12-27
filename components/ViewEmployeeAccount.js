import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewEmployeeAccount.css';

const ViewEmployeeAccount = () => {
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [columns, setColumns] = useState({
    EID: true,
    BIOMETRIC_CARD_NO: true,
    AADHAR: true,
    BANK_ACC: true,
    PAN: true,
  });

  const columnAliases = {
    EID: "Employee ID",
    BIOMETRIC_CARD_NO: "Biometric Card No",
    AADHAR: "Aadhar Number",
    BANK_ACC: "Bank Account Number",
    PAN: "PAN Number",
  };

  const fetchEmployeeDetails = async () => {
    try {
      const response = await axios.get('http://localhost:5000/employee-accounts');
      setEmployeeDetails(response.data);
    } catch (error) {
      console.error('Error fetching employee details:', error);
      alert('Failed to fetch employee details');
    }
  };

  const handleColumnToggle = (column) => {
    setColumns({ ...columns, [column]: !columns[column] });
  };

  useEffect(() => {
    fetchEmployeeDetails();
  }, []);

  return (
    <div>
      <h1>Employee Account Details</h1>
      <div className="column-selection">
        <h3>Select Columns to Display</h3>
        {Object.keys(columns).map((col) => (
          <label key={col}>
            <input
              type="checkbox"
              checked={columns[col]}
              onChange={() => handleColumnToggle(col)}
            />
            {columnAliases[col] || col}
          </label>
        ))}
      </div>

      <table>
        <thead>
          <tr>
            {Object.keys(columns).map(
              (col) => columns[col] && <th key={col}>{columnAliases[col]}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {employeeDetails.map((employee, index) => (
            <tr key={index}>
              {Object.keys(columns).map(
                (col) => columns[col] && <td key={col}>{employee[col] || 'N/A'}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewEmployeeAccount;