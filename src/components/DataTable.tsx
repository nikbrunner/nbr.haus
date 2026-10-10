export interface DataTableColumn<Row> {
  key: string;
  header: string;
  cell: (row: Row) => React.ReactNode;
  nowrap?: boolean;
  /** Keeps the cell on one line and cuts it with an ellipsis on wide screens */
  truncate?: boolean;
  muted?: boolean;
  hideOnNarrow?: boolean;
  /** On narrow screens rows stack; this cell takes a line of its own */
  ownLineOnNarrow?: boolean;
}

interface Props<Row> {
  caption: string;
  columns: DataTableColumn<Row>[];
  rows: Row[];
  getRowKey: (row: Row) => string;
  placeholder?: React.ReactNode;
}

export default function DataTable<Row>({
  caption,
  columns,
  rows,
  getRowKey,
  placeholder
}: Props<Row>) {
  return (
    <table className="DataTable">
      <caption className="DataTable__caption">{caption}</caption>
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column.key} scope="col" className={getCellClassName(column)}>
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 && placeholder ? (
          <tr>
            <td className="DataTable__placeholder" colSpan={columns.length}>
              {placeholder}
            </td>
          </tr>
        ) : (
          rows.map(row => (
            <tr key={getRowKey(row)}>
              {columns.map(column => (
                <td key={column.key} className={getCellClassName(column)}>
                  {column.cell(row)}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

function getCellClassName<Row>(column: DataTableColumn<Row>): string {
  return [
    "DataTable__cell",
    column.nowrap && "DataTable__cell--nowrap",
    column.truncate && "DataTable__cell--truncate",
    column.muted && "DataTable__cell--muted",
    column.hideOnNarrow && "DataTable__cell--wide-only",
    column.ownLineOnNarrow && "DataTable__cell--own-line"
  ]
    .filter(Boolean)
    .join(" ");
}
