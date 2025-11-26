import React, { useEffect, useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Post, Comment } from '../types';
import { getPostsFromStorage, savePostsToStorage, delay } from '../services/mockDb';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Calendar, User, Send, Trash2 } from 'lucide-react';

const { useParams, useNavigate } = ReactRouterDOM;

export const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      await delay(500);
      const posts = getPostsFromStorage();
      const found = posts.find(p => p._id === id);
      if (found) {
        setPost(found);
      } else {
        navigate('/');
      }
      setLoading(false);
    };
    fetchPost();
  }, [id, navigate]);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !post || !commentText.trim()) return;

    const newComment: Comment = {
      _id: Math.random().toString(36).substr(2, 9),
      content: commentText,
      author: user,
      createdAt: new Date().toISOString()
    };

    const updatedPost = {
      ...post,
      comments: [...post.comments, newComment]
    };

    // Update Local State
    setPost(updatedPost);
    setCommentText('');

    // Update "DB"
    const allPosts = getPostsFromStorage();
    const updatedPosts = allPosts.map(p => p._id === post._id ? updatedPost : p);
    savePostsToStorage(updatedPosts);
  };

  const handleDeletePost = () => {
    if (!post) return;
    if (confirm('Are you sure you want to delete this post?')) {
        const allPosts = getPostsFromStorage();
        const updatedPosts = allPosts.filter(p => p._id !== post._id);
        savePostsToStorage(updatedPosts);
        navigate('/');
    }
  }

  if (loading) return <div className="flex justify-center p-12 text-gray-500 dark:text-gray-400">Loading post...</div>;
  if (!post) return null;

  return (
    <div className="max-w-3xl mx-auto">
      <button onClick={() => navigate(-1)} className="mb-6 flex items-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to posts
      </button>

      <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden mb-8 border border-gray-100 dark:border-gray-700">
        {post.imageUrl && (
          <img src={post.imageUrl} alt={post.title} className="w-full h-64 md:h-80 object-cover" />
        )}
        
        <div className="p-8">
          <div className="flex items-center space-x-2 mb-6">
            <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs px-3 py-1 rounded-full font-medium uppercase tracking-wide">
              {post.category}
            </span>
             {user && user._id === post.author._id && (
                <button 
                  onClick={handleDeletePost}
                  className="ml-auto text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-2"
                  title="Delete Post"
                >
                    <Trash2 className="w-4 h-4"/>
                </button>
             )}
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400 mb-8 border-b dark:border-gray-700 pb-8">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              <span className="font-medium text-gray-900 dark:text-gray-200">{post.author.username}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <time>{new Date(post.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</time>
            </div>
          </div>

          <div className="prose prose-blue dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </div>
        </div>
      </article>

      {/* Comments Section */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 border border-gray-100 dark:border-gray-700">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Comments ({post.comments.length})</h3>
        
        {/* Comment List */}
        <div className="space-y-8 mb-10">
          {post.comments.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 italic">No comments yet. Be the first to share your thoughts!</p>
          ) : (
            post.comments.map((comment) => (
              <div key={comment._id} className="flex space-x-4">
                 {comment.author.avatar ? (
                    <img src={comment.author.avatar} alt="" className="w-10 h-10 rounded-full" />
                 ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                 )}
                <div className="flex-1">
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg rounded-tl-none border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900 dark:text-white">{comment.author.username}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{new Date(comment.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Comment Form */}
        {user ? (
          <form onSubmit={handleAddComment} className="mt-8">
            <div className="flex items-start space-x-4">
              <img src={user.avatar} alt="" className="w-10 h-10 rounded-full hidden sm:block" />
              <div className="flex-1">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  rows={3}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border p-3 resize-none placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="What are your thoughts?"
                  required
                />
                <div className="mt-3 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 transition-colors"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Post Comment
                  </button>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center border border-blue-100 dark:border-blue-900/30">
            <p className="text-blue-800 dark:text-blue-300">Please <a href="/#/login" className="font-bold underline">log in</a> to join the conversation.</p>
          </div>
        )}
      </section>
    </div>
  );
};