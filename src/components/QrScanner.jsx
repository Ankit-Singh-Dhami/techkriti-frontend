import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

const REGION_ID = "qr-scanner-region";

export default function QrScanner({ onResult }) {
  const [status, setStatus] = useState("idle"); // idle | starting | scanning | error
  const [errorMsg, setErrorMsg] = useState("");
  const [manual, setManual] = useState("");
  const scannerRef = useRef(null);
  const hasFiredRef = useRef(false);

  const stopScanner = async () => {
    const instance = scannerRef.current;
    if (!instance) return;
    try {
      if (instance.getState() === 2 /* SCANNING */) {
        await instance.stop();
      }
      await instance.clear();
    } catch {
      /* ignore — nothing to clean up */
    }
    scannerRef.current = null;
  };

  const startScanner = async () => {
    if (scannerRef.current) return;
    setErrorMsg("");
    setStatus("starting");
    hasFiredRef.current = false;

    try {
      const instance = new Html5Qrcode(REGION_ID, { verbose: false });
      scannerRef.current = instance;

      await instance.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 240, height: 240 } },
        (decodedText) => {
          if (hasFiredRef.current) return;
          hasFiredRef.current = true;
          onResult(decodedText.trim());
          setStatus("idle");
          stopScanner();
        },
        () => {
          /* per-frame decode misses — ignore */
        },
      );

      setStatus("scanning");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err?.message?.includes("Permission")
          ? "Camera permission denied. Allow access or use manual entry below."
          : "Could not start the camera. Use manual entry below.",
      );
      scannerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  const handleManualSubmit = (event) => {
    event.preventDefault();
    const value = manual.trim();
    if (!value) return;
    onResult(value);
    setManual("");
  };

  return (
    <div className="scanner">
      <div className="scanner__viewport">
        <div id={REGION_ID} className="scanner__region" />
        {status !== "scanning" && (
          <div className="scanner__placeholder">
            <span className="scanner__icon" aria-hidden="true">
              ⛶
            </span>
            <p>
              {status === "starting"
                ? "Starting camera…"
                : "Point the pass QR at your camera"}
            </p>
          </div>
        )}
        {status === "scanning" && (
          <span className="scanner__line" aria-hidden="true" />
        )}
      </div>

      <div className="scanner__actions">
        {status !== "scanning" ? (
          <button
            type="button"
            className="button button-pink scanner__btn"
            onClick={startScanner}
            disabled={status === "starting"}
          >
            {status === "starting" ? "Starting…" : "Start scan"} <span>▶</span>
          </button>
        ) : (
          <button
            type="button"
            className="button scanner__btn scanner__btn--stop"
            onClick={async () => {
              await stopScanner();
              setStatus("idle");
            }}
          >
            Stop scan <span>■</span>
          </button>
        )}
      </div>

      {errorMsg && <p className="scanner__error">{errorMsg}</p>}

      <form className="scanner__manual" onSubmit={handleManualSubmit}>
        <label>
          MANUAL ENTRY — ROLL NUMBER
          <div className="scanner__manual-row">
            <input
              type="text"
              placeholder="e.g. CS21B1042"
              value={manual}
              onChange={(e) => setManual(e.target.value)}
            />
            <button type="submit" className="admin-ghost">
              Check
            </button>
          </div>
        </label>
      </form>
    </div>
  );
}
