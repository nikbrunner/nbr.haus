import { createFileRoute } from '@tanstack/react-router'

import Section from '../components/Section'
import About from '../content/index/About'
import AI from '../content/index/AI'
import Connect from '../content/index/Connect'
import DevTools from '../content/index/DevTools'
import Jobs from '../content/index/Jobs'
import ProfilePicture from '../content/index/ProfilePicture'
import Projects from '../content/index/Projects'
import TechStack from '../content/index/TechStack'

import styles from './index.module.css'

export const Route = createFileRoute('/')({
  component: IndexPage,
})

function IndexPage() {
  return (
    <>
      <div className={`${styles.layout} ${styles.layoutOneColumn}`}>
        <div className={styles.column}>
          <Section>
            <ProfilePicture />
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
          <Section title="Tech Stack">
            <TechStack />
          </Section>
          <Section title="Dev Tools">
            <DevTools />
          </Section>
          <Section title="AI">
            <AI />
          </Section>
          <Section title="Connect">
            <Connect />
          </Section>
        </div>
      </div>

      <div className={`${styles.layout} ${styles.layoutTwoColumns}`}>
        <div className={styles.column}>
          <Section>
            <ProfilePicture />
          </Section>
          <Section title="About">
            <About />
          </Section>
          <Section title="Tech Stack">
            <TechStack />
          </Section>
          <Section title="Dev Tools">
            <DevTools />
          </Section>
          <Section title="AI">
            <AI />
          </Section>
          <Section title="Connect">
            <Connect />
          </Section>
        </div>

        <div className={styles.column}>
          <Section title="Projects">
            <Projects />
          </Section>
          <Section title="Employment">
            <Jobs />
          </Section>
        </div>
      </div>

      <div className={`${styles.layout} ${styles.layoutThreeColumns}`}>
        <div className={styles.column}>
          <Section>
            <ProfilePicture />
          </Section>
          <Section title="About">
            <About />
          </Section>
          <Section title="Connect">
            <Connect />
          </Section>
          <Section title="Tech Stack">
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
          <Section title="Work">
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
          </Section>
          <Section title="About">
            <About />
          </Section>
          <Section title="Connect">
            <Connect />
          </Section>
        </div>

        <div className={styles.column}>
          <Section title="Tech Stack">
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
          <Section title="Work">
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
  )
}
