import PageHeader from "@/features/shared/PageHeader";
import { useParams, useNavigate } from "react-router-dom";
import DataTable from "@/features/shared/DataTable";
import { useCustomerBills } from "../hooks/useCustomerBills";
import customerBillColumns from "../utils/customerBillCoumns";

export const CustomerBillDetailsPage = () => {
    const { customerId } = useParams();
    const { bills, loading } = useCustomerBills(customerId);
    const navigate = useNavigate();
    const handleView = (bill) => {
        navigate(`/bill/${bill.id}`);
    };

    const flatData = bills.flatMap((bill) =>
        bill.items.map((item) => ({
            billId: bill.id,
            createdAt: bill.createdAt,
            productName: item.productName,
            quantity: item.quantity,
            price: item.price,
            total: item.total,
            grandTotal: bill.grandTotal,
        }))
    );
    return <>
        <PageHeader title={"Bill Details"} description={`Customer phone: ${customerId}`} />

        <DataTable
            data={flatData}
            columns={customerBillColumns(handleView)}
            loading={loading}
        />

    </>
}