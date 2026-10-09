import { useMemo, useRef, useState } from "react";

/* Tabs — each tier has its own fields and price. */
const TIERS = [
  {
    id: "dseu",
    label: "DSEU Student",
    price: 50,
    blurb: "For current DSEU students",
    fields: ["rollNo", "semester", "section", "campus"],
  },
  {
    id: "outsider",
    label: "Outsider",
    price: 100,
    blurb: "For students from other institutes",
    fields: ["college"],
  },
];

const ACTIVITIES = [
  { id: "front-end", label: "Front End" },
  { id: "prompt-engineering", label: "Prompt Engineering" },
  { id: "memory-challenge", label: "Memory Challenge" },
  { id: "singing", label: "Singing" },
  { id: "poetry", label: "Poetry" },
  { id: "cosplay", label: "Cosplay" },
  { id: "standup-comedy", label: "Stand-up Comedy" },
  { id: "tech-debate", label: "Tech Debate" },
  { id: "dance", label: "Dance" },
  { id: "carrom", label: "Carrom" },
  { id: "viewers-only", label: "Viewers Only" },
];

const SEMESTERS = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];
const SECTIONS = ["A", "B", "C", "D"];

const EMPTY = {
  fullName: "",
  rollNo: "",
  semester: "",
  section: "",
  campus: "DSEU Rajokri Campus",
  college: "",
  phone: "",
  email: "",
};

/* Simple QR-looking placeholder — swap for a real generated QR when you have one. */
function PaymentQr({ amount }) {
  const size = 15;
  const cells = [];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const inFinder =
        (x < 5 && y < 5) ||
        (x >= size - 5 && y < 5) ||
        (x < 5 && y >= size - 5);
      if (inFinder) continue;
      if ((x * 3 + y * 5 + x * y) % 7 < 3) {
        cells.push(
          <rect
            key={`c-${x}-${y}`}
            x={x * 6 + 6}
            y={y * 6 + 6}
            width="5"
            height="5"
          />,
        );
      }
    }
  }
  return (
    <svg viewBox="0 0 96 96" className="payment-qr__svg" aria-hidden="true">
      <rect x="3" y="3" width="27" height="27" rx="3" />
      <rect x="7" y="7" width="19" height="19" rx="2" fill="#ffffff" />
      <rect x="11" y="11" width="11" height="11" rx="1" />

      <rect x="66" y="3" width="27" height="27" rx="3" />
      <rect x="70" y="7" width="19" height="19" rx="2" fill="#ffffff" />
      <rect x="74" y="11" width="11" height="11" rx="1" />

      <rect x="3" y="66" width="27" height="27" rx="3" />
      <rect x="7" y="70" width="19" height="19" rx="2" fill="#ffffff" />
      <rect x="11" y="74" width="11" height="11" rx="1" />
      {cells}
      <title>{`Pay ₹${amount} with UPI`}</title>
    </svg>
  );
}

export default function Registration() {
  const [tierId, setTierId] = useState("dseu");
  const [details, setDetails] = useState(EMPTY);
  const [selected, setSelected] = useState([]);
  const [proof, setProof] = useState(null);
  const [message, setMessage] = useState("");
  const firstActivityRef = useRef(null);
  const fileRef = useRef(null);

  const tier = useMemo(() => TIERS.find((t) => t.id === tierId), [tierId]);

  const switchTier = (id) => {
    setTierId(id);
    setMessage("");
    setProof(null);
    if (fileRef.current) fileRef.current.value = "";
    // Keep shared fields, reset tier-specific ones
    setDetails((prev) => ({
      ...prev,
      rollNo: "",
      semester: "",
      section: "",
      campus: "DSEU Rajokri Campus",
      college: "",
    }));
  };

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

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] ?? null;
    setProof(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selected.length === 0) {
      setMessage("Please select at least one activity before submitting.");
      firstActivityRef.current?.focus();
      return;
    }
    if (!proof) {
      setMessage("Please upload your payment screenshot.");
      return;
    }

    // Frontend demo only — no data is sent anywhere.
    setMessage(
      `Thanks, ${details.fullName.trim()}! Your ₹${tier.price} ${tier.label} pass is ready for: ${selected.join(
        ", ",
      )}. Demo only — connect a backend to save registrations and verify payment.`,
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
          Pick your pass, tell us who you are, choose your activities, and
          upload your payment proof.
        </p>
        <div className="ways">
          <strong>11</strong>
          <span>
            ACTIVITIES TO
            <br />
            CHOOSE FROM
          </span>
        </div>
      </div>

      <form className="registration-form" onSubmit={handleSubmit}>
        {/* ---------- TIER TABS ---------- */}
        <div className="tier-tabs" role="tablist" aria-label="Choose your pass">
          {TIERS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tierId === t.id}
              className={`tier-tab${tierId === t.id ? " is-active" : ""}`}
              onClick={() => switchTier(t.id)}
            >
              <span className="tier-tab__label">{t.label}</span>
              <span className="tier-tab__price">₹{t.price}</span>
            </button>
          ))}
        </div>

        <div className="form-heading">
          <div>
            <p className="eyebrow purple">01 / DETAILS</p>
            <h3>
              {tier.label} · ₹{tier.price}
            </h3>
          </div>
          <span className="people-icon" aria-hidden="true">
            ♧
          </span>
        </div>

        <div className="form-grid">
          <label>
            NAME
            <input
              name="fullName"
              placeholder="Your full name"
              value={details.fullName}
              onChange={handleDetailChange}
              required
            />
          </label>

          {tier.fields.includes("rollNo") && (
            <label>
              ROLL NUMBER
              <input
                name="rollNo"
                placeholder="261111006000"
                value={details.rollNo}
                onChange={handleDetailChange}
                required
              />
            </label>
          )}

          {tier.fields.includes("college") && (
            <label>
              COLLEGE / SCHOOL / ORGANIZATION
              <input
                name="college"
                placeholder="Enter your institute or city"
                value={details.college}
                onChange={handleDetailChange}
                required
              />
            </label>
          )}

          {tier.fields.includes("semester") && (
            <label>
              SEMESTER
              <select
                name="semester"
                value={details.semester}
                onChange={handleDetailChange}
                required
              >
                <option value="" disabled>
                  Select semester
                </option>
                {SEMESTERS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
          )}

          {tier.fields.includes("section") && (
            <label>
              SECTION
              <select
                name="section"
                value={details.section}
                onChange={handleDetailChange}
                required
              >
                <option value="" disabled>
                  Select section
                </option>
                {SECTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
          )}

          {tier.fields.includes("campus") && (
            <label>
              CAMPUS
              <input
                name="campus"
                placeholder="DSEU Rajokri Campus"
                value={details.campus}
                onChange={handleDetailChange}
                required
              />
            </label>
          )}

          <label>
            PHONE NUMBER
            <input
              name="phone"
              type="tel"
              placeholder="10 digit number"
              pattern="[0-9]{10}"
              maxLength={10}
              value={details.phone}
              onChange={handleDetailChange}
              required
            />
          </label>

          <label>
            EMAIL
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={details.email}
              onChange={handleDetailChange}
              required
            />
          </label>
        </div>

        {/* ---------- ACTIVITIES ---------- */}
        <div className="choose-heading">
          <p className="eyebrow purple">02 / SELECT ACTIVITIES</p>
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
              <span>{activity.label}</span>
            </label>
          ))}
        </div>

        {/* ---------- PAYMENT ---------- */}
        <div className="choose-heading">
          <p className="eyebrow purple">03 / PAYMENT</p>
          <span>₹{tier.price}</span>
        </div>

        <div className="payment-block">
          <h4 className="payment-block__title">
            Complete payment &amp; upload proof
          </h4>
          <p className="payment-block__note">
            Use the payment QR below, complete your payment, then upload a
            screenshot. Payment proof is saved in this browser in preview mode.
            Connect the shared backend before real event use.
          </p>

          <div className="payment-qr">
            <span className="payment-qr__label">Payment QR</span>
            <div className="payment-qr__frame">
              <PaymentQr amount={tier.price} />
            </div>
            <span className="payment-qr__caption">
              Pay ₹{tier.price} with UPI app
            </span>
          </div>

          <label className="upload">
            <span className="upload__label">Payment screenshot</span>
            <span className="upload__hint">
              {proof ? "Change file" : "No file chosen"}
            </span>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
            <span className="upload__status">
              {proof ? proof.name : "No screenshot selected"}
            </span>
          </label>
        </div>

        <button className="button submit-button" type="submit">
          Submit &amp; Generate Pass <span>↗</span>
        </button>

        <p className="form-message" role="status">
          {message}
        </p>

        <p className="payment-block__disclaimer">
          For a live event, payment should be verified server-side. The included
          Apps Script backend starter in this package is designed for Google
          Sheets + Drive.
        </p>
      </form>
    </section>
  );
}
