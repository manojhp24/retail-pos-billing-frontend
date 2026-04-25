import MainLayout from "./features/shared/layout/MainLayout";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./features/dashboard/pages/Dashboard";
import { ProductDetailsPage } from "./features/product/pages/ProductDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<MyTable />} />
          <Route path="/inventory" element={<InventoryList />} />
          <Route path="/billing" element={<BillingPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/customer" element={<CustomerListPage />} />
          <Route path="/customer/:customerId" element={<CustomerBillDetailsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}
import MyTable from "./features/product/pages/ProductsList";
import InventoryList from "./features/inventory/pages/InventoryList";
import { BillingPage } from "./features/billing/pages/BillingPage";
import { CustomerListPage } from "./features/customer/pages/CustomerListPage";
import { CustomerBillDetailsPage } from "./features/customer/pages/CustomerBillDetailsPage";

export default App;
