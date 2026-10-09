import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import QrScanner from "./QrScanner.jsx";

/* Demo data — replace with an API fetch when a backend exists. */
const REGISTRATIONS = [
  {
    id: "r1",
    name: "Riya Sharma",
    roll: "CS21B1042",
    category: "Dance",
    mode: "Team",
    size: 5,
    campus: "Main Campus",
    semester: "3rd",
    status: "confirmed",
  },
  {
    id: "r2",
    name: "Arjun Mehta",
    roll: "EC21B2201",
    category: "Singing",
    mode: "Solo",
    size: 1,
    campus: "Main Campus",
    semester: "5th",
    status: "confirmed",
  },
  {
    id: "r3",
    name: "Priya Nair",
    roll: "ME22B0114",
    category: "Poetry",
    mode: "Solo",
    size: 1,
    campus: "North Campus",
    semester: "2nd",
    status: "pending",
  },
  {
    id: "r4",
    name: "Kabir Singh",
    roll: "CS22B3078",
    category: "Tech Debate",
    mode: "Duo",
    size: 2,
    campus: "Main Campus",
    semester: "4th",
    status: "confirmed",
  },
  {
    id: "r5",
    name: "Ananya Rao",
    roll: "BT21B0056",
    category: "Cosplay",
    mode: "Team",
    size: 3,
    campus: "South Campus",
    semester: "6th",
    status: "pending",
  },
  {
    id: "r6",
    name: "Vikram Joshi",
    roll: "CS21B1120",
    category: "Front End",
    mode: "Solo",
    size: 1,
    campus: "Main Campus",
    semester: "3rd",
    status: "confirmed",
  },
  {
    id: "r7",
    name: "Meera Iyer",
    roll: "EE22B0345",
    category: "Dance",
    mode: "Duo",
    size: 2,
    campus: "North Campus",
    semester: "4th",
    status: "confirmed",
  },
  {
    id: "r8",
    name: "Rohan Das",
    roll: "CS23B4012",
    category: "Prompt Engineering",
    mode: "Solo",
    size: 1,
    campus: "Main Campus",
    semester: "1st",
    status: "pending",
  },
  {
    id: "r9",
    name: "Zara Khan",
    roll: "ME21B0789",
    category: "Stand-up Comedy",
    mode: "Solo",
    size: 1,
    campus: "South Campus",
    semester: "5th",
    status: "confirmed",
  },
  {
    id: "r10",
    name: "Dev Patel",
    roll: "CS22B3155",
    category: "Memory Challenge",
    mode: "Solo",
    size: 1,
    campus: "Main Campus",
    semester: "4th",
    status: "confirmed",
  },
];

const CATEGORY_TOTALS = [
  { label: "Dance", count: 18 },
  { label: "Singing", count: 14 },
  { label: "Front End", count: 12 },
  { label: "Tech Debate", count: 10 },
  { label: "Prompt Engineering", count: 9 },
  { label: "Cosplay", count: 7 },
];

const FILTERS = ["All", "Confirmed", "Pending"];

/* Looks up a scanned string against the demo dataset.
   Matches on roll number (case-insensitive) or the raw QR "TK:<roll>" format. */
function lookupTicket(raw) {
  const cleaned = String(raw).trim();
  const roll = cleaned.toUpperCase().startsWith("TK:")
    ? cleaned.slice(3).trim()
    : cleaned;
  const student = REGISTRATIONS.find(
    (r) => r.roll.toUpperCase() === roll.toUpperCase(),
  );
  return { raw: cleaned, roll, student: student ?? null, at: new Date() };
}

