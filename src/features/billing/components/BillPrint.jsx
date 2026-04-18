import React, { forwardRef } from "react";

export const BillPrint = forwardRef((props, ref) => {
    const { bill } = props;

    if (!bill) return <div ref={ref}>No Data</div>;

    return (
        <div ref={ref}>
            <h2>My Shop</h2>

            {bill.items.map((i, index) => (
                <div key={index}>
                    {i.product.name} - ₹{i.total}
                </div>
            ))}

            <h3>Total: ₹{bill.grandTotal}</h3>
        </div>
    );
});