import { PlacementData } from '@/types';

interface PlacementCardProps {
  data: PlacementData;
  activeTab: 'entc' | 'scoe' | 'all';
}

export function PlacementCard({ data, activeTab }: PlacementCardProps) {
  const displayCount = 
    activeTab === 'entc' ? data.entc_students :
    activeTab === 'scoe' ? data.scoe_students :
    data.total_students;

  if (activeTab === 'entc' && data.entc_students === 0) return null;
  if (activeTab === 'scoe' && data.scoe_students === 0) return null;

  return (
    <div className="bg-gray-200 px-6 py-3 rounded-lg relative ">
      <div className="flex justify-between items-center ">
        <div className=" ">
          <h3 className="text-2xl font-bold">{data.company_name}</h3>
          <p className="text-gray-600 text-lg">
            {data.package} LPA 
            {activeTab === 'all' && (
              <>
                <span className='ml-2 px-2 bg-green-100 text-sm rounded-lg'> ENTC: {data.entc_students} </span>
                <span className='ml-2 px-2 bg-sky-100 text-sm rounded-lg'> SCoE: {data.scoe_students}</span>
              </>
            )}
          </p>
        </div>
        <div className="student-count relative flex items-center justify-center rounded-full bg-blue-100 border-2 border-blue-500 w-16 h-16 p-4">
          <span className="text-2xl font-bold">{displayCount}</span>
        </div>
      </div>
    </div>
  );
}