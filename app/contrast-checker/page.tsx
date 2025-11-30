'use client';

import { useState, useEffect } from 'react';
import { analyzeContrast, suggestAccessibleColor, ContrastResult } from '@/utils/contrastRatio';
import Link from 'next/link';

export default function ContrastChecker() {
  const [textColor, setTextColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [result, setResult] = useState<ContrastResult | null>(null);
  const [suggestedColor, setSuggestedColor] = useState<string | null>(null);
  const [showSuggestion, setShowSuggestion] = useState(false);

  // Calculate contrast on color changes
  useEffect(() => {
    const analysis = analyzeContrast(textColor, bgColor);
    setResult(analysis);

    // Show suggestion if contrast is poor
    if (!analysis.passAA) {
      const suggested = suggestAccessibleColor(textColor, bgColor, 4.5);
      setSuggestedColor(suggested);
      setShowSuggestion(true);
    } else {
      setShowSuggestion(false);
    }
  }, [textColor, bgColor]);

  const handleCopyRatio = () => {
    if (result) {
      const text = `Contrast Ratio: ${result.ratio.toFixed(2)}:1 - ${result.ratingText}`;
      navigator.clipboard.writeText(text);
    }
  };

  const applySuggestion = () => {
    if (suggestedColor) {
      setTextColor(suggestedColor);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Back
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                🎨 Contrast Ratio Checker
              </h1>
              <p className="text-sm text-gray-600 mt-0.5">
                Ensure your colors meet WCAG accessibility standards
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link 
              href="/font-readability"
              className="px-4 py-2 bg-purple-500 text-white hover:bg-purple-600 rounded-lg text-sm font-medium transition-colors"
            >
              Font Playground
            </Link>
            <Link 
              href="/resources"
              className="px-4 py-2 bg-green-500 text-white hover:bg-green-600 rounded-lg text-sm font-medium transition-colors"
            >
              📚 Resources
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column - Controls */}
          <div className="space-y-6">
            {/* Color Pickers Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Color Selection
              </h2>
              
              <div className="space-y-4">
                {/* Text Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Text Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="h-12 w-20 rounded-lg cursor-pointer border-2 border-gray-300"
                    />
                    <input
                      type="text"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm uppercase focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="#000000"
                    />
                  </div>
                </div>

                {/* Background Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="h-12 w-20 rounded-lg cursor-pointer border-2 border-gray-300"
                    />
                    <input
                      type="text"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm uppercase focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="#FFFFFF"
                    />
                  </div>
                </div>

                {/* Quick Presets */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quick Presets
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setTextColor('#000000');
                        setBgColor('#ffffff');
                      }}
                      className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
                    >
                      Black on White
                    </button>
                    <button
                      onClick={() => {
                        setTextColor('#ffffff');
                        setBgColor('#000000');
                      }}
                      className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
                    >
                      White on Black
                    </button>
                    <button
                      onClick={() => {
                        setTextColor('#1e40af');
                        setBgColor('#dbeafe');
                      }}
                      className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
                    >
                      Blue Theme
                    </button>
                    <button
                      onClick={() => {
                        setTextColor('#65a30d');
                        setBgColor('#f0fdf4');
                      }}
                      className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
                    >
                      Green Theme
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Card */}
            {result && (
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Contrast Analysis
                  </h2>
                  <button
                    onClick={handleCopyRatio}
                    className="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-sm font-medium transition-colors"
                  >
                    📋 Copy
                  </button>
                </div>

                {/* Contrast Ratio */}
                <div className="mb-6">
                  <div className="text-5xl font-bold text-gray-900 mb-2">
                    {result.ratio.toFixed(2)}
                    <span className="text-2xl text-gray-500">:1</span>
                  </div>
                  <div className={`text-lg font-semibold ${
                    result.passAAA ? 'text-green-600' :
                    result.passAA ? 'text-blue-600' :
                    result.passAALarge ? 'text-orange-600' :
                    'text-red-600'
                  }`}>
                    {result.ratingText}
                  </div>
                </div>

                {/* WCAG Standards Table */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    WCAG Compliance
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className={`p-3 rounded-lg ${
                      result.passAA ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                    }`}>
                      <div className="font-medium text-gray-900">AA Normal Text</div>
                      <div className="text-xs text-gray-600 mt-1">
                        {result.passAA ? '✓ Pass (≥4.5:1)' : '✗ Fail (≥4.5:1)'}
                      </div>
                    </div>

                    <div className={`p-3 rounded-lg ${
                      result.passAALarge ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                    }`}>
                      <div className="font-medium text-gray-900">AA Large Text</div>
                      <div className="text-xs text-gray-600 mt-1">
                        {result.passAALarge ? '✓ Pass (≥3:1)' : '✗ Fail (≥3:1)'}
                      </div>
                    </div>

                    <div className={`p-3 rounded-lg ${
                      result.passAAA ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                    }`}>
                      <div className="font-medium text-gray-900">AAA Normal Text</div>
                      <div className="text-xs text-gray-600 mt-1">
                        {result.passAAA ? '✓ Pass (≥7:1)' : '✗ Fail (≥7:1)'}
                      </div>
                    </div>

                    <div className={`p-3 rounded-lg ${
                      result.passAAALarge ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                    }`}>
                      <div className="font-medium text-gray-900">AAA Large Text</div>
                      <div className="text-xs text-gray-600 mt-1">
                        {result.passAAALarge ? '✓ Pass (≥4.5:1)' : '✗ Fail (≥4.5:1)'}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-xs text-gray-700">
                      <strong>Note:</strong> Large text is defined as 18px+ (or 14px+ bold)
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Suggestion Card */}
            {showSuggestion && suggestedColor && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-amber-900 mb-3">
                  💡 Suggested Improvement
                </h3>
                <p className="text-sm text-gray-700 mb-4">
                  Your current contrast ratio doesn't meet AA standards. 
                  Try this accessible alternative:
                </p>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="h-10 w-10 rounded-lg border-2 border-gray-300"
                    style={{ backgroundColor: suggestedColor }}
                  />
                  <code className="flex-1 px-3 py-2 bg-white rounded-lg text-sm font-mono border border-amber-300">
                    {suggestedColor}
                  </code>
                  <button
                    onClick={applySuggestion}
                    className="px-4 py-2 bg-amber-600 text-white hover:bg-amber-700 rounded-lg text-sm font-medium transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Preview */}
          <div className="space-y-6">
            {/* Main Preview Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Live Preview
              </h2>

              {/* Large Preview */}
              <div
                className="rounded-lg p-8 mb-6 min-h-[200px] flex items-center justify-center border-2"
                style={{
                  backgroundColor: bgColor,
                  color: textColor,
                  borderColor: '#e5e7eb'
                }}
              >
                <div className="text-center">
                  <h3 className="text-3xl font-bold mb-2">
                    Sample Heading
                  </h3>
                  <p className="text-lg">
                    This is how your text will appear
                  </p>
                </div>
              </div>

              {/* Multiple Font Size Previews */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-700">
                  Different Text Sizes
                </h3>
                
                {/* 14px Normal */}
                <div
                  className="rounded-lg p-4 border"
                  style={{
                    backgroundColor: bgColor,
                    color: textColor,
                    borderColor: '#e5e7eb'
                  }}
                >
                  <div style={{ fontSize: '14px' }}>
                    14px Normal Text - The quick brown fox jumps over the lazy dog
                  </div>
                </div>

                {/* 14px Bold */}
                <div
                  className="rounded-lg p-4 border"
                  style={{
                    backgroundColor: bgColor,
                    color: textColor,
                    borderColor: '#e5e7eb'
                  }}
                >
                  <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
                    14px Bold Text - The quick brown fox jumps over the lazy dog
                  </div>
                </div>

                {/* 18px Normal */}
                <div
                  className="rounded-lg p-4 border"
                  style={{
                    backgroundColor: bgColor,
                    color: textColor,
                    borderColor: '#e5e7eb'
                  }}
                >
                  <div style={{ fontSize: '18px' }}>
                    18px Normal Text - The quick brown fox jumps over
                  </div>
                </div>

                {/* 24px Bold */}
                <div
                  className="rounded-lg p-4 border"
                  style={{
                    backgroundColor: bgColor,
                    color: textColor,
                    borderColor: '#e5e7eb'
                  }}
                >
                  <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                    24px Bold Text - Large Heading
                  </div>
                </div>
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-blue-900 mb-3">
                📚 About WCAG Standards
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>AA</strong> is the minimum recommended level for most websites</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>AAA</strong> provides enhanced accessibility for critical content</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Large text (18px+ or 14px+ bold) has more relaxed requirements</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Higher contrast ratios benefit users with low vision</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

