import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AttendanceList() {
    const [attendance, setAttendance] = useState([]);
    const [filteredAttendance, setFilteredAttendance] = useState([]);
    const [searchEID, setSearchEID] = useState('');

    // Fetch all attendance records
    const fetchAttendance = async () => {
        try {
            const response = await axios.get('http://localhost:5000/attendance');
            setAttendance(response.data);
            setFilteredAttendance(response.data); // Initially show all records
        } catch (error) {
            console.error('Error fetching attendance:', error);
            alert('Failed to fetch attendance records');
        }
    };

    // Handle search when clicking the "Search" button
    const handleSearch = () => {
        if (!searchEID) {
            alert('Please enter an Employee ID to search');
            return;
        }

        const filtered = attendance.filter(record => record.EID === searchEID);
        setFilteredAttendance(filtered);

        if (filtered.length === 0) {
            alert(`No attendance records found for Employee ID: ${searchEID}`);
        }
    };

    // Delete all attendance records for the searched employee
    const handleDelete = async () => {
        if (!searchEID) {
            alert('Please search for an employee before deleting attendance records');
            return;
        }

        try {
            await axios.delete(`http://localhost:5000/attendance/${searchEID}`);
            const updatedAttendance = attendance.filter(record => record.EID !== searchEID);
            setAttendance(updatedAttendance);
            setFilteredAttendance(updatedAttendance);
            alert(`Attendance records for Employee ID ${searchEID} deleted successfully`);
            setSearchEID(''); // Reset search field after deletion
        } catch (error) {
            console.error('Error deleting attendance records:', error);
            alert('Failed to delete attendance records');
        }
    };

    useEffect(() => {
        fetchAttendance();
    }, []);

    return (
        <div>
            <h2>Attendance Records</h2>

            {/* Search Box and Search Button */}
            <input 
                type="text" 
                placeholder="Enter Employee ID" 
                value={searchEID} 
                onChange={(e) => setSearchEID(e.target.value)}
            />
            <button onClick={handleSearch} style={{ marginLeft: '10px' }}>Search</button>

            {/* Delete Button */}
            <button onClick={handleDelete} disabled={!searchEID} style={{ marginLeft: '10px' }}>
                Delete 
            </button>

            {/* Attendance Table */}
            <table border="1" style={{ width: '100%', marginTop: '10px' }}>
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Login</th>
                        <th>Logout</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAttendance.length > 0 ? (
                        filteredAttendance.map((record) => (
                            <tr key={`${record.EID}-${record.A_DATE}`}>
                                <td>{record.EID}</td>
                                <td>{record.A_DATE}</td>
                                <td>{record.STATUS}</td>
                                <td>{record.LOGIN}</td>
                                <td>{record.LOGOUT}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={{ textAlign: 'center' }}>No attendance records found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default AttendanceList;
