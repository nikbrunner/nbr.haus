import Highlight from "@/components/Highlight";
import Hr from "@/components/Hr";

export default function About() {
  const experienceInYears = new Date().getFullYear() - 2020;

  return (
    <>
      <p>
        I'm <Highlight>Nik Brunner</Highlight>, a Software Engineer with{" "}
        {experienceInYears} years of experience building frontend architectures
        and design systems.
      </p>

      <p>
        I work closely with designers and have a strong sense for UX (user
        experience) and DX (developer experience). I'm also comfortable working
        independently and making design decisions when needed.
      </p>

      <Hr />

      <p>
        <Highlight>
          Currently seeking new opportunities starting February 2026.
        </Highlight>
      </p>

      <Hr />

      <p>
        Born in 1984, based in Landshut, Germany. Outside of code, I enjoy
        hiking, running, and photography.
      </p>
    </>
  );
}
