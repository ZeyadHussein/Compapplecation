// src/components/Reservation.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { useLanguage } from '../contexts/LanguageContext';

const Reservation = () => {
  const { language } = useLanguage(); // Get current language
  const navigate = useNavigate();  // Initialize navigate

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    people: 2,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Reservation submitted:', formData);
    
    // After submitting the form, navigate to the Table page
    navigate('/table');
  };

  const texts = {
    en: {
      title: "Make a Reservation",
      name: "Name",
      email: "Email",
      phone: "Phone",
      date: "Date",
      time: "Time",
      people: "Number of People",
      reserveButton: "Reserve Table",
    },
    es: {
      title: "Hacer una Reserva",
      name: "Nombre",
      email: "Correo Electrónico",
      phone: "Teléfono",
      date: "Fecha",
      time: "Hora",
      people: "Número de Personas",
      reserveButton: "Reservar Mesa",
    },
    fr: {
      title: "Faire une Réservation",
      name: "Nom",
      email: "Email",
      phone: "Téléphone",
      date: "Date",
      time: "Heure",
      people: "Nombre de Personnes",
      reserveButton: "Réserver la Table",
    },
    de: {
      title: "Reservierung Vornehmen",
      name: "Name",
      email: "E-Mail",
      phone: "Telefon",
      date: "Datum",
      time: "Uhrzeit",
      people: "Anzahl der Personen",
      reserveButton: "Tisch Reservieren",
    },
    zh: {
      title: "预定",
      name: "姓名",
      email: "电子邮件",
      phone: "电话",
      date: "日期",
      time: "时间",
      people: "人数",
      reserveButton: "预定桌位",
    },
  };

  return (
    <div>
      <h2>{texts[language].title}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>{texts[language].name}:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>{texts[language].email}:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>{texts[language].phone}:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>{texts[language].date}:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>{texts[language].time}:</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>{texts[language].people}:</label>
          <input
            type="number"
            name="people"
            value={formData.people}
            onChange={handleChange}
            min="1"
            max={20}
            required
          />
        </div>
        <button type="submit">{texts[language].reserveButton}</button>
      </form>
    </div>
  );
};

export default Reservation;

