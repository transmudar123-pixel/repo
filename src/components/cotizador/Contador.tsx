import { Minus, Plus } from "lucide-react";

export function Contador({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
}) {
  const id = `contador-${label.replace(/\W+/g, "-").toLowerCase()}`;
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3">
      <span id={id} className="text-sm font-medium">
        {label}
      </span>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onChange(Math.max(0, value - 1))}
          aria-label={`Quitar uno: ${label}`}
          disabled={value === 0}
          className="grid h-10 w-10 place-items-center rounded-lg border border-border text-foreground transition-colors hover:bg-muted disabled:opacity-40"
        >
          <Minus className="h-4 w-4" />
        </button>
        <output
          aria-labelledby={id}
          className="w-10 text-center text-base font-bold tabular-nums"
        >
          {value}
        </output>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          aria-label={`Agregar uno: ${label}`}
          className="grid h-10 w-10 place-items-center rounded-lg bg-navy text-primary-foreground transition-colors hover:bg-navy-soft"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
