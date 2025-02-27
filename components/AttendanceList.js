import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

const AttendanceList = () => {
    const [attendance, setAttendance] = useState([]);
    const [filteredAttendance, setFilteredAttendance] = useState([]); // Store filtered results
    const [searchEID, setSearchEID] = useState("");
    const [editRecord, setEditRecord] = useState(null); // Store record being edited
    const [modalVisible, setModalVisible] = useState(false); // Toggle modal visibility

    // Fetch all attendance records
    const fetchAttendance = async () => {
        try {
            const response = await axios.get("http://localhost:5000/attendance");
            setAttendance(response.data);
            setFilteredAttendance(response.data); // Store full data for reset
        } catch (error) {
            console.error("Error fetching attendance:", error);
            alert("Failed to fetch attendance records");
        }
    };

    // Search functionality
    const handleSearch = () => {
        if (!searchEID.trim()) {
            setFilteredAttendance(attendance); // Reset list if search is empty
            return;
        }

        const filtered = attendance.filter(record =>
            record.EID.toString().includes(searchEID.trim()) // Partial match
        );

        setFilteredAttendance(filtered);

        if (filtered.length === 0) {
            alert(`No attendance records found for Employee ID: ${searchEID}`);
        }
    };

    useEffect(() => {
        fetchAttendance();
    }, []);
    // Delete a specific attendance record
    const handleDelete = async (eid) => {
        if (!window.confirm(`Are you sure you want to delete attendance for Employee ID ${eid}`)) {
            return;
        }

        try {
            await axios.delete(`http://localhost:5000/attendance/${eid}`);
            const updatedAttendance = attendance.filter(record => !(record.eid === eid));
            setAttendance(updatedAttendance);
            setFilteredAttendance(updatedAttendance);
            alert(`Attendance record deleted successfully`);
        } catch (error) {
            console.error('Error deleting attendance record:', error);
            alert('Failed to delete attendance record');
        }
    };

    // Open edit modal for a specific record
    const handleEdit = (record) => {
        setEditRecord(record);
        setModalVisible(true);
    };

    // Handle updating attendance record
    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:5000/attendance/${editRecord.EID}/${editRecord.A_DATE}`, editRecord);
            setAttendance(attendance.map(record => 
                record.EID === editRecord.EID && record.A_DATE === editRecord.A_DATE ? editRecord : record
            ));
            setFilteredAttendance(filteredAttendance.map(record => 
                record.EID === editRecord.EID && record.A_DATE === editRecord.A_DATE ? editRecord : record
            ));
            alert("Attendance updated successfully");
            setModalVisible(false);
        } catch (error) {
            console.error('Error updating attendance:', error);
            alert('Failed to update attendance');
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

            {/* Attendance Table */}
            <table border="1" style={{ width: '100%', marginTop: '10px' }}>
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Login</th>
                        <th>Logout</th>
                        <th>Actions</th>
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
                                <td>
                                    <FaEdit 
                                        style={{ color: 'blue', cursor: 'pointer', marginRight: '10px' }} 
                                        onClick={() => handleEdit(record)} 
                                    />
                                    <FaTrash 
                                        style={{ color: 'red', cursor: 'pointer' }} 
                                        onClick={() => handleDelete(record.EID, record.A_DATE)} 
                                    />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" style={{ textAlign: 'center' }}>No attendance records found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Edit Modal */}
            {modalVisible && editRecord && (
                <div style={{
                    position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white', padding: '20px', border: '1px solid black', zIndex: 1000
                }}>
                    <h3>Edit Attendance</h3>
                    <label>Status: </label>
                    <select 
                        value={editRecord.STATUS} 
                        onChange={(e) => setEditRecord({...editRecord, STATUS: e.target.value})}
                    >
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                        <option value="Leave">Leave</option>
                    </select>
                    <br />
                    <label>Login Time: </label>
                    <input 
                        type="time" 
                        value={editRecord.LOGIN} 
                        onChange={(e) => setEditRecord({...editRecord, LOGIN: e.target.value})} 
                    />
                    <br />
                    <label>Logout Time: </label>
                    <input 
                        type="time" 
                        value={editRecord.LOGOUT} 
                        onChange={(e) => setEditRecord({...editRecord, LOGOUT: e.target.value})} 
                    />
                    <br /><br />
                    <button onClick={handleUpdate}>Update</button>
                    <button onClick={() => setModalVisible(false)} style={{ marginLeft: '10px' }}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default AttendanceList;
