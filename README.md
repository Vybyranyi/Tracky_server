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
- [MongoDB](https://www.mongodb.com/) — Atlas cloud cluster or a local MongoDB instance
- [Cloudinary](https://cloudinary.com/) account (required for file/image uploads)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Vybyranyi/Tracky_server.git
cd Tracky_server
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root of the project:

```bash
touch .env
```

Paste the following into `.env` and fill in your values:

```env
PORT=3000
db_url=mongodb+srv://<username>:<password>@cluster.mongodb.net/tracky_db
SECRET_KEY=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

| Variable | Description |
|---|---|
| `PORT` | Port the server will listen on (default: `3000`) |
| `db_url` | MongoDB connection string (Atlas URI or `mongodb://localhost:27017/tracky_db`) |
| `SECRET_KEY` | Secret used to sign JWT tokens — use a long random string |
| `CLOUDINARY_CLOUD_NAME` | Found in your Cloudinary dashboard |
| `CLOUDINARY_API_KEY` | Found in your Cloudinary dashboard |
| `CLOUDINARY_API_SECRET` | Found in your Cloudinary dashboard |

### 4. Seed the admin user

Before logging in for the first time, create the default admin account:

```bash
node scripts/seedAdmin.js
```

This creates a user with the following credentials:
- **Email**: `admin@tracky.com`
- **Password**: `admin123!@#`

> You can change these credentials in `scripts/seedAdmin.js` before running the script.

### 5. Start the development server

```bash
npm run dev
```

The server will start at **http://localhost:3000** (or the `PORT` you set in `.env`).

You should see output similar to:

```
[nodemon] starting `node src/app.js`
Server is running on port 3000
Connected to MongoDB
```

---

## Project Structure

```
src/
├── config/         # Database configuration
├── controllers/    # Route controllers
├── middleware/     # Auth and error handling middleware
├── models/         # Mongoose models
├── routes/         # API route definitions
└── app.js          # App entry point
scripts/
└── seedAdmin.js    # Script to create the initial admin user
```

---

## API Endpoints

### Auth
- `POST /signin` — User login

### Users (Admin only)
- `POST /admin/users` — Create a new user
- `GET /admin/users` — Get all users
- `PUT /admin/users/:id` — Update user
- `DELETE /admin/users/:id` — Delete user
- `POST /admin/users/:id/reset-password` — Reset user password

### Profile
- `GET /profile` — Get current user profile
- `PUT /profile` — Update profile

### Tasks
- `GET /tasks` — Get all tasks
- `POST /tasks` — Create task
- `PUT /tasks/:id` — Update task
- `DELETE /tasks/:id` — Delete task

### Projects
- `GET /projects` — Get all projects
- `POST /projects` — Create project

> Refer to the Postman collection in the `postman/` folder for full request/response details.
