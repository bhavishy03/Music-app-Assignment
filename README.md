# 🎵 Music Distribution Dashboard (Assignment)

This is a **Next.js project** built as part of the frontend internship assignment.  
The goal was to demonstrate **React + Next.js fundamentals** such as routing, API integration, state management, and UI design by creating a **Music Distribution Dashboard**.

---

## 🚀 Features Implemented

### 🔐 Login Page (Mock Authentication)
- Simple login form (username + password).
- No real authentication – any input logs you in (as instructed).
- On submit → redirects to the Dashboard.
- Session mock saved in localStorage.

### 📊 Dashboard Page
- Displays a list of uploaded tracks in a **modern Spotify-style UI**.
- Each track shows: **Title, Artist, Release Date, Status, Album, Plays, Likes, Duration**.
- Clicking the track **navigates to dynamic track detail page** (`/track/[id]`).
- Search bar – search tracks by title/artist/album.
- Filter & sorting: **All | Published | Submitted | Draft** + Sort by Popular/Recent/A‑Z.
- Dark/Light mode theme toggle.
- Stats cards: total tracks, published tracks, total plays, total likes.
- Upload button (`+ Upload New Track`) → opens upload page.

### ⬆️ Track Upload Page
- Simple **mock form** to add a track.
- Fields: Title, Artist, Release Date, Genre.
- On submit → POST to `/api/tracks` (mock backend) → adds new track in dashboard list.
- No real file upload required (as instructed).

### 🎶 Track Details Page
- Dynamic route: `/track/[id]`.
- Shows track details fetched from `api/tracks`:
  - Title, Artist, Album, Genre, Duration, Release Date, Plays, Likes, Status.
- Elegant card layout with dark/light toggle and **Back to Dashboard** link.

### ⚙️ API Routes (Mock Backend)
- Endpoint: `/api/tracks`
- Handles:
  - `GET`: return JSON array of tracks.
  - `POST`: add new mock track to in-memory store.

---

## 🌟 Bonus Features
- ✅ Search filter on Dashboard (by title/artist/album).  
- ✅ Theme switcher (Dark/Light mode).  
- ✅ LocalStorage used for mock login session.  
- ✅ Modern responsive UI (works on desktop & mobile).  

---

## 🛠️ Tech Stack
- **Next.js 15** (Pages Router used)
- **React 19**
- **TailwindCSS 3** (for styling)
- **Lucide React Icons**

---

## 🖥️ Setup Instructions

Clone repository and install dependencies:

```bash
git clone https://github.com/<your-username>/music-dashboard.git
cd music-dashboard
npm install

📸 Screenshots

Login Page
![login](./screenshots/login.png)
Dashboard
![dashboard](./screenshots/dashboard.png)
Track Upload
![upload](./screenshots/upload.png)
Track Details
![details](./screenshots/details.png)