import { useState , useEffect } from "react";
import FormInput from "@/module/FormInput";
import { useRouter } from "next/router";
import {signIn , getSession , useSession } from "next-auth/react";

const Dashboard = ({session}) => {

     const [state, setAllState] = useState({
          name: session.user.name || "",
          lastName: session.user.lastName || "",
          password: "",
     });

     const submitHandler = async () => {

          const res = await fetch("/api/updateInfoNextAuth",{
               method : "POST",
               body : JSON.stringify({name  : state.name , lastName : state.lastName , password : state.password}),
               headers : {"Content-Type" : "application/json"},
          })

          const data = await res.json();
          console.log("dashboard data",data);

          const sendData =  await signIn("credentials",{
               email : session.user.email,
               name : state.name,
               lastName : state.lastName,
               password : state.password,
               redirect : false
          })

          console.log(sendData)

     }

     // const router = useRouter();
     // const { data , status } = useSession();
     // console.log("data",data)

     const changeHandler = (event) => {
          const { name , value } = event.target;
          setAllState({
            ...state,
            [name] : value 
          })
     }

     const cancelHandler = () => {
          router.push("/")
     }

     return (
          <div className="customer-page">
          <h3>Dashboard</h3>
          {/* <p>Your email is {result.email}</p> */}
          <p>Complete Your Profile</p>
    
          <FormInput
            label="Name"
            type="text"
            name="name"
            value={state.name}
            onChange={changeHandler}

          />
          <FormInput
            label="LastName"
            type="text"
            name="lastName"
            value={state.lastName}
            onChange={changeHandler}

          />
          <FormInput
            label="Password"
            type="password"
            name="password"
            value={state.password}
            onChange={changeHandler}
          />
          <div className="customer-page__buttons">
            <button className="first" onClick={cancelHandler}>
              Cancel
            </button>
            <button className="second" onClick={submitHandler}>
              Submit
            </button>
          </div>
        </div>
     );
}

export default Dashboard;

export async function getServerSideProps({req}) {

     const session = await getSession({req});
     if (!session){
          return{
               redirect : {
                    destination : "next-auth/signin",
                    permanent: false
               }
          }
     } 

     console.log("session",session)
 
     return{
          props : {session}
     }
}
