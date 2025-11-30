import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accessibility Resources - Free Guides & Checklists | Color Accessibility Playground',
  description: 'Download free accessibility resources including WCAG guides, color contrast checklists, typography best practices, and color blindness design patterns. Comprehensive PDFs for building accessible web experiences.',
  keywords: [
    'accessibility resources',
    'WCAG guides',
    'accessibility checklist',
    'color contrast guide',
    'typography accessibility',
    'color blindness design',
    'web accessibility PDF',
    'free accessibility resources',
    'WCAG 2.1 guide',
    'accessible design patterns',
    'ARIA labels guide',
    'accessibility testing tools',
  ],
  authors: [{ name: 'Color Accessibility Playground' }],
  creator: 'Color Accessibility Playground',
  publisher: 'Color Accessibility Playground',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Free Accessibility Resources - Guides, Checklists & Tools',
    description: 'Download comprehensive accessibility resources including WCAG guides, color contrast checklists, and typography best practices. All resources are free and regularly updated.',
    url: 'https://your-domain.com/resources',
    siteName: 'Color Accessibility Playground',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image-resources.png',
        width: 1200,
        height: 630,
        alt: 'Accessibility Resources Library',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Accessibility Resources - Guides & Checklists',
    description: 'Download free WCAG guides, color contrast checklists, typography guides, and more. Comprehensive resources for accessible design.',
    images: ['/twitter-image-resources.png'],
    creator: '@yourusername',
  },
  alternates: {
    canonical: 'https://your-domain.com/resources',
  },
  category: 'Web Development',
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Accessibility Resources Library',
            description: 'Comprehensive collection of free accessibility resources including guides, checklists, and tools for building accessible web experiences.',
            url: 'https://your-domain.com/resources',
            inLanguage: 'en-US',
            isPartOf: {
              '@type': 'WebSite',
              name: 'Color Accessibility Playground',
              url: 'https://your-domain.com',
            },
            about: {
              '@type': 'Thing',
              name: 'Web Accessibility',
              description: 'Guidelines and resources for making web content accessible to people with disabilities',
            },
            hasPart: [
              {
                '@type': 'DigitalDocument',
                name: 'WCAG 2.1 Quick Reference Guide',
                description: 'Comprehensive quick reference guide covering all WCAG 2.1 success criteria',
                encodingFormat: 'application/pdf',
                inLanguage: 'en-US',
              },
              {
                '@type': 'DigitalDocument',
                name: 'Color Contrast Compliance Checklist',
                description: 'Step-by-step checklist for ensuring color choices meet WCAG contrast requirements',
                encodingFormat: 'application/pdf',
                inLanguage: 'en-US',
              },
              {
                '@type': 'DigitalDocument',
                name: 'Typography & Readability Best Practices',
                description: 'Complete guide to accessible typography including font selection, sizing, and spacing',
                encodingFormat: 'application/pdf',
                inLanguage: 'en-US',
              },
            ],
            audience: {
              '@type': 'ProfessionalAudience',
              name: 'Web Developers and Designers',
            },
            provider: {
              '@type': 'Organization',
              name: 'Color Accessibility Playground',
              url: 'https://your-domain.com',
            },
          }),
        }}
      />
      {children}
    </>
  );
}


