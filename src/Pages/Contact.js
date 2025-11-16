import React, { useState } from "react";
import "../Styles/Contact.css";

const ContactNike = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    
  };

  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      <p className="contact-subtext">
        Have questions? We're here to help. Reach out and our team will get back to you.
      </p>

      <div className="contact-grid">
        <div className="contact-info">
          <div className="info-item">📧 support@nikeclone.com</div>
          <div className="info-item">📞 +961 76738420</div>
          <div className="info-item">📍 LIU, Beirut</div>
        </div>

       
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input 
              type="text" 
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)} 
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea
              placeholder="Write your message here..."
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>

          <button type="submit" className="contact-btn">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactNike;
