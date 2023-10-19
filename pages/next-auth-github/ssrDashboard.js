import { getSession } from "next-auth/react";

const SsrDashboard = ({session}) => {
     console.log("session",session)
     return (
          <div>
               <h1 style={{color : "white"}}>SSRDashboard</h1>
          </div>
     );
}

export default SsrDashboard;

export async function getServerSideProps ({req}){

     const session = await getSession({req});

     if(!session){
          return {
               redirect : {
                    destination : "/next-auth-github",
                    permanent: false
               }
          }
     }

     return {
          props : {session}
     }

}
