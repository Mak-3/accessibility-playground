import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Font & Readability Playground - Typography Accessibility Tool',
  description: 'Experiment with font size, line spacing, letter spacing, and weight. Test dyslexia-friendly fonts and get real-time readability scores. Free WCAG typography tool.',
  keywords: [
    'typography accessibility',
    'font readability',
    'dyslexia friendly fonts',
    'font size testing',
    'line spacing',
    'letter spacing',
    'typography tool',
    'readable fonts',
    'WCAG typography',
    'text accessibility',
  ],
  openGraph: {
    title: 'Font & Readability Playground - Typography Accessibility',
    description: 'Test typography settings for optimal readability. Experiment with font size, spacing, and dyslexia-friendly options with instant feedback.',
    url: 'https://your-domain.com/font-readability',
    siteName: 'Color Accessibility Playground',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Font & Readability Playground',
    description: 'Test typography for accessibility. Font size, spacing, dyslexia modes with instant readability scores.',
  },
  alternates: {
    canonical: 'https://your-domain.com/font-readability',
  },
};

export default function FontReadabilityLayout({
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
            name: 'Font & Readability Playground',
            description: 'Test and optimize typography for accessibility and readability',
            url: 'https://your-domain.com/font-readability',
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


