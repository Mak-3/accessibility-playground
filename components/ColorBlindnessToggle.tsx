'use client';

import { ColorBlindnessType, colorBlindnessInfo } from '@/utils/colorBlindness';

interface ColorBlindnessToggleProps {
  currentType: ColorBlindnessType;
  onChange: (type: ColorBlindnessType) => void;
}

export default function ColorBlindnessToggle({ currentType, onChange }: ColorBlindnessToggleProps) {
  const types: ColorBlindnessType[] = [
    'normal',
    'protanopia',
    'deuteranopia',
    'tritanopia',
    'protanomaly',
    'deuteranomaly',
    'tritanomaly',
    'achromatopsia',
    'achromatomaly',
  ];

  return (
    <div className="bg-white border-t border-gray-200 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          👁️ Color Blindness Simulation
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => onChange(type)}
              className={`px-3 py-2 rounded-lg text-left text-sm transition-all ${
                currentType === type
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <div className="font-medium">{colorBlindnessInfo[type].label}</div>
              <div className={`text-xs mt-0.5 ${currentType === type ? 'text-blue-100' : 'text-gray-500'}`}>
                {colorBlindnessInfo[type].description}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

