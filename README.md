# Team Kanya Raasi

A fullstack team members management application for Team Kanya Raasi. This application allows users to view, add, update, and delete team members, showcasing their skills, roles, and projects they're working on.

## Screenshots

Here are some screenshots of the Team Kanya Raasi application:

### Home Page
![Home Page](screenshots/home-page.png)

### Team Members List
![Team Members List](screenshots/team-list.png)

### Member Details
![Member Details](screenshots/member-details.png)

### Add New Member
![Add Member](screenshots/add-member.png)

### How to Add Your Own Screenshots

1. Take screenshots of your running application (Windows: use Win+Shift+S, Mac: use Cmd+Shift+4)
2. Save the screenshots in the `screenshots` directory
3. Name them appropriately (e.g., home-page.png, team-list.png)
4. The screenshots will automatically appear in the README when viewed on GitHub

## Team Members
- Thatvik - Team Lead - RA2211056010103
- Supriti - UI/UX Designer - RA2211056010130
- Gnanesh - Backend Developer - RA2211056010093
- Sneha - Frontend Developer - RA2211056010134

## Project Description

Team Kanya Raasi is a MERN stack application (MongoDB, Express, React, Node.js) designed to manage team member profiles. The application provides a user-friendly interface for:

- Displaying team member information
- Adding new team members with their skills and projects
- Updating existing member information
- Deleting team members
- Uploading profile pictures

## Project Structure

- **client**: React frontend application
  - Uses React Router for navigation
  - Axios for API communication
  - Responsive design with CSS

- **server**: Node.js/Express backend API with MongoDB
  - RESTful API architecture
  - MongoDB for data storage
  - Multer for file uploads

## Installation Steps

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

### Server Setup
1. Navigate to the server directory:
   ```
   cd server
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the server directory with the following:
   ```
   MONGO_URI=mongodb://localhost:27017/team-members-app
   PORT=5000
   ```
4. Seed the database with team members:
   ```
   npm run seed
   ```

### Client Setup
1. Navigate to the client directory:
   ```
   cd client
   ```
2. Install dependencies:
   ```
   npm install
   ```

## API Endpoints

### Members API

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|-------------|----------|
| GET | `/api/members` | Get all members | - | Array of member objects |
| GET | `/api/members/:id` | Get member by ID | - | Member object |
| POST | `/api/members` | Add a new member | `{ name, role, email, phone, bio, skills, projects }` and optional image file | Created member object |
| PUT | `/api/members/:id` | Update a member | `{ name, role, email, phone, bio, skills, projects }` and optional image file | Updated member object |
| DELETE | `/api/members/:id` | Delete a member | - | Success message |

### Member Object Structure

```json
{
  "_id": "string",
  "name": "string",
  "role": "string",
  "email": "string",
  "phone": "string",
  "bio": "string",
  "image": "string",
  "joinDate": "date",
  "skills": ["string"],
  "projects": ["string"]
}
```

## Running the Application

### Start MongoDB
Ensure MongoDB is running on your system. On Windows, you might need to start it manually if it's not running as a service.

### Start the Server
1. Open a terminal window
2. Navigate to the server directory:
   ```
   cd server
   ```
3. Start the server in development mode:
   ```
   npm run dev
   ```
4. The server should start on http://localhost:5000 with the following console output:
   ```
   Server running on port 5000
   MongoDB connected
   ```

### Start the Client
1. Open a new terminal window
2. Navigate to the client directory:
   ```
   cd client
   ```
3. Start the React application:
   ```
   npm start
   ```
4. The application will automatically open in your default browser at http://localhost:3000

## Features
- View all team members in a responsive grid layout
- View detailed information for each team member
- Add new team members with skills and projects
- Update existing team member information
- Delete team members
- Upload and display profile pictures

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check the MONGO_URI in your .env file
- Try connecting to MongoDB using MongoDB Compass to verify connectivity

### Image Upload Issues
- Ensure the uploads directory exists in the server folder
- Check file size limits (default: 5MB)
- Only image files are allowed (.jpeg, .jpg, .png, .gif) 