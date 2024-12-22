import React, { useState, useEffect } from 'react';

const CrudPage = () => {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [records, setRecords] = useState([]);
  const [newRecord, setNewRecord] = useState({});
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Fetch available tables from the backend
  useEffect(() => {
    const fetchTables = async () => {
      const response = await fetch('/api/tables');
      const data = await response.json();
      setTables(data); // Using 'data' to update the state
    };
    fetchTables();
  }, []);

  // Fetch records for the selected table
  useEffect(() => {
    if (selectedTable) {
      const fetchRecords = async () => {
        const response = await fetch(`/api/${selectedTable}`);
        const data = await response.json();
        setRecords(data); // Using 'data' to update the records state
      };
      fetchRecords();
    }
  }, [selectedTable]);

  const handleSelectTable = (tableName) => {
    setSelectedTable(tableName);
    setSelectedRecord(null); // Reset selected record when table changes
  };

  const handleCreate = async () => {
    const response = await fetch(`/api/${selectedTable}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRecord),
    });
    if (response.ok) {
      const data = await response.json();
      alert(data.message);
      setNewRecord({}); // Reset form
      setSelectedRecord(null); // Clear selected record
    }
  };

  const handleDelete = async (id) => {
    const response = await fetch(`/api/${selectedTable}/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      alert('Record deleted');
      setRecords(records.filter((record) => record.id !== id));
    }
  };

  const handleUpdate = async () => {
    const response = await fetch(`/api/${selectedTable}/${selectedRecord.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(selectedRecord),
    });
    if (response.ok) {
      alert('Record updated');
      setSelectedRecord(null); // Clear selected record
    }
  };

  const handleCustomerCreate = async () => {
    const response = await fetch(`/api/customers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRecord), // Assuming newRecord contains customer data (phone number instead of password)
    });
    if (response.ok) {
      alert('Customer created');
      setNewRecord({});
    }
  };

  return (
    <div>
      <h1>CRUD Operations</h1>

      {/* Select a table to work with */}
      <div>
        <h2>Select a Table</h2>
        <select onChange={(e) => handleSelectTable(e.target.value)}>
          <option value="">-- Select Table --</option>
          {tables.map((table) => (
            <option key={table.table_name} value={table.table_name}>
              {table.table_name}
            </option>
          ))}
        </select>
      </div>

      {/* Table Operations */}
      {selectedTable && (
        <div>
          <h2>{selectedTable} Data</h2>

          {/* Display records */}
          <ul>
            {records.map((record) => (
              <li key={record.id}>
                {JSON.stringify(record)}
                <button onClick={() => setSelectedRecord(record)}>Edit</button>
                <button onClick={() => handleDelete(record.id)}>Delete</button>
              </li>
            ))}
          </ul>

          {/* Create New Record Form */}
          <h3>Create New Record</h3>
          {selectedTable !== 'customers' && (
            <div>
              <input
                type="text"
                placeholder="Field 1"
                onChange={(e) => setNewRecord({ ...newRecord, field1: e.target.value })}
              />
              <input
                type="text"
                placeholder="Field 2"
                onChange={(e) => setNewRecord({ ...newRecord, field2: e.target.value })}
              />
              <button onClick={handleCreate}>Create</button>
            </div>
          )}
          {selectedTable === 'customers' && (
            <div>
              <input
                type="text"
                placeholder="Phone Number"
                onChange={(e) => setNewRecord({ ...newRecord, phoneNumber: e.target.value })}
              />
              <button onClick={handleCustomerCreate}>Create Customer</button>
            </div>
          )}

          {/* Update Record Form */}
          {selectedRecord && (
            <div>
              <h3>Edit Record</h3>
              <input
                type="text"
                value={selectedRecord.field1}
                onChange={(e) => setSelectedRecord({ ...selectedRecord, field1: e.target.value })}
              />
              <input
                type="text"
                value={selectedRecord.field2}
                onChange={(e) => setSelectedRecord({ ...selectedRecord, field2: e.target.value })}
              />
              <button onClick={handleUpdate}>Update</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CrudPage;
