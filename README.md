# Blog Platform Project

A full-stack blog platform built with React and Node.js.

## Features

- User authentication (signup/login)
- Create, read, update, and delete blog posts
- Responsive design
- Pagination for blog lists
- Markdown support for blog content

## Technologies Used

### Frontend

- React
- React Router
- Axios
- Vite

### Backend

- Node.js
- Express.js
- MongoDB
- JWT for authentication
- bcrypt for password hashing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB installed and running
- Git

### Installation

1. Clone the repository

```bash
git clone https://github.com/Arun-kumar2206/Blog-application.git
cd blog-platform-project
```

2. Install backend dependencies

```bash
cd blog-server
npm install
```

3. Configure environment variables

```bash
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
```

4. Install frontend dependencies

```bash
cd ../blog-client
npm install
```

### Running the Application

1. Start the backend server

```bash
cd blog-server
npm run dev
```

2. Start the frontend development server

```bash
cd blog-client
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
blog-platform-project/
├── blog-client/          # Frontend React application
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/       # Page components
│   │   └── services/    # API services
│   └── ...
└── blog-server/         # Backend Node.js application
    ├── config/         # Configuration files
    ├── controllers/    # Route controllers
    ├── middleware/     # Custom middleware
    ├── models/        # Database models
    └── routes/        # API routes
```

## License

This project is licensed under the MIT License
