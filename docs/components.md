# Components

Component architecture and patterns used in this project.

## Core Pattern: Smart Routes, Dumb Components

This project follows a strict separation between smart and dumb layers:

```txt
src/routes/        → Smart containers (data, hooks, logic)
src/partials/      → Reusable compositions (minimal styling)
src/components/    → Dumb components (props only, all styling)
```

### Routes (Smart)

Routes are the only layer that:

- Calls hooks (`useTexts()`, `useLocale()`, etc.)
- Prepares and transforms data
- Passes props down to partials and components

```tsx
// src/routes/index.tsx
export default function IndexRoute() {
  const t = useTexts();

  return (
    <Section title={t.jobs.title}>
      <Job title={t.jobs.dealerCenter.title} ... />
    </Section>
  );
}
```

### Partials (Compositions)

Partials compose multiple components into reusable units. They:

- Are used across multiple routes
- May have local UI state (e.g., `isExpanded`)
- Have **minimal to no styling** - styling lives in components
- Live in `src/partials/`

Example: `ControlPanel` composes `ControlPanelStrip`, `ControlPanelExpanded`, `ControlPanelRow`, etc.

```tsx
// src/partials/ControlPanel.tsx
export default function ControlPanel() {
  const [isExpanded, setIsExpanded] = useState(false);
  const t = useTexts();

  return (
    <>
      <ControlPanelStrip isExpanded={isExpanded} onToggle={...}>
        ...
      </ControlPanelStrip>
      <ControlPanelExpanded isExpanded={isExpanded}>
        ...
      </ControlPanelExpanded>
    </>
  );
}
```

### Components (Dumb)

Components are purely presentational:

- Receive all data via props
- Own all their styling (co-located CSS)
- Know nothing about the app context
- No hooks that access global state

```tsx
// src/components/Job.tsx
interface Props {
  title: string;
  company: string;
  period: string;
}

export default function Job({ title, company, period }: Props) {
  return (
    <article className="Job">
      <h3 className="Job__title">{title}</h3>
      ...
    </article>
  );
}
```

## File Structure

Components have co-located files:

```txt
src/components/
├── Button.tsx           # Component
├── Button.css           # Styles (BEM)
├── Button.stories.tsx   # Storybook story
└── ControlPanel/        # Complex component folder
    ├── ControlPanelStrip.tsx
    ├── ControlPanelStrip.css
    ├── ControlPanelExpanded.tsx
    └── ...
```

## Adding a New Component

1. Create the component file in `src/components/`
2. Create co-located CSS file with BEM naming
3. (Optional) Create a Storybook story for documentation
4. Import and use in a route or partial

```tsx
// src/components/Badge.tsx
import "./Badge.css";

interface Props {
  label: string;
  variant?: "default" | "accent";
}

export default function Badge({ label, variant = "default" }: Props) {
  return <span className={`Badge Badge--${variant}`}>{label}</span>;
}
```

## CVA for Variants

Use `class-variance-authority` for components with multiple variants:

```tsx
import { cva, cx, type VariantProps } from "class-variance-authority";

const buttonVariants = cva("Button", {
  variants: {
    variant: {
      default: "",
      accent: "Button--accent"
    },
    size: {
      default: "",
      large: "Button--large"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});

type Props = React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>;

export default function Button({ variant, size, className, ...props }: Props) {
  return (
    <button
      className={cx(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
```

## CV Components

Components in `src/components/cv/` are optimized for print:

- Designed for PDF export via browser print
- Use print-specific CSS
- Avoid interactive elements

## Key Principles

1. **Components own their styling** - Never reference another component's CSS classes
2. **Props down, events up** - Data flows down, callbacks handle user actions
3. **Partials have no styling** - They compose, they don't style
4. **Routes are the boundary** - Only routes access hooks and prepare data

See [styling.md](./styling.md) for CSS conventions.
