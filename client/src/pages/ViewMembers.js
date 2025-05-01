import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MemberCard from '../components/MemberCard';
import LoadingSpinner from '../components/LoadingSpinner';
import './ViewMembers.css';

const ViewMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get('/api/members');
        setMembers(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch team members');
        setLoading(false);
        console.error('Error fetching members:', err);
      }
    };

    fetchMembers();
  }, []);

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="error-container">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="view-members-container">
      <h1>Team Members</h1>
      {members.length === 0 ? (
        <div className="no-members">
          <p>No team members found. Add some members to get started!</p>
        </div>
      ) : (
        <div className="members-grid">
          {members.map(member => (
            <MemberCard key={member._id} member={member} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewMembers;