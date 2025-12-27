-- Project-specific Neovim configuration
-- Requires `vim.o.exrc = true` in your Neovim config
-- Run `:trust` while inside this file to allow execution

vim.lsp.config("vtsls", {
  settings = {
    typescript = {
      preferences = {
        importModuleSpecifier = "non-relative",
      },
    },
    javascript = {
      preferences = {
        importModuleSpecifier = "non-relative",
      },
    },
  },
})
