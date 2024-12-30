import React, { useState } from 'react';
import axios from 'axios';
import './AddPayroll.css'; // Adjust your CSS file for the payroll form

const AddPayroll = ({ onPayrollAdded }) => {
  const [formData, setFormData] = useState({
    EID: '',
    P_DATE: '',
    NO_OF_DAYS: '',
    PF: '',
    VA: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const formatDate = (date) => {
    if (!date) return '';
    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year}`; // Converts yyyy-mm-dd to dd-mm-yyyy
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      P_DATE: formatDate(formData.P_DATE),
    };
    try {
      const response = await axios.post('http://localhost:5000/add-payroll', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert('Payroll added successfully!');
      console.log(response.data);
      
    } catch (error) {
      console.error('Error adding payroll:', error);
      alert('Failed to add payroll');
    }
  };

  return (
    <div className="add-payroll">
      <h1>Add Payroll</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Employee ID:</label>
          <input
            type="number"
            name="EID"
            value={formData.EID}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Payroll Date:</label>
          <input
            type="date"
            name="P_DATE"
            value={formData.P_DATE}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Number of Days Worked:</label>
          <input
            type="number"
            name="NO_OF_DAYS"
            value={formData.NO_OF_DAYS}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Provident Fund (PF):</label>
          <input
            type="number"
            name="PF"
            value={formData.PF}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Vocation Allowance (VA):</label>
          <input
            type="number"
            name="VA"
            value={formData.VA}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddPayroll;
