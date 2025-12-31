import { cloneElement, isValidElement } from "react";

import { cva, cx, type VariantProps } from "class-variance-authority";

const buttonVariants = cva("Button", {
  variants: {
    variant: {
      default: "",
      accent: "Button--accent"
    },
    size: {
      default: "",
      large: "Button--large"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});

type Props = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export default function Button({
  variant = "default",
  size,
  className,
  type = "button",
  asChild = false,
  children,
  ...props
}: Props) {
  const classes = cx(buttonVariants({ variant, size }), className);

  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      ...props,
      className: cx(classes, (children.props as { className?: string }).className)
    } as React.Attributes);
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
