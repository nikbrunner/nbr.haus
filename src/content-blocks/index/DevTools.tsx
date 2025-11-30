import Link from "../../components/Link";
import SpecCard from "../../components/SpecCard";
import SpecList from "../../components/SpecList";

export default function DevTools() {
  return (
    <SpecCard title="Dev Tools">
      <SpecList items={items} />
      <p
        style={{
          padding: "var(--size-2)",
          backgroundColor: "var(--bg-main)",
          margin: 0
        }}
      >
        I am very passionate about workflow. You can check my{" "}
        <Link
          href="https://github.com/nikbrunner/dots"
          target="_blank"
          rel="noopener noreferrer"
        >
          dotfiles here
        </Link>
        .
      </p>
    </SpecCard>
  );
}

const items: Array<{
  label: string;
  value: React.ReactNode;
}> = [
  {
    label: "Primary editor:",
    value: (
      <Link
        href="https://github.com/nikbrunner/dots/tree/main/common/.config/nvim"
        target="_blank"
        rel="noopener noreferrer"
      >
        Neovim
      </Link>
    )
  },
  {
    label: "Secondary editor:",
    value: (
      <Link href="https://zed.dev" target="_blank" rel="noopener noreferrer">
        Zed
      </Link>
    )
  },
  {
    label: "Terminal:",
    value: (
      <Link href="https://ghostty.dev" target="_blank" rel="noopener noreferrer">
        Ghostty
      </Link>
    )
  },
  {
    label: "Terminal multiplexer:",
    value: (
      <Link
        href="https://github.com/tmux/tmux/wiki"
        target="_blank"
        rel="noopener noreferrer"
      >
        Tmux
      </Link>
    )
  },
  {
    label: "Git GUI:",
    value: (
      <Link
        href="https://github.com/jesseduffield/lazygit"
        target="_blank"
        rel="noopener noreferrer"
      >
        LazyGit
      </Link>
    )
  },
  {
    label: "AI assistant:",
    value: (
      <Link
        href="https://claude.com/product/claude-code"
        target="_blank"
        rel="noopener noreferrer"
      >
        Claude Code
      </Link>
    )
  },
  {
    label: "Password & Secrets manager:",
    value: (
      <Link href="https://1password.com" target="_blank" rel="noopener noreferrer">
        1Password
      </Link>
    )
  }
];
