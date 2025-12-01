# Tracky Server

Backend API for the [Tracky Task Manager](https://github.com/Vybyranyi/Tracky_app). Built with Node.js, Express, and MongoDB.

## Features

- **Authentication & Authorization**: Secure JWT-based authentication with Role-Based Access Control (Admin/User).
- **Task Management**: Create, read, update, and delete tasks. Assign tasks to users.
- **Project Management**: Organize tasks into projects.
- **Team Collaboration**: Manage teams and members.
- **File Uploads**: Integration with Cloudinary for handling file attachments.
- **User Management**: Admin tools for creating and managing users.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JSON Web Tokens (JWT), Bcrypt
- **File Storage**: Cloudinary
- **Middleware**: CORS, Multer

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (Atlas connection string or local instance)
- [Cloudinary](https://cloudinary.com/) Account (for file uploads)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Vybyranyi/Tracky_server.git
   cd Tracky_server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add the following variables:

   ```env
   PORT=3000
   db_url=mongodb+srv://<username>:<password>@cluster.mongodb.net/tracky_db
   SECRET_KEY=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

## Usage

### Development Server
Start the server in development mode:
```bash
npm run dev
```
The server will start on `http://localhost:3000`.

### Seed Admin User
To create an initial admin user (`admin@tracky.com` / `admin123!@#`), run:
```bash
node scripts/seedAdmin.js
```

## API Endpoints

### Auth
- `POST /signin` - User login

### Users (Admin)
- `POST /admin/users` - Create a new user
- `GET /admin/users` - Get all users
- `PUT /admin/users/:id` - Update user
- `DELETE /admin/users/:id` - Delete user
- `POST /admin/users/:id/reset-password` - Reset user password

### Profile
- `GET /profile` - Get current user profile
- `PUT /profile` - Update profile

### Tasks
- `GET /tasks` - Get all tasks
- `POST /tasks` - Create task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

### Projects
- `GET /projects` - Get all projects
- `POST /projects` - Create project

*(Refer to the Postman collection for full API details)*

## Project Structure

```
src/
├── config/         # Database configuration
├── controllers/    # Route controllers
├── middleware/     # Auth and error handling middleware
├── models/         # Mongoose models
├── routes/         # API route definitions
└── app.js          # App entry point
```