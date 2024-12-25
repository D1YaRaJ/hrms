import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DepartmentList.css';

const DepartmentManagement = () => {
  const [departments, setDepartments] = useState([]);
  const [columns, setColumns] = useState({
    DID: true,
    DNAME: true,
    DHEAD: true,
  });

  const columnAliases = {
    DID: "Department ID",
    DNAME: "Department Name",
    DHEAD: "Department Head",
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/departmentS');
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
      alert('Failed to fetch department details');
    }
  };

  const handleColumnToggle = (column) => {
    setColumns({ ...columns, [column]: !columns[column] });
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <div>
      <h1>Department Management</h1>
      <button onClick={fetchDepartments}>View Departments</button>

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
          {departments.map((department) => (
            <tr key={department.DID}>
              {Object.keys(columns).map(
                (col) =>
                  columns[col] && <td key={col}>{department[col] || 'N/A'}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentManagement;