const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');  // Import the db.js file

const app = express();
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your React app's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
  }));
app.use(bodyParser.json());

const convertToMySQLDate = (dateString) => {
  if (!dateString) return null;
  const [day, month, year] = dateString.split('-');
  return `${year}-${month}-${day}`;
};

// API endpoint to get all employees
app.get('/employees', (req, res) => {
    const sql = 'SELECT * FROM EMPLOYEE';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            // Convert dates to yyyy-mm-dd format before sending to the frontend
            const formattedResults = results.map(employee => ({
                ...employee,
                DOB: employee.DOB.toISOString().split('T')[0], // Convert to yyyy-mm-dd
                DATE_OF_JOIN: employee.DATE_OF_JOIN.toISOString().split('T')[0], // Convert to yyyy-mm-dd
                PPROFEXP_FROM: employee.PPROFEXP_FROM.toISOString().split('T')[0], // Convert to yyyy-mm-dd
                PPROFEXP_TO: employee.PPROFEXP_TO.toISOString().split('T')[0], // Convert to yyyy-mm-dd
            }));
            res.json(formattedResults);
        }
    });
});
// API endpoint to add a new employee
app.post('/add-employee', (req, res) => {
    console.log(req.body); // Log the received data

    // Convert dates from dd-mm-yyyy to yyyy-mm-dd
    const formattedData = {
        ...req.body,
        DOB: convertToMySQLDate(req.body.DOB),
        DATE_OF_JOIN: convertToMySQLDate(req.body.DATE_OF_JOIN),
        PPROFEXP_FROM: convertToMySQLDate(req.body.PPROFEXP_FROM),
        PPROFEXP_TO: convertToMySQLDate(req.body.PPROFEXP_TO),
    };

    const sql = 'INSERT INTO EMPLOYEE SET ?';
    db.query(sql, formattedData, (err, result) => {
        if (err) {
            console.error(err); // Log SQL error
            return res.status(500).send(err);
        }
        res.json({ message: 'Employee added successfully', id: result.insertId });
    });
});

// API endpoint to delete an employee
app.delete('/employees/:eid', (req, res) => {
    const { eid } = req.params;
    const sqlDelete = 'DELETE FROM EMPLOYEE WHERE EID = ?';
    db.query(sqlDelete, [eid], (err, result) => {
        if (err) {
            console.error('Error deleting employee:', err);
            return res.status(500).send({ message: 'Failed to delete employee', error: err.message });
        }
        res.status(200).json({ message: 'Employee and related records deleted successfully' });
    });
});

// API endpoint to update an employee
app.put('/employees/:eid', (req, res) => {
    const { eid } = req.params;

    // Convert dates from dd-mm-yyyy to yyyy-mm-dd
    const formattedData = {
        ...req.body,
        DOB: convertToMySQLDate(req.body.DOB),
        DATE_OF_JOIN: convertToMySQLDate(req.body.DATE_OF_JOIN),
        PPROFEXP_FROM: convertToMySQLDate(req.body.PPROFEXP_FROM),
        PPROFEXP_TO: convertToMySQLDate(req.body.PPROFEXP_TO),
    };

    const sql = 'UPDATE EMPLOYEE SET ? WHERE EID = ?';
    db.query(sql, [formattedData, eid], (err, result) => {
        if (err) {
            console.error('Error updating employee:', err);
            return res.status(500).send({ message: 'Failed to update employee', error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json({ message: 'Employee updated successfully' });
    });
});


//API to display all department
app.get('/departments', (req, res) => {
    const sql = 'SELECT * FROM DEPARTMENT';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching departments:', err);
            res.status(500).send('Error fetching departments');
        } else {
            res.json(results);
        }
    });
});
//API to add department
app.post('/add-department', (req, res) => {
    const { DID, DNAME, DHEAD } = req.body;  // Ensure correct structure of data
    const sql = 'INSERT INTO DEPARTMENT (DID, DNAME, DHEAD) VALUES (?, ?, ?)';
    const values = [DID, DNAME, DHEAD];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error adding department:', err); // Log the error
            res.status(500).send(err);
        } else {
            res.json({ message: 'Department added successfully', id: result.insertId });
        }
    });
});
//API to delete a department
app.delete('/departmentS/:did', (req, res) => {
    const { did } = req.params;
    const sqlDelete = 'DELETE FROM DEPARTMENT WHERE DID = ?';
    db.query(sqlDelete, [did], (err, result) => {
      if (err) {
        console.error('Error deleting department:', err);
        return res.status(500).send({ message: 'Failed to delete department', error: err.message });
      }
      res.status(200).json({ message: 'Department deleted successfully' });
    });
  });

//API to search department
app.get('/departments/search', (req, res) => {
    const { DID, DNAME } = req.query;
    let sql = 'SELECT * FROM DEPARTMENT WHERE 1';
    let values = [];
    if (DID) {
        sql += ' AND DID = ?';
        values.push(DID);
    }
    if (DNAME) {
        sql += ' AND DNAME = ?';
        values.push(DNAME);
    }
    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error searching for department:', err);
            return res.status(500).send('Error searching for department');
        }
        res.json(results);
    });
});
//API to Update department details
app.put('/departments/:did', (req, res) => {
    const { did } = req.params;
    const { DNAME, DHEAD } = req.body;
    const sql = 'UPDATE DEPARTMENT SET DNAME = ?, DHEAD = ? WHERE DID = ?';
    const values = [DNAME, DHEAD, did];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating department:', err);
            return res.status(500).send('Error updating department');
        }
        if (result.affectedRows > 0) {
            res.send('Department updated successfully');
        } else {
            res.status(404).send('Department not found');
        }
    });
});

//API to get attendance list
app.get('/attendance', (req, res) => {
    const sql = 'SELECT * FROM attendance';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching attendance:', err);
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});
//API to add attendance
app.post('/add-attendance', (req, res) => {
    const { EID, A_DATE, STATUS, LOGIN, LOGOUT } = req.body;
    const sql = 'INSERT INTO ATTENDANCE (EID, A_DATE, STATUS, LOGIN, LOGOUT) VALUES (?, ?, ?, ?, ?)'; 
    const values = [EID, A_DATE, STATUS, LOGIN, LOGOUT];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error adding attendance:', err.code); 
            res.status(500).send(`Error adding attendance: ${err.message}`);
        } else {
            res.json({ message: 'Attendance added successfully', id: result.insertId });
        }
    });
});
//API to delete attendance
app.delete('/attendance/:eid', (req, res) => {
    const { eid } = req.params;
    const sqlDelete = 'DELETE FROM ATTENDANCE WHERE EID = ?';
    db.query(sqlDelete, [eid], (err, result) => {
        if (err) {
            console.error('Error deleting attendance record:', err);
            return res.status(500).send({ message: 'Failed to delete attendance record', error: err.message });
        }
        res.status(200).json({ message: 'Attendance record deleted successfully' });
    });
});

//API to add qualifications
app.post('/add-qualification', (req, res) => {
    console.log(req.body);  // Log the received data
    const { EID, INSTITUTION, PERCENTAGE, SPECIALIZATION, YOG } = req.body;
    const sql = 'INSERT INTO QUALIFICATION (EID, INSTITUTION, PERCENTAGE, SPECIALIZATION, YOG) VALUES (?, ?, ?, ?, ?)';
    const values = [EID, INSTITUTION, PERCENTAGE, SPECIALIZATION, YOG];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);  // Log SQL error
            return res.status(500).send(err);
        }
        res.json({ message: 'Qualification added successfully', id: result.insertId });
    });
});
//API to View qualifications
app.get('/qualifications', (req, res) => {
    const sql = 'SELECT * FROM QUALIFICATION';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

app.get('/qualifications/:eid', (req, res) => {
    const { eid } = req.params;
    db.query('CALL FilterQualificationByEID(?)', [eid], (err, results) => {
        if (err) {
            console.error('Error executing procedure:', err);
            return res.status(500).send('Error fetching family details');
        }
        if (results.length > 0 && results[0].length > 0) {
            res.json(results[0]); 
        } else {
            res.status(404).send('No qualification details found for the given EID');
        }
    });
});

app.put("/qualifications", async (req, res) => {
    const {
      oldEID,
      oldINSTITUTION,
      oldPERCENTAGE,
      oldSPECIALIZATION,
      oldYOG,
      newINSTITUTION,
      newPERCENTAGE,
      newSPECIALIZATION,
      newYOG
    } = req.body;
  
    try {
      const updateSQL = `
        UPDATE QUALIFICATION
        SET INSTITUTION = ?, PERCENTAGE = ?, SPECIALIZATION = ?, YOG = ?
        WHERE EID = ? AND INSTITUTION = ? AND PERCENTAGE = ? AND SPECIALIZATION = ? AND YOG = ?;
      `;
  
      const [result] = await db.promise().query(updateSQL, [
        newINSTITUTION,
        newPERCENTAGE,
        newSPECIALIZATION,
        newYOG,
        oldEID,
        oldINSTITUTION,
        oldPERCENTAGE,
        oldSPECIALIZATION,
        oldYOG
      ]);
  
      if (result.affectedRows > 0) {
        res.json({ message: "Qualification details updated successfully" });
      } else {
        res.status(404).json({ error: "Record not found" });
      }
    } catch (error) {
      console.error("Error updating qualification details:", error);
      res.status(500).json({ error: "Failed to update qualification details" });
    }
  });

//API to delete qualifications
app.delete('/qualifications/:eid', (req, res) => {
    const { eid } = req.params;
    const sqlDelete = 'DELETE FROM QUALIFICATION WHERE EID = ?';
    db.query(sqlDelete, [eid], (err, result) => {
      if (err) {
        console.error('Error deleting  record:', err);
        return res.status(500).send({ message: 'Failed to delete record', error: err.message });
      }
      res.status(200).json({ message: ' record deleted successfully' });
    });
  });


// APIto add employee account details
app.post('/add-employee-details', (req, res) => {
    console.log(req.body);  // Log the received data
    const { EID, BIOMETRIC_CARD_NO, AADHAR, BANK_ACC, PAN } = req.body;
    const sql = 'INSERT INTO EMPLOYEEDETAILS (EID, BIOMETRIC_CARD_NO, AADHAR, BANK_ACC, PAN) VALUES (?, ?, ?, ?, ?)';
    const values = [EID, BIOMETRIC_CARD_NO, AADHAR, BANK_ACC, PAN];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);  // Log SQL error
            return res.status(500).send(err);
        }
        res.json({ message: 'Employee details added successfully', id: result.insertId });
    });
});
//API to View employee account details
app.get('/employee-accounts', (req, res) => {
    const sql = 'SELECT * FROM EMPLOYEEDETAILS';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

app.get('/employee-accounts/:eid', (req, res) => {
    const { eid } = req.params;
    const sql = 'SELECT * FROM EMPLOYEEDETAILS WHERE EID = ?';
    db.query(sql, [eid], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching employee account details');
        } else {
            res.json(results);
        }
    });
});

app.put('/employee-accounts/:eid', (req, res) => {
    const { eid } = req.params;
    const { BIOMETRIC_CARD_NO, AADHAR, BANK_ACC, PAN } = req.body;
    const query = `
        UPDATE EMPLOYEEDETAILS
        SET BIOMETRIC_CARD_NO = ?, AADHAR = ?, BANK_ACC = ?, PAN = ?
        WHERE EID = ?
    `;
    db.query(query, [BIOMETRIC_CARD_NO, AADHAR, BANK_ACC, PAN, eid], (err, results) => {
        if (err) {
            console.error('Error updating employee account details:', err);
            return res.status(500).send('Failed to update employee account details');
        }
        if (results.affectedRows > 0) {
            res.send('Employee account details updated successfully');
        } else {
            res.status(404).send('No employee account details found for the given EID');
        }
    });
});

//API to delete employee account details
app.delete('/employee-accounts/:eid', (req, res) => {
    const { eid } = req.params; 
    const sqlDelete = 'DELETE FROM EMPLOYEEDETAILS WHERE EID = ?';
    db.query(sqlDelete, [eid], (err, result) => {
      if (err) {
        console.error('Error deleting  record:', err);
        return res.status(500).send({ message: 'Failed to delete record', error: err.message });
      }
      res.status(200).json({ message: ' record deleted successfully' });
    });
  });

//API to add salary details
app.post('/add-salary', (req, res) => {
    const { EID, BASIC_SAL, AGP, ESI, LOAN, IT } = req.body;
    const sql = 'INSERT INTO SALARY (EID, BASIC_SAL, AGP, ESI, LOAN, IT) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [EID, BASIC_SAL, AGP, ESI, LOAN, IT], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error adding salary details');
        } else {res.status(200).send('Salary details added successfully');}
    });
});
//API to View Salary Details
app.get('/salaries', (req, res) => {
    const sql = 'SELECT * FROM SALARY';
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching all salary details');
        } else {res.status(200).json(results); }
    });
});
//API to get salary details for specific employee
app.get('/salaries/:eid', (req, res) => {
    const { eid } = req.params;
    const sql = 'SELECT * FROM SALARY WHERE EID = ?';
    db.query(sql, [eid], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching salary details for the employee');
        } else {res.status(200).json(results);}
    });
});
//API to delete salary details
app.delete('/salaries/:eid', (req, res) => {
    const { eid } = req.params; 
    const sqlDelete = 'DELETE FROM SALARY WHERE EID = ?';
    db.query(sqlDelete, [eid], (err, result) => {
      if (err) {
        console.error('Error deleting  record:', err);
        return res.status(500).send({ message: 'Failed to delete record', error: err.message });}
      res.status(200).json({ message: ' record deleted successfully' });
    });
});

// API to add family details
app.post('/add-family', (req, res) => {
    let { EID, FNAME, F_DOB, MNAME, M_DOB } = req.body;
    const formatDate = (date) => {
        const [day, month, year] = date.split('-');
        return `${year}-${month}-${day}`;
    };
    try {
        F_DOB = formatDate(F_DOB); 
        M_DOB = formatDate(M_DOB); 
    } catch (error) {
        return res.status(400).send('Invalid date format. Use DD-MM-YYYY.');
    }
    const sql = 'INSERT INTO FAMILY (EID, FNAME, F_DOB, MNAME, M_DOB) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [EID, FNAME, F_DOB, MNAME, M_DOB], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error adding family details');
        } else {
            res.status(200).send('Family details added successfully');
        }
    });
});
//API to View Family Details
app.get('/families', (req, res) => {
    const sql = 'SELECT * FROM FAMILY';
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching family details');
        } else {
            const formattedResults = results.map(family => ({
                ...family,
                F_DOB: family.F_DOB.toISOString().split('T')[0], // Convert to yyyy-mm-dd
                M_DOB: family.M_DOB.toISOString().split('T')[0]
            }));
            res.json(formattedResults);
        }
    });
});

//API to get family details based on EID
app.get('/families/:eid', (req, res) => {
    const { eid } = req.params;
    db.query('CALL FilterFamilyByEID(?)', [eid], (err, results) => {
        if (err) {
            console.error('Error executing procedure:', err);
            return res.status(500).send('Error fetching family details');
        }
        if (results.length > 0 && results[0].length > 0) {
            res.json(results[0]); 
        } else {
            res.status(404).send('No family details found for the given EID');
        }
    });
});
//API to update family details
app.put('/families/:eid', (req, res) => {
    const { eid } = req.params;
    const { FNAME, F_DOB, MNAME, M_DOB } = req.body;
    const formattedFDOB = new Date(F_DOB).toISOString().split('T')[0];
    const formattedMDOB = new Date(M_DOB).toISOString().split('T')[0];
    const query = `
        UPDATE family
        SET FNAME = ?, F_DOB = ?, MNAME = ?, M_DOB = ?
        WHERE EID = ?
    `;
    db.query(query, [FNAME, formattedFDOB, MNAME, formattedMDOB, eid], (err, results) => {
        if (err) {
            console.error('Error updating family details:', err);
            return res.status(500).send('Failed to update family details');
        }
        if (results.affectedRows > 0) {
            res.send('Family details updated successfully');
        } else {
            res.status(404).send('No family details found for the given EID');
        }
    });
});

//API to delete family detail
app.delete('/families/:eid', (req, res) => {
    const { eid } = req.params;
    const sqlDelete = 'DELETE FROM FAMILY WHERE EID = ?';
    db.query(sqlDelete, [eid], (err, result) => {
        if (err) {
            console.error('Error deleting family details:', err);
            return res.status(500).send({ message: 'Failed to delete family details', error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ message: 'Family details not found' });
        }
        res.status(200).json({ message: 'Family details deleted successfully' });
    });
});

//API to get all leave entries
app.get('/leave', (req, res) => {
    const sql = 'SELECT * FROM LEAVES';
    db.query(sql, (err, results) => {
      if (err) { res.status(500).send(err);} 
      else { res.json(results);}
    });
});
// API to add a new leave entry
  app.post('/add-leave', (req, res) => {
    console.log(req.body); 
    const { EID, LTYPE, APPROVAL, NO_OF_DAYS, FROM_DATE, TO_DATE } = req.body;
    const values = [EID, LTYPE, APPROVAL, NO_OF_DAYS, FROM_DATE, TO_DATE];
    const sql = 'INSERT INTO LEAVES (EID, LTYPE, APPROVAL, NO_OF_DAYS, FROM_DATE, TO_DATE) VALUES (?, ?, ?, ?, ?, ?)';
    console.log("SQL Query:", sql); 
    console.log("Values:", values);
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error(err); 
        return res.status(500).send(err);}
      res.json({ message: 'Leave added successfully', id: result.insertId });
    });
});
//API to delete a leave entry
app.delete('/leave/:eid', (req, res) => {
    const { eid } = req.params;
    const sqlDelete = 'DELETE FROM LEAVES WHERE EID = ?';
    db.query(sqlDelete, [eid], (err, result) => {
      if (err) {
        console.error('Error deleting leave record:', err);
        return res.status(500).send({ message: 'Failed to delete leave record', error: err.message });}
      res.status(200).json({ message: 'Leave record deleted successfully' });
    });
});
  
// API to get all payroll entries
app.get('/payroll', (req, res) => {
    const { eid } = req.query;
    let sql = 'SELECT * FROM PAYROLL';
    let values = [];
    if (eid) {
        sql += ' WHERE EID = ?';
        values = [eid];}
    db.query(sql, values, (err, results) => {
        if (err) {res.status(500).send(err);}
         else { res.json(results);}
    });
});
// API to add a new payroll entry
app.post('/add-payroll', (req, res) => {
    console.log(req.body); // Log the received data
    const { EID, P_DATE, NO_OF_DAYS, PF, VA } = req.body;
    const sql = 'INSERT INTO PAYROLL (EID, P_DATE, NO_OF_DAYS, PF, VA) VALUES (?, ?, ?, ?, ?)';
    const values = [EID, P_DATE, NO_OF_DAYS, PF, VA];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error(err); // Log SQL error
        return res.status(500).send(err);}
      res.json({ message: 'Payroll added successfully', id: result.insertId });
    });
});
// API to delete a payroll entry
app.delete('/payroll/:eid', (req, res) => {
    const { eid } = req.params;
    const sqlDelete = 'DELETE FROM PAYROLL WHERE EID = ?';
    db.query(sqlDelete, [eid], (err, result) => {
      if (err) {
        console.error('Error deleting payroll record:', err);
        return res.status(500).send({ message: 'Failed to delete payroll record', error: err.message });}
      res.status(200).json({ message: 'payroll record deleted successfully' });
    });
  });

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
