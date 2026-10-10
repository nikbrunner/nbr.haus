import { createPortal } from "react-dom";

interface KeyHint {
  /** One entry per binding; a sequence like "g g" is one entry */
  keys: string[];
  label: string;
}

export interface KeyHintGroup {
  title: string;
  hints: KeyHint[];
}

interface Props {
  groups: KeyHintGroup[];
}

/** A which-key panel: the keys available next, or every binding */
export default function KeyHints({ groups }: Props) {
  // Rendered into the body: fixed inside the sheet, its mask would clip the panel
  return createPortal(
    <aside className="KeyHints" aria-label="Keyboard shortcuts">
      {groups.map(group => (
        <section key={group.title} className="KeyHints__group">
          <p className="KeyHints__title">{group.title}</p>
          <dl className="KeyHints__list">
            {group.hints.map(hint => (
              <div key={hint.keys.join()} className="KeyHints__hint">
                <dt className="KeyHints__keys">
                  {hint.keys.map(binding => (
                    <kbd key={binding} className="KeyHints__key">
                      {binding}
                    </kbd>
                  ))}
                </dt>
                <dd className="KeyHints__label">{hint.label}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </aside>,
    document.body
  );
}
