import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import axios from 'axios';  // Import axios
import { useLanguage } from '../contexts/LanguageContext';

const Reservation = () => {
  const { language } = useLanguage(); // Get current language
  const navigate = useNavigate();  // Initialize navigate

  const [formData, setFormData] = useState({
    cus_id: '', // Customer ID
    table_id: '', // Table ID
    reservation_date: '', // Reservation date
    reservation_time: '', // Reservation time
    guest_no: 2, // Number of guests
  });

  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Form data:', formData); // Log form data to check if it's correct

    try {
      const response = await axios.post('http://localhost:5000/api/addreservation', formData);

      if (response.status === 200) {
        alert(response.data.message);
      } else {
        alert(response.data.message || 'Unexpected response');
      }
    } catch (error) {
      // Check if error.response exists and contains data
      if (error.response) {
        console.error('Error response:', error.response);
        // Check if error.response.data exists and contains message
        if (error.response.data && error.response.data.message) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('An error occurred. Please try again.');
        }
      } else if (error.request) {
        // Request was made but no response received
        console.error('Error request:', error.request);
        setErrorMessage('No response received from server.');
      } else {
        // Something else went wrong
        console.error('Error message:', error.message);
        setErrorMessage('An error occurred while making the reservation. Please try again.');
      }
    }
  };

  const texts = {
    en: {
      title: "Make a Reservation",
      cus_id: "Customer ID",
      table_id: "Table ID",
      reservation_date: "Reservation Date",
      reservation_time: "Reservation Time",
      guest_no: "Number of Guests",
      reserveButton: "Reserve Table",
    },
    es: {
      title: "Hacer una Reserva",
      cus_id: "ID del Cliente",
      table_id: "ID de la Mesa",
      reservation_date: "Fecha de Reserva",
      reservation_time: "Hora de Reserva",
      guest_no: "Número de Personas",
      reserveButton: "Reservar Mesa",
    },
    fr: {
      title: "Faire une Réservation",
      cus_id: "ID du Client",
      table_id: "ID de la Table",
      reservation_date: "Date de Réservation",
      reservation_time: "Heure de Réservation",
      guest_no: "Nombre de Personnes",
      reserveButton: "Réserver la Table",
    },
    de: {
      title: "Reservierung Vornehmen",
      cus_id: "Kunden-ID",
      table_id: "Tisch-ID",
      reservation_date: "Reservierungsdatum",
      reservation_time: "Reservierungszeit",
      guest_no: "Anzahl der Personen",
      reserveButton: "Tisch Reservieren",
    },
    zh: {
      title: "预定",
      cus_id: "客户ID",
      table_id: "桌子ID",
      reservation_date: "预定日期",
      reservation_time: "预定时间",
      guest_no: "人数",
      reserveButton: "预定桌位",
    },
  };

  return (
    <div>
      <h2>{texts[language].title}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>{texts[language].cus_id}:</label>
          <input
            type="text"
            name="cus_id"
            value={formData.cus_id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>{texts[language].table_id}:</label>
          <input
            type="text"
            name="table_id"
            value={formData.table_id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>{texts[language].reservation_date}:</label>
          <input
            type="date"
            name="reservation_date"
            value={formData.reservation_date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>{texts[language].reservation_time}:</label>
          <input
            type="time"
            name="reservation_time"
            value={formData.reservation_time}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>{texts[language].guest_no}:</label>
          <input
            type="number"
            name="guest_no"
            value={formData.guest_no}
            onChange={handleChange}
            min="1"
            max={20}
            required
          />
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error */}
        <button type="submit">{texts[language].reserveButton}</button>
      </form>
    </div>
  );
};

export default Reservation;
