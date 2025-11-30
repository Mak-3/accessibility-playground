'use client';

import { ColorPalette } from './ColorPaletteEditor';

interface WebsitePreviewProps {
  palette: ColorPalette;
  filter: string;
}

export default function WebsitePreview({ palette, filter }: WebsitePreviewProps) {
  return (
    <div 
      className="h-full overflow-y-auto"
      style={{ filter }}
    >
      {/* Header */}
      <header 
        className="p-6 shadow-md"
        style={{ backgroundColor: palette.primary }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <h1 
              className="text-3xl font-bold"
              style={{ color: palette.background }}
            >
              Demo Website
            </h1>
            <nav className="flex gap-6">
              {['Home', 'About', 'Services', 'Contact'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="font-medium hover:opacity-80 transition-opacity"
                  style={{ color: palette.background }}
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ backgroundColor: palette.background }}>
        {/* Hero Section */}
        <section 
          className="py-20 px-6"
          style={{ backgroundColor: palette.primary + '20' }}
        >
          <div className="max-w-6xl mx-auto text-center">
            <h2 
              className="text-5xl font-bold mb-6"
              style={{ color: palette.text }}
            >
              Welcome to Our Platform
            </h2>
            <p 
              className="text-xl mb-8 opacity-80"
              style={{ color: palette.text }}
            >
              Experience the power of accessible design with our color testing tool
            </p>
            <div className="flex gap-4 justify-center">
              <button
                className="px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                style={{ 
                  backgroundColor: palette.primary,
                  color: palette.background 
                }}
              >
                Get Started
              </button>
              <button
                className="px-8 py-3 rounded-lg font-semibold border-2 hover:opacity-80 transition-opacity"
                style={{ 
                  backgroundColor: 'transparent',
                  borderColor: palette.secondary,
                  color: palette.secondary
                }}
              >
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-6" style={{ backgroundColor: palette.background }}>
          <div className="max-w-6xl mx-auto">
            <h3 
              className="text-3xl font-bold text-center mb-12"
              style={{ color: palette.text }}
            >
              Key Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Easy to Use', icon: '🎨', color: palette.primary },
                { title: 'Accessible', icon: '♿', color: palette.secondary },
                { title: 'Powerful', icon: '⚡', color: palette.accent },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="p-6 rounded-lg border-2 hover:shadow-lg transition-shadow"
                  style={{ 
                    borderColor: feature.color,
                    backgroundColor: palette.background
                  }}
                >
                  <div 
                    className="text-4xl mb-4 w-16 h-16 flex items-center justify-center rounded-full"
                    style={{ backgroundColor: feature.color + '20' }}
                  >
                    {feature.icon}
                  </div>
                  <h4 
                    className="text-xl font-semibold mb-2"
                    style={{ color: feature.color }}
                  >
                    {feature.title}
                  </h4>
                  <p style={{ color: palette.text + 'CC' }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Sed do eiusmod tempor incididunt ut labore.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Status Messages Section */}
        <section className="py-16 px-6" style={{ backgroundColor: palette.background }}>
          <div className="max-w-6xl mx-auto">
            <h3 
              className="text-3xl font-bold text-center mb-12"
              style={{ color: palette.text }}
            >
              System Messages
            </h3>
            <div className="space-y-4">
              {[
                { type: 'Success', color: palette.success, icon: '✓', message: 'Operation completed successfully!' },
                { type: 'Warning', color: palette.warning, icon: '⚠', message: 'Please review your settings before proceeding.' },
                { type: 'Error', color: palette.error, icon: '✕', message: 'An error occurred. Please try again.' },
              ].map((alert) => (
                <div
                  key={alert.type}
                  className="p-4 rounded-lg flex items-center gap-4"
                  style={{ 
                    backgroundColor: alert.color + '20',
                    borderLeft: `4px solid ${alert.color}`
                  }}
                >
                  <span 
                    className="text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full"
                    style={{ 
                      backgroundColor: alert.color,
                      color: palette.background
                    }}
                  >
                    {alert.icon}
                  </span>
                  <div>
                    <h5 
                      className="font-semibold"
                      style={{ color: alert.color }}
                    >
                      {alert.type}
                    </h5>
                    <p style={{ color: palette.text }}>
                      {alert.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section 
          className="py-20 px-6"
          style={{ backgroundColor: palette.secondary }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h3 
              className="text-4xl font-bold mb-6"
              style={{ color: palette.background }}
            >
              Ready to Get Started?
            </h3>
            <p 
              className="text-xl mb-8"
              style={{ color: palette.background + 'DD' }}
            >
              Join thousands of users who trust our platform
            </p>
            <button
              className="px-10 py-4 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity"
              style={{ 
                backgroundColor: palette.accent,
                color: palette.background
              }}
            >
              Sign Up Now
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer 
          className="py-8 px-6"
          style={{ 
            backgroundColor: palette.text,
            color: palette.background
          }}
        >
          <div className="max-w-6xl mx-auto text-center">
            <p style={{ color: palette.background }}>
              © 2024 Demo Website. Built with accessibility in mind.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

