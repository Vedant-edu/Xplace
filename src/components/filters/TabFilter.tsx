import { cn } from '@/lib/utils';

interface TabFilterProps {
  activeTab: 'entc' | 'scoe' | 'all';
  onTabChange: (tab: 'entc' | 'scoe' | 'all') => void;
}

export function TabFilter({ activeTab, onTabChange }: TabFilterProps) {
  const tabs = [
    { id: 'entc', label: 'ENTC' },
    { id: 'scoe', label: 'SCoE' },
    { id: 'all', label: 'All' },
  ] as const;

  return (
    <div className="inline-flex h-10 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
            activeTab === tab.id
              ? 'bg-background text-foreground shadow-sm'
              : 'hover:bg-background/50 hover:text-foreground'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}