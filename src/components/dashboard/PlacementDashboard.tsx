import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { PlacementData } from '@/types';
import { Search, ArrowUpDown, Settings } from 'lucide-react';
import { PlacementCard } from '../placement/PlacementCard';
import { SortDropdown } from '../filters/SortDropdown';
import { Pagination } from '../ui/Pagination';
import { Footer } from '../layout/Footer';

export function PlacementDashboard() {
  const [activeTab, setActiveTab] = useState<'entc' | 'scoe' | 'all'>('entc');
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState<PlacementData[]>([]);
  const [sortBy, setSortBy] = useState<'recent' | 'package' | 'students'>('recent');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: placementsData, error } = await supabase
        .from('placements')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (placementsData) setData(placementsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const sortedAndFilteredData = data
    .filter(item => 
      item.company_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'package':
          return b.package - a.package;
        case 'students':
          return b.total_students - a.total_students;
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

  const totalPages = Math.ceil(sortedAndFilteredData.length / itemsPerPage);
  const currentData = sortedAndFilteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalOffers = sortedAndFilteredData.reduce((acc, curr) => {
    if (activeTab === 'entc') return acc + curr.entc_students;
    if (activeTab === 'scoe') return acc + curr.scoe_students;
    return acc + curr.total_students;
  }, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="container mt-2 flex-1 ">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-extrabold">XPlace</h1>
          <Link  
            to="/admin" 
            className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-black/10"
          >
            <span>Admin</span>
          </Link>
        </div>
        
        <div className="search-container relative w-full max-w-3xl mx-auto mt-2 md:mt-8">
          <Search className="absolute left-1 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-500 ml-4" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search companies...."
            className="w-full h-10 pl-12 pr-4 rounded-full border border-black text-lg font-medium outline-none shadow-none placeholder-gray-500"
          />
        </div>

        <div className="tab-filter flex flex-wrap items-center justify-between gap-2 mt-3 mb-4">
          <div className='bg-gray-100 rounded-full'><button
            onClick={() => setActiveTab('entc')}
            className={`tab-button px-4 py-1.5 rounded-full text-base font-medium transition-colors ${activeTab === 'entc' ? 'bg-black text-white' : ''}`}
          >
            ENTC
          </button>
          <button
            onClick={() => setActiveTab('scoe')}
            className={`tab-button px-4 py-1.5 rounded-full text-base font-medium transition-colors ${activeTab === 'scoe' ? 'bg-black text-white' : ''}`}
          >
            SCOE
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`tab-button px-4 py-1.5 rounded-full text-base font-medium transition-colors ${activeTab === 'all' ? 'bg-black text-white' : ''}`}
          >
            ALL
          </button></div>
          <div className="flex-1" />
          <SortDropdown value={sortBy} onChange={setSortBy} />
        </div>

        <div className="total-offers bg-gray-200 rounded-[2rem] px-6 py-4 md:p-6 mb-10 md:mb-8 flex justify-between items-center">
          <h2 className="text-3xl font-bold">Total offers</h2>
          <div className="student-count">
            <span className="text-2xl font-bold flex items-center justify-center rounded-full bg-blue-100 border-2 border-blue-500 h-12 w-12">{totalOffers}</span>
          </div>
        </div>

        <div className="space-y-4">
          {currentData.map((item) => (
            <PlacementCard 
              key={item.id} 
              data={item} 
              activeTab={activeTab}
            />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </main>
      <Footer />
    </div>
  );
}