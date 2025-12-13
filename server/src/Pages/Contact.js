import React, { useState } from "react";
import "../Styles/Contact.css";

const ContactNike = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState(""); // feedback message
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setStatus("All fields are required.");
      return;
    }

    setSending(true);

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("Your message has been sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setStatus("Server error. Please try again later.");
    }

    setSending(false);
  };

  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      <p className="contact-subtext">
        Have questions? We're here to help. Reach out and our team will get back to you.
      </p>

      <div className="contact-grid">
        
        {/* Contact Info */}
        <div className="contact-info">
          <div className="info-item">📧 support@nikeclone.com</div>
          <div className="info-item">📞 +961 76738420</div>
          <div className="info-item">📍 LIU, Beirut</div>
        </div>

        {/* Contact Form */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea
              placeholder="Write your message here..."
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>

          <button type="submit" className="contact-btn" disabled={sending}>
            {sending ? "Sending..." : "Send Message"}
          </button>

          {status && <p className="contact-status">{status}</p>}
        </form>
      </div>
    </div>
  );
};

export default ContactNike;
