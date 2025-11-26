import React, { useEffect, useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Post } from '../types';
import { getPostsFromStorage, delay } from '../services/mockDb';
import { Clock, MessageSquare, ChevronRight, User } from 'lucide-react';

const { Link } = ReactRouterDOM;

export const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      await delay(800); // Simulate network latency
      const data = getPostsFromStorage();
      // Sort by newest first
      setPosts(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden h-96 animate-pulse border border-gray-100 dark:border-gray-700">
            <div className="h-48 bg-gray-200 dark:bg-gray-700" />
            <div className="p-6 space-y-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-4">
          Welcome to the Blog
        </h1>
        <p className="text-xl text-gray-500 dark:text-gray-400">
          Discover stories, thinking, and expertise from writers on any topic.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article key={post._id} className="flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 dark:border-gray-700">
            {post.imageUrl && (
              <div className="h-48 w-full overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 text-sm text-blue-600 dark:text-blue-400 font-medium mb-3">
                  <span className="bg-blue-50 dark:bg-blue-900/30 px-2.5 py-0.5 rounded-full">{post.category}</span>
                </div>
                <Link to={`/post/${post._id}`} className="block mt-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-base text-gray-500 dark:text-gray-400 line-clamp-3">
                    {post.excerpt}
                  </p>
                </Link>
              </div>
              
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {post.author.avatar ? (
                       <img className="h-8 w-8 rounded-full" src={post.author.avatar} alt="" />
                    ) : (
                       <User className="h-8 w-8 p-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-500 dark:text-gray-400" />
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
                      {post.author.username}
                    </p>
                    <div className="flex space-x-1 text-xs text-gray-500 dark:text-gray-400">
                      <Clock className="w-3 h-3 mt-0.5" />
                      <time dateTime={post.createdAt}>
                        {new Date(post.createdAt).toLocaleDateString()}
                      </time>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-400 dark:text-gray-500 text-sm">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  <span>{post.comments.length}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};