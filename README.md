```markdown
# 🩸 RedBond — Blood Donor Network

RedBond is a modern real-time blood donor platform built with **React + Firebase**.  
It helps users quickly find, connect, and contact verified blood donors during emergencies.

---

## 🚀 Features

### 🔍 Donor Search
- Search donors by blood group (A+, O−, B+, etc.)
- Real-time donor listing from database
- Clean responsive donor cards

### 👤 Authentication
- Email & Password login
- Google Sign-In (Firebase)
- Secure authentication system

### 🧾 Donor Registration
- Register as donor using:
  - Built-in form
  - Google Form integration
- Data stored via Google Sheets API

### 📊 Profile System
- View donor profile
- Blood group & availability status
- Personal details dashboard

### 📞 Contact System
- Direct call / WhatsApp integration
- “Call Me” button for instant communication

### 🏥 Organization Page
- EU Public Health Club section
- Facebook, Email, Location links
- Google Maps integration

### 🎨 UI/UX
- Modern glassmorphism design
- Fully responsive layout
- Smooth animations
- Dark themed UI

---

## 🛠️ Tech Stack

- React 19 (Frontend)
- Vite (Build tool)
- Firebase (Authentication)
- Google Sheets API (Data storage)
- Custom CSS (UI/Animations)

---

## 📂 Project Structure

```

redbond/
│── public/
│── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   ├── components/
│   └── assets/
│
│── package.json
│── vite.config.js
│── README.md

````

---

## ⚙️ Installation

### 1. Clone repository
```bash
git clone https://github.com/your-username/redbond.git
cd redbond
````

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

---

## 🔐 Firebase Setup

1. Create Firebase project
2. Enable Authentication:

   * Email/Password
   * Google Sign-In
3. Add config:

```js
const FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

---

## 📡 Data Model

Each donor contains:

* Full Name
* Student ID
* Blood Group
* Phone Number
* Address
* University
* Department
* Last Donation Date

Stored via Google Sheets / API.

---

## 🌍 Deployment

### Vercel

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
```

Upload `/dist` folder

---

## 🎯 Future Improvements

* GPS-based donor search
* Emergency alert system
* AI donor matching
* Mobile app version
* Donor verification system

---

## 🤝 Contributing

1. Fork the project
2. Create a branch
3. Commit changes
4. Submit pull request

---

## 👨‍💻 Developer

**Bayazid Ahmed**
GitHub: [https://github.com/Bayazid26](https://github.com/Bayazid26)

---

## ❤️ Mission

Saving Lives · Saving Futures

RedBond aims to create a fast, reliable, and accessible blood donation network for emergency support.

---

## 📜 License

MIT License

