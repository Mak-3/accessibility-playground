/**
 * Screen Reader Analysis Utilities
 * Analyzes HTML for screen reader accessibility
 */

export interface HeadingNode {
  level: number;
  text: string;
  id?: string;
  line?: number;
}

export interface LandmarkNode {
  type: string;
  role?: string;
  label?: string;
  line?: number;
}

export interface ImageNode {
  src: string;
  alt: string;
  hasAlt: boolean;
  isDecorative: boolean;
  line?: number;
}

export interface AriaIssue {
  type: 'error' | 'warning' | 'info';
  element: string;
  issue: string;
  suggestion: string;
  line?: number;
}

export interface ScreenReaderAnalysis {
  headings: HeadingNode[];
  landmarks: LandmarkNode[];
  images: ImageNode[];
  ariaIssues: AriaIssue[];
  screenReaderText: string;
  score: number;
  recommendations: string[];
}

/**
 * Parse HTML and extract heading hierarchy
 */
export function analyzeHeadings(html: string): HeadingNode[] {
  const headings: HeadingNode[] = [];
  const headingRegex = /<h([1-6])([^>]*)>(.*?)<\/h\1>/gi;
  let match;

  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1]);
    const attributes = match[2];
    const text = match[3].replace(/<[^>]*>/g, '').trim(); // Strip inner HTML tags
    
    // Extract id if present
    const idMatch = attributes.match(/id=["']([^"']+)["']/);
    const id = idMatch ? idMatch[1] : undefined;

    headings.push({
      level,
      text,
      id,
    });
  }

  return headings;
}

/**
 * Extract landmark regions from HTML
 */
export function analyzeLandmarks(html: string): LandmarkNode[] {
  const landmarks: LandmarkNode[] = [];
  
  // Semantic HTML5 landmarks
  const semanticLandmarks = [
    { tag: 'header', type: 'banner' },
    { tag: 'nav', type: 'navigation' },
    { tag: 'main', type: 'main' },
    { tag: 'aside', type: 'complementary' },
    { tag: 'footer', type: 'contentinfo' },
    { tag: 'section', type: 'region' },
    { tag: 'article', type: 'article' },
    { tag: 'form', type: 'form' },
  ];

  semanticLandmarks.forEach(({ tag, type }) => {
    const regex = new RegExp(`<${tag}([^>]*)>`, 'gi');
    let match;

    while ((match = regex.exec(html)) !== null) {
      const attributes = match[1];
      
      // Extract aria-label or aria-labelledby
      const labelMatch = attributes.match(/aria-label=["']([^"']+)["']/);
      const label = labelMatch ? labelMatch[1] : undefined;

      landmarks.push({
        type,
        label,
      });
    }
  });

  // ARIA role landmarks
  const roleRegex = /role=["']([^"']+)["']/gi;
  let roleMatch;

  while ((roleMatch = roleRegex.exec(html)) !== null) {
    const role = roleMatch[1];
    if (['banner', 'navigation', 'main', 'complementary', 'contentinfo', 'region', 'search'].includes(role)) {
      landmarks.push({
        type: role,
        role,
      });
    }
  }

  return landmarks;
}

/**
 * Analyze images for alt text
 */
export function analyzeImages(html: string): ImageNode[] {
  const images: ImageNode[] = [];
  const imgRegex = /<img([^>]*)>/gi;
  let match;

  while ((match = imgRegex.exec(html)) !== null) {
    const attributes = match[1];
    
    // Extract src
    const srcMatch = attributes.match(/src=["']([^"']+)["']/);
    const src = srcMatch ? srcMatch[1] : '';

    // Extract alt
    const altMatch = attributes.match(/alt=["']([^"']*)["']/);
    const hasAlt = altMatch !== null;
    const alt = hasAlt ? altMatch[1] : '';

    // Check if decorative (empty alt or role="presentation")
    const isDecorative = alt === '' || attributes.includes('role="presentation"');

    images.push({
      src,
      alt,
      hasAlt,
      isDecorative,
    });
  }

  return images;
}

/**
 * Validate ARIA attributes and detect issues
 */
