import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './auth.css';

function Profile() {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    bio: '',
    avatar: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const res = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProfile(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch profile');
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = e => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = e => {
    setProfile(prev => ({ ...prev, avatar: e.target.files[0] }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('username', profile.username);
      formData.append('email', profile.email);
      formData.append('bio', profile.bio);
      if (profile.avatar instanceof File) {
        formData.append('avatar', profile.avatar);
      }

      const res = await axios.put('http://localhost:5000/api/auth/profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      setProfile(res.data);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete('http://localhost:5000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        localStorage.removeItem('token');
        navigate('/register');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete account');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="auth-background">
      <div className="auth-container">
        <div className="profile-header">
          {profile.avatar ? (
            <img 
              src={
                profile.avatar instanceof File 
                  ? URL.createObjectURL(profile.avatar) 
                  : `http://localhost:5000/uploads/${profile.avatar}`
              } 
              alt="Profile" 
              className="profile-avatar" 
            />
          ) : (
            <div className="profile-avatar" style={{ backgroundColor: '#3498db', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {profile.username?.charAt(0).toUpperCase() || 'U'}
            </div>
          )}
          <h2 className="auth-title">{profile.username || 'User'}</h2>
        </div>

        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-error" style={{ color: '#2ecc71' }}>{success}</div>}

        {isEditing ? (
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="profile-avatar-upload">
              <label htmlFor="avatar-upload" style={{ cursor: 'pointer' }}>
                <div className="profile-avatar" style={{ backgroundColor: '#3498db', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {profile.username?.charAt(0).toUpperCase() || 'U'}
                </div>
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <small>Click avatar to upload new image</small>
            </div>

            <div className="profile-detail">
              <label className="profile-label">Username:</label>
              <input
                className="profile-edit-input"
                name="username"
                value={profile.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="profile-detail">
              <label className="profile-label">Email:</label>
              <input
                className="profile-edit-input"
                name="email"
                type="email"
                value={profile.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="profile-detail">
              <label className="profile-label">Bio:</label>
              <textarea
                className="profile-edit-input"
                name="bio"
                value={profile.bio || ''}
                onChange={handleChange}
                rows="3"
              />
            </div>

            <div className="profile-actions">
              <button 
                type="button" 
                className="profile-button cancel"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="profile-button save"
              >
                Save
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="profile-details">
              <div className="profile-detail">
                <span className="profile-label">Username:</span>
                <span className="profile-value">{profile.username}</span>
              </div>
              <div className="profile-detail">
                <span className="profile-label">Email:</span>
                <span className="profile-value">{profile.email}</span>
              </div>
              <div className="profile-detail">
                <span className="profile-label">Bio:</span>
                <span className="profile-value">{profile.bio || 'No bio yet'}</span>
              </div>
            </div>

            <div className="profile-actions">
              <button 
                className="profile-button edit"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
              <button 
                className="profile-button delete"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </button>
            </div>

            <div className="auth-link" style={{ marginTop: '2rem' }}>
              <button 
                onClick={handleLogout}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: '#3498db', 
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;