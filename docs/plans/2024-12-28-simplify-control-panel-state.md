# Simplify ControlPanel State: Remove TanStack Store

## Goal

Apply the same URL-as-source-of-truth pattern to ControlPanel style settings. Remove TanStack Store dependency entirely.

Also: Refactor `useLocale` to return object instead of tuple for consistency.

---

## Hook Return Type Pattern

**Object return** (preferred over tuple):

```typescript
// Flexible destructuring - grab only what you need
const { locale, setLocale } = useLocale();
const { setHue } = useHue(); // Only need setter
const { hue } = useHue(); // Only need value

// Extensible - can add more exports later without breaking
const { hue, setHue, presets } = useHue();
```

---

## Current State Analysis

### Store has two types of state:

1. **UI State** - `isExpanded: boolean`
   - Pure UI state, not in URL
   - → Local `useState` in ControlPanel

2. **Style State** - `hue`, `contrast`, `colorMode`
   - Already synced to URL params
   - Already persisted to localStorage
   - Already applied to CSS variables
   - → URL as source of truth (like locale)

---

## Implementation Plan

### 1. Refactor `useLocale` to object return

**File: `src/i18n/useLocale.ts`**

```typescript
interface UseLocaleReturn {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export function useLocale(): UseLocaleReturn {
  const router = useRouter();
  const search = useSearch({ strict: false });
  const locale = search.lang ?? DEFAULT_LOCALE;

  const setLocale = useCallback(
    (newLocale: Locale) => {
      persistLocale(newLocale);
      router.navigate({
        to: ".",
        search: prev => ({ ...prev, lang: newLocale }),
        resetScroll: false,
        replace: true,
        viewTransition: true
      });
    },
    [router]
  );

  return { locale, setLocale };
}
```

Update consumers:

- `src/i18n/useTexts.ts`: `const { locale } = useLocale();`
- `src/components/ControlPanel/ControlPanel.tsx`: `const { locale, setLocale } = useLocale();`

### 2. Create style utilities

**File: `src/hooks/styleUtils.ts`**

Move from `store.ts`:

- Constants: `PRESET_HUES`, `CONTRAST_VALUES`, `COLOR_MODE_VALUES`, defaults
- `getAccentHue(hue)` - for ControlPanelColorDot
- `getHueVariants(hue)` - internal
- CSS var functions: `applyHueCssVars`, `applyContrastCssVars`, `applyColorMode`
- localStorage: `persistHue`, `persistContrast`, `persistColorMode`
- Getters: `getInitialHue`, `getInitialContrast`, `getInitialColorMode`

### 3. Create style hooks (one per file)

**File: `src/hooks/useHue.ts`**

```typescript
interface UseHueReturn {
  hue: Hue;
  setHue: (hue: Hue) => void;
}

export function useHue(): UseHueReturn {
  const router = useRouter();
  const search = useSearch({ strict: false });
  const hue = search.hue ?? DEFAULT_HUE;

  const setHue = useCallback(
    (newHue: Hue) => {
      const { hueAccent, hueAccentAlt } = getHueVariants(newHue);
      applyHueCssVars(newHue, hueAccent, hueAccentAlt);
      persistHue(newHue, hueAccent, hueAccentAlt);
      router.navigate({
        to: ".",
        search: prev => ({ ...prev, hue: newHue }),
        resetScroll: false,
        replace: true
      });
    },
    [router]
  );

  return { hue, setHue };
}
```

**File: `src/hooks/useContrast.ts`** - same pattern

**File: `src/hooks/useColorMode.ts`** - same pattern

### 4. Create initialization hook

**File: `src/hooks/useInitializeStyle.ts`**

