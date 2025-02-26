import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddAttendance() {
    const [attendance, setAttendance] = useState({
        EID: '',
        A_DATE: new Date().toISOString().split('T')[0], // Auto-set today's date
        STATUS: '',
        LOGIN: '',
        LOGOUT: '',
    });

    const [employeeList, setEmployeeList] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch employee list from backend
        axios.get('http://localhost:5000/employees')
            .then(response => setEmployeeList(response.data))
            .catch(error => console.error('Error fetching employee list:', error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // If updating EID, validate the input
        if (name === 'EID') {
            if (!/^[a-zA-Z0-9]+$/.test(value)) {
                setError('EID should only contain letters and numbers.');
            } else if (/^\d+$/.test(value) && parseInt(value) <= 0) {
                setError('EID should be a positive number or alphanumeric.');
            } else {
                setError('');
            }
        }

        setAttendance({ ...attendance, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Prevent form submission if EID has an error
        if (error) {
            alert(error);
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/add-attendance', attendance);
            alert(response.data.message);
            setAttendance({ EID: '', A_DATE: new Date().toISOString().split('T')[0], STATUS: '', LOGIN: '', LOGOUT: '' });
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
                        type="text"
                        name="EID"
                        value={attendance.EID}
                        onChange={handleChange}
                        placeholder="Enter or select Employee ID"
                        list="employeeList"
                        required
                    />
                    <datalist id="employeeList">
                        {employeeList.map(emp => (
                            <option key={emp.EID} value={emp.EID}>{emp.EID} - {emp.Name}</option>
                        ))}
                    </datalist>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
                <div>
                    <label>Date:</label>
                    <input type="date" name="A_DATE" value={attendance.A_DATE} onChange={handleChange} required />
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
                    <input type="time" name="LOGIN" value={attendance.LOGIN} onChange={handleChange} />
                </div>
                <div>
                    <label>Logout Time:</label>
                    <input type="time" name="LOGOUT" value={attendance.LOGOUT} onChange={handleChange} />
                </div>
                <button type="submit">Add Attendance</button>
            </form>
        </div>
    );
}

export default AddAttendance;
