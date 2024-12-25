import React, { useState } from 'react';
import axios from 'axios';
// AddEmployee.js
import './AddEmployee.css';

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    EID: '',
    INITIAL: '',
    FIRSTNAME: '',
    MIDDLENAME: '',
    LASTNAME: '',
    DESIGNATION: '',
    DOB: '',
    DATE_OF_JOIN: '',
    FTYPE: '',
    NATIONALITY: '',
    PHONE: '',
    EMAIL: '',
    CASTE: '',
    DOORNO: '',
    CITY: '',
    STATE: '',
    PINCODE: '',
    GENDER: '',
    PROFEXP_DESIGNATION: '',
    PPROFEXP_FROM: '',
    PPROFEXP_TO: '',
    LEAVE_ML: '',
    LEAVE_LOP: '',
    LEAVE_RH: '',
    LEAVE_OOD: '',
    LEAVE_CL: '',
    DID: '',
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
        DOB: formatDate(formData.DOB),
        DATE_OF_JOIN: formatDate(formData.DATE_OF_JOIN),
        PPROFEXP_FROM: formatDate(formData.PPROFEXP_FROM),
        PPROFEXP_TO: formatDate(formData.PPROFEXP_TO)
      };
    try {
      const response = await axios.post('http://localhost:5000/add-employee', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert('Employee added successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error adding employee:', error);
      alert('Failed to add employee');
    }
  };

  return (
    <div>
      <h1>Add Employee</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>EID:</label>
          <input type="number" name="EID" value={formData.EID} onChange={handleChange} required />
        </div>
        <div>
          <label>Initial:</label>
          <input type="text" name="INITIAL" value={formData.INITIAL} onChange={handleChange} />
        </div>
        <div>
          <label>First Name:</label>
          <input type="text" name="FIRSTNAME" value={formData.FIRSTNAME} onChange={handleChange} required />
        </div>
        <div>
          <label>Middle Name:</label>
          <input type="text" name="MIDDLENAME" value={formData.MIDDLENAME} onChange={handleChange} />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" name="LASTNAME" value={formData.LASTNAME} onChange={handleChange} />
        </div>
        <div>
          <label>Designation:</label>
          <input type="text" name="DESIGNATION" value={formData.DESIGNATION} onChange={handleChange} />
        </div>
        <div>
          <label>DOB:</label>
          <input type="date" name="DOB" value={formData.DOB} onChange={handleChange} required />
        </div>
        <div>
          <label>Date of Joining:</label>
          <input type="date" name="DATE_OF_JOIN" value={formData.DATE_OF_JOIN} onChange={handleChange} />
        </div>
        <div>
          <label>Full-Time/Part-Time:</label>
          <input type="text" name="FTYPE" value={formData.FTYPE} onChange={handleChange} />
        </div>
        <div>
          <label>Nationality:</label>
          <input type="text" name="NATIONALITY" value={formData.NATIONALITY} onChange={handleChange} />
        </div>
        <div>
          <label>Phone:</label>
          <input type="tel" name="PHONE" value={formData.PHONE} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="EMAIL" value={formData.EMAIL} onChange={handleChange} required />
        </div>
        <div>
          <label>Caste:</label>
          <input type="text" name="CASTE" value={formData.CASTE} onChange={handleChange} />
        </div>
        <div>
          <label>Door No:</label>
          <input type="text" name="DOORNO" value={formData.DOORNO} onChange={handleChange} />
        </div>
        <div>
          <label>City:</label>
          <input type="text" name="CITY" value={formData.CITY} onChange={handleChange} />
        </div>
        <div>
          <label>State:</label>
          <input type="text" name="STATE" value={formData.STATE} onChange={handleChange} />
        </div>
        <div>
          <label>Pincode:</label>
          <input type="number" name="PINCODE" value={formData.PINCODE} onChange={handleChange} />
        </div>
        <div>
          <label>Gender:</label>
          <input type="text" name="GENDER" value={formData.GENDER} onChange={handleChange} />
        </div>
        <div>
          <label>Professional Experience Designation:</label>
          <input type="text" name="PROFEXP_DESIGNATION" value={formData.PROFEXP_DESIGNATION} onChange={handleChange} />
        </div>
        <div>
          <label>Professional Experience From:</label>
          <input type="date" name="PPROFEXP_FROM" value={formData.PPROFEXP_FROM} onChange={handleChange} />
        </div>
        <div>
          <label>Professional Experience To:</label>
          <input type="date" name="PPROFEXP_TO" value={formData.PPROFEXP_TO} onChange={handleChange} />
        </div>
        <div>
          <label>Leave ML:</label>
          <input type="number" name="LEAVE_ML" value={formData.LEAVE_ML} onChange={handleChange} />
        </div>
        <div>
          <label>Leave LOP:</label>
          <input type="number" name="LEAVE_LOP" value={formData.LEAVE_LOP} onChange={handleChange} />
        </div>
        <div>
          <label>Leave RH:</label>
          <input type="number" name="LEAVE_RH" value={formData.LEAVE_RH} onChange={handleChange} />
        </div>
        <div>
          <label>Leave OOD:</label>
          <input type="number" name="LEAVE_OOD" value={formData.LEAVE_OOD} onChange={handleChange} />
        </div>
        <div>
          <label>Leave CL:</label>
          <input type="number" name="LEAVE_CL" value={formData.LEAVE_CL} onChange={handleChange} />
        </div>
        <div>
          <label>Department ID:</label>
          <input type="number" name="DID" value={formData.DID} onChange={handleChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EmployeeForm; 