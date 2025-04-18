# Styling Guide

## Colors
- Primary: Use the primary color palette for main actions and important elements
  - Light: primary-50 to primary-300
  - Main: primary-400 to primary-600
  - Dark: primary-700 to primary-900

## Typography
- Headings: Use semantic heading tags (h1-h6) with appropriate font sizes
- Body text: Use standard paragraph tags with base text size
- Links: Use primary-600 color with hover state in primary-700

## Components

### Buttons
- Primary Button:
  ```tsx
  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md"
  ```
- Secondary Button:
  ```tsx
  className="bg-white border border-primary-600 text-primary-600 hover:bg-primary-50 px-4 py-2 rounded-md"
  ```

### Cards
- Card Container:
  ```tsx
  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
  ```

### Forms
- Input Fields:
  ```tsx
  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
  ```
- Labels:
  ```tsx
  className="block text-sm font-medium text-gray-700 mb-1"
  ```

### Layout
- Container:
  ```tsx
  className="container mx-auto px-4 py-8"
  ```
- Grid:
  ```tsx
  className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
  ```

## Spacing
- Use consistent spacing units (4px, 8px, 16px, 24px, 32px)
- Padding: p-4, p-6, p-8
- Margin: m-4, m-6, m-8
- Gap: gap-4, gap-6, gap-8

## Responsive Design
- Mobile first approach
- Breakpoints:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px 