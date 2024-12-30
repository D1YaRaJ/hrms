import React, { useState } from 'react';
import axios from 'axios';
import './AddLeave.css';

const AddLeave = ({ onLeaveAdded }) => {
  const [formData, setFormData] = useState({
    EID: '',
    LTYPE: '',
    APPROVAL: 'PENDING',
    NO_OF_DAYS: '',
    FROM_DATE: '',
    TO_DATE: ''
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
      FROM_DATE: formatDate(formData.FROM_DATE),
      TO_DATE: formatDate(formData.TO_DATE)
    };
    try {
      const response = await axios.post('http://localhost:5000/add-leave', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert('Leave added successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error adding leave:', error);
      alert('Failed to add leave');
    }
  };

  return (
    <div className="add-leave">
      <h1>Add Leave</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Employee ID:</label>
          <input type="number" name="EID" value={formData.EID} onChange={handleChange} required />
        </div>
        <div>
          <label>Leave Type:</label>
          <input type="text" name="LTYPE" value={formData.LTYPE} onChange={handleChange} required />
        </div>
        <div>
          <label>Approval:</label>
          <input type="text" name="APPROVAL" value={formData.APPROVAL} onChange={handleChange} required />
        </div>
        <div>
          <label>Number of Days:</label>
          <input type="number" name="NO_OF_DAYS" value={formData.NO_OF_DAYS} onChange={handleChange} required />
        </div>
        <div>
          <label>From Date:</label>
          <input type="date" name="FROM_DATE" value={formData.FROM_DATE} onChange={handleChange} required />
        </div>
        <div>
          <label>To Date:</label>
          <input type="date" name="TO_DATE" value={formData.TO_DATE} onChange={handleChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddLeave;
