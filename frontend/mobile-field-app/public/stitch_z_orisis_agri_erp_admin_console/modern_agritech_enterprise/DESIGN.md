---
name: Modern Agritech Enterprise
colors:
  surface: '#effdf3'
  surface-dim: '#cfddd4'
  surface-bright: '#effdf3'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#e9f7ed'
  surface-container: '#e3f1e7'
  surface-container-high: '#ddece2'
  surface-container-highest: '#d8e6dc'
  on-surface: '#121e18'
  on-surface-variant: '#414944'
  inverse-surface: '#27332d'
  inverse-on-surface: '#e6f4ea'
  outline: '#717974'
  outline-variant: '#c0c8c3'
  surface-tint: '#396756'
  primary: '#00261b'
  on-primary: '#ffffff'
  primary-container: '#0b3d2e'
  on-primary-container: '#79a894'
  inverse-primary: '#a0d1bc'
  secondary: '#156c46'
  on-secondary: '#ffffff'
  secondary-container: '#a3f4c3'
  on-secondary-container: '#1e724b'
  tertiary: '#0f250e'
  on-tertiary: '#ffffff'
  tertiary-container: '#243b21'
  on-tertiary-container: '#8ba584'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#bcedd7'
  primary-fixed-dim: '#a0d1bc'
  on-primary-fixed: '#002116'
  on-primary-fixed-variant: '#214f3f'
  secondary-fixed: '#a3f4c3'
  secondary-fixed-dim: '#87d7a8'
  on-secondary-fixed: '#002111'
  on-secondary-fixed-variant: '#005232'
  tertiary-fixed: '#ceeac5'
  tertiary-fixed-dim: '#b3ceab'
  on-tertiary-fixed: '#0a2009'
  on-tertiary-fixed-variant: '#354d31'
  background: '#effdf3'
  on-background: '#121e18'
  surface-variant: '#d8e6dc'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  gutter-lg: 2rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style
The design system reflects a synthesis of high-yield enterprise operational rigor and ecological vitality. Built for modern agricultural operations, cooperative networks, and agribusiness supply chain administrators, the interface balances institutional gravitas with organic warmth. 

The aesthetic adheres to **Corporate / Modern** principles infused with earthy sophistication. It departs from sterile, cold software palettes by introducing a warm, grounding canvas paired with deep foliage greens and mineral accents. The experience communicates reliability, long-term stewardship, and computational clarity—delivering complex yield telemetry, inventory reconciliation, and agronomist dispatch records without cognitive overwhelm.

## Colors
The color architecture grounds dense operational data while highlighting critical crop and financial states.

### Core Roles
- **Canvas & Surfaces:** Primary workspace canvas is rooted in warm off-white (`#F7F4EC`), reducing ocular fatigue during extended administrative shifts. Layered cards use absolute white (`#FFFFFF`) to establish elevation against the canvas.
- **Primary Brand (`#0B3D2E` / `#062A20`):** Represents structural authority; applied to high-impact primary buttons, active navigation rails, and primary data highlights. Darkened state (`#062A20`) serves interactive hover/active feedback.
- **Secondary Accent (`#146B45`):** Emerald tone used for positive trends, operational confirmation, interactive links, and focus rings.
- **Muted Foliage (`#A8C3A0` / `#E8F1EA`):** Soft sage and pale leaf tints reserved for secondary states, selection fills, and low-priority progress indicators.
- **Typographic Scale:** Body and structural labels default to `#17231D` (deep peat green-black), while supporting metadata, table column headers, and helper strings rely on `#66736C`.
- **Structural Outlines:** Defined by `#DDE4DE` to softly partition information without stark grid lines.

### Functional Alerts
- **Warning:** Amber (`#D79A19`) over pale amber surface (`#FFF3D6`) for seasonal risk, spoilage alerts, and delayed shipments.
- **Danger:** Crimson (`#C94B4B`) over soft red tint (`#FDE8E8`) for equipment failure, soil pH thresholds, and transaction errors.
- **Informational:** Slate Blue (`#3978A8`) over soft blue tint (`#E8F2FA`) for telemetry synchronization and agronomist status notes.

## Typography
Typographic rhythm relies exclusively on **Inter** to ensure maximum legibility within high-density tabular environments, dashboards, and spatial inventory maps.

### Hierarchy & Scale
- **Display & Headlines:** Heavy tracking reduction (`-0.02em` to `-0.01em`) ensures titles maintain editorial polish and compact structure. Use `display-lg` strictly for administrative summaries and top-level portfolio valuation metrics.
- **Tabular Numerics:** When presenting acreage, metric tonnage, financial balances, and moisture sensor inputs, enable OpenType tabular figures (`tnum`) across all `body-*` and `label-*` classes.
- **Labels & Micro-copy:** Uppercase transformations are reserved for `label-sm` when designating system codes, lot serials, and table column headers, paired with widened letter spacing (`0.04em`).

## Layout & Spacing
The layout system enforces a structured multi-column fluid model configured to manage expansive enterprise datasets while safeguarding reading margins.

