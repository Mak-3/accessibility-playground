// WCAG Contrast Ratio Utilities

export interface RGBColor {
  r: number;
  g: number;
  b: number;
}

export interface ContrastResult {
  ratio: number;
  passAA: boolean;
  passAALarge: boolean;
  passAAA: boolean;
  passAAALarge: boolean;
  ratingText: string;
}

/**
 * Convert HEX color to RGB
 */
export const hexToRgb = (hex: string): RGBColor => {
  const sanitized = hex.replace("#", "");
  return {
    r: parseInt(sanitized.substring(0, 2), 16),
    g: parseInt(sanitized.substring(2, 4), 16),
    b: parseInt(sanitized.substring(4, 6), 16),
  };
};

/**
 * Calculate relative luminance for a color channel
 * Based on WCAG 2.0 formula
 */
const getChannelLuminance = (channel: number): number => {
  const c = channel / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
};

/**
 * Calculate relative luminance of an RGB color
 * Using WCAG formula: L = 0.2126 * R + 0.7152 * G + 0.0722 * B
 */
export const getLuminance = ({ r, g, b }: RGBColor): number => {
  const R = getChannelLuminance(r);
  const G = getChannelLuminance(g);
  const B = getChannelLuminance(b);

  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
};

/**
 * Calculate contrast ratio between two luminance values
 * Formula: (L1 + 0.05) / (L2 + 0.05) where L1 is the lighter color
 */
export const getContrastRatio = (lum1: number, lum2: number): number => {
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
};

/**
 * Evaluate contrast ratio against WCAG standards
 */
export const evaluateContrast = (ratio: number): ContrastResult => {
  const passAAA = ratio >= 7;
  const passAA = ratio >= 4.5;
  const passAAALarge = ratio >= 4.5;
  const passAALarge = ratio >= 3;

  let ratingText = "";
  if (passAAA) {
    ratingText = "AAA (Excellent) ✓";
  } else if (passAA) {
    ratingText = "AA (Good) ✓";
  } else if (passAALarge) {
    ratingText = "AA Large Text Only";
  } else {
    ratingText = "Fail ✗";
  }

  return {
    ratio,
    passAA,
    passAALarge,
    passAAA,
    passAAALarge,
    ratingText,
  };
};

/**
 * Calculate full contrast analysis from two HEX colors
 */
export const analyzeContrast = (
  textColor: string,
  bgColor: string
): ContrastResult => {
  const textRgb = hexToRgb(textColor);
  const bgRgb = hexToRgb(bgColor);

  const textLum = getLuminance(textRgb);
  const bgLum = getLuminance(bgRgb);

  const ratio = getContrastRatio(textLum, bgLum);

  return evaluateContrast(ratio);
};

/**
 * Suggest an accessible alternative color by adjusting brightness
 */
export const suggestAccessibleColor = (
  textColor: string,
  bgColor: string,
  targetRatio: number = 4.5
): string => {
  const bgRgb = hexToRgb(bgColor);
  const bgLum = getLuminance(bgRgb);

  // Determine if we should make text lighter or darker
  const shouldBeLighter = bgLum < 0.5;

  // Binary search for the right luminance
  let low = 0;
  let high = 255;
  let bestColor = textColor;
  let bestRatio = 0;

  for (let i = 0; i < 20; i++) {
    const mid = Math.floor((low + high) / 2);
    const testRgb: RGBColor = shouldBeLighter
      ? { r: mid, g: mid, b: mid }
      : { r: 255 - mid, g: 255 - mid, b: 255 - mid };

    const testLum = getLuminance(testRgb);
    const ratio = getContrastRatio(testLum, bgLum);

    if (Math.abs(ratio - targetRatio) < 0.1) {
      bestColor = `#${testRgb.r.toString(16).padStart(2, "0")}${testRgb.g
        .toString(16)
        .padStart(2, "0")}${testRgb.b.toString(16).padStart(2, "0")}`;
      break;
    }

    if (ratio < targetRatio) {
      if (shouldBeLighter) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    } else {
      if (shouldBeLighter) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
      bestColor = `#${testRgb.r.toString(16).padStart(2, "0")}${testRgb.g
        .toString(16)
        .padStart(2, "0")}${testRgb.b.toString(16).padStart(2, "0")}`;
      bestRatio = ratio;
    }
  }

  return bestColor;
};


