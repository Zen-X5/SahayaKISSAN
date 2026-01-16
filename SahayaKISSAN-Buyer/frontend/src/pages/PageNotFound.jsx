import { Link } from "react-router-dom";
import "./PageNotFound.css";

export default function PageNotFound() {
  return (
    <main className="notfound">
      <div className="notfound__content">
        <div className="notfound__icons">
          <span className="icon 🌱">🌱</span>
          <span className="icon 🌾">🌾</span>
        </div>

        <p className="notfound__code">404</p>
        <h1 className="notfound__title">Field Not Found</h1>
        <p className="notfound__subtitle">
          This crop path doesn't exist in our agricultural database.
        </p>

        <div className="notfound__actions">
          <Link to="/" className="notfound__primary">
            <span>🏠</span> Back to Farm
          </Link>
          <button
            className="notfound__secondary"
            onClick={() => window.history.back()}
          >
            <span>←</span> Previous Field
          </button>
        </div>

        <div className="notfound__hint">
          <span>🌿 Harvest Tip</span>
          <p>Check your navigation coordinates or return to the main field.</p>
        </div>
      </div>

      <div className="notfound__field" aria-hidden="true">
        <div className="soil-layer" />
        <div className="wheat-field" />
        <div className="sun-rays" />
      </div>
    </main>
  );
}
