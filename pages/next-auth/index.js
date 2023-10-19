import Link from "next/link";
// import { signIn } from "next-auth/react";
import { signOut , useSession } from "next-auth/react";

export default function Home() {

  const { status } = useSession();

  const logOutHandler = () => {
    signOut()
  }

  return (
    <div>
      <h3>Next-Auth Cridentials</h3>

      {status === "unauthenticated" ? <>
          <button>
            <Link href="/next-auth/signup">Register</Link>
          </button>

          {/* go to signin page */}
          {/* <button onClick={() => signIn()}>Login</button> */}
          <button>
            <Link href="/next-auth/signin">Login</Link>
          </button>
      </> : null}
      
      {status === "authenticated" ? <>
        <button>
          <Link href="/next-auth/dashboard">Dashboard</Link>
        </button>

        <button onClick={logOutHandler}>Log Out</button>
      </> : null}

    </div>
  );
}
