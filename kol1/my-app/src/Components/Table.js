// src/components/Table.js
import React, { useState } from 'react';
import Reservation from './Reservation';
import { useLanguage } from '../contexts/LanguageContext'; // Import the language context

const Table = () => {
  const [tables] = useState([
    { id: 1, section: 'Indoor', number: 2, available: false },
    { id: 2, section: 'Indoor', number: 2, available: true },
    { id: 3, section: 'Outdoor', number: 3, available: true },
    { id: 4, section: 'VIP', number: 4, available: true },
    { id: 5, section: 'Outdoor', number: 5, available: false },
    { id: 6, section: 'Outdoor', number: 9, available: true },
    { id: 7, section: 'Indoor', number: 5, available: true },
    { id: 8, section: 'VIP', number: 2, available: true },
    { id: 9, section: 'VIP', number: 4, available: false },
    { id: 10, section: 'VIP', number: 2, available: true },
  ]);

  const [selectedTable, setSelectedTable] = useState(null);
  const { language } = useLanguage(); // Get the current language from context

  // Translations based on language context
  const translations = {
    en: {
      title: 'Our Tables',
      selectTable: 'Please select an available table to reserve.',
      sections: {
        indoor: 'Indoor',
        outdoor: 'Outdoor',
        vip: 'VIP',
      },
      available: 'Available',
      reserved: 'Reserved',
    },
    es: {
      title: 'Nuestras Mesas',
      selectTable: 'Por favor, seleccione una mesa disponible para reservar.',
      sections: {
        indoor: 'Interior',
        outdoor: 'Exterior',
        vip: 'VIP',
      },
      available: 'Disponible',
      reserved: 'Reservado',
    },
    fr: {
      title: 'Nos Tables',
      selectTable: 'Veuillez sélectionner une table disponible pour réserver.',
      sections: {
        indoor: 'Intérieur',
        outdoor: 'Extérieur',
        vip: 'VIP',
      },
      available: 'Disponible',
      reserved: 'Réservé',
    },
    de: {
      title: 'Unsere Tische',
      selectTable: 'Bitte wählen Sie einen verfügbaren Tisch zur Reservierung aus.',
      sections: {
        indoor: 'Innen',
        outdoor: 'Draußen',
        vip: 'VIP',
      },
      available: 'Verfügbar',
      reserved: 'Reserviert',
    },
    zh: {
      title: '我们的桌子',
      selectTable: '请选择一个可用的桌子进行预订。',
      sections: {
        indoor: '室内',
        outdoor: '户外',
        vip: '贵宾',
      },
      available: '可用',
      reserved: '已预订',
    },
  };

  const handleTableSelect = (table) => {
    if (table.available) {
      setSelectedTable(table); // Set the table if it is available
    } else {
      setSelectedTable(null); // Deselect the table if it is reserved
    }
  };

  const handleClearSelection = () => {
    setSelectedTable(null); // Function to clear the selected table
  };

  return (
    <div className="table-container">
      <h1 className="title">{translations[language].title}</h1>
      <div className="table-sections">
        {['indoor', 'outdoor', 'vip'].map((section, index) => (
          <div key={index} className="table-section">
            <h2>{translations[language].sections[section]}</h2>
            <div className="table-list">
              {tables
                .filter((table) => table.section.toLowerCase() === section)
                .map((table) => (
                  <div
                    key={table.id}
                    className={`table ${table.available ? 'available' : 'reserved'}`}
                    onClick={() => handleTableSelect(table)}
                  >
                    <span>Seats no. {table.number}</span>
                    <span className={`status ${table.available ? 'available' : 'reserved'}`}>
                      {table.available ? translations[language].available : translations[language].reserved}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      <div className="reservation-form">
        {selectedTable ? (
          <Reservation selectedTable={selectedTable} onClear={handleClearSelection} />
        ) : (
          <p>{translations[language].selectTable}</p>
        )}
      </div>
    </div>
  );
};

export default Table;
