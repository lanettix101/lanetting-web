import type { Bilingual, WorkflowEdge, WorkflowNode, WorkflowSpec } from '../../data/portfolioData';

const NODE_W = 186;
const H_GAP = 72;
const V_GAP = 34;
const PAD = 16;
const MIN_NODE_H = 48;
const NODE_PAD_Y = 10;
const LABEL_SIZE = 12;
const DETAIL_SIZE = 10;
const LABEL_LINE = 16;
const DETAIL_LINE = 14;
const LABEL_CHARS = 22;
const DETAIL_CHARS = 28;
const TAPER = 18;
const DECISION_WIDTH_FACTOR = 0.68;
const MIN_RENDER_W = 520;
const MAX_RENDER_SCALE = 1.2;
const MAX_DETAIL_LINES = 4;
const ARROW = 7;
const ARROW_SPREAD = 4.5;
const LABEL_NUDGE = 7;

type ArrowDir = 'right' | 'left' | 'down' | 'up';

function arrowPoints(x: number, y: number, dir: ArrowDir): string {
  if (dir === 'right') return `${x},${y} ${x - ARROW},${y - ARROW_SPREAD} ${x - ARROW},${y + ARROW_SPREAD}`;
  if (dir === 'left') return `${x},${y} ${x + ARROW},${y - ARROW_SPREAD} ${x + ARROW},${y + ARROW_SPREAD}`;
  if (dir === 'up') return `${x},${y} ${x - ARROW_SPREAD},${y + ARROW} ${x + ARROW_SPREAD},${y + ARROW}`;
  return `${x},${y} ${x - ARROW_SPREAD},${y - ARROW} ${x + ARROW_SPREAD},${y - ARROW}`;
}

const TONE_CLASS = {
  neutral: 'stroke-brand-border',
  positive: 'stroke-brand-primary',
  muted: 'stroke-brand-accent',
} as const;

const HEAD_FILL = {
  neutral: 'fill-brand-border',
  positive: 'fill-brand-primary',
  muted: 'fill-brand-accent',
} as const;

function localize(value: Bilingual, language: 'es' | 'en'): string {
  return value[language] || value.en;
}

