import { ArrowRight, Menu, X, ArrowUpRight, PanelsTopLeft, Smartphone, Workflow, Layers3, LayoutGrid, Compass, ListChecks, Signal, BatteryFull, PenTool, Inbox, Sparkles, CircleCheck, Shapes, Check, Route, Code2, Rocket, Handshake, MessagesSquare, Blocks, MoveUpRight, Plus, MapPin, Globe2, Orbit, ArrowDownToLine, ArrowUp, type LucideProps } from "lucide-react";
const icons = {
  "arrow-right": ArrowRight,
  "menu": Menu,
  "x": X,
  "arrow-up-right": ArrowUpRight,
  "panels-top-left": PanelsTopLeft,
  "smartphone": Smartphone,
  "workflow": Workflow,
  "layers-3": Layers3,
  "layout-grid": LayoutGrid,
  "compass": Compass,
  "list-checks": ListChecks,
  "signal": Signal,
  "battery-full": BatteryFull,
  "pen-tool": PenTool,
  "inbox": Inbox,
  "sparkles": Sparkles,
  "circle-check": CircleCheck,
  "shapes": Shapes,
  "check": Check,
  "route": Route,
  "code-2": Code2,
  "scan-check": ScanCheck,
  "rocket": Rocket,
  "handshake": Handshake,
  "messages-square": MessagesSquare,
  "blocks": Blocks,
  "move-up-right": MoveUpRight,
  "plus": Plus,
  "map-pin": MapPin,
  "globe-2": Globe2,
  "orbit": Orbit,
  "arrow-down-to-line": ArrowDownToLine,
  "arrow-up": ArrowUp,
};
export function Icon({ name, ...props }: LucideProps & { name: keyof typeof icons }) {
  const Component = icons[name];
  return <Component strokeWidth={1.7} aria-hidden="true" {...props} />;
}

function ScanCheck(props: LucideProps) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" {...props} className={["lucide lucide-scan-check", props.className].filter(Boolean).join(" ")}><path d="M4 7V4h3m10 0h3v3m0 10v3h-3M7 20H4v-3m4-5 3 3 5-6" /></svg>;
}
