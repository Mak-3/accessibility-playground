import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contrast Ratio Checker - WCAG Compliance Tool',
  description: 'Free WCAG 2.1 contrast ratio checker. Test text and background colors for AA/AAA compliance. Get instant accessibility ratings and color suggestions for better contrast.',
  keywords: [
    'contrast ratio checker',
    'WCAG contrast',
    'color contrast tool',
    'accessibility checker',
    'AA compliance',
    'AAA compliance',
    'contrast calculator',
    'web accessibility',
    'color accessibility',
    'WCAG 2.1',
  ],
  openGraph: {
    title: 'WCAG Contrast Ratio Checker - Free Accessibility Tool',
    description: 'Check if your color combinations meet WCAG standards. Instant AA/AAA compliance testing with suggestions for accessible alternatives.',
    url: 'https://your-domain.com/contrast-checker',
    siteName: 'Color Accessibility Playground',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contrast Ratio Checker - WCAG Tool',
    description: 'Test color contrast for WCAG AA/AAA compliance. Free tool with instant results and suggestions.',
  },
  alternates: {
    canonical: 'https://your-domain.com/contrast-checker',
  },
};

export default function ContrastCheckerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'WCAG Contrast Ratio Checker',
            description: 'Check color contrast ratios for WCAG 2.1 compliance',
            url: 'https://your-domain.com/contrast-checker',
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'Web Browser',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
          }),
        }}
      />
      {children}
    </>
  );
}


