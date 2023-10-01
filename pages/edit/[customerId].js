import { useState , useEffect } from "react";
import { useRouter } from "next/router";
import CustomerEditPage from "@/template/CustomerEditPage";

const CustomerId = () => {
    const [data, setData] = useState(null);
    const router = useRouter();
    const {query : {customerId},isReady} = router;

    useEffect(() => {
       if (isReady) {
         fetch(`/api/customer/${customerId}`)
         .then((res) => res.json())
         .then((data) => setData(data.data))
       }
    }, [isReady]);
   
    if (data) return <CustomerEditPage data={data} id={customerId}/>
}

export default CustomerId;

