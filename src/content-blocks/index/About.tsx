import Highlight from '../../components/Highlight'

export default function About() {
  const experienceInYears = new Date().getFullYear() - 2020

  return (
    <>
      <p>
        I'm <Highlight>Nik Brunner</Highlight>, a Software Engineer with {experienceInYears} years of
        experience building frontend architectures and design systems. Currently seeking new opportunities starting
        February 2026.
      </p>
      <p>Born in 1984, based in Landshut, Germany. Outside of code, I enjoy hiking, running, and photography.</p>
    </>
  )
}
