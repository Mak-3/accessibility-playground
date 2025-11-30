// Readability Analysis Utilities based on WCAG and typography best practices

export interface ReadabilityScore {
  overall: number; // 0-100
  rating: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  ratingColor: string;
  fontSize: {
    score: number;
    status: 'pass' | 'warning' | 'fail';
    message: string;
  };
  lineHeight: {
    score: number;
    status: 'pass' | 'warning' | 'fail';
    message: string;
  };
  letterSpacing: {
    score: number;
    status: 'pass' | 'warning' | 'fail';
    message: string;
  };
  fontWeight: {
    score: number;
    status: 'pass' | 'warning' | 'fail';
    message: string;
  };
  recommendations: string[];
  strengths: string[];
}

/**
 * Analyze font size (percentage based, assumes base 16px)
 */
const analyzeFontSize = (fontSize: number): ReadabilityScore['fontSize'] => {
  const actualSize = (16 * fontSize) / 100;

  if (fontSize >= 100 && fontSize <= 150) {
    return {
      score: 100,
      status: 'pass',
      message: `Perfect size (${actualSize.toFixed(1)}px) - Meets WCAG standards`,
    };
  } else if (fontSize >= 90 && fontSize < 100) {
    return {
      score: 75,
      status: 'warning',
      message: `Slightly small (${actualSize.toFixed(1)}px) - Consider increasing`,
    };
  } else if (fontSize > 150 && fontSize <= 175) {
    return {
      score: 85,
      status: 'pass',
      message: `Large size (${actualSize.toFixed(1)}px) - Good for low vision users`,
    };
  } else if (fontSize > 175) {
    return {
      score: 70,
      status: 'warning',
      message: `Very large (${actualSize.toFixed(1)}px) - May reduce content visibility`,
    };
  } else {
    return {
      score: 40,
      status: 'fail',
      message: `Too small (${actualSize.toFixed(1)}px) - Fails WCAG minimum`,
    };
  }
};

/**
 * Analyze line height (line spacing)
 */
const analyzeLineHeight = (lineHeight: number): ReadabilityScore['lineHeight'] => {
  if (lineHeight >= 1.5 && lineHeight <= 1.8) {
    return {
      score: 100,
      status: 'pass',
      message: `Optimal spacing (${lineHeight.toFixed(1)}) - WCAG recommended`,
    };
  } else if (lineHeight >= 1.4 && lineHeight < 1.5) {
    return {
      score: 80,
      status: 'warning',
      message: `Slightly tight (${lineHeight.toFixed(1)}) - Consider increasing`,
    };
  } else if (lineHeight > 1.8 && lineHeight <= 2.2) {
    return {
      score: 85,
      status: 'pass',
      message: `Generous spacing (${lineHeight.toFixed(1)}) - Very comfortable`,
    };
  } else if (lineHeight < 1.4) {
    return {
      score: 50,
      status: 'fail',
      message: `Too tight (${lineHeight.toFixed(1)}) - Reduces readability`,
    };
  } else {
    return {
      score: 60,
      status: 'warning',
      message: `Too loose (${lineHeight.toFixed(1)}) - May disrupt reading flow`,
    };
  }
};

/**
 * Analyze letter spacing
 */
const analyzeLetterSpacing = (letterSpacing: number): ReadabilityScore['letterSpacing'] => {
  if (letterSpacing >= 0 && letterSpacing <= 1.5) {
    return {
      score: 100,
      status: 'pass',
      message: `Good spacing (${letterSpacing}px) - Enhances readability`,
    };
  } else if (letterSpacing > 1.5 && letterSpacing <= 3) {
    return {
      score: 85,
      status: 'pass',
      message: `Wide spacing (${letterSpacing}px) - Helpful for dyslexia`,
    };
  } else if (letterSpacing >= -1 && letterSpacing < 0) {
    return {
      score: 75,
      status: 'warning',
      message: `Slightly tight (${letterSpacing}px) - May reduce clarity`,
    };
  } else if (letterSpacing > 3) {
    return {
      score: 60,
      status: 'warning',
      message: `Too wide (${letterSpacing}px) - May slow reading speed`,
    };
  } else {
    return {
      score: 40,
      status: 'fail',
      message: `Too tight (${letterSpacing}px) - Difficult to read`,
    };
  }
};

/**
 * Analyze font weight
 */
const analyzeFontWeight = (fontWeight: number): ReadabilityScore['fontWeight'] => {
  if (fontWeight >= 400 && fontWeight <= 500) {
    return {
      score: 100,
      status: 'pass',
      message: `Optimal weight (${fontWeight}) - Clear and readable`,
    };
  } else if (fontWeight === 300 || fontWeight === 600) {
    return {
      score: 90,
      status: 'pass',
      message: `Good weight (${fontWeight}) - Acceptable for most uses`,
    };
  } else if (fontWeight === 700) {
    return {
      score: 80,
      status: 'pass',
      message: `Bold (${fontWeight}) - Good for emphasis, tiring for body text`,
    };
  } else if (fontWeight <= 200) {
    return {
      score: 50,
      status: 'fail',
      message: `Too light (${fontWeight}) - Poor contrast, hard to read`,
    };
  } else {
    return {
      score: 70,
      status: 'warning',
      message: `Very bold (${fontWeight}) - May cause eye strain in body text`,
    };
  }
};

