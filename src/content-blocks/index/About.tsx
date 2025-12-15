import Highlight from "@/components/Highlight";

export default function About() {
  const experienceInYears = new Date().getFullYear() - 2020;

  return (
    <div className="About">
      <p>
        Hi there!
        <br />
        <br />
        I'm <Highlight>Nikolaus Brunner</Highlight> (Nik for short), a Software
        Engineer based in Landshut, Germany, specializing in frontend architectures
        and design systems — {experienceInYears} years in.
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
        guy who will contact support about features or bugs, and regularly check its
        changelogs and GitHub releases. I integrate AI tooling into my daily
        development workflows.
      </p>

      <p>
        I was born in 1984, and outside of code, I enjoy hiking, reading, landscape
        photography, music production, workflow optimization, and open source — and I
        have a slight keyboard obsession.
      </p>

      <div className="About__looking-for">
        <h1>I am currently seeking new opportunities starting February 2026.</h1>
      </div>
    </div>
  );
}
