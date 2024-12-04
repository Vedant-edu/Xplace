import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { PlacementData } from '@/types';
import { ArrowLeft, Pencil, Trash2, Plus } from 'lucide-react';
import { EditPlacementDialog } from '../admin/EditPlacementDialog';
import { AddPlacementDialog } from '../admin/AddPlacementDialog';
import { AdminAuth } from '../admin/AdminAuth';
import { Footer } from '../layout/Footer';
import toast from 'react-hot-toast';

export function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState<PlacementData[]>([]);
  const [editingPlacement, setEditingPlacement] = useState<PlacementData | null>(null);
  const [isAddingPlacement, setIsAddingPlacement] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

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

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this placement?')) return;

    try {
      const { error } = await supabase
        .from('placements')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Placement deleted successfully');
      fetchData();
    } catch (error) {
      console.error('Error deleting placement:', error);
      toast.error('Failed to delete placement');
    }
  };

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticate={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="container py-8 flex-1">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5" />
            Back
          </Link>
          <h1 className="text-3xl font-bold">Admin</h1>
          <div className="flex-1" />
          <button
            onClick={() => setIsAddingPlacement(true)}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full hover:bg-black/90"
          >
            <Plus className="w-5 h-5" />
            Add Company
          </button>
        </div>

        <div className="bg-gray-300 rounded-[2rem] p-6">
          <div className="space-y-4">
            {data.map((placement) => (
              <div key={placement.id} className="flex items-center justify-between p-4 border-b border-black">
                <div>
                  <h3 className="text-xl font-semibold">{placement.company_name}</h3>
                  <p className="text-gray-600">
                    {placement.package} LPA | {placement.total_students} Students
                  </p>
                  <div className="text-sm text-gray-500 mt-1">
                    <span>ENTC: {placement.entc_students}</span>
                    <span className="mx-2">|</span>
                    <span>SCoE: {placement.scoe_students}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setEditingPlacement(placement)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(placement.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {editingPlacement && (
          <EditPlacementDialog
            placement={editingPlacement}
            onClose={() => setEditingPlacement(null)}
            onSave={fetchData}
          />
        )}

        {isAddingPlacement && (
          <AddPlacementDialog
            onClose={() => setIsAddingPlacement(false)}
            onSave={fetchData}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}