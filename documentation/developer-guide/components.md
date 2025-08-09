# Component Structure

This document provides a detailed overview of the component architecture in the Africa Climate Data Platform. Understanding this structure is essential for developers who want to maintain, extend, or customize the platform.

## Table of Contents

1. [Component Overview](#component-overview)
2. [Core Components](#core-components)
3. [Visualization Components](#visualization-components)
4. [UI Components](#ui-components)
5. [Layout Components](#layout-components)
6. [Component Hierarchy](#component-hierarchy)
7. [Component Communication](#component-communication)
8. [Adding New Components](#adding-new-components)

## Component Overview

The Africa Climate Data Platform follows a modular component-based architecture using React and Next.js. Components are organized by functionality and follow a hierarchical structure. The application uses a combination of:

- Server Components (Next.js App Router)
- Client Components (React)
- UI Components (shadcn/ui)
- Visualization Components (custom)

## Core Components

### Page Components

Located in the `app` directory, these Next.js pages define the routes and main layout of the application:

- `app/page.tsx`: Homepage
- `app/topics/[id]/page.tsx`: Topic detail page
- `app/visualizations/[id]/page.tsx`: Visualization detail page
- `app/data/page.tsx`: Data catalog page
- `app/search/page.tsx`: Search results page

### Layout Components

- `app/layout.tsx`: Root layout with global providers
- `components/navbar.tsx`: Navigation bar
- `components/footer.tsx`: Footer component

## Visualization Components

These components handle the rendering of different data visualizations:

### MultiVisualization

`components/multi-visualization.tsx` is the main container component that orchestrates different visualization types. It:

- Manages the active visualization type (chart, map, table)
- Handles data transformation between visualization types
- Provides common controls for all visualizations

\`\`\`tsx
// Example usage of MultiVisualization
<MultiVisualization 
  data={visualizationData} 
  height={500} 
/>
