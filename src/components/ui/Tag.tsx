import { cn } from '@/lib/utils';

interface TagProps {
  label: string;
  className?: string;
}

export default function Tag({ label, className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-block px-2.5 py-1 text-xs font-medium rounded-full',
        'bg-violet-500/10 text-violet-300 border border-violet-500/20',
        className,
      )}
    >
      {label}
    </span>
  );
}
