import type { Meta, StoryObj } from "@storybook/react-vite";

import DataTable, { type DataTableColumn } from "@/components/DataTable";

interface Job {
  period: string;
  company: string;
  notes: string;
}

const columns: DataTableColumn<Job>[] = [
  { key: "period", header: "Period", cell: job => job.period, nowrap: true },
  { key: "company", header: "Company", cell: job => job.company },
  { key: "notes", header: "Notes", cell: job => job.notes, hideOnNarrow: true }
];

const meta: Meta<typeof DataTable<Job>> = {
  component: DataTable
};

export default meta;
type Story = StoryObj<typeof DataTable<Job>>;

export const Default: Story = {
  args: {
    caption: "Work history",
    columns,
    getRowKey: job => job.company,
    rows: [
      {
        period: "2020-03 2020-09",
        company: "diva-e",
        notes: "E-commerce platform."
      },
      { period: "2019-12 2020-02", company: "Campudus", notes: "An ordering app." }
    ]
  }
};

export const Placeholder: Story = {
  args: {
    caption: "Log",
    columns,
    getRowKey: job => job.company,
    rows: [],
    placeholder: "Loading"
  }
};
