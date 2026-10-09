import { Link } from "react-router-dom";

const STUDENT = {
  name: "Riya Sharma",
  initials: "RS",
  roll: "CS21B1042",
  email: "riya@campus.edu",
  phone: "+91 90000 00000",
  campus: "Main Campus",
  semester: "3rd",
  course: "B.Tech CSE",
};

const STATS = [
  { label: "Registered", value: 3, accent: "pink" },
  { label: "Confirmed", value: 2, accent: "teal" },
  { label: "Days to go", value: 14, accent: "pink" },
  { label: "Team size", value: 5, accent: "teal" },
];

const EVENTS = [
  {
    id: "dance",
    title: "Dance",
    mode: "Team",
    size: 5,
    day: "23 October",
    time: "2:30 PM – 3:40 PM",
    venue: "Main Stage",
    status: "confirmed",
    teammates: ["Arjun M.", "Priya N.", "Kabir S.", "Ananya R."],
  },
  {
    id: "prompt-engineering",
    title: "Prompt Engineering",
    mode: "Solo",
    size: 1,
    day: "22 October",
    time: "1:00 PM – 2:00 PM",
    venue: "Hall A",
    status: "confirmed",
    teammates: [],
  },
  {
    id: "front-end",
    title: "Front End",
    mode: "Duo",
    size: 2,
    day: "23 October",
    time: "10:00 AM – 11:10 AM",
    venue: "Lab 4",
    status: "pending",
    teammates: ["Dev P."],
  },
];

const ANNOUNCEMENTS = [
  {
    id: "a1",
    title: "Front End venue moved to Lab 4",
    detail: "Same timing, new room. Please check in 10 minutes early.",
    when: "2h ago",
    accent: "pink",
  },
  {
    id: "a2",
    title: "Dance team briefing at 2:00 PM",
    detail: "Meet near the main stage for a quick run-through.",
    when: "6h ago",
    accent: "teal",
  },
  {
    id: "a3",
    title: "Open DJ set starts at 3:40 PM",
    detail: "Right after Dance. Bring your people to the main stage.",
    when: "1d ago",
    accent: "pink",
  },
];

/* Deterministic SVG QR placeholder — purely visual. */
function QrPattern() {
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
    <svg viewBox="0 0 96 96" className="qr-svg" aria-hidden="true">
      <rect x="3" y="3" width="27" height="27" rx="3" />
      <rect x="7" y="7" width="19" height="19" rx="2" fill="#f4efe9" />
      <rect x="11" y="11" width="11" height="11" rx="1" />

      <rect x="66" y="3" width="27" height="27" rx="3" />
      <rect x="70" y="7" width="19" height="19" rx="2" fill="#f4efe9" />
      <rect x="74" y="11" width="11" height="11" rx="1" />

      <rect x="3" y="66" width="27" height="27" rx="3" />
      <rect x="7" y="70" width="19" height="19" rx="2" fill="#f4efe9" />
      <rect x="11" y="74" width="11" height="11" rx="1" />
      {cells}
    </svg>
  );
}

function StatCard({ label, value, accent }) {
  return (
    <div className={`stat-card stat-card--${accent}`}>
      <strong>{String(value).padStart(2, "0")}</strong>
      <span>{label}</span>
    </div>
  );
}

function EventCard({ event }) {
  return (
    <article className={`student-event student-event--${event.status}`}>
      <header className="student-event__head">
        <div>
          <h4>{event.title}</h4>
          <p className="student-event__mode">
            {event.mode}
            {event.size > 1 && (
              <span className="team-badge">×{event.size}</span>
            )}
          </p>
        </div>
        <span className={`status-pill status-pill--${event.status}`}>
          {event.status}
        </span>
      </header>

      <dl className="student-event__facts">
        <div>
          <dt>Day</dt>
          <dd>{event.day}</dd>
        </div>
        <div>
          <dt>Time</dt>
          <dd>{event.time}</dd>
        </div>
        <div>
          <dt>Venue</dt>
          <dd>{event.venue}</dd>
        </div>
      </dl>

      {event.teammates.length > 0 && (
        <div className="student-event__team">
          <span className="student-event__team-label">Teammates</span>
          <ul>
            {event.teammates.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}

export default function StudentDashboard() {
  return (
    <div className="student-dash">
      <section className="student-dash__header section-wrap">
        <div>
          <p className="eyebrow">STUDENT / DASHBOARD</p>
          <h1>
            Hey, <span>{STUDENT.name.split(" ")[0]}.</span>
          </h1>
          <p className="student-dash__sub">
            Everything you need for Tech Kriti 2026 — your events, your pass,
            and every update.
          </p>
        </div>
        <div className="student-dash__actions">
          <Link className="admin-ghost" to="/register">
            + Add event
          </Link>
          <Link className="admin-ghost" to="/">
            ← Back to site
          </Link>
        </div>
      </section>

      <section className="admin-stats section-wrap">
        {STATS.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            accent={stat.accent}
          />
        ))}
      </section>

      <section className="student-dash__main section-wrap">
        <div className="student-dash__col">
          <header className="admin-table-head">
            <div>
              <h2>My events</h2>
              <p className="admin-table-sub">
                {EVENTS.length} registered ·{" "}
                {EVENTS.filter((e) => e.status === "confirmed").length}{" "}
                confirmed
              </p>
            </div>
          </header>
          <div className="student-event-list">
            {EVENTS.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          <section className="student-announcements">
            <header className="admin-table-head">
              <div>
                <h2>Announcements</h2>
              </div>
              <span className="live-dot">Live</span>
            </header>
            <ul className="announcement-list">
              {ANNOUNCEMENTS.map((item) => (
                <li
                  key={item.id}
                  className={`announcement announcement--${item.accent}`}
                >
                  <div className="announcement__dot" aria-hidden="true" />
                  <div className="announcement__body">
                    <h4>{item.title}</h4>
                    <p>{item.detail}</p>
                  </div>
                  <time>{item.when}</time>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="student-side">
          <article className="student-profile">
            <div className="avatar" aria-hidden="true">
              {STUDENT.initials}
            </div>
            <h3>{STUDENT.name}</h3>
            <p className="profile-meta">ID · {STUDENT.roll}</p>
            <dl className="profile-facts">
              <div>
                <dt>Course</dt>
                <dd>{STUDENT.course}</dd>
              </div>
              <div>
                <dt>Semester</dt>
                <dd>{STUDENT.semester}</dd>
              </div>
              <div>
                <dt>Campus</dt>
                <dd>{STUDENT.campus}</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>{STUDENT.email}</dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>{STUDENT.phone}</dd>
              </div>
            </dl>
          </article>

          <article className="student-pass">
            <p className="eyebrow purple">DIGITAL PASS</p>
            <div className="qr">
              <QrPattern />
            </div>
            <p className="pass-name">{STUDENT.name}</p>
            <p className="pass-id">ID · {STUDENT.roll}</p>
            <p className="pass-note">Show this at the entry gate</p>
          </article>
        </aside>
      </section>
    </div>
  );
}
