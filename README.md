# 🩸 RedBond — Blood Donor Network

> **Saving Lives · Saving Futures**
>
> A modern, real-time blood donor finder platform — built to connect people in emergencies, instantly.

[![MIT License](https://img.shields.io/badge/License-MIT-red.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-v19-blue.svg)](https://react.dev)
[![Firebase](https://img.shields.io/badge/Firebase-v10+-orange.svg)](https://firebase.google.com)
[![Vite](https://img.shields.io/badge/Vite-Latest-purple.svg)](https://vitejs.dev)

---

## 🔍 Core Features

| Feature | Description |
|---|---|
| 🔍 **Donor Search** | Search by blood group (A+, O−, B+ & more) with real-time listings and a clean card-based UI |
| 👤 **Authentication** | Email/password login and Google Sign-In powered by secure Firebase Authentication |
| 🧾 **Donor Registration** | Register via built-in form or Google Form; donor data stored securely via Google Sheets API |
| 📊 **User Dashboard** | View donor status, blood group, location, profile and registration — all in one place |
| 📞 **Instant Contact** | One-tap Call or WhatsApp integration via the "Call Me" button for direct donor communication |
| 🏥 **Club Integration** | EU Public Health Club page with contact links, Facebook, Email, Location and embedded map |

---

## 🛠️ Tech Stack

| Technology | Usage | Version |
|---|---|---|
| ⚛️ React | Frontend UI Framework | v19 |
| ⚡ Vite | Build Tool & Dev Server | Latest |
| 🔥 Firebase | Authentication & Backend | v10+ |
| 📊 Google Sheets API | Donor Data Storage | v4 |
| 🎨 CSS Custom | Styling & Animations | Vanilla |

---

## 📂 Project Structure

```
redbond/
├── public/
├── src/
│   ├── App.jsx          # Root component
│   ├── main.jsx         # Entry point
│   ├── index.css        # Global styles
│   ├── components/      # Reusable UI components
│   └── assets/          # Images, icons
├── package.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Bayazid26/redbond.git
cd redbond
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

### 4. Build for Production

```bash
npm run build
```

---

## 🔐 Firebase Setup

1. **Create Project** — Go to [Firebase Console](https://console.firebase.google.com) and create a new project.
2. **Enable Auth** — Enable Email/Password and Google Sign-In providers.
3. **Add Config** — Paste your Firebase config object into the app:

```js
const FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

---

## 📡 Data Handling

Donor data is fetched from **Google Sheets via SheetDB API**. Each donor record contains the following fields:

- 👤 Full Name
- 🩸 Blood Group
- 📞 Phone Number
- 📍 Address
- 🎓 University
- 📅 Last Donation Date

---

## 🎯 Future Improvements

- 📍 **Location-Based Filtering** — GPS-powered donor search to find the nearest available match in real time.
- 🔔 **Emergency Notifications** — Instant push alerts to available donors during critical blood shortage situations.
- 🧠 **AI Donor Recommendation** — Smart matching algorithm that recommends the most compatible and available donors.
- 📱 **Mobile Application** — Native iOS & Android apps for on-the-go access to the donor network.
- 🔒 **Advanced Verification** — Multi-step donor identity and health verification system for safer connections.

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. 🍴 **Fork** the repository to your own GitHub account.
2. 🌿 **Branch** — Create a new feature branch for your changes.
3. 📬 **Pull Request** — Commit your changes and open a PR for review.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 👨‍💻 Author

Built with ❤️ by **Bayazid Ahmed**

[![GitHub](https://img.shields.io/badge/GitHub-Bayazid26-black?logo=github)](https://github.com/Bayazid26)

---

> ⭐ Star the repo · 🔗 Share with others · ❤️ Help save lives
