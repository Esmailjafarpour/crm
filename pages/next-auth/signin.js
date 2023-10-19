import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import FormInput from "@/module/FormInput";

import { signIn , useSession } from "next-auth/react";


const SignIn = () => {

  const [state, setAllState] = useState({
    email: "",
    password: "",
  });
  
  const router = useRouter();
  const { data , status } = useSession();

useEffect(() => {
  if (status === "authenticated") router.replace("/next-auth/dashboard")
}, [status]);

const changeHandler = (event) => {
    const { name , value } = event.target;
    setAllState({
        ...state,
        [name] : value ,
      })
}

const loginHandler = async () => {
     const res =  await signIn("credentials",{
          email : state.email,
          password : state.password,
          redirect : false
     })
     if (!res.error) router.replace("/next-auth/dashboard")
};

const cancelHandler = () => {
     router.push("/")
}

  return (
    <div className="customer-page">
      <h3>Login Form auth</h3>
      <FormInput
        label="Email"
        type="text"
        name="email"
        value={state.email}
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
        <button className="second" onClick={loginHandler}>
          Login
        </button>
      </div>
    </div>
  );
};

export default SignIn;
