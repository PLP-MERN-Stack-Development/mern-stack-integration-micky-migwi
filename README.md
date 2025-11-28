📘 MERN Stack Blog Application
Project Overview

This is a comprehensive full-stack web application designed to demonstrate the integration of MongoDB, Express.js, React.js, and Node.js (MERN). The application allows users to view blog posts, register/login, create and edit their own posts, and participate in discussions through comments.

Note: This repository contains the Client (Frontend) implementation.
Backend API calls are currently simulated using local storage and mocked promises, but the structure supports easy migration to a full Express + MongoDB backend.

🖼️ Project Screenshots

<img width="1268" height="655" alt="Screenshot (61)" src="https://github.com/user-attachments/assets/6f230654-7b9d-40ac-8e9e-9bc61cbc5326" />


🔹 Home Page

🔹 Post Creation Page

🔹 Blog Post View

🔹 User Authentication (Login / Register)

🔹 AI "Write for Me" Feature

✨ Features Implemented

Authentication
User registration and login simulation using a JWT-style token.

CRUD Operations
Create, Read, Update, and Delete blog posts.

Interactive UI
Built with Tailwind CSS for a modern, responsive UI.

Comments System
Users can comment and engage with content.

AI Content Generation
"Write for Me" using the Google Gemini API.

Global State
Managed with React Context API.

Client-Side Routing
Smooth navigation with React Router.

⚙️ Setup Instructions
Prerequisites

Node.js v18+

npm or yarn

Installation
1️⃣ Clone the repository
git clone https://github.com/yourusername/mern-blog.git
cd mern-blog

2️⃣ Install dependencies
npm install

3️⃣ Configure environment variables

Create a .env file:

# For the AI Content Generation feature
REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here

4️⃣ Start the application
npm start

📡 API Documentation

The frontend is structured to consume the following REST API endpoints:

📝 Posts
Method	Endpoint	Description	Access
GET	/api/posts	Get all blog posts	Public
GET	/api/posts/:id	Get post by ID	Public
POST	/api/posts	Create new post	Private
PUT	/api/posts/:id	Update post	Private
DELETE	/api/posts/:id	Delete post	Private
🏷️ Categories
Method	Endpoint	Description	Access
GET	/api/categories	Get all categories	Public
POST	/api/categories	Create category	Private
🔒 Authentication
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login and receive token
GET	/api/auth/me	Get logged-in user data
🛠️ Tech Stack

Frontend: React 18, TypeScript, Vite, Tailwind CSS

State Management: React Context API

Routing: React Router (HashRouter for demo)

AI Integration: Google Gemini API

Icons: Lucide React
