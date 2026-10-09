import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero section-wrap" id="home">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="spark">✳</span> COLLEGE FEST / 2026
        </p>
        <h1>
          Make
          <br />
          some
          <br />
          <span>noise.</span>
        </h1>
        <p className="hero-description">
          Two days. Eight stages. One unforgettable celebration of the people
          who make our campus electric.
        </p>
        <div className="hero-actions">
          <Link className="button button-pink" to="/register">
            Claim your spot <span>↗</span>
          </Link>
          <span className="open-note">
            <i /> Registrations are open
          </span>
        </div>
      </div>

      <div className="hero-visual">
        <div className="photo-frame">
          <img
            src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=85"
            alt="Crowd enjoying a live music performance"
          />
          <div className="photo-shade" />
        </div>

        <div className="sticker">
          CREATE
          <br />
          YOUR
          <br />
          MOMENT
        </div>

        <div className="starburst" aria-hidden="true">
          ✳
        </div>

        <a className="button photo-button" href="#schedule">
          01 &nbsp; FIND YOUR STAGE ↗
        </a>
      </div>
    </section>
  );
}
