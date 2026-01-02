import { createFileRoute, Outlet } from "@tanstack/react-router";

import "@/routes/study/route.css";

export const Route = createFileRoute("/study")({
  component: StudyLayout
});

function StudyLayout() {
  return (
    <div className="StudyLayout">
      <Outlet />
    </div>
  );
}
