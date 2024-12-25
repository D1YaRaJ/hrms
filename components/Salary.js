// salary.js
import React, { useState } from 'react';
import axios from 'axios';
import './Salary.css';

const AddSalary = () => {
  const [EID, setEID] = useState('');
  const [BASIC_SAL, setBasicSal] = useState('');
  const [AGP, setAgp] = useState('');
  const [ESI, setEsi] = useState('');
  const [LOAN, setLoan] = useState('');
  const [IT, setIt] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const salaryData = { EID, BASIC_SAL, AGP, ESI, LOAN, IT };
    try {
      const response = await axios.post('http://localhost:5000/add-salary', salaryData);
      alert('Salary details added successfully');
    } catch (error) {
      console.error('Error adding salary details:', error);
      alert('Error adding salary details');
    }
  };

  return (
    <div className="salary-form">
      <h2>Enter Salary Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>EID</label>
          <input
            type="number"
            value={EID}
            onChange={(e) => setEID(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Basic Salary</label>
          <input
            type="number"
            value={BASIC_SAL}
            onChange={(e) => setBasicSal(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>AGP</label>
          <input
            type="number"
            value={AGP}
            onChange={(e) => setAgp(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>ESI</label>
          <input
            type="number"
            value={ESI}
            onChange={(e) => setEsi(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Loan</label>
          <input
            type="number"
            value={LOAN}
            onChange={(e) => setLoan(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Income Tax</label>
          <input
            type="number"
            value={IT}
            onChange={(e) => setIt(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Salary</button>
      </form>
    </div>
  );
};

export default AddSalary;
