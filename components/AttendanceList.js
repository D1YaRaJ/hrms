import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AttendanceList() {
    const [attendance, setAttendance] = useState([]);

    const fetchAttendance = async () => {
        try {
            const response = await axios.get('http://localhost:5000/attendance');
            setAttendance(response.data);
        } catch (error) {
            console.error('Error fetching attendance:', error);
            alert('Failed to fetch attendance records');
        }
    };

    const handleDelete = async (eid) => {
        try {
            await axios.delete(`http://localhost:5000/attendance/${eid}`);
            // Remove the deleted record from the state
            setAttendance((prevAttendance) =>
                prevAttendance.filter(
                    (record) => record.EID !== eid
                )
            );
            alert('Attendance record deleted successfully');
        } catch (error) {
            console.error('Error deleting attendance record:', error);
            alert('Failed to delete attendance record');
        }
    };
    
    useEffect(() => {
        fetchAttendance();
    }, []);

    return (
        <div>
            <h2>Attendance Records</h2>
            <table border="1" style={{ width: '100%' }}>
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
                    {attendance.map((record) => (
                        <tr key={`${record.EID}-${record.A_DATE}`}>
                            <td>{record.EID}</td>
                            <td>{record.A_DATE}</td>
                            <td>{record.STATUS}</td>
                            <td>{record.LOGIN}</td>
                            <td>{record.LOGOUT}</td>
                            <td>
                                <button onClick={() => handleDelete(record.EID)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AttendanceList;
