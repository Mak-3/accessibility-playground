'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { analyzeSemanticHTML, SemanticAnalysis } from '@/utils/semanticAnalysis';

const DEFAULT_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <title>Example Page</title>
</head>
<body>
  <div class="header">
    <div class="logo">My Website</div>
    <div class="nav">
      <a href="/">Home</a>
      <a href="/about">About</a>
    </div>
  </div>

  <div class="content">
    <div class="post">
      <h1>Article Title</h1>
      <p>This is an example using divs instead of semantic elements.</p>
      <div onclick="like()">Like This</div>
    </div>

    <div class="sidebar">
      <h2>Related</h2>
      <ul>
        <li>Link 1</li>
        <li>Link 2</li>
      </ul>
    </div>
  </div>

  <div class="footer">
    <p>&copy; 2024 My Website</p>
  </div>
</body>
</html>`;

const SEMANTIC_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <title>Semantic Example</title>
</head>
<body>
  <header>
    <div class="logo">My Website</div>
    <nav aria-label="Main navigation">
      <a href="/">Home</a>
      <a href="/about">About</a>
    </nav>
  </header>

  <main>
    <article>
      <h1>Article Title</h1>
      <p>This example uses proper semantic HTML5 elements.</p>
      <button type="button" onclick="like()">Like This</button>
    </article>

    <aside>
      <h2>Related</h2>
      <ul>
        <li>Link 1</li>
        <li>Link 2</li>
      </ul>
    </aside>
  </main>

  <footer>
    <p>&copy; 2024 My Website</p>
  </footer>
</body>
</html>`;

