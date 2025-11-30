'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'handbook' | 'checklists' | 'tools' | 'research';
  fileSize: string;
  pages: number;
  icon: string;
  downloadUrl: string;
  previewImage?: string;
}

// TO ADD MORE RESOURCES: Simply add new objects to this array following the same structure
const resources: Resource[] = [
  {
    id: 'accessibility-handbook',
    title: 'Accessibility Handbook',
    description: 'A practical handbook that explains accessibility concepts, tools, testing strategies, and real-world implementation examples. Ideal for developers, designers, product managers, and testers.',
    category: 'handbook',
    fileSize: '5.5 MB',
    pages: 52,
    icon: '📗',
    downloadUrl: '/resources/AccessibilityHandbook.pdf', // update this path if hosted elsewhere
  },
  // Add more resources here as they become available
  // Example:
  // {
  //   id: 'your-pdf-id',
  //   title: 'Your PDF Title',
  //   description: 'Description of your PDF',
  //   category: 'guidelines', // or 'checklists', 'tools', 'research'
  //   fileSize: '1.5 MB',
  //   pages: 10,
  //   icon: '📄',
  //   downloadUrl: '/resources/your-pdf.pdf',
  // },
];

const categories = {
  all: { label: 'All Resources', icon: '📚' },
  handbook: { label: 'handbook', icon: '📘' },
  checklists: { label: 'Checklists', icon: '✅' },
  tools: { label: 'Tools', icon: '🔧' },
  research: { label: 'Research', icon: '📊' },
};

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = resources.filter((resource) => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (resource: Resource) => {
    // Track download (you could integrate analytics here)
    console.log(`Downloading: ${resource.title}`);
    
    // Trigger actual download
    const link = document.createElement('a');
    link.href = resource.downloadUrl;
    link.download = resource.downloadUrl.split('/').pop() || 'download.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Back
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                📚 Accessibility Resources
              </h1>
              <p className="text-sm text-gray-600 mt-0.5">
                Free guides, checklists, and tools for building accessible experiences
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link 
              href="/contrast-checker"
              className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg text-sm font-medium transition-colors"
            >
              Contrast Checker
            </Link>
            <Link 
              href="/font-readability"
              className="px-4 py-2 bg-purple-500 text-white hover:bg-purple-600 rounded-lg text-sm font-medium transition-colors"
            >
              Font Playground
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Resources
              </label>
              <input
                id="search"
                type="text"
                placeholder="Search by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category Filter */}
            <div className="md:w-64">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.entries(categories).map(([key, { label, icon }]) => (
                  <option key={key} value={key}>
                    {icon} {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing <strong>{filteredResources.length}</strong> of <strong>{resources.length}</strong> resources
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.entries(categories).map(([key, { label, icon }]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === key
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {icon} {label}
            </button>
          ))}
        </div>

        {/* Coming Soon Notice */}
        {resources.length === 1 && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🚀</span>
              <div>
                <p className="text-sm font-medium text-blue-900">
                  More resources coming soon!
                </p>
                <p className="text-xs text-blue-700 mt-0.5">
                  We're working on additional guides, checklists, and tools. Check back regularly for updates.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Resources Grid */}
        {filteredResources.length > 0 ? (
          <div className={`grid gap-6 ${
            filteredResources.length === 1 
              ? 'md:grid-cols-1 lg:grid-cols-1 max-w-2xl mx-auto' 
              : 'md:grid-cols-2 lg:grid-cols-3'
          }`}>
            {filteredResources.map((resource) => (
              <div
                key={resource.id}
                className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Card Header */}
                <div className="p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="text-4xl">{resource.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg leading-tight mb-1">
                        {resource.title}
                      </h3>
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        resource.category === 'handbook' ? 'bg-blue-100 text-blue-700' :
                        resource.category === 'checklists' ? 'bg-green-100 text-green-700' :
                        resource.category === 'tools' ? 'bg-purple-100 text-purple-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {categories[resource.category].label}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {resource.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      📄 {resource.pages} pages
                    </span>
                    <span className="flex items-center gap-1">
                      💾 {resource.fileSize}
                    </span>
                  </div>

                  {/* Download Button */}
                  <button
                    onClick={() => handleDownload(resource)}
                    className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center gap-2"
                  >
                    <span>⬇️</span>
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 border border-gray-200 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No resources found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            📖 About These Resources
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">✓ Free & Open Access</h3>
              <p>All resources are completely free to download and use. No registration or email required.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">🔄 Regularly Updated</h3>
              <p>Our resources are updated to reflect the latest WCAG standards and accessibility best practices.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">🎯 Practical & Actionable</h3>
              <p>Each resource includes practical examples, code snippets, and real-world implementation guidance.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">🌍 Universal Design</h3>
              <p>Created with universal design principles to ensure accessibility for all users and contexts.</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-8 border border-gray-200 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            🚀 Ready to Test Your Design?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Use our interactive tools to check contrast ratios, test typography settings, 
            and simulate color blindness on your designs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all shadow-md"
            >
              Color Blindness Simulator
            </Link>
            <Link
              href="/contrast-checker"
              className="px-6 py-3 bg-white text-blue-600 border-2 border-blue-500 rounded-lg font-medium hover:bg-blue-50 transition-all"
            >
              Contrast Checker
            </Link>
            <Link
              href="/font-readability"
              className="px-6 py-3 bg-white text-purple-600 border-2 border-purple-500 rounded-lg font-medium hover:bg-purple-50 transition-all"
            >
              Font Playground
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-gray-600">
          <p>
            📚 All resources are provided for educational purposes. 
            Always refer to official <a href="https://www.w3.org/WAI/WCAG21/quickref/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">WCAG documentation</a> for the most current standards.
          </p>
        </div>
      </footer>
    </div>
  );
}

