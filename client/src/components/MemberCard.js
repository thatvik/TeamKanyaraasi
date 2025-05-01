import React from 'react';
import { Link } from 'react-router-dom';
import './MemberCard.css';

const MemberCard = ({ member }) => {
  return (
    <div className="member-card">
      <div className="member-card-image">
        <img 
          src={member.image.startsWith('http') ? member.image : `/uploads/${member.image}`} 
          alt={member.name} 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/default-profile.jpg';
          }}
        />
      </div>
      <div className="member-card-content">
        <h3>{member.name}</h3>
        <p className="member-role">{member.role}</p>
        <p className="member-email">{member.email}</p>
        {member.skills && member.skills.length > 0 && (
          <div className="member-skills">
            {member.skills.slice(0, 3).map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
            {member.skills.length > 3 && <span className="more-skills">+{member.skills.length - 3} more</span>}
          </div>
        )}
        <Link to={`/members/${member._id}`} className="btn btn-primary view-details-btn">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default MemberCard;