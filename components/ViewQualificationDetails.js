import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewQualificationDetails.css';

const ViewQualificationDetails = () => {
  const [qualificationDetails, setQualificationDetails] = useState([]);
  const [columns, setColumns] = useState({
    EID: true,
    INSTITUTION: true,
    PERCENTAGE: true,
    SPECIALIZATION: true,
    YOG: true,
  });

  const columnAliases = {
    EID: "Employee ID",
    INSTITUTION: "Institution",
    PERCENTAGE: "Percentage",
    SPECIALIZATION: "Specialization",
    YOG: "Year of Graduation",
  };

  const fetchQualificationDetails = async () => {
    try {
      const response = await axios.get('http://localhost:5000/qualifications');
      setQualificationDetails(response.data);
    } catch (error) {
      console.error('Error fetching qualification details:', error);
      alert('Failed to fetch qualification details');
    }
  };

  const handleColumnToggle = (column) => {
    setColumns({ ...columns, [column]: !columns[column] });
  };

  const handleDelete = async (eid) => {
    try {
      // Send DELETE request to backend
      await axios.delete(`http://localhost:5000/qualifications/${eid}`);
      
      // Update the UI to reflect the deletion
      const updatedQualificationDetails = qualificationDetails.filter(
        (qualification) => qualification.EID !== eid
      );
      setQualificationDetails(updatedQualificationDetails);

      alert('Qualification details deleted successfully');
    } catch (error) {
      console.error('Error deleting qualification details:', error);
      alert('Failed to delete qualification details');
    }
  };

  useEffect(() => {
    fetchQualificationDetails();
  }, []);

  return (
    <div>
      <h1>Qualification Details</h1>
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
          {qualificationDetails.map((qualification, index) => (
            <tr key={index}>
              {Object.keys(columns).map(
                (col) => columns[col] && <td key={col}>{qualification[col] || 'N/A'}</td>
              )}
              <td>
                {/* Delete button for each row */}
                <button onClick={() => handleDelete(qualification.EID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewQualificationDetails;
