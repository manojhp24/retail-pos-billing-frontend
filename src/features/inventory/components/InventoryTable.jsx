import DataTable from "@/features/shared/DataTable";
import inventoryColumns from "../utils/inventoryTableColumns";

import { useInventory } from "../hooks/useInventory";
import { useState } from "react";
import InventoryModal from "./InventoryModal";

const InventoryTable = () => {
  const { inventory, loading, error } = useInventory();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [actionType, setActionType] = useState(null);

  const handleAction = (row, type) => {
    setSelectedProduct(row);
    setActionType(type);
    setIsModalOpen(true);
    console.log(row)

  }

  const inventoryData = inventory.map((inv) => ({
    id: inv.id,
    product: inv.product.name,
    stock: inv.stock,
    lastUpdated: inv.lastUpdated
  }))



  return <>

    <div className="bg-white rounded-md p-5">

      <DataTable data={inventoryData} columns={inventoryColumns(handleAction)} />

      <InventoryModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        actionType={actionType}
        selectedProduct={selectedProduct}
      />

    </div>



  </>
}

export default InventoryTable