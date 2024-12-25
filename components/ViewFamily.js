import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewFamily.css';

const ViewFamily = () => {
    const [familyDetails, setFamilyDetails] = useState([]);
    const [columns, setColumns] = useState({
        EID: true,
        FNAME: true,
        F_DOB: true,
        MNAME: true,
        M_DOB: true
    });

    const columnAliases = {
        EID: "Employee ID",
        FNAME: "Family Member Name",
        F_DOB: "Family Member DOB",
        MNAME: "Mother's Name",
        M_DOB: "Mother's DOB"
    };

    const fetchFamilyDetails = async () => {
        try {
            const response = await axios.get('http://localhost:5000/families');
            setFamilyDetails(response.data);
        } catch (error) {
            console.error('Error fetching family details:', error);
            alert('Failed to fetch family details');
        }
    };

    const handleColumnToggle = (column) => {
        setColumns({ ...columns, [column]: !columns[column] });
    };

    useEffect(() => {
        fetchFamilyDetails();
    }, []);

    return (
        <div>
            <h1>Family Details</h1>
            <div className="column-selection">
                <h3>Select Columns to Display</h3>
                {Object.keys(columns).map((col) => (
                    <label key={col}>
                        <input
                            type="checkbox"
                            checked={columns[col]}
                            onChange={() => handleColumnToggle(col)}
                        />
                        {columnAliases[col] || col} {/* Display alias name or original if no alias */}
                    </label>
                ))}
            </div>

            <table border="1" style={{ marginTop: '20px', width: '100%' }}>
                <thead>
                    <tr>
                        {Object.keys(columns).map(
                            (col) =>
                                columns[col] && <th key={col}>{columnAliases[col]}</th> // Display alias name
                        )}
                    </tr>
                </thead>
                <tbody>
                    {familyDetails.map((family, index) => (
                        <tr key={index}>
                            {Object.keys(columns).map(
                                (col) =>
                                    columns[col] && <td key={col}>{family[col] || 'N/A'}</td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewFamily;
