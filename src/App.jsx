import { useState } from "react";
import "./App.css";

const API_URL = "https://sheetdb.io/api/v1/gpnilm0xtb1dp";

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
      const res = await fetch(API_URL);
      const data = await res.json();

      console.log("FULL DATA:", data);

      const filtered = data.filter((d) => {
        const bg = (d["Blood Group"] || "")
          .toUpperCase()
          .replace(/\s/g, "");
        return bg === query;
      });

      setDonors(filtered);

    } catch (err) {
      console.log("Error:", err);
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
              <h2>{d["Full Name"]}</h2>
              <p>🆔 {d["Student ID"]}</p>
              <p>🎓 {d["Department"]}</p>
              <p>🩸 {d["Blood Group"]}</p>
              <p>📞 {d["Phone Number"]}</p>
              <p>📍 {d["present address"]}</p>
              <p>📧 {d["Email ID"]}</p>
              <p>🗓 {d["Last Blood Donation Date"]}</p>
              <p>🚨 {d["Emergency Donation Availability"]}</p>
              <p>🏫 {d["University Name"]}</p>
            </div>
          ))
        )}

      </div>

    </div>
  );
}