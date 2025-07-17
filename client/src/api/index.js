import axios from "axios";

const API = axios.create({
  baseURL: "https://fitness-track-pa05.onrender.com/api/",
});

// http://localhost:8080/api/

export const UserSignUp = async (data) => API.post("/user/signup", data);
export const UserSignIn = async (data) => API.post("/user/login", data);

export const GetDashboardDetails = async (token) =>
  API.get("/user/dashboard", {
    headers: { Authorization: `bearer ${token}` },
  });

export const getWorkouts = async (token, date) =>
  await API.get(`/user/workout${date}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addWorkout = async (token, data) =>
  await API.post(`/user/workout`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteWorkout = async (token, workoutId) => {
  return API.delete(`/user/workout/${workoutId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
