import DataTable from "@/features/shared/DataTable";
import inventoryColumns from "../utils/inventoryTableColumns";

import { useInventory } from "../hooks/useInventory";
import { useState } from "react";
import InventoryModal from "./InventoryModal";

const InventoryTable = () => {
  const { inventory, loading, error, inventoryRestock, inventoryReduce } = useInventory();

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
    id: inv.product.id,
    product: inv.product.name,
    stock: inv.stock,
    lastUpdated: inv.lastUpdated
  }))

  const handleConfirm = async (quantity) => {
    if (actionType === "restock") {

      await inventoryRestock(selectedProduct.id, quantity)
    }
    if (actionType === "reduce") {
      await inventoryReduce(selectedProduct.id, quantity)
    }

    setIsModalOpen(false)
  }



  return <>

    <div className="bg-white rounded-md p-5">

      <DataTable data={inventoryData} columns={inventoryColumns(handleAction)} />

      <InventoryModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        actionType={actionType}
        selectedProduct={selectedProduct}
        onConfirm={handleConfirm}
      />

    </div>



  </>
}

export default InventoryTable