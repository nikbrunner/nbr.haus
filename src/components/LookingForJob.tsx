import GlitchEffect from "@/components/GlitchEffect";

interface Props {
  title: string;
}

export default function LookingForJob({ title }: Props) {
  return (
    <div className="LookingForJob">
      <GlitchEffect intensity="medium" scanlines>
        <h1>{title}</h1>
      </GlitchEffect>
    </div>
  );
}
