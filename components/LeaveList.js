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

    const columnAliases = {
        EID: "Employee ID",
        LTYPE: "Leave Type",
        APPROVAL: "Approval Status",
        NO_OF_DAYS: "No. of Days",
        FROM_DATE:"FROM",
        TO_DATE:"TO"
    };

        const fetchLeaves = async () => {
            try {
                const response = await axios.get('http://localhost:5000/leave');
                setLeaves(response.data);
            } catch (error) {
                console.error('Error fetching leave data:', error);
                alert('Failed to fetch leave details');
            }
        };

    const handleColumnToggle = (column) => {
        setColumns({ ...columns, [column]: !columns[column] });
    };

    const handleDelete = async (eid) => {
        try {
            await axios.delete(`http://localhost:5000/leave/${eid}`);
            const updatedLeaves = leaves.filter((leave) => leave.EID !== eid);
            setLeaves(updatedLeaves);
            alert('Leave record deleted successfully');
        } catch (error) {
            console.error('Error deleting leave record:', error);
            alert('Failed to delete leave record');
        }
    };

    return (
        <div>
            <h2>Leave List</h2>
            <button onClick={fetchLeaves}>View Leaves</button>
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
                    {leaves.map((leave) => (
                        <tr key={leave.EID}>
                            {Object.keys(columns).map(
                                (col) =>
                                    columns[col] && <td key={col}>{leave[col] || 'N/A'}</td>
                            )}
                            <td>
                                <button onClick={() => handleDelete(leave.EID)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LeaveList;
