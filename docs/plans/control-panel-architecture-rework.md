# Control Panel Architecture Rework

## Problem

The current ControlPanel uses `clip-path` animation to reveal/hide the expanded panel. This causes issues:

1. Native `title` tooltips don't work reliably (browser quirks with hover states)
2. CSS tooltips get clipped by the `clip-path`
3. The pseudo-element hack for click handling on collapsed state adds complexity
4. Pointer events require z-index workarounds

## Current Architecture

```
ControlPanel (fixed, right side)
└── ControlPanel__content (motion.div with clip-path animation)
    ├── Sections with indicators + options
    └── ::after pseudo-element (click target when collapsed)

ControlPanelPrintHint (Portal - escapes clip-path)
```

## Proposed Architecture

```
                                    ┌─────────────────────┐
   Expanded Panel slides in         │                     │
   from right, UNDER the strip      │    Strip (Portal)   │  ← Always visible
                                    │    z-index: higher  │     Indicators here
┌──────────────────────────────┐    │                     │
│                              │    └─────────────────────┘
│   Expanded Panel (Portal)    │───►         │
│   z-index: lower             │         Slides under
│   Options/Rows here          │
│                              │
└──────────────────────────────┘
```

- **Strip**: Portal, fixed right, always visible, higher z-index
- **Expanded Panel**: Portal, slides in from right edge, goes UNDER the strip
- Strip overlays the right edge of the expanded panel
- Creates seamless visual connection

## Implementation Steps

### Step 1: Create ControlPanelStrip component
- Extract indicator column into its own component
- Render via Portal to `document.body`
- Fixed positioning on right edge
- Higher z-index (on top)
- Handle click to toggle expanded state

### Step 2: Create ControlPanelExpanded component
- Contains the rows (labels + options)
- Render via Portal to `document.body`
- Lower z-index (slides under strip)
- Slide-in animation from right
- Right edge aligns with or overlaps under strip

### Step 3: Animation
- Expanded panel: `transform: translateX(100%)` → `translateX(0)`
- Strip stays stationary
- Panel appears to slide out from behind the strip

### Step 4: Visual continuity
- Shared border style between strip and panel
- Shadow on the combined shape (or just on panel)
- Strip's left border connects with panel's right edge

### Step 5: Clean up
- Remove clip-path animation
- Remove pseudo-element click hack
- Remove z-index/pointer-events workarounds
- Use native `title` attributes for tooltips

## Files to Modify

- `src/components/ControlPanel/ControlPanel.tsx` - Orchestrates both components
- `src/components/ControlPanel/ControlPanel.css` - Simplified styles
- New files:
  - `ControlPanelStrip.tsx` / `.css`
  - `ControlPanelExpanded.tsx` / `.css`

## Benefits

- Native tooltips work everywhere
- Cleaner architecture without clip-path hacks
- Better separation of concerns
- Easier to maintain
