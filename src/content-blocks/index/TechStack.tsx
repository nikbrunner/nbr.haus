import Link from "../../components/Link";
import styles from "./TechStack.module.css";

const technologies = [
  {
    name: "React",
    url: "https://react.dev",
    color: "oklch(77.5% 0.1485 227.4)",
  },
  {
    name: "TypeScript",
    url: "https://www.typescriptlang.org",
    color: "oklch(51.5% 0.2259 261.2)",
  },
  {
    name: "GraphQL",
    url: "https://graphql.org",
    color: "oklch(59.8% 0.2487 350.8)",
  },
  {
    name: "Tailwind CSS",
    url: "https://tailwindcss.com",
    color: "oklch(82.5% 0.1451 214.1)",
  },
  {
    name: "TanStack Start",
    url: "https://tanstack.com/start",
    color: "oklch(63.1% 0.2544 28.8)",
  },
  {
    name: "TanStack Router",
    url: "https://tanstack.com/router",
    color: "oklch(63.1% 0.2544 28.8)",
  },
  {
    name: "TanStack Query",
    url: "https://tanstack.com/query",
    color: "oklch(63.1% 0.2544 28.8)",
  },
  {
    name: "TanStack Form",
    url: "https://tanstack.com/form",
    color: "oklch(63.1% 0.2544 28.8)",
  },
  { name: "ShadCN", url: "https://ui.shadcn.com", color: "oklch(0% 0 0)" },
  {
    name: "SCSS",
    url: "https://sass-lang.com",
    color: "oklch(67% 0.2462 356.4)",
  },
  {
    name: "Node.js",
    url: "https://nodejs.org",
    color: "oklch(73.2% 0.2492 142.5)",
  },
  {
    name: "Electron",
    url: "https://www.electronjs.org",
    color: "oklch(56.9% 0.0367 220.3)",
  },
  {
    name: "Redux (Toolkit)",
    url: "https://redux-toolkit.js.org",
    color: "oklch(47.7% 0.156 305)",
  },
];

export default function TechStack() {
  return (
    <>
      <p>These are the technologies I'm familiar with and regularly use.</p>
      <ul className={styles.techGrid}>
        {technologies.map((tech) => (
          <li key={tech.name}>
            <Link
              href={tech.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ "--tech-color": tech.color } as React.CSSProperties}
            >
              {tech.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
