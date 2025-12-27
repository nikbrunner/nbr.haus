import { cva, cx, type VariantProps } from "class-variance-authority";

const badgeVariants = cva("Badge", {
  variants: {
    variant: {
      default: "Badge--default",
      primary: "Badge--primary"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

interface Props
  extends React.ComponentProps<"a">,
    VariantProps<typeof badgeVariants> {}

export default function Badge({ variant, className, ...props }: Props) {
  return <a className={cx(badgeVariants({ variant }), className)} {...props} />;
}
