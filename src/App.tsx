import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { ProductList } from './pages/ProductList';
import { MainLayout } from './components/layout/MainLayout';
import { PrivateRoute } from './components/auth/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<ProductList />} />
            {/* Catch all for authenticated users */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Route>

        {/* Catch all for unauthenticated users */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
