import { PlacementData } from '@/types';
import { StudentRing } from './StudentRing';

interface StatisticsPanelProps {
  data: PlacementData[];
  activeTab: 'entc' | 'scoe' | 'all';
  totalOffers: number;
}

export function StatisticsPanel({ data, activeTab, totalOffers }: StatisticsPanelProps) {
  const totalEntc = data.reduce((acc, curr) => acc + curr.entc_students, 0);
  const totalScoe = data.reduce((acc, curr) => acc + curr.scoe_students, 0);
  const total = totalEntc + totalScoe;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {activeTab === 'all' ? (
        <>
          <StudentRing
            count={totalEntc}
            total={total}
            label="ENTC Students"
            className="mx-auto"
          />
          <StudentRing
            count={totalScoe}
            total={total}
            label="SCoE Students"
            className="mx-auto"
          />
          <StudentRing
            count={total}
            total={total}
            label="Total Students"
            className="mx-auto"
          />
        </>
      ) : (
        <StudentRing
          count={totalOffers}
          total={activeTab === 'entc' ? totalEntc : totalScoe}
          label={`${activeTab.toUpperCase()} Students`}
          className="mx-auto"
        />
      )}
    </div>
  );
}