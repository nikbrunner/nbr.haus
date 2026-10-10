type Props = Omit<
  React.ComponentProps<"button">,
  "type" | "className" | "aria-pressed"
> & {
  pressed?: boolean;
};

export default function ControlButton({ pressed, ...props }: Props) {
  return (
    <button
      {...props}
      type="button"
      aria-pressed={pressed}
      className={pressed ? "ControlButton ControlButton--pressed" : "ControlButton"}
    />
  );
}
