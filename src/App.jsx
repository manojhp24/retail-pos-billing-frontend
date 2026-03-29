import MainLayout from "./features/shared/layout/MainLayout";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./features/dashboard/pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<MyTable />} />
          <Route path="/inventory"  />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}
import MyTable from "./features/product/pages/ProductsList";

export default App;
