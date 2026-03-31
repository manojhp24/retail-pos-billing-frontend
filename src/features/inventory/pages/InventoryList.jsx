import InventoryTable from "../components/InventoryTable"
import { ToastContainer } from "react-toastify";
import PageHeader from "@/features/shared/PageHeader";

const InventoryList = () => {
    return <>
        <PageHeader title="Inventory" description="Manage your stock levels" />
        <ToastContainer position="bottom-right" autoClose={3000} />
        <InventoryTable />
    </>
}

export default InventoryList