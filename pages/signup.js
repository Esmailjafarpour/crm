import { useState } from 'react';
import { useRouter } from "next/router"

const Signup = () => {

     const [state , setAllState] = useState({
          email : "",
          password : ""
     });

     const router = useRouter()
     const signUpHandler = async () => {
          console.log(state.email , state.password)
          const res = await fetch("/api/auth/signup",{
               method : "POST",
               body : JSON.stringify({email : state.email, password : state.password}),
               headers : {"Content-Type" : "application/json"},
          })

          const data = await res.json();
          console.log("data" , data)
          if(data.status === "success") router.push('/')
     }

     return (
          <div>
               <h1>Registration Form</h1>
               <input 
                    type="text"
                    placeholder="Email" 
                    value={state.email} 
                    onChange={(e) => setAllState({
                    ...state,
                    email : e.target.value
               })}/>

               <input 
                    type="password"
                    placeholder="Password" 
                    value={state.password} 
                    onChange={(e) => setAllState({
                    ...state,
                    password : e.target.value
               })}/>

               <button onClick={signUpHandler}>Sign Up</button>
          </div>
     );
}

export default Signup;
