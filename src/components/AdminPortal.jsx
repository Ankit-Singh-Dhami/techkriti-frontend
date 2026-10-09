import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EMPTY = { username: "", password: "" };

export default function AdminPortal() {
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
    setTimeout(() => navigate("/admin/dashboard"), 400);
  };

  return (
    <section className="portal-page section-wrap">
      <div className="portal-page__intro">
        <p className="eyebrow">ADMIN ACCESS</p>
        <h2>
          Welcome
          <br />
          back, <span>organizer.</span>
        </h2>
        <p className="portal-page__note">
          Sign in to review registrations, manage events, and publish
          announcements for Tech Kriti 2026.
        </p>
      </div>

      <form className="registration-form portal-form" onSubmit={handleSubmit}>
        <div className="form-heading">
          <div>
            <p className="eyebrow purple">ADMIN LOGIN</p>
            <h3>Sign in.</h3>
          </div>
          <span className="people-icon" aria-hidden="true">
            ⌘
          </span>
        </div>

        <div className="form-grid">
          <label>
            USERNAME
            <input
              name="username"
              type="text"
              placeholder="Enter admin username"
              value={form.username}
              onChange={handleChange}
              autoComplete="username"
              required
            />
          </label>
          <label>
            PASSWORD
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />
          </label>
        </div>

        <button className="button submit-button" type="submit">
          Sign in <span>↗</span>
        </button>

        <p className="form-message" role="status">
          {message}
        </p>
      </form>
    </section>
  );
}
