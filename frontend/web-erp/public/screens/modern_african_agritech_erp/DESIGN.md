---
name: Modern African Agritech ERP
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
  surface-tint: '#E8F1EA'
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
  primary-dark: '#062A20'
  canvas-warm: '#F7F4EC'
  surface-white: '#FFFFFF'
  text-muted: '#66736C'
  border-light: '#DDE4DE'
  warning-amber: '#D79A19'
  warning-light: '#FFF3D6'
  danger-red: '#C94B4B'
  danger-light: '#FDE8E8'
  info-blue: '#3978A8'
  info-light: '#E8F2FA'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.005em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
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
  margin: 1.5rem
  margin-sm: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.25rem
  space-xl: 1.5rem
---

## Brand & Style

The design system merges the structural reliability of enterprise ERP systems with the warmth, vitality, and quiet confidence of modern African agritech. It rejects rustic, folksy agricultural clichés in favor of architectural precision, technological maturity, and institutional credibility. Designed for administrators, agronomists, and cooperative leaders, the emotional tone is stable, transparent, authoritative, and human-centric.

Visually, the style pairs **Corporate Modernism** with an **Organic Earth-Tone Foundation**. It utilizes generous negative space, crisp structural lines, and dense, highly-structured data presentations. A high-contrast relationship between deep forest foliage tones and sunlit, warm neutral surfaces creates an experience that feels grounded, clean, and unmistakably professional.

## Colors

The system uses an explicit 60-30-10 distribution model to preserve visual calm within data-dense administrative workflows:
- **60% Foundation**: The warm off-white canvas (`#F7F4EC`) provides an organic ground, while pure white (`#FFFFFF`) isolates cards, inputs, and tabular data.
- **30% Structure & Contrast**: Deep Forest Green (`#0B3D2E`) and Primary Dark (`#062A20`) define primary actions and persistent navigation frames. Dark Text (`#17231D`) provides high-legibility typographic output against light surfaces.
- **10% Semantic & Accents**: Emerald Green (`#146B45`) and Light Green (`#E8F1EA`) represent active navigation and positive validation. Status colors (Amber `#D79A19`, Red `#C94B4B`, Blue `#3978A8`) with their respective soft background containers are strictly capped at 5% of viewport coverage to prevent visual fatigue.

The design relies on a fixed dual-surface approach rather than an inverted dark mode: high-density administrative operations run on bright, warm surfaces framed by an authoritative, deep forest green navigation spine.

## Typography

Inter serves as the singular typographic workhorse across headlines, dense data sheets, and control labels, selected for its neutral geometry and open counters at compact sizes. 

- **Weight Discipline**: Restrict typography to two operational weights: Regular (`400`) for structural legibility, tabular reads, and long-form data; and Semibold (`600`) for visual anchors, state changes, headers, and interactive labels.
- **Hierarchy Rules**: Primary section headings and table containers use `headline-md` (`20px`), while internal module cards and KPI cards anchor on `headline-sm` (`16px`). Data table cells strictly execute on `body-md` (`14px`) to balance information density with clean horizontal scanning. Metadata, column headers, system logs, and security footers leverage `body-sm` (`12px`) rendered in secondary text muted gray.

## Layout & Spacing

The layout is built upon an 8pt architectural rhythm, utilizing a responsive 12-column grid for desktop administration consoles and a stacked touch-first single column for mobile operations:

- **Desktop Framework**: Employs a persistent, left-docked 260px navigation sidebar rendered in dark forest tones. The administrative main canvas floats alongside with a continuous outer viewport margin of `24px` (`margin`), internal card gutters of `24px` (`gutter`), and interior card padding dialed strictly to `16px`–`20px` (`space-lg`).
- **Master-Detail & Split Views**: Complex configurations (such as role-based permission matrices and organizational trees) use asymmetric column allocations: a 4-column master tree paired with an 8-column detail inspector panel.
- **Mobile Paradigm**: Adapts below the 768px threshold by collapsing the persistent sidebar into a pinned bottom navigation dock, dropping viewport margins to `16px` (`margin-sm`), and consolidating multi-stage forms into vertically stacked stepping panes.

