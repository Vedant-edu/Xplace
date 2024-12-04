import { useState } from 'react';
import { Building2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface AdminAuthProps {
  onAuthenticate: () => void;
}

export function AdminAuth({ onAuthenticate }: AdminAuthProps) {
  const [pin, setPin] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '42626') {
      onAuthenticate();
      toast.success('Successfully authenticated');
    } else {
      toast.error('Invalid PIN');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <Building2 className="h-12 w-12 text-primary" />
          <h2 className="mt-6 text-3xl font-bold">Admin Access</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your PIN to access the admin panel
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="pin" className="sr-only">
              PIN
            </label>
            <input
              id="pin"
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full h-14 px-4 rounded-full bg-transparent border-2 border-black text-lg font-medium"
              placeholder="Enter PIN"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 rounded-full bg-black text-white text-lg font-medium hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}