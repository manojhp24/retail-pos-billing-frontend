import PageHeader from "@/features/shared/PageHeader"
import DataTable from "@/features/shared/DataTable"
import customerColumns from "../utils/customerColumns"
import { useCustomer } from "../hooks/useCustomer"
import { useNavigate } from "react-router-dom"

export const CustomerListPage = () => {
    const { customers, loading } = useCustomer();
    const navigate = useNavigate();
    const handleView = (customer) => {
        navigate(`/customer/${customer.id}`);
    };
    return <>
        <PageHeader title={"Customer List"} description={"Manage Customer"} />

        <div className="bg-white border border-gray-300 rounded p-5">
            <DataTable
                data={customers}
                columns={customerColumns(handleView)}
                searchPlaceholder="Search customers..."
            />

        </div>


    </>
}