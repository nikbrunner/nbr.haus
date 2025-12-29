import { Copy } from "lucide-react";

interface Props {
  /** The text to copy to clipboard */
  value: string;
  /** Accessible label for the button */
  ariaLabel: string;
  /** Size of the button
   *
   * @default 14
   */
  size?: number;
}

export default function CopyButton({ value, ariaLabel, size = 14 }: Props) {
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
  };

  return (
    <button
      type="button"
      className="CopyButton"
      onClick={handleCopy}
      aria-label={ariaLabel}
    >
      <Copy size={size} />
    </button>
  );
}
