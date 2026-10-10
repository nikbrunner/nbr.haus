import DocumentHeader from "@/components/DocumentHeader";
import Masthead from "@/components/Masthead";
import { SiteControls } from "@/partials/SiteControls";
import { SiteIndex } from "@/partials/SiteIndex";

interface Props {
  meta?: [string, string];
  title: string[];
}

export function SiteHeader({ meta, title }: Props) {
  return (
    <Masthead
      start={
        <>
          <DocumentHeader meta={meta} title={title} />
          <SiteControls />
        </>
      }
      end={<SiteIndex />}
    />
  );
}
