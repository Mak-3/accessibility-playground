'use client';

import { useState } from 'react';

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  success: string;
  warning: string;
  error: string;
}

interface ColorPaletteEditorProps {
  palette: ColorPalette;
  onChange: (palette: ColorPalette) => void;
}

const defaultColors: ColorPalette = {
  primary: '#3B82F6',
  secondary: '#8B5CF6',
  accent: '#EC4899',
  background: '#FFFFFF',
  text: '#1F2937',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
};

export default function ColorPaletteEditor({ palette, onChange }: ColorPaletteEditorProps) {
  const updateColor = (key: keyof ColorPalette, value: string) => {
    onChange({ ...palette, [key]: value });
  };

  const resetToDefaults = () => {
    onChange(defaultColors);
  };

  const colorInputs: Array<{ key: keyof ColorPalette; label: string }> = [
    { key: 'primary', label: 'Primary Color' },
    { key: 'secondary', label: 'Secondary Color' },
    { key: 'accent', label: 'Accent Color' },
    { key: 'background', label: 'Background' },
    { key: 'text', label: 'Text Color' },
    { key: 'success', label: 'Success Color' },
    { key: 'warning', label: 'Warning Color' },
    { key: 'error', label: 'Error Color' },
  ];

  return (
    <div className="h-full bg-gray-50 p-6 overflow-y-auto">
      <div className="max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Color Palette</h2>
          <button
            onClick={resetToDefaults}
            className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded transition-colors"
          >
            Reset
          </button>
        </div>

        <div className="space-y-4">
          {colorInputs.map(({ key, label }) => (
            <div key={key} className="space-y-2">
              <label htmlFor={key} className="block text-sm font-medium text-gray-700">
                {label}
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  id={key}
                  value={palette[key]}
                  onChange={(e) => updateColor(key, e.target.value)}
                  className="w-16 h-10 rounded cursor-pointer border-2 border-gray-300"
                />
                <input
                  type="text"
                  value={palette[key]}
                  onChange={(e) => updateColor(key, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="#000000"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">💡 Tips</h3>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>• Use the color blindness toggle below to test accessibility</li>
            <li>• Ensure sufficient contrast between text and background</li>
            <li>• Don't rely solely on color to convey information</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export { defaultColors };

