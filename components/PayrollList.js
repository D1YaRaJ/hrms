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

    const columnAliases = {
        EID: "Employee ID",
        P_DATE: "Payroll Date",
        NO_OF_DAYS: "No. of Days Worked",
        PF: "Provident Fund (PF)",
        VA: "Vocation Allowance (VA)",
    };

    const fetchPayrolls = async () => {
        try {
            const response = await axios.get('http://localhost:5000/payroll');
            setPayrolls(response.data);
        } catch (error) {
            console.error('Error fetching payroll data:', error);
            alert('Failed to fetch payroll details');
        }
    };

    const handleColumnToggle = (column) => {
        setColumns({ ...columns, [column]: !columns[column] });
    };

    useEffect(() => {
        fetchPayrolls();
    }, []);

    return (
        <div>
            <h2>Payroll List</h2>

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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PayrollList;