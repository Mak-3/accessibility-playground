'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { analyzeReadability, ReadabilityScore } from '@/utils/readabilityAnalysis';

export default function FontReadability() {
  // Font settings state
  const [fontSize, setFontSize] = useState(100); // percentage
  const [lineHeight, setLineHeight] = useState(1.5); // multiplier
  const [letterSpacing, setLetterSpacing] = useState(0); // pixels
  const [fontWeight, setFontWeight] = useState(400); // 100-900
  const [dyslexiaMode, setDyslexiaMode] = useState(false);
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'justify'>('left');
  const [analysis, setAnalysis] = useState<ReadabilityScore | null>(null);

  // Calculate readability score on settings change
  useEffect(() => {
    const score = analyzeReadability(fontSize, lineHeight, letterSpacing, fontWeight, dyslexiaMode);
    setAnalysis(score);
  }, [fontSize, lineHeight, letterSpacing, fontWeight, dyslexiaMode]);

  // Sample text for preview
  const [sampleText, setSampleText] = useState(
    `The quick brown fox jumps over the lazy dog. Typography plays a crucial role in web accessibility. Good readability ensures that content is accessible to all users, including those with visual impairments or reading difficulties like dyslexia.

Consider these key factors: adequate font size, comfortable line spacing, appropriate letter spacing, and sufficient contrast. Large text (18pt or larger) should have a contrast ratio of at least 3:1, while normal text should have at least 4.5:1.

Remember that readability isn't just about the font itself—it's about the entire reading experience. White space, paragraph length, and content structure all contribute to how easily users can consume your content.`
  );

  // Reset all settings
  const handleReset = () => {
    setFontSize(100);
    setLineHeight(1.5);
    setLetterSpacing(0);
    setFontWeight(400);
    setDyslexiaMode(false);
    setTextAlign('left');
  };

  // Quick presets
  const applyPreset = (preset: string) => {
    switch (preset) {
      case 'comfortable':
        setFontSize(110);
        setLineHeight(1.6);
        setLetterSpacing(0.5);
        setFontWeight(400);
        setDyslexiaMode(false);
        break;
      case 'large':
        setFontSize(150);
        setLineHeight(1.7);
        setLetterSpacing(1);
        setFontWeight(500);
        setDyslexiaMode(false);
        break;
      case 'dyslexia':
        setFontSize(120);
        setLineHeight(1.8);
        setLetterSpacing(1.5);
        setFontWeight(400);
        setDyslexiaMode(true);
        break;
      case 'compact':
        setFontSize(90);
        setLineHeight(1.4);
        setLetterSpacing(0);
        setFontWeight(400);
        setDyslexiaMode(false);
        break;
    }
  };

  // Calculate actual font size in pixels (assuming base 16px)
  const actualFontSize = (16 * fontSize) / 100;

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
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                📖 Font & Readability Playground
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Font Size Control */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Font Size Scaling
              </h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      Scale: {fontSize}%
                    </label>
                    <span className="text-xs text-gray-500">
                      ({actualFontSize.toFixed(1)}px)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="200"
                    step="5"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>50%</span>
                    <span>100%</span>
                    <span>200%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Line Height Control */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Line Spacing
              </h2>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Line Height: {lineHeight.toFixed(1)}
                  </label>
                </div>
                <input
                  type="range"
                  min="1"
                  max="3"
                  step="0.1"
                  value={lineHeight}
                  onChange={(e) => setLineHeight(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Tight</span>
                  <span>Normal</span>
                  <span>Loose</span>
                </div>
              </div>
            </div>

            {/* Letter Spacing Control */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Letter Spacing
              </h2>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Spacing: {letterSpacing}px
                  </label>
                </div>
                <input
                  type="range"
                  min="-2"
                  max="5"
                  step="0.5"
                  value={letterSpacing}
                  onChange={(e) => setLetterSpacing(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Tight</span>
                  <span>Normal</span>
                  <span>Wide</span>
                </div>
              </div>
            </div>

            {/* Font Weight Control */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Font Weight
              </h2>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Weight: {fontWeight}
                  </label>
                </div>
                <input
                  type="range"
                  min="100"
                  max="900"
                  step="100"
                  value={fontWeight}
                  onChange={(e) => setFontWeight(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Light</span>
                  <span>Regular</span>
                  <span>Bold</span>
                </div>
              </div>
            </div>

            {/* Text Alignment */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Text Alignment
              </h2>
              
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setTextAlign('left')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    textAlign === 'left'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Left
                </button>
                <button
                  onClick={() => setTextAlign('center')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    textAlign === 'center'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Center
                </button>
                <button
                  onClick={() => setTextAlign('justify')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    textAlign === 'justify'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Justify
                </button>
              </div>
            </div>

            {/* Dyslexia-Friendly Mode */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Dyslexia-Friendly Mode
              </h2>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={dyslexiaMode}
                  onChange={(e) => setDyslexiaMode(e.target.checked)}
                  className="w-5 h-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-500"
                />
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    Enable Dyslexia Font
                  </div>
                  <div className="text-xs text-gray-500">
                    Uses Comic Sans MS for better readability
                  </div>
                </div>
              </label>

              {dyslexiaMode && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-xs text-gray-700">
                    <strong>Note:</strong> Dyslexia-friendly fonts use distinctive letter shapes 
                    and weighted bottoms to reduce character confusion.
                  </p>
                </div>
              )}
            </div>

            {/* Quick Presets */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Presets
              </h2>
              
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => applyPreset('comfortable')}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors text-left"
                >
                  <div className="font-medium">Comfortable</div>
                  <div className="text-xs text-gray-500">Slightly larger</div>
                </button>
                <button
                  onClick={() => applyPreset('large')}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors text-left"
                >
                  <div className="font-medium">Large</div>
                  <div className="text-xs text-gray-500">For low vision</div>
                </button>
                <button
                  onClick={() => applyPreset('dyslexia')}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors text-left"
                >
                  <div className="font-medium">Dyslexia</div>
                  <div className="text-xs text-gray-500">Optimized</div>
                </button>
                <button
                  onClick={() => applyPreset('compact')}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors text-left"
                >
                  <div className="font-medium">Compact</div>
                  <div className="text-xs text-gray-500">Dense layout</div>
                </button>
              </div>
            </div>

            {/* Readability Analysis */}
            {analysis && (
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  📊 Readability Analysis
                </h2>

                {/* Overall Score */}
                <div className="mb-6">
                  <div className="text-5xl font-bold text-gray-900 mb-2">
                    {analysis.overall}
                    <span className="text-2xl text-gray-500">/100</span>
                  </div>
                  <div className={`text-lg font-semibold ${
                    analysis.ratingColor === 'green' ? 'text-green-600' :
                    analysis.ratingColor === 'blue' ? 'text-blue-600' :
                    analysis.ratingColor === 'orange' ? 'text-orange-600' :
                    'text-red-600'
                  }`}>
                    {analysis.rating} {analysis.rating === 'Excellent' || analysis.rating === 'Good' ? '✓' : ''}
                  </div>
                </div>

                {/* Individual Metrics */}
                <div className="space-y-2 mb-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    Individual Metrics
                  </h3>
                  
                  {/* Font Size */}
                  <div className={`p-3 rounded-lg border ${
                    analysis.fontSize.status === 'pass' ? 'bg-green-50 border-green-200' :
                    analysis.fontSize.status === 'warning' ? 'bg-orange-50 border-orange-200' :
                    'bg-red-50 border-red-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-gray-900 text-sm">Font Size</div>
                      <div className={`text-xs font-medium ${
                        analysis.fontSize.status === 'pass' ? 'text-green-700' :
                        analysis.fontSize.status === 'warning' ? 'text-orange-700' :
                        'text-red-700'
                      }`}>
                        {analysis.fontSize.status === 'pass' ? '✓ Pass' :
                         analysis.fontSize.status === 'warning' ? '⚠ Warning' : '✗ Fail'}
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {analysis.fontSize.message}
                    </div>
                  </div>

                  {/* Line Height */}
                  <div className={`p-3 rounded-lg border ${
                    analysis.lineHeight.status === 'pass' ? 'bg-green-50 border-green-200' :
                    analysis.lineHeight.status === 'warning' ? 'bg-orange-50 border-orange-200' :
                    'bg-red-50 border-red-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-gray-900 text-sm">Line Height</div>
                      <div className={`text-xs font-medium ${
                        analysis.lineHeight.status === 'pass' ? 'text-green-700' :
                        analysis.lineHeight.status === 'warning' ? 'text-orange-700' :
                        'text-red-700'
                      }`}>
                        {analysis.lineHeight.status === 'pass' ? '✓ Pass' :
                         analysis.lineHeight.status === 'warning' ? '⚠ Warning' : '✗ Fail'}
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {analysis.lineHeight.message}
                    </div>
                  </div>

                  {/* Letter Spacing */}
                  <div className={`p-3 rounded-lg border ${
                    analysis.letterSpacing.status === 'pass' ? 'bg-green-50 border-green-200' :
                    analysis.letterSpacing.status === 'warning' ? 'bg-orange-50 border-orange-200' :
                    'bg-red-50 border-red-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-gray-900 text-sm">Letter Spacing</div>
                      <div className={`text-xs font-medium ${
                        analysis.letterSpacing.status === 'pass' ? 'text-green-700' :
                        analysis.letterSpacing.status === 'warning' ? 'text-orange-700' :
                        'text-red-700'
                      }`}>
                        {analysis.letterSpacing.status === 'pass' ? '✓ Pass' :
                         analysis.letterSpacing.status === 'warning' ? '⚠ Warning' : '✗ Fail'}
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {analysis.letterSpacing.message}
                    </div>
                  </div>

                  {/* Font Weight */}
                  <div className={`p-3 rounded-lg border ${
                    analysis.fontWeight.status === 'pass' ? 'bg-green-50 border-green-200' :
                    analysis.fontWeight.status === 'warning' ? 'bg-orange-50 border-orange-200' :
                    'bg-red-50 border-red-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-gray-900 text-sm">Font Weight</div>
                      <div className={`text-xs font-medium ${
                        analysis.fontWeight.status === 'pass' ? 'text-green-700' :
                        analysis.fontWeight.status === 'warning' ? 'text-orange-700' :
                        'text-red-700'
                      }`}>
                        {analysis.fontWeight.status === 'pass' ? '✓ Pass' :
                         analysis.fontWeight.status === 'warning' ? '⚠ Warning' : '✗ Fail'}
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {analysis.fontWeight.message}
                    </div>
                  </div>
                </div>

                {/* Strengths */}
                {analysis.strengths.length > 0 && (
                  <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="text-sm font-semibold text-green-900 mb-2">
                      ✓ Strengths
                    </h4>
                    <ul className="space-y-1">
                      {analysis.strengths.map((strength, idx) => (
                        <li key={idx} className="text-xs text-gray-700 flex gap-2">
                          <span className="text-green-600">•</span>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recommendations */}
                <div className={`p-3 rounded-lg border ${
                  analysis.recommendations[0] === 'Your settings are well-optimized for readability!'
                    ? 'bg-green-50 border-green-200'
                    : 'bg-blue-50 border-blue-200'
                }`}>
                  <h4 className={`text-sm font-semibold mb-2 ${
                    analysis.recommendations[0] === 'Your settings are well-optimized for readability!'
                      ? 'text-green-900'
                      : 'text-blue-900'
                  }`}>
                    💡 Recommendations
                  </h4>
                  <ul className="space-y-1">
                    {analysis.recommendations.map((rec, idx) => (
                      <li key={idx} className="text-xs text-gray-700 flex gap-2">
                        <span className={
                          analysis.recommendations[0] === 'Your settings are well-optimized for readability!'
                            ? 'text-green-600'
                            : 'text-blue-600'
                        }>•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Preview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Live Preview */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
                <h2 className="text-lg font-semibold text-gray-900">
                  Live Preview
                </h2>
              </div>
              
              <div className="p-8">
                <div
                  style={{
                    fontSize: `${fontSize}%`,
                    lineHeight: lineHeight,
                    letterSpacing: `${letterSpacing}px`,
                    fontWeight: fontWeight,
                    fontFamily: dyslexiaMode 
                      ? "'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', cursive" 
                      : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                    textAlign: textAlign,
                    color: '#1f2937',
                  }}
                >
                  {sampleText.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Custom Text Input */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Custom Text
              </h2>
              <textarea
                value={sampleText}
                onChange={(e) => setSampleText(e.target.value)}
                className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your own text to preview..."
              />
            </div>

            {/* Readability Tips */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-purple-900 mb-4">
                💡 Readability Best Practices
              </h3>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-purple-600 font-bold">•</span>
                  <div>
                    <strong className="text-gray-900">Font Size:</strong>
                    <span className="text-gray-700"> Minimum 16px for body text. Allow users to scale up to 200%.</span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-600 font-bold">•</span>
                  <div>
                    <strong className="text-gray-900">Line Height:</strong>
                    <span className="text-gray-700"> 1.5-1.6 for body text provides comfortable reading.</span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-600 font-bold">•</span>
                  <div>
                    <strong className="text-gray-900">Letter Spacing:</strong>
                    <span className="text-gray-700"> Slight increase helps readers with dyslexia.</span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-600 font-bold">•</span>
                  <div>
                    <strong className="text-gray-900">Line Length:</strong>
                    <span className="text-gray-700"> Ideal is 50-75 characters per line (not adjustable here).</span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-600 font-bold">•</span>
                  <div>
                    <strong className="text-gray-900">Dyslexia Fonts:</strong>
                    <span className="text-gray-700"> Distinctive letters with weighted bottoms reduce confusion (b/d, p/q).</span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-600 font-bold">•</span>
                  <div>
                    <strong className="text-gray-900">Alignment:</strong>
                    <span className="text-gray-700"> Left-aligned text is generally easier to read than justified.</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Current Settings Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                📊 Current Settings
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-gray-600 text-xs mb-1">Font Size</div>
                  <div className="font-semibold text-gray-900">{fontSize}% ({actualFontSize.toFixed(1)}px)</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-gray-600 text-xs mb-1">Line Height</div>
                  <div className="font-semibold text-gray-900">{lineHeight.toFixed(1)}</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-gray-600 text-xs mb-1">Letter Spacing</div>
                  <div className="font-semibold text-gray-900">{letterSpacing}px</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-gray-600 text-xs mb-1">Font Weight</div>
                  <div className="font-semibold text-gray-900">{fontWeight}</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-gray-600 text-xs mb-1">Alignment</div>
                  <div className="font-semibold text-gray-900 capitalize">{textAlign}</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-gray-600 text-xs mb-1">Dyslexia Mode</div>
                  <div className="font-semibold text-gray-900">{dyslexiaMode ? 'On' : 'Off'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

