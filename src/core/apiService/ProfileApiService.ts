import axios from "axios";

const API_URL = process.env.REACT_APP_API_BASE_URL;

// Fetch all profiles
export const fetchProfiles = async () => {
  return axios.get(`${API_URL}/profiles`);
};

// Create a profile
export const createProfile = async (data: any) => {
  return axios.post(`${API_URL}/profiles`, data);
};

// Update a profile
export const updateProfile = async (id: string, data: any) => {
  return axios.put(`${API_URL}/profiles/${id}`, data);
};

// Delete a profile
export const deleteProfile = async (id: string) => {
  return axios.delete(`${API_URL}/profiles/${id}`);
};
