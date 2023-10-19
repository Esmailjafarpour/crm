import { useState , useEffect } from "react";
import connectDB from "@/utils/connectDB";
import Customer from "@/models/Customer";
import HomePage from "@/template/HomePage";
import Head from "next/head";
import Link from "next/link";

function Index({customers , data}) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch("/api/user")
    .then((res) => res.json())
    .then((data) => {
          if (data.status === "success") setIsLoggedIn(true)
        }) 
  }, []);

  const signOutHandler = async () => {
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.status === "success") setIsLoggedIn(false)
  }

  return(
    <div>
        <Head>
          <title>{data.title}</title>
          <meta
            name={data.Nader}
            decription={data.decription}
          />
        </Head>
        <div>
          {isLoggedIn ?
          
              <div className="customer-page__buttons">
                    <button className="second">
                      <Link href="/dashboard">Dashboard</Link>
                    </button>
                    <button className="first" onClick={signOutHandler}>
                      Log Out
                    </button>
               </div>
          : null}
         
          {!isLoggedIn ?
             <div className="customer-page__buttons">
              <button className="second">
                <Link href="/signin">Sign In</Link>
              </button>
              <button className="second">
                <Link href="/signup">Sign Up</Link>
              </button>
            </div>
          : null}
         
        </div>
        <HomePage customers={customers}/>
    </div>
  ) 
}

export default Index;

export async function getServerSideProps() {
  try {
    await connectDB;
    const customers = await Customer.find();
   
    return{
      props : {
        data : {
          name : "Nader" , 
          title : "Nader Page" , 
          description : "This is a customer management panel"
        },
        customers : JSON.parse(JSON.stringify(customers))
      }
    }
  } catch (error) {
    console.log("error",error)
    return{
      notFound : true
    }
  }
}