export function validateAria(html: string): AriaIssue[] {
  const issues: AriaIssue[] = [];

  // Check for aria-label without role
  const ariaLabelRegex = /<(\w+)([^>]*aria-label=["'][^"']+["'][^>]*)>/gi;
  let match;

  while ((match = ariaLabelRegex.exec(html)) !== null) {
    const tag = match[1];
    const attributes = match[2];

    // Check if interactive or has role
    const hasRole = /role=["']/.test(attributes);
    const isInteractive = ['a', 'button', 'input', 'select', 'textarea'].includes(tag.toLowerCase());

    if (!hasRole && !isInteractive && !['nav', 'section', 'form'].includes(tag.toLowerCase())) {
      issues.push({
        type: 'warning',
        element: `<${tag}>`,
        issue: 'aria-label on non-interactive element without role',
        suggestion: 'Consider using a semantic element or adding an appropriate ARIA role',
      });
    }
  }

  // Check for buttons without accessible name
  const buttonRegex = /<button([^>]*)>(.*?)<\/button>/gi;
  while ((match = buttonRegex.exec(html)) !== null) {
    const attributes = match[1];
    const content = match[2].replace(/<[^>]*>/g, '').trim();

    const hasAriaLabel = /aria-label=["']/.test(attributes);
    const hasAriaLabelledby = /aria-labelledby=["']/.test(attributes);

    if (!content && !hasAriaLabel && !hasAriaLabelledby) {
      issues.push({
        type: 'error',
        element: '<button>',
        issue: 'Button has no accessible name',
        suggestion: 'Add text content, aria-label, or aria-labelledby',
      });
    }
  }

  // Check for links without accessible name
  const linkRegex = /<a([^>]*)>(.*?)<\/a>/gi;
  while ((match = linkRegex.exec(html)) !== null) {
    const attributes = match[1];
    const content = match[2].replace(/<[^>]*>/g, '').trim();

    const hasAriaLabel = /aria-label=["']/.test(attributes);
    const hasAriaLabelledby = /aria-labelledby=["']/.test(attributes);

    if (!content && !hasAriaLabel && !hasAriaLabelledby) {
      issues.push({
        type: 'error',
        element: '<a>',
        issue: 'Link has no accessible name',
        suggestion: 'Add text content, aria-label, or aria-labelledby',
      });
    }
  }

  // Check for form inputs without labels
  const inputRegex = /<input([^>]*type=["'](?!hidden)[^"']+["'][^>]*)>/gi;
  while ((match = inputRegex.exec(html)) !== null) {
    const attributes = match[1];

    const hasId = /id=["']([^"']+)["']/.test(attributes);
    const hasAriaLabel = /aria-label=["']/.test(attributes);
    const hasAriaLabelledby = /aria-labelledby=["']/.test(attributes);

    if (!hasId && !hasAriaLabel && !hasAriaLabelledby) {
      issues.push({
        type: 'error',
        element: '<input>',
        issue: 'Input has no associated label',
        suggestion: 'Add an id and associate with a <label>, or use aria-label',
      });
    }
  }

  // Check for redundant ARIA
  if (html.includes('role="button"') && html.includes('<button')) {
    issues.push({
      type: 'info',
      element: '<button role="button">',
      issue: 'Redundant ARIA role',
      suggestion: 'Remove role="button" from <button> elements (already implied)',
    });
  }

  return issues;
}

/**
 * Generate screen reader announcement text
 */
export function generateScreenReaderText(html: string): string {
  let text = '';
  
  // Extract page title
  const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
  if (titleMatch) {
    text += `Page title: "${titleMatch[1]}"\n\n`;
  }

  // Announce landmarks
  const landmarks = analyzeLandmarks(html);
  if (landmarks.length > 0) {
    text += 'Landmarks:\n';
    landmarks.forEach((landmark, idx) => {
      const label = landmark.label ? ` "${landmark.label}"` : '';
      text += `  ${idx + 1}. ${landmark.type}${label}\n`;
    });
    text += '\n';
  }

  // Announce heading structure
  const headings = analyzeHeadings(html);
  if (headings.length > 0) {
    text += 'Heading Structure:\n';
    headings.forEach((heading) => {
      const indent = '  '.repeat(heading.level - 1);
      text += `${indent}H${heading.level}: "${heading.text}"\n`;
    });
    text += '\n';
  }

  // Announce images
  const images = analyzeImages(html);
  const meaningfulImages = images.filter(img => !img.isDecorative);
  if (meaningfulImages.length > 0) {
    text += 'Images:\n';
    meaningfulImages.forEach((img, idx) => {
      text += `  ${idx + 1}. ${img.alt || '[No alt text]'}\n`;
    });
    text += '\n';
  }

  return text;
}

/**
 * Calculate accessibility score
 */
export function calculateScore(analysis: Omit<ScreenReaderAnalysis, 'score' | 'recommendations'>): number {
  let score = 100;
  const { headings, landmarks, images, ariaIssues } = analysis;

  // Deduct for heading issues
  if (headings.length === 0) {
    score -= 20;
  } else {
    // Check for H1
    const hasH1 = headings.some(h => h.level === 1);
    if (!hasH1) score -= 10;

    // Check for skipped levels
    for (let i = 1; i < headings.length; i++) {
      if (headings[i].level - headings[i - 1].level > 1) {
        score -= 5;
      }
    }
  }

  // Deduct for missing landmarks
  if (landmarks.length === 0) {
    score -= 20;
  } else {
    const hasMain = landmarks.some(l => l.type === 'main');
    if (!hasMain) score -= 10;
  }

  // Deduct for image issues
  const imagesWithoutAlt = images.filter(img => !img.hasAlt && !img.isDecorative);
  score -= imagesWithoutAlt.length * 5;

  // Deduct for ARIA issues
  ariaIssues.forEach(issue => {
    if (issue.type === 'error') score -= 10;
    if (issue.type === 'warning') score -= 5;
  });

  return Math.max(0, Math.min(100, score));
}

/**
 * Generate recommendations based on analysis
 */
export function generateRecommendations(analysis: Omit<ScreenReaderAnalysis, 'recommendations'>): string[] {
  const recommendations: string[] = [];
  const { headings, landmarks, images, ariaIssues, score } = analysis;

  if (score === 100) {
    return ['Excellent! Your HTML is well-structured for screen readers.'];
  }

  // Heading recommendations
  if (headings.length === 0) {
    recommendations.push('Add heading elements (h1-h6) to structure your content');
  } else {
    const hasH1 = headings.some(h => h.level === 1);
    if (!hasH1) {
      recommendations.push('Add an h1 element - every page should have exactly one');
    }

    // Check for skipped levels
    for (let i = 1; i < headings.length; i++) {
      if (headings[i].level - headings[i - 1].level > 1) {
        recommendations.push('Avoid skipping heading levels (e.g., h2 to h4)');
        break;
      }
    }
  }

  // Landmark recommendations
  if (landmarks.length === 0) {
    recommendations.push('Add landmark regions (header, nav, main, footer) for better navigation');
  } else {
    const hasMain = landmarks.some(l => l.type === 'main');
    if (!hasMain) {
      recommendations.push('Add a <main> element to identify the main content');
    }
  }

  // Image recommendations
  const imagesWithoutAlt = images.filter(img => !img.hasAlt && !img.isDecorative);
  if (imagesWithoutAlt.length > 0) {
    recommendations.push(`${imagesWithoutAlt.length} image(s) missing alt text - add descriptive alternatives`);
  }

  // ARIA recommendations
  const errors = ariaIssues.filter(i => i.type === 'error');
  if (errors.length > 0) {
    recommendations.push(`Fix ${errors.length} critical ARIA issue(s) - check the issues panel`);
  }

  if (recommendations.length === 0) {
    recommendations.push('Great job! Just a few minor improvements needed.');
  }

  return recommendations;
}

/**
 * Complete screen reader analysis
 */
export function analyzeForScreenReader(html: string): ScreenReaderAnalysis {
  const headings = analyzeHeadings(html);
  const landmarks = analyzeLandmarks(html);
  const images = analyzeImages(html);
  const ariaIssues = validateAria(html);
  const screenReaderText = generateScreenReaderText(html);

  const partialAnalysis = {
    headings,
    landmarks,
    images,
    ariaIssues,
    screenReaderText,
  };

  const score = calculateScore(partialAnalysis);
  const recommendations = generateRecommendations({ ...partialAnalysis, score });

  return {
    ...partialAnalysis,
    score,
    recommendations,
  };
}

