import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    message: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', message: '' });
  };

  return (
    <section>
      <h2>Contact Us</h2>

      <form id="contactForm" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label><br />
        <input 
          type="text" 
          id="name" 
          value={formData.name}
          onChange={handleChange}
          required 
        /><br /><br />

        <label htmlFor="message">Message:</label><br />
        <textarea 
          id="message" 
          value={formData.message}
          onChange={handleChange}
          required 
        ></textarea><br /><br />

        <button type="submit" className="btn">Submit</button>
      </form>
    </section>
  );
}
