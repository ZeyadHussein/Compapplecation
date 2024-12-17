// src/components/table.js
import React, { useState } from 'react';
import Reservation from './Reservationeservation';

const Table = () => {
  // Example table data: You can update this dynamically from an API
  const [tables] = useState([
    { id: 1, section: 'Indoor', number: 1, available: true },
    { id: 2, section: 'Indoor', number: 2, available: false },
    { id: 3, section: 'Outdoor', number: 3, available: true },
    { id: 4, section: 'VIP', number: 4, available: true },
    { id: 5, section: 'Outdoor', number: 5, available: false },
  ]);

  return (
    <div className="table-container">
      <h1 className="title">Our Tables</h1>
      
      <div className="table-sections">
        {['Indoor', 'Outdoor', 'VIP'].map((section, index) => (
          <div key={index} className="table-section">
            <h2>{section} Section</h2>
            <div className="table-list">
              {tables
                .filter(table => table.section === section)
                .map(table => (
                  <div
                    key={table.id}
                    className={`table ${table.available ? 'available' : 'reserved'}`}
                  >
                    <span>Table {table.number}</span>
                    <span className={`status ${table.available ? 'available' : 'reserved'}`}>
                      {table.available ? 'Available' : 'Reserved'}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      <div className="reservation-form">
        <h2>Make a Reservation</h2>
        <Reservation />
      </div>
    </div>
  );
};

export default Table;
