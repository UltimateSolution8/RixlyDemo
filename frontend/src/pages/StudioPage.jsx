import { useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function StudioPage() {
  // Sanity Studio is typically a separate application
  // For production, you would either:
  // 1. Deploy Sanity Studio separately (recommended)
  // 2. Use embedded documents (requires additional setup)
  
  // For now, we'll redirect to Sanity Studio or show setup instructions
  useEffect(() => {
    const sanityProjectId = process.env.REACT_APP_SANITY_PROJECT_ID;
    
    if (sanityProjectId && sanityProjectId !== "your-project-id") {
      // Redirect to Sanity Studio
      window.location.href = `https://${sanityProjectId}.sanity.studio/`;
    }
  }, []);

  const sanityProjectId = process.env.REACT_APP_SANITY_PROJECT_ID;

  // If no valid project ID, show setup instructions
  if (!sanityProjectId || sanityProjectId === "your-project-id") {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
            Set Up Sanity Studio
          </h1>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                Step 1: Create a Sanity Project
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Go to <a href="https://www.sanity.io/manage" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">sanity.io/manage</a> and create a new project.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                Step 2: Add Environment Variables
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-2">
                Add the following to your <code className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">.env</code> file:
              </p>
              <pre className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg overflow-x-auto">
                <code className="text-sm text-slate-800 dark:text-slate-200">
{`REACT_APP_SANITY_PROJECT_ID=your_project_id_here
REACT_APP_SANITY_DATASET=production`}
                </code>
              </pre>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                Step 3: Initialize Sanity Studio
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                In your Sanity project, create a folder called <code className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">schemas</code> and add the following schema files:
              </p>
              <ul className="list-disc list-inside mt-2 text-slate-600 dark:text-slate-400 space-y-1">
                <li>author.js - Author content type</li>
                <li>category.js - Category content type</li>
                <li>post.js - Blog post content type</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                Step 4: Import Schema Definitions
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Copy the schema definitions from <code className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">src/lib/sanitySchemas.js</code> into your Sanity Studio project's schema files.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
              <a
                href="https://www.sanity.io/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Read Sanity Documentation
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show loading while redirecting
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-600 dark:text-slate-400">Redirecting to Sanity Studio...</p>
      </div>
    </div>
  );
}
