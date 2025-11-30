import SpecCard from "../../components/SpecCard";
import SpecGrid from "../../components/SpecGrid";

const technologies = [
  { name: "React", url: "https://react.dev" },
  { name: "TypeScript", url: "https://www.typescriptlang.org" },
  { name: "GraphQL", url: "https://graphql.org" },
  { name: "Tailwind CSS", url: "https://tailwindcss.com" },
  { name: "TanStack Start", url: "https://tanstack.com/start" },
  { name: "TanStack Router", url: "https://tanstack.com/router" },
  { name: "TanStack Query", url: "https://tanstack.com/query" },
  { name: "TanStack Form", url: "https://tanstack.com/form" },
  { name: "ShadCN", url: "https://ui.shadcn.com" },
  { name: "SCSS", url: "https://sass-lang.com" },
  { name: "Node.js", url: "https://nodejs.org" },
  { name: "Electron", url: "https://www.electronjs.org" },
  { name: "Redux (Toolkit)", url: "https://redux-toolkit.js.org" }
];

export default function TechStack() {
  return (
    <SpecCard title="Tech Stack">
      <SpecGrid items={technologies} />
    </SpecCard>
  );
}
