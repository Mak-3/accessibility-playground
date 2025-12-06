'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { analyzeForScreenReader, ScreenReaderAnalysis, HeadingNode } from '@/utils/screenReaderAnalysis';

const DEFAULT_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <title>Welcome to My Website</title>
</head>
<body>
  <header>
    <nav aria-label="Main navigation">
      <a href="/">Home</a>
      <a href="/about">About</a>
    </nav>
  </header>

  <main>
    <h1>Welcome to Our Site</h1>
    
    <section>
      <h2>Featured Content</h2>
      <p>This is an example of accessible HTML structure.</p>
      <img src="example.jpg" alt="A beautiful landscape" />
    </section>

    <section>
      <h2>About Us</h2>
      <h3>Our Mission</h3>
      <p>Making the web accessible for everyone.</p>
    </section>
  </main>

  <footer>
    <p>&copy; 2024 My Website</p>
  </footer>
</body>
</html>`;

export default function ScreenReaderPreview() {
  const [htmlInput, setHtmlInput] = useState(DEFAULT_HTML);
  const [analysis, setAnalysis] = useState<ScreenReaderAnalysis | null>(null);
  const [activeTab, setActiveTab] = useState<'preview' | 'headings' | 'landmarks' | 'images' | 'aria'>('preview');

  useEffect(() => {
    try {
      const result = analyzeForScreenReader(htmlInput);
      setAnalysis(result);
    } catch (error) {
      console.error('Analysis error:', error);
    }
  }, [htmlInput]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return 'bg-green-50 border-green-200';
    if (score >= 70) return 'bg-blue-50 border-blue-200';
    if (score >= 50) return 'bg-orange-50 border-orange-200';
    return 'bg-red-50 border-red-200';
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
              aria-label="Back to home"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                🎤 Screen Reader Preview
              </h1>
              <p className="text-sm text-gray-600">Understand how screen readers interpret your HTML</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column - HTML Input */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200 px-6 py-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  HTML Input
                </h2>
                <button
                  onClick={() => setHtmlInput(DEFAULT_HTML)}
                  className="text-sm px-3 py-1.5 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                >
                  Reset to Example
                </button>
              </div>
              
              <div className="p-4">
                <textarea
                  value={htmlInput}
                  onChange={(e) => setHtmlInput(e.target.value)}
                  className="w-full h-[500px] px-4 py-3 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Paste your HTML here..."
                  spellCheck={false}
                />
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-blue-900 mb-3">
                💡 What This Tool Does
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Simulates how screen readers announce your content</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Validates heading hierarchy and structure</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Identifies landmarks and navigation regions</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Checks images for proper alt text</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Detects ARIA issues and misuse</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Analysis Results */}
          <div className="space-y-6">
            {analysis && (
              <>
                {/* Score Card */}
                <div className={`bg-white rounded-xl shadow-lg p-6 border ${getScoreBgColor(analysis.score)}`}>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    📊 Accessibility Score
                  </h2>
                  
                  <div className="flex items-center gap-6 mb-6">
                    <div className="text-6xl font-bold">
                      <span className={getScoreColor(analysis.score)}>{analysis.score}</span>
                      <span className="text-2xl text-gray-400">/100</span>
                    </div>
                    
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 ${
                            analysis.score >= 90 ? 'bg-green-500' :
                            analysis.score >= 70 ? 'bg-blue-500' :
                            analysis.score >= 50 ? 'bg-orange-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${analysis.score}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Poor</span>
                        <span>Fair</span>
                        <span>Good</span>
                        <span>Excellent</span>
                      </div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">
                      Recommendations
                    </h3>
                    {analysis.recommendations.map((rec, idx) => (
                      <div key={idx} className="flex gap-2 text-sm text-gray-700">
                        <span className="text-blue-600">•</span>
                        <span>{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tab Navigation */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                  <div className="border-b border-gray-200">
                    <div className="flex overflow-x-auto">
                      <button
                        onClick={() => setActiveTab('preview')}
                        className={`px-6 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                          activeTab === 'preview'
                            ? 'border-blue-600 text-blue-600 bg-blue-50'
                            : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        🎤 SR Preview
                      </button>
                      <button
                        onClick={() => setActiveTab('headings')}
                        className={`px-6 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                          activeTab === 'headings'
                            ? 'border-blue-600 text-blue-600 bg-blue-50'
                            : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        📋 Headings ({analysis.headings.length})
                      </button>
                      <button
                        onClick={() => setActiveTab('landmarks')}
                        className={`px-6 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                          activeTab === 'landmarks'
                            ? 'border-blue-600 text-blue-600 bg-blue-50'
                            : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        🗺️ Landmarks ({analysis.landmarks.length})
                      </button>
                      <button
                        onClick={() => setActiveTab('images')}
                        className={`px-6 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                          activeTab === 'images'
                            ? 'border-blue-600 text-blue-600 bg-blue-50'
                            : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        🖼️ Images ({analysis.images.length})
                      </button>
                      <button
                        onClick={() => setActiveTab('aria')}
                        className={`px-6 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                          activeTab === 'aria'
                            ? 'border-blue-600 text-blue-600 bg-blue-50'
                            : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        ⚠️ ARIA Issues ({analysis.ariaIssues.length})
                      </button>
                    </div>
                  </div>

                  {/* Tab Content */}
                  <div className="p-6 max-h-[600px] overflow-y-auto">
                    {activeTab === 'preview' && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Screen Reader Announcement
                        </h3>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-sm whitespace-pre-wrap">
                          {analysis.screenReaderText || 'No content to announce'}
                        </div>
                      </div>
                    )}

                    {activeTab === 'headings' && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Heading Hierarchy
                        </h3>
                        {analysis.headings.length === 0 ? (
                          <div className="text-center py-8 text-gray-500">
                            <p className="text-4xl mb-2">📋</p>
                            <p>No headings found</p>
                            <p className="text-sm mt-1">Add h1-h6 elements to structure your content</p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {analysis.headings.map((heading, idx) => (
                              <div 
                                key={idx}
                                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                style={{ marginLeft: `${(heading.level - 1) * 20}px` }}
                              >
                                <span className={`
                                  px-2 py-1 rounded text-xs font-bold flex-shrink-0
                                  ${heading.level === 1 ? 'bg-purple-100 text-purple-700' :
                                    heading.level === 2 ? 'bg-blue-100 text-blue-700' :
                                    heading.level === 3 ? 'bg-green-100 text-green-700' :
                                    heading.level === 4 ? 'bg-yellow-100 text-yellow-700' :
                                    heading.level === 5 ? 'bg-orange-100 text-orange-700' :
                                    'bg-red-100 text-red-700'}
                                `}>
                                  H{heading.level}
                                </span>
                                <span className="flex-1 text-gray-700">{heading.text}</span>
                                {heading.id && (
                                  <span className="text-xs text-gray-500 font-mono">#{heading.id}</span>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === 'landmarks' && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Landmark Regions
                        </h3>
                        {analysis.landmarks.length === 0 ? (
                          <div className="text-center py-8 text-gray-500">
                            <p className="text-4xl mb-2">🗺️</p>
                            <p>No landmarks found</p>
                            <p className="text-sm mt-1">Use semantic HTML5 elements like header, nav, main, footer</p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {analysis.landmarks.map((landmark, idx) => (
                              <div 
                                key={idx}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-2xl">
                                    {landmark.type === 'banner' || landmark.type === 'header' ? '🏁' :
                                     landmark.type === 'navigation' ? '🧭' :
                                     landmark.type === 'main' ? '📄' :
                                     landmark.type === 'complementary' ? '📌' :
                                     landmark.type === 'contentinfo' ? '📋' :
                                     landmark.type === 'region' ? '📦' :
                                     landmark.type === 'form' ? '📝' :
                                     '📍'}
                                  </span>
                                  <div>
                                    <div className="font-medium text-gray-900 capitalize">{landmark.type}</div>
                                    {landmark.label && (
                                      <div className="text-sm text-gray-600">"{landmark.label}"</div>
                                    )}
                                  </div>
                                </div>
                                {landmark.role && (
                                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded font-mono">
                                    role="{landmark.role}"
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === 'images' && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Image Accessibility
                        </h3>
                        {analysis.images.length === 0 ? (
                          <div className="text-center py-8 text-gray-500">
                            <p className="text-4xl mb-2">🖼️</p>
                            <p>No images found</p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {analysis.images.map((image, idx) => (
                              <div 
                                key={idx}
                                className={`p-4 rounded-lg border ${
                                  !image.hasAlt ? 'bg-red-50 border-red-200' :
                                  image.isDecorative ? 'bg-gray-50 border-gray-200' :
                                  'bg-green-50 border-green-200'
                                }`}
                              >
                                <div className="flex items-start gap-3">
                                  <span className="text-2xl">
                                    {!image.hasAlt ? '❌' : image.isDecorative ? '🎨' : '✅'}
                                  </span>
                                  <div className="flex-1">
                                    <div className="font-mono text-xs text-gray-600 mb-1 break-all">
                                      {image.src}
                                    </div>
                                    {image.hasAlt ? (
                                      <>
                                        <div className="text-sm font-medium text-gray-900">
                                          {image.isDecorative ? (
                                            <span className="text-gray-600">Decorative image (empty alt)</span>
                                          ) : (
                                            <>Alt: "{image.alt}"</>
                                          )}
                                        </div>
                                      </>
                                    ) : (
                                      <div className="text-sm font-medium text-red-700">
                                        ⚠️ Missing alt attribute
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === 'aria' && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          ARIA Issues
                        </h3>
                        {analysis.ariaIssues.length === 0 ? (
                          <div className="text-center py-8 text-gray-500">
                            <p className="text-4xl mb-2">✅</p>
                            <p className="font-semibold text-green-600">No ARIA issues found!</p>
                            <p className="text-sm mt-1">Your ARIA usage looks good</p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {analysis.ariaIssues.map((issue, idx) => (
                              <div 
                                key={idx}
                                className={`p-4 rounded-lg border ${
                                  issue.type === 'error' ? 'bg-red-50 border-red-200' :
                                  issue.type === 'warning' ? 'bg-orange-50 border-orange-200' :
                                  'bg-blue-50 border-blue-200'
                                }`}
                              >
                                <div className="flex items-start gap-3 mb-2">
                                  <span className="text-xl">
                                    {issue.type === 'error' ? '❌' :
                                     issue.type === 'warning' ? '⚠️' : 'ℹ️'}
                                  </span>
                                  <div className="flex-1">
                                    <div className="font-mono text-xs text-gray-600 mb-1">
                                      {issue.element}
                                    </div>
                                    <div className={`text-sm font-medium mb-1 ${
                                      issue.type === 'error' ? 'text-red-700' :
                                      issue.type === 'warning' ? 'text-orange-700' :
                                      'text-blue-700'
                                    }`}>
                                      {issue.issue}
                                    </div>
                                    <div className="text-sm text-gray-700">
                                      💡 {issue.suggestion}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

