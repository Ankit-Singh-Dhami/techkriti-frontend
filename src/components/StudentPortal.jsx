import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EMPTY = { fullName: "", email: "", rollNo: "", phone: "" };

export default function StudentPortal() {
  const [form, setForm] = useState(EMPTY);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Frontend demo only — no real authentication.
    setMessage("Signing you in…");
    setTimeout(() => navigate("/student-portal/dashboard"), 400);
  };

  return (
    <section className="portal-page section-wrap">
      <div className="portal-page__intro">
        <p className="eyebrow">STUDENT PORTAL</p>
        <h2>
          Tell us who
          <br />
          you <span>are.</span>
        </h2>
        <p className="portal-page__note">
          Enter your details to access your events, pass, and updates for Tech
          Kriti 2026.
        </p>
      </div>

      <form className="registration-form portal-form" onSubmit={handleSubmit}>
        <div className="form-heading">
          <div>
            <p className="eyebrow purple">STUDENT DETAILS</p>
            <h3>Sign in.</h3>
          </div>
          <span className="people-icon" aria-hidden="true">
            ♧
          </span>
        </div>

        <div className="form-grid">
          <label>
            FULL NAME
            <input
              name="fullName"
              placeholder="Your name"
              value={form.fullName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            EMAIL ADDRESS
            <input
              name="email"
              type="email"
              placeholder="you@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            ROLL NUMBER
            <input
              name="rollNo"
              placeholder="e.g. CS21B1042"
              value={form.rollNo}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            PHONE NUMBER
            <input
              name="phone"
              type="tel"
              placeholder="+91 00000 00000"
              pattern="[+0-9 ()-]{8,}"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <button className="button submit-button" type="submit">
          Continue <span>↗</span>
        </button>

        <p className="form-message" role="status">
          {message}
        </p>
      </form>
    </section>
  );
}
