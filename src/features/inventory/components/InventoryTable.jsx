import DataTable from "@/features/shared/DataTable";
import inventoryColumns from "../utils/inventoryTableColumns";

const data = [
  { id: 1, name: "Milk", stock: 10 },
];



const InventoryTable = () => {
  return <>

    <div className="bg-white rounded-md p-5">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Inventory</h2>
      </div>
      <DataTable data={data} columns={inventoryColumns()} />
    </div>



  </>
}

export default InventoryTable