## Elevation & Depth

Visual hierarchy relies on structural tonal separation and hairline boundaries rather than high-contrast shadows or simulated glassmorphism:

- **Base Ground**: The main page canvas sits flat at `#F7F4EC`.
- **Card Tier**: Content containers, tabular lists, and operational widgets sit at zero elevation but gain separation through a `#FFFFFF` fill paired with a crisp `1px` stroke in `#DDE4DE`. They utilize a soft, ambient, low-contrast shadow (`0 2px 8px rgba(11, 61, 46, 0.04)`), tinted subtly with the primary forest green hue.
- **Floating Overlays & Drawers**: Slide-in right detail drawers (used for JSON audit diffs and user profile details) and interactive dialogs use a higher ambient shadow (`0 12px 32px rgba(6, 42, 32, 0.12)`) set against a darkened backdrop veil (`rgba(6, 42, 32, 0.4)`).
- **Prohibited Treatments**: Frosted glass effects, vivid atmospheric glows, saturated drop shadows, and skeuomorphic gradients are explicitly barred.

## Shapes

The design system standardizes on a refined, organic curvature that softens technical ERP density without sliding into playful consumer aesthetics:

- **Standard Containers & Modals**: Cards, panels, input fields, dropdown menus, and authentication cards use a standard `12px` to `16px` border radius (`rounded-lg`).
- **Data Table Cells & Row Dividers**: Data tables maintain planar geometry with rectangular exterior bounds and razor-thin horizontal rules (`1px` solid `#DDE4DE`).
- **Badges, Pills, and Indicators**: Micro-status tags, permission matrix badges, and OTP step counter nodes apply a fully circular pill radius (`rounded-full`) to immediately distinguish system states from actionable input surfaces.

## Components

### Buttons
- **Primary**: Solid `#0B3D2E` background, `#FFFFFF` text, `12px` border-radius, font-size `14px` Semibold. Hover: `#062A20`. Focus: ring with `2px` offset using `#146B45`.
- **Secondary**: `#FFFFFF` background, `#146B45` or `#0B3D2E` text, `1px` border in `#DDE4DE`, hover background `#E8F1EA`.
- **Destructive**: `#C94B4B` background or `#FDE8E8` surface with `#C94B4B` text and hairline border.

### Input Fields & Controls
- Height: `44px` for touch accessibility. Fill: `#FFFFFF`. Border: `1px` solid `#DDE4DE`. Corner radius: `12px`. Placeholder text: `#66736C`. Active focus state: border shifts to `#146B45` with no heavy outline rings.
- **OTP Input**: Discrete individual numeric blocks (`48x54px`), centered text, `12px` radius, thin border in `#DDE4DE`, transitioning to `#0B3D2E` when active.

### Badges & Status Indicators
- Status badges use pill shapes with an internal padding of `4px 10px` and text size `12px` Semibold.
- **Granted / Active**: `#E8F1EA` background with `#146B45` text.
- **Pending / Warning**: `#FFF3D6` background with `#D79A19` text.
- **Denied / Suspended**: `#FDE8E8` background with `#C94B4B` text.
- **Informational**: `#E8F2FA` background with `#3978A8` text.

### Data Tables & Tree Lists
- Headers use `#F7F4EC` or pure white backgrounds with `#66736C` uppercase `12px` labels. Table rows feature `48px` minimum height, separated by thin `1px` horizontal strokes in `#DDE4DE`. Row hover state transitions gently to `#F7F4EC`.
- Organizational tree controls use subtle line connectors, with collapsible nodes indicated by clean `16px` line-icon arrows.

### Detail Drawers (Flyouts)
- Slide in smoothly from the right viewport boundary with a fixed `480px` to `600px` desktop width. Crisp white `#FFFFFF` surface with an internal `24px` padding, displaying structured key-value pairs, nested JSON payload inspectors, and secondary actions along a sticky bottom footer.