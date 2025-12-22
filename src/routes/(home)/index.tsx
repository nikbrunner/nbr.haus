import { createFileRoute } from "@tanstack/react-router";

import Section from "@/components/Section";
import About from "@/content-blocks/About/About";
import Connect from "@/content-blocks/Connect/Connect";
import Jobs from "@/content-blocks/Jobs/Jobs";
import ProfilePicture from "@/content-blocks/index/ProfilePicture";
import Projects from "@/content-blocks/Projects/Projects";
import { useSharedTexts } from "@/i18n";

export const Route = createFileRoute("/(home)/")({
  component: IndexPage
});

function IndexPage() {
  const shared = useSharedTexts();

  return (
    <>
      <div className="Index__layout Index__layout--one-column">
        <div className="Index__column">
          <Section>
            <ProfilePicture />
          </Section>

          <Section>
            <Connect />
          </Section>

          <Section title={shared.sections.about}>
            <About />
          </Section>

          <Section title={shared.sections.employment}>
            <Jobs />
          </Section>

          <Section title={shared.sections.projects}>
            <Projects />
          </Section>
        </div>
      </div>

      <div className="Index__layout Index__layout--two-columns">
        <div className="Index__column">
          <Section>
            <ProfilePicture />
          </Section>

          <Section>
            <Connect />
          </Section>

          <Section title={shared.sections.about}>
            <About />
          </Section>
        </div>

        <div className="Index__column">
          <Section title={shared.sections.employment}>
            <Jobs />
          </Section>

          <Section title={shared.sections.projects}>
            <Projects />
          </Section>
        </div>
      </div>

      <div className="Index__layout Index__layout--three-columns">
        <div className="Index__column">
          <Section>
            <ProfilePicture />
          </Section>

          <Section>
            <Connect />
          </Section>

          <Section title={shared.sections.about}>
            <About />
          </Section>
        </div>

        <div className="Index__column">
          <Section title={shared.sections.employment}>
            <Jobs />
          </Section>
        </div>

        <div className="Index__column">
          <Section title={shared.sections.projects}>
            <Projects />
          </Section>
        </div>
      </div>
    </>
  );
}
