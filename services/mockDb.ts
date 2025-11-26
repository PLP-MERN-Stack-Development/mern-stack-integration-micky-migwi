import { Post, User, Comment } from '../types';

// Initial Mock Data
const MOCK_USERS: User[] = [
  { _id: 'u1', username: 'demo_user', email: 'demo@example.com', avatar: 'https://picsum.photos/id/64/100/100' },
  { _id: 'u2', username: 'tech_guru', email: 'guru@example.com', avatar: 'https://picsum.photos/id/65/100/100' }
];

const MOCK_POSTS: Post[] = [
  {
    _id: 'p1',
    title: 'Getting Started with the MERN Stack',
    excerpt: 'A comprehensive guide to building full-stack applications using MongoDB, Express, React, and Node.js.',
    content: 'The MERN stack is a popular JavaScript stack designed to make the development process smoother... (Full content would go here). It allows for a single language (JavaScript) to be used across the entire stack.',
    author: MOCK_USERS[1],
    category: 'Development',
    tags: ['javascript', 'webdev', 'react'],
    imageUrl: 'https://picsum.photos/id/1/800/400',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    comments: [
      { _id: 'c1', content: 'Great introduction!', author: MOCK_USERS[0], createdAt: new Date().toISOString() }
    ]
  },
  {
    _id: 'p2',
    title: 'The Future of React 19',
    excerpt: 'Exploring the new features coming to the React ecosystem including the compiler and server actions.',
    content: 'React 19 brings a paradigm shift in how we handle rendering and state. With the new compiler, manual memoization might become a thing of the past.',
    author: MOCK_USERS[1],
    category: 'React',
    tags: ['react', 'frontend'],
    imageUrl: 'https://picsum.photos/id/20/800/400',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    comments: []
  }
];

// Local Storage Helper
const STORAGE_KEY_POSTS = 'mern_blog_posts';
const STORAGE_KEY_USERS = 'mern_blog_users';

export const getPostsFromStorage = (): Post[] => {
  const stored = localStorage.getItem(STORAGE_KEY_POSTS);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(MOCK_POSTS));
    return MOCK_POSTS;
  }
  return JSON.parse(stored);
};

export const savePostsToStorage = (posts: Post[]) => {
  localStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(posts));
};

export const getUsersFromStorage = (): User[] => {
  const stored = localStorage.getItem(STORAGE_KEY_USERS);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(MOCK_USERS));
    return MOCK_USERS;
  }
  return JSON.parse(stored);
};

// Simulate Network Delay
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
