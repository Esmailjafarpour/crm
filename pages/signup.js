import { useState , useEffect } from 'react';
import { useRouter } from "next/router";
import FormInput from "@/module/FormInput";


const Signup = () => {

     const [state , setAllState] = useState({
          email : "",
          password : ""
     });

     useEffect(() => {
          fetch("/api/user")
          .then((res) => res.json())
          .then((data) => {
           if (data.status === "success") window.location.href ="/dashboard"
          })
      }, []);

     const router = useRouter();
     const signUpHandler = async () => {
          console.log(state.email , state.password)
          const res = await fetch("/api/auth/signup",{
               method : "POST",
               body : JSON.stringify({email : state.email, password : state.password}),
               headers : {"Content-Type" : "application/json"},
          })

          const data = await res.json();
          console.log("data" , data)
          if(data.status === "success") router.push('/signin')
     }

     const cancelHandler = () => {
          router.push("/")
        }

     return (
          <div className="customer-page">
               <h3>Registration Form</h3>
               <FormInput
                    label="Email"
                    type="text"
                    name="email"
                    value={state.email}
                    onChange={(e) =>
                         setAllState({
                         ...state,
                         email: e.target.value,
                         })
                    }
               />

               <FormInput
                    label="Password"
                    type="text"
                    name="password"
                    value={state.password}
                    onChange={(e) =>
                         setAllState({
                         ...state,
                         password: e.target.value,
                         })
                    }
               />
               <div className="customer-page__buttons">
                    <button className="first" onClick={cancelHandler}>
                         Cancel
                    </button>
                    <button className="second" onClick={signUpHandler}>
                         Sign Up
                    </button>
               </div>
               
          </div>
     );
}

export default Signup;
