'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { analyzeTouchTargets, TouchTargetAnalysis, TouchTarget } from '@/utils/touchTargetAnalysis';

interface DraggableTarget {
  id: string;
  element: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

const INITIAL_TARGETS: DraggableTarget[] = [
  { id: '1', element: 'Button 1', x: 50, y: 50, width: 120, height: 40, color: '#3b82f6' },
  { id: '2', element: 'Button 2', x: 200, y: 50, width: 100, height: 35, color: '#8b5cf6' },
  { id: '3', element: 'Icon Button', x: 50, y: 120, width: 32, height: 32, color: '#ec4899' },
  { id: '4', element: 'Large Button', x: 200, y: 150, width: 150, height: 50, color: '#10b981' },
  { id: '5', element: 'Small Link', x: 100, y: 220, width: 60, height: 24, color: '#f59e0b' },
];

export default function TouchTargetChecker() {
  const [targets, setTargets] = useState<DraggableTarget[]>(INITIAL_TARGETS);
  const [analysis, setAnalysis] = useState<TouchTargetAnalysis | null>(null);
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null);
  const [draggedTarget, setDraggedTarget] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);
  const [showGrid, setShowGrid] = useState(true);
  const [showSpacing, setShowSpacing] = useState(true);

  // Analyze targets whenever they change
  useEffect(() => {
    const targetsForAnalysis = targets.map(t => ({
      id: t.id,
      element: t.element,
      x: t.x,
      y: t.y,
      width: t.width,
      height: t.height,
    }));
    const result = analyzeTouchTargets(targetsForAnalysis);
    setAnalysis(result);
  }, [targets]);

  const handleMouseDown = (e: React.MouseEvent, targetId: string) => {
    const target = targets.find(t => t.id === targetId);
    if (!target) return;

    setDraggedTarget(targetId);
    setSelectedTarget(targetId);
    
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggedTarget || !canvasRef.current) return;

    const canvasRect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - canvasRect.left - dragOffset.x;
    const y = e.clientY - canvasRect.top - dragOffset.y;

    setTargets(prev => prev.map(t => 
      t.id === draggedTarget ? { ...t, x: Math.max(0, x), y: Math.max(0, y) } : t
    ));
  };

  const handleMouseUp = () => {
    setDraggedTarget(null);
  };

  const addTarget = () => {
    const newId = (Math.max(...targets.map(t => parseInt(t.id))) + 1).toString();
    const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#ef4444'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    setTargets([...targets, {
      id: newId,
      element: `Target ${newId}`,
      x: 50 + (targets.length * 30) % 300,
      y: 50 + (targets.length * 30) % 200,
      width: 100,
      height: 40,
      color: randomColor,
    }]);
  };

  const removeTarget = (id: string) => {
    setTargets(targets.filter(t => t.id !== id));
    if (selectedTarget === id) setSelectedTarget(null);
  };

  const updateTarget = (id: string, updates: Partial<DraggableTarget>) => {
    setTargets(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const resetTargets = () => {
    setTargets(INITIAL_TARGETS);
    setSelectedTarget(null);
  };

  const selectedTargetData = targets.find(t => t.id === selectedTarget);
  const selectedAnalysis = analysis?.targets.find(t => t.id === selectedTarget);

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
                📱 Touch Target Size Checker
              </h1>
              <p className="text-sm text-gray-600">Ensure your interactive elements are easy to tap</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Canvas */}
          <div className="lg:col-span-2 space-y-6">
            {/* Canvas Card */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200 px-6 py-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Interactive Canvas
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowGrid(!showGrid)}
                    className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${
                      showGrid ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setShowSpacing(!showSpacing)}
                    className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${
                      showSpacing ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    Spacing
                  </button>
                  <button
                    onClick={addTarget}
                    className="text-sm px-3 py-1.5 bg-green-500 text-white hover:bg-green-600 rounded-lg transition-colors"
                  >
                    + Add Target
                  </button>
                  <button
                    onClick={resetTargets}
                    className="text-sm px-3 py-1.5 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>
              
              <div 
                ref={canvasRef}
                className="relative bg-gradient-to-br from-gray-50 to-gray-100 h-[500px] overflow-hidden cursor-crosshair"
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                style={{
                  backgroundImage: showGrid ? 'radial-gradient(circle, #d1d5db 1px, transparent 1px)' : 'none',
                  backgroundSize: showGrid ? '20px 20px' : 'auto',
                }}
              >
                {/* Spacing indicators */}
                {showSpacing && analysis && analysis.spacingIssues.map((issue, idx) => {
                  const target1 = targets.find(t => t.element === issue.target1);
                  const target2 = targets.find(t => t.element === issue.target2);
                  if (!target1 || !target2) return null;

                  const x1 = target1.x + target1.width / 2;
                  const y1 = target1.y + target1.height / 2;
                  const x2 = target2.x + target2.width / 2;
                  const y2 = target2.y + target2.height / 2;

                  return (
                    <svg
                      key={idx}
                      className="absolute inset-0 pointer-events-none"
                      style={{ width: '100%', height: '100%' }}
                    >
                      <line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={issue.status === 'fail' ? '#ef4444' : issue.status === 'warning' ? '#f59e0b' : '#10b981'}
                        strokeWidth="2"
                        strokeDasharray="5,5"
                      />
                    </svg>
                  );
                })}

                {/* Targets */}
                {targets.map((target) => {
                  const targetAnalysis = analysis?.targets.find(t => t.id === target.id);
                  const isSelected = selectedTarget === target.id;

                  return (
                    <div
                      key={target.id}
                      className={`absolute cursor-move transition-shadow ${
                        isSelected ? 'ring-4 ring-blue-500 z-10' : ''
                      } ${
                        targetAnalysis?.status === 'fail' ? 'ring-2 ring-red-500' :
                        targetAnalysis?.status === 'warning' ? 'ring-2 ring-orange-500' :
                        'ring-1 ring-gray-300'
                      }`}
                      style={{
                        left: target.x,
                        top: target.y,
                        width: target.width,
                        height: target.height,
                        backgroundColor: target.color,
                        opacity: 0.9,
                        borderRadius: '8px',
                      }}
                      onMouseDown={(e) => handleMouseDown(e, target.id)}
                      onClick={() => setSelectedTarget(target.id)}
                    >
                      <div className="w-full h-full flex items-center justify-center text-white font-medium text-sm px-2 text-center select-none">
                        {target.element}
                      </div>
                      {/* Size indicator */}
                      <div className="absolute -bottom-6 left-0 text-xs text-gray-600 whitespace-nowrap bg-white px-1 rounded">
                        {target.width}×{target.height}px
                      </div>
                    </div>
                  );
                })}

                {/* Instructions overlay when no targets selected */}
                {!selectedTarget && targets.length > 0 && (
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg text-sm text-gray-700">
                    💡 Click and drag targets to move them • Click to select and edit
                  </div>
                )}
              </div>
            </div>

            {/* Editor Panel */}
            {selectedTargetData && selectedAnalysis && (
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Edit Target: {selectedTargetData.element}
                  </h3>
                  <button
                    onClick={() => removeTarget(selectedTarget!)}
                    className="text-sm px-3 py-1.5 bg-red-500 text-white hover:bg-red-600 rounded-lg transition-colors"
                  >
                    Delete
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Label
                    </label>
                    <input
                      type="text"
                      value={selectedTargetData.element}
                      onChange={(e) => updateTarget(selectedTarget!, { element: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Color
                    </label>
                    <input
                      type="color"
                      value={selectedTargetData.color}
                      onChange={(e) => updateTarget(selectedTarget!, { color: e.target.value })}
                      className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Width (px)
                    </label>
                    <input
                      type="number"
                      value={selectedTargetData.width}
                      onChange={(e) => updateTarget(selectedTarget!, { width: parseInt(e.target.value) || 0 })}
                      min="20"
                      max="300"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Height (px)
                    </label>
                    <input
                      type="number"
                      value={selectedTargetData.height}
                      onChange={(e) => updateTarget(selectedTarget!, { height: parseInt(e.target.value) || 0 })}
                      min="20"
                      max="300"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Target Status */}
                <div className={`mt-4 p-3 rounded-lg border ${
                  selectedAnalysis.status === 'pass' ? 'bg-green-50 border-green-200' :
                  selectedAnalysis.status === 'warning' ? 'bg-orange-50 border-orange-200' :
                  'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <span className="text-xl">
                      {selectedAnalysis.status === 'pass' ? '✅' :
                       selectedAnalysis.status === 'warning' ? '⚠️' : '❌'}
                    </span>
                    <span className={
                      selectedAnalysis.status === 'pass' ? 'text-green-700' :
                      selectedAnalysis.status === 'warning' ? 'text-orange-700' :
                      'text-red-700'
                    }>
                      {selectedAnalysis.message}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Analysis */}
          <div className="space-y-6">
            {analysis && (
              <>
                {/* Score Card */}
                <div className={`bg-white rounded-xl shadow-lg p-6 border ${getScoreBgColor(analysis.score)}`}>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    📊 Accessibility Score
                  </h2>
                  
                  <div className="text-center mb-6">
                    <div className="text-6xl font-bold mb-2">
                      <span className={getScoreColor(analysis.score)}>{analysis.score}</span>
                      <span className="text-2xl text-gray-400">/100</span>
                    </div>
                    
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
                  </div>

                  {/* Summary */}
                  <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                    <div className="p-2 bg-white rounded border border-gray-200">
                      <div className="text-gray-600">Total</div>
                      <div className="text-xl font-bold text-gray-900">{analysis.summary.total}</div>
                    </div>
                    <div className="p-2 bg-green-50 rounded border border-green-200">
                      <div className="text-gray-600">Pass</div>
                      <div className="text-xl font-bold text-green-600">{analysis.summary.pass}</div>
                    </div>
                    <div className="p-2 bg-orange-50 rounded border border-orange-200">
                      <div className="text-gray-600">Warning</div>
                      <div className="text-xl font-bold text-orange-600">{analysis.summary.warning}</div>
                    </div>
                    <div className="p-2 bg-red-50 rounded border border-red-200">
                      <div className="text-gray-600">Fail</div>
                      <div className="text-xl font-bold text-red-600">{analysis.summary.fail}</div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">
                      Recommendations
                    </h3>
                    <div className="space-y-2">
                      {analysis.recommendations.map((rec, idx) => (
                        <div key={idx} className="flex gap-2 text-sm text-gray-700">
                          <span className="text-blue-600">•</span>
                          <span>{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Guidelines Card */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    📏 Size Guidelines
                  </h3>
                  
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="font-semibold text-green-900 mb-1">
                        ✅ Minimum (WCAG AAA)
                      </div>
                      <div className="text-gray-700">
                        44×44 pixels
                      </div>
                    </div>

                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="font-semibold text-blue-900 mb-1">
                        🎯 Recommended
                      </div>
                      <div className="text-gray-700">
                        48×48 pixels or larger
                      </div>
                    </div>

                    <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="font-semibold text-purple-900 mb-1">
                        📐 Spacing
                      </div>
                      <div className="text-gray-700">
                        8px minimum between targets
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tips Card */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-blue-900 mb-3">
                    💡 Best Practices
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex gap-2">
                      <span className="text-blue-600">•</span>
                      <span>Square targets are easier to tap accurately</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600">•</span>
                      <span>Increase padding rather than just visual size</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600">•</span>
                      <span>Group related actions with adequate spacing</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600">•</span>
                      <span>Test with actual touch devices when possible</span>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

