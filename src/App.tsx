import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { PlacementDashboard } from './components/dashboard/PlacementDashboard';
import { AdminDashboard } from './components/dashboard/AdminDashboard';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Routes>
        <Route path="/" element={<PlacementDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      <Toaster 
        position="bottom-right"
        toastOptions={{
          className: 'bg-background text-foreground',
          style: {
            border: '1px solid var(--border)',
            padding: '16px',
            color: 'var(--foreground)',
          },
        }}
      />
    </div>
  );
}

export default App;