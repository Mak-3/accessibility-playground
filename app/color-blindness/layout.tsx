import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Color Blindness Simulator - Test Your Design | Deuteranopia, Protanopia, Tritanopia',
  description: 'Free color blindness simulator. See how your website looks with deuteranopia, protanopia, tritanopia, and achromatopsia. Test accessibility for 300M+ colorblind users worldwide.',
  keywords: [
    'color blindness simulator',
    'deuteranopia simulator',
    'protanopia simulator',
    'tritanopia simulator',
    'achromatopsia test',
    'colorblind test website',
    'color vision deficiency',
    'accessible color palette',
    'cvd simulator',
    'red-green colorblind',
    'blue-yellow colorblind',
    'colorblind friendly design',
  ],
  openGraph: {
    title: 'Color Blindness Simulator - Test Website Accessibility',
    description: 'Simulate different types of color blindness to ensure your design is accessible to everyone. Free tool supporting all CVD types.',
    url: 'https://your-domain.com/color-blindness',
    siteName: 'Accessibility Playground',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Color Blindness Simulator - Free Tool',
    description: 'See your design through the eyes of colorblind users. Test deuteranopia, protanopia, tritanopia & more.',
  },
  alternates: {
    canonical: 'https://your-domain.com/color-blindness',
  },
};

export default function ColorBlindnessLayout({
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
            name: 'Color Blindness Visualizer',
            description: 'Simulate color vision deficiencies including deuteranopia, protanopia, tritanopia, and achromatopsia to test website accessibility',
            url: 'https://your-domain.com/color-blindness',
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'Web Browser',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
            },
            featureList: [
              'Deuteranopia (red-green, green weak) simulation',
              'Protanopia (red-green, red weak) simulation',
              'Tritanopia (blue-yellow) simulation',
              'Achromatopsia (total colorblindness) simulation',
              'Real-time color palette preview',
              'Website mockup visualization',
            ],
          }),
        }}
      />
      {children}
    </>
  );
}

