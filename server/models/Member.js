const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String
  },
  bio: {
    type: String
  },
  image: {
    type: String,
    default: 'default-profile.jpg'
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  skills: {
    type: [String],
    default: []
  },
  projects: {
    type: [String],
    default: []
  }
});

module.exports = mongoose.model('Member', MemberSchema);