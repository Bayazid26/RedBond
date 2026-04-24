// import { useState } from "react";
// import "./App.css";

// const API_URL = "https://script.google.com/macros/s/AKfycbxEyN42FRHbk1DGW125A19f0Qtwm1BUL9CFZg_Vig2U2cDjm3R_UCRX-PFx6G4rLcNupw/exec";

// export default function App() {
//   const [blood, setBlood] = useState("");
//   const [donors, setDonors] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searched, setSearched] = useState(false);

//   const search = async () => {
//     if (!blood) return;

//     setLoading(true);
//     setSearched(true);

//     try {
//       const res = await fetch(`${API_URL}?bloodGroup=${blood}`);
//       const data = await res.json();

//       setDonors(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.log("API error", err);
//       setDonors([]);
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="app">

//       <div className="hero">
//         <h1>🩸 RedBond</h1>
//         <p>Emergency Blood Donor Network</p>

//         <div className="searchBox">
//           <input
//             placeholder="Enter blood group (A+, O-, etc.)"
//             value={blood}
//             onChange={(e) => setBlood(e.target.value)}
//           />
//           <button onClick={search}>Search</button>
//         </div>
//       </div>

//       <div className="results">

//         {loading && <p>🔍 Searching database...</p>}

//         {!loading && searched && donors.length === 0 && (
//           <p>❌ No donors found</p>
//         )}

//         {!loading && donors.length > 0 && (
//           donors.map((d, i) => (
//             <div className="card" key={i}>
//               <h2>{d.name}</h2>
//               <p>🆔 {d.id}</p>
//               <p>🎓 {d.department}</p>
//               <p>🩸 {d.blood}</p>
//               <p>📞 {d.phone}</p>
//               <p>📍 {d.address}</p>
//               <p>🗓 {d.lastDonation}</p>
//             </div>
//           ))
//         )}

//       </div>

//     </div>
//   );
// }




import { useState } from "react";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function App() {
  const [blood, setBlood] = useState("");
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const search = async () => {
    const query = blood.trim().toUpperCase();
    if (!query) return;

    setLoading(true);
    setSearched(true);

    try {
      const res = await fetch(`${API_URL}?bloodGroup=${query}`);
      const data = await res.json();

      setDonors(Array.isArray(data) ? data : []);
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
              <p>🗓 {d.lastDonation}</p>
            </div>
          ))
        )}

      </div>

    </div>
  );
}