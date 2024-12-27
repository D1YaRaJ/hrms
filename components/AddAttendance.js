import React, { useState } from 'react';
import axios from 'axios';

function AddAttendance() {
    const [attendance, setAttendance] = useState({
        EID: '',
        A_DATE: '',
        STATUS: '',
        LOGIN: '',
        LOGOUT: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAttendance({ ...attendance, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const attendanceData = {
            EID: attendance.EID,
            A_DATE: attendance.A_DATE,
            STATUS: attendance.STATUS,
            LOGIN: attendance.LOGIN,
            LOGOUT: attendance.LOGOUT
        };

        try {
            const response = await axios.post('http://localhost:5000/add-attendance', attendanceData);
            alert(response.data.message);
            setAttendance({ EID: '', A_DATE: '', STATUS: '', LOGIN: '', LOGOUT: '' });
        } catch (error) {
            console.error('Error adding attendance:', error);
            alert('Failed to add attendance record');
        }
    };

    return (
        <div>
            <h2>Add Attendance Record</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Employee ID:</label>
                    <input
                        type="number"
                        name="EID"
                        value={attendance.EID}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Date:</label>
                    <input
                        type="date"
                        name="A_DATE"
                        value={attendance.A_DATE}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Status:</label>
                    <select name="STATUS" value={attendance.STATUS} onChange={handleChange} required>
                        <option value="">Select</option>
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                        <option value="Leave">Leave</option>
                    </select>
                </div>
                <div>
                    <label>Login Time:</label>
                    <input
                        type="time"
                        name="LOGIN"
                        value={attendance.LOGIN}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Logout Time:</label>
                    <input
                        type="time"
                        name="LOGOUT"
                        value={attendance.LOGOUT}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Add Attendance</button>
            </form>
        </div>
    );
}

export default AddAttendance;