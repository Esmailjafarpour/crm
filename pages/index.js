import connectDB from "@/utils/connectDB";
import Customer from "@/models/Customer";
import HomePage from "@/template/HomePage";
import Head from "next/head";

function Index({customers , data}) {
  return(
    <div>
        <Head>
          <title>{data.title}</title>
          <meta
            name={data.Nader}
            decription={data.decription}
          />
        </Head>
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

