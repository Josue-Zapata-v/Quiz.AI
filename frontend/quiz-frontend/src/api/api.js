// src/api/api.js
import axios from "axios";

// Cambia el BASE_URL según donde esté corriendo tu backend
const BASE_URL = "http://127.0.0.1:8000/api/v1/";

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
