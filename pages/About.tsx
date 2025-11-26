import React from 'react';
import { Database, Server, Layout as LayoutIcon, Code2, Cpu } from 'lucide-react';

export const About = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
          About MERN Blog
        </h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          A full-stack demonstration application showcasing the power of MongoDB, Express.js, React.js, and Node.js.
        </p>
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-8 md:p-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Project Overview</h2>
          <div className="prose prose-blue dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-4">
            <p>
              This application was built to simulate a real-world blogging platform. While the current version runs entirely in the browser using mock services and local storage, the architecture mimics a professional MERN stack environment.
            </p>
            <p>
              The goal is to demonstrate best practices in component architecture, state management with React Context, client-side routing, and modern UI/UX design with Tailwind CSS.
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-6">
            <Code2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Modern Frontend</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Built with React 19, TypeScript, and Tailwind CSS. Features include dark mode, responsive design, and accessible components.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-6">
            <Cpu className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">AI Integration</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Integrated with Google Gemini API to assist authors in generating content, ideas, and summaries automatically.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-6">
            <Server className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Mock Backend</h3>
          <p className="text-gray-500 dark:text-gray-400">
            A sophisticated mock service layer that simulates REST API calls, network latency, and database persistence using LocalStorage.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-6">
            <LayoutIcon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Responsive Layout</h3>
          <p className="text-gray-500 dark:text-gray-400">
            A mobile-first approach ensuring the application looks and functions perfectly on desktops, tablets, and mobile devices.
          </p>
        </div>
      </div>
    </div>
  );
};