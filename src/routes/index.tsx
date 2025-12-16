import { createFileRoute } from "@tanstack/react-router";

import Section from "../components/Section";
import About from "../content-blocks/index/About";
import Connect from "../content-blocks/index/Connect";
import DevStack from "../content-blocks/index/DevStack";
import Jobs from "../content-blocks/index/Jobs";
import ProfilePicture from "../content-blocks/index/ProfilePicture";
import Projects from "../content-blocks/index/Projects";
import { useTranslation } from "@/i18n";

export const Route = createFileRoute("/")({
  component: IndexPage
});

function IndexPage() {
  const { t } = useTranslation();

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
          <Section title={t.common.sections.about}>
            <About />
          </Section>
          <Section title={t.common.sections.employment}>
            <Jobs />
          </Section>
          <Section title={t.common.sections.devStack}>
            <DevStack />
          </Section>
          <Section title={t.common.sections.projects}>
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
          <Section title={t.common.sections.about}>
            <About />
          </Section>
          <Section title={t.common.sections.devStack}>
            <DevStack />
          </Section>
        </div>

        <div className="Index__column">
          <Section title={t.common.sections.employment}>
            <Jobs />
          </Section>
          <Section title={t.common.sections.projects}>
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
          <Section title={t.common.sections.about}>
            <About />
          </Section>
          <Section title={t.common.sections.devStack}>
            <DevStack />
          </Section>
        </div>

        <div className="Index__column">
          <Section title={t.common.sections.employment}>
            <Jobs />
          </Section>
        </div>

        <div className="Index__column">
          <Section title={t.common.sections.projects}>
            <Projects />
          </Section>
        </div>
      </div>

      <div className="Index__layout Index__layout--four-columns">
        <div className="Index__column">
          <Section>
            <ProfilePicture />
          </Section>
          <Section>
            <Connect />
          </Section>
          <Section title={t.common.sections.about}>
            <About />
          </Section>
        </div>

        <div className="Index__column">
          <Section title={t.common.sections.devStack}>
            <DevStack />
          </Section>
        </div>

        <div className="Index__column">
          <Section title={t.common.sections.employment}>
            <Jobs />
          </Section>
        </div>

        <div className="Index__column">
          <Section title={t.common.sections.projects}>
            <Projects />
          </Section>
        </div>
      </div>
    </>
  );
}
