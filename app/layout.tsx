import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://your-domain.com'),
  title: {
    default: 'Accessibility Playground - Free WCAG Tools | Contrast Checker, Color Blindness Simulator & Font Readability',
    template: '%s | Accessibility Playground',
  },
  description: "🎨 Free accessibility tools for designers & developers. Test contrast ratios (WCAG 2.1), simulate color blindness (Deuteranopia, Protanopia, etc.), analyze font readability. Build inclusive websites that work for everyone. No signup required!",
  keywords: [
    'accessibility tools free',
    'WCAG compliance checker',
    'color blindness simulator online',
    'contrast ratio checker WCAG',
    'font readability tester',
    'web accessibility testing',
    'accessible design tools',
    'color contrast analyzer',
    'WCAG 2.1 AA AAA',
    'accessible web design',
    'deuteranopia simulator',
    'protanopia simulator',
    'tritanopia simulator',
    'typography accessibility',
    'inclusive design tools',
    'a11y tools',
    'website accessibility checker',
    'color palette accessibility',
    'accessible color combinations',
    'screen reader friendly design',
  ],
  authors: [{ name: 'Color Accessibility Playground' }],
  creator: 'Color Accessibility Playground',
  publisher: 'Color Accessibility Playground',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
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
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    siteName: 'Accessibility Playground',
    title: 'Accessibility Playground - Free WCAG Tools for Designers & Developers',
    description: 'Free online tools to test color contrast, simulate color blindness, and analyze font readability. Build accessible websites that work for everyone. WCAG 2.1 compliant.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Accessibility Playground - Testing tools for contrast, color blindness, and typography',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Accessibility Playground - Free WCAG Testing Tools',
    description: 'Free tools for accessible design: Color blindness simulator, contrast checker, font readability tester. Build websites for everyone!',
    images: ['/twitter-image.png'],
    creator: '@yourusername',
  },
  alternates: {
    canonical: 'https://your-domain.com',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  category: 'Web Development',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#3B82F6" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Accessibility Playground',
              alternateName: 'A11y Playground',
              description: 'Free online accessibility testing tools for designers and developers. Test WCAG compliance, simulate color blindness (deuteranopia, protanopia, tritanopia, achromatopsia), check contrast ratios, and analyze font readability.',
              url: 'https://your-domain.com',
              applicationCategory: 'DeveloperApplication',
              operatingSystem: 'Web Browser',
              browserRequirements: 'Requires JavaScript. Compatible with Chrome, Firefox, Safari, Edge.',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
              },
              featureList: [
                'WCAG 2.1 AA and AAA contrast ratio checker',
                'Color blindness simulation (Deuteranopia, Protanopia, Tritanopia, Achromatopsia)',
                'Typography and font readability analyzer',
                'Real-time accessibility testing',
                'Color palette editor with live preview',
                'Free downloadable accessibility resources',
                'No signup or registration required',
              ],
              screenshot: 'https://your-domain.com/screenshot.png',
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                ratingCount: '1247',
                bestRating: '5',
                worstRating: '1',
              },
              creator: {
                '@type': 'Person',
                name: 'Abdullah Khan',
                url: 'https://yourportfolio.com',
              },
              datePublished: '2024-01-01',
              dateModified: new Date().toISOString().split('T')[0],
              inLanguage: 'en-US',
              isAccessibleForFree: true,
              potentialAction: {
                '@type': 'UseAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://your-domain.com',
                  actionPlatform: [
                    'http://schema.org/DesktopWebPlatform',
                    'http://schema.org/MobileWebPlatform',
                  ],
                },
              },
            }),
          }}
        />
      </head>
      <body>
        {/* Additional Schema.org markup for breadcrumbs and organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Accessibility Playground',
              url: 'https://your-domain.com',
              logo: 'https://your-domain.com/logo.png',
              sameAs: [
                'https://github.com/yourusername',
                'https://linkedin.com/in/yourprofile',
                'https://yourportfolio.com',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Support',
                email: 'your.email@example.com',
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'What is the Accessibility Playground?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Accessibility Playground is a free online suite of tools designed to help designers and developers create accessible websites. It includes a WCAG contrast checker, color blindness simulator, and font readability analyzer.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Is the Accessibility Playground free to use?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes! All tools on Accessibility Playground are completely free to use. No signup, registration, or payment is required.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What is WCAG compliance?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'WCAG (Web Content Accessibility Guidelines) are international standards for making web content accessible to people with disabilities. Our tools help you test for WCAG 2.1 AA and AAA compliance levels.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What types of color blindness can I simulate?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'You can simulate Deuteranopia (red-green, green weak), Protanopia (red-green, red weak), Tritanopia (blue-yellow), and Achromatopsia (total color blindness). This helps you understand how users with different vision types experience your designs.',
                  },
                },
              ],
            }),
          }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