### Grid Infrastructure
- **Desktop (1280px and above):** 12-column layout with 32px (`gutter-lg`) gutters and a fixed outer margin of 32px (`margin`). Accommodates persistent side-navigation (collapsible between 80px and 260px) alongside fluid workspace dashboards.
- **Tablet (768px – 1279px):** 8-column layout utilizing 24px (`gutter`) gutters and 24px canvas margins. Secondary sidebars shift to modal drawers.
- **Mobile (Below 768px):** 4-column layout with 16px (`gutter-sm`) gutters and 16px (`margin-mobile`) canvas margins. Data tables stack into vertically sequenced summary cards.

### Spacing Cadence
Spacing follows an intentional 4px base increment. Padding inside metric cards and interactive elements remains strictly controlled: internal compact padding leverages `space-sm` (8px) and `space-md` (16px), while structural component boundaries rely on `space-lg` (24px) and `space-xl` (32px).

## Elevation & Depth
Depth is articulated via clean tonal layering paired with subtle ambient diffusion. Harsh drop shadows are avoided to maintain an uncluttered workspace.

### Tonal Stratification
- **Level 0 (Canvas):** Ground plane set to `#F7F4EC`.
- **Level 1 (Default Containers & Cards):** Flat `#FFFFFF` surface enclosed by a low-contrast 1px border (`#DDE4DE`) and a diffused warm ambient shadow: `0 1px 3px 0 rgba(11, 61, 46, 0.04), 0 1px 2px -1px rgba(11, 61, 46, 0.03)`.
- **Level 2 (Dropdowns, Popovers & Hover States):** `#FFFFFF` surface with expanded diffusion: `0 4px 12px -2px rgba(11, 61, 46, 0.06), 0 2px 6px -1px rgba(11, 61, 46, 0.04)`.
- **Level 3 (Modal Dialogs & Context Panels):** `#FFFFFF` floating surface paired with `0 16px 32px -4px rgba(11, 61, 46, 0.08), 0 4px 8px -2px rgba(11, 61, 46, 0.04)` over an overlay backdrop tinted with `#062A20` at 40% opacity.

## Shapes
The design system deploys a balanced corner treatment:
- **Base Components (Inputs, Buttons, Dropdowns):** `rounded` (0.5rem / 8px), providing ergonomic affordance.
- **Containers & Content Cards:** `rounded-lg` (1rem / 16px), delivering modern containment for multi-field groups and yield graphs.
- **Badges, Filter Pills, and Avatars:** Fully rounded pill shapes (`rounded-full` / 9999px) to establish immediate visual differentiation from input frames and operational cards.

## Components

### Buttons
- **Primary:** Background `#0B3D2E`, text `#FFFFFF`, border none. Hover state `#062A20`. Focused state features an outer outline ring of `#146B45` at 2px offset.
- **Secondary / Outline:** Background `#FFFFFF`, text `#0B3D2E`, 1px border `#DDE4DE`. Hover state adopts background `#E8F1EA`.
- **Destructive:** Background `#C94B4B`, text `#FFFFFF`. Hover state `#A33636`.

### Badges & Status Chips
Pill-shaped containers (`rounded-full`), height 24px, padded 0 10px, typography `label-sm`.
- **Healthy / In Season:** Background `#E8F1EA`, text `#146B45`.
- **Warning / Review Required:** Background `#FFF3D6`, text `#D79A19`.
- **Critical / Pest Risk:** Background `#FDE8E8`, text `#C94B4B`.
- **Neutral / Draft:** Background `#F7F4EC`, text `#66736C`, border 1px solid `#DDE4DE`.

### Input Fields & Controls
- **Text Inputs & Selects:** Height 40px, background `#FFFFFF`, border 1px solid `#DDE4DE`, border-radius 8px. Text `#17231D`, placeholder `#66736C`. Active/focused state illuminates border to `#146B45` with a subtle inset-free focus ring.
- **Checkboxes & Radios:** 18px dimensions, border 1.5px solid `#DDE4DE`, radius 4px (checkbox) or circular (radio). Checked state shifts background to `#0B3D2E` with white icon check.

### Data Tables
- **Container:** Wrapped in a Level 1 card (`#FFFFFF`, border `#DDE4DE`, radius 16px).
- **Header Row:** Background `#F7F4EC`, text `#66736C`, typography `label-md`, height 44px, bottom border 1px solid `#DDE4DE`.
- **Data Rows:** Height 52px, text `#17231D`, typography `body-md`, border-bottom 1px solid `#DDE4DE`. Row hover state shifts background to `#F7F4EC` at 50% opacity.

### Specialized ERP Modules
- **Metric Cards (KPIs):** White background, 16px radius, subtle border. Features key value (`headline-lg`), label (`label-md` in `#66736C`), and inline trend chip with matching status tinting.
- **Harvest & Parcel Cards:** Grouped panels displaying batch progress bars colored in `#146B45`, parcel tags, and soil health indicators.