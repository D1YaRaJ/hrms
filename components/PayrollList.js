import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PayrollList.css'; // Make sure to create or adjust your CSS for the payroll list

const PayrollList = () => {
    const [payrolls, setPayrolls] = useState([]);
    const [columns, setColumns] = useState({
        EID: true,
        P_DATE: true,
        NO_OF_DAYS: true,
        PF: true,
        VA: true,
    });
    const [eid, setEid] = useState('');
    const columnAliases = {
        EID: "Employee ID",
        P_DATE: "Payroll Date",
        NO_OF_DAYS: "No. of Days Worked",
        PF: "Provident Fund (PF)",
        VA: "Vocation Allowance (VA)",
    };

    const fetchPayrolls = async (eid = '') => {
        try {
            const response = await axios.get('http://localhost:5000/payroll',{
                params: { eid }
            });
            setPayrolls(response.data);
        } catch (error) {
            console.error('Error fetching payroll data:', error);
            alert('Failed to fetch payroll details');
        }
    };

    const handleColumnToggle = (column) => {
        setColumns({ ...columns, [column]: !columns[column] });
    };

    const handleEidChange = (e) => {
        setEid(e.target.value);
    };

    const handleSearch = () => {
        fetchPayrolls(eid);
    };

    const handleDelete = async (eid) => {
        try {
            // Send DELETE request to backend
            await axios.delete(`http://localhost:5000/payroll/${eid}`);
            
            // Update the UI to reflect the deletion
            const updatedPayrolls = payrolls.filter(
                (payroll) => payroll.EID !== eid
            );
            setPayrolls(updatedPayrolls);

            alert('Payroll entry deleted successfully');
        } catch (error) {
            console.error('Error deleting payroll entry:', error);
            alert('Failed to delete payroll entry');
        }
    };

    useEffect(() => {
        fetchPayrolls();
    }, []);

    return (
        <div>
            <h2>Payroll List</h2>
            <div className="search-bar">
                <input
                    type="number"
                    value={eid}
                    onChange={handleEidChange}
                    placeholder="Search by Employee ID"
                />
                <button onClick={handleSearch}>Search</button>
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
                    {payrolls.map((payroll) => (
                        <tr key={payroll.EID + payroll.P_DATE}>
                            {Object.keys(columns).map(
                                (col) =>
                                    columns[col] && <td key={col}>{payroll[col] || 'N/A'}</td>
                            )}
                            <td>
                                <button onClick={() => handleDelete(payroll.EID)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PayrollList;
