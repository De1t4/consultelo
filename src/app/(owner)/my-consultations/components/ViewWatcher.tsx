import { LayoutGrid, List } from 'lucide-react';

export const ViewSwitcher = ({
  mode,
  onToggle,
  disabled
}: {
  mode: 'grid' | 'list',
  onToggle: (mode: 'grid' | 'list') => void,
  disabled: boolean
}) => (
  <div className="hidden md:flex items-center bg-muted/30 p-1 rounded-xl border border-border overflow-hidden">
    <button
      onClick={() => onToggle('grid')}
      disabled={disabled}
      className={`p-2 rounded-lg transition-all ${mode === 'grid' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
    >
      <LayoutGrid className="h-4 w-4" />
    </button>
    <button
      onClick={() => onToggle('list')}
      disabled={disabled}
      className={`p-2 rounded-lg transition-all ${mode === 'list' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
    >
      <List className="h-4 w-4" />
    </button>
  </div>
);
