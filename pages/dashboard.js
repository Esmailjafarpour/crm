import { verifyToken } from "@/utils/auth";
import { useState } from "react";
import FormInput from "@/module/FormInput";
import { useRouter } from "next/router"

const Dashboard = ({ result }) => {

  const router = useRouter();
  const [state, setAllState] = useState({
    name: result.name || "",
    lastName: result.lastName || "",
    password: "",
  });

  const changeHandler = (event) => {
      const { name , value } = event.target;
      setAllState({
        ...state,
        [name] : value 
      })
  }

  const submitHandler = async () => {
    const res = await fetch("/api/updateinfo", {
      method: "POST",
      body: JSON.stringify({
        name: state.name,
        lastName: state.lastName,
        password: state.password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
      console.log("data",data)
    if (data.status === "success") {
      console.log(data.status)
    }
  };

  const cancelHandler = () => {
    router.push("/")
  }

  return (
    <div className="customer-page">
      <h3>Dashboard</h3>
      <p>Your email is {result.email}</p>
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
        value={state.name}
        onChange={changeHandler}
      />
      <FormInput
        label="Password"
        type="text"
        name="password"
        value={state.password}
        onChange={changeHandler}
      />
      <div className="customer-page__buttons">
        <button className="first" onClick={cancelHandler}>Cancel</button>
        <button className="second" onClick={submitHandler}>Submit</button>
      </div>
    </div>
  );
};

export default Dashboard;

export async function getServerSideProps(context) {
  const { token } = context.req.cookies;
  const secretKey = process.env.SECRET_KEY;
  const result = verifyToken(token, secretKey);
  console.log("result in the getServerSideProps", result);

  if (!result) {
    return {
      redirect: { destination: "/signin", permanent: false },
    };
  }
  return { props: { result } };
}