```typescript
export function useInitializeStyle() {
  const search = useSearch({ strict: false });
  const { setHue } = useHue();
  const { setContrast } = useContrast();
  const { setColorMode } = useColorMode();
  const { setLocale } = useLocale();

  useEffect(() => {
    // Initialize missing URL params from localStorage/defaults
    if (search.hue === undefined) setHue(getInitialHue());
    if (search.contrast === undefined) setContrast(getInitialContrast());
    if (search.colorMode === undefined) setColorMode(getInitialColorMode());
    if (search.lang === undefined) setLocale(getInitialLocale());
  }, [search.hue, search.contrast, search.colorMode, search.lang, ...]);
}
```

### 5. Refactor ControlPanel.tsx

```diff
- import * as store from "./store";
+ import { useHue } from "@/hooks/useHue";
+ import { useContrast } from "@/hooks/useContrast";
+ import { useColorMode } from "@/hooks/useColorMode";
+ import { useInitializeStyle } from "@/hooks/useInitializeStyle";
+ import { PRESET_HUES, CONTRAST_VALUES, COLOR_MODE_VALUES, getAccentHue } from "@/hooks/styleUtils";

export default function ControlPanel() {
-  const isExpanded = store.useSelector(s => s.isExpanded);
-  const hue = store.useSelector(s => s.hue);
-  const contrast = store.useSelector(s => s.contrast);
-  const colorMode = store.useSelector(s => s.colorMode);
+  const [isExpanded, setIsExpanded] = useState(false);
+  const { hue, setHue } = useHue();
+  const { contrast, setContrast } = useContrast();
+  const { colorMode, setColorMode } = useColorMode();
+  const { locale, setLocale } = useLocale();

+  useInitializeStyle();

-  const closePanel = useCallback(() => store.setExpanded(false), []);
+  const closePanel = useCallback(() => setIsExpanded(false), []);

  // Handlers become one-liners:
-  const handleSelectHue = (newHue: number) => {
-    store.setHue(newHue);
-    router.navigate({ ... });
-  };
+  const handleSelectHue = (newHue: Hue) => setHue(newHue);
+  const handleSelectContrast = (newContrast: Contrast) => setContrast(newContrast);
+  const handleSelectColorMode = (newMode: ColorMode) => setColorMode(newMode);

-  onClick={store.toggleExpanded}
+  onClick={() => setIsExpanded(prev => !prev)}
}
```

### 6. Delete store.ts

Remove `src/components/ControlPanel/store.ts` after migration.

---

## File Changes Summary

| File                                           | Action                                     |
| ---------------------------------------------- | ------------------------------------------ |
| `src/i18n/useLocale.ts`                        | **REFACTOR** - object return               |
| `src/i18n/useTexts.ts`                         | **UPDATE** - destructure object            |
| `src/hooks/styleUtils.ts`                      | **CREATE** - utilities & constants         |
| `src/hooks/useHue.ts`                          | **CREATE** - hue hook                      |
| `src/hooks/useContrast.ts`                     | **CREATE** - contrast hook                 |
| `src/hooks/useColorMode.ts`                    | **CREATE** - color mode hook               |
| `src/hooks/useInitializeStyle.ts`              | **CREATE** - initialization                |
| `src/components/ControlPanel/ControlPanel.tsx` | **REFACTOR** - use hooks, local isExpanded |
| `src/components/ControlPanel/store.ts`         | **DELETE**                                 |

---

## Migration Steps

1. Refactor `useLocale` to object return
2. Update `useTexts` and `ControlPanel` for object destructuring
3. Create `src/hooks/styleUtils.ts`
4. Create `src/hooks/useHue.ts`
5. Create `src/hooks/useContrast.ts`
6. Create `src/hooks/useColorMode.ts`
7. Create `src/hooks/useInitializeStyle.ts`
8. Refactor `ControlPanel.tsx` to use new hooks
9. Delete `store.ts`
10. Run `npm run check`
11. Test all settings persist and sync correctly

---

## Benefits

- **Consistent pattern**: All settings use URL as source of truth
- **No TanStack Store**: Simpler dependency graph
- **Flexible API**: Object return allows grabbing only what you need
- **Extensible**: Can add more exports to hooks without breaking changes
- **Shareable URLs**: All preferences encoded in URL
