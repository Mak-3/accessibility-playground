/**
 * HTML Semantic Analysis Utilities
 * Analyzes HTML structure for semantic correctness
 */

export interface SemanticElement {
  tag: string;
  count: number;
  status: 'good' | 'warning' | 'info';
  message: string;
}

export interface DivSoupIssue {
  type: 'excessive-divs' | 'div-button' | 'div-link' | 'missing-semantic';
  severity: 'error' | 'warning' | 'info';
  element: string;
  issue: string;
  suggestion: string;
  count?: number;
}

export interface SemanticSuggestion {
  from: string;
  to: string;
  reason: string;
  example: string;
}

export interface SemanticAnalysis {
  elements: SemanticElement[];
  divSoupIssues: DivSoupIssue[];
  suggestions: SemanticSuggestion[];
  semanticScore: number;
  divToSemanticRatio: number;
  recommendations: string[];
}

/**
 * Count occurrences of HTML tags
 */
export function countElements(html: string): Record<string, number> {
  const counts: Record<string, number> = {};
  const tagRegex = /<(\w+)(?:\s|>|\/)/gi;
  let match;

  while ((match = tagRegex.exec(html)) !== null) {
    const tag = match[1].toLowerCase();
    counts[tag] = (counts[tag] || 0) + 1;
  }

  return counts;
}

/**
 * Analyze semantic HTML5 elements usage
 */
export function analyzeSemanticElements(html: string): SemanticElement[] {
  const counts = countElements(html);
  const elements: SemanticElement[] = [];

  // Semantic HTML5 elements to check
  const semanticTags = {
    header: { name: 'header', good: 'Defines page/section header' },
    nav: { name: 'nav', good: 'Defines navigation section' },
    main: { name: 'main', good: 'Defines main content' },
    article: { name: 'article', good: 'Defines independent content' },
    section: { name: 'section', good: 'Defines thematic grouping' },
    aside: { name: 'aside', good: 'Defines complementary content' },
    footer: { name: 'footer', good: 'Defines page/section footer' },
    figure: { name: 'figure', good: 'Defines self-contained content' },
    figcaption: { name: 'figcaption', good: 'Defines figure caption' },
    time: { name: 'time', good: 'Defines date/time' },
    mark: { name: 'mark', good: 'Defines highlighted text' },
  };

  Object.entries(semanticTags).forEach(([tag, info]) => {
    const count = counts[tag] || 0;
    
    if (count > 0) {
      elements.push({
        tag,
        count,
        status: 'good',
        message: `${count} ${tag} element(s) - ${info.good}`,
      });
    }
  });

  // Check for important missing elements
  if (!counts['main']) {
    elements.push({
      tag: 'main',
      count: 0,
      status: 'warning',
      message: 'No <main> element found - should identify primary content',
    });
  }

  if (!counts['header'] && !counts['nav']) {
    elements.push({
      tag: 'header/nav',
      count: 0,
      status: 'warning',
      message: 'No <header> or <nav> elements found - consider adding for navigation',
    });
  }

  return elements;
}

/**
 * Detect "div soup" - excessive or improper div usage
 */
