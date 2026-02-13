# Meeting Action Items Tracker – Frontend

This is the React + TypeScript frontend for the Meeting Action Items Tracker application.

It connects to the backend API to:

- Authenticate users (signup / login)
- Submit meeting transcripts
- Display extracted action items
- Edit and manage action items
- View last 5 processed transcripts
- Check system status

---

## Tech Stack

- React (Vite)
- TypeScript
- Tailwind CSS
- Axios
- React Router

---

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Create Environment File

Create a `.env` file in the root:

```
VITE_API_URL=http://localhost:5000/api
```

For production, set:

```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

### 3. Run Development Server

```bash
npm run dev
```

---

## Build for Production

```bash
npm run build
```

The production build will be generated in the `dist` folder.

---

## Deployment Notes

- If deploying to Vercel, include a `vercel.json` file to support React Router routing.
- Ensure `VITE_API_URL` is configured correctly in environment variables.
- Backend must allow CORS.

---

## Project Structure

```
src/
 ├── pages/
 ├── components/
 ├── App.tsx
 ├── main.tsx
```

---

This frontend requires the backend API to be running and accessible via `VITE_API_URL`.
