import Link from "../../components/Link";

export default function DevTools() {
  return (
    <>
      <p>
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
      <ul>
        <li>
          <Link
            href="https://github.com/nikbrunner/dots/tree/main/common/.config/nvim"
            target="_blank"
            rel="noopener noreferrer"
          >
            Neovim
          </Link>{" "}
          (Primary editor)
        </li>
        <li>
          <Link href="https://zed.dev" target="_blank" rel="noopener noreferrer">
            Zed
          </Link>{" "}
          (Secondary editor)
        </li>
        <li>
          <Link href="https://ghostty.dev" target="_blank" rel="noopener noreferrer">
            Ghostty
          </Link>{" "}
          (Terminal)
        </li>
        <li>
          <Link
            href="https://github.com/tmux/tmux/wiki"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tmux
          </Link>{" "}
          (Terminal multiplexer)
        </li>
        <li>
          <Link
            href="https://github.com/jesseduffield/lazygit"
            target="_blank"
            rel="noopener noreferrer"
          >
            LazyGit
          </Link>{" "}
          (Git GUI)
        </li>
        <li>
          <Link
            href="https://claude.com/product/claude-code"
            target="_blank"
            rel="noopener noreferrer"
          >
            Claude Code
          </Link>{" "}
          (AI assistant)
        </li>
        <li>
          <Link
            href="https://1password.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            1Password
          </Link>{" "}
          (Password & Secrets manager)
        </li>
      </ul>
    </>
  );
}
