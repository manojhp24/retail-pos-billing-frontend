import DataTable from "@/features/shared/DataTable";
import inventoryColumns from "../utils/inventoryTableColumns";
import InventoryModal from "./InventoryModal";
import { useInventoryTable } from "../hooks/useInventoryTable";
import { AppModal } from "@/features/shared/AppModal";
import { History } from "lucide-react";
import StockHistoryModal from "@/features/stock-history/components/StockHistoryModal";

import { useStockHistory } from "@/features/stock-history/hooks/useStockHistory";

const InventoryTable = () => {
  const {
    inventoryData,
    isModalOpen,
    setIsModalOpen,
    selectedProduct,
    actionType,
    handleAction,
    handleConfirm,
    stockHistory,
    loading,
  } = useInventoryTable();
  return (
    <div className="bg-white rounded-md p-5">
      <DataTable
        data={inventoryData}
        columns={inventoryColumns(handleAction)}
      />

      <InventoryModal
        isModalOpen={isModalOpen && actionType != "history"}
        setIsModalOpen={setIsModalOpen}
        actionType={actionType}
        selectedProduct={selectedProduct}
        onConfirm={handleConfirm}
      />
      <AppModal
        isOpen={isModalOpen && actionType === "history"}
        onClose={() => setIsModalOpen(false)}
        title={"History"}
        subTitle={"Stock Reduce/Restock History"}
        icon={<History className="text-blue-600" size={16} />}
      >
        <StockHistoryModal history={stockHistory} loading={loading} />
      </AppModal>
    </div>
  );
};

export default InventoryTable;