export default function HtmlSemanticAnalyzer() {
  const [htmlInput, setHtmlInput] = useState(DEFAULT_HTML);
  const [analysis, setAnalysis] = useState<SemanticAnalysis | null>(null);
  const [activeTab, setActiveTab] = useState<'elements' | 'issues' | 'suggestions'>('elements');

  useEffect(() => {
    try {
      const result = analyzeSemanticHTML(htmlInput);
      setAnalysis(result);
    } catch (error) {
      console.error('Analysis error:', error);
    }
  }, [htmlInput]);

  const loadExample = (type: 'bad' | 'good') => {
    setHtmlInput(type === 'bad' ? DEFAULT_HTML : SEMANTIC_HTML);
  };

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

  const getRatioColor = (ratio: number) => {
    if (ratio === Infinity) return 'text-red-600';
    if (ratio > 5) return 'text-orange-600';
    if (ratio > 2) return 'text-yellow-600';
    return 'text-green-600';
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
                🔍 HTML Semantic Analyzer
              </h1>
              <p className="text-sm text-gray-600">Improve your HTML structure with semantic elements</p>
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
                <div className="flex gap-2">
                  <button
                    onClick={() => loadExample('bad')}
                    className="text-sm px-3 py-1.5 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg transition-colors"
                  >
                    Bad Example
                  </button>
                  <button
                    onClick={() => loadExample('good')}
                    className="text-sm px-3 py-1.5 bg-green-100 text-green-700 hover:bg-green-200 rounded-lg transition-colors"
                  >
                    Good Example
                  </button>
                </div>
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

            {/* Quick Info */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-purple-900 mb-3">
                💡 What is Semantic HTML?
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex gap-2">
                  <span className="text-purple-600">•</span>
                  <span>Uses meaningful tags that describe content purpose</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-600">•</span>
                  <span>Improves accessibility for screen readers</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-600">•</span>
                  <span>Better SEO and search engine understanding</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-600">•</span>
                  <span>Easier to maintain and understand code</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Analysis Results */}
          <div className="space-y-6">
            {analysis && (
              <>
                {/* Score Card */}
                <div className={`bg-white rounded-xl shadow-lg p-6 border ${getScoreBgColor(analysis.semanticScore)}`}>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    📊 Semantic Score
                  </h2>
                  
                  <div className="flex items-center gap-6 mb-6">
                    <div className="text-6xl font-bold">
                      <span className={getScoreColor(analysis.semanticScore)}>{analysis.semanticScore}</span>
                      <span className="text-2xl text-gray-400">/100</span>
                    </div>
                    
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 ${
                            analysis.semanticScore >= 90 ? 'bg-green-500' :
                            analysis.semanticScore >= 70 ? 'bg-blue-500' :
                            analysis.semanticScore >= 50 ? 'bg-orange-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${analysis.semanticScore}%` }}
                        />
                      </div>
                      
                      {/* Div to Semantic Ratio */}
                      <div className="mt-3 p-2 bg-white rounded border border-gray-200">
                        <div className="text-xs text-gray-600 mb-1">Div-to-Semantic Ratio</div>
                        <div className={`text-lg font-bold ${getRatioColor(analysis.divToSemanticRatio)}`}>
                          {analysis.divToSemanticRatio === Infinity ? '∞' : analysis.divToSemanticRatio.toFixed(1)}:1
                          <span className="text-xs ml-1 text-gray-500">
                            {analysis.divToSemanticRatio === Infinity ? '(no semantic elements)' :
                             analysis.divToSemanticRatio > 5 ? '(too many divs)' :
                             analysis.divToSemanticRatio > 2 ? '(could improve)' :
                             '(good balance)'}
                          </span>
                        </div>
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
                    <div className="flex">
                      <button
                        onClick={() => setActiveTab('elements')}
                        className={`flex-1 px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                          activeTab === 'elements'
                            ? 'border-blue-600 text-blue-600 bg-blue-50'
                            : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        📦 Elements ({analysis.elements.length})
                      </button>
                      <button
                        onClick={() => setActiveTab('issues')}
                        className={`flex-1 px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                          activeTab === 'issues'
                            ? 'border-blue-600 text-blue-600 bg-blue-50'
                            : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        ⚠️ Issues ({analysis.divSoupIssues.length})
                      </button>
                      <button
                        onClick={() => setActiveTab('suggestions')}
                        className={`flex-1 px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                          activeTab === 'suggestions'
                            ? 'border-blue-600 text-blue-600 bg-blue-50'
                            : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        💡 Suggestions ({analysis.suggestions.length})
                      </button>
                    </div>
                  </div>

                  {/* Tab Content */}
                  <div className="p-6 max-h-[600px] overflow-y-auto">
                    {activeTab === 'elements' && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Semantic Elements Found
                        </h3>
                        {analysis.elements.length === 0 ? (
                          <div className="text-center py-8 text-gray-500">
                            <p className="text-4xl mb-2">📦</p>
                            <p>No semantic elements detected</p>
                            <p className="text-sm mt-1">Consider adding HTML5 semantic tags</p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {analysis.elements.map((element, idx) => (
                              <div 
                                key={idx}
                                className={`p-4 rounded-lg border ${
                                  element.status === 'good' ? 'bg-green-50 border-green-200' :
                                  element.status === 'warning' ? 'bg-orange-50 border-orange-200' :
                                  'bg-blue-50 border-blue-200'
                                }`}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-3">
                                    <code className="px-2 py-1 bg-white rounded font-mono text-sm border border-gray-300">
                                      &lt;{element.tag}&gt;
                                    </code>
                                    <span className={`text-2xl font-bold ${
                                      element.status === 'good' ? 'text-green-600' :
                                      element.status === 'warning' ? 'text-orange-600' :
                                      'text-blue-600'
                                    }`}>
                                      {element.count}
                                    </span>
                                  </div>
                                  <span className="text-xl">
                                    {element.status === 'good' ? '✅' :
                                     element.status === 'warning' ? '⚠️' : 'ℹ️'}
                                  </span>
                                </div>
                                <div className="text-sm text-gray-700">
                                  {element.message}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === 'issues' && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Div Soup & Structural Issues
                        </h3>
                        {analysis.divSoupIssues.length === 0 ? (
                          <div className="text-center py-8 text-gray-500">
                            <p className="text-4xl mb-2">✅</p>
                            <p className="font-semibold text-green-600">No major issues found!</p>
                            <p className="text-sm mt-1">Your HTML structure looks clean</p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {analysis.divSoupIssues.map((issue, idx) => (
                              <div 
                                key={idx}
                                className={`p-4 rounded-lg border ${
                                  issue.severity === 'error' ? 'bg-red-50 border-red-200' :
                                  issue.severity === 'warning' ? 'bg-orange-50 border-orange-200' :
                                  'bg-blue-50 border-blue-200'
                                }`}
                              >
                                <div className="flex items-start gap-3 mb-2">
                                  <span className="text-xl mt-1">
                                    {issue.severity === 'error' ? '❌' :
                                     issue.severity === 'warning' ? '⚠️' : 'ℹ️'}
                                  </span>
                                  <div className="flex-1">
                                    <div className="font-mono text-xs text-gray-600 mb-1">
                                      {issue.element}
                                    </div>
                                    <div className={`text-sm font-medium mb-2 ${
                                      issue.severity === 'error' ? 'text-red-700' :
                                      issue.severity === 'warning' ? 'text-orange-700' :
                                      'text-blue-700'
                                    }`}>
                                      {issue.issue}
                                    </div>
                                    <div className="text-sm text-gray-700 bg-white p-2 rounded border border-gray-200">
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

                    {activeTab === 'suggestions' && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Semantic Improvements
                        </h3>
                        {analysis.suggestions.length === 0 ? (
                          <div className="text-center py-8 text-gray-500">
                            <p className="text-4xl mb-2">🎉</p>
                            <p className="font-semibold text-green-600">Great semantic structure!</p>
                            <p className="text-sm mt-1">No obvious improvements needed</p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {analysis.suggestions.map((suggestion, idx) => (
                              <div 
                                key={idx}
                                className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200"
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="flex items-center gap-2 text-sm">
                                    <code className="px-2 py-1 bg-red-100 text-red-700 rounded font-mono">
                                      {suggestion.from}
                                    </code>
                                    <span className="text-gray-600">→</span>
                                    <code className="px-2 py-1 bg-green-100 text-green-700 rounded font-mono">
                                      {suggestion.to}
                                    </code>
                                  </div>
                                </div>
                                <div className="text-sm text-gray-700 mb-3">
                                  <strong>Why:</strong> {suggestion.reason}
                                </div>
                                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs overflow-x-auto">
                                  <pre>{suggestion.example}</pre>
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

