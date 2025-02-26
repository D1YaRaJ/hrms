import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LeaveList.css';

const LeaveList = () => {
    const [leaves, setLeaves] = useState([]);
    const [filteredLeaves, setFilteredLeaves] = useState([]);
    const [columns, setColumns] = useState({
        EID: true,
        LTYPE: true,
        APPROVAL: true,
        NO_OF_DAYS: true,
        FROM_DATE: true,
        TO_DATE: true
    });
    const [searchEID, setSearchEID] = useState('');

    const columnAliases = {
        EID: "Employee ID",
        LTYPE: "Leave Type",
        APPROVAL: "Approval Status",
        NO_OF_DAYS: "No. of Days",
        FROM_DATE: "From",
        TO_DATE: "To"
    };

    // Fetch all leave records
    const fetchLeaves = async () => {
        try {
            const response = await axios.get('http://localhost:5000/leave');
            setLeaves(response.data);
            setFilteredLeaves(response.data); // Initially show all records
        } catch (error) {
            console.error('Error fetching leave data:', error);
            alert('Failed to fetch leave details');
        }
    };

    // Handle column selection
    const handleColumnToggle = (column) => {
        setColumns({ ...columns, [column]: !columns[column] });
    };

    // Search leave records by Employee ID
    const handleSearch = () => {
        if (!searchEID.trim()) {
            alert('Please enter an Employee ID to search');
            return;
        }

        const filtered = leaves.filter(leave => leave.EID === searchEID);
        setFilteredLeaves(filtered);

        if (filtered.length === 0) {
            alert(`No leave records found for Employee ID: ${searchEID}`);
        }
    };

    // Delete all leave records for entered Employee ID
    const handleDelete = async () => {
        if (!searchEID.trim()) {
            alert('Please enter an Employee ID before deleting leave records');
            return;
        }

        try {
            await axios.delete(`http://localhost:5000/leave/${searchEID}`);
            const updatedLeaves = leaves.filter(leave => leave.EID !== searchEID);
            setLeaves(updatedLeaves);
            setFilteredLeaves(updatedLeaves);
            alert(`Leave records for Employee ID ${searchEID} deleted successfully`);
            setSearchEID(''); // Reset search box after deletion
        } catch (error) {
            console.error('Error deleting leave record:', error);
            alert('Failed to delete leave record');
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, []);

    return (
        <div>
            <h2>Leave List</h2>

            {/* Search Box for Employee ID */}
            <label>Enter Employee ID: </label>
            <input
                type="text"
                value={searchEID}
                onChange={(e) => setSearchEID(e.target.value)}
                placeholder="Enter Employee ID"
            />

            {/* Search and Delete Buttons */}
            <button onClick={handleSearch} style={{ marginLeft: '10px' }}>Search</button>
            <button onClick={handleDelete} disabled={!searchEID.trim()} style={{ marginLeft: '10px' }}>
                Delete
            </button>

            {/* Column Selection */}
            <div className="column-selection">
                <h3>Select Columns to Display</h3>
                {Object.keys(columns).map((col) => (
                    <label key={col}>
                        <input
                            type="checkbox"
                            checked={columns[col]}
                            onChange={() => handleColumnToggle(col)}
                        />
                        {columnAliases[col] || col} {/* Display alias name */}
                    </label>
                ))}
            </div>

            {/* Leave Records Table */}
            <table border="1" style={{ marginTop: '20px', width: '100%' }}>
                <thead>
                    <tr>
                        {Object.keys(columns).map(
                            (col) => columns[col] && <th key={col}>{columnAliases[col]}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {filteredLeaves.length > 0 ? (
                        filteredLeaves.map((leave) => (
                            <tr key={leave.EID}>
                                {Object.keys(columns).map(
                                    (col) => columns[col] && <td key={col}>{leave[col] || 'N/A'}</td>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={Object.keys(columns).length} style={{ textAlign: 'center' }}>
                                No leave records found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default LeaveList;
