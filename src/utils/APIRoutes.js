const API_BASE_URL = 'https://0d98-41-90-37-74.ngrok-free.app/api';

// auth routes
export const registerRoute = `${API_BASE_URL}/register`
export const loginRoute = `${API_BASE_URL}/login`

//profile
export const getUserProfile = `${API_BASE_URL}/profile`


const headers = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
});

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`${errorData.message || response.statusText} (${response.status})`);
  }
  return response.json();
};

export const changePassword = async (currentPassword, newPassword) => {
  const response = await fetch(`${API_BASE_URL}/change-password`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ currentPassword, newPassword }),
  });
  return handleResponse(response);
};

export const updateUserProfile = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/profile`, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
};

export const getUniversities = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(`${API_BASE_URL}/universities?${queryString}`, {
    headers: headers(),
  });
  return handleResponse(response);
};

export const getUniversityById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/universities/${id}`, {
    headers: headers(),
  });
  return handleResponse(response);
};

export const addReview = async (universityId, reviewData) => {
  const response = await fetch(`${API_BASE_URL}/universities/${universityId}/ratings`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(reviewData),
  });
  return handleResponse(response);
};

export const getReviews = async () => {
  const response = await fetch(`${API_BASE_URL}/reviews`, {
    headers: headers(),
  });
  return handleResponse(response);
};

export const addSchoolEmail = async (schoolEmail) => {
  const response = await fetch(`${API_BASE_URL}/school-email`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ schoolEmail }),
  });
  return handleResponse(response);
};

export const verifyEmail = async (token) => {
  const response = await fetch(`${API_BASE_URL}/verify-email/${token}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  return handleResponse(response);
};

export const requestPasswordReset = async (email) => {
  const response = await fetch(`${API_BASE_URL}/request-password-reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  return handleResponse(response);
};

export const resetPassword = async (token, newPassword) => {
  const response = await fetch(`${API_BASE_URL}/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, newPassword }),
  });
  return handleResponse(response);
};