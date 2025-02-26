import React, { useState } from 'react';
import axios from 'axios';
import './AddEmployee.css';

const EmployeeForm = () => {
  // State to manage form data
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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Helper function to format date from yyyy-mm-dd to dd-mm-yyyy
  const formatDate = (date) => {
    if (!date) return '';
    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year}`;
  };

  // Calculate the minimum and maximum dates for DOB and Date of Joining
  const currentDate = new Date().toISOString().split('T')[0]; // Current date in yyyy-mm-dd format
  const minDOB = new Date();
  minDOB.setFullYear(minDOB.getFullYear() - 100); // Minimum DOB: 100 years ago
  const maxDOB = new Date();
  maxDOB.setFullYear(maxDOB.getFullYear() - 18); // Maximum DOB: 18 years ago
  const minDateOfJoin = formData.DOB ? new Date(formData.DOB) : null;
  if (minDateOfJoin) minDateOfJoin.setFullYear(minDateOfJoin.getFullYear() + 18); // Minimum Date of Joining: DOB + 18 years

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate Professional Experience Dates
    if (new Date(formData.PPROFEXP_FROM) > new Date(formData.PPROFEXP_TO)) {
      alert('Professional Experience From must be before Professional Experience To');
      return;
    }

    // Format the dates before sending to the backend
    const formattedData = {
      ...formData,
      DOB: formatDate(formData.DOB),
      DATE_OF_JOIN: formatDate(formData.DATE_OF_JOIN),
      PPROFEXP_FROM: formatDate(formData.PPROFEXP_FROM),
      PPROFEXP_TO: formatDate(formData.PPROFEXP_TO),
    };

    try {
      const response = await axios.post('http://localhost:5000/add-employee', formattedData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert('Employee added successfully!');
      console.log(response.data);

      // Clear the form after successful submission
      setFormData({
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
    } catch (error) {
      console.error('Error adding employee:', error);
      alert('Failed to add employee');
    }
  };

  return (
    <div className="employee-form">
      <h1>Add Employee</h1>
      <form onSubmit={handleSubmit}>
        {/* Employee ID */}
        <div className="form-group">
          <label>Employee ID:</label>
          <input
            type="number"
            name="EID"
            value={formData.EID}
            onChange={handleChange}
            required
          />
        </div>

        {/* Initial */}
        <div className="form-group">
          <label>Initial:</label>
          <input
            type="text"
            name="INITIAL"
            value={formData.INITIAL}
            onChange={handleChange}
          />
        </div>

        {/* First Name */}
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="FIRSTNAME"
            value={formData.FIRSTNAME}
            onChange={handleChange}
            required
          />
        </div>

        {/* Middle Name */}
        <div className="form-group">
          <label>Middle Name:</label>
          <input
            type="text"
            name="MIDDLENAME"
            value={formData.MIDDLENAME}
            onChange={handleChange}
          />
        </div>

        {/* Last Name */}
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="LASTNAME"
            value={formData.LASTNAME}
            onChange={handleChange}
          />
        </div>

        {/* Designation Dropdown */}
        <div className="form-group">
          <label>Designation:</label>
          <select
            name="DESIGNATION"
            value={formData.DESIGNATION}
            onChange={handleChange}
            required
          >
            <option value="">Select Designation</option>
            <option value="Professor">Professor</option>
            <option value="Assistant Professor">Assistant Professor</option>
            <option value="Head of Department (HoD)">Head of Department (HoD)</option>
            <option value="Principal">Principal</option>
            <option value="Vice Principal">Vice Principal</option>
            <option value="Training & Placement Officer (TPO)">Training & Placement Officer (TPO)</option>
            <option value="Librarian">Librarian</option>
            <option value="Lab Instructor">Lab Instructor</option>
            <option value="Administrative Officer">Administrative Officer</option>
            <option value="Clerk">Clerk</option>
          </select>
        </div>

        {/* Date of Birth */}
        <div className="form-group">
          <label>Date of Birth:</label>
          <input
            type="date"
            name="DOB"
            value={formData.DOB}
            onChange={handleChange}
            min={minDOB.toISOString().split('T')[0]} // Minimum DOB: 100 years ago
            max={maxDOB.toISOString().split('T')[0]} // Maximum DOB: 18 years ago
            required
          />
        </div>

        {/* Date of Joining */}
        <div className="form-group">
          <label>Date of Joining:</label>
          <input
            type="date"
            name="DATE_OF_JOIN"
            value={formData.DATE_OF_JOIN}
            onChange={handleChange}
            min={minDateOfJoin ? minDateOfJoin.toISOString().split('T')[0] : ''} // Minimum Date of Joining: DOB + 18 years
            max={currentDate} // Maximum Date of Joining: Current date
            required
          />
        </div>

        {/* Employee Type Dropdown */}
        <div className="form-group">
          <label>Employee Type:</label>
          <select
            name="FTYPE"
            value={formData.FTYPE}
            onChange={handleChange}
            required
          >
            <option value="">Select Employee Type</option>
            <option value="TEACHING">TEACHING</option>
            <option value="NON TEACHING">NON TEACHING</option>
          </select>
        </div>

        {/* Nationality */}
        <div className="form-group">
          <label>Nationality:</label>
          <input
            type="text"
            name="NATIONALITY"
            value={formData.NATIONALITY}
            onChange={handleChange}
          />
        </div>

        {/* Phone */}
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="tel"
            name="PHONE"
            value={formData.PHONE}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="EMAIL"
            value={formData.EMAIL}
            onChange={handleChange}
            required
          />
        </div>

        {/* Caste */}
        <div className="form-group">
          <label>Caste:</label>
          <input
            type="text"
            name="CASTE"
            value={formData.CASTE}
            onChange={handleChange}
          />
        </div>

        {/* Door No */}
        <div className="form-group">
          <label>Door No:</label>
          <input
            type="text"
            name="DOORNO"
            value={formData.DOORNO}
            onChange={handleChange}
          />
        </div>

        {/* City */}
        <div className="form-group">
          <label>City:</label>
          <input
            type="text"
            name="CITY"
            value={formData.CITY}
            onChange={handleChange}
          />
        </div>

        {/* State */}
        <div className="form-group">
          <label>State:</label>
          <input
            type="text"
            name="STATE"
            value={formData.STATE}
            onChange={handleChange}
          />
        </div>

        {/* Pincode */}
        <div className="form-group">
          <label>Pincode:</label>
          <input
            type="number"
            name="PINCODE"
            value={formData.PINCODE}
            onChange={handleChange}
          />
        </div>

        {/* Gender Dropdown */}
        <div className="form-group">
          <label>Gender:</label>
          <select
            name="GENDER"
            value={formData.GENDER}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Professional Experience Designation */}
        <div className="form-group">
          <label>Professional Experience Designation:</label>
          <input
            type="text"
            name="PROFEXP_DESIGNATION"
            value={formData.PROFEXP_DESIGNATION}
            onChange={handleChange}
          />
        </div>

        {/* Professional Experience From */}
        <div className="form-group">
          <label>Professional Experience From:</label>
          <input
            type="date"
            name="PPROFEXP_FROM"
            value={formData.PPROFEXP_FROM}
            onChange={handleChange}
            max={formData.PPROFEXP_TO || currentDate} // Maximum: PPROFEXP_TO or current date
          />
        </div>

        {/* Professional Experience To */}
        <div className="form-group">
          <label>Professional Experience To:</label>
          <input
            type="date"
            name="PPROFEXP_TO"
            value={formData.PPROFEXP_TO}
            onChange={handleChange}
            min={formData.PPROFEXP_FROM} // Minimum: PPROFEXP_FROM
            max={currentDate} // Maximum: Current date
          />
        </div>

        {/* Leave ML */}
        <div className="form-group">
          <label>Leave ML:</label>
          <input
            type="number"
            name="LEAVE_ML"
            value={formData.LEAVE_ML}
            onChange={handleChange}
          />
        </div>

        {/* Leave LOP */}
        <div className="form-group">
          <label>Leave LOP:</label>
          <input
            type="number"
            name="LEAVE_LOP"
            value={formData.LEAVE_LOP}
            onChange={handleChange}
          />
        </div>

        {/* Leave RH */}
        <div className="form-group">
          <label>Leave RH:</label>
          <input
            type="number"
            name="LEAVE_RH"
            value={formData.LEAVE_RH}
            onChange={handleChange}
          />
        </div>

        {/* Leave OOD */}
        <div className="form-group">
          <label>Leave OOD:</label>
          <input
            type="number"
            name="LEAVE_OOD"
            value={formData.LEAVE_OOD}
            onChange={handleChange}
          />
        </div>

        {/* Leave CL */}
        <div className="form-group">
          <label>Leave CL:</label>
          <input
            type="number"
            name="LEAVE_CL"
            value={formData.LEAVE_CL}
            onChange={handleChange}
          />
        </div>

        {/* Department ID */}
        <div className="form-group">
          <label>Department ID:</label>
          <input
            type="number"
            name="DID"
            value={formData.DID}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
