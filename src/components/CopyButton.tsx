import { Copy } from "lucide-react";

interface Props {
  /** The text to copy to clipboard */
  value: string;
  /** Tooltip text shown on hover */
  tooltip: string;
}

export default function CopyButton({ value, tooltip }: Props) {
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
  };

  return (
    <button
      type="button"
      className="CopyButton"
      onClick={handleCopy}
      data-tooltip={tooltip}
      aria-label={tooltip}
    >
      <Copy size={14} />
    </button>
  );
}