export function detectDivSoup(html: string): DivSoupIssue[] {
  const issues: DivSoupIssue[] = [];
  const counts = countElements(html);

  const divCount = counts['div'] || 0;
  const spanCount = counts['span'] || 0;
  const totalTags = Object.values(counts).reduce((sum, count) => sum + count, 0);
  const semanticCount = (counts['header'] || 0) + (counts['nav'] || 0) + 
                        (counts['main'] || 0) + (counts['article'] || 0) + 
                        (counts['section'] || 0) + (counts['aside'] || 0) + 
                        (counts['footer'] || 0);

  // Check for excessive divs
  if (divCount > 20 && divCount / totalTags > 0.4) {
    issues.push({
      type: 'excessive-divs',
      severity: 'warning',
      element: '<div>',
      issue: `Excessive div usage: ${divCount} divs (${((divCount / totalTags) * 100).toFixed(1)}% of all tags)`,
      suggestion: 'Replace generic divs with semantic elements where appropriate',
      count: divCount,
    });
  }

  // Check for clickable divs (div as button/link)
  const clickableDivRegex = /<div[^>]*(onclick|@click|ng-click)[^>]*>/gi;
  const clickableDivs = html.match(clickableDivRegex);
  if (clickableDivs && clickableDivs.length > 0) {
    issues.push({
      type: 'div-button',
      severity: 'error',
      element: '<div onclick="...">',
      issue: `${clickableDivs.length} clickable div(s) found`,
      suggestion: 'Use <button> or <a> for interactive elements',
      count: clickableDivs.length,
    });
  }

  // Check for lack of semantic elements
  if (semanticCount === 0 && divCount > 5) {
    issues.push({
      type: 'missing-semantic',
      severity: 'warning',
      element: 'Document structure',
      issue: 'No semantic HTML5 elements found, only generic divs',
      suggestion: 'Use header, nav, main, section, article, aside, footer',
    });
  }

  // Check for nested divs
  const deepNestingRegex = /<div[^>]*>\s*<div[^>]*>\s*<div[^>]*>\s*<div[^>]*>/gi;
  const deepNesting = html.match(deepNestingRegex);
  if (deepNesting && deepNesting.length > 3) {
    issues.push({
      type: 'excessive-divs',
      severity: 'info',
      element: 'Nested divs',
      issue: 'Deep div nesting detected (4+ levels)',
      suggestion: 'Simplify structure or use semantic elements to reduce nesting',
      count: deepNesting.length,
    });
  }

  return issues;
}

/**
 * Generate semantic improvement suggestions
 */
export function generateSemanticSuggestions(html: string): SemanticSuggestion[] {
  const suggestions: SemanticSuggestion[] = [];
  const lowerHtml = html.toLowerCase();

  // Suggest header element
  if (!lowerHtml.includes('<header') && (lowerHtml.includes('class="header"') || lowerHtml.includes('id="header"'))) {
    suggestions.push({
      from: '<div class="header">',
      to: '<header>',
      reason: 'Define page header for better structure',
      example: '<header>\n  <h1>Site Title</h1>\n  <nav>...</nav>\n</header>',
    });
  }

  // Suggest nav element
  if (!lowerHtml.includes('<nav') && (lowerHtml.includes('class="nav"') || lowerHtml.includes('class="menu"'))) {
    suggestions.push({
      from: '<div class="nav">',
      to: '<nav>',
      reason: 'Identify navigation sections',
      example: '<nav aria-label="Main navigation">\n  <ul>\n    <li><a href="/">Home</a></li>\n  </ul>\n</nav>',
    });
  }

  // Suggest main element
  if (!lowerHtml.includes('<main')) {
    suggestions.push({
      from: '<div class="content">',
      to: '<main>',
      reason: 'Identify the primary content of the page',
      example: '<main>\n  <h1>Page Title</h1>\n  <p>Main content...</p>\n</main>',
    });
  }

  // Suggest footer element
  if (!lowerHtml.includes('<footer') && (lowerHtml.includes('class="footer"') || lowerHtml.includes('id="footer"'))) {
    suggestions.push({
      from: '<div class="footer">',
      to: '<footer>',
      reason: 'Define page footer',
      example: '<footer>\n  <p>&copy; 2024 Company</p>\n</footer>',
    });
  }

  // Suggest article for blog posts or independent content
  if (!lowerHtml.includes('<article') && (lowerHtml.includes('class="post"') || lowerHtml.includes('class="article"'))) {
    suggestions.push({
      from: '<div class="post">',
      to: '<article>',
      reason: 'Wrap independent, self-contained content',
      example: '<article>\n  <h2>Article Title</h2>\n  <p>Content...</p>\n</article>',
    });
  }

  // Suggest section for thematic grouping
  if (!lowerHtml.includes('<section') && lowerHtml.includes('class="section"')) {
    suggestions.push({
      from: '<div class="section">',
      to: '<section>',
      reason: 'Group thematically related content',
      example: '<section>\n  <h2>Section Heading</h2>\n  <p>Related content...</p>\n</section>',
    });
  }

  // Suggest aside for sidebars
  if (!lowerHtml.includes('<aside') && (lowerHtml.includes('class="sidebar"') || lowerHtml.includes('class="aside"'))) {
    suggestions.push({
      from: '<div class="sidebar">',
      to: '<aside>',
      reason: 'Mark complementary content',
      example: '<aside>\n  <h3>Related Links</h3>\n  <ul>...</ul>\n</aside>',
    });
  }

  // Suggest button instead of div with onclick
  if (lowerHtml.includes('<div') && (lowerHtml.includes('onclick=') || lowerHtml.includes('role="button"'))) {
    suggestions.push({
      from: '<div onclick="...">',
      to: '<button>',
      reason: 'Use button for interactive elements',
      example: '<button type="button" onclick="handleClick()">\n  Click Me\n</button>',
    });
  }

  return suggestions;
}

