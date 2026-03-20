import MainLayout from "./features/shared/layout/MainLayout";

import { BrowserRouter } from "react-router-dom";

import Dashboard from "./features/dashboard/pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Dashboard />
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
