import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { PlacementData } from '@/types';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

interface EditPlacementDialogProps {
  placement: PlacementData;
  onClose: () => void;
  onSave: () => void;
}

export function EditPlacementDialog({ placement, onClose, onSave }: EditPlacementDialogProps) {
  const [formData, setFormData] = useState(placement);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { error } = await supabase
        .from('placements')
        .update({
          company_name: formData.company_name,
          package: formData.package,
          entc_students: formData.entc_students,
          scoe_students: formData.scoe_students,
          total_students: formData.total_students,
        })
        .eq('id', placement.id);

      if (error) throw error;

      toast.success('Placement updated successfully');
      onSave();
      onClose();
    } catch (error) {
      console.error('Error updating placement:', error);
      toast.error('Failed to update placement');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-[2rem] p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Placement</h2>
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
              onChange={(e) => setFormData({ ...formData, package: Number(e.target.value) })}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">ENTC Students</label>
            <input
              type="number"
              value={formData.entc_students}
              onChange={(e) => setFormData({ ...formData, entc_students: Number(e.target.value) })}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">SCoE Students</label>
            <input
              type="number"
              value={formData.scoe_students}
              onChange={(e) => setFormData({ ...formData, scoe_students: Number(e.target.value) })}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Total Students</label>
            <input
              type="number"
              value={formData.total_students}
              onChange={(e) => setFormData({ ...formData, total_students: Number(e.target.value) })}
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}