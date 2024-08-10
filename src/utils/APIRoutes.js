const API_BASE_URL = 'http://localhost:27680/api'; // Replace with your actual API base URL

const headers = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
});

export const register = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error('Registration failed');
  return response.json();
};

export const login = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) throw new Error('Login failed');
  const data = await response.json();
  return data.token;
};

export const getUserProfile = async () => {
  const response = await fetch(`${API_BASE_URL}/profile`, {
    headers: headers(),
  });
  if (!response.ok) throw new Error('Failed to fetch user profile');
  return response.json();
};

export const changePassword = async (currentPassword, newPassword) => {
  const response = await fetch(`${API_BASE_URL}/change-password`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ currentPassword, newPassword }),
  });
  if (!response.ok) throw new Error('Password change failed');
  return response.json();
};

export const updateUserProfile = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/profile`, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error('Failed to update user profile');
  return response.json();
};

export const getUniversities = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(`${API_BASE_URL}/universities?${queryString}`, {
    headers: headers(),
  });
  if (!response.ok) throw new Error('Failed to fetch universities');
  return response.json();
};

export const getUniversityById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/universities/${id}`, {
    headers: headers(),
  });
  if (!response.ok) throw new Error('Failed to fetch university');
  return response.json();
};

export const addReview = async (universityId, reviewData) => {
  const response = await fetch(`${API_BASE_URL}/universities/${universityId}/ratings`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(reviewData),
  });
  if (!response.ok) throw new Error('Failed to add review');
  return response.json();
};

export const getReviews = async () => {
  const response = await fetch(`${API_BASE_URL}/reviews`, {
    headers: headers(),
  });
  if (!response.ok) throw new Error('Failed to fetch reviews');
  return response.json();
};

export const addSchoolEmail = async (schoolEmail) => {
  const response = await fetch(`${API_BASE_URL}/school-email`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ schoolEmail }),
  });
  if (!response.ok) throw new Error('Failed to add school email');
  return response.json();
};

export const verifyEmail = async (token) => {
  const response = await fetch(`${API_BASE_URL}/verify-email/${token}`, {
    headers: headers(),
  });
  if (!response.ok) throw new Error('Email verification failed');
  return response.json();
};