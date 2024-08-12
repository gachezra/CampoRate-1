import React, { useState, useEffect } from 'react';
import EditProfileForm from '../components/EditProfileForm';
import { getUserProfileRoute } from '../utils/APIRoutes';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UniversityCard from '../components/UniversityCard';
import universities from '../data/universities';
import UniversityForm from '../components/Universityform';

const Profile = () => {
  const userId = localStorage.getItem('uid');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isUniversityFormOpen, setIsUniversityFormOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!token) {
        console.error('No token found, redirecting to login.');
        navigate('/login'); // Redirect to login page if no token is found
        return;
      }

      try {
        console.log(`User ID: ${userId}, User token: ${token}`)
        const response = await axios.get(`${getUserProfileRoute}/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        });
        if (response.status === 200){
          setUser(response.data);
        } else {
          console.error(response.error)
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        // Handle token expiration or invalid token cases by redirecting to login
        if (error.response && error.response.status === 401) {
          console.error('Token expired or invalid, redirecting to login.');
          navigate('/login');
        }
      }
    };

    fetchUserProfile();
  }, [userId, token, navigate]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="bg-cream p-5 text-center">
      <h1 className="text-brown mb-5 text-3xl font-bold">Profile</h1>
      <div className="inline-block text-left">
        <div className="mb-2">
          <span className="text-light-brown font-bold">Username:</span>
          <span className="text-brown ml-2">{user.username}</span>
        </div>
        <div className="mb-2">
          <span className="text-light-brown font-bold">Email:</span>
          <span className="text-brown ml-2">{user.email}</span>
        </div>
        <div className="mb-2">
          <span className="text-light-brown font-bold">Role:</span>
          <span className="text-brown ml-2">{user.role}</span>
        </div>
        {user.university && (
          <div className="mb-2">
            <span className="text-light-brown font-bold">University:</span>
            <span className="text-brown ml-2">{user.university.name}</span>
          </div>
        )}
        <button
          className="bg-light-brown hover:bg-light-brown-dark text-cream py-2 px-4 rounded mt-2"
          onClick={() => setIsEditFormOpen(true)}
        >
          Edit Profile
        </button>
        <button 
          className="bg-light-brown hover:bg-light-brown-dark text-cream py-2 px-4 rounded mt-2"
          onClick={() => setIsUniversityFormOpen(true)}
        >
          Add University
        </button>
      </div>
      {isEditFormOpen && (
        <EditProfileForm
          user={user}
          onClose={() => setIsEditFormOpen(false)}
          onUpdate={setUser}
        />
      )}
      {isUniversityFormOpen && (
        <UniversityForm
          user={user}
          onClose={() => setIsUniversityFormOpen(false)}
          onUpdate={setUser}
        />
      )}
      {universities.map(university => (
        <UniversityCard 
          key={university.id}
          university={university}
          isProfile={true}
        />
      ))}
    </div>
  );
};

export default Profile;
