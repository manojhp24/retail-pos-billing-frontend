import DataTable from "@/features/shared/DataTable";
import inventoryColumns from "../utils/inventoryTableColumns";
import InventoryModal from "./InventoryModal";
import { useInventoryTable } from "../hooks/useInventoryTable";

const InventoryTable = () => {
  const {
    inventoryData,
    isModalOpen,
    setIsModalOpen,
    selectedProduct,
    actionType,
    handleAction,
    handleConfirm,
  } = useInventoryTable();

  return (
    <div className="bg-white rounded-md p-5">
      <DataTable
        data={inventoryData}
        columns={inventoryColumns(handleAction)}
      />

      <InventoryModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        actionType={actionType}
        selectedProduct={selectedProduct}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default InventoryTable;