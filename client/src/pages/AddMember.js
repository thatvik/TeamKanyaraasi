import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddMember.css';

const AddMember = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    bio: '',
    skills: '',
    projects: ''
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { name, role, email, phone, bio, skills, projects } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = e => {
    setImage(e.target.files[0]);
  };

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const memberData = new FormData();
    memberData.append('name', name);
    memberData.append('role', role);
    memberData.append('email', email);
    memberData.append('phone', phone);
    memberData.append('bio', bio);
    memberData.append('skills', skills);
    memberData.append('projects', projects);
    
    if (image) {
      memberData.append('image', image);
    }

    try {
      await axios.post('/api/members', memberData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setLoading(false);
      navigate('/members');
    } catch (err) {
      setLoading(false);
      setError('Failed to add team member');
      console.error('Error adding member:', err);
    }
  };

  return (
    <div className="add-member-container">
      <h1>Add New Team Member</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={onSubmit} className="add-member-form">
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role *</label>
          <input
            type="text"
            id="role"
            name="role"
            value={role}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={phone}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={bio}
            onChange={onChange}
            rows="4"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="skills">Skills (comma separated)</label>
          <input
            type="text"
            id="skills"
            name="skills"
            value={skills}
            onChange={onChange}
            placeholder="JavaScript, React, Node.js"
          />
        </div>
        <div className="form-group">
          <label htmlFor="projects">Projects (comma separated)</label>
          <input
            type="text"
            id="projects"
            name="projects"
            value={projects}
            onChange={onChange}
            placeholder="Project A, Project B"
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Profile Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={onImageChange}
            accept="image/*"
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Adding...' : 'Add Member'}
        </button>
      </form>
    </div>
  );
};

export default AddMember;