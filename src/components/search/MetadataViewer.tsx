import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/cn';

interface MetadataViewerProps {
  data: unknown;
  rootLabel?: string;
  className?: string;
}

export function MetadataViewer({ data, rootLabel = 'metadata', className }: MetadataViewerProps) {
  return (
    <div className={cn('font-mono text-xs leading-relaxed', className)}>
      <Node label={rootLabel} value={data} depth={0} defaultOpen />
    </div>
  );
}

interface NodeProps {
  label: string | number;
  value: unknown;
  depth: number;
  defaultOpen?: boolean;
}

function Node({ label, value, depth, defaultOpen = false }: NodeProps) {
  const [open, setOpen] = useState(defaultOpen);

  if (value === null || value === undefined) {
    return <Leaf label={label} preview={<Primitive value={value} />} />;
  }
  if (typeof value !== 'object') {
    return <Leaf label={label} preview={<Primitive value={value} />} />;
  }

  const entries = Array.isArray(value)
    ? value.map((v, i) => [i, v] as const)
    : Object.entries(value as Record<string, unknown>);

  if (entries.length === 0) {
    return (
      <Leaf
        label={label}
        preview={<span className="text-slate-500">{Array.isArray(value) ? '[]' : '{}'}</span>}
      />
    );
  }

  const bracketOpen = Array.isArray(value) ? '[' : '{';
  const bracketClose = Array.isArray(value) ? ']' : '}';

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="group flex w-full items-center gap-1 rounded px-1 py-0.5 text-left hover:bg-white/5"
      >
        <ChevronRight
          className={cn(
            'h-3 w-3 shrink-0 text-slate-500 transition-transform',
            open && 'rotate-90',
          )}
        />
        <span className="text-indigo-300">{label}</span>
        <span className="text-slate-500">:</span>
        <span className="text-slate-400">
          {bracketOpen}
          {!open && ` ${entries.length} ${entries.length === 1 ? 'item' : 'items'} `}
          {!open && bracketClose}
        </span>
      </button>
      {open && (
        <div
          className="ml-3 border-l border-white/5 pl-3"
          style={{ marginLeft: depth === 0 ? '0.25rem' : undefined }}
        >
          {entries.map(([k, v]) => (
            <Node key={String(k)} label={k} value={v} depth={depth + 1} />
          ))}
          <div className="pl-1 text-slate-500">{bracketClose}</div>
        </div>
      )}
    </div>
  );
}

function Leaf({ label, preview }: { label: string | number; preview: React.ReactNode }) {
  return (
    <div className="flex items-start gap-1 px-1 py-0.5">
      <span className="text-indigo-300">{label}</span>
      <span className="text-slate-500">:</span>
      <span className="min-w-0 break-words">{preview}</span>
    </div>
  );
}

function Primitive({ value }: { value: unknown }) {
  if (value === null) return <span className="text-slate-500">null</span>;
  if (value === undefined) return <span className="text-slate-500">undefined</span>;
  if (typeof value === 'string')
    return <span className="text-emerald-300">&quot;{value}&quot;</span>;
  if (typeof value === 'number') return <span className="text-amber-300">{value}</span>;
  if (typeof value === 'boolean')
    return <span className="text-rose-300">{String(value)}</span>;
  return <span className="text-slate-200">{String(value)}</span>;
}
