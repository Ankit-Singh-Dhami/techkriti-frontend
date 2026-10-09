const SCHEDULE_DAYS = [
  {
    id: "pre-events",
    variant: "pre-event",
    eyebrow: "PRE-EVENTS",
    date: "22 October",
    agenda: [
      { time: "12:00 PM", title: "Entry" },
      { time: "1:00 PM – 2:00 PM", title: "Prompt Engineering" },
      { time: "2:00 PM – 4:00 PM", title: "Front End" },
      { time: "2:00 PM – 5:00 PM", title: "Carrom" },
    ],
  },
  {
    id: "main-event",
    variant: "main-event",
    eyebrow: "MAIN EVENT",
    date: "23 October",
    agenda: [
      { time: "9:30 AM", title: "Entry" },
      { time: "10:00 AM – 11:10 AM", title: "Front End" },
      { time: "11:10 AM – 11:40 AM", title: "Prompt Engineering" },
      { time: "11:00 AM – 12:15 PM", title: "Memory Challenge" },
      { time: "12:00 PM – 12:30 PM", title: "Singing" },
      { time: "12:30 PM – 1:00 PM", title: "Poetry" },
      { time: "1:00 PM – 1:30 PM", title: "Cosplay" },
      { time: "1:30 PM – 2:10 PM", title: "Stand-up Comedy" },
      { time: "2:10 PM – 2:30 PM", title: "Tech Debate" },
      { time: "2:30 PM – 3:40 PM", title: "Dance" },
      { time: "Then open DJ for all", title: "DJ" },
    ],
  },
];

export default function Schedule() {
  return (
    <section className="schedule section-wrap" id="schedule">
      <div className="section-heading">
        <div>
          <p className="eyebrow">THE LINEUP</p>
          <h2>
            Pick your
            <br />
            <span>playground.</span>
          </h2>
        </div>
        <p className="heading-note">
          From sharp minds to loud stages — bring the thing you do best. Or try
          something wildly new.
        </p>
      </div>

      <div className="schedule-grid">
        {SCHEDULE_DAYS.map((day) => (
          <article key={day.id} className={`day-card ${day.variant}`}>
            <div className="card-top">
              <span className="eyebrow">{day.eyebrow}</span>
              <span className="calendar" aria-hidden="true">
                ▦
              </span>
            </div>
            <h3>{day.date}</h3>
            <div className="agenda">
              {day.agenda.map((slot) => (
                <div key={`${slot.time}-${slot.title}`}>
                  <time>{slot.time}</time>
                  <span>{slot.title}</span>
                </div>
              ))}
            </div>
            <span className="tape" aria-hidden="true" />
          </article>
        ))}
      </div>
    </section>
  );
}