export default function AdminDashboard() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [scan, setScan] = useState(null); // { raw, roll, student, at } | null

  const stats = useMemo(() => {
    const total = REGISTRATIONS.length;
    const confirmed = REGISTRATIONS.filter(
      (r) => r.status === "confirmed",
    ).length;
    const pending = total - confirmed;
    const teams = REGISTRATIONS.filter((r) => r.size > 1).length;
    return { total, confirmed, pending, teams };
  }, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return REGISTRATIONS.filter((r) => {
      const matchesFilter =
        filter === "All" || r.status === filter.toLowerCase();
      const matchesQuery =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.roll.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.campus.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);

  const maxCategory = Math.max(...CATEGORY_TOTALS.map((c) => c.count));

  return (
    <div className="admin-dash">
      <section className="admin-dash__header section-wrap">
        <div>
          <p className="eyebrow">ADMIN / DASHBOARD</p>
          <h1>
            Control <span>room.</span>
          </h1>
          <p className="admin-dash__sub">
            Live view of every registration coming in for Tech Kriti 2026.
          </p>
        </div>
        <div className="admin-dash__actions">
          <Link className="admin-ghost" to="/">
            ← Back to site
          </Link>
          <button type="button" className="admin-ghost">
            Export CSV
          </button>
        </div>
      </section>

      <section className="admin-stats section-wrap">
        <StatCard
          label="Total registrations"
          value={stats.total}
          accent="pink"
        />
        <StatCard label="Confirmed" value={stats.confirmed} accent="teal" />
        <StatCard label="Pending" value={stats.pending} accent="pink" />
        <StatCard label="Teams" value={stats.teams} accent="teal" />
      </section>

      {/* NEW: scanner + result panel */}
      <section className="admin-scan section-wrap">
        <header className="admin-table-head">
          <div>
            <h2>Entry scan</h2>
            <p className="admin-table-sub">
              Scan a student pass or type their roll number to check them in
            </p>
          </div>
        </header>

        <div className="admin-scan__grid">
          <QrScanner onResult={(raw) => setScan(lookupTicket(raw))} />

          <aside className="scan-result">
            {!scan && (
              <div className="scan-result__empty">
                <span className="scanner__icon" aria-hidden="true">
                  ⌁
                </span>
                <p>Awaiting scan…</p>
                <small>
                  Results will appear here the moment a code is read.
                </small>
              </div>
            )}

            {scan && scan.student && (
              <div className="scan-result__card scan-result__card--valid">
                <span className="scan-badge scan-badge--valid">
                  Valid entry
                </span>
                <h3>{scan.student.name}</h3>
                <p className="mono">{scan.student.roll}</p>
                <dl className="scan-facts">
                  <div>
                    <dt>Category</dt>
                    <dd>
                      {scan.student.category}
                      {scan.student.size > 1 && (
                        <span className="team-badge">×{scan.student.size}</span>
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt>Mode</dt>
                    <dd>{scan.student.mode}</dd>
                  </div>
                  <div>
                    <dt>Campus</dt>
                    <dd>{scan.student.campus}</dd>
                  </div>
                  <div>
                    <dt>Semester</dt>
                    <dd>{scan.student.semester}</dd>
                  </div>
                </dl>
              </div>
            )}

            {scan && !scan.student && (
              <div className="scan-result__card scan-result__card--invalid">
                <span className="scan-badge scan-badge--invalid">
                  Not found
                </span>
                <h3>Unknown pass</h3>
                <p className="mono">{scan.raw}</p>
                <p className="scan-result__note">
                  No registration matches this code. Try scanning again or check
                  the roll number.
                </p>
              </div>
            )}

            {scan && (
              <button
                type="button"
                className="admin-ghost scan-result__clear"
                onClick={() => setScan(null)}
              >
                Clear result
              </button>
            )}
          </aside>
        </div>
      </section>

      <section className="admin-main section-wrap">
        <div className="admin-table-wrap">
          <header className="admin-table-head">
            <div>
              <h2>Registrations</h2>
              <p className="admin-table-sub">
                {visible.length} of {REGISTRATIONS.length} shown
              </p>
            </div>
            <div className="admin-controls">
              <input
                type="search"
                className="admin-search"
                placeholder="Search name, roll, campus…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="admin-filters">
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    type="button"
                    className={`admin-filter${filter === f ? " is-active" : ""}`}
                    onClick={() => setFilter(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </header>

          <div className="admin-table-scroll">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Roll</th>
                  <th>Category</th>
                  <th>Mode</th>
                  <th>Campus</th>
                  <th>Sem</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((r) => (
                  <tr key={r.id}>
                    <td data-label="Name">{r.name}</td>
                    <td data-label="Roll" className="mono">
                      {r.roll}
                    </td>
                    <td data-label="Category">{r.category}</td>
                    <td data-label="Mode">
                      {r.mode}
                      {r.size > 1 && (
                        <span className="team-badge">×{r.size}</span>
                      )}
                    </td>
                    <td data-label="Campus">{r.campus}</td>
                    <td data-label="Sem">{r.semester}</td>
                    <td data-label="Status">
                      <span className={`status-pill status-pill--${r.status}`}>
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {visible.length === 0 && (
                  <tr>
                    <td colSpan="7" className="admin-empty">
                      No registrations match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="admin-side">
          <article className="admin-card">
            <h3>By category</h3>
            <ul className="category-bars">
              {CATEGORY_TOTALS.map((c) => (
                <li key={c.label}>
                  <div className="cat-row">
                    <span>{c.label}</span>
                    <span className="mono">
                      {String(c.count).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="cat-track">
                    <div
                      className="cat-fill"
                      style={{ width: `${(c.count / maxCategory) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </article>

          <article className="admin-card admin-card--alert">
            <h3>Needs attention</h3>
            <ul className="alert-list">
              <li>
                <strong>3</strong> pending confirmations
              </li>
              <li>
                <strong>1</strong> duplicate roll number flagged
              </li>
              <li>
                <strong>2</strong> teams missing teammate names
              </li>
            </ul>
          </article>
        </aside>
      </section>
    </div>
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
