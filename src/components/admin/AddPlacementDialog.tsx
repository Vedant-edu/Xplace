import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

interface AddPlacementDialogProps {
  onClose: () => void;
  onSave: () => void;
}

export function AddPlacementDialog({ onClose, onSave }: AddPlacementDialogProps) {
  const [formData, setFormData] = useState({
    company_name: '',
    package: '',
    entc_students: '',
    scoe_students: '',
    total_students: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { error } = await supabase.from('placements').insert([{
        company_name: formData.company_name,
        package: Number(formData.package),
        entc_students: Number(formData.entc_students),
        scoe_students: Number(formData.scoe_students),
        total_students: Number(formData.total_students),
      }]);

      if (error) throw error;

      toast.success('Placement added successfully');
      onSave();
      onClose();
    } catch (error) {
      console.error('Error adding placement:', error);
      toast.error('Failed to add placement');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-[2rem] p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Placement</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Company Name</label>
            <input
              type="text"
              value={formData.company_name}
              onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Package (LPA)</label>
            <input
              type="number"
              value={formData.package}
              onChange={(e) => setFormData({ ...formData, package: e.target.value })}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">ENTC Students</label>
            <input
              type="number"
              value={formData.entc_students}
              onChange={(e) => setFormData({ ...formData, entc_students: e.target.value })}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">SCoE Students</label>
            <input
              type="number"
              value={formData.scoe_students}
              onChange={(e) => setFormData({ ...formData, scoe_students: e.target.value })}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Total Students</label>
            <input
              type="number"
              value={formData.total_students}
              onChange={(e) => setFormData({ ...formData, total_students: e.target.value })}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
              required
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Placement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}