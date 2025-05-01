const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Member = require('../models/Member');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5000000 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// @route   GET api/members
// @desc    Get all members
// @access  Public
router.get('/', async (req, res) => {
  try {
    const members = await Member.find().sort({ joinDate: -1 });
    res.json(members);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/members/:id
// @desc    Get member by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    
    if (!member) {
      return res.status(404).json({ msg: 'Member not found' });
    }
    
    res.json(member);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Member not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/members
// @desc    Add a new member
// @access  Public
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const newMember = new Member({
      name: req.body.name,
      role: req.body.role,
      email: req.body.email,
      phone: req.body.phone || '',
      bio: req.body.bio || '',
      skills: req.body.skills ? req.body.skills.split(',').map(skill => skill.trim()) : [],
      projects: req.body.projects ? req.body.projects.split(',').map(project => project.trim()) : []
    });
    
    if (req.file) {
      newMember.image = path.basename(req.file.path);
    }
    
    const member = await newMember.save();
    res.json(member);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/members/:id
// @desc    Update a member
// @access  Public
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    let member = await Member.findById(req.params.id);
    
    if (!member) {
      return res.status(404).json({ msg: 'Member not found' });
    }
    
    const memberFields = {
      name: req.body.name,
      role: req.body.role,
      email: req.body.email,
      phone: req.body.phone || '',
      bio: req.body.bio || '',
      skills: req.body.skills ? req.body.skills.split(',').map(skill => skill.trim()) : member.skills,
      projects: req.body.projects ? req.body.projects.split(',').map(project => project.trim()) : member.projects
    };
    
    if (req.file) {
      // Delete old image if it exists and is not the default
      if (member.image && member.image !== 'default-profile.jpg') {
        const oldImagePath = path.join(__dirname, '../uploads', member.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      memberFields.image = path.basename(req.file.path);
    }
    
    member = await Member.findByIdAndUpdate(
      req.params.id,
      { $set: memberFields },
      { new: true }
    );
    
    res.json(member);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Member not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/members/:id
// @desc    Delete a member
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    
    if (!member) {
      return res.status(404).json({ msg: 'Member not found' });
    }
    
    // Delete member's image if it exists and is not the default
    if (member.image && member.image !== 'default-profile.jpg') {
      const imagePath = path.join(__dirname, '../uploads', member.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    await member.remove();
    res.json({ msg: 'Member removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Member not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;