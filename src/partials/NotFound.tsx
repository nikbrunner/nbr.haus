import Colophon from "@/components/Colophon";
import Prose from "@/components/Prose";
import SpecSection from "@/components/SpecSection";
import { SiteHeader } from "@/partials/SiteHeader";

interface Props {
  title?: string;
  message?: React.ReactNode;
}

export function NotFound({
  title = "Not found",
  message = "You are naughty. What are you doing here?"
}: Props) {
  return (
    <>
      <SiteHeader meta={["Error", "404"]} title={[title]} />
      <SpecSection number="01" title={title}>
        <Prose>
          <p>{message}</p>
        </Prose>
      </SpecSection>
      <Colophon start="nbr.haus" center="Design via function" end="Page 1 / 1" />
    </>
  );
}