function wrapText(text: string, maxChars: number): string[] {
  const lines: string[] = [];
  let current = '';
  for (const word of text.split(/\s+/).filter(Boolean)) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxChars) {
      current = candidate;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function charBudget(base: number, node: WorkflowNode): number {
  return Math.max(8, Math.round(node.kind === 'decision' ? base * DECISION_WIDTH_FACTOR : base));
}

function maxLines(value: Bilingual, maxChars: number, cap: number): number {
  return Math.min(
    cap,
    Math.max(wrapText(value.en, maxChars).length, wrapText(value.es, maxChars).length),
  );
}

interface Measurement {
  h: number;
  labelLines: number;
  detailLines: number;
  labelChars: number;
  detailChars: number;
}

function measureNode(node: WorkflowNode): Measurement {
  const labelChars = charBudget(LABEL_CHARS, node);
  const detailChars = charBudget(DETAIL_CHARS, node);
  const labelLines = maxLines(node.label, labelChars, 4);
  const detailLines = node.detail ? maxLines(node.detail, detailChars, MAX_DETAIL_LINES) : 0;
  const contentH = labelLines * LABEL_LINE + (detailLines ? detailLines * DETAIL_LINE + 4 : 0);
  return { h: Math.max(MIN_NODE_H, contentH + NODE_PAD_Y * 2), labelLines, detailLines, labelChars, detailChars };
}

interface Box {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  node: WorkflowNode;
}

function layout(nodes: WorkflowNode[]): { boxes: Box[]; vbW: number; vbH: number } {
  const measured = new Map(nodes.map((n) => [n.id, measureNode(n)]));

  const cols = Math.max(...nodes.map((n) => n.col));
  const maxRow = Math.max(...nodes.map((n) => n.row));
  const rows = Array.from({ length: maxRow }, (_, i) => i + 1);

  const rowHeights = rows.map((r) =>
    Math.max(...nodes.filter((n) => n.row === r).map((n) => measured.get(n.id)!.h)),
  );

  const rowTops: number[] = [];
  let cursor = PAD;
  for (const rh of rowHeights) {
    rowTops.push(cursor);
    cursor += rh + V_GAP;
  }
  const vbH = cursor - V_GAP + PAD;
  const vbW = cols * NODE_W + (cols - 1) * H_GAP + PAD * 2;

  const boxes = nodes.map((node) => {
    const m = measured.get(node.id)!;
    const x = PAD + (node.col - 1) * (NODE_W + H_GAP);
    const y = rowTops[node.row - 1];
    return { id: node.id, x, y, w: NODE_W, h: m.h, node };
  });

  return { boxes, vbW, vbH };
}

function buildEdge(from: Box, to: Box) {
  const sameColumn = Math.abs(from.x - to.x) < 1;
  const sameRow = Math.abs(from.y + from.h / 2 - (to.y + to.h / 2)) < 1;

  if (sameColumn) {
    const lineX = from.x + from.w / 2;
    const startY = from.y + from.h;
    const endY = to.y;
    const goingDown = endY > startY;
    return {
      d: `M ${lineX} ${startY} V ${goingDown ? endY - ARROW : endY + ARROW}`,
      arrow: { x: lineX, y: endY, dir: (goingDown ? 'down' : 'up') as ArrowDir },
      label: { x: lineX + LABEL_NUDGE, y: (startY + endY) / 2, anchor: 'start' as const },
    };
  }

  if (sameRow) {
    const goingRight = to.x > from.x;
    const startX = goingRight ? from.x + from.w : from.x;
    const endX = goingRight ? to.x : to.x + to.w;
    const lineY = from.y + from.h / 2;
    return {
      d: `M ${startX} ${lineY} H ${goingRight ? endX - ARROW : endX + ARROW}`,
      arrow: { x: endX, y: lineY, dir: (goingRight ? 'right' : 'left') as ArrowDir },
      label: { x: (startX + endX) / 2, y: lineY - LABEL_NUDGE, anchor: 'middle' as const },
    };
  }

  const goingRight = to.x > from.x;
  const startX = goingRight ? from.x + from.w : from.x;
  const startY = from.y + from.h / 2;
  const endX = goingRight ? to.x : to.x + to.w;
  const endY = to.y + to.h / 2;
  const midX = startX + (endX - startX) / 2;

  return {
    d: `M ${startX} ${startY} H ${midX} V ${endY} H ${goingRight ? endX - ARROW : endX + ARROW}`,
    arrow: { x: endX, y: endY, dir: (goingRight ? 'right' : 'left') as ArrowDir },
    label: { x: midX, y: (startY + endY) / 2, anchor: 'middle' as const },
  };
}

export default function PortfolioWorkflow({
  workflow,
  language,
  idPrefix,
}: {
  workflow: WorkflowSpec;
  language: 'es' | 'en';
  idPrefix: string;
}) {
  const titleId = `${idPrefix}-workflow-title`;
  const descId = `${idPrefix}-workflow-desc`;

  const { boxes, vbW, vbH } = layout(workflow.nodes);
  const boxById = new Map(boxes.map((b) => [b.id, b]));
  const minW = Math.max(MIN_RENDER_W, vbW);
  const maxW = Math.max(minW, Math.round(vbW * MAX_RENDER_SCALE));

  return (
    <figure className="rounded-lg border border-brand-border bg-brand-surface p-4 sm:p-6">
      <figcaption className="mb-4 text-sm font-bold text-brand-primary">{localize(workflow.title, language)}</figcaption>

      <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={localize(workflow.title, language)}>
        <svg
          viewBox={`0 0 ${vbW} ${vbH}`}
          style={{ width: '100%', minWidth: `${minW}px`, maxWidth: `${maxW}px`, margin: '0 auto' }}
          role="img"
          aria-labelledby={`${titleId} ${descId}`}
        >
          <title id={titleId}>{localize(workflow.title, language)}</title>
          <desc id={descId}>{workflow.caption ? localize(workflow.caption, language) : localize(workflow.title, language)}</desc>

          {workflow.edges.map((edge) => {
            const from = boxById.get(edge.from);
            const to = boxById.get(edge.to);
            if (!from || !to) return null;
            const geometry = buildEdge(from, to);
            const tone = edge.tone ?? 'neutral';
            return (
              <g key={`${edge.from}-${edge.to}`}>
                <path
                  d={geometry.d}
                  className={`${TONE_CLASS[tone]} fill-none`}
                  strokeWidth={1.75}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <polygon
                  points={arrowPoints(geometry.arrow.x, geometry.arrow.y, geometry.arrow.dir)}
                  className={HEAD_FILL[tone]}
                />
                {edge.label && (
                  <text
                    x={geometry.label.x}
                    y={geometry.label.y}
                    textAnchor={geometry.label.anchor}
                    className="fill-brand-text stroke-brand-surface"
                    strokeWidth={3.5}
                    paintOrder="stroke"
                    strokeLinejoin="round"
                    fontSize={DETAIL_SIZE}
                  >
                    {localize(edge.label, language)}
                  </text>
                )}
              </g>
            );
          })}

          {boxes.map((box) => {
            const { node, x, y, w, h } = box;
            const m = measureNode(node);
            const labelLines = wrapText(localize(node.label, language), m.labelChars);
            const detailLines = node.detail ? wrapText(localize(node.detail, language), m.detailChars) : [];

            const contentH = labelLines.length * LABEL_LINE + (detailLines.length ? detailLines.length * DETAIL_LINE + 4 : 0);
            const firstBaseline = y + h / 2 - contentH / 2 + LABEL_SIZE;

            const shapeClass =
              node.kind === 'terminal'
                ? 'fill-brand-surface stroke-brand-primary'
                : node.kind === 'decision'
                  ? 'fill-brand-surface stroke-brand-primary'
                  : 'fill-brand-bg stroke-brand-border';

            return (
              <g key={node.id}>
                {node.kind === 'decision' ? (
                  <polygon
                    points={`${x + TAPER},${y} ${x + w - TAPER},${y} ${x + w},${y + h / 2} ${x + w - TAPER},${y + h} ${x + TAPER},${y + h} ${x},${y + h / 2}`}
                    className={shapeClass}
                    strokeWidth={1.75}
                    strokeLinejoin="round"
                  />
                ) : (
                  <rect
                    x={x}
                    y={y}
                    width={w}
                    height={h}
                    rx={node.kind === 'terminal' ? 12 : 6}
                    className={shapeClass}
                    strokeWidth={1.75}
                  />
                )}

                {labelLines.map((line, i) => (
                  <text
                    key={`${node.id}-l-${i}`}
                    x={x + w / 2}
                    y={firstBaseline + i * LABEL_LINE}
                    textAnchor="middle"
                    className={node.kind === 'terminal' ? 'fill-brand-primary' : 'fill-brand-text'}
                    fontSize={LABEL_SIZE}
                    fontWeight={600}
                  >
                    {line}
                  </text>
                ))}

                {detailLines.map((line, i) => (
                  <text
                    key={`${node.id}-d-${i}`}
                    x={x + w / 2}
                    y={firstBaseline + labelLines.length * LABEL_LINE + 4 + i * DETAIL_LINE}
                    textAnchor="middle"
                    className="fill-brand-text opacity-70"
                    fontSize={DETAIL_SIZE}
                  >
                    {line}
                  </text>
                ))}
              </g>
            );
          })}
        </svg>
      </div>

      {workflow.caption && (
        <p className="mt-4 border-t border-brand-border pt-3 text-xs text-brand-text/70">{localize(workflow.caption, language)}</p>
      )}
    </figure>
  );
}
