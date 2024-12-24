import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './addsalary.css';

const Salary = () => {
  const [salaries, setSalaries] = useState([]);
  const [columns, setColumns] = useState({
    EID: true,
    BASIC_SAL: true,
    AGP: true,
    ESI: true,
    LOAN: true,
    IT: true,
    VIEW: true, // Added VIEW column toggle
  });

  const columnAliases = {
    EID: "Employee ID",
    BASIC_SAL: "Basic Salary",
    AGP: "AGP",
    ESI: "ESI",
    LOAN: "Loan",
    IT: "Income Tax",
    VIEW: "Actions", // Alias for the VIEW column
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  const fetchSalaries = async () => {
    try {
      const response = await axios.get('http://localhost:5000/salaries'); // API endpoint for all salaries
      setSalaries(response.data);
    } catch (error) {
      console.error('Error fetching salaries:', error);
      alert('Failed to fetch salary details');
    }
  };

  const handleViewSalary = async (eid) => {
    try {
      const response = await axios.get(`http://localhost:5000/salaries/${eid}`);
      alert(JSON.stringify(response.data[0], null, 2)); // Display details in an alert or customize as needed
    } catch (error) {
      console.error('Error fetching salary details for EID:', error);
      alert('Failed to fetch details for the selected employee');
    }
  };

  const handleColumnToggle = (column) => {
    setColumns({ ...columns, [column]: !columns[column] });
  };

  return (
    <div className="salary-management">
      <h1>Salary Management</h1>

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

      <table border="1" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            {Object.keys(columns).map(
              (col) =>
                columns[col] && <th key={col}>{columnAliases[col]}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {salaries.map((salary) => (
            <tr key={salary.EID}>
              {Object.keys(columns).map((col) => {
                if (!columns[col]) return null;

                if (col === "VIEW") {
                  return (
                    <td key={col}>
                      <button
                        onClick={() => handleViewSalary(salary.EID)}
                        style={{ cursor: 'pointer' }}
                      >
                        View
                      </button>
                    </td>
                  );
                }

                return <td key={col}>{salary[col] || 'N/A'}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Salary;
