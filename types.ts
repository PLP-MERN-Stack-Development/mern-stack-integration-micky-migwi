export interface User {
  _id: string;
  username: string;
  email: string;
  avatar?: string;
}

export interface Comment {
  _id: string;
  content: string;
  author: User;
  createdAt: string;
}

export interface Post {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  author: User;
  category: string;
  tags: string[];
  imageUrl?: string;
  createdAt: string;
  comments: Comment[];
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface ApiError {
  message: string;
}
