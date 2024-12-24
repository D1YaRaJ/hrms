import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LeaveList.css';

const LeaveList = () => {
    const [leaves, setLeaves] = useState([]);
    const [columns, setColumns] = useState({
        EID: true,
        LTYPE: true,
        APPROVAL: true,
        NO_OF_DAYS: true,
        FROM_DATE:true,
        TO_DATE:true
    });
    const [searchDate, setSearchDate] = useState('');
    const [filteredLeaves, setFilteredLeaves] = useState([]);
    const columnAliases = {
        EID: "Employee ID",
        LTYPE: "Leave Type",
        APPROVAL: "Approval Status",
        NO_OF_DAYS: "No. of Days",
        FROM_DATE:"FROM",
        TO_DATE:"TO"
    };

    const fetchLeaves = async (searchDate) => {
        try {
            console.log("Fetching leaves for date:", searchDate);// Send searchDate to the backend to fetch filtered data
            const response = await axios.get('http://localhost:5000/leave', {
                params: { searchDate }
            });
            setLeaves(response.data);  // Store the result in state
            setFilteredLeaves(response.data);  // Initially set filtered leaves to all fetched leaves
        } catch (error) {
            console.error('Error fetching leave data:', error);
            alert('Failed to fetch leave details');
        }
    };

    useEffect(() => {
        fetchLeaves(searchDate);  // Fetch leaves whenever searchDate changes
    }, [searchDate]);

    const handleColumnToggle = (column) => {
        setColumns({ ...columns, [column]: !columns[column] });
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchDate(value);  // Update the search date
        fetchLeaves(value);  // Fetch leaves for the selected date
    };

    return (
        <div>
            <h2>Leave List</h2>

            <div className="search-bar">
                <input
                    type="date"
                    value={searchDate}
                    onChange={handleSearchChange}
                    placeholder="Search by Date"
                />
            </div>

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
                    {filteredLeaves.map((leave) => (
                        <tr key={leave.EID}>
                            {Object.keys(columns).map(
                                (col) =>
                                    columns[col] && <td key={col}>{leave[col] || 'N/A'}</td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LeaveList;
