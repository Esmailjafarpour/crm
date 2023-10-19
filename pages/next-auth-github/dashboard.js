import { useSession} from "next-auth/react";
import { useEffect } from 'react';
import { useRouter } from "next/router";

const Dashboard = () => {

     const {data , status} = useSession();
     console.log(status)
     const router = useRouter();

     useEffect(() => {
          if (status === "unauthenticated") router.replace("/next-auth-github")
     }, [status]);

     return (
          <div>
               <h1 style={{color : "white"}}>Dashboard</h1>
          </div>
     );
}

export default Dashboard;
