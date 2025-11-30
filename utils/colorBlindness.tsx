// Color blindness simulation using SVG filters
// Based on research from Coblis - Color Blindness Simulator

export type ColorBlindnessType = 
  | 'normal'
  | 'protanopia'      // Red-blind (1% of males)
  | 'deuteranopia'    // Green-blind (1% of males)
  | 'tritanopia'      // Blue-blind (0.001% of population)
  | 'protanomaly'     // Red-weak (1% of males, 0.01% of females)
  | 'deuteranomaly'   // Green-weak (6% of males, 0.4% of females)
  | 'tritanomaly'     // Blue-weak (0.01% of population)
  | 'achromatopsia'   // Complete color blindness (0.003% of population)
  | 'achromatomaly';  // Incomplete color blindness

export const colorBlindnessInfo = {
  normal: {
    label: 'Normal Vision',
    description: 'No color blindness',
  },
  protanopia: {
    label: 'Protanopia',
    description: 'Red-blind (1% of males)',
  },
  deuteranopia: {
    label: 'Deuteranopia',
    description: 'Green-blind (1% of males)',
  },
  tritanopia: {
    label: 'Tritanopia',
    description: 'Blue-blind (rare)',
  },
  protanomaly: {
    label: 'Protanomaly',
    description: 'Red-weak (1% of males)',
  },
  deuteranomaly: {
    label: 'Deuteranomaly',
    description: 'Green-weak (most common, 6% of males)',
  },
  tritanomaly: {
    label: 'Tritanomaly',
    description: 'Blue-weak (rare)',
  },
  achromatopsia: {
    label: 'Achromatopsia',
    description: 'Complete color blindness (very rare)',
  },
  achromatomaly: {
    label: 'Achromatomaly',
    description: 'Incomplete color blindness (rare)',
  },
};

// CSS filter values for simulating different types of color blindness
export const getColorBlindnessFilter = (type: ColorBlindnessType): string => {
  switch (type) {
    case 'normal':
      return 'none';
    case 'protanopia':
      return 'url(#protanopia)';
    case 'deuteranopia':
      return 'url(#deuteranopia)';
    case 'tritanopia':
      return 'url(#tritanopia)';
    case 'protanomaly':
      return 'url(#protanomaly)';
    case 'deuteranomaly':
      return 'url(#deuteranomaly)';
    case 'tritanomaly':
      return 'url(#tritanomaly)';
    case 'achromatopsia':
      return 'grayscale(100%)';
    case 'achromatomaly':
      return 'grayscale(50%)';
    default:
      return 'none';
  }
};

// SVG filter matrices for color blindness simulation
export const ColorBlindnessSVGFilters = () => {
  return (
    <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
      <defs>
        {/* Protanopia - Red-blind */}
        <filter id="protanopia">
          <feColorMatrix
            type="matrix"
            values="0.567, 0.433, 0,     0, 0
                    0.558, 0.442, 0,     0, 0
                    0,     0.242, 0.758, 0, 0
                    0,     0,     0,     1, 0"
          />
        </filter>

        {/* Protanomaly - Red-weak */}
        <filter id="protanomaly">
          <feColorMatrix
            type="matrix"
            values="0.817, 0.183, 0,     0, 0
                    0.333, 0.667, 0,     0, 0
                    0,     0.125, 0.875, 0, 0
                    0,     0,     0,     1, 0"
          />
        </filter>

        {/* Deuteranopia - Green-blind */}
        <filter id="deuteranopia">
          <feColorMatrix
            type="matrix"
            values="0.625, 0.375, 0,   0, 0
                    0.7,   0.3,   0,   0, 0
                    0,     0.3,   0.7, 0, 0
                    0,     0,     0,   1, 0"
          />
        </filter>

        {/* Deuteranomaly - Green-weak */}
        <filter id="deuteranomaly">
          <feColorMatrix
            type="matrix"
            values="0.8,   0.2,   0,     0, 0
                    0.258, 0.742, 0,     0, 0
                    0,     0.142, 0.858, 0, 0
                    0,     0,     0,     1, 0"
          />
        </filter>

        {/* Tritanopia - Blue-blind */}
        <filter id="tritanopia">
          <feColorMatrix
            type="matrix"
            values="0.95, 0.05,  0,     0, 0
                    0,    0.433, 0.567, 0, 0
                    0,    0.475, 0.525, 0, 0
                    0,    0,     0,     1, 0"
          />
        </filter>

        {/* Tritanomaly - Blue-weak */}
        <filter id="tritanomaly">
          <feColorMatrix
            type="matrix"
            values="0.967, 0.033, 0,     0, 0
                    0,     0.733, 0.267, 0, 0
                    0,     0.183, 0.817, 0, 0
                    0,     0,     0,     1, 0"
          />
        </filter>
      </defs>
    </svg>
  );
};

