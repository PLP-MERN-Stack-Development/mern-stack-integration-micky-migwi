# MERN Stack Blog Application

## Project Overview

This is a comprehensive full-stack web application designed to demonstrate the integration of MongoDB, Express.js, React.js, and Node.js (MERN). The application allows users to view blog posts, register/login, create and edit their own posts, and comment on discussions. 

> **Note:** This repository contains the **Client (Frontend)** implementation. For demonstration purposes within this environment, the backend API calls are simulated using local storage and mocked promises, but the structure is designed to swap easily to a real Express/Mongo backend.

### Features Implemented
*   **Authentication:** User registration and login simulation with JWT-style token management.
*   **CRUD Operations:** Full Create, Read, Update, and Delete capabilities for blog posts.
*   **Interactive UI:** Modern, responsive design using Tailwind CSS.
*   **Rich Interactions:** Commenting system on posts.
*   **AI Integration:** "Write for Me" feature using Google Gemini API to generate blog content automatically.
*   **State Management:** React Context API for authentication and global state.
*   **Routing:** Client-side routing for seamless navigation.

---

## Setup Instructions

### Prerequisites
*   Node.js (v18 or higher)
*   npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/mern-blog.git
    cd mern-blog
    ```

2.  **Install Client Dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Configuration:**
    Create a `.env` file in the root directory:
    ```env
    # For the AI Content Generation feature
    REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here
    ```

4.  **Start the Application:**
    ```bash
    npm start
    ```

---

## API Documentation

The frontend is designed to consume the following RESTful endpoints. 

### Posts

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/posts` | Retrieve all blog posts (supports pagination) | Public |
| `GET` | `/api/posts/:id` | Retrieve a single post by ID | Public |
| `POST` | `/api/posts` | Create a new blog post | Private |
| `PUT` | `/api/posts/:id` | Update an existing post | Private (Owner) |
| `DELETE` | `/api/posts/:id` | Delete a post | Private (Owner) |

### Categories

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/categories` | Get all available categories | Public |
| `POST` | `/api/categories` | Create a new category | Private |

### Authentication

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Authenticate user and receive token |
| `GET` | `/api/auth/me` | Get current user profile |

---

## Tech Stack

*   **Frontend:** React 18, TypeScript, Tailwind CSS, Vite
*   **State Management:** React Context API, React Hooks
*   **Routing:** React Router (HashRouter used for demo)
*   **AI:** Google Gemini API (@google/genai)
*   **Icons:** Lucide React
![alt text](<Screenshot (61).png>) ![alt text](<Screenshot (62).png>) ![alt text](<Screenshot (63).png>)