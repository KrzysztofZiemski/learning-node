import axios from "axios";

const API_URL = "http://localhost:8000";

async function httpGetPlanets() {
  const response = await axios.get(`${API_URL}/planets`);
  return await response.data;
  // TODO: Once API is ready.
  // Load planets and return as JSON.
}

async function httpGetLaunches() {
  const response = await axios.get(`${API_URL}/launches`);

  return response.data;
}

async function httpSubmitLaunch(launch) {
  const response = await axios.post(`${API_URL}/launches`, launch);
  return response.data;
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  const response = await axios.delete(`${API_URL}/launches/${id}`);
  return response.data;
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
