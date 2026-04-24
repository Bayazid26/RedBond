import { useState } from "react";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function App() {
  const [blood, setBlood] = useState("");
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

const search = async () => {
  const query = blood.trim().toUpperCase().replace(/\s/g, "");
  if (!query) return;

  setLoading(true);
  setSearched(true);

  try {
    const res = await fetch(`${API_URL}?bloodGroup=${query}`);
    const json = await res.json();

    console.log("API RESPONSE:", json); // 🔥 DEBUG

    if (json.status === "success" && Array.isArray(json.data)) {
      setDonors(json.data);
    } else {
      setDonors([]);
    }

  } catch (err) {
    console.log("API error", err);
    setDonors([]);
  }

  setLoading(false);
};

  return (
    <div className="app">

      <div className="hero">
        <h1>🩸 RedBond</h1>
        <p>Emergency Blood Donor Network</p>

        <div className="searchBox">
          <input
            placeholder="Enter blood group (A+, O-, etc.)"
            value={blood}
            onChange={(e) => setBlood(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && search()}
          />
          <button onClick={search}>Search</button>
        </div>
      </div>

      <div className="results">

        {loading && <p>🔍 Searching database...</p>}

        {!loading && searched && donors.length === 0 && (
          <p>❌ No donors found</p>
        )}

        {!loading && donors.length > 0 && (
          donors.map((d, i) => (
            <div className="card" key={i}>
              <h2>{d.name}</h2>
              <p>🆔 {d.id}</p>
              <p>🎓 {d.department}</p>
              <p>🩸 {d.blood}</p>
              <p>📞 {d.phone}</p>
              <p>📍 {d.address}</p>
              <p>📧 {d.email}</p>
              <p>🗓 {d.lastDonation}</p>
              <p>🚨 {d.emergency}</p>
              <p>🏫 {d.university}</p>
            </div>
          ))
        )}

      </div>

    </div>
  );
}