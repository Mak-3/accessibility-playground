'use client';

import { useState } from 'react';
import ColorPaletteEditor, { ColorPalette, defaultColors } from '@/components/ColorPaletteEditor';
import WebsitePreview from '@/components/WebsitePreview';
import ColorBlindnessToggle from '@/components/ColorBlindnessToggle';
import { ColorBlindnessType, ColorBlindnessSVGFilters, getColorBlindnessFilter } from '@/utils/colorBlindness';
import Link from 'next/link';

export default function ColorBlindnessVisualizer() {
  const [palette, setPalette] = useState<ColorPalette>(defaultColors);
  const [colorBlindnessType, setColorBlindnessType] = useState<ColorBlindnessType>('normal');

  const filter = getColorBlindnessFilter(colorBlindnessType);

  return (
    <div className="h-screen flex flex-col">
      {/* Header with navigation */}
      <header className="bg-white border-b border-gray-200 shadow-sm px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <h1 className="text-xl font-bold text-gray-900">
              👁️ Color Blindness Visualizer
            </h1>
          </div>
        </div>
      </header>

      {/* SVG Filters for color blindness simulation */}
      <ColorBlindnessSVGFilters />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side - Website Preview */}
        <div className="flex-1 border-r border-gray-300">
          <WebsitePreview palette={palette} filter={filter} />
        </div>

        {/* Right Side - Color Editor */}
        <div className="w-96">
          <ColorPaletteEditor palette={palette} onChange={setPalette} />
        </div>
      </div>

      {/* Bottom - Color Blindness Toggle */}
      <ColorBlindnessToggle 
        currentType={colorBlindnessType} 
        onChange={setColorBlindnessType} 
      />
    </div>
  );
}

