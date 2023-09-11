import React from 'react';
import Link from "next/link";

const Layout = ({children}) => {
     return (
          <>
               <header className="header">
                    <h2>Jafarpour CRM Project</h2>
                    <Link href="/add-customer">Add Customer</Link>
               </header> 
               <div className="main">
                    {children}
               </div>
               <footer className="footer">
                    <a href="http://jafarpour.ir" target="_blank" rel="noreferrer">Jafarpour</a> Next.js | Course | CRM Project &copy;
               </footer>
          </>
     );
}

export default Layout;
