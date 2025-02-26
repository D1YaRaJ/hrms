import React, { useState, useEffect } from 'react';
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

  const [employeeList, setEmployeeList] = useState([]);
  const [error, setError] = useState('');
  const leaveTypes = ['Sick Leave', 'Casual Leave', 'Paid Leave', 'Maternity Leave', 'Paternity Leave', 'Research Leave', 'Study Leave'];

  useEffect(() => {
    axios.get('http://localhost:5000/employees')
      .then(response => setEmployeeList(response.data))
      .catch(error => console.error('Error fetching employee IDs:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'EID') {
      if (!/^[a-zA-Z0-9]+$/.test(value)) {
        setError('EID should only contain letters and numbers.');
      } else if (/^\d+$/.test(value) && parseInt(value) <= 0) {
        setError('EID should be a positive number or alphanumeric.');
      } else {
        setError('');
      }
    }

    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };

      if (name === 'FROM_DATE' || name === 'NO_OF_DAYS') {
        updatedData.TO_DATE = calculateToDate(updatedData.FROM_DATE, updatedData.NO_OF_DAYS);
      }

      return updatedData;
    });
  };

  const calculateToDate = (fromDate, days) => {
    if (!fromDate || !days || days < 1) return '';
    const startDate = new Date(fromDate);
    startDate.setDate(startDate.getDate() + parseInt(days) - 1);
    return startDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (error) {
      alert(error);
      return;
    }

    try {
      await axios.post('http://localhost:5000/add-leave', formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      alert('Leave added successfully!');
      setFormData({ EID: '', LTYPE: '', APPROVAL: 'PENDING', NO_OF_DAYS: '', FROM_DATE: '', TO_DATE: '' });
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
          <input
            type="text"
            name="EID"
            value={formData.EID}
            onChange={handleChange}
            placeholder="Enter or select Employee ID"
            list="employeeList"
            required
          />
          <datalist id="employeeList">
            {employeeList.map(emp => (
              <option key={emp.EID} value={emp.EID}>{emp.EID} - {emp.Name}</option>
            ))}
          </datalist>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
        <div>
          <label>Leave Type:</label>
          <select name="LTYPE" value={formData.LTYPE} onChange={handleChange} required>
            <option value="">Select Leave Type</option>
            {leaveTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Approval:</label>
          <input type="text" name="APPROVAL" value={formData.APPROVAL} readOnly />
        </div>
        <div>
          <label>Number of Days:</label>
          <input
            type="number"
            name="NO_OF_DAYS"
            value={formData.NO_OF_DAYS}
            onChange={handleChange}
            min="1"
            required
          />
        </div>
        <div>
          <label>From Date:</label>
          <input
            type="date"
            name="FROM_DATE"
            value={formData.FROM_DATE}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>To Date:</label>
          <input
            type="date"
            name="TO_DATE"
            value={formData.TO_DATE}
            readOnly
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddLeave;
