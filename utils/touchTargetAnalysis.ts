/**
 * Touch Target Analysis Utilities
 * Validates touch target sizes and spacing for mobile accessibility
 */

export interface TouchTarget {
  id: string;
  element: string;
  width: number;
  height: number;
  x: number;
  y: number;
  area: number;
  status: 'pass' | 'warning' | 'fail';
  message: string;
}

export interface SpacingIssue {
  target1: string;
  target2: string;
  distance: number;
  status: 'pass' | 'warning' | 'fail';
  message: string;
}

export interface TouchTargetAnalysis {
  targets: TouchTarget[];
  spacingIssues: SpacingIssue[];
  score: number;
  summary: {
    total: number;
    pass: number;
    warning: number;
    fail: number;
  };
  recommendations: string[];
}

// WCAG Success Criterion 2.5.5 - Target Size (Level AAA)
// Minimum 44×44 CSS pixels (iOS) or 48×48dp (Android Material Design)
const MIN_TARGET_SIZE = 44; // pixels
const RECOMMENDED_SIZE = 48; // pixels
const MIN_SPACING = 8; // pixels between targets

/**
 * Analyze a single touch target
 */
export function analyzeTouchTarget(
  id: string,
  element: string,
  width: number,
  height: number,
  x: number,
  y: number
): TouchTarget {
  const area = width * height;
  const minDimension = Math.min(width, height);

  let status: 'pass' | 'warning' | 'fail' = 'pass';
  let message = '';

  if (minDimension < MIN_TARGET_SIZE) {
    status = 'fail';
    message = `Too small: ${width}×${height}px. Minimum is ${MIN_TARGET_SIZE}×${MIN_TARGET_SIZE}px`;
  } else if (minDimension < RECOMMENDED_SIZE) {
    status = 'warning';
    message = `Below recommended: ${width}×${height}px. Recommended is ${RECOMMENDED_SIZE}×${RECOMMENDED_SIZE}px`;
  } else {
    status = 'pass';
    message = `Good size: ${width}×${height}px`;
  }

  return {
    id,
    element,
    width,
    height,
    x,
    y,
    area,
    status,
    message,
  };
}

/**
 * Calculate distance between two targets
 */
export function calculateDistance(target1: TouchTarget, target2: TouchTarget): number {
  // Calculate edge-to-edge distance
  const horizontalDistance = Math.max(
    0,
    Math.max(target1.x, target2.x) - Math.min(target1.x + target1.width, target2.x + target2.width)
  );
  
  const verticalDistance = Math.max(
    0,
    Math.max(target1.y, target2.y) - Math.min(target1.y + target1.height, target2.y + target2.height)
  );

  // If targets overlap or are adjacent, distance is 0
  if (horizontalDistance === 0 && verticalDistance === 0) {
    return 0;
  }

  // Euclidean distance for diagonal proximity
  return Math.sqrt(horizontalDistance ** 2 + verticalDistance ** 2);
}

/**
 * Analyze spacing between targets
 */
export function analyzeSpacing(targets: TouchTarget[]): SpacingIssue[] {
  const issues: SpacingIssue[] = [];

  for (let i = 0; i < targets.length; i++) {
    for (let j = i + 1; j < targets.length; j++) {
      const distance = calculateDistance(targets[i], targets[j]);
      
      // Only report if targets are close (within 50px to avoid noise)
      if (distance < 50) {
        let status: 'pass' | 'warning' | 'fail' = 'pass';
        let message = '';

        if (distance < MIN_SPACING) {
          status = 'fail';
          message = `Too close: ${distance.toFixed(1)}px apart. Minimum is ${MIN_SPACING}px`;
        } else if (distance < MIN_SPACING * 2) {
          status = 'warning';
          message = `Spacing could be improved: ${distance.toFixed(1)}px apart`;
        } else {
          status = 'pass';
          message = `Good spacing: ${distance.toFixed(1)}px apart`;
        }

        issues.push({
          target1: targets[i].element,
          target2: targets[j].element,
          distance,
          status,
          message,
        });
      }
    }
  }

  return issues;
}

/**
 * Calculate overall accessibility score
 */
export function calculateTouchTargetScore(targets: TouchTarget[], spacingIssues: SpacingIssue[]): number {
  let score = 100;

  // Deduct for target size issues
  targets.forEach(target => {
    if (target.status === 'fail') score -= 10;
    if (target.status === 'warning') score -= 5;
  });

  // Deduct for spacing issues
  spacingIssues.forEach(issue => {
    if (issue.status === 'fail') score -= 5;
    if (issue.status === 'warning') score -= 2;
  });

  return Math.max(0, Math.min(100, score));
}

/**
 * Generate recommendations
 */
export function generateTouchTargetRecommendations(
  targets: TouchTarget[],
  spacingIssues: SpacingIssue[]
): string[] {
  const recommendations: string[] = [];

  const failedTargets = targets.filter(t => t.status === 'fail');
  const warningTargets = targets.filter(t => t.status === 'warning');
  const failedSpacing = spacingIssues.filter(i => i.status === 'fail');
  const warningSpacing = spacingIssues.filter(i => i.status === 'warning');

  if (failedTargets.length === 0 && warningTargets.length === 0 && failedSpacing.length === 0) {
    return ['Excellent! All touch targets meet accessibility guidelines.'];
  }

  if (failedTargets.length > 0) {
    recommendations.push(
      `${failedTargets.length} target(s) are too small. Increase to at least ${MIN_TARGET_SIZE}×${MIN_TARGET_SIZE}px`
    );
  }

  if (warningTargets.length > 0) {
    recommendations.push(
      `${warningTargets.length} target(s) could be larger. Aim for ${RECOMMENDED_SIZE}×${RECOMMENDED_SIZE}px for better usability`
    );
  }

  if (failedSpacing.length > 0) {
    recommendations.push(
      `${failedSpacing.length} target pair(s) are too close. Add at least ${MIN_SPACING}px spacing`
    );
  }

  if (warningSpacing.length > 0) {
    recommendations.push(
      `${warningSpacing.length} target pair(s) could use more spacing for easier interaction`
    );
  }

  // General recommendations
  if (targets.some(t => t.width !== t.height)) {
    recommendations.push('Consider using square targets - they\'re easier to tap accurately');
  }

  return recommendations;
}

/**
 * Complete touch target analysis
 */
export function analyzeTouchTargets(targets: Omit<TouchTarget, 'status' | 'message' | 'area'>[]): TouchTargetAnalysis {
  const analyzedTargets = targets.map(t => 
    analyzeTouchTarget(t.id, t.element, t.width, t.height, t.x, t.y)
  );

  const spacingIssues = analyzeSpacing(analyzedTargets);
  const score = calculateTouchTargetScore(analyzedTargets, spacingIssues);
  const recommendations = generateTouchTargetRecommendations(analyzedTargets, spacingIssues);

  const summary = {
    total: analyzedTargets.length,
    pass: analyzedTargets.filter(t => t.status === 'pass').length,
    warning: analyzedTargets.filter(t => t.status === 'warning').length,
    fail: analyzedTargets.filter(t => t.status === 'fail').length,
  };

  return {
    targets: analyzedTargets,
    spacingIssues,
    score,
    summary,
    recommendations,
  };
}

