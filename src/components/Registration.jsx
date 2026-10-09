import { useRef, useState } from "react";

const ACTIVITIES = [
  { id: "prompt-engineering", label: "Prompt Engineering" },
  { id: "memory-challenge", label: "Memory Challenge" },
  { id: "singing", label: "Singing" },
  { id: "poetry", label: "Poetry" },
  { id: "cosplay", label: "Cosplay" },
  { id: "standup-comedy", label: "Standup Comedy" },
  { id: "tech-debate", label: "Tech Debate" },
  { id: "dance", label: "Dance" },
];

const EMPTY_DETAILS = {
  fullName: "",
  college: "",
  phone: "",
  email: "",
};

export default function Registration() {
  const [details, setDetails] = useState(EMPTY_DETAILS);
  const [selected, setSelected] = useState([]);
  const [message, setMessage] = useState("");
  const firstActivityRef = useRef(null);

  const handleDetailChange = (event) => {
    const { name, value } = event.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const toggleActivity = (label) => {
    setSelected((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label],
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selected.length === 0) {
      setMessage("Please choose at least one stage before submitting.");
      firstActivityRef.current?.focus();
      return;
    }

    // Frontend demo only: this does not send data to a server.
    const name = details.fullName.trim();
    setMessage(
      `Thanks, ${name}! Your demo registration is ready for: ${selected.join(
        ", ",
      )}. Connect a backend to save registrations.`,
    );
  };

  return (
    <section className="registration section-wrap" id="register">
      <div className="registration-intro">
        <p className="eyebrow">YOUR TURN</p>
        <h2>
          Get in
          <br />
          the <span>mix.</span>
        </h2>
        <p>
          Tell us who you are and where you want to show up. Select as many
          activities as you like.
        </p>
        <div className="ways">
          <strong>08</strong>
          <span>
            WAYS TO
            <br />
            MAKE A MARK
          </span>
        </div>
      </div>

      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-heading">
          <div>
            <p className="eyebrow purple">01 / DETAILS</p>
            <h3>Let’s meet.</h3>
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
              value={details.fullName}
              onChange={handleDetailChange}
              required
            />
          </label>
          <label>
            COLLEGE / DEPARTMENT
            <input
              name="college"
              placeholder="Where you're from"
              value={details.college}
              onChange={handleDetailChange}
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
              value={details.phone}
              onChange={handleDetailChange}
              required
            />
          </label>
          <label>
            EMAIL ADDRESS
            <input
              name="email"
              type="email"
              placeholder="you@email.com"
              value={details.email}
              onChange={handleDetailChange}
              required
            />
          </label>
        </div>

        <div className="choose-heading">
          <p className="eyebrow purple">02 / CHOOSE YOUR STAGE</p>
          <span>{selected.length} selected</span>
        </div>

        <div className="activity-grid">
          {ACTIVITIES.map((activity, index) => (
            <label className="activity" key={activity.id}>
              <input
                ref={index === 0 ? firstActivityRef : null}
                type="checkbox"
                name="activities"
                value={activity.label}
                checked={selected.includes(activity.label)}
                onChange={() => toggleActivity(activity.label)}
              />
              <span>
                {String(index + 1).padStart(2, "0")} &nbsp; {activity.label}
              </span>
            </label>
          ))}
        </div>

        <button className="button submit-button" type="submit">
          Submit registration <span>↗</span>
        </button>

        <p className="form-message" role="status">
          {message}
        </p>
      </form>
    </section>
  );
}
