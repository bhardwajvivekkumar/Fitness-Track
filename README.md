# 🏋️‍♂️ FitTrack — Fitness Tracking App

FitTrack is a full-stack fitness tracking web application that allows users to log their workouts, view progress, and stay on track with personalized fitness goals. It features user authentication, real-time form submissions, and organized workout categorization — all built with the MERN stack.

---

## 🚀 Features

- 🔒 **JWT-based Authentication**
- 🧍‍♂️ **User-specific Workout Tracking**
- 🗂️ **Workout Categories & Details (sets, reps, weight, time)**
- 📅 **Date-wise storage of workouts**
- 🧠 **Calories Burned Calculator**
- 📤 **Responsive Contact Form using EmailJS**
- 📱 **Fully Responsive UI with Styled Components**

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Styled-components
- EmailJS
- MUI Icons

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Custom Error Handling Middleware

---

## 🧩 Folder Structure

```
/client
  └── src
      ├── pages/
      │   └── Contact.jsx
      ├── components/
      └── App.jsx
/server
  ├── models/
  │   └── Workout.js
  ├── routes/
  │   └── workouts.js
  ├── middleware/
  │   └── verifyToken.js
  ├── controllers/
  │   └── workoutController.js
  └── index.js
```

---

## ⚙️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-username/fittrack.git
cd fittrack
```

### 2. Install server dependencies
```bash
cd server
npm install
```

### 3. Set up environment variables
Create a `.env` file in `/server`:
```
MONGO_URI=your_mongodb_uri
JWT=your_jwt_secret
```

### 4. Install client dependencies
```bash
cd ../client
npm install
```

### 5. Configure EmailJS
In the client `.env` file:
```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

---

## ▶️ Run the App

```bash
# In one terminal
cd server
npm start

# In another terminal
cd client
npm run dev
```

---


---

## 🧪 Testing

- Contact form tested with valid and invalid emails.
- Duplicate workouts are not allowed per user.
- Each user has isolated workout data.

---

## Author

Vivek Kumar  
📧 [vk3411389@gmail.com]
