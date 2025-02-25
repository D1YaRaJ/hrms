import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './addsalary.css';

const Salary = () => {
  const [salaries, setSalaries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [columns, setColumns] = useState({
    EID: true,
    BASIC_SAL: true,
    AGP: true,
    ESI: true,
    LOAN: true,
    IT: true,
  });

  const columnAliases = {
    EID: "Employee ID",
    BASIC_SAL: "Basic Salary",
    AGP: "AGP",
    ESI: "ESI",
    LOAN: "Loan",
    IT: "Income Tax",
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  const fetchSalaries = async () => {
    try {
      const response = await axios.get('http://localhost:5000/salaries');
      setSalaries(response.data);
    } catch (error) {
      console.error('Error fetching salaries:', error);
      alert('Failed to fetch salary details');
    }
  };

  const handleDelete = async (eid) => {
    try {
      await axios.delete(`http://localhost:5000/salaries/${eid}`);
      const updatedSalaries = salaries.filter(salary => salary.EID !== eid);
      setSalaries(updatedSalaries);
      alert('Salary entry deleted successfully');
    } catch (error) {
      console.error('Error deleting salary entry:', error);
      alert('Failed to delete salary entry');
    }
  };

  const handleColumnToggle = (column) => {
    setColumns({ ...columns, [column]: !columns[column] });
  };

  const filteredSalaries = salaries.filter(salary =>
    String(salary.EID).toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  return (
    <div className="salary-management">
      <h1>Salary Management</h1>
      
      <input
        type="text"
        placeholder="Search by Employee ID..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px', width: '250px' }}
      />

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
              (col) => columns[col] && <th key={col}>{columnAliases[col]}</th>
            )}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSalaries.map((salary) => (
            <tr key={salary.EID}>
              {Object.keys(columns).map((col) =>
                columns[col] ? <td key={col}>{salary[col] || 'N/A'}</td> : null
              )}
              <td>
                <button onClick={() => handleDelete(salary.EID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Salary;
