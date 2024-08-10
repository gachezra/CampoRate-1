import React, { useState, useEffect } from 'react';
import EditProfileForm from '../components/EditProfileForm';
import { getUserProfile } from '../utils/APIRoutes';

const Profile = () => {
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await getUserProfile();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    fetchUserProfile();
  }, []);

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
      </div>
      {isEditFormOpen && (
        <EditProfileForm
          user={user}
          onClose={() => setIsEditFormOpen(false)}
          onUpdate={setUser}
        />
      )}
    </div>
  );
};

export default Profile;
