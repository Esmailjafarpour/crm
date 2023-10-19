import { useState , useEffect} from 'react';
import  FormInput from "@/module/FormInput";
import { useRouter } from "next/router";
import { signIn , useSession , getSession} from "next-auth/react";

const Signup = () => {

     const [state, setState] = useState({
          email : "",
          password : ""
     });

     const { data ,status } = useSession();
     // useEffect(() => {
     //      if (status === "authenticated") router.replace("/next-auth/dashboard")
     // }, [status]);

     const changeHandler = (e) => {

          const { name , value } = e.target;
          setState({
                ...state,
               [name] : value
          })
         
     }

     const router = useRouter();

     const cancelHandler = () => {
          router.push("/")
     }

     const signUpHandler = async () => {
          const res = await fetch("/api/auth/signup",{
               method : "POST",
               body : JSON.stringify({email : state.email , password : state.password}),
               headers : { "Content-Type" : "application/json"}
          })

          const data = await res.json();
          console.log(data)
          if (data.status = "success") router.push("../next-auth/signin")
     }

     return (
          <div className="customer-page">
               <h3>Registration Form</h3>
               <FormInput
                    name="email"
                    label="Email"
                    type="text"
                    value={state.email}
                    onChange={changeHandler}
               />
               <FormInput
                    name="password"
                    label="Password"
                    type="password"
                    value={state.password}
                    onChange={changeHandler}
               />

               <div className="customer-page__buttons">
                    <button className="first" onClick={cancelHandler}>
                         Cancel
                    </button>
                    <button className="second" onClick={signUpHandler}>
                         Register
                    </button>
               </div>

          </div>
     );
}

export default Signup;

export async function getServerSideProps({req}) {
     
     const session = await getSession({req});
     console.log(session)
     if (session) {
          return{
               redirect : {
                    destination : "next-auth/dashboard",
                    permanent : false
               }
          }
     }

     return{
          props : { session }
     }
}
