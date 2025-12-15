import { createFileRoute } from "@tanstack/react-router";

import Section from "../components/Section";
import About from "../content-blocks/index/About";
import Connect from "../content-blocks/index/Connect";
import DevStack from "../content-blocks/index/DevStack";
import Jobs from "../content-blocks/index/Jobs";
import ProfilePicture from "../content-blocks/index/ProfilePicture";
import Projects from "../content-blocks/index/Projects";

export const Route = createFileRoute("/")({
  component: IndexPage
});

function IndexPage() {
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
          <Section title="About">
            <About />
          </Section>
          <Section title="Employment">
            <Jobs />
          </Section>
          <Section title="Dev Stack">
            <DevStack />
          </Section>
          <Section title="Projects">
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
          <Section title="About">
            <About />
          </Section>
          <Section title="Dev Stack">
            <DevStack />
          </Section>
        </div>

        <div className="Index__column">
          <Section title="Employment">
            <Jobs />
          </Section>
          <Section title="Projects">
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
          <Section title="About">
            <About />
          </Section>
          <Section title="Dev Stack">
            <DevStack />
          </Section>
        </div>

        <div className="Index__column">
          <Section title="Employment">
            <Jobs />
          </Section>
        </div>

        <div className="Index__column">
          <Section title="Projects">
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
          <Section title="About">
            <About />
          </Section>
        </div>

        <div className="Index__column">
          <Section title="Dev Stack">
            <DevStack />
          </Section>
        </div>

        <div className="Index__column">
          <Section title="Employment">
            <Jobs />
          </Section>
        </div>

        <div className="Index__column">
          <Section title="Projects">
            <Projects />
          </Section>
        </div>
      </div>
    </>
  );
}
