import { useId } from "react";

interface BoxProps {
  x: number;
  y: number;
  width: number;
  height?: number;
  lines: string[];
  variant?: "action" | "knowledge" | "primary";
}

function Box({ x, y, width, height = 30, lines, variant = "action" }: BoxProps) {
  const lineHeight = 16;
  const firstBaseline = y + height / 2 - ((lines.length - 1) * lineHeight) / 2 + 4;

  return (
    <g className={`WebUiAgentFlow__node WebUiAgentFlow__node--${variant}`}>
      <rect
        className="WebUiAgentFlow__box"
        x={x}
        y={y}
        width={width}
        height={height}
      />
      {lines.map((line, index) => (
        <text
          key={line}
          className={index > 0 ? "WebUiAgentFlow__text--minor" : undefined}
          x={x + width / 2}
          y={firstBaseline + index * lineHeight}
          textAnchor="middle"
        >
          {line}
        </text>
      ))}
    </g>
  );
}

interface EdgeProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  marker: string;
  dashed?: boolean;
}

function Edge({ x1, y1, x2, y2, marker, dashed = false }: EdgeProps) {
  return (
    <line
      className={
        dashed
          ? "WebUiAgentFlow__edge WebUiAgentFlow__edge--dashed"
          : "WebUiAgentFlow__edge"
      }
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      markerEnd={`url(#${marker})`}
    />
  );
}

const actionColumns = [8, 128, 248];
const actions = [
  ["components", "ux", "setup"],
  ["audit", "update"]
];
const knowledgeColumns = [2, 124, 246];
const knowledge = [
  ["indexes", "components"],
  ["conventions", "ux setup audit"],
  ["user profile", "every skill"]
];

export default function WebUiAgentFlow() {
  const arrow = useId();

  return (
    <svg
      className="WebUiAgentFlow"
      viewBox="0 0 360 370"
      role="img"
      aria-label="A UI task triggers a hook that points the agent to the imf-web-ui router, which also answers from the packaged user guides. The router hands the task to a skill you run: components, ux, setup, audit or update. Those skills read knowledge: components reads the generated indexes, ux, setup and audit read the conventions, and every skill reads the user profile."
    >
      <defs>
        <marker
          id={arrow}
          viewBox="0 0 8 8"
          refX="7"
          refY="4"
          markerWidth="8"
          markerHeight="8"
          orient="auto"
        >
          <path className="WebUiAgentFlow__head" d="M0,0 L8,4 L0,8 z" />
        </marker>
      </defs>

      <g className="WebUiAgentFlow__legend">
        <rect className="WebUiAgentFlow__box" x={4} y={3} width={14} height={10} />
        <text x={24} y={12}>
          you run
        </text>
        <g className="WebUiAgentFlow__node--knowledge">
          <rect
            className="WebUiAgentFlow__box"
            x={104}
            y={3}
            width={14}
            height={10}
          />
        </g>
        <text x={124} y={12}>
          agent reads
        </text>
      </g>

      <Box x={180} y={28} width={120} lines={["UI task"]} />
      <Edge x1={240} y1={58} x2={240} y2={96} marker={arrow} />
      <text className="WebUiAgentFlow__text--minor" x={250} y={82}>
        hook
      </text>

      <Box
        x={8}
        y={98}
        width={112}
        height={46}
        lines={["guides", "user docs"]}
        variant="knowledge"
      />
      <Edge x1={120} y1={121} x2={158} y2={121} marker={arrow} dashed />
      <Box
        x={160}
        y={98}
        width={160}
        height={46}
        lines={["router", "imf-web-ui"]}
        variant="primary"
      />
      <Edge x1={240} y1={144} x2={240} y2={178} marker={arrow} />

      <rect
        className="WebUiAgentFlow__group"
        x={2}
        y={180}
        width={356}
        height={104}
      />
      <text className="WebUiAgentFlow__text--minor" x={12} y={196}>
        skills
      </text>
      {actions.map((row, rowIndex) =>
        row.map((skill, columnIndex) => (
          <Box
            key={skill}
            x={actionColumns[columnIndex]}
            y={204 + rowIndex * 40}
            width={104}
            lines={[skill]}
          />
        ))
      )}

      {knowledge.map((lines, index) => {
        const center = knowledgeColumns[index] + 56;
        return (
          <g key={lines[0]}>
            <Edge x1={center} y1={322} x2={center} y2={288} marker={arrow} dashed />
            <Box
              x={knowledgeColumns[index]}
              y={322}
              width={112}
              height={46}
              lines={lines}
              variant="knowledge"
            />
          </g>
        );
      })}
    </svg>
  );
}
