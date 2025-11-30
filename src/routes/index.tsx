import { createFileRoute } from "@tanstack/react-router";

import Section from "../components/Section";
import About from "../content-blocks/index/About";
import AI from "../content-blocks/index/AI";
import Connect from "../content-blocks/index/Connect";
import DevTools from "../content-blocks/index/DevTools";
import Jobs from "../content-blocks/index/Jobs";
import ProfilePicture from "../content-blocks/index/ProfilePicture";
import Projects from "../content-blocks/index/Projects";
import TechStack from "../content-blocks/index/TechStack";

import styles from "./index.module.css";

export const Route = createFileRoute("/")({
  component: IndexPage
});

function IndexPage() {
  return (
    <>
      <div className={`${styles.layout} ${styles.layoutOneColumn}`}>
        <div className={styles.column}>
          <Section>
            <ProfilePicture />
            <Connect />
          </Section>
          <Section title="About">
            <About />
          </Section>
          <Section title="Employment">
            <Jobs />
          </Section>
          <Section title="Projects">
            <Projects />
          </Section>
          <Section>
            <TechStack />
          </Section>
          <Section title="Dev Tools">
            <DevTools />
          </Section>
          <Section title="AI">
            <AI />
          </Section>
        </div>
      </div>

      <div className={`${styles.layout} ${styles.layoutTwoColumns}`}>
        <div className={styles.column}>
          <Section>
            <ProfilePicture />
            <Connect />
          </Section>
          <Section title="About">
            <About />
          </Section>
          <Section>
            <TechStack />
          </Section>
          <Section title="Dev Tools">
            <DevTools />
          </Section>
          <Section title="AI">
            <AI />
          </Section>
        </div>

        <div className={styles.column}>
          <Section title="Employment">
            <Jobs />
          </Section>
          <Section title="Projects">
            <Projects />
          </Section>
        </div>
      </div>

      <div className={`${styles.layout} ${styles.layoutThreeColumns}`}>
        <div className={styles.column}>
          <Section>
            <ProfilePicture />
            <Connect />
          </Section>
          <Section title="About">
            <About />
          </Section>
          <Section>
            <TechStack />
          </Section>
          <Section title="Dev Tools">
            <DevTools />
          </Section>
          <Section title="AI">
            <AI />
          </Section>
        </div>

        <div className={styles.column}>
          <Section title="Employment">
            <Jobs />
          </Section>
        </div>

        <div className={styles.column}>
          <Section title="Projects">
            <Projects />
          </Section>
        </div>
      </div>

      <div className={`${styles.layout} ${styles.layoutFourColumns}`}>
        <div className={styles.column}>
          <Section>
            <ProfilePicture />
            <Connect />
          </Section>
          <Section title="About">
            <About />
          </Section>
        </div>

        <div className={styles.column}>
          <Section>
            <TechStack />
          </Section>
          <Section title="Dev Tools">
            <DevTools />
          </Section>
          <Section title="AI">
            <AI />
          </Section>
        </div>

        <div className={styles.column}>
          <Section title="Employment">
            <Jobs />
          </Section>
        </div>

        <div className={styles.column}>
          <Section title="Projects">
            <Projects />
          </Section>
        </div>
      </div>
    </>
  );
}
