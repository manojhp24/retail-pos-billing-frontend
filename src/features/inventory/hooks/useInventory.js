import { useState,useEffect } from "react";
import { getAllInventory } from "../services/inventoryApi";
import { handleApiError } from "@/utils/errorHandler";

const useInventory = () =>{
    const [inventory,setInventory] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);

    const fetchAllInevntory = async () => {
        try {
            setLoading(true);
            setError(null)
            const res = getAllInventory();
            setInventory(res.data);
        } catch (error) {
            const message = handleApiError(error);
            toast.error(message);   
            setError(message);
        }finally{
            setLoading(false);
        }
        
    }

    useEffect(() => {
        fetchAllInevntory();
    },[])

    return {inventory,loading,error,fetchAllInevntory}

}

