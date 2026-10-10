import Colophon from "@/components/Colophon";
import Prose from "@/components/Prose";
import SpecSection from "@/components/SpecSection";
import { SiteHeader } from "@/partials/SiteHeader";

export function NotFound() {
  return (
    <>
      <SiteHeader meta={["Error", "404"]} title={["Not found"]} />
      <SpecSection number="01" title="Not found">
        <Prose>
          <p>You are naughty. What are you doing here?</p>
        </Prose>
      </SpecSection>
      <Colophon start="nbr.haus" center="Design via function" end="Page 1 / 1" />
    </>
  );
}
