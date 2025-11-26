import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getPostsFromStorage, savePostsToStorage } from '../services/mockDb';
import { generateBlogContent } from '../services/gemini';
import { Post } from '../types';
import { Sparkles, Save, X, Loader2 } from 'lucide-react';

const { useNavigate } = ReactRouterDOM;

export const Editor = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    imageUrl: 'https://picsum.photos/800/400',
    content: ''
  });

  const handleGenerate = async () => {
    if (!formData.title) {
        alert("Please enter a title/topic first.");
        return;
    }
    setGenerating(true);
    try {
        const content = await generateBlogContent(formData.title);
        setFormData(prev => ({ ...prev, content }));
    } catch (e) {
        alert("Failed to generate content. Please ensure API Key is set in environment or code.");
    } finally {
        setGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    const newPost: Post = {
        _id: Math.random().toString(36).substr(2, 9),
        title: formData.title,
        content: formData.content,
        excerpt: formData.content.substring(0, 150) + '...',
        category: formData.category || 'General',
        imageUrl: formData.imageUrl,
        author: user,
        tags: [],
        comments: [],
        createdAt: new Date().toISOString()
    };

    const posts = getPostsFromStorage();
    savePostsToStorage([...posts, newPost]);
    
    setTimeout(() => {
        setLoading(false);
        navigate('/');
    }, 500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 md:p-10 border border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Post</h1>
          <button onClick={() => navigate('/')} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
              <input
                type="text"
                required
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter post title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
              <select
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              >
                <option value="">Select Category</option>
                <option value="Development">Development</option>
                <option value="Design">Design</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Technology">Technology</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Content</label>
                <button
                    type="button"
                    onClick={handleGenerate}
                    disabled={generating}
                    className="flex items-center text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-3 py-1 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
                >
                    {generating ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Sparkles className="w-3 h-3 mr-1" />}
                    {generating ? 'Generating...' : 'Auto-Write with AI'}
                </button>
            </div>
            <textarea
              required
              rows={12}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none resize-y bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Write your story here..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            />
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
            >
              {loading ? (
                <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Publishing...
                </>
              ) : (
                <>
                    <Save className="w-5 h-5 mr-2" />
                    Publish Post
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};