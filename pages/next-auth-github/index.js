import { signIn , signOut ,useSession } from "next-auth/react";
import Link from "next/link";

const Home = () => {
     
     
     const signInHandler = () => {
          signIn("github")
     }

     const signOutHandler = () => {
          signOut("github")
     }

     const { status } = useSession();

     return (
          <div>
               <h1>Next-Auth | GitHub</h1>

               {status === "authenticated" ? <>
                    <button onClick={signOutHandler}>Sign Out</button>
                    <button><Link href="/next-auth-github/dashboard">Dashboard</Link></button>
                    <button><Link href="/next-auth-github/ssrDashboard">SSRDashboard</Link></button>
               </> : null}

               {status === "unauthenticated" ? <>
                    <button onClick={signInHandler}>Sign In</button>  
               </> : null}




               
          </div>
     );
}

export default Home;
