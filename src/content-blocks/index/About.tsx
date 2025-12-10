import Highlight from "@/components/Highlight";

import styles from "./About.module.css";

export default function About() {
  const experienceInYears = new Date().getFullYear() - 2020;

  return (
    <div className={styles.about}>
      <p>
        Hi, there!
        <br />
        <br />
        I'm <Highlight>Nik Brunner</Highlight>, a Software Engineer with{" "}
        {experienceInYears} years of experience building frontend architectures and
        design systems.
      </p>

      <p>
        I work closely with designers and have a strong sense for UX (user
        experience) and DX (developer experience). I'm also comfortable working
        independently and making design decisions when needed.
      </p>

      <p>
        I identify what needs doing, prioritize my own work, and know when to reach
        out for input. But I also love being part of a good team working towards a
        shared goal.
      </p>

      <p>
        I am very passionate about building and using products, and am probably the
        guy that will contact support about features or bugs, and regularly check its
        change logs and GitHub releases.
      </p>

      <p>
        I was born in 1984 in Landshut, Germany where I am currently still living.
        Outside of code, I enjoy hiking, reading, music and photography, and I'm also
        a little crazy about keyboards.
      </p>

      <div className={styles.lookingFor}>
        <h1>I am currently seeking new opportunities starting February 2026.</h1>
      </div>
    </div>
  );
}
