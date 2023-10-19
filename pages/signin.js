import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import FormInput from "@/module/FormInput";


const SignIn = () => {
  const [state, setAllState] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") window.location.href = "/dashboard";
      });
  }, []);

  const router = useRouter();
  const signinHandler = async () => {
    console.log(state.email, state.password);
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      body: JSON.stringify({ email: state.email, password: state.password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    console.log("data", data);
    if (data.status === "success") router.push("/dashboard");
  };

  const cancelHandler = () => {
     router.push("/")
   }

  return (
    <div className="customer-page">
      <h3>Login Form</h3>
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
        type="password"
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
        <button className="second" onClick={signinHandler}>
          Login
        </button>
      </div>
    </div>
  );
};

export default SignIn;