/**
 * Generate recommendations based on current settings
 */
const generateRecommendations = (
  fontSize: number,
  lineHeight: number,
  letterSpacing: number,
  fontWeight: number,
  dyslexiaMode: boolean
): string[] => {
  const recommendations: string[] = [];

  if (fontSize < 100) {
    recommendations.push('Increase font size to at least 100% (16px) for better accessibility');
  }
  if (fontSize > 175) {
    recommendations.push('Consider reducing font size to improve content density');
  }
  if (lineHeight < 1.5) {
    recommendations.push('Increase line height to at least 1.5 for WCAG compliance');
  }
  if (lineHeight > 2.2) {
    recommendations.push('Reduce line height to maintain reading flow');
  }
  if (letterSpacing < 0) {
    recommendations.push('Avoid negative letter spacing as it reduces readability');
  }
  if (letterSpacing > 3) {
    recommendations.push('Excessive letter spacing may slow reading speed');
  }
  if (fontWeight <= 200) {
    recommendations.push('Use at least 300 weight for body text to ensure clarity');
  }
  if (fontWeight >= 700 && fontSize < 120) {
    recommendations.push('Bold text works better with larger font sizes');
  }
  if (!dyslexiaMode && letterSpacing < 1) {
    recommendations.push('Consider enabling dyslexia mode or increasing letter spacing');
  }

  if (recommendations.length === 0) {
    recommendations.push('Your settings are well-optimized for readability!');
  }

  return recommendations;
};

/**
 * Identify strengths in current configuration
 */
const identifyStrengths = (
  fontSize: number,
  lineHeight: number,
  letterSpacing: number,
  fontWeight: number,
  dyslexiaMode: boolean
): string[] => {
  const strengths: string[] = [];

  if (fontSize >= 100 && fontSize <= 150) {
    strengths.push('Font size meets WCAG minimum requirements');
  }
  if (fontSize >= 120) {
    strengths.push('Large font size benefits users with low vision');
  }
  if (lineHeight >= 1.5 && lineHeight <= 1.8) {
    strengths.push('Line height follows WCAG best practices');
  }
  if (letterSpacing > 0.5) {
    strengths.push('Letter spacing aids readability for dyslexic users');
  }
  if (fontWeight >= 400 && fontWeight <= 500) {
    strengths.push('Font weight is optimal for extended reading');
  }
  if (dyslexiaMode) {
    strengths.push('Dyslexia-friendly font reduces character confusion');
  }

  return strengths;
};

/**
 * Calculate overall readability score and generate analysis
 */
export const analyzeReadability = (
  fontSize: number,
  lineHeight: number,
  letterSpacing: number,
  fontWeight: number,
  dyslexiaMode: boolean
): ReadabilityScore => {
  const fontSizeAnalysis = analyzeFontSize(fontSize);
  const lineHeightAnalysis = analyzeLineHeight(lineHeight);
  const letterSpacingAnalysis = analyzeLetterSpacing(letterSpacing);
  const fontWeightAnalysis = analyzeFontWeight(fontWeight);

  // Calculate weighted overall score
  const overall = Math.round(
    (fontSizeAnalysis.score * 0.3 +
      lineHeightAnalysis.score * 0.3 +
      letterSpacingAnalysis.score * 0.2 +
      fontWeightAnalysis.score * 0.2) *
      (dyslexiaMode ? 1.05 : 1) // Small bonus for dyslexia mode
  );

  const cappedScore = Math.min(overall, 100);

  let rating: ReadabilityScore['rating'];
  let ratingColor: string;

  if (cappedScore >= 90) {
    rating = 'Excellent';
    ratingColor = 'green';
  } else if (cappedScore >= 75) {
    rating = 'Good';
    ratingColor = 'blue';
  } else if (cappedScore >= 60) {
    rating = 'Fair';
    ratingColor = 'orange';
  } else {
    rating = 'Poor';
    ratingColor = 'red';
  }

  const recommendations = generateRecommendations(
    fontSize,
    lineHeight,
    letterSpacing,
    fontWeight,
    dyslexiaMode
  );

  const strengths = identifyStrengths(
    fontSize,
    lineHeight,
    letterSpacing,
    fontWeight,
    dyslexiaMode
  );

  return {
    overall: cappedScore,
    rating,
    ratingColor,
    fontSize: fontSizeAnalysis,
    lineHeight: lineHeightAnalysis,
    letterSpacing: letterSpacingAnalysis,
    fontWeight: fontWeightAnalysis,
    recommendations,
    strengths,
  };
};


