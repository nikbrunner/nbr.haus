import type { Meta, StoryObj } from "@storybook/react-vite";

import Button from "@/components/Button";

import "@/routes/cover/login.css";

interface CoverLoginFormProps {
  onSubmit?: (password: string) => void;
  isLoading?: boolean;
  error?: boolean;
}

function CoverLoginForm({
  onSubmit,
  isLoading = false,
  error = false
}: CoverLoginFormProps) {
  return (
    <div className="CoverLogin">
      <form
        className="CoverLogin__form"
        onSubmit={e => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          onSubmit?.(formData.get("password") as string);
        }}
      >
        <h1 className="CoverLogin__title">Cover Letters</h1>
        <p className="CoverLogin__description">This area is password protected.</p>

        <input
          className="CoverLogin__input"
          type="password"
          name="password"
          placeholder="Password"
          autoFocus
          disabled={isLoading}
        />

        <Button type="submit" variant="accent" disabled={isLoading}>
          {isLoading ? "Verifying..." : "Enter"}
        </Button>

        {error && <p className="CoverLogin__error">Invalid password. Try again.</p>}
      </form>
    </div>
  );
}

const meta: Meta<typeof CoverLoginForm> = {
  title: "Routes/CoverLogin",
  component: CoverLoginForm,
  parameters: {
    layout: "fullscreen"
  }
};

export default meta;
type Story = StoryObj<typeof CoverLoginForm>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    isLoading: true
  }
};

export const WithError: Story = {
  args: {
    error: true
  }
};
