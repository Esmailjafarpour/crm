import { useState } from 'react';
import { useRouter } from "next/router";
import Form from "../module/Form"

const AddCustomerPages = () => {

  const [form, setForm] = useState({
      name : "",
      lastName : "",
      email : "",
      phone : "",
      address : "",
      postalCode : "",
      date : "",
      products : []
  });

  const router = useRouter();

  const cancelHandler = () => {
      setForm({
        name : "",
        lastName : "",
        email : "",
        phone : "",
        address : "",
        postalCode : "",
        date : "",
        products : []
      })
      router.push("/")
  }

  const saveHandler = async () => {
      const res = await fetch("/api/customer",{
        method : "POST",
        body: JSON.stringify({data : form}),
        headers : {"Content-Type" : "application/json"}
      })

      const data = await res.json();
      console.log("data send to customer api", data)
      if (data.status === "success") router.push("/")
  }

  return (
    <div className="customer-page">
      <h4>Add Customer Page</h4>
      <Form form={form} setForm={setForm}/>
      <div className="customer-page__buttons">
        <button className="first" onClick={cancelHandler}>Cancel</button>
        <button className="second" onClick={saveHandler}>Save</button>
      </div>
    </div>
  );
}

export default AddCustomerPages;
