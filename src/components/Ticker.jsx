const TICKER_ITEMS = [
  "22—23 OCTOBER",
  "CAMPUS AFTER DARK",
  "TECHKRITI",
  "22—23 OCTOBER",
];

export default function Ticker() {
  // Duplicated once so the -50% marquee loops seamlessly.
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="ticker" aria-label="Event dates and highlights">
      <div className="ticker-track">
        {items.map((text, index) => (
          <span key={`${text}-${index}`}>
            <span className="ticker-star" aria-hidden="true">
              ✦
            </span>
            &nbsp; {text}
          </span>
        ))}
      </div>
    </div>
  );
}
