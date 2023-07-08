import axios from "axios";

const API_URL = 'http://localhost:8000'

async function httpGetPlanets() {
  const response = await axios(`${API_URL}/planets`)
  return await response.data
  // TODO: Once API is ready.
  // Load planets and return as JSON.
}

async function httpGetLaunches() {
  const response = await axios(`${API_URL}/launches`)

  return response.data
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};