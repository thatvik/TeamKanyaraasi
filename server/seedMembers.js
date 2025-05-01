const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Member = require('./models/Member');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/team-members-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected for seeding'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

const members = [
  {
    name: 'Thatvik',
    role: 'Team Lead',
    email: 'thatvik@kanyaraasi.com',
    phone: '1234567890',
    bio: 'Experienced team lead with expertise in project management and full-stack development.',
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Project Management'],
    projects: ['Team Dashboard', 'Client Portal']
  },
  {
    name: 'Supriti',
    role: 'UI/UX Designer',
    email: 'supriti@kanyaraasi.com',
    phone: '2345678901',
    bio: 'Creative designer focused on creating beautiful and intuitive user experiences.',
    skills: ['UI Design', 'UX Research', 'Figma', 'Adobe XD', 'CSS'],
    projects: ['Mobile App Redesign', 'User Research']
  },
  {
    name: 'Gnanesh',
    role: 'Backend Developer',
    email: 'gnanesh@kanyaraasi.com',
    phone: '3456789012',
    bio: 'Backend specialist with strong knowledge of database design and API development.',
    skills: ['Node.js', 'Express', 'MongoDB', 'AWS', 'Python'],
    projects: ['API Gateway', 'Database Migration']
  },
  {
    name: 'Sneha',
    role: 'Frontend Developer',
    email: 'sneha@kanyaraasi.com',
    phone: '4567890123',
    bio: 'Frontend wizard who creates responsive and accessible web applications.',
    skills: ['JavaScript', 'React', 'HTML', 'CSS', 'TypeScript'],
    projects: ['UI Components Library', 'Dashboard']
  }
];

const seedDatabase = async () => {
  try {
    // Clear existing members
    await Member.deleteMany({});
    console.log('Previous members removed');

    // Insert new members
    await Member.insertMany(members);
    console.log('Team members added successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 