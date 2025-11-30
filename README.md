# ♿ Accessibility Playground

<div align="center">

**A stunning, fully accessible suite of tools for building inclusive websites**

[![WCAG 2.1 AA](https://img.shields.io/badge/WCAG-2.1%20AA-green.svg)](https://www.w3.org/WAI/WCAG21/quickref/)
[![Next.js](https://img.shields.io/badge/Next.js-13-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[🚀 Quick Start](#-quick-start) • [✨ Features](#-features) • [🛠️ Tools](#-tools) • [📚 Docs](#-documentation)

</div>

---

## 🎯 What is This?

Accessibility Playground is a **free, open-source** collection of tools designed to help designers and developers create websites that work for **everyone**. Test color contrast, simulate color blindness, analyze typography, and more—all with a beautiful, modern interface.

## 🛠️ Tools

### 1. **Contrast Checker** 🎨
Test color combinations for WCAG compliance.
- AA and AAA level testing
- Live preview with multiple font sizes
- Instant accessibility ratings
- Smart color suggestions
- Copy results to clipboard

### 2. **Font Readability Analyzer** 📝
Test typography for optimal readability.
- Font size, weight, spacing analysis
- Dyslexia-friendly fonts
- Line height and letter spacing
- Real-time readability scores
- WCAG typography guidelines

### 3. **Color Blindness Visualizer** 👁️
Simulate different types of color vision deficiency.
- **9 simulation types:**
  - Normal Vision
  - Protanopia (Red-blind)
  - Deuteranopia (Green-blind)
  - Tritanopia (Blue-blind)
  - Protanomaly (Red-weak)
  - Deuteranomaly (Green-weak, most common)
  - Tritanomaly (Blue-weak)
  - Achromatopsia (Complete color blindness)
  - Achromatomaly (Incomplete color blindness)
- Live color palette editor
- Real-time website preview
- SVG color matrix filters

---

## 📁 Project Structure

```
accessibility-playground/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── layout.tsx                  # Root layout with analytics
│   ├── globals.css                 # Global styles
│   ├── sitemap.ts                  # SEO sitemap
│   ├── contrast-checker/           # Contrast tool
│   ├── font-readability/           # Typography tool
│   ├── color-blindness/            # CVD simulator
│   └── resources/                  # Learning resources
├── components/
│   ├── ColorPaletteEditor.tsx      # Color picker
│   ├── WebsitePreview.tsx          # Live preview
│   └── ColorBlindnessToggle.tsx    # CVD toggle
├── utils/
│   ├── colorBlindness.tsx          # CVD algorithms
│   ├── contrastRatio.ts            # WCAG contrast
│   └── readabilityAnalysis.ts      # Typography analysis
└── public/                         # Static assets
```

---

## 🎨 Technology Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 13** | React framework with SSR |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Smooth animations |
| **Vercel Analytics** | User tracking |
| **Speed Insights** | Performance monitoring |

---

## 🎯 Use Cases

### For Designers
- Test color palettes for accessibility
- Simulate color blindness in real-time
- Get instant WCAG compliance feedback
- Experiment with typography settings

### For Developers
- Validate WCAG 2.1 compliance
- Test contrast ratios programmatically
- Integrate accessibility testing early
- Learn best practices

### For Product Managers
- Ensure inclusive design
- Meet legal accessibility requirements
- Reduce risk of lawsuits
- Expand user base (300M+ with CVD)

---

## 📊 Performance

### Lighthouse Scores (Expected)

- 🎯 **Performance**: 95+
- ♿ **Accessibility**: 100
- ✅ **Best Practices**: 100
- 🔍 **SEO**: 100

### Core Web Vitals

- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- WCAG 2.1 Guidelines by W3C
- Color blindness algorithms based on research
- Inspired by accessibility advocates worldwide

---

## 🌟 Show Your Support

If this project helped you, please consider:
- ⭐ Starring the repository
- 🐦 Sharing on Twitter
- 📝 Writing a blog post
- 💬 Telling your friends

---

<div align="center">

**Built with ❤️ for everyone**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/yourusername/accessibility-playground)

**Let's make the web accessible for all!** ♿✨

</div>