/**
 * Calculate semantic score
 */
export function calculateSemanticScore(html: string): number {
  let score = 100;
  const counts = countElements(html);
  const issues = detectDivSoup(html);

  const divCount = counts['div'] || 0;
  const semanticCount = (counts['header'] || 0) + (counts['nav'] || 0) + 
                        (counts['main'] || 0) + (counts['article'] || 0) + 
                        (counts['section'] || 0) + (counts['aside'] || 0) + 
                        (counts['footer'] || 0);

  // Deduct for missing important semantic elements
  if (!counts['main']) score -= 15;
  if (!counts['header'] && !counts['nav']) score -= 10;

  // Deduct for div soup issues
  issues.forEach(issue => {
    if (issue.severity === 'error') score -= 15;
    if (issue.severity === 'warning') score -= 10;
    if (issue.severity === 'info') score -= 5;
  });

  // Reward for using semantic elements
  if (semanticCount > 0) {
    score += Math.min(20, semanticCount * 3);
  }

  // Penalize high div-to-semantic ratio
  if (divCount > 0 && semanticCount > 0) {
    const ratio = divCount / semanticCount;
    if (ratio > 5) score -= 10;
  }

  return Math.max(0, Math.min(100, Math.round(score)));
}

/**
 * Calculate div-to-semantic ratio
 */
export function calculateDivToSemanticRatio(html: string): number {
  const counts = countElements(html);
  const divCount = counts['div'] || 0;
  const semanticCount = (counts['header'] || 0) + (counts['nav'] || 0) + 
                        (counts['main'] || 0) + (counts['article'] || 0) + 
                        (counts['section'] || 0) + (counts['aside'] || 0) + 
                        (counts['footer'] || 0);

  if (semanticCount === 0) return divCount > 0 ? Infinity : 0;
  return divCount / semanticCount;
}

/**
 * Generate recommendations
 */
export function generateSemanticRecommendations(analysis: Omit<SemanticAnalysis, 'recommendations'>): string[] {
  const recommendations: string[] = [];
  const { semanticScore, divSoupIssues, suggestions, divToSemanticRatio } = analysis;

  if (semanticScore === 100) {
    return ['Excellent! Your HTML structure is highly semantic.'];
  }

  // Priority recommendations based on issues
  const errorIssues = divSoupIssues.filter(i => i.severity === 'error');
  if (errorIssues.length > 0) {
    recommendations.push('Replace clickable divs with proper button or link elements');
  }

  if (divToSemanticRatio === Infinity) {
    recommendations.push('Add semantic HTML5 elements - currently only using generic divs');
  } else if (divToSemanticRatio > 5) {
    recommendations.push('High div-to-semantic ratio - replace more divs with semantic elements');
  }

  // Specific element recommendations
  if (suggestions.length > 0) {
    const missingMain = suggestions.find(s => s.to === '<main>');
    if (missingMain) {
      recommendations.push('Add a <main> element to identify the primary content');
    }

    const missingNav = suggestions.find(s => s.to === '<nav>');
    if (missingNav) {
      recommendations.push('Use <nav> elements for navigation sections');
    }
  }

  // General guidance
  if (recommendations.length === 0) {
    recommendations.push('Good semantic structure! Consider the suggestions for further improvements');
  }

  return recommendations;
}

/**
 * Complete semantic HTML analysis
 */
export function analyzeSemanticHTML(html: string): SemanticAnalysis {
  const elements = analyzeSemanticElements(html);
  const divSoupIssues = detectDivSoup(html);
  const suggestions = generateSemanticSuggestions(html);
  const semanticScore = calculateSemanticScore(html);
  const divToSemanticRatio = calculateDivToSemanticRatio(html);

  const partialAnalysis = {
    elements,
    divSoupIssues,
    suggestions,
    semanticScore,
    divToSemanticRatio,
  };

  const recommendations = generateSemanticRecommendations(partialAnalysis);

  return {
    ...partialAnalysis,
    recommendations,
  };
}

