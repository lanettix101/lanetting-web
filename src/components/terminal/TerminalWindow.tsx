import { motion, useReducedMotion } from 'motion/react';
import {
  TERMINAL_GEOMETRY,
  LINE_PREFIXES,
  type TerminalColorScheme,
  type TerminalLine,
} from './heroTerminalData';

export interface LineState {
  revealed: boolean;
  typed: number;
}

export interface CursorState {
  scene: number;
  line: number;
}

const FONT = "'Ubuntu Mono','JetBrains Mono',Menlo,Consolas,monospace";
const CHAR_WIDTH = TERMINAL_GEOMETRY.fontSize * 0.6;
const PROMPT = 'lanetting@ubuntu:~$';
const PROMPT_WIDTH = PROMPT.length * CHAR_WIDTH;

function renderLine(line: TerminalLine, y: number, state: LineState, color: TerminalColorScheme) {
  if (line.k === 'p') {
    const cmd = line.t.startsWith(' ') ? line.t : ` ${line.t}`;
    return (
      <text
        key="line"
        x={TERMINAL_GEOMETRY.lineX}
        y={y}
        fontFamily={FONT}
        fontSize={TERMINAL_GEOMETRY.fontSize}
        opacity={state.revealed ? 1 : 0}
      >
        <tspan fill={color.promptUser}>{PROMPT}</tspan>
        <tspan fill={color.cmd}>{cmd.substring(0, state.typed)}</tspan>
      </text>
    );
  }

  const symbol = LINE_PREFIXES[line.k];
  return (
    <text
      key="line"
      x={TERMINAL_GEOMETRY.lineX}
      y={y}
      fontFamily={FONT}
      fontSize={TERMINAL_GEOMETRY.fontSize}
      opacity={state.revealed ? 1 : 0}
    >
      <tspan fill={color[line.k]} fontWeight={700}>
        [{symbol}]
      </tspan>
      <tspan fill={color.out}>{line.t}</tspan>
    </text>
  );
}

interface TerminalWindowProps {
  color: TerminalColorScheme;
  scenes: TerminalLine[][];
  lines: LineState[][];
  activeScene: number;
  cursor: CursorState | null;
  cursorBlinkOn: boolean;
}

export default function TerminalWindow({
  color,
  scenes,
  lines,
  activeScene,
  cursor,
  cursorBlinkOn,
}: TerminalWindowProps) {
  const g = TERMINAL_GEOMETRY;
  const { winX, winY, winWidth, winHeight, titleHeight, lineStartY, lineHeight } = g;
  const rx = color.titleBg === '#0A0A0A' ? 0 : 14;
  const cursorX = cursor
    ? (() => {
        const st = lines[cursor.scene]?.[cursor.line];
        const cmd = scenes[cursor.scene]?.[cursor.line];
        const typed = st ? st.typed : 0;
        const cmdWithSpace = cmd && cmd.t.startsWith(' ') ? cmd.t : ` ${cmd?.t ?? ''}`;
        return TERMINAL_GEOMETRY.lineX + PROMPT_WIDTH + cmdWithSpace.substring(0, typed).length * CHAR_WIDTH;
      })()
    : 0;
  const cursorActive = cursorBlinkOn && cursor !== null;
  const reducedMotion = useReducedMotion();
  const cursorY =
    cursor && cursor.scene >= 0 ? lineStartY + cursor.line * lineHeight - 13 : lineStartY - 13;

  return (
    <g>
      <rect x={winX} y={winY} width={winWidth} height={winHeight} rx={rx} fill={color.winBg} />
      <rect
        x={winX}
        y={winY}
        width={winWidth}
        height={winHeight}
        rx={rx}
        fill="none"
        stroke={color.winBorder}
        strokeWidth={1.5}
      />
      <rect x={winX} y={winY} width={winWidth} height={titleHeight} rx={rx} fill={color.titleBg} />
      <path d={`M${winX} ${winY + titleHeight} h${winWidth}`} stroke={color.winBorder} />
      <circle cx={winX + 36} cy={winY + 22} r={7} fill="#ff5f56" />
      <circle cx={winX + 60} cy={winY + 22} r={7} fill="#ffbd2e" />
      <circle cx={winX + 84} cy={winY + 22} r={7} fill="#27c93f" />
      <text
        x={winX + winWidth / 2}
        y={winY + 29}
        textAnchor="middle"
        fontFamily={FONT}
        fontSize={17}
        fill={color.titleText}
      >
        lanetting@ubuntu: ~
      </text>

      {scenes.map((sceneLines, sIdx) => (
        <motion.g
          key={sIdx}
          initial={false}
          animate={{ opacity: sIdx === activeScene ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {sceneLines.map((line, lIdx) => renderLine(line, lineStartY + lIdx * lineHeight, lines[sIdx][lIdx], color))}
        </motion.g>
      ))}

      {cursorActive &&
        (reducedMotion ? (
          <rect
            x={cursorX}
            y={cursorY}
            width={9}
            height={16}
            rx={2}
            fill={color.promptUser}
            opacity={0.9}
          />
        ) : (
          <motion.rect
            x={cursorX}
            y={cursorY}
            width={9}
            height={16}
            rx={2}
            fill={color.promptUser}
            animate={{ opacity: [0, 1, 0, 1, 0, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          />
        ))}
    </g>
  );
}