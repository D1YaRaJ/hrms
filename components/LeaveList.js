import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa"; // Icons
import "./LeaveList.css";

const LeaveList = () => {
    const [editIndex, setEditIndex] = useState(null);
    const [editData, setEditData] = useState({});
    const [leaves, setLeaves] = useState([]);
    const [fullLeaves, setFullLeaves] = useState([]); // Store full data separately
    const [searchEID, setSearchEID] = useState("");

    // Fetch leave data
    const fetchLeaves = async () => {
        try {
            const response = await axios.get("http://localhost:5000/leave");
            const formattedData = response.data.map(leave => ({
                ...leave,
                FROM_DATE: formatDate(leave.FROM_DATE),
                TO_DATE: formatDate(leave.TO_DATE)
            }));
            setLeaves(formattedData);
            setFullLeaves(formattedData); // Keep full copy of data
        } catch (error) {
            console.error("Error fetching leave data:", error);
            alert("Failed to fetch leave details");
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, []);

    // Format date (YYYY-MM-DD)
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Handle search by Employee ID
    const handleSearch = () => {
        if (!searchEID.trim()) {
            setLeaves(fullLeaves); // Reset to full list when search is empty
            return;
        }

        const filtered = fullLeaves.filter((leave) =>
            leave.EID.toString().includes(searchEID.trim()) // Partial match search
        );

        setLeaves(filtered);

        if (filtered.length === 0) {
            alert(`No leave records found for Employee ID: ${searchEID}`);
        }
    };

    // Handle delete
    const handleDelete = async (eid, from_date) => {
        if (!window.confirm(`Are you sure you want to delete this leave record?`)) return;

        try {
            await axios.delete(`http://localhost:5000/leave/${eid}/${from_date}`);
            const updatedLeaves = leaves.filter((leave) => !(leave.EID === eid && leave.FROM_DATE === from_date));
            setLeaves(updatedLeaves);
            alert(`Leave record deleted successfully`);
        } catch (error) {
            console.error("Error deleting leave record:", error);
            alert("Failed to delete leave record");
        }
    };

    // Handle edit
    const handleEdit = (index) => {
        setEditIndex(index);
        setEditData({ ...leaves[index] });
    };

    // Handle input change when editing
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    };

    // ✅ FIXED: Handle Update Function
    const handleUpdate = async () => {
        if (!editData) return;
    
        const { EID, FROM_DATE, LTYPE, APPROVAL, NO_OF_DAYS, TO_DATE } = editData;
    
        try {
            await axios.put(`http://localhost:5000/leave/${EID}/${FROM_DATE}`, {
                LTYPE,
                APPROVAL,
                NO_OF_DAYS,
                FROM_DATE,  // ✅ Ensure FROM_DATE is included
                TO_DATE
            });
    
            const updatedLeaves = leaves.map((leave, index) =>
                index === editIndex ? { ...leave, LTYPE, APPROVAL, NO_OF_DAYS, FROM_DATE, TO_DATE } : leave
            );
    
            setLeaves(updatedLeaves);
            setEditIndex(null);
            alert("Leave record updated successfully");
        } catch (error) {
            console.error("Error updating leave record:", error);
            alert("Failed to update leave record");
        }
    };
    

    return (
        <div>
            <h2>Leave List</h2>

            {/* Search Box */}
            <input
                type="text"
                value={searchEID}
                onChange={(e) => setSearchEID(e.target.value)}
                placeholder="Enter Employee ID"
            />
            <button onClick={handleSearch} style={{ marginLeft: "10px" }}>Search</button>

            {/* Leave Records Table */}
            <table border="1" style={{ marginTop: "20px", width: "100%" }}>
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Leave Type</th>
                        <th>Approval</th>
                        <th>No. of Days</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {leaves.length > 0 ? (
                        leaves.map((leave, index) => (
                            <tr key={`${leave.EID}-${leave.FROM_DATE}`}>
                                <td>{leave.EID}</td>
                                <td>
                                    {editIndex === index ? (
                                        <input type="text" name="LTYPE" value={editData.LTYPE} onChange={handleEditChange} />
                                    ) : (
                                        leave.LTYPE
                                    )}
                                </td>
                                <td>
                                    {editIndex === index ? (
                                        <input type="text" name="APPROVAL" value={editData.APPROVAL} onChange={handleEditChange} />
                                    ) : (
                                        leave.APPROVAL
                                    )}
                                </td>
                                <td>
                                    {editIndex === index ? (
                                        <input type="number" name="NO_OF_DAYS" value={editData.NO_OF_DAYS} onChange={handleEditChange} />
                                    ) : (
                                        leave.NO_OF_DAYS
                                    )}
                                </td>
                                <td>{leave.FROM_DATE}</td>
                                <td>
                                    {editIndex === index ? (
                                        <input type="date" name="TO_DATE" value={editData.TO_DATE} onChange={handleEditChange} />
                                    ) : (
                                        leave.TO_DATE
                                    )}
                                </td>
                                <td>
                                    {editIndex === index ? (
                                        <>
                                            <FaSave
                                                style={{ cursor: "pointer", color: "green", marginRight: "10px" }}
                                                title="Save"
                                                onClick={handleUpdate}
                                            />
                                            <FaTimes
                                                style={{ cursor: "pointer", color: "red" }}
                                                title="Cancel"
                                                onClick={() => setEditIndex(null)}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <FaEdit
                                                style={{ cursor: "pointer", color: "blue", marginRight: "10px" }}
                                                title="Edit Leave"
                                                onClick={() => handleEdit(index)}
                                            />
                                            <FaTrash
                                                style={{ cursor: "pointer", color: "red" }}
                                                title="Delete Leave"
                                                onClick={() => handleDelete(leave.EID, leave.FROM_DATE)}
                                            />
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" style={{ textAlign: "center" }}>No leave records found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default LeaveList;
