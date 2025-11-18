import Highlight from "@/components/Highlight";
import Hr from "@/components/Hr";

import styles from "./About.module.css";

export default function About() {
  const experienceInYears = new Date().getFullYear() - 2020;

  return (
    <div className={styles.about}>
      <p>
        I'm <Highlight>Nik Brunner</Highlight>, a Software Engineer with{" "}
        {experienceInYears} years of experience building frontend architectures and
        design systems.
      </p>

      <p>
        I work closely with designers and have a strong sense for UX (user
        experience) and DX (developer experience). I'm also comfortable working
        independently and making design decisions when needed.
      </p>

      <Hr />

      <div className={styles.lookingFor}>
        <h1>Currently seeking new opportunities starting February 2026.</h1>
      </div>

      <Hr />

      <p>
        Born in 1984, based in Landshut, Germany. Outside of code, I enjoy hiking,
        running, and photography.
      </p>
    </div>
  );
